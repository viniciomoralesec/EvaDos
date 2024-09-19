import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IEmpleado } from '../Interfaces/iempleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  apiurl = 'http://localhost/evados/back/controller/empleados.controller.php?op=';
  constructor(private lector: HttpClient) {}

  todos(): Observable<IEmpleado[]> {
    return this.lector.get<IEmpleado[]>(this.apiurl + 'todos');
  }
  uno(id: number): Observable<IEmpleado> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<IEmpleado>(this.apiurl + 'uno', formData);
  }
  eliminar(id: number): Observable<number> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
  insertar(empleado: IEmpleado): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', empleado.nombre);
    formData.append('apellido', empleado.apellido);
    formData.append('email', empleado.email);
    formData.append('telefono', empleado.telefono);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }
  actualizar(empleado: IEmpleado): Observable<string> {
    console.log(empleado);
    const formData = new FormData();
    formData.append('empleado_id', empleado.empleado_id.toString());
    formData.append('nombre', empleado.nombre);
    formData.append('apellido', empleado.apellido);
    formData.append('email', empleado.email);
    formData.append('telefono', empleado.telefono);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}