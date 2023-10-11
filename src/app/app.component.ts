import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { DistritosService } from './distritos.service';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  distritos: Array<{ id: number; nome: string }> = [];
  filtro: string = '';

  @ViewChild('campoBusca') campoBusca!: ElementRef<HTMLInputElement>;

  constructor(private distritosService: DistritosService) {}

  filtrar(palavraChave: string) {
    if (palavraChave) {
      palavraChave = palavraChave.toUpperCase();

      this.distritos = this.distritos.filter(
        (a) => a.nome.toUpperCase().indexOf(palavraChave) >= 0
      );
    }
  }

  ngOnInit(): void {
    this.distritosService
      .listar()
      .subscribe((retornoApi) => (this.distritos = retornoApi));
  }

  ngAfterViewInit(): void {
    fromEvent(this.campoBusca.nativeElement, 'keyup')
      .pipe(debounceTime(20))
      .subscribe((e: Event) => {
        const target = e.target as HTMLInputElement;
        this.filtro = target.value;
      });
  }
}
