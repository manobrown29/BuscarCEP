function limpa_formulário_cep() {
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
    document.getElementById('ibge').value = "";
}

function mostrarErro(mensagem) {
    document.getElementById('mensagem-erro').textContent = mensagem;
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('rua').value = conteudo.logradouro;
        document.getElementById('bairro').value = conteudo.bairro;
        document.getElementById('cidade').value = conteudo.localidade;
        document.getElementById('uf').value = conteudo.uf;
        document.getElementById('ibge').value = conteudo.ibge;

        mostrarErro("");
    } else {
        limpa_formulário_cep();
        mostrarErro("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '');

    if (cep != "") {
        var validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {
            mostrarErro("");

            document.getElementById('rua').value = "Carregando...";
            document.getElementById('bairro').value = "Carregando...";
            document.getElementById('cidade').value = "Carregando...";
            document.getElementById('uf').value = "...";
            document.getElementById('ibge').value = "...";

            var scriptAntigo = document.getElementById('viacep-script');

            if (scriptAntigo) {
                scriptAntigo.remove();
            }

            var script = document.createElement('script');

            script.id = 'viacep-script';
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            document.body.appendChild(script);
        } else {
            limpa_formulário_cep();
            mostrarErro("Números demais no CEP.");
        }
    } else {
        limpa_formulário_cep();
        mostrarErro("");
    }
}