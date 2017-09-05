class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {

        event.preventDefault();
        
        let data = this._inputData.value.split('-').map((elem, i) => i == 1 ? elem-1 : elem);
        
        let negociacao = new Negociacao(
            new Date(...data),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }
}