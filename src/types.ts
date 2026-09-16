export interface Asset {
	id: number
	name: string
	link: string
	img: string
	order: number
	/** When it was added, as an ISO date: "2026-09-15" or a full timestamp. No entry carries one yet. */
	added?: string
	tags?: string[]
	license?: string
	licenseLink?: string
	licenseDescription?: string
}

export interface Category {
	name: string
	description: string
	color: string
	nameID: string
	assets: Asset[]
}
