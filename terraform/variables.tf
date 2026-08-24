variable "vercel_api_token" {
  description = "Vercel API token for authentication"
  type        = string
  sensitive   = true
}

variable "vercel_team_id" {
  description = "Optional Vercel Team/Org ID (leave blank for personal account)"
  type        = string
  default     = null
}

variable "project_name" {
  description = "Name of the project on Vercel"
  type        = string
  default     = "cv-portfolio"
}

variable "github_repo" {
  description = "GitHub repository in the format owner/repo"
  type        = string
  default     = "Enbidi77/cv-portfolion"
}

variable "production_branch" {
  description = "Production git branch"
  type        = string
  default     = "master"
}

variable "serverless_function_region" {
  description = "Preferred Vercel serverless function deployment region (e.g. sin1, hnd1, iad1)"
  type        = string
  default     = "sin1"
}

variable "custom_domain" {
  description = "Custom domain name to attach to the project (e.g. nguyenbaoduy.dev)"
  type        = string
  default     = "nguyenbaoduy.dev"
}

# Environment Variables
variable "env_github_username" {
  description = "GitHub username for profile integration"
  type        = string
  default     = "Enbidi77"
}

variable "env_github_token" {
  description = "GitHub personal access token for higher API rate limits"
  type        = string
  default     = ""
  sensitive   = true
}

variable "env_contact_email" {
  description = "Recipient email for the contact form"
  type        = string
  default     = "nguyenduy.fwk@gmail.com"
}

variable "env_email_service_api_key" {
  description = "API key for email service (e.g., Resend / SendGrid)"
  type        = string
  default     = ""
  sensitive   = true
}

variable "env_next_public_site_url" {
  description = "Public URL of the portfolio website"
  type        = string
  default     = "https://nguyenbaoduy.dev"
}

variable "env_next_public_ga_id" {
  description = "Google Analytics Measurement ID"
  type        = string
  default     = ""
}
