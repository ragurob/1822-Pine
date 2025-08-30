# Deployment Guide for The Rittenhouse Residence Website

## Prerequisites

### 1. Install Quarto (Required)

**macOS:**
```bash
brew install quarto
# Optional: For PDF generation
quarto install tinytex
```

**Windows:**
- Download from [quarto.org](https://quarto.org)
- Run installer
- Optional: `quarto install tinytex` for PDF

**Linux:**
```bash
wget https://github.com/quarto-dev/quarto-cli/releases/download/v1.4.550/quarto-1.4.550-linux-amd64.tar.gz
tar -xvzf quarto-1.4.550-linux-amd64.tar.gz
sudo mv quarto-1.4.550 /opt/quarto
export PATH=$PATH:/opt/quarto/bin
```

### 2. Verify Installation
```bash
quarto --version
```

## Local Development

### Quick Start
```bash
cd website
quarto preview
# Opens at http://localhost:4321 with hot reload
```

### Build Site Locally
```bash
cd website
quarto render
# Output in _site/ directory
```

### Using Build Script
```bash
cd website
./scripts/build.sh development  # Development build
./scripts/build.sh production   # Production build with optimizations
```

## Deployment Options

### Option 1: GitHub Pages (Recommended - Free)

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/rittenhouse-residence.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / root
   - Save

3. **Deploy with Quarto**
   ```bash
   cd website
   quarto publish gh-pages
   ```

4. **Add Custom Domain**
   - In repo Settings → Pages → Custom domain
   - Add: `therittenhouseresidence.com`
   - Create CNAME record at your DNS:
     ```
     Type: CNAME
     Name: www
     Value: yourusername.github.io
     ```
   - For apex domain (no www):
     ```
     Type: A
     Name: @
     Value: 185.199.108.153
     Value: 185.199.109.153
     Value: 185.199.110.153
     Value: 185.199.111.153
     ```

### Option 2: Netlify (Best for Forms & Redirects)

1. **Connect Repository**
   - Log in to [Netlify](https://netlify.com)
   - "New site from Git"
   - Connect GitHub/GitLab/Bitbucket
   - Choose repository

2. **Configure Build**
   - Build command: `cd website && quarto render`
   - Publish directory: `website/_site`
   - Environment variables: None needed

3. **Deploy**
   - Netlify auto-deploys on push to main
   - Preview deploys for pull requests

4. **Configure Domains**
   - Site settings → Domain management
   - Add custom domain: `therittenhouseresidence.com`
   - Add domain alias: `1822pine.com`
   - Set primary domain: `therittenhouseresidence.com`
   
5. **DNS Settings at Your Registrar**
   ```
   Type: CNAME
   Name: www
   Value: [your-site].netlify.app
   
   OR for Netlify DNS:
   Use Netlify's nameservers
   ```

### Option 3: Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd website
   quarto render
   cd _site
   vercel --prod
   ```

3. **Add Domain**
   - In Vercel dashboard → Settings → Domains
   - Add `therittenhouseresidence.com`

### Option 4: Self-Hosted (Apache/Nginx)

1. **Build Site**
   ```bash
   cd website
   quarto render
   ```

2. **Upload to Server**
   ```bash
   rsync -avz _site/ user@server:/var/www/therittenhouseresidence.com/
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name therittenhouseresidence.com www.therittenhouseresidence.com;
       return 301 https://$server_name$request_uri;
   }
   
   server {
       listen 443 ssl http2;
       server_name therittenhouseresidence.com www.therittenhouseresidence.com;
       
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
       
       root /var/www/therittenhouseresidence.com;
       index index.html;
       
       # Redirect 1822pine.com
       if ($host = '1822pine.com') {
           return 301 https://therittenhouseresidence.com$request_uri;
       }
   }
   ```

## Domain Configuration

### Domain Redirect Setup

You own both domains:
- Primary: `therittenhouseresidence.com`
- Redirect: `1822pine.com` → `therittenhouseresidence.com`

#### Using Cloudflare (Recommended)
1. Add both domains to Cloudflare
2. Set up Page Rules:
   ```
   1822pine.com/* 
   Forwarding URL (301)
   https://therittenhouseresidence.com/$1
   ```

#### Using Netlify
- Automatic with `netlify.toml` configuration (already included)

#### Using DNS Provider
- Some providers offer URL forwarding
- Set 301 permanent redirect

## SEO & Analytics

### 1. Verify Site Ownership
- Google Search Console: Add TXT record or HTML file
- Bing Webmaster Tools: Similar verification

### 2. Submit Sitemap
- Google: `https://therittenhouseresidence.com/sitemap.xml`
- Bing: Same URL

### 3. Add Analytics (Optional)

**Google Analytics 4:**
Add to `_quarto.yml`:
```yaml
website:
  google-analytics: "G-XXXXXXXXXX"
```

**Plausible (Privacy-friendly):**
Add to `_quarto.yml`:
```yaml
format:
  html:
    include-in-header:
      - text: |
          <script defer data-domain="therittenhouseresidence.com" 
                  src="https://plausible.io/js/script.js"></script>
```

## Continuous Deployment

### GitHub Actions (Automatic)
The included `.github/workflows/deploy.yml` automatically:
- Builds on push to main
- Deploys to GitHub Pages
- Creates preview for pull requests

### Manual Deploy Commands

**Quick Deploy to GitHub Pages:**
```bash
cd website
quarto publish gh-pages --no-browser
```

**Quick Deploy to Netlify:**
```bash
git add .
git commit -m "Update content"
git push origin main
# Netlify auto-deploys
```

## Content Updates

### Update Process
1. Edit `.qmd` files in `website/`
2. Preview locally: `quarto preview`
3. Commit changes: `git add . && git commit -m "Update content"`
4. Push to deploy: `git push origin main`

### Adding New Pages
1. Create new `.qmd` file
2. Add to navigation in `_quarto.yml`
3. Link from other pages as needed

### Updating Photos
1. Add to `website/images/property/`
2. Update `photo-catalog.json` with metadata
3. Reference in `.qmd` files: `![Alt text](images/property/filename.jpg)`

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .quarto _site
quarto render --execute-daemon-restart
```

### Images Not Showing
- Check file paths (case-sensitive on Linux)
- Verify images copied to `_site/images/`

### Domain Not Working
- Check DNS propagation: `dig therittenhouseresidence.com`
- Verify CNAME/A records
- Wait 24-48 hours for full propagation

### Forms Not Working (Netlify)
- Ensure `data-netlify="true"` on form
- Check Netlify dashboard → Forms section

## Performance Optimization

### Image Optimization
```bash
# Using ImageMagick
for img in images/property/*.jpg; do
    convert "$img" -quality 85 -resize 1600x1600\> "$img"
done

# Using WebP (better compression)
for img in images/property/*.jpg; do
    cwebp -q 80 "$img" -o "${img%.jpg}.webp"
done
```

### Enable Caching
- Cloudflare: Page Rules for static assets
- Netlify: Automatic with `netlify.toml`
- Self-hosted: Configure in web server

### Monitor Performance
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [GTmetrix](https://gtmetrix.com)
- Chrome DevTools Lighthouse

## Security Checklist

- [ ] HTTPS enabled (automatic with GitHub Pages/Netlify)
- [ ] Security headers configured (in `netlify.toml`)
- [ ] No sensitive data in repository
- [ ] Regular dependency updates
- [ ] Form spam protection (Netlify Forms has built-in)

## Support

### Quarto Help
- Documentation: [quarto.org](https://quarto.org)
- GitHub: [github.com/quarto-dev/quarto-cli](https://github.com/quarto-dev/quarto-cli)

### Deployment Platform Support
- GitHub Pages: [docs.github.com/pages](https://docs.github.com/pages)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- Vercel: [vercel.com/docs](https://vercel.com/docs)

## Next Steps

1. **Install Quarto** (see Prerequisites)
2. **Preview locally**: `cd website && quarto preview`
3. **Choose deployment method** (GitHub Pages recommended)
4. **Configure domain** (DNS settings)
5. **Deploy**: `quarto publish gh-pages`
6. **Verify**: Visit https://therittenhouseresidence.com

---

*Last updated: August 2024*