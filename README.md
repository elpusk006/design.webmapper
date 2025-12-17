# Elpusk Card Reader Web Tools

A web-based configuration utility for Elpusk card readers (LPU237, LPU-207, and LPU208). 

## 🌐 Live Demo
The application is automatically deployed to: [https://elpusk006.github.io](https://elpusk006.github.io)

## 📥 Getting Started

### 1. Pulling from GitHub
If you are on a new machine or want to update your local files from the GitHub repository, use these commands in your terminal:

**To clone for the first time:**
```bash
git clone https://github.com/elpusk006/elpusk006.github.io.git
cd elpusk006.github.io
```

**To pull the latest changes:**
```bash
git pull origin main
```

### 2. Local Development
To run the app on your computer:

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

### 🛠 Troubleshooting `ECONNRESET`
If you see the `ECONNRESET` error during `npm install`, it is usually caused by a network proxy or cache issue. Run these commands to fix it:

```bash
# Remove proxy settings
npm config rm proxy
npm config rm https-proxy

# Clear the npm cache
npm cache clean --force

# Try installing again
npm install
```

## 🚀 Deployment
This project uses **GitHub Actions** for automated deployment. 

1. **Push to GitHub**: Whenever you push code to the `main` branch, a workflow starts.
2. **Build**: GitHub's servers run `npm install` and `npm run build`.
3. **Deploy**: The resulting files are automatically sent to the `gh-pages` environment.

You can monitor the status of your deployments in the **Actions** tab of your GitHub repository.

## 💻 Tech Stack
- **React 19**: UI Framework
- **TypeScript**: Type safety
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Styling
- **Lucide React**: Iconography
