document.addEventListener("DOMContentLoaded", function(){
    function estilizacaoLista(){
        document.body.style.boxSizing = "border-box";
        document.body.style.backgroundColor = "rgb(0, 0, 54)";

        let documento = document.querySelector(".principal__conteudo");
        documento.style.display = "flex";
        documento.style.padding = "2%";
        documento.style.justifyContent = "center";

        let titulo = document.querySelector(".principal__conteudo__titulo");
        titulo.style.position = "absolute";
        titulo.style.transform = "translateY(80%)";
        titulo.style.fontFamily = "Caveat";
        titulo.style.fontSize = "180%";

        let lista = document.querySelector(".principal__conteudo__lista");
        lista.style.display = "flex";
        lista.style.flexDirection = "column-reverse";
        lista.style.gap = "6%";
        lista.style.padding = "6% 4%";
        lista.style.backgroundColor = "aliceblue";
        lista.style.border = "10px inset gray";

        let funcionalidadesTarefas = document.querySelector(".principal__conteudo__lista__caixa");
        funcionalidadesTarefas.style.listStyle = "none";
        funcionalidadesTarefas.style.display = "flex";
        funcionalidadesTarefas.style.gap = "10%";
        funcionalidadesTarefas.style.transform = "translateX(-8%)";
        funcionalidadesTarefas.style.width = "30%";

        let botaoAdicionar = documento.querySelector(".principal__conteudo__lista__caixa button:nth-child(2)");
        botaoAdicionar.style.padding = "2%";
        botaoAdicionar.style.color = "rgb(0, 97, 0)";
        botaoAdicionar.style.fontSize = "100%";
        botaoAdicionar.style.fontFamily = "Tiny5";

        let botaoLimparTarefas = document.querySelector(".principal__conteudo__lista__caixa button:nth-child(3)");
        botaoLimparTarefas.style.padding = "2%";
        botaoLimparTarefas.style.color = "aliceblue";
        botaoLimparTarefas.style.backgroundColor = "rgb(255, 72, 0)";
        botaoLimparTarefas.style.fontSize = "100%";
        botaoLimparTarefas.style.fontFamily = "Tiny5";

        let contador = document.querySelector(".principal__conteudo__lista__caixa__contador");
        contador.style.padding = "6% 10%";
        contador.style.textAling = "center";
        contador.style.backgroundColor = "darkgray";
        contador.style.fontFamily = "Tiny5";
        contador.style.border = "6px inset gray"
    }

    estilizacaoLista();

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
        botaoAdicionar.style.backgroundColor = "rgb(0, 97, 0)";
        botaoAdicionar.style.color = "aliceblue";
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
        novaTarefa.style.display = "flex";
        novaTarefa.style.justifyContent = "center";
        novaTarefa.style.alignItems = "center";
        novaTarefa.style.marginBottom = "14%";
        novaTarefa.style.fontFamily = "Caveat";
        novaTarefa.style.fontSize = "120%";
        novaTarefa.style.gap = "4%";

        let tituloTarefa = document.createElement("h2");
        tituloTarefa.textContent = input.value;
        tituloTarefa.addEventListener("click", function(){
            let novoInput = document.createElement("input");
            novoInput.setAttribute("type", "text");
            tituloTarefa.outerHTML = novoInput.outerHTML;
            tituloTarefa.textContent = novoInput.value;

            novoInput.addEventListener("keypress", function(event){
                if(event.key === "Enter"){
                    tituloTarefa.outerHTML = "<h2></h2>";
                }
            })
        })

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
        botaoRemover.style.padding = "2%";
        botaoRemover.style.backgroundColor = "#800000";
        botaoRemover.style.color = "aliceblue";
        botaoRemover.style.fontSize = "70%";
        botaoRemover.style.fontFamily = "Tiny5";

        botaoRemover.addEventListener("click", function(){
            novaTarefa.style.opacity = "0";
            novaTarefa.style.transitionDuration = "2s";
            setTimeout(() => {
                lista.removeChild(novaTarefa);
                contador.textContent--;
            }, 1500);
        });

        let concluirTarefa = document.createElement("button");
        concluirTarefa.textContent = "Concluir";
        concluirTarefa.style.padding = "2%";
        concluirTarefa.style.backgroundColor = "rgb(0, 97, 0)";
        concluirTarefa.style.color = "aliceblue";
        concluirTarefa.style.fontSize = "70%";
        concluirTarefa.style.fontFamily = "Tiny5";

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
});
