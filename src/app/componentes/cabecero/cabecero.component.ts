import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {
  public isCollapsed = true;
  public isDropdownCollapsed = true;
  isLoggedIn: boolean;
  loggedInUser: string | null;
  permitirRegistro: boolean | any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private configuracionService: ConfiguracionService
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(
      auth => {
        if(auth){
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
        }
        else{
          this.isLoggedIn = false;
        }
      }
    );

    this.configuracionService.getConfiguracion().subscribe(
      configuracion => {
        this.permitirRegistro = configuracion.permitirRegistro;
      }
    );
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
