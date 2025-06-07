variable "bucket_name" {
    description = "name for bucket"
}
# modules/frontend/variables.tf
variable "backend_url" {
  description = "Backend ALB URL for API calls"
  type        = string
}
