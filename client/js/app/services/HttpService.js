class HttpService {

    get(url) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);

            xhr.onreadystatechange = () => {

                if ( xhr.readyState == 4 ) {

                    xhr.status == 200
                        ? resolve(JSON.parse(xhr.responseText)) 
                        : reject(xhr.responseText);
                }
            }

            xhr.send();
        });
    }

    post(url, dado) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);
            xhr.setRequestHeader('Content-type', 'application/json');

            xhr.onreadystatechange = () => {

                if ( xhr.readyState == 4 ) {

                    xhr.status == 200
                        ? resolve(JSON.parse(xhr.responseText)) 
                        : reject(xhr.responseText);
                }
            }

            xhr.send(JSON.stringify(dado));
        });
    }
}