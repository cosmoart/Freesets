# Contributing

Thank you for your interest in contributing to Freesets! You can help us by contributing new resources or improving the website.

You can contribute new resources to Freesets in two different ways:
- [Suggest the resource(s) in discussions.](#suggest-resources)
- [Make a pull request.](#make-a-pull-request)

**Before suggesting a resource make sure that:**
- The resource has at least one free version or free plan.
- The resource is not already in the list.
- There is a category for the resource (if not, you can suggest it in the discussions).

## Suggest resources

Create a [new discussion](https://github.com/cosmoart/free-resources/discussions/new/choose) with the resource(s) according to the [resource structure](#resource-structure). If you want to suggest several resources you can do so in the same discussion, it is not necessary to create a new one for each one.


## Make a pull request

To make a pull request follow the following steps:

1. Clone the repository

```bash
git clone https://github.com/cosmoart/free-resources
```

2. Create your branch

```bash
git checkout -b my-branch
```

3. Make the changues in the website or add your resources to the jsons files in the `source-web/src/assets/data` folder using the [resource structure](#resource-structure).

4. Commit your changes.

```bash
git commit -m "✨ add: 4 icons, 2 fonts and 1 illustration"
```

5. Push to the branch

```bash
git push origin my-branch
```

6. Open a pull request

## Resource structure

- name*: Name of the resource
- link*: Link to the resource
- img*: Path to the image. The image must look good in the 16:9 aspect ratio and be no larger than 100KB. The resolution 1280px x 720px and the `.webp` format is recommended. You can use [squoosh](https://squoosh.app/) to optimize and convert the image to webp.
- License: License of the resource.
- LicenseLink: Link to the resource license.
- LicenseDescription: Description and important information of the license.
- Tags: Tags, for example: `IA`, `React`, `Library`, `Loaders`...

```json
{
	"name": "Resource name",
	"link": "https://resource.com",
	"img": "./images/icons/iconmonstr.webp",
	"license": "Free",
	"licenseLink": "https://resource.com/licence",
	"licenseDescription": "\"License may use the Work in non-commercial and commercial projects, services or products without attribution.\"",
	"tags": ["IA", "React", "Library", "3D"]
}
```

> Note: Try to make the name and license as short as possible for better display.