class MensagemView extends View {

    constructor(elemento) {
        
        super(elemento);
        this._timer = null;
    }

    template(model) {

        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }

    update(model) {
        
        this._elemento.innerHTML = this.template(model);
        
        if ( model.texto ) {
            if ( this._timer ) clearInterval(this._timer);

            this._timer = setTimeout(() => {
                this._elemento.innerHTML = '<p></p>';
                this._timer = null;
            }, 2000);
        }
    }
}