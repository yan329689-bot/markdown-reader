# Deploy Web Version to Vercel

The web version is a static site. Vercel should serve the `dist/` directory directly and should not build the Electron desktop app.

## Deploy From GitHub

1. Push this project to a GitHub repository.
2. Open Vercel and choose **Add New... > Project**.
3. Import the GitHub repository.
4. Keep the project root as the repository root.
5. Vercel will read `vercel.json` automatically:
   - Framework Preset: Other
   - Install Command: skipped
   - Build Command: skipped
   - Output Directory: `dist`
6. Click **Deploy**.

After deployment, Vercel will give you a public URL like:

```text
https://your-project.vercel.app
```

## Deploy From CLI

If you have the Vercel CLI installed and are logged in:

```bash
vercel --prod
```

Run this command from the project root.

## Privacy Note

The web app reads Markdown files in the user's browser. Files selected through the browser file picker are not uploaded to a server by this app.

The browser version cannot access arbitrary local file paths. That is expected browser security behavior. The Electron desktop version has additional local-file access through its preload API.
