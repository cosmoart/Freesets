const icons = require('../data/icons.json');
const ilustrations = require('../data/ilustrations.json');
const photos = require('../data/photos.json');
const videos = require('../data/videos.json');
const backgrounds = require('../data/backgrounds.json');
const loaders = require('../data/loaders.json');

const fs = require('fs');
const { topTextMD, tableTemplateMD } = require('./texts');

function convertJsonToText (json, title) {
	let text = "";

	json.forEach((_, index) => {
		if (index % 3 === 0) {
			text += tableTemplateMD([json[index], json[index + 1], json[index + 2]]);
		}
	});

	// 	return `
	// <details>

	// <summary><h2>${title}</h2></summary>

	// <table>
	// 	${text}
	// </table>
	// </details>
	// `;
	return '\n<details>\n\n<summary><h2>' + title + '</h2></summary>\n\n<table>\n' + text + '\n</table>\n</details>\n\n';
}

const text =
	topTextMD +
	convertJsonToText(icons, '🏠 Icons') +
	convertJsonToText(ilustrations, '🖍️ Ilustrations') +
	convertJsonToText(photos, '📷 Photos') +
	convertJsonToText(videos, '📺 Videos') +
	convertJsonToText(backgrounds, '🏙️ Backgrounds/Patterns') +
	convertJsonToText(loaders, '⌛ Loaders');


fs.writeFile('README.md', text, (err) => {
	if (err) throw err;
	console.log('🟢 The file has been saved!');
});