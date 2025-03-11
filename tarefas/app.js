document.addEventListener("DOMContentLoaded", function(){
    let lista = document.querySelector("ul");

    let filtro = document.createElement("select");
    let todasTarefas = new Option("Todas as tarefas", "todas");
    let tarefasPendentes = new Option("Tarefas pendentes", "pendentes");
    let tarefasConcluidas = new Option("Tarefas Concluidas", "concluidas");
    filtro.appendChild(todasTarefas);
    filtro.appendChild(tarefasPendentes);
    filtro.appendChild(tarefasConcluidas);
    lista.appendChild(filtro);

    let input = document.getElementById("add");

    input.addEventListener("input", function(){
        botaoAdicionar.style.backgroundColor = "green";
        botaoAdicionar.disabled = false;
    });

    function ordenarTarefas() {
        let tarefas = Array.from(lista.querySelectorAll(".principal__conteudo__lista__item"));
        tarefas.sort((a, b) => {
            let prioridades = { alta: 1, media: 2, baixa: 3 };
            let prioridadeA = prioridades[a.getAttribute("data-prioridade")] || 4;
            let prioridadeB = prioridades[b.getAttribute("data-prioridade")] || 4;
            return prioridadeA - prioridadeB;
        });
        tarefas.forEach(t => lista.insertBefore(t, lista.firstChild));
    }

    let contador = document.querySelector(".principal__conteudo__lista__caixa__contador");  
    contador.textContent = "0";

    function adicionarTarefa(){
        let novaTarefa = document.createElement("li");
        novaTarefa.className = "principal__conteudo__lista__item";
        let tituloTarefa = document.createElement("h2");
        tituloTarefa.textContent = input.value;

        contador.textContent++;

        let prioridades = document.createElement("select");
        ["Grau de Prioridade", "Alta", "Média", "Baixa"].forEach(text => {
            let opcao = new Option(text, text.toLowerCase());
            prioridades.appendChild(opcao);
        });

        prioridades.addEventListener("change", function() {
            let cores = { alta: "#ff9999", media: "#ffff99", baixa: "#99ff99" };
            let coresTexto = { alta: "red", media: "orange", baixa: "green" };
            let prioridadeSelecionada = prioridades.value;
            novaTarefa.style.backgroundColor = cores[prioridadeSelecionada] || "";
            tituloTarefa.style.color = coresTexto[prioridadeSelecionada] || "";
            novaTarefa.setAttribute("data-prioridade", prioridadeSelecionada);
            ordenarTarefas();
        });

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.className = "principal__conteudo__lista__item__remover";

        botaoRemover.addEventListener("click", function(){
            novaTarefa.style.opacity = "0";
            novaTarefa.style.transitionDuration = "2s";
            setTimeout(() => {
                lista.removeChild(novaTarefa);
                contador.textContent--;
            }, 1500);
        });

        let concluirTarefa = document.createElement("button");
        concluirTarefa.className = "principal__conteudo__lista__item__concluir";
        concluirTarefa.textContent = "Concluir";

        concluirTarefa.addEventListener("click", function() {
            novaTarefa.classList.toggle("concluido");
            novaTarefa.style.backgroundColor = novaTarefa.classList.contains("concluido") ? "#d3d3d3" : "";
            tituloTarefa.style.textDecoration = novaTarefa.classList.contains("concluido") ? "line-through" : "none";
            botaoRemover.style.backgroundColor = novaTarefa.classList.contains("concluido") ? "green" : "red";
        });

        novaTarefa.append(prioridades, tituloTarefa, botaoRemover, concluirTarefa);
        lista.appendChild(novaTarefa);

        function limparTarefas(){
            lista.removeChild(novaTarefa);
            contador.textContent = "0";
        }
    
        let clean = document.getElementById("clean");
        clean.addEventListener("click", limparTarefas);
    }

    let botaoAdicionar = document.querySelector("#add_button");
    botaoAdicionar.addEventListener("click", adicionarTarefa);

    filtro.addEventListener("change", function() {
        let tarefas = lista.querySelectorAll(".principal__conteudo__lista__item");
        tarefas.forEach(tarefa => {
            if (filtro.value === "todas") {
                tarefa.style.display = "flex";
            } else if (filtro.value === "pendentes" && !tarefa.classList.contains("concluido")) {
                tarefa.style.display = "flex";
            } else if (filtro.value === "concluidas" && tarefa.classList.contains("concluido")) {
                tarefa.style.display = "flex";
            } else {
                tarefa.style.display = "none";
            }
        });
    });
    let clean = document.getElementById("clean");
    clean.addEventListener("click", limparTarefas);
});
