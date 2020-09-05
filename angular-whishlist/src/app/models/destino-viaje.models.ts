export class DestinoViaje {
	nombre: string;
	imageUrl: string;
	public servicios: string[];
	private selected: boolean; 
	constructor(public n: string, public i: string) { 
		this.nombre = n;
		this.imageUrl = i;
		this.servicios = ['Pileta', 'Desayuno'];
	}
	isSelected(): boolean{
		return this.selected;
	}
	setSelected( s: boolean){
		this.selected = s;
	}
}
