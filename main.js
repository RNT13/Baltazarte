$(document).ready(function() {
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#cabecalho',
        offset: 0  // Ajuste conforme o tamanho do cabeçalho
    });

    $('#telefone').mask('(00) 00000-0000', {
        placeholder: 'Seu Telefone'
    });

    $('form').validate({
        rules: {
            nome: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            nome: 'Por favor, insira seu nome.',
            email: 'Por favor, insira um email válido.',
        },
        submitHandler: function(form) {
            alert('Obrigado pelo contato!');
            form.reset();
        },
        invalidHandler: function(evento, validador) {
            let camposIncorretos = validador.numberOfInvalids();
            if (camposIncorretos) {
                alert(`Existem ${camposIncorretos} campo(s) incorreto(s)!`);
            }
        }
    });
})