import {Negociacao} from '../models/Negociacao';
import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacoesService} from '../services/NegociacoesService';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';

class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverte'
        );
        
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        );

        this._negociacoesService = new NegociacoesService();
        this._init();
    }

    _init() {

        this._negociacoesService
            .listaTodos()
            .then(negociacoes =>
                negociacoes.forEach(negociacao => 
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);
    }

    adiciona(event) {

        event.preventDefault();

        this._negociacoesService
            .cadastra(this._criaNegociacao())
            .then(mensagem => {
                this._listaNegociacoes.adiciona(this._criaNegociacao());
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    apaga() {

        this._negociacoesService
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.texto = erro);            
    }
    
    importaNegociacoes() {

        this._negociacoesService
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));                
                this._mensagem.texto = 'Negociações importadas com sucesso.';
            })
            .catch(erro => this._mensagem.texto = erro);
    }


    ordena(coluna) {
        
        this._ordemAtual == coluna
            ? this._listaNegociacoes.inverte()
            : this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);

        this._ordemAtual = coluna;
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }
}

let negociacaoController = new NegociacaoController();

export function Controller() {
    return negociacaoController;
}