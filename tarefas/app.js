document.addEventListener("DOMContentLoaded", function () {
    let botaoAdicionar = document.querySelector("#add_button");
    let input = document.getElementById("add");
    let lista = document.querySelector("ul");
    let contador = document.querySelector(".principal__conteudo__lista__caixa__contador");
    let filtro = document.getElementById("filter");
    let clean = document.getElementById("clean");

    function atualizarContador() {
        let numeroTarefas = document.querySelectorAll(".principal__conteudo__lista__item").length;
        contador.textContent = numeroTarefas;
        document.body.style.backgroundColor = numeroTarefas === 0 ? "#f5f5f5" : "#ccc";
    }

    function salvarTarefas() {
        let tarefas = [];
        document.querySelectorAll(".principal__conteudo__lista__item").forEach(tarefa => {
            tarefas.push({
                texto: tarefa.querySelector("h2").textContent,
                prioridade: tarefa.dataset.prioridade,
                concluida: tarefa.classList.contains("principal__conteudo__lista__item__concluido")
            });
        });
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    function carregarTarefas() {
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        tarefas.forEach(tarefa => adicionarTarefa(tarefa.texto, tarefa.prioridade, tarefa.concluida));
    }

    function adicionarTarefa(valorEntrada, prioridadeSelecionada = "Baixa", concluida = false) {
        if (!valorEntrada.trim()) return;

        let novaTarefa = document.createElement("li");
        novaTarefa.className = "principal__conteudo__lista__item";
        novaTarefa.dataset.prioridade = prioridadeSelecionada;
        novaTarefa.style.opacity = "0";
        setTimeout(() => (novaTarefa.style.opacity = "1"), 100);

        let tituloTarefa = document.createElement("h2");
        tituloTarefa.textContent = valorEntrada;
        
        let prioridade = document.createElement("span");
        prioridade.textContent = `(${prioridadeSelecionada})`;
        prioridade.style.color = prioridadeSelecionada === "Alta" ? "red" : prioridadeSelecionada === "Média" ? "orange" : "green";
        novaTarefa.style.backgroundColor = prioridadeSelecionada === "Alta" ? "#ffcccc" : prioridadeSelecionada === "Média" ? "#fff5cc" : "#ccffcc";

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.className = "principal__conteudo__lista__item__remover";
        botaoRemover.style.backgroundColor = "red";

        let concluirTarefa = document.createElement("button");
        concluirTarefa.textContent = "Concluir";
        concluirTarefa.className = "principal__conteudo__lista__item__concluir";

        novaTarefa.appendChild(tituloTarefa);
        novaTarefa.appendChild(prioridade);
        novaTarefa.appendChild(botaoRemover);
        novaTarefa.appendChild(concluirTarefa);
        lista.appendChild(novaTarefa);

        if (concluida) marcarComoConcluida(novaTarefa);
        organizarTarefas();
        atualizarContador();
        salvarTarefas();

        concluirTarefa.addEventListener("click", function () {
            marcarComoConcluida(novaTarefa);
            salvarTarefas();
        });

        botaoRemover.addEventListener("click", function () {
            novaTarefa.style.opacity = "0";
            setTimeout(() => {
                lista.removeChild(novaTarefa);
                atualizarContador();
                salvarTarefas();
            }, 500);
        });
    }

    function marcarComoConcluida(tarefa) {
        tarefa.classList.toggle("principal__conteudo__lista__item__concluido");
        tarefa.style.backgroundColor = tarefa.classList.contains("principal__conteudo__lista__item__concluido") ? "#e0e0e0" : "";
        tarefa.querySelector("h2").style.textDecoration = tarefa.classList.contains("principal__conteudo__lista__item__concluido") ? "line-through" : "none";
        tarefa.querySelector(".principal__conteudo__lista__item__remover").style.backgroundColor = tarefa.classList.contains("principal__conteudo__lista__item__concluido") ? "green" : "red";
    }

    function organizarTarefas() {
        let tarefas = Array.from(lista.children);
        tarefas.sort((a, b) => {
            let prioridades = { "Alta": 1, "Média": 2, "Baixa": 3 };
            return prioridades[a.dataset.prioridade] - prioridades[b.dataset.prioridade];
        });
        tarefas.forEach(tarefa => lista.appendChild(tarefa));
    }

    filtro.addEventListener("change", function () {
        let tipo = filtro.value;
        document.querySelectorAll(".principal__conteudo__lista__item").forEach(tarefa => {
            if (tipo === "todas" || (tipo === "pendentes" && !tarefa.classList.contains("principal__conteudo__lista__item__concluido")) || (tipo === "concluidas" && tarefa.classList.contains("principal__conteudo__lista__item__concluido"))) {
                tarefa.style.display = "flex";
            } else {
                tarefa.style.display = "none";
            }
        });
    });

    clean.addEventListener("click", function () {
        lista.innerHTML = "";
        atualizarContador();
        salvarTarefas();
    });

    input.addEventListener("input", function () {
        botaoAdicionar.disabled = !input.value.trim();
        botaoAdicionar.style.backgroundColor = input.value.trim() ? "green" : "gray";
    });

    botaoAdicionar.addEventListener("click", function () {
        let prioridadeSelecionada = document.getElementById("priority").value;
        adicionarTarefa(input.value, prioridadeSelecionada);
        input.value = "";
        botaoAdicionar.disabled = true;
        botaoAdicionar.style.backgroundColor = "gray";
    });

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            botaoAdicionar.click();
        }
    });

    carregarTarefas();
});
