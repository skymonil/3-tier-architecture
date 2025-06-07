output "backend_vpc_id" {
  value = aws_vpc.backend_vpc.id  # 🔹 Ensure this resource exists in the global module
}

output "public_subnet_ids" {
  value = [
    aws_subnet.public_1a.id,
    aws_subnet.public_1b.id
  ]
}

output "private_subnet_ids" {
  value = [
    aws_subnet.private_1a.id,
    aws_subnet.private_1b.id
  ]
}
