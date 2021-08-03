import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/base.service';
import { HttpService } from 'src/app/core/http.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService extends BaseService<{ id: number | string, nombre: string }> {

  constructor(protected http: HttpService, resource: string) {
    super(http);
    this.apiUrlResource = resource;
  }



}
