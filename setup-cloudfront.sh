#!/bin/bash

# CloudFront Setup Script for DriveZA Motors
# Run this AFTER adding DNS validation records to Wix

set -e

BUCKET_NAME="driveza-website-1759820457"
CERT_ARN="arn:aws:acm:us-east-1:191618052373:certificate/f91698e2-77ae-489e-8adf-7e332cf30b81"
DOMAIN="www.drivezamotors.com"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  DriveZA CloudFront Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Step 1: Check certificate status
echo -e "${YELLOW}Step 1: Checking SSL certificate status...${NC}"
CERT_STATUS=$(aws acm describe-certificate \
  --certificate-arn $CERT_ARN \
  --region us-east-1 \
  --query 'Certificate.Status' \
  --output text)

echo "Certificate Status: $CERT_STATUS"

if [ "$CERT_STATUS" != "ISSUED" ]; then
  echo -e "${RED}❌ Certificate not yet validated!${NC}"
  echo ""
  echo "Please add these DNS records to Wix first:"
  echo ""
  aws acm describe-certificate \
    --certificate-arn $CERT_ARN \
    --region us-east-1 \
    --query 'Certificate.DomainValidationOptions[*].ResourceRecord' \
    --output table
  echo ""
  echo -e "${YELLOW}After adding DNS records, wait 5-30 minutes and run this script again.${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Certificate validated!${NC}"
echo ""

# Step 2: Create CloudFront distribution
echo -e "${YELLOW}Step 2: Creating CloudFront distribution...${NC}"

DISTRIBUTION_ID=$(aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json \
  --query 'Distribution.Id' \
  --output text 2>&1)

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ CloudFront distribution created!${NC}"
  echo "Distribution ID: $DISTRIBUTION_ID"
  echo ""
  
  # Get CloudFront domain
  CF_DOMAIN=$(aws cloudfront get-distribution \
    --id $DISTRIBUTION_ID \
    --query 'Distribution.DomainName' \
    --output text)
  
  echo -e "${GREEN}CloudFront Domain: $CF_DOMAIN${NC}"
  echo ""
  
  # Save for later
  echo $DISTRIBUTION_ID > /tmp/cloudfront-dist-id.txt
  echo $CF_DOMAIN > /tmp/cloudfront-domain.txt
  
  echo -e "${BLUE}========================================${NC}"
  echo -e "${GREEN}NEXT STEPS:${NC}"
  echo -e "${BLUE}========================================${NC}"
  echo ""
  echo "1. Wait 15-30 minutes for CloudFront deployment to complete"
  echo ""
  echo "2. Add this DNS record to Wix:"
  echo -e "   ${YELLOW}Type: CNAME${NC}"
  echo -e "   ${YELLOW}Name: www${NC}"
  echo -e "   ${YELLOW}Value: $CF_DOMAIN${NC}"
  echo ""
  echo "3. (Optional) Set up redirect from drivezamotors.com to www.drivezamotors.com in Wix"
  echo ""
  echo "4. Test your site at: https://www.drivezamotors.com"
  echo ""
  echo -e "${GREEN}Your website will be live with HTTPS!${NC}"
  echo ""
else
  echo -e "${RED}Error creating CloudFront distribution${NC}"
  echo "$DISTRIBUTION_ID"
  exit 1
fi

