class NegociacoesService {
    
    constructor() {
        
        this._http = new HttpService();
    }
    
    cadastra(negociacao) {
    
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso!')
            .catch((erro) => {
                throw new Error('Não foi possível cadastras a negociação.')
            });
    }

    apaga() {
        
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apaga())
            .then(() => 'Negociações apagadas com sucesso.')
            .catch(erro => {
                throw new Error('Não foi possível apagar as negociações.')
            });
    }
    
    listaTodos() {
    
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                throw new Error('Não foi possível listar as negociações.')
            });
    }

    importa(arrayAtual) {

        return this.obterNegociaoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !arrayAtual.some(negociacaoExistente =>
                        negociacao.isEquals(negociacaoExistente))))
            .catch(erro => {
                throw new Error('Não foi possível importar as negociações');
            });
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
                throw new Error('Ocorreu um erro ao obter as negociações da semana retrasada.');
            }); 
    }

}