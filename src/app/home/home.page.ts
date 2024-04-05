import { Component } from '@angular/core';
import { Database, object, ref, set } from '@angular/fire/database'; // Importa el método set para actualizar la base de datos

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  espacios: { [key: string]: boolean } = {
    'banio': false,
    'cocina': false,
    'dormitorio': false,
    'estudio': false,
    'garaje': false,
    'sala': false
  };

  constructor(private database: Database) {}

    ngOnInit() {
      const route = ref(this.database, "/casa");
      object(route).subscribe(attributes => {
        const valores_db = attributes.snapshot.val();
        console.log(valores_db);

        if (valores_db) {
          Object.keys(this.espacios).forEach(key => {
            this.espacios[key] = (valores_db[key] !== undefined) ? valores_db[key] : false;
          });
        }
      });  
      
     

    }

    estadoLuces(espacio: string) {
      const estado = !this.espacios[espacio];
      const route = ref(this.database, `/casa/${espacio}`);
          
      set(route, estado).then(() => {
        this.espacios[espacio] = estado;
      }).catch(error => {
        console.error("Error updating data:", error);
      });
    }

}
