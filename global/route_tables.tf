# Route Tables
resource "aws_route_table" "rt_1a" {
  vpc_id = aws_vpc.backend_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.natgw_1a.id
  }

  tags = {
    Name = "rt-private-1a"
  }
}

resource "aws_route_table" "rt_1b" {
  vpc_id = aws_vpc.backend_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.natgw_1b.id
  }

  tags = {
    Name = "rt-private-1b"
  }
}