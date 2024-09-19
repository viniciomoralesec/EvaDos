import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IDepartamento } from '../Interfaces/idepartamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  apiurl = 'http://localhost/evados/back/controller/departamentos.controller.php?op=';
  constructor(private lector: HttpClient) {}

  todos(): Observable<IDepartamento[]> {
    return this.lector.get<IDepartamento[]>(this.apiurl + 'todos');
  }
  uno(id: number): Observable<IDepartamento> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<IDepartamento>(this.apiurl + 'uno', formData);
  }
  eliminar(id: number): Observable<number> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
  insertar(departamento: IDepartamento): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', departamento.nombre);
    formData.append('ubicacion', departamento.ubicacion);
    formData.append('jefe_departamento', departamento.jefe_departamento);
    formData.append('extension', departamento.extension);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }
  actualizar(departamento: IDepartamento): Observable<string> {
    console.log(departamento);
    const formData = new FormData();
    formData.append('departamento_id', departamento.departamento_id.toString());
    formData.append('nombre', departamento.nombre);
    formData.append('ubicacion', departamento.ubicacion);
    formData.append('jefe_departamento', departamento.jefe_departamento);
    formData.append('extension', departamento.extension);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}