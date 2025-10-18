#!/bin/bash

# DriveZA S3 Deployment Script
# This script uploads your website to AWS S3

# CONFIGURATION - Update these values
BUCKET_NAME="driveza-website"  # Change to your S3 bucket name
REGION="us-west-1"  # Change to your preferred AWS region

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting DriveZA website deployment to S3...${NC}"

# Create S3 bucket if it doesn't exist
echo "Creating S3 bucket (if needed)..."
aws s3 mb s3://$BUCKET_NAME --region $REGION 2>/dev/null || echo "Bucket already exists"

# Configure bucket for static website hosting
echo "Configuring bucket for website hosting..."
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Set bucket policy for public read access
echo "Setting bucket policy for public access..."
cat > /tmp/bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file:///tmp/bucket-policy.json

# Sync files to S3
echo -e "${BLUE}Uploading files to S3...${NC}"
aws s3 sync . s3://$BUCKET_NAME \
  --exclude ".git/*" \
  --exclude "*.md" \
  --exclude "*.sh" \
  --exclude "node_modules/*" \
  --exclude ".DS_Store" \
  --cache-control "public, max-age=31536000" \
  --exclude "*.html" \
  --exclude "*.css" \
  --exclude "*.js"

# Upload HTML, CSS, JS with shorter cache
aws s3 sync . s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.html" \
  --include "*.css" \
  --include "*.js" \
  --cache-control "public, max-age=3600" \
  --content-type-overrides \
  --metadata-directive REPLACE

# Set correct content types
echo "Setting content types..."
aws s3 cp s3://$BUCKET_NAME s3://$BUCKET_NAME \
  --recursive \
  --exclude "*" \
  --include "*.html" \
  --content-type "text/html" \
  --metadata-directive REPLACE

aws s3 cp s3://$BUCKET_NAME s3://$BUCKET_NAME \
  --recursive \
  --exclude "*" \
  --include "*.css" \
  --content-type "text/css" \
  --metadata-directive REPLACE

aws s3 cp s3://$BUCKET_NAME s3://$BUCKET_NAME \
  --recursive \
  --exclude "*" \
  --include "*.js" \
  --content-type "application/javascript" \
  --metadata-directive REPLACE

# Get website URL
WEBSITE_URL="http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Your website is now live at:"
echo -e "${GREEN}$WEBSITE_URL${NC}"
echo ""
echo "Note: If you want to use a custom domain, configure:"
echo "1. Route 53 DNS"
echo "2. CloudFront CDN (recommended for HTTPS)"
echo ""

