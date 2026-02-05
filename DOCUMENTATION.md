# ResuMatch — Documentation

Summary
-------
ResuMatch is a lightweight client-side Resume Builder with an integrated job-suggestion engine designed for students, fresh graduates, and OJT/internship applicants. It runs entirely in the browser (HTML, CSS, vanilla JavaScript) and exports resumes via the browser print/PDF flow.

Quick links
- Builder: `index.html`
- Landing page: `landing/index.html`
- Styles: `css/style.css`, `landing/style.css`
- Main script: `js/script.js`
- Landing script: `landing/script.js`

Features
--------
- Live resume preview while editing
- Export to PDF using the browser print dialog (print CSS included)
- Skills parsed from comma-separated input and rendered as pills
- Education, Experience, Projects, Certifications, Languages, Awards sections
- Simple client-side job suggestion engine that matches skills and keywords
- Interactive suggested jobs list with matched-skill highlighting
- Responsive, accessible layout and print-friendly styling

File structure
--------------
- `index.html` — Main resume builder application (form + preview)
- `css/style.css` — Main app styles and print rules
- `js/script.js` — App behaviour: preview rendering and job suggestions
- `landing/` — Landing page assets
  - `landing/index.html` — Landing page
  - `landing/style.css` — Landing page styles
  - `landing/script.js` — Landing interactions (smooth scroll, CTA)
- `README.md` — Usage summary and small notes
- `DOCUMENTATION.md` — This file

How to run locally
-------------------
No build step required. From the project root:

Windows (PowerShell):
```powershell
start index.html
# or open the landing page
start landing\index.html
```

Usage guide — Builder
---------------------
1. Open `index.html` in your browser.
2. Fill the form fields on the left. Use:
   - Skills: comma-separated (e.g. `JavaScript, React, CSS`)
   - Experience/Education/Projects: one entry per line
3. The preview on the right updates in real time. Empty sections are hidden automatically.
4. Click **Export to PDF** to open the print dialog and save as PDF. Use "Save as PDF" and set margins as needed.

Job suggestion engine
---------------------
- Implemented in `js/script.js` as a small dataset `JOB_ROLES` of roles with `skills` and `keywords` arrays.
- Matching steps:
  1. Collect resume text (title, summary, experience, education, projects, certifications).
  2. Parse skills from the `skills` input.
  3. For each job role, match skills and keywords against resume text and computed skills.
  4. Score matches (weighted) and return sorted suggestions.
- UI: suggestions render under the preview; clicking a suggestion toggles details and highlights matched skill pills.

Extending job roles
-------------------
To improve or add roles, edit `js/script.js` and the `JOB_ROLES` constant. Each entry should follow:
```js
{ title: 'Frontend Developer', skills: ['html','css','javascript'], keywords: ['frontend','ui','ux'] }
```
Tips:
- Add likely skills/aliases (e.g. `js`, `javascript`) so the simple matcher finds them.
- Use lowercase for keywords/skills when adding; the matcher uses case-insensitive comparisons.

Customizing visuals
-------------------
- Primary colors and gradients are defined in CSS variables near the top of `css/style.css` and `landing/style.css` (look for `:root`).
- Update `--primary`, `--primary-2`, and `--accent-3` to change the palette globally.

Accessibility
-------------
- Form fields are associated with labels and grouped using `fieldset`/`legend`.
- The preview region uses `role="region"` and `aria-live="polite"` for assistive updates.
- Buttons and interactive elements are keyboard accessible.

Print & PDF notes
-----------------
- Export uses `window.print()` and `@media print` rules in `css/style.css` to present a clean single-page layout.
- Browser print settings (margins, scale) affect the final PDF; recommend Chrome/Edge for consistent results.

Limitations & security
----------------------
- All matching happens client-side; there is no server or persistence.
- Because no backend is used, storing drafts requires adding localStorage support if needed.
- No external libraries are used; downloadable PDF works via the browser print flow.

Development notes
-----------------
- Files are plain HTML/CSS/JS so they can be edited with any text editor.
- There are no automated tests currently included.

Next steps / Suggested improvements
---------------------------------
- Add localStorage save/load for drafts.
- Add multiple resume templates and an ATS-friendly export option.
- Add theme switcher (light/dark) and persisted user preference.
- Improve the job-matching algorithm (fuzzy matching, synonyms, weights).
- Add dynamic add/remove controls for experience and education entries.

Contact
-------
If you want help extending features or deploying the app, tell me which enhancement you'd like and I can implement it.
