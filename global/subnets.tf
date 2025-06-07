resource "aws_subnet" "private_1a" {
  vpc_id            = aws_vpc.backend_vpc.id
  cidr_block        = "192.168.128.0/24"
  availability_zone = "ap-south-1a"

  tags = {
    Name = "private-subnet-1a"
  }
}

resource "aws_subnet" "public_1a" {
   vpc_id            = aws_vpc.backend_vpc.id
  cidr_block        = "192.168.130.0/24"
  availability_zone = "ap-south-1a"

  tags = {
    Name = "public-subnet-1b"
  }
}

resource "aws_subnet" "public_1b" {
   vpc_id            = aws_vpc.backend_vpc.id
  cidr_block        = "192.168.131.0/24"
  availability_zone = "ap-south-1b"

  tags = {
    Name = "public-subnet-1b"
  }
}
# Private Subnet in ap-south-1b
resource "aws_subnet" "private_1b" {
  vpc_id            = aws_vpc.backend_vpc.id
  cidr_block        = "192.168.129.0/24"
  availability_zone = "ap-south-1b"

  tags = {
    Name = "private-subnet-1b"
  }
}
