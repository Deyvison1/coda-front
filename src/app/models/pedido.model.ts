export class Pedido {
  id: number;
  beneficiario: String;
  valorPedido: number;
  aprovadoSelecionado: boolean;
  eleicaoSelecionado: boolean;
  nomeFantasia: string;
  razaoSocial: string;
  qtdParcelas: number;
  total: number;
  aprovacao: string;
  numeroPedido: number;
  dataSolicitacao: Date;
  dataAprovacao: Date;
  numeroDespesas: number;
  departamento: string;
  projeto: string;
  tituloDespesas: string;
  descricaoDespesas: string;
  marcado: false;
}
