class DateHelper {

    constructor() {

        throw new Error("Essa classe nao pode ser instanciada.");
    }
    
    static dataParaTexto(data) {

        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {
        
        if ( !/\d{4}-\d{2}-\d{2}/.test(texto) )
            throw new Error("Data precisa estar no formato aaaa-mm-dd.");

        return new Date(
            ...texto.split('-').map((item, pos) => pos == 1 ? item - 1 : item)
        );
    }
}