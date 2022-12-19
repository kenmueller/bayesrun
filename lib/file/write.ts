import { saveAs } from 'file-saver'

const writeFile = (name: string, value: string) => {
	saveAs(new Blob([value], { type: 'text/plain; charset=utf-8' }), name)
}

export default writeFile
