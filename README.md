<div id="top"></div>

<!-- PROJECT LOGO -->

<div align="center">

![header](./readme/header.svg)

# Freesets

**[freesets.dev](https://freesets.dev)**

</div>

Freesets is a collection of free, high-quality resources that you can use in your web projects. Here you will find icons, images, videos, illustrations, fonts and more. All resources have at least one free version or free plan, but please read the license before using them. You can contribute to this project by suggesting new resources or making a pull request.

<div align="center">

<a href="https://github.com/cosmoart/Freesets/blob/main/CONTRIBUTING.md">Contribute</a>
·
<a href="https://github.com/cosmoart/Freesets/issues">Report Bug/Error</a>
·
<a href="https://github.com/cosmoart/Freesets/discussions">Request Feature</a>

</div>

## ✨ Features

- **14 categories** of resources, each with its own page, search and sorting (popular, newest, A–Z).
- **Site-wide search** with filters by category and license, from the header or the search page.
- **A grid you can shape**: pick between 2 and 6 columns and how many resources fit on a page.
- **Light and dark themes**, following the system by default.

## 🛠️ Built with

[Astro](https://astro.build) · [Tailwind CSS](https://tailwindcss.com) · TypeScript

No UI framework: every page is static HTML with a little browser-side TypeScript for search, filters and pagination.

## 🚀 Getting started

You need [Node.js](https://nodejs.org) 22.12 or newer.

```bash
git clone https://github.com/cosmoart/Freesets
cd Freesets
npm install
npm run dev
```

The site runs at `http://localhost:4321`.

| Command                | What it does                          |
| :--------------------- | :------------------------------------ |
| `npm run dev`          | Starts the dev server                 |
| `npm run build`        | Builds the site to `dist/`            |
| `npm run preview`      | Serves the built site locally         |
| `npm run check`        | Checks types and Astro components     |
| `npm run lint`         | Runs ESLint                           |
| `npm run format`       | Formats the code with Prettier        |
| `npm run format:check` | Checks the formatting without writing |

> The first build downloads and optimizes every resource preview, so it takes a while. Later builds reuse the cache.

## 📁 Project structure

```text
src/
├── assets/
│   ├── db/            # The resources, one JSON file per category
│   └── categories.ts  # Category names, descriptions and colors
├── components/        # Cards, search, category bar, dialogs
├── layouts/           # The page shell
├── lib/               # Build-time helpers (GitHub stars, preview images)
├── pages/             # Home, category pages, search and the search index
├── scripts/           # Browser-side helpers: search, filters, pagination
├── styles/            # Global styles and design tokens
└── types.ts           # Resource and category types
public/
└── categories-icons/  # One icon per category
```

## 🤝 Contributing

Everyone is welcome to collaborate with this project. Adding a resource means adding one entry to a JSON file in `src/assets/db`. Before contributing, please read the [contribution guide](https://github.com/cosmoart/Freesets/blob/main/CONTRIBUTING.md).

If you would rather not open a pull request, use the **Suggest** button on the site: it opens a prefilled issue for you.

## 📄 License

Website code distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information. Each resource keeps its own license, shown on its card.

## 👥 Contributors

<a href="https://github.com/cosmoart/Freesets/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=cosmoart/Freesets" />
</a>
