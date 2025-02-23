document.addEventListener("DOMContentLoaded", function() {
    function atualizarContador() {
        let contador = document.getElementById("contador");
        let totalTarefas = document.querySelectorAll(".principal__conteudo__lista__item").length;
        contador.textContent = `Total de tarefas: ${totalTarefas}`;
        atualizarFundoPagina(totalTarefas);
    }

    function atualizarFundoPagina(totalTarefas) {
        let body = document.body;
        body.style.backgroundColor = totalTarefas === 0 ? "#f0f0f0" : "rgb(0, 0, 54)";
    }

    function adicionarTarefa() { 
        let input = document.getElementById("add");
        let lista = document.querySelector(".principal__conteudo__lista");
        let caixa = document.querySelector(".caixa");
        let textoTarefa = input.value.trim();

        if (textoTarefa !== "") {
            let novaTarefa = document.createElement("li");
            novaTarefa.textContent = textoTarefa;
            novaTarefa.className = "principal__conteudo__lista__item";
            
            let seletorPrioridade = document.createElement("select");
            let opcoes = ["Baixa", "Média", "Alta"];
            opcoes.forEach(prioridade => {
                let opcao = document.createElement("option");
                opcao.value = prioridade;
                opcao.textContent = prioridade;
                seletorPrioridade.appendChild(opcao);
            });
            seletorPrioridade.addEventListener("change", function() {
                if (seletorPrioridade.value === "Baixa") {
                    novaTarefa.style.backgroundColor = "lightgreen";
                    novaTarefa.style.color = "green";
                } else if (seletorPrioridade.value === "Média") {
                    novaTarefa.style.backgroundColor = "yellow";
                    novaTarefa.style.color = "orange";
                } else {
                    novaTarefa.style.backgroundColor = "lightcoral";
                    novaTarefa.style.color = "red";
                }
            });
            
            let remocao = document.createElement("button");
            remocao.textContent = "Remover";
            remocao.className = "principal__conteudo__lista__botao";
            remocao.addEventListener("click", function() {
                novaTarefa.style.opacity = "0";
                setTimeout(() => {
                    lista.removeChild(novaTarefa);
                    atualizarContador();
                }, 300);
            });
            
            let marcarConcluida = document.createElement("button");
            marcarConcluida.textContent = "Concluir";
            marcarConcluida.className = "principal__conteudo__lista__botao";
            marcarConcluida.addEventListener("click", function() {
                novaTarefa.classList.toggle("completed");
                remocao.style.backgroundColor = novaTarefa.classList.contains("completed") ? "green" : "red";
            });
            
            novaTarefa.addEventListener("dblclick", function() {
                let novoTexto = prompt("Edite a tarefa:", novaTarefa.textContent);
                if (novoTexto !== null && novoTexto.trim() !== "") {
                    novaTarefa.textContent = novoTexto;
                    novaTarefa.appendChild(seletorPrioridade);
                    novaTarefa.appendChild(remocao);
                    novaTarefa.appendChild(marcarConcluida);
                }
            });
            
            novaTarefa.appendChild(seletorPrioridade);
            novaTarefa.appendChild(remocao);
            novaTarefa.appendChild(marcarConcluida);
            lista.appendChild(novaTarefa);
            input.value = "";
            atualizarContador();
            
            novaTarefa.style.opacity = "0";
            setTimeout(() => {
                novaTarefa.style.opacity = "1";
            }, 100);
            
            lista.appendChild(caixa);
        }
    }

    function limparLista() {
        let lista = document.querySelector(".principal__conteudo__lista");
        lista.innerHTML = "";
        lista.appendChild(document.querySelector(".caixa"));
        atualizarContador();
    }
    
    let adicao = document.querySelector(".caixa button:nth-child(2)");
    adicao.addEventListener("click", adicionarTarefa);
    
    let limpar = document.querySelector(".caixa button:last-child");
    limpar.addEventListener("click", limparLista);
});
