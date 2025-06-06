provider "aws" {
  region = "ap-south-1"
}

# VPC
resource "aws_vpc" "backend_vpc" {
  cidr_block           = "192.168.128.0/22"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "backend-vpc"
  }
}

# Private Subnet in ap-south-1a


















