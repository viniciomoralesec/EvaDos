import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IEmpleado } from 'src/app/Interfaces/iempleado';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: '../nuevoempleado.component.html',
  styleUrl: '../nuevoempleado.component.scss'
})
export class NuevoEmpleadosComponent {
  listaempleados: IEmpleado[] = [];
  constructor(private empleadoServicio: EmpleadosService) {}

  ngOnInit() {
    this.cargatabla();
  }
  cargatabla() {
    this.empleadoServicio.todos().subscribe((data) => {
      this.listaempleados = data;
    });
  }

  eliminar(empleado_id) {
    Swal.fire({
      title: 'empleados',
      text: 'Esta seguro que desea eliminar el empleado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Empleado'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoServicio.eliminar(empleado_id).subscribe(data => {
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