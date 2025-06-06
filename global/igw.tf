# Internet Gateway (for NAT access)
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.backend_vpc.id

  tags = {
    Name = "backend-igw"
  }
}