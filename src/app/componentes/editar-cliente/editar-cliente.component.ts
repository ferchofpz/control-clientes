import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelos/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };
  id:string;

  constructor( 
    private clientesService: ClienteServicio,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientesService.getCliente(this.id)?.subscribe(
      (cliente: Cliente) => {
        this.cliente = cliente;
      }
    );
  }

  guardar({value, valid}: {value: Cliente, valid: boolean}){

  }

  eliminar(){

  }

}
