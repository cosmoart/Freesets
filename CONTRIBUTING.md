# 🚀 Contributing to Freesets

Thank you for your interest in contributing to Freesets! You can help us by contributing new resources or improving the website.

You can contribute [suggesting the resource(s) in discussions or issues.](https://github.com/cosmoart/Freesets/issues) or [making a pull request.](#making-a-pull-request)

**Before suggesting a resource make sure that:**

- The resource is completely or partially free.
- The resource is not already in the database.
- There is a category for the resource (if not, you can suggest it in the discussions).
- The resource follows the [correct structure](#resource-structure).

## ⚙️ Making a pull request

To make a pull request follow the following steps:

1. Fork the repository on GitHub.

2. Clone your forked repository.

```bash
git clone https://github.com/your-username/freesets
```

3. Navigate to the repository directory.

```bash
cd freesets
```

> Or you can use `code freesets` to open the repository in Visual Studio Code.

4. Create a new branch. This step is optional, but recommended.

```bash
git checkout -b your-branch-name
```

5. Make the changes in the website or add your resources to the jsons files in `source-web/src/assets/db`.

6. Add your changes to the staging area.

```bash
git add .
```

7. Commit your changes.

```bash
git commit -m "✨ add resources"
```

8. Push to the branch.

```bash
git push origin your-branch-name
```

9. Open a pull request.

## 📝 Resource structure

```json
{
	"id": 23,
	"order": 73,
	"name": "Resource name",
	"link": "https://resource.com",
	"img": "https://res.cloudinary.com/cosmocloudinary/image/upload/freesets/category/name",
	"license": "Free",
	"licenseLink": "https://resource.com/licence",
	"licenseDescription": "\"License may use the Work in non-commercial and commercial projects.\"",
	"tags": ["IA", "React", "Library", "3D"]
}
```

- `id` *(number, required)*: Unique sequential number for each resource.
- `order` *(number, required)*: Rating of the resource (0 = poor, 100 = excellent). Consider UI/UX, license permissiveness, and completeness.
- `name` *(string, required)*: Name of the resource.
- `link` *(string, required)*: URL to the resource.
- `img` *(string, required)*: Image URL following the format:

  ```
  https://res.cloudinary.com/cosmocloudinary/image/upload/freesets/{category}/{name}
  ```
  > *You don’t need to upload images, just provide the correct URL.*

- `license` *(string, optional)*: License type (e.g., "Free", "CC0", "Freemium", "Free with attribution").
- `licenseLink` *(string, optional)*: URL to the resource’s license.
- `licenseDescription` *(string, optional)*: Additional license details.
- `tags` *(array of strings, optional)*: Tags describing the resource (e.g., `AI`, `React`, `Library`, `3D`).

<br/>

Thank you for contributing to Freesets! 🚀