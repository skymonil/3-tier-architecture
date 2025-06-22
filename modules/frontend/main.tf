provider "aws" {
  region = "ap-south-1"
}


resource "aws_s3_bucket" "frontend-bucket" {
  bucket = var.bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_website_configuration" "s3_bucket_website_configuration" {
  bucket = aws_s3_bucket.frontend-bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "s3_bucket_public_access_block" {
  bucket = aws_s3_bucket.frontend-bucket.id
  block_public_acls     = false
  block_public_policy   = false
  ignore_public_acls    = false
  restrict_public_buckets = false

}

resource "aws_s3_bucket_policy" "aws_s3_bucket_policy" {
  bucket = aws_s3_bucket.frontend-bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
         {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.frontend-bucket.arn}/*"
      }
    ]
  })
  depends_on = [aws_s3_bucket_public_access_block.s3_bucket_public_access_block]
}

resource "aws_cloudfront_distribution" "frontend_cf" {
  aliases = ["615915.xyz"]
 origin {
  domain_name = aws_s3_bucket.frontend-bucket.bucket_regional_domain_name

  origin_id   = "S3-${aws_s3_bucket.frontend-bucket.id}"

  custom_origin_config {
    http_port              = 80
    https_port             = 443
    origin_protocol_policy = "http-only"
    origin_ssl_protocols   = ["TLSv1.2"]
  }
}

  enabled             = true
  default_root_object = "index.html"

 custom_error_response {
    error_code            = 403  # AWS returns 403 for "Access Denied"
    response_code         = 200  # Show the custom error page instead of an error
    response_page_path    = "/index.html"  # Path to your custom error page in S3
  }



  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.frontend-bucket.id}"

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

 viewer_certificate {
  acm_certificate_arn            = "arn:aws:acm:us-east-1:975049978724:certificate/3e611257-dfdf-4894-83b3-b279987ee5e0"
  ssl_support_method             = "sni-only"
  minimum_protocol_version       = "TLSv1.2_2019"
}
}

resource "local_file" "env_js" {
  content = <<EOF
window._env_ = {
  BACKEND_URL: "${var.backend_url}"
};
EOF

  filename = "${path.module}/dist/env.js"
}
resource "aws_s3_object" "env_js" {
  bucket = aws_s3_bucket.frontend-bucket.id
  key    = "env.js"
  source = local_file.env_js.filename
  content_type = "application/javascript"
 # acl    = "public-read"
}


