import {Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {Cliente} from "./clase/cliente";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Transaccion} from "./clase/transaccion";
import {Recarga} from "./clase/recarga";
import {Observable} from "rxjs";
import {Producto} from "./clase/producto";
import {Compra} from "./clase/compra";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    clientes!: Observable<Cliente[]>;
    transacciones!: Observable<Transaccion[]>;
    productos!: Producto[]
    cliente!: Cliente

    constructor(
        private formBuilder: FormBuilder,
        private dataService: ApiService) {
    }

    recargaForm = this.formBuilder.group({
        id: 0,
        monto: 0
    });

    comprarForm = this.formBuilder.group({
        idCliente: 0,
        idProducto: 0
    });

    nombreForm = this.formBuilder.group({
        cliente: "",
        nombre: ""
    });

    enviarRecarga() {
        var recarga = new Recarga(this.recargaForm.value)
        console.log(recarga)
        this.dataService.enviarRecarga(recarga).subscribe({
            complete: () => {
                console.log('Envio de recarga completo')
                this.obtenerClientes()
                this.obtenerTransacciones()
            },
            error: () => {
                console.error()
            },
        });
    }

    enviarCompra() {
        var compra = new Compra(this.comprarForm.value)
        console.log(compra)
        this.dataService.enviarCompra(compra).subscribe({
            complete: () => {
                console.log('Envio de compra completo')
                this.obtenerClientes()
                this.obtenerTransacciones()
                this.obtenerProductos()
            },
            error: () => {
                console.error()
            },
        });
    }

    obtenerClientes() {
        this.clientes = this.dataService.obtenerClientes();
    }

    obtenerTransacciones() {
        this.transacciones = this.dataService.obtenerTransacciones();
    }

    obtenerProductos() {
        this.dataService.obtenerProductos().subscribe({
            next: data => {
                this.productos = data;
            },
            error: error => {
                console.error()
            },
            complete: () => {
            }
        });
    }


    enviarNombre() {
        var idCliente = +this.nombreForm.value.cliente!
        console.log(this.nombreForm.value.nombre)
        this.dataService.obtenerCliente(idCliente).subscribe({
            next: data => {
                this.cliente = data;
            },
            error: error => {
                console.error()
            },
            complete: () => {
                this.cliente.nombre = this.nombreForm.value.nombre!;
                console.log(this.cliente)
                this.dataService.actualizarCliente(this.cliente).subscribe(
                    () => {
                        this.obtenerClientes();
                        console.log('Put successful');
                    },
                    err => console.error(err)
                );
            }
        });
    }


    ngOnInit(): void {
        this.obtenerClientes()
        this.obtenerTransacciones()
        this.obtenerProductos()
    }
}
