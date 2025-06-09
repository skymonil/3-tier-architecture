# Elastic IPs for NAT Gateways
resource "aws_eip" "nat_1a" {
  domain = "vpc"
}
resource "aws_eip" "nat_1b" {
  domain = "vpc"
}

# NAT Gateway in each AZ
resource "aws_nat_gateway" "natgw_1a" {
  allocation_id = aws_eip.nat_1a.id
  subnet_id     = aws_subnet.public_1a.id

  tags = {
    Name = "natgw-1a"
  }

}

resource "aws_nat_gateway" "natgw_1b" {
  allocation_id = aws_eip.nat_1b.id
  subnet_id     = aws_subnet.public_1b.id

  tags = {
    Name = "natgw-1b"
  }
}