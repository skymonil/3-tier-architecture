# Route Tables
resource "aws_route_table" "rt_private_1a" {
  vpc_id = aws_vpc.backend_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.natgw_1a.id
  }

  route {
    cidr_block = "192.168.128.0/22"
    gateway_id = "local"
  }

  tags = {
    Name = "rt-private-1a"
  }
}

resource "aws_route_table" "rt_private_1b" {
  vpc_id = aws_vpc.backend_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.natgw_1b.id
  }

  route {
    cidr_block = "192.168.128.0/22"
    gateway_id = "local"
  }

  tags = {
    Name = "rt-private-1b"
  }
}


# Route Tables
resource "aws_route_table" "rt_public_1a" {
  vpc_id = aws_vpc.backend_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  route {
    cidr_block = "192.168.128.0/22"
    gateway_id = "local"
  }

  tags = {
    Name = "rt-public-1a"


  }
}

resource "aws_route_table" "rt_public_1b" {
  vpc_id = aws_vpc.backend_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

   route {
    cidr_block = "192.168.128.0/22"
    gateway_id = "local"
  }


 tags = {
  Name = "rt-public-1b"
}
}