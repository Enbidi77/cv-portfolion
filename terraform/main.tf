terraform {
  required_version = ">= 1.5.0"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 3.0"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
  team      = var.vercel_team_id
}

import {
  to = vercel_project.portfolio
  id = "prj_VWFeBZC9M7sSErqQd0Unu9qfanq2"
}

resource "vercel_project" "portfolio" {
  name      = var.project_name
  framework = "nextjs"

  git_repository = {
    type              = "github"
    repo              = var.github_repo
    production_branch = var.production_branch
  }

  resource_config = {
    function_default_regions = [var.serverless_function_region]
  }

  build_command   = "pnpm build"
  install_command = "pnpm install"
}

# Environment Variables
resource "vercel_project_environment_variable" "github_username" {
  project_id = vercel_project.portfolio.id
  key        = "GITHUB_USERNAME"
  value      = var.env_github_username
  target     = ["production", "preview", "development"]
  sensitive  = false
}

resource "vercel_project_environment_variable" "github_token" {
  count      = var.env_github_token != "" ? 1 : 0
  project_id = vercel_project.portfolio.id
  key        = "GITHUB_TOKEN"
  value      = var.env_github_token
  target     = ["production", "preview", "development"]
  sensitive  = true
}

resource "vercel_project_environment_variable" "contact_email" {
  project_id = vercel_project.portfolio.id
  key        = "CONTACT_EMAIL"
  value      = var.env_contact_email
  target     = ["production", "preview", "development"]
  sensitive  = false
}

resource "vercel_project_environment_variable" "email_service_api_key" {
  count      = var.env_email_service_api_key != "" ? 1 : 0
  project_id = vercel_project.portfolio.id
  key        = "EMAIL_SERVICE_API_KEY"
  value      = var.env_email_service_api_key
  target     = ["production", "preview"]
  sensitive  = true
}

resource "vercel_project_environment_variable" "next_public_site_url" {
  project_id = vercel_project.portfolio.id
  key        = "NEXT_PUBLIC_SITE_URL"
  value      = var.env_next_public_site_url
  target     = ["production", "preview", "development"]
  sensitive  = false
}

resource "vercel_project_environment_variable" "next_public_ga_id" {
  count      = var.env_next_public_ga_id != "" ? 1 : 0
  project_id = vercel_project.portfolio.id
  key        = "NEXT_PUBLIC_GA_ID"
  value      = var.env_next_public_ga_id
  target     = ["production", "preview"]
  sensitive  = false
}

# Custom Domain (optional)
resource "vercel_project_domain" "custom_domain" {
  count      = var.custom_domain != "" ? 1 : 0
  project_id = vercel_project.portfolio.id
  domain     = var.custom_domain
}
