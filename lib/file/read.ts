const readFile = (extensions: string[], multiple = false) =>
	new Promise<FileList>(resolve => {
		const input = document.createElement('input')

		input.type = 'file'
		input.accept = extensions.map(x => `.${x}`).join(',')
		input.multiple = multiple

		input.addEventListener(
			'change',
			() => {
				if (!input.files) return
				resolve(input.files)
			},
			{ once: true }
		)

		input.click()
	})

export default readFile
