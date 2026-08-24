output "project_id" {
  description = "The unique ID of the Vercel project"
  value       = vercel_project.portfolio.id
}

output "project_name" {
  description = "The name of the Vercel project"
  value       = vercel_project.portfolio.name
}

output "custom_domain" {
  description = "Custom domain associated with the project"
  value       = var.custom_domain != "" ? var.custom_domain : "No custom domain configured"
}
