import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IDepartamento } from '../Interfaces/idepartamento';
import { DepartamentosService } from '../Services/departamentos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.scss'
})
export class EmpleadosComponent {
  listaclientes: IDepartamento[] = [];
  constructor(private clienteServicio: DepartamentosService) {}

  ngOnInit() {
    this.cargatabla();
  }
  cargatabla() {
    this.clienteServicio.todos().subscribe((data) => {
      this.listaclientes = data;
    });
  }

  eliminar(id) {
    Swal.fire({
      title: 'departamentos',
      text: 'Esta seguro que desea eliminar el departamento!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Emliminar departamento'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteServicio.eliminar(id).subscribe(data => {
          if(data) {
            Swal.fire('departamentos', 'El departamento ha sido eliminado.', 'success');
            this.cargatabla();
          } else {
            Swal.fire('departamentos', 'El departamento no se pudo eliminar, porque se han creado ordenes a su nombre.', 'info');
          }
        }
      );
      }
    });
  }
}