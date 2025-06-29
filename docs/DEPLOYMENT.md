# Deployment Guide

This guide covers deploying SnapRecipe to various platforms and environments.

## Prerequisites

- Node.js 18+ installed
- Git repository cloned
- Environment variables configured
- API keys obtained

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Replicate
REPLICATE_API_KEY=your_replicate_api_key

# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=SnapRecipe
```

## Vercel Deployment (Recommended)

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy

```bash
vercel
```

### 4. Configure Environment Variables

In the Vercel dashboard:
1. Go to your project settings
2. Navigate to Environment Variables
3. Add all required environment variables

### 5. Custom Domain (Optional)

1. Go to Domains in your Vercel project
2. Add your custom domain
3. Configure DNS records as instructed

## Firebase Hosting

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Initialize Firebase

```bash
firebase init hosting
```

### 4. Build the Project

```bash
npm run build
```

### 5. Deploy

```bash
firebase deploy
```

## Docker Deployment

### 1. Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 2. Build Docker Image

```bash
docker build -t snaprecipe .
```

### 3. Run Container

```bash
docker run -p 3000:3000 --env-file .env.local snaprecipe
```

### 4. Docker Compose (Optional)

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  snaprecipe:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.local
```

Run with:
```bash
docker-compose up -d
```

## AWS Deployment

### 1. AWS Amplify

1. Connect your GitHub repository to AWS Amplify
2. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```
3. Add environment variables in Amplify console
4. Deploy automatically on push to main branch

### 2. AWS EC2

1. Launch EC2 instance with Ubuntu
2. Install Node.js and PM2:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```
3. Clone repository and install dependencies
4. Build the project
5. Start with PM2:
   ```bash
   pm2 start npm --name "snaprecipe" -- start
   pm2 startup
   pm2 save
   ```

## Production Checklist

### Performance Optimization

- [ ] Enable Next.js image optimization
- [ ] Configure CDN for static assets
- [ ] Enable compression (gzip/brotli)
- [ ] Implement caching strategies
- [ ] Optimize bundle size

### Security

- [ ] Set up HTTPS/SSL certificates
- [ ] Configure security headers
- [ ] Implement rate limiting
- [ ] Set up monitoring and logging
- [ ] Regular security updates

### Monitoring

- [ ] Set up error tracking (Sentry)
- [ ] Configure performance monitoring
- [ ] Set up uptime monitoring
- [ ] Implement logging solution
- [ ] Set up alerts for critical issues

## Environment-Specific Configurations

### Development

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Staging

```env
NODE_ENV=staging
NEXT_PUBLIC_APP_URL=https://staging.snaprecipe.com
```

### Production

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://snaprecipe.com
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable naming (NEXT_PUBLIC_ prefix for client-side)
   - Verify API keys are valid

3. **Performance Issues**
   - Enable Next.js production mode
   - Optimize images and assets
   - Implement proper caching

4. **Deployment Failures**
   - Check build logs for errors
   - Verify platform-specific requirements
   - Ensure proper permissions and access

### Support

For deployment issues:
- Check platform-specific documentation
- Review build logs and error messages
- Contact platform support if needed
- Open issues in the repository for project-specific problems 