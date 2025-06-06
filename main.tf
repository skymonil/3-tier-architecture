module "frontend" {
  source = "./modules/frontend"
  bucket_name = "caam-bucket"
}
module "global" {
  source = "./global"

}

module "backend" {
  source = "./modules/backend"
  vpc_id = module.global.backend_vpc_id
  
}