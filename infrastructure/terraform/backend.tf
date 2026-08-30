terraform {
  required_version = ">= 1.6"

  backend "remote" {
    organization = "koras"

    workspaces {
      name = "koras-e2e-shop"
    }
  }
}
