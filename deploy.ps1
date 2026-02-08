# Deploy to Cloud Run
# Ensure you are authenticated with 'gcloud auth login' first
Write-Host "Deploying beyond-the-docket to Cloud Run..."
gcloud run deploy beyond-the-docket --source . --region us-central1 --allow-unauthenticated
