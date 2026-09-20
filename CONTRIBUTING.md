# 🚀 Contributing to Freesets

Thank you for your interest in contributing to Freesets! You can help us by contributing new resources or improving the website.

You can contribute [suggesting the resource(s) in discussions or issues](https://github.com/cosmoart/Freesets/issues) — the **Suggest** button on the site opens a prefilled issue for you — or [making a pull request](#-making-a-pull-request).

**Before suggesting a resource make sure that:**

- The resource is completely or partially free.
- The resource is not already in the database.
- There is a category for the resource (if not, you can suggest it in the discussions).
- The resource follows the [correct structure](#-resource-structure).

## ⚙️ Making a pull request

To make a pull request follow the following steps:

1. Fork the repository on GitHub.

2. Clone your forked repository.

```bash
git clone https://github.com/your-username/Freesets
```

3. Navigate to the repository directory.

```bash
cd Freesets
```

> Or you can use `code Freesets` to open the repository in Visual Studio Code.

4. Create a new branch. This step is optional, but recommended.

```bash
git checkout -b your-branch-name
```

5. Make the changes in the website or add your resources to the JSON files in `src/assets/db`.

6. Check your resources. **`npm test` is required before opening a pull request**, whether you added resources or changed the website:

```bash
npm install
npm run fix          # fixes what has one obvious answer
npm test             # checks every resource file
```

> `npm run fix` renumbers the ids of a category, trims stray spaces and drops repeated tags, so you rarely have to do it by hand. Add `-- --dry` to see what it would change without writing anything.

> `npm test` prints one line per category and, when a category fails, the problem and the resources behind it. Duplicated links, missing fields and broken URLs are left for you to fix — they need a decision `npm run fix` cannot make.

7. If you changed the website, check that too:

```bash
npm run dev          # http://localhost:4321
npm run check        # types and Astro components
npm run lint
npm run format
```

8. Add your changes to the staging area.

```bash
git add .
```

9. Commit your changes.

```bash
git commit -m "✨ add resources"
```

10. Push to the branch.

```bash
git push origin your-branch-name
```

11. Open a pull request.

## 📝 Resource structure

Each category has its own file in `src/assets/db`, holding a list of resources:

```json
{
	"id": 23,
	"order": 73,
	"name": "Resource name",
	"link": "https://resource.com",
	"img": "https://cdn.freesets.dev/icons/resource-name.avif",
	"license": "Free",
	"licenseLink": "https://resource.com/license",
	"licenseDescription": "\"License may use the Work in non-commercial and commercial projects.\"",
	"tags": ["AI", "React", "Library", "3D"],
	"added": "2026-09-15"
}
```

- `id` _(number, required)_: Unique sequential number inside its category file.
- `order` _(number, required)_: Rating of the resource (0 = poor, 100 = excellent). Consider UI/UX, license permissiveness, and completeness. It sets the order of the "Popular" sort.
- `name` _(string, required)_: Name of the resource.
- `link` _(string, required)_: URL to the resource.
- `img` _(string, required)_: Preview image URL following the format:

  ```
  https://cdn.freesets.dev/{category}/{name}.avif
  ```

  > _You don’t need to upload images, just provide the correct URL._ Copy the shape of the entries next to yours: a few categories keep their images in an older folder, and some older resources still point to Cloudinary. A preview is a 1280×720 AVIF screenshot of the site. Older entries still point to `.webp` files, which keep working.

- `license` _(string, optional)_: License type (e.g., "Free", "CC0", "Freemium", "Free with attribution").
- `licenseLink` _(string, optional)_: URL to the resource’s license.
- `licenseDescription` _(string, optional)_: Additional license details, shown when hovering the license badge.
- `tags` _(array of strings, optional)_: Tags describing the resource (e.g., `AI`, `React`, `Library`, `3D`). Cards show the first ones and collapse the rest into a counter, so put the most telling tags first.
- `added` _(string, required)_: ISO date, like `"2026-09-15"`. The newest resources appear under "Recently added" with a **New** badge.

## 🎨 Code style

Prettier and ESLint own the formatting, so just run `npm run format` before committing. The project uses tabs, single quotes and no semicolons, and Tailwind classes are sorted automatically.

Comments explain _why_ something is done, not what the code does. The whole codebase is in English.

<br/>

Thank you for contributing to Freesets! 🚀
