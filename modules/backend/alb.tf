resource "aws_lb" "public_alb" {
  name               = "backend-public-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets = var.public_subnet_ids

  tags = {
    Name = "backend-alb"
  }
}

# ALB Target Group
resource "aws_lb_target_group" "backend_tg" {
  name     = "backend-tg"
  port     = 5000
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    path                = "/health"
    port     = 5000
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  tags = {
    Name = "backend-tg"
  }
}

# ALB Listener
resource "aws_lb_listener" "backend_listener" {
  load_balancer_arn = aws_lb.public_alb.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend_tg.arn
  }
}

resource "aws_lb_listener" "https_listener" {
  load_balancer_arn = aws_lb.public_alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "arn:aws:acm:ap-south-1:975049978724:certificate/68311f6f-55d6-4903-b839-0deee39017a5"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend_tg.arn
  }
  
}


