'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacoesService = function () {
    function NegociacoesService() {
        _classCallCheck(this, NegociacoesService);

        this._http = new HttpService();
    }

    _createClass(NegociacoesService, [{
        key: 'cadastra',
        value: function cadastra(negociacao) {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return 'Negociação adicionada com sucesso!';
            }).catch(function (erro) {
                throw new Error('Não foi possível cadastras a negociação.');
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apaga();
            }).then(function () {
                return 'Negociações apagadas com sucesso.';
            }).catch(function (erro) {
                throw new Error('Não foi possível apagar as negociações.');
            });
        }
    }, {
        key: 'listaTodos',
        value: function listaTodos() {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                throw new Error('Não foi possível listar as negociações.');
            });
        }
    }, {
        key: 'importa',
        value: function importa(arrayAtual) {

            return this.obterNegociaoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !arrayAtual.some(function (negociacaoExistente) {
                        return negociacao.isEquals(negociacaoExistente);
                    });
                });
            }).catch(function (erro) {
                throw new Error('Não foi possível importar as negociações');
            });
        }
    }, {
        key: 'obterNegociaoes',
        value: function obterNegociaoes() {

            return Promise.all([this.obterNegociaoesDaSemana(), this.obterNegociaoesDaSemanaAnterior(), this.obterNegociaoesDaSemanaRetrasada()]).then(function (response) {
                return response.reduce(function (prev, current) {
                    return prev.concat(current);
                }, []);
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'obterNegociaoesDaSemana',
        value: function obterNegociaoesDaSemana() {

            return this._http.get('negociacoes/semana').then(function (response) {
                return response.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                throw new Error('Ocorreu um erro ao obter as negociações da semana.');
            });
        }
    }, {
        key: 'obterNegociaoesDaSemanaAnterior',
        value: function obterNegociaoesDaSemanaAnterior() {

            return this._http.get('negociacoes/anterior').then(function (response) {
                return response.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                throw new Error('Ocorreu um erro ao obter as negociações da semana anterior.');
            });
        }
    }, {
        key: 'obterNegociaoesDaSemanaRetrasada',
        value: function obterNegociaoesDaSemanaRetrasada() {

            return this._http.get('negociacoes/retrasada').then(function (response) {
                return response.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                throw new Error('Ocorreu um erro ao obter as negociações da semana retrasada.');
            });
        }
    }]);

    return NegociacoesService;
}();
//# sourceMappingURL=NegociacoesService.js.map