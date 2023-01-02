import { Rol } from "./rol.model";


export interface Usuario {
  token: string;
  nombre : string;
  usuario: string;
  roles?: Array<Rol>;
}
