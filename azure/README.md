# Azure Static Web Apps Deployment

## Build Settings

- **Build command:** `pnpm build`
- **Output folder:** `out`

## Steps

1. Push the repository to GitHub.
2. In Azure Static Web Apps, create a new static app and connect the repo.
3. Set the app location to `/` and output location to `out`.
4. Ensure `staticwebapp.config.json` is in the repo root.
5. Deploy. The site is exported via `next export` during `pnpm build`.

## Notes

- The build uses `output: "export"` for static output.
- Images are configured as `unoptimized` for static hosting.
