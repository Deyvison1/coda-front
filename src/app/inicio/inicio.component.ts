import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { TesteModel } from '../models/teste.model';
import { TesteModelService } from '../services/teste-model.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  // var search
  beneficiario: string = ''
  valorPedido: string = ''
  aprovado = false;
  eleicao = false;

  color: ThemePalette = 'accent';

  indeterminate = false;
  currentPage: number = 1;


  testeModels: TesteModel[] = [];
  testeModels2: TesteModel[] = [];

  listTesteModels: TesteModel[] = [];
  
  constructor(
    private service: TesteModelService
  ) {
    this.getAll();
  }

  ngOnInit(): void {
    this.testeModels2 = this.testeModels.slice(0, 10);
    this.currentPage = 1;
  }

  aprova() {
    this.service.aprova(this.listTesteModels).subscribe(
      (resp) => {

      }
    );
  }

  search() {
    this.service.search(this.beneficiario, this.valorPedido, this.aprovado).subscribe(
      (resp) => {
        this.testeModels2 = resp;
        this.testeModels = resp;
      }
    );
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.testeModels2 = this.testeModels.slice(startItem, endItem);
  }

  limpar() {
    this.beneficiario = '';
    this.valorPedido = '';
    this.aprovado = false;
    this.eleicao = false;
  }

  getAll() {
    this.service.getAll().subscribe(
      (resp) => {
        this.testeModels = resp;
      }
    );
  }

  addToList(item: TesteModel) {
    let index = this.listTesteModels.findIndex(x => x.id == item.id);

    if(index == -1) {
      this.listTesteModels.push(item);
    } else {
      this.listTesteModels.splice(index, 1);
    }
  }

}
