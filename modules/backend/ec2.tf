resource "aws_launch_template" "backend_lt" {
  name_prefix   = "backend-lt"
  image_id      = "ami-02521d90e7410d9f0" # Use Amazon Linux 2 or Ubuntu
  instance_type = "t2.micro"

  iam_instance_profile {
    name = aws_iam_instance_profile.ssm_profile.name
  }

  user_data = base64encode(<<EOF
#!/bin/bash
yum update -y
yum install -y git curl
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs
git clone https://github.com/skymonil/3-tier-architecture /home/ec2-user/app
cd /home/ec2-user/app
npm install
npm run dev
EOF
  )

  network_interfaces {
    associate_public_ip_address = false
    subnet_id                   = aws_subnet.private_1a.id # will be overridden by ASG
    security_groups             = [aws_security_group.backend_sg.id]
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
  vpc_zone_identifier       = [
    aws_subnet.private_1a.id,
    aws_subnet.private_1b.id
  ]
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