# Robot Last Exam

Human Manipulation Frontier — 人类操作的终极挑战。

A bilingual gallery of 37 real-world manipulation challenges, with video examples, local thumbnails, and a video submission form.

## Website

https://tigerdwgth.github.io/RobotLastExam/

## Local preview

```sh
python3 -m http.server 4177
```

Open http://localhost:4177/. No build step or dependencies are required.

## Editing

- `catalogue.js`: challenge titles and categories
- `media.js`: video examples and thumbnail paths
- `i18n.js`: English translations
- `scores.js`: illustrative comparison values (not measured benchmark results)
- `submission.js`: prepares an email for the visitor to send; no server-side submission storage
- `styles.css` / `motion.js`: styling and motion

Surgical footage remains hidden until the visitor confirms. Video playback uses YouTube; thumbnails, fonts and icons are served locally.

## Deployment

GitHub Pages serves the root of the `main` branch. Push changes to `main` to update the site.

## Third-party assets

Linked videos belong to their respective publishers. Bundled font and icon license notices are included under `assets/`.
