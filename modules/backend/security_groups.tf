resource "aws_security_group" "ec2_sg" {
    name        = "ec2-sg"
  vpc_id = var.vpc_id
   description = "Allow traffic to ec2 instances"
 
    ingress {
    description = "Allow HTTP from anywhere (CloudFront)"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # ✅ Accept HTTP from CloudFront or anywhere
  }

  ingress {
    description = "Allow HTTP from anywhere (CloudFront)"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # ✅ Accept HTTP from CloudFront or anywhere
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ec2-sg"
  }
}

# Associate route tables to subnets


# Security Group for ALB
resource "aws_security_group" "alb_sg" {
  name        = "alb-sg"
  description = "Allow HTTP from CloudFront (public)"
  vpc_id      = var.vpc_id

  ingress {
    description = "Allow HTTP from anywhere (CloudFront)"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # ✅ Accept HTTP from CloudFront or anywhere
  }

   ingress {
    description = "Allow HTTP from anywhere (CloudFront)"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # ✅ Accept HTTP from CloudFront or anywhere
  }

  ingress {
    description = "Allow HTTPS from anywhere (CloudFront)"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # ✅ Accept HTTP from CloudFront or anywhere
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "alb-sg"
  }
}
