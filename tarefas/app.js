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
        lista.style.flexDirection = "column";
        lista.style.gap = "6%";
        lista.style.padding = "6% 10%";
        lista.style.backgroundColor = "aliceblue";
        lista.style.border = "10px inset gray";

        let funcionalidadesTarefas = document.querySelector(".principal__conteudo__lista__caixa");
        funcionalidadesTarefas.style.listStyle = "none";
        funcionalidadesTarefas.style.display = "flex";
        funcionalidadesTarefas.style.gap = "12%";
        funcionalidadesTarefas.style.transform = "translateX(-8%)";
        funcionalidadesTarefas.style.width = "30%";

        let botaoAdicionar = documento.querySelector(".principal__conteudo__lista__caixa button:nth-child(2)");
        botaoAdicionar.style.padding = "2%";
        botaoAdicionar.style.color = "rgb(0, 97, 0)";
        botaoAdicionar.style.fontSize = "100%";
        botaoAdicionar.style.fontFamily = "Tiny5";
        botaoAdicionar.style.border = "1px solid black";

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

    function ordenarTarefas() {
        let tarefas = Array.from(lista.querySelectorAll("li"));
        tarefas.sort((a, b) => {
            let prioridades = { alta: 2, media: 3, baixa: 4 };
            let prioridadeA = prioridades[a.getAttribute("data-prioridade")] || 1;
            let prioridadeB = prioridades[b.getAttribute("data-prioridade")] || 1;
            return prioridadeA - prioridadeB;
        });
        tarefas.forEach(t => lista.appendChild(t));
    }

    let input = document.getElementById("add");
    input.addEventListener("input", function(){
        if(input.value === ""){
        botaoAdicionar.style.backgroundColor = "aliceblue";
        botaoAdicionar.style.color = "rgb(0, 97, 0)";
        botaoAdicionar.disabled = true;
        }else{
            botaoAdicionar.style.backgroundColor = "rgb(0, 97, 0)";
            botaoAdicionar.style.color = "aliceblue";
            botaoAdicionar.disabled = false;
        }
    });
    
    input.addEventListener("keypress", function(event){
        if(event.key == "Enter"){
            adicionarTarefa();
        }
    })

    let contador = document.querySelector(".principal__conteudo__lista__caixa__contador");  
    contador.textContent = "0";

    function salvarTarefas() {
        let tarefas = [];
        document.querySelectorAll("li").forEach(tarefa => {
            let titulo = tarefa.querySelector("h2").textContent;
            let prioridade = tarefa.getAttribute("data-prioridade") || "";
            let concluida = tarefa.classList.contains("concluido");
            tarefas.push({ titulo, prioridade, concluida });
        });
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    function carregarTarefas() {
        let tarefasSalvas = localStorage.getItem("tarefas");
        if(tarefasSalvas){
            JSON.parse(tarefasSalvas).forEach(tarefaData => {
                criarTarefa(tarefaData.titulo, tarefaData.prioridade, tarefaData.concluida);
            });
        }
    }

    function adicionarTarefa(){
        let novaTarefa = document.createElement("li");
        novaTarefa.className = "elemento_lista";
        novaTarefa.style.display = "flex";
        novaTarefa.style.justifyContent = "center";
        novaTarefa.style.alignItems = "center";
        novaTarefa.style.marginTop = "14%";
        novaTarefa.style.fontFamily = "Caveat";
        novaTarefa.style.fontSize = "120%";
        novaTarefa.style.gap = "4%";
        novaTarefa.style.opacity = "0";
        novaTarefa.style.transitionDuration = "0.5s";

        setTimeout(() => {
            novaTarefa.style.opacity = "1";
        }, 120);
        

        let tituloTarefa = document.createElement("h2");
        tituloTarefa.textContent = input.value;
        tituloTarefa.addEventListener("click", function(){
            tituloTarefa.style.display = "none";
            novoInput.style.display = "inline";
        });

        let novoInput = document.createElement("input");
        novoInput.setAttribute("type", "text");
        novoInput.setAttribute("placeholder", "Press ENTER to confirm");
        novoInput.style.padding = "2%";
        novoInput.style.display = "none";

        novoInput.addEventListener("keypress", function(event){
            if(event.key === "Enter"){
                tituloTarefa.style.display = "inline";
                tituloTarefa.textContent = novoInput.value;
                novoInput.style.display = "none";
            }
        })

        contador.textContent++;

        let prioridades = document.createElement("select");
        ["Grau de Prioridade", "Alta", "Media", "Baixa"].forEach(text => {
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
            setTimeout(() => {
                lista.removeChild(novaTarefa);
                contador.textContent--;
                if(Number(contador.textContent) === 0){
                    lista.style.backgroundColor = "aliceblue";
                }
            }, 400);
        });

        let numeroTarefas = document.querySelectorAll("li").length;
        if(numeroTarefas > 0){
            lista.style.backgroundColor = "darkgray";
        }

        let concluirTarefa = document.createElement("button");
        concluirTarefa.textContent = "Concluir";
        concluirTarefa.style.padding = "2%";
        concluirTarefa.style.backgroundColor = "rgb(0, 97, 0)";
        concluirTarefa.style.color = "aliceblue";
        concluirTarefa.style.fontSize = "70%";
        concluirTarefa.style.fontFamily = "Tiny5";
        let estado = 0;

        concluirTarefa.addEventListener("click", function() {
            if(estado === 0){
               novaTarefa.setAttribute("class", "concluido");
                tituloTarefa.style.textDecoration = "line-through";
                botaoRemover.style.backgroundColor = "green"; 
                estado = 1;
                listaTarefas.pop(novaTarefa);
            }else{
                novaTarefa.removeAttribute("class");
                tituloTarefa.style.textDecoration = "none";
                botaoRemover.style.backgroundColor = "#800000"; 
                estado = 0;
            }
            
        });

        novaTarefa.append(prioridades, tituloTarefa, novoInput, botaoRemover, concluirTarefa);
        lista.appendChild(novaTarefa);

        function limparTarefas(){
            lista.removeChild(novaTarefa);
            contador.textContent = "0";
            lista.style.backgroundColor = "aliceblue";
        }
        
        filtro.addEventListener("change", function() {
            let tarefas = lista.querySelectorAll("li");
            tarefas.forEach(tarefa => {
                let concluida = tarefa.classList.contains("concluido");
                if (filtro.value === "todas") {
                    tarefa.style.display = "flex";
                } else if (filtro.value === "pendentes" && !concluida) {
                    tarefa.style.display = "flex";
                } else if (filtro.value === "concluidas" && concluida) {
                    tarefa.style.display = "flex";
                } else {
                    tarefa.style.display = "none";
                }
            });
        });

        let clean = document.getElementById("clean");
        clean.addEventListener("click", limparTarefas);
        input.value = "";
    }

    let botaoAdicionar = document.querySelector("#add_button");
    botaoAdicionar.addEventListener("click", adicionarTarefa);

});