class NegociacoesService {

    obterNegociaoesDaSemana(cb) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange = () => {
            if ( xhr.readyState == 4 ) {
                if ( xhr.status == 200 ) {
                    let response = JSON
                        .parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                    
                    cb(null, response);
                } else {
                    cb('Ocorreu um erro ao obter as negociações.', null);
                }
            }
        }
        xhr.send();
    }
}