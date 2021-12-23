import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Cliente } from "../modelos/cliente.model";

@Injectable()
export class ClienteServicio{
    clientesColeccion: AngularFirestoreCollection<Cliente>;
    clienteDoc: AngularFirestoreDocument<Cliente>;
    clientes: Observable<Cliente[]>;
    cliente: Observable<Cliente>;

    constructor(private db: AngularFirestore){
        // Se recupera la colección "clientes" de forma ordenada ascendente por nombre
        this.clientesColeccion = db.collection('clientes', ref => ref.orderBy('nombre','asc'));
    }

    getClientes(): Observable<Cliente[]>{
        // Obtener clientes
        this.clientes = this.clientesColeccion.snapshotChanges().pipe(
            map( cambios => {
                return cambios.map ( accion => {
                    const datos = accion.payload.doc.data() as Cliente;
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.clientes;
    }
}