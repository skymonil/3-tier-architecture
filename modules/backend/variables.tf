# /backend/variables.tf
variable "vpc_id" {
  description = "VPC ID from global module"
  type        = string
}

variable "public_subnet_ids" {
  description = "List of public subnet IDs"
  type        = list(string)
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs"
  type        = list(string)
}
variable "HCP_CLIENT_ID" {
  description = "HCP_CLIENT_ID"
  type        = string
  sensitive   = true  
}
variable "HCP_CLIENT_SECRET" {
  description = "HCP_CLIENT_SECRET"
  type        = string
  sensitive   = true 
}
