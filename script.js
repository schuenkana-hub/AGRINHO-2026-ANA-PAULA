### `script.js`
```javascript
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // SEÇÕES EXPANSÍVEIS (ACCORDION)
    // ==========================================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const ariaExpanded = header.getAttribute('aria-expanded') === 'true';
            const content = document.getElementById(header.getAttribute('aria-controls'));

            // Alterna o estado do item clicado
            header.setAttribute('aria-expanded', !ariaExpanded);
            
            if (!ariaExpanded) {
                content.removeAttribute('hidden');
                // Adiciona um pequeno delay para a transição fluida do CSS funcionar perfeitamente
                setTimeout(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }, 10);
            } else {
                content.style.maxHeight = '0px';
                // Remove visibilidade após terminar a transição
                content.addEventListener('transitionend', function handler() {
                    if (header.getAttribute('aria-expanded') === 'false') {
                        content.setAttribute('hidden', '');
                    }
                    content.removeEventListener('transitionend', handler);
                });
            }
        });
    });

    // ==========================================================================
    // ACESSIBILIDADE: CONTROLE DE FONTE E TEMA ESCURO
    // ==========================================================================
    let tamanhoFonteAtual = 100; // Representa 100% do tamanho base
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    const btnTema = document.getElementById('btn-tema');

    btnAumentar.addEventListener('click', () => {
        if (tamanhoFonteAtual < 130) { // Limite máximo para evitar quebra grosseira do layout
            tamanhoFonteAtual += 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    btnDiminuir.addEventListener('click', () => {
        if (tamanhoFonteAtual > 80) { // Limite mínimo de legibilidade
            tamanhoFonteAtual -= 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    btnTema.addEventListener('click', () => {
        document.body.classList.toggle('modo-escuro');
    });

    // ==========================================================================
    // ACESSIBILIDADE: LEITURA POR VOZ (SPEECH SYNTHESIS API)
    // ==========================================================================
    const btnFalar = document.getElementById('btn-falar');
    const btnParar = document.getElementById('btn-parar');
    let uttranceDaPagina = null;

    btnFalar.addEventListener('click', () => {
        // Cancela qualquer leitura em andamento para não encavalar as vozes
        window.speechSynthesis.cancel();

        // Captura o conteúdo textual apenas da seção principal fornecida
        const principalConteudo = document.getElementById('conteudo-principal');
        if (!principalConteudo) return;

        // Limpa tags e pega puramente o texto limpo sequencial
        const textoParaLer = principalConteudo.innerText;

        uttranceDaPagina = new SpeechSynthesisUtterance(textoParaLer);
        uttranceDaPagina.lang = 'pt-BR';
        uttranceDaPagina.rate = 1.0; // Velocidade natural

        // Controle de estados dos botões
        uttranceDaPagina.onstart = () => {
            btnFalar.disabled = true;
            btnParar.disabled = false;
        };

        uttranceDaPagina.onend = () => {
            btnFalar.disabled = false;
            btnParar.disabled = true;
        };

        uttranceDaPagina.onerror = () => {
            btnFalar.disabled = false;
            btnParar.disabled = true;
        };

        window.speechSynthesis.speak(uttranceDaPagina);
    });

    btnParar.addEventListener('click', () => {
        window.speechSynthesis.cancel();
        btnFalar.disabled = false;
        btnParar.disabled = true;
    });

    // Parar a voz caso o usuário feche ou mude de aba para evitar bugs do navegador
    window.addEventListener('beforeunload', () => {
        window.speechSynthesis.cancel();
    });

    // ==========================================================================
    // SUBMISSÃO DE FORMULÁRIOS (VALIDAÇÃO E SIMULAÇÃO)
    // ==========================================================================
    const formSeminario = document.getElementById('form-seminario');
    formSeminario.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Inscrição realizada com sucesso! Você receberá os dados do seminário por e-mail.');
        formSeminario.reset();
    });

    const formComentario = document.getElementById('form-comentario');
    const feedbackComentario = document.getElementById('feedback-comentario');
    
    formComentario.addEventListener('submit', (e) => {
        e.preventDefault();
        feedbackComentario.removeAttribute('hidden');
        formComentario.reset();

        // Esconde a mensagem de feedback após 5 segundos
        setTimeout(() => {
            feedbackComentario.setAttribute('hidden', '');
        }, 5000);
    });
});
As respostas da IA podem conter erros. Saiba mais