import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IEmpleado } from 'src/app/Interfaces/iempleado';
import { DepartamentosService } from 'src/app/Services/departamentos.service';
import Swal from 'sweetalert2';
import { IDepartamento } from 'src/app/Interfaces/idepartamento';
@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.scss'
})
export class DepartamentosComponent {
  listadepartamentos: IDepartamento[] = [];
  constructor(private departamentoServicio: DepartamentosService) {}

  ngOnInit() {
    this.cargatabla();
  }
  cargatabla() {
    this.departamentoServicio.todos().subscribe((data) => {
      this.listadepartamentos = data;
    });
  }

  eliminar(departamento_id) {
    Swal.fire({
      title: 'departamentos',
      text: 'Esta seguro que desea eliminar el departamento!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Departamento'
    }).then((result) => {
      if (result.isConfirmed) {
        this.departamentoServicio.eliminar(departamento_id).subscribe(data => {
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