let input = document.querySelector('input[type="tarefa"]');
let btn = document.querySelector('#botao');
let lista = document.querySelector('#lista');
let card = document.querySelector('.card');
// 
// 
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarLista() {
    lista.innerHTML = ''; // Limpa a lista antes de renderizar novamente

    for (let i = 0; i < tarefas.length; i++) {
        let tarefa = tarefas[i];

        let itemLista = document.createElement('li');
        itemLista.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');
        itemLista.style.position = 'relative';

        let itemTexto = document.createElement('span');
        itemTexto.textContent = tarefa.replace(/\b\w/g, l => l.toUpperCase());

        // Container para botões
        let botoes = document.createElement('div');
        botoes.style.display = 'none';
        botoes.style.gap = '5px';

        // Botão Concluir
        let btnConcluir = document.createElement('button');
        btnConcluir.textContent = '✔️';
        btnConcluir.className = 'btn btn-success btn-sm';
        btnConcluir.onclick = () => {
            itemTexto.style.textDecoration = 'line-through';
            itemTexto.style.color = 'gray';
        };

        // Botão Apagar
        let btnApagar = document.createElement('button');
        btnApagar.textContent = '🗑️';
        btnApagar.className = 'btn btn-danger btn-sm';
        btnApagar.onclick = () => {
            tarefas.splice(i, 1);
            salvarLocalStorage();
            renderizarLista();
        };

        // Botão Editar
        let btnEditar = document.createElement('button');
        btnEditar.textContent = '✏️';
        btnEditar.className = 'btn btn-warning btn-sm';
        btnEditar.onclick = () => {
            // Cria input para editar
            let inputEditar = document.createElement('input');
            inputEditar.type = 'text';
            inputEditar.className = 'form-control form-control-sm';
            inputEditar.value = tarefa;
            inputEditar.style.marginRight = '5px';

            let btnSalvar = document.createElement('button');
            btnSalvar.textContent = '💾';
            btnSalvar.className = 'btn btn-primary btn-sm';

            // Salvar a tarefa editada
            btnSalvar.onclick = () => {
                let nova = inputEditar.value.trim();
                if (nova) {
                    tarefas[i] = nova.replace(/\b\w/g, l => l.toUpperCase());
                    salvarLocalStorage();
                    renderizarLista();
                }
            };

            // Substitui o conteúdo da <li> por input e botão salvar
            itemLista.innerHTML = '';
            itemLista.appendChild(inputEditar);
            itemLista.appendChild(btnSalvar);
        };

        // Junta os botões
        botoes.appendChild(btnConcluir);
        botoes.appendChild(btnEditar);
        botoes.appendChild(btnApagar);

        itemLista.appendChild(itemTexto);
        itemLista.appendChild(botoes);

        itemLista.addEventListener('mouseover', () => {
            botoes.style.display = 'flex';
        });
        itemLista.addEventListener('mouseout', () => {
            botoes.style.display = 'none';
        });

        lista.appendChild(itemLista);
    }
}


renderizarLista()

btn.onclick = function () {
    let novaTarefa = input.value.trim();
    removeSpan()
    if (novaTarefa !="") {
        tarefas.push(novaTarefa);
        salvarLocalStorage();
        renderizarLista();
        input.value = '';
        input.focus();
        
    }else{
        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');
        let texto = document.createTextNode('Digite uma tarefa válida');
        span.appendChild(texto);
        card.appendChild(span);
    }
    
}
function removeSpan() {
    let spans = document.querySelectorAll('.alert');
    for (let i = 0; i < spans.length; i++) {
        card.removeChild(spans[i]);
}
}
function salvarLocalStorage() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
