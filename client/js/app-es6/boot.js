import {Controller} from './controllers/NegociacaoController';

let negociacaoController = Controller();
let $ = document.querySelector.bind(document);

$('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
$('.btn-importar').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
$('.btn-apagar').onclick = negociacaoController.apaga.bind(negociacaoController);