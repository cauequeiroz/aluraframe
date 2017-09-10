'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = function () {
    function NegociacaoDao(connection) {
        _classCallCheck(this, NegociacaoDao);

        this._connection = connection;
        this._store = 'negociacoes';
    }

    _createClass(NegociacaoDao, [{
        key: 'adiciona',
        value: function adiciona(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {

                var addRequest = _this._connection.transaction(_this._store, 'readwrite').objectStore(_this._store).add(negociacao);

                addRequest.onsuccess = function () {
                    return resolve('Negociação adicionada com sucesso.');
                };
                addRequest.onerror = function () {
                    return reject('Negociação não foi adicionada.');
                };
            });
        }
    }, {
        key: 'listaTodos',
        value: function listaTodos() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                var listRequest = _this2._connection.transaction(_this2._store, 'readwrite').objectStore(_this2._store).openCursor();

                var negociacoes = [];

                listRequest.onsuccess = function (e) {

                    var currentLine = e.target.result;

                    if (currentLine) {
                        var value = currentLine.value;
                        negociacoes.push(new Negociacao(value._data, value._quantidade, value._valor));
                        currentLine.continue();
                    } else {
                        resolve(negociacoes);
                    }
                };
                listRequest.onerror = function (e) {
                    return reject('Não foi possível importar as negociações.');
                };
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

                var clearRequest = _this3._connection.transaction(_this3._store, 'readwrite').objectStore(_this3._store).clear();

                clearRequest.onsuccess = function (e) {
                    return resolve('Negociações apagadas com sucesso.');
                };
                clearRequest.onerror = function (e) {
                    return reject('Não foi possível apagar as negociações.');
                };
            });
        }
    }]);

    return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map