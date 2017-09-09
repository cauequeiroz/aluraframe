let ConnectionFactory = (function() {

    const dbName = 'aluraframe';
    const version = 4;
    const stores = ['negociacoes'];

    let connection = null;
    let close = null;
    
    return class ConnectionFactory {

        constructor() {

            throw new Error('Essa classe não pode ser instanciada.');
        }

        static getConnection() {

            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version);
                
                openRequest.onupgradeneeded = e => {

                    ConnectionFactory._createStores(e.target.result);
                }
                openRequest.onsuccess = e => {

                    if ( !connection ) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function() {
                            throw new Error('Você não pode fechar a conexão.');
                        }
                    }
                    resolve(connection);
                }
                openRequest.onerror = e => {

                    reject(e.target.error.name);
                }
            });
        }

        static _createStores(connection) {

            stores.forEach(store => {

                if ( connection.objectStoreNames.contains(store) )
                    connection.deleteObjectStore(store);

                connection.createObjectStore(store);
            });
        }

        static closeConnection() {

            if ( connection ) {
                close();
                connection = null;
            }
        }
    }
})();