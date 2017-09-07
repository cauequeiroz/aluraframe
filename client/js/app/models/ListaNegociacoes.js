class ListaNegociacoes {

    constructor() {

        this._listaNegociacoes = [];
    }

    get negociacoes() {

        return [].concat(this._listaNegociacoes);
    }

    adiciona(negociacao) {

        this._listaNegociacoes.push(negociacao);
    }
}