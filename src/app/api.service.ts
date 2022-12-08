import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {Cliente} from "./clase/cliente";
import {Recarga} from "./clase/recarga";
import {Transaccion} from "./clase/transaccion";
import {Producto} from "./clase/producto";
import {Compra} from "./clase/compra";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:8080/test';

    constructor(private http: HttpClient) {
    }

    obtenerClientes(): Observable<Cliente[]> {
        const url = `${this.apiUrl}/cliente`
        return this.http.get<Cliente[]>(url);
    }

    obtenerCliente(id: number): Observable<Cliente> {
        const url = `${this.apiUrl}/cliente/${id}`
        return this.http.get<Cliente>(url);
    }

    obtenerTransacciones(): Observable<Transaccion[]> {
        const url = `${this.apiUrl}/transacciones`
        return this.http.get<Transaccion[]>(url);
    }

    obtenerProductos(): Observable<Producto[]> {
        const url = `${this.apiUrl}/producto`
        return this.http.get<Producto[]>(url);
    }

    addPost(post: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(this.apiUrl, post, httpOptions);
    }

    actualizarCliente(cliente: Cliente): Observable<Cliente> {
        const url = `${this.apiUrl}/cliente/${cliente.id}`
        return this.http.put<Cliente>(url, cliente, httpOptions);
    }

    enviarRecarga(recarga: Recarga): Observable<Recarga> {
        const url = `${this.apiUrl}/recarga`
        return this.http.post<Recarga>(url, recarga);
    }

    enviarCompra(compra: Compra): Observable<Compra> {
        const url = `${this.apiUrl}/compra`
        return this.http.post<Recarga>(url, compra);
    }
}
