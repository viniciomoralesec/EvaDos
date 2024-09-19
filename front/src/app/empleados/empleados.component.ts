import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IEmpleado } from '../Interfaces/iempleado';
import { EmpleadosService } from '../Services/empleados.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss'
})
export class EmpleadosComponent {
  listaclientes: IEmpleado[] = [];
  constructor(private clienteServicio: EmpleadosService) {}

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
      title: 'empleados',
      text: 'Esta seguro que desea eliminar el empleado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Emliminar empleado'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteServicio.eliminar(id).subscribe(data => {
          if(data) {
            Swal.fire('empleados', 'El empleado ha sido eliminado.', 'success');
            this.cargatabla();
          } else {
            Swal.fire('empleados', 'El empleado no se pudo eliminar, porque se han creado ordenes a su nombre.', 'info');
          }
        }
      );
      }
    });
  }
}