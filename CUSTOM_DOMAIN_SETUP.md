# 🌐 Custom Domain Setup - www.drivezamotors.com

## Step-by-Step Guide to Connect Your Wix Domain

---

## ⚠️ IMPORTANT: Do These Steps IN ORDER

### Step 1: Verify SSL Certificate (DO THIS FIRST!)

Your SSL certificate has been requested and is waiting for DNS validation.

**Go to your Wix DNS settings and add these 2 CNAME records:**

#### Record 1 (for drivezamotors.com):
```
Type: CNAME
Name: _bbbf4c294fa6db705fbedceb32bbb4db
Value: _8b1b3788f8eea688c5ca2ba429c741c7.xlfgrmvvlj.acm-validations.aws.
TTL: 300 (or default)
```

#### Record 2 (for www.drivezamotors.com):
```
Type: CNAME
Name: _451e812eed044b5e11b62e968d7d4b94.www
Value: _03fd16423154341b1ab97e3922e277d6.xlfgrmvvlj.acm-validations.aws.
TTL: 300 (or default)
```

**How to add these in Wix:**
1. Log in to Wix
2. Go to Domains → Manage → Advanced DNS
3. Click "Add Record"
4. Select "CNAME" as type
5. Add the Name and Value from above
6. Save both records

**⏰ Wait Time:** After adding DNS records, wait 5-30 minutes for validation

---

### Step 2: Check Certificate Status

After adding DNS records, run this command to check if validated:

```bash
aws acm describe-certificate \
  --certificate-arn arn:aws:acm:us-east-1:191618052373:certificate/f91698e2-77ae-489e-8adf-7e332cf30b81 \
  --region us-east-1 \
  --query 'Certificate.Status'
```

**Wait until status shows**: `"ISSUED"`

---

### Step 3: Create CloudFront Distribution

Once certificate is validated (ISSUED), run:

```bash
cd /Users/arulshanmugam/driveza-app

aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json \
  > /tmp/cloudfront-result.json

# Get CloudFront domain
cat /tmp/cloudfront-result.json | grep -A 1 '"DomainName"' | head -2
```

This will give you a CloudFront URL like: `d1234abcd.cloudfront.net`

**⏰ Wait Time:** CloudFront deployment takes 15-30 minutes

---

### Step 4: Update Wix DNS Settings

Once CloudFront is deployed, go back to Wix DNS and add:

#### For www.drivezamotors.com:
```
Type: CNAME
Name: www
Value: [Your CloudFront URL from Step 3]
TTL: 300
```

#### For drivezamotors.com (root domain):
You have two options:

**Option A: Use Wix's URL Redirect**
- In Wix, set up redirect from `drivezamotors.com` → `www.drivezamotors.com`

**Option B: Use AWS Route 53** (requires transferring DNS)
- More complex but gives full control

---

### Step 5: Test Your Website

After DNS propagation (15-60 minutes):

**Check these URLs:**
- https://www.drivezamotors.com ✅
- http://www.drivezamotors.com (should redirect to HTTPS) ✅

**Test commands:**
```bash
# Check DNS
dig www.drivezamotors.com

# Test HTTPS
curl -I https://www.drivezamotors.com
```

---

## 🚀 Quick Setup Script

I've created a script to automate Steps 2-3. After adding DNS records in Step 1:

```bash
cd /Users/arulshanmugam/driveza-app
chmod +x setup-cloudfront.sh
./setup-cloudfront.sh
```

---

## 📋 DNS Records Summary (For Wix)

**Add these to Wix DNS Manager:**

| Type  | Name/Host | Value/Points To | Priority |
|-------|-----------|-----------------|----------|
| CNAME | _bbbf4c294fa6db705fbedceb32bbb4db | _8b1b3788f8eea688c5ca2ba429c741c7.xlfgrmvvlj.acm-validations.aws. | - |
| CNAME | _451e812eed044b5e11b62e968d7d4b94.www | _03fd16423154341b1ab97e3922e277d6.xlfgrmvvlj.acm-validations.aws. | - |
| CNAME | www | [Wait for CloudFront URL] | - |

---

## ⚠️ Important Notes

1. **Don't delete Wix validation records** - Keep the underscore CNAME records
2. **Propagation time** - DNS changes can take up to 48 hours (usually 15-60 min)
3. **HTTPS only** - CloudFront will redirect HTTP to HTTPS automatically
4. **Certificate renewal** - AWS renews automatically, no action needed

---

## 🆘 Troubleshooting

**Certificate won't validate?**
- Double-check CNAME records in Wix
- Make sure there are no typos
- Wait at least 30 minutes

**Website not loading?**
- Clear browser cache
- Try incognito/private mode
- Check DNS propagation: https://dnschecker.org

**Still seeing Wix site?**
- DNS needs more time to propagate
- Clear browser cache
- Try different browser

---

## 📞 Current Deployment

**S3 Website (HTTP):**
http://driveza-website-1759820457.s3-website-us-west-2.amazonaws.com

**Future HTTPS URL:**
https://www.drivezamotors.com (after Steps 1-4 complete)

---

## ✅ Checklist

- [ ] Step 1: Add 2 CNAME validation records to Wix DNS
- [ ] Wait 5-30 minutes
- [ ] Step 2: Check certificate status (should be ISSUED)
- [ ] Step 3: Create CloudFront distribution
- [ ] Wait 15-30 minutes for CloudFront deployment
- [ ] Step 4: Add www CNAME to Wix DNS pointing to CloudFront
- [ ] Wait 15-60 minutes for DNS propagation
- [ ] Step 5: Test https://www.drivezamotors.com

---

**Ready to start? Add the DNS records in Wix, then let me know when done!** 🚀

