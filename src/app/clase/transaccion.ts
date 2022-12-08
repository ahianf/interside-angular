import {Cliente} from "./cliente";
import {Producto} from "./producto";

export class Transaccion {
    constructor(public idCliente: Cliente,
                public idProducto: Producto,
                public movimiento: number,
                public fecha: string,
                public idTransaccion: number) {
    }
}
