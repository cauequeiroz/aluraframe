import {Negociacao} from '../models/Negociacao';

export class NegociacaoDao {

    constructor(connection) {

        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {

        return new Promise((resolve, reject) => {

            let addRequest = this._connection
                .transaction(this._store, 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            addRequest.onsuccess = () => resolve('Negociação adicionada com sucesso.');
            addRequest.onerror  = () => reject('Negociação não foi adicionada.');
        });
    }

    listaTodos() {

        return new Promise((resolve, reject) => {

            let listRequest = this._connection
                .transaction(this._store, 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];

            listRequest.onsuccess = e => {
                
                let currentLine = e.target.result;

                if ( currentLine ) {
                    let value = currentLine.value;
                    negociacoes.push(new Negociacao(value._data, value._quantidade, value._valor));
                    currentLine.continue();
                } else {
                    resolve(negociacoes);
                }      
            }
            listRequest.onerror = e => reject('Não foi possível importar as negociações.');
        });
    }

    apaga() {

        return new Promise((resolve, reject) => {

            let clearRequest = this._connection
                .transaction(this._store, 'readwrite')
                .objectStore(this._store)
                .clear();
            
            clearRequest.onsuccess = e => resolve('Negociações apagadas com sucesso.');
            clearRequest.onerror = e => reject('Não foi possível apagar as negociações.');
        });
    }
}