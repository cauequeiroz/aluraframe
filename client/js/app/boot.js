'use strict';

System.register(['./controllers/NegociacaoController'], function (_export, _context) {
  "use strict";

  var Controller, negociacaoController, $;
  return {
    setters: [function (_controllersNegociacaoController) {
      Controller = _controllersNegociacaoController.Controller;
    }],
    execute: function () {
      negociacaoController = Controller();
      $ = document.querySelector.bind(document);


      $('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      $('.btn-importar').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
      $('.btn-apagar').onclick = negociacaoController.apaga.bind(negociacaoController);
    }
  };
});