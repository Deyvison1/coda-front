import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { TesteModel } from '../models/teste.model';
import { TesteModelService } from '../services/teste-model.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginacao: MatPaginator;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  // var search
  beneficiario: string = ''
  valorPedido: string = ''
  aprovado = false;
  eleicao = false;

  color: ThemePalette = 'accent';

  indeterminate = false;

  testeModels: TesteModel[] = [];

  listTesteModels: TesteModel[] = [];
  
  totalItens: number;
  pageEvent: PageEvent = new PageEvent();

  constructor(
    private service: TesteModelService,
    private _snackBar: MatSnackBar
  ) {
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 5;
    this.listarTodosComOuSemFiltro();
  }

  ngOnInit(): void {
    this.paginacao._intl.itemsPerPageLabel = "Itens por página";
  }

  aprova() {
    this.service.aprova(this.listTesteModels).subscribe(
      (resp) => {
        this._snackBar.open("Aprovado com sucesso!", "OK", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        }); 
        this.listarTodosComOuSemFiltro();
      }
    );
  }

  aoTrocarPagina(event) {
    this.pageEvent = event;
    this.listarTodosComOuSemFiltro();
  }

  limpar() {
    this.beneficiario = '';
    this.valorPedido = '';
    this.aprovado = false;
    this.eleicao = false;
  }

  listarTodosComOuSemFiltro() {
    this.service.listarTodosComOuSemFiltro(this.beneficiario, this.valorPedido, this.pageEvent.pageIndex, this.pageEvent.pageSize).subscribe(
      (resp) => {
        this.testeModels = resp.body;
        this.totalItens = +resp.headers.get("X_TOTAL_COUNT");
      }
    );
  }
  
  temNaLista(item) {
    let index = this.listTesteModels.findIndex(x => x.id == item.id);

    if(index == -1) {
      return false;
    } else {
      return true;
    }
  }

  adicionarNaLista(item: TesteModel) {
    let index = this.listTesteModels.findIndex(x => x.id == item.id);

    if(index == -1) {
      this.listTesteModels.push(item);
    } else {
      this.listTesteModels.splice(index, 1);
    }
  }

}
