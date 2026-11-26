# jazminricks.com

Your personal site. It is plain HTML, CSS and JavaScript, so it runs anywhere with no build step.

## What's in this folder

| File | What it does |
|---|---|
| `index.html` | All of the site's content: bio, experience, portfolio, resources, recognition |
| `styles.css` | Colors and styling, including the four color themes |
| `script.js` | The tabs and the project-to-skills highlighting |
| `assets/` | Put your headshot and resume PDF here |

## Preview it

Double-click `index.html` to open it in your browser.

## Before you publish

1. **Headshot:** Save your photo as `assets/headshot.jpg` (a portrait about 4:5 works best). Until it's there, the photo spot simply doesn't show.
2. **Resume:** Save your resume as `assets/Jazmin_Ricks_Resume.pdf` so "Download my resume" works.
3. **Email:** The "Email me" button goes to `hi@jazminricks.com`. Set up that address with your domain, or search `index.html` for `mailto:` and swap in the address you want.
4. **Placeholders:** Search `index.html` for `[` and fill in:
   - `[Funder or partner]` for the Cobbs Creek Vision Report and the Marlton survey
   - `[Years]` for the NOAA flood resilience project
   - `[Year]` for the Marlton survey

## Change the color theme

Open `index.html`, and in the first lines change `data-theme="copper"` to one of:

- `copper` (Warm Paper and Copper)
- `klein` (Klein Light)
- `midnight` (Midnight Klein)
- `original` (the navy Instrument Panel)

## Publish it on GitHub Pages

1. Create a new repository on GitHub (for example `jazminricks-site`) and upload everything in this folder.
2. In the repository, go to **Settings > Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. After a minute or two the site is live at `https://<your-username>.github.io/jazminricks-site/`.

## Connect jazminricks.com (Porkbun)

1. In GitHub **Settings > Pages**, enter `jazminricks.com` as the custom domain and save. GitHub adds a `CNAME` file for you.
2. In Porkbun's DNS settings for the domain, add the records GitHub lists in its custom domain guide: four `A` records for the bare domain, and a `CNAME` record for `www` pointing to `<your-username>.github.io`.
3. Once GitHub confirms the domain, tick **Enforce HTTPS**.

DNS changes can take up to a day to show up.

## Editing later

- **Text:** Edit `index.html` directly. Each section is labeled with a comment, such as `<!-- work -->`.
- **Which skills light up for each project:** Edit the `PROJECTS` list near the top of `script.js`. The codes match the `data-skill` values in `index.html`.
