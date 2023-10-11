import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

const url =
  'https://servicodados.ibge.gov.br/api/v1/localidades/estados/35/distritos';

@Injectable({
  providedIn: 'root',
})
export class DistritosService {
  constructor(private httpClient: HttpClient) {}

  listar(): Observable<{ id: number; nome: string }[]> {
    return this.httpClient.get<any[]>(url).pipe(
      map((dadosDaApi) => {
        return dadosDaApi.map((a) => {
          return {
            id: a.id,
            nome: a.nome,
          };
        });
      })
    );
  }
}
