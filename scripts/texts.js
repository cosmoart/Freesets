topTextMD = `<div id="top"></div>

<!-- PROJECT LOGO -->
<div align="center">

![header](./images/header.webp)

# Free multimedia resources

</div>

This repository contains a collection of free, high-quality multimedia resources that you can use in your projects. Here you will find icons, photos, videos, illustrations, patterns and more. All resources have at least one free plan and they are ordered by quality.

I hope you enjoy these resources and if you have any suggestions, please post them in the [discussion section](https://github.com/cosmoart/free-multimedia-resources/discussions) or if you find any errors, please report them in the [issues section](https://github.com/cosmoart/free-multimedia-resources/issues).

<div align="center">
  <a href="https://github.com/cosmoart/free-multimedia-resources">Contribute</a>
  ·
  <a href="https://github.com/cosmoart/free-multimedia-resources/issues">Report error</a>
  ·
  <a href="https://github.com/cosmoart/free-multimedia-resources/discussions">Suggest resource</a>
</div>


<!-- TABLE OF CONTENTS -->
## Table of contents

- [Icons](#-icons)
- [Ilustrations](#%EF%B8%8F-ilustrations)
- [Photos](#-photos)
- [Videos](#-videos)
- [Backgrounds/Patterns](#%EF%B8%8F-backgroundspatterns)
- [Loaders](#-loaders)

`

function tableTemplateMD (props) {
	const [first = {}, second = {}, third = {}] = props;

	return `<tr>
		<td><a href="${first.link}"><img src="${first.img}" alt="${first.title}"></a></td>${second.link ? `<td><a href="${second.link}"><img src="${second.img}" alt="${second.title}"></a></td>` : ''}${third.link ? `<td><a href="${third.link}"><img src="${third.img}" alt="${third.title}"></a></td>` : ''}
	</tr>
	<tr>
		<td><a href="${first.link}">${first.title}</a></td>${second.link ? `<td><a href="${second.link}">${second.title}</a></td>` : ''}${third.link ? `<td><a href="${third.link}">${third.title}</a></td>` : ''}
	</tr>
	<tr>
		<td>${first.description}</td>${second.description ? `<td>${second.description}</td>` : ''}${third.description ? `<td>${third.description}</td>` : ''}
	</tr>
	<tr>
		<td><a href="${first.licencelink}">Licence: ${first.licence}</a> </td>${second.licencelink ? `<td><a href="${second.licencelink}">Licence: ${second.licence}</a></td>` : ''}${third.licencelink ? `<td><a href="${third.licencelink}">Licence: ${third.licence}</a></td>` : ''}
	</tr>`
}

module.exports = {
	topTextMD,
	tableTemplateMD
}