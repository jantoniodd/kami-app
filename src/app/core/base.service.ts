import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

export abstract class BaseService<E extends Object> {

  protected apiUrlResource = '';

  constructor(protected http: HttpService) { }

  findAll(): Observable<Array<E>> {
    return this.http.get(this.apiUrlResource);
  }

  findById(id: number | string): Observable<E> {
    return this.http.get(`${this.apiUrlResource}/${id}`);
  }

  save(entity: E): Observable<E> {
    return this.http.post(this.apiUrlResource, entity);
  }

  update(id: number | string, entity: E): Observable<E> {
    return this.http.put(this.apiUrlResource, entity);
  }

  delete(id: number | string): void {
    return this.delete(`${this.apiUrlResource}/${id}`);
  }

  /**
   * 
   * @param resource lo que se desea obtener
   * @returns 
   */
  getCombo(resource: string): Observable<{ id: number | string, nombre: string }[]> {
    const CATALOGO = environment.REST_CORE + 'catalogos';
    return this.http.get(`${CATALOGO}/${resource}`);
  }
}
