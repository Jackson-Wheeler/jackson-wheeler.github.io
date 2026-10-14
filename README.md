# Jackson Wheeler — Personal Site

Source for Jackson Wheeler's public landing page at **https://jackson-wheeler.github.io**: a home for his projects.

Built with [Astro](https://astro.build). The dev environment comes from [Nix](https://nixos.org), and the site deploys to GitHub Pages through GitHub Actions on every push to `master`.

## Prerequisites

- [Nix](https://nixos.org/download) with flakes enabled (`experimental-features = nix-command flakes`). Node.js (currently `nodejs_26`, pinned via `flake.lock`) comes from Nix, both locally and in CI.
- Without Nix, you need Node.js **22.12+** (`engines` in `package.json`). Astro 7 won't run on Node 20.

## Quick start

```sh
nix develop      # Node.js shell from Nix; runs `npm ci` automatically when needed
npm run dev      # http://localhost:4321
```

Without Nix: `npm ci && npm run dev`.

The dev shell runs `npm ci` whenever `node_modules` is missing or `package-lock.json` has changed (it compares against a hash saved in `node_modules/.package-lock.sha256`).

## Scripts

| Command           | Action                                      |
| ----------------- | ------------------------------------------- |
| `npm ci`          | Install exact dependencies from lockfile    |
| `npm run dev`     | Start dev server at `http://localhost:4321` |
| `npm run build`   | Build production site to `./dist`           |
| `npm run preview` | Preview the production build locally        |

## Project structure

```
.
├── .github/workflows/deploy.yml  # Build + deploy to GitHub Pages
├── src/pages/index.astro         # Landing page
├── astro.config.mjs              # Astro config (site URL)
├── flake.nix / flake.lock        # Nix dev shell (Node.js from nixpkgs-unstable)
├── package.json / package-lock.json
└── tsconfig.json
```

## Deployment

A push to `master` (or a manual `workflow_dispatch`) runs `.github/workflows/deploy.yml`. The workflow installs Nix, builds with `nix develop -c npm run build`, and publishes `./dist` to GitHub Pages. Pull requests against `master` run the build only and never deploy. The repo's Pages source must be set to **GitHub Actions**.
