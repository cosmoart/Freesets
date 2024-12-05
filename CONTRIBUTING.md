# Contributing

Thank you for your interest in contributing to Freesets! You can help us by contributing new resources or improving the website.

You can contribute new resources to Freesets in two different ways:
- [Suggesting the resource(s) in discussions or issues.](https://github.com/cosmoart/Freesets/issues)
- [Making a pull request.](#making-a-pull-request)

**Before suggesting a resource make sure that:**

- The resource is completely or partially free.
- The resource is not already in the database.
- There is a category for the resource (if not, you can suggest it in the discussions).
- The resource follows the [correct structure](#resource-structure).

## Making a pull request

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

## Resource structure

- id*: `number - required`
	- Unique number: an id should not be repeated in the same json file.
	- It is recommended to add the new resources at the end and follow the order with the previous ids.
- order*: `number - required`
	-  Number between 0 and 100 that represents the quality of the resource. Being 0 bad and 100 excellent.
	-	 To rate the quality of a resource, you can use criteria like: UI/UX design, how permissive the license is (CC0 is great, needing to attribute or not use in commercial projects not so much), is it completely free or just some elements, etc.
- name*: `string - required`- Name of the resource.
- link*: `string - required` - Link to the resource.
- img*: `string - required` - Image URL
	- It must follow the following format: https://res.cloudinary.com/cosmocloudinary/image/upload/freesets/category/name, where category is the category of the image (icons, tools, 3d...) and name It is a unique name that should not be repeated (bootstrap, css_tools, gratisography...). An example can be: https://res.cloudinary.com/cosmocloudinary/image/upload/freesets/photos/rjsgqt0ldn8betpkcm.
	- You don't need to upload any photos, just complete the url.
- license: `string`
	- License of the resource.
	- If you need to add a description to the license and the resource does not have a clear license, you can use words like "Free", "Freemium" or "Free with attribution".
- licenseLink: `string` - Link to the resource license.
- licenseDescription: `string` - Description and important information of the license.
- tags: `array of strings` - Tags, for example: `IA`, `React`, `Library`, `Loaders`...

```json
{
	"id": 23,
	"order": 73,
	"name": "Resource name",
	"link": "https://resource.com",
	"img": "https://res.cloudinary.com/cosmocloudinary/image/upload/freesets/category/name",
	"license": "Free",
	"licenseLink": "https://resource.com/licence",
	"licenseDescription": "\"License may use the Work in non-commercial and commercial projects, services or products without attribution.\"",
	"tags": ["IA", "React", "Library", "3D"]
}
```
