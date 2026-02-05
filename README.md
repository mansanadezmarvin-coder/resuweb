# Resume Builder

Simple client-side resume builder that previews a resume and exports it to PDF.

Files created:

- index.html
- css/style.css
- js/app.js


Usage:

1. Open `index.html` in your browser (double-click or use a local server).

2. Fill in your information. The preview updates in real time; you can also click **Update Preview**.

3. Click **Export to PDF** to open the print dialog and save as PDF. The app uses the browser print feature (no external libraries).

Notes:

- For best results, use Chrome or Edge and choose "Save as PDF" in the print dialog.
- Adjust print margins in the browser print dialog or tweak `css/style.css` `@media print` rules for layout.
- The UI is responsive: on small screens the preview stacks below the form.
Publishing (GitHub Pages, Netlify, Vercel)
----------------------------------------

1) Quick — GitHub Pages (recommended for static sites):

	- Create a repository on GitHub or run locally:

		```powershell
		git init
		git add .
		git commit -m "Initial commit"
		# create remote on GitHub (replace <owner>/<repo>)
		git remote add origin https://github.com/<owner>/<repo>.git
		git branch -M main
		git push -u origin main
		```

	- This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml` which will automatically deploy the site to GitHub Pages when you push to `main`.
	- After the first successful run go to the repository Settings → Pages and confirm the site is published (the action will create the Pages deployment).

2) Drag-and-drop — Netlify:

	- Open https://app.netlify.com/drop and drop the project folder to deploy instantly.

3) Vercel (CLI or web):

	- Sign in at https://vercel.com and import the GitHub repository or install `vercel` CLI and run `vercel`.

Notes:

- The GitHub Actions workflow included deploys the repository root as a static site. If you want only a subset (e.g., the `landing/` folder), update the workflow `path` in `.github/workflows/deploy.yml` to the folder name.
- If you prefer I can add a small `CNAME` file, set up an `index.html` move, or change the workflow to deploy a specific folder — tell me your preferred provider and repo name and I can add those changes.

New features:

- Extra personal fields: Age, Address, City/Country, LinkedIn/Portfolio.
- Education, Certifications, Projects, Languages, Awards sections (one-per-line).
- "Recommended Jobs" suggestions generated from resume content using a simple keyword/skill matcher.
- Click a suggested job to see matching reasons and highlight matched skills in the preview.


