module "global" {
  source = "./global"

}


module "backend" {
  source = "./modules/backend"
  vpc_id = module.global.backend_vpc_id
 public_subnet_ids   = module.global.public_subnet_ids
  private_subnet_ids  = module.global.private_subnet_ids
  HCP_CLIENT_ID = var.HCP_CLIENT_ID
  HCP_CLIENT_SECRET = var.HCP_CLIENT_SECRET
}

module "frontend" {
  source = "./modules/frontend"
  bucket_name = "caam-bucket"
  backend_url= "https://${module.backend.alb_dns_name}/api"
}

