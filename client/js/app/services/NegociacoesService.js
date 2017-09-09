class NegociacoesService {

    constructor() {

        this._http = new HttpService();
    }

    obterNegociaoes() {

        return Promise.all([
                this.obterNegociaoesDaSemana(),
                this.obterNegociaoesDaSemanaAnterior(),
                this.obterNegociaoesDaSemanaRetrasada()
            ])
            .then(response => {
                return response.reduce((prev, current) => prev.concat(current), []);
            })
            .catch(erro => {
                throw new Error(erro);
            });
    }

    obterNegociaoesDaSemana() {

        return this._http.get('negociacoes/semana')
            .then(response => {

                return response.map(objeto =>
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                
                console.log(`[DEV] ${erro}`);
                throw new Error('Ocorreu um erro ao obter as negociações da semana.');
            });            
    }

    obterNegociaoesDaSemanaAnterior() {
        
        return this._http.get('negociacoes/anterior')
            .then(response => {

                return response.map(objeto =>
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                
                console.log(`[DEV] ${erro}`);
                throw new Error('Ocorreu um erro ao obter as negociações da semana anterior.');
            }); 
    }

    obterNegociaoesDaSemanaRetrasada() {
        
        return this._http.get('negociacoes/retrasada')
            .then(response => {

                return response.map(objeto =>
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                
                console.log(`[DEV] ${erro}`);
                throw new Error('Ocorreu um erro ao obter as negociações da semana retrasada.');
            }); 
    }
}