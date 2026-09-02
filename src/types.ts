export interface Asset {
	id: number
	name: string
	link: string
	img: string
	order: number
	tags?: string[]
	license?: string
	licenseLink?: string
	licenseDescription?: string
	/** Solo en inspirations.json: variante mal escrita de `license`. */
	licence?: string
	/** Solo en inspirations.json: variante mal escrita de `licenseLink`. */
	licenceLink?: string
}

export interface Category {
	name: string
	description: string
	color: string
	nameID: string
	assets: Asset[]
}
