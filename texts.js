topTextMD = `<div id="top"></div>

<!-- PROJECT LOGO -->
<div align="center">

<img src="images/header.png" alt="header" />

<br />

# Web media resources

This repository contains a collection of free, high-quality multimedia resources that you can use in your web projects. Here you will find icons, images, videos, illustrations, sounds and more. All resources are licensed under the Creative Commons or public domain, which means you can use them without asking permission or giving credit to the authors (although it is appreciated). I hope you enjoy these resources and share them with others.

  <a href="https://github.com/cosmoart/free-multimedia-resources">Contribute</a>
  ·
  <a href="https://github.com/cosmoart/free-multimedia-resources/issues">Report Bug</a>
  ·
  <a href="https://github.com/cosmoart/free-multimedia-resources/discussions">Request Feature</a>
</div>



<!-- TABLE OF CONTENTS -->
<h2>Table of contents</h2>

- [Icons](#icons)
- [Ilustrations](#ilustrations)
- [Photos](#photos)
- [Videos](#videos)
- [Backgrounds/Patterns](#backgroundspatterns)
- [Loaders](#loaders)`

function tableTemplateMD (props) {
	const [first = {}, second = {}, third = {}] = props;

	return `<tr>
		<td><a href="${first.link}"><img src="${first.img}" alt="${first.title}"></a></td>
		${second.link && `<td><a href="${second.link}"><img src="${second.img}" alt="${second.title}"></a></td>`}
		${third.link && `<td><a href="${third.link}"><img src="${third.img}" alt="${third.title}"></a></td>`}
	</tr>
	<tr>
		<td><a href="${first.link}">${first.title}</a></td>
		${second.link && `<td><a href="${second.link}">${second.title}</a></td>`}
		${third.link && `<td><a href="${third.link}">${third.title}</a></td>`}
	</tr>
	<tr>
		<td>${first.description}</td>
		${second.description && `<td>${second.description}</td>`}
		${third.description && `<td>${third.description}</td>`}
	</tr>
	<tr>
		<td><a href="${first.licencelink}">licence: ${first.licence}</a> </td>
		${second.licencelink && `<td><a href="${second.licencelink}">licence: ${second.licence}</a></td>`}
		${third.licencelink && `<td><a href="${third.licencelink}">licence: ${third.licence}</a></td>`}
	</tr>`
}

module.exports = {
	topTextMD,
	tableTemplateMD
}