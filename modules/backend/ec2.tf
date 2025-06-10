resource "aws_launch_template" "backend_lt" {
  name_prefix   = "backend-lt"
  image_id      = "ami-0ae0bfa220651da22" 
  instance_type = "t2.micro"

  iam_instance_profile {
    name = aws_iam_instance_profile.ec2_profile.name
  }

 user_data = base64encode(<<EOF
#!/bin/bash
sudo su

# Install dependencies


# Get HCP creds from SSM (secure)
export HCP_CLIENT_ID=$(aws ssm get-parameter --name "/app/HCP_CLIENT_ID" --with-decryption --query "Parameter.Value" --output text --region ap-south-1)
export HCP_CLIENT_SECRET=$(aws ssm get-parameter --name "/app/HCP_CLIENT_SECRET" --with-decryption --query "Parameter.Value" --output text --region ap-south-1)

# Get temporary HCP access token
export HCP_API_TOKEN=$(curl --silent --location "https://auth.idp.hashicorp.com/oauth2/token" \
--header "Content-Type: application/x-www-form-urlencoded" \
--data-urlencode "client_id=$HCP_CLIENT_ID" \
--data-urlencode "client_secret=$HCP_CLIENT_SECRET" \
--data-urlencode "grant_type=client_credentials" \
--data-urlencode "audience=https://api.hashicorp.cloud" | jq -r .access_token)

# Fetch secret (DB connection string)
DB_CONN_STRING=$(curl --silent --location "https://api.cloud.hashicorp.com/secrets/2023-11-28/organizations/20b0be26-ec7c-4394-9a6b-2c8009beadce/projects/9d4b5f1e-0cc7-443b-84f2-362bf4916116/apps/caam/secrets:open" \
--request GET \
--header "Authorization: Bearer $HCP_API_TOKEN" | jq -r '.secrets[] | select(.name == "DB_CRED").static_version.value')

EMAIL_ID=$(curl --silent --location "https://api.cloud.hashicorp.com/secrets/2023-11-28/organizations/20b0be26-ec7c-4394-9a6b-2c8009beadce/projects/9d4b5f1e-0cc7-443b-84f2-362bf4916116/apps/caam/secrets:open" \
--request GET \
--header "Authorization: Bearer $HCP_API_TOKEN" | jq -r '.secrets[] | select(.name == "EMAIL_ID").static_version.value')

EMAIL_PASSWORD=$(curl --silent --location "https://api.cloud.hashicorp.com/secrets/2023-11-28/organizations/20b0be26-ec7c-4394-9a6b-2c8009beadce/projects/9d4b5f1e-0cc7-443b-84f2-362bf4916116/apps/caam/secrets:open" \
--request GET \
--header "Authorization: Bearer $HCP_API_TOKEN" | jq -r '.secrets[] | select(.name == "EMAIL_PASSWORD").static_version.value')

JWT_SECRET=$(curl --silent --location "https://api.cloud.hashicorp.com/secrets/2023-11-28/organizations/20b0be26-ec7c-4394-9a6b-2c8009beadce/projects/9d4b5f1e-0cc7-443b-84f2-362bf4916116/apps/caam/secrets:open" \
--request GET \
--header "Authorization: Bearer $HCP_API_TOKEN" | jq -r '.secrets[] | select(.name == "JWT_SECRET").static_version.value')

# Clone and run app
git clone https://github.com/skymonil/3-tier-architecture 
cd 3-tier-architecture/server
cd src
cat <<ENV_EOF > .env
MONGODB_URI=$DB_CONN_STRING
JWT_SECRET=$JWT_SECRET
EMAIL_PASSWORD=$EMAIL_PASSWORD
EMAIL_ID=$EMAIL_ID
ENV_EOF



npm install -g pm2
npm install
pm2 start app.js --name app
pm2 startup
pm2 save
EOF
)


  network_interfaces {
    associate_public_ip_address = false
    subnet_id                   = var.private_subnet_ids[0] # will be overridden by ASG
    security_groups             = [aws_security_group.ec2_sg.id]
  }

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name = "backend-ec2"
    }
  }
}
resource "aws_autoscaling_group" "backend_asg" {
  name                      = "backend-asg"
  desired_capacity          = 2
  max_size                  = 3
  min_size                  = 1
  vpc_zone_identifier = var.private_subnet_ids
  target_group_arns         = [aws_lb_target_group.backend_tg.arn]
  health_check_type         = "EC2"
  health_check_grace_period = 300

  launch_template {
    id      = aws_launch_template.backend_lt.id
    version = "$Latest"
  }
  

  tag {
    key                 = "Name"
    value               = "backend-ec2"
    propagate_at_launch = true
  }

  lifecycle {
    create_before_destroy = true
  }
}


resource "aws_ssm_parameter" "HCP_CLIENT_ID" {
  name        = "/app/HCP_CLIENT_ID"
  type        = "SecureString"
  value       = var.HCP_CLIENT_ID 
  key_id      = aws_kms_key.ssm_kms_key.arn
}
resource "aws_ssm_parameter" "HCP_CLIENT_SECRET" {
  name        = "/app/HCP_CLIENT_SECRET"
  type        = "SecureString"
  value       = var.HCP_CLIENT_SECRET  
  key_id      = aws_kms_key.ssm_kms_key.arn
}

resource "aws_kms_key" "ssm_kms_key" {
  description             = "KMS key for SSM parameters"
  deletion_window_in_days = 30
}