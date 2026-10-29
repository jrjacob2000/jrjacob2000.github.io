# JRJacob Launchpad (`jrjacob2000.github.io`)

Application Launchpad for the three financial and stewardship applications created by **JRJacob (`@jrjacob2000`)**:

1. **[GraceBooks — Church Financial Tracker](https://jrjacob2000.github.io/Grace-Book/)**
2. **[CapitalFlow — Income, Expense & Savings Ledger](https://jrjacob2000.github.io/Capital-Flow/)**
3. **[Clan E-Fund Ledger — Collaborative Emergency & Investment Fund](https://jrjacob2000.github.io/Clan-eFund/)**

## GitHub Pages Deployment

This repository includes an automated GitHub Actions workflow at `.github/workflows/deploy.yml` that builds the Vite + React application and deploys the `./dist` bundle to GitHub Pages on every push to `main` or `master`.

### One-Time Repository Setup on GitHub
1. Push or sync this project to your `jrjacob2000/jrjacob2000.github.io` repository on GitHub.
2. Open your repository on GitHub and go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions** (instead of *Deploy from a branch*).
4. Once enabled, any push to `main` (or clicking **Run workflow** under the **Actions** tab) will automatically build and publish the Launchpad to `https://jrjacob2000.github.io/`.

## Local Development

```bash
npm install
npm run dev
npm run build
```