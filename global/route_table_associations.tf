resource "aws_route_table_association" "rta_1a" {
  subnet_id      = aws_subnet.private_1a.id
  route_table_id = aws_route_table.rt_1a.id
}

resource "aws_route_table_association" "rta_1b" {
  subnet_id      = aws_subnet.private_1b.id
  route_table_id = aws_route_table.rt_1b.id
}