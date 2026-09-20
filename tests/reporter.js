/**
 * Test reporter for the resource files: one line per category, and the problems with the resources
 * behind them whenever a category fails. No diffs, no stack traces, no repeated failure list.
 */
const color = process.stdout.isTTY
const paint = (code, text) => (color ? `\u001B[${code}m${text}\u001B[0m` : text)
const green = (text) => paint(32, text)
const red = (text) => paint(31, text)
const dim = (text) => paint(90, text)

export default async function* reporter(source) {
	let passed = 0
	const failed = []

	for await (const event of source) {
		if (event.type === 'test:pass') {
			passed++
			yield `${green('✔')} ${event.data.name}\n`
		}

		if (event.type === 'test:fail') {
			const error = event.data.details.error
			const message = String((error?.cause ?? error)?.message ?? error)
			failed.push(event.data.name)
			yield `${red('✖')} ${event.data.name}\n${message.replace(/^(?!$)/gm, '  ')}\n\n`
		}
	}

	const total = passed + failed.length
	const summary =
		failed.length === 0
			? green(`${total} categories, all correct`)
			: red(`${failed.length} of ${total} categories with problems: ${failed.join(', ')}`)

	yield `${dim('─'.repeat(40))}\n${summary}\n`
}
