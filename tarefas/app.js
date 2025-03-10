document.addEventListener("DOMContentLoaded", function(){
    function adicionarTarefa(){
        let novaTarefa = document.createElement("li");
        novaTarefa.className = "principal__conteudo__lista__item";
        let valorEntrada = document.getElementById("add").value;
        let tituloTarefa = document.createElement("h2");
        tituloTarefa.textContent = valorEntrada;
        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.className = "principal__conteudo__lista__item__remover";
        let concluirTarefa = document.createElement("button");
        concluirTarefa.textContent = "Concluir";
        concluirTarefa.className = "principal__conteudo__lista__item__concluir";
        let prioridades = document.createElement("select");
        let introducao = document.createElement("option");
        introducao.textContent = "Grau de Prioridade";
        introducao.style.textAlign = "center";
        let baixa = document.createElement("option");
        baixa.textContent = "Baixa";
        baixa.style.textAlign = "center";
        let medio = document.createElement("option");
        medio.textContent = "Média";
        medio.style.textAlign = "center"
        let alta = document.createElement("option");
        alta.textContent = "Alta";
        alta.style.textAlign = "center";
        prioridades.appendChild(introducao);
        prioridades.appendChild(alta);
        prioridades.appendChild(medio);
        prioridades.appendChild(baixa);
        novaTarefa.appendChild(prioridades);
        novaTarefa.appendChild(tituloTarefa);
        novaTarefa.appendChild(botaoRemover);
        novaTarefa.appendChild(concluirTarefa);
        let lista = document.querySelector("ul");
        lista.appendChild(novaTarefa);
        concluirTarefa.addEventListener("click", function(){
            novaTarefa.className = "principal__conteudo__lista__item__concluido";

        });
        botaoRemover.addEventListener("click", function(){
            novaTarefa.style.opacity = "0";
            novaTarefa.style.transitionDuration = "2s";
            setTimeout(() => {
                lista.removeChild(novaTarefa);
                contador.textContent--;
            }, 1500)
        });
        let contador = document.querySelector(".principal__conteudo__lista__caixa__contador");  
        let numeroTarefas = document.querySelectorAll(".principal__conteudo__lista__item").length;
        contador.textContent = numeroTarefas;
        function limparTarefas(){
            lista.removeChild(novaTarefa);
            contador.textContent = "0";
        }
        let clean = document.getElementById("clean");
        clean.addEventListener("click", limparTarefas);
        tituloTarefa.addEventListener("click", function(){
            novaTarefa.style.display = "none";
            let tarefaAtualizada = document.createElement("li");
            tarefaAtualizada.className = "principal__conteudo__lista__item";
            let novoInput = document.createElement("input");
            novoInput.style.padding = "2%";
            novoInput.style.width = "40%"
            novoInput.addEventListener("keypress", function(){
                if(input.key == "Enter"){
                    tituloTarefa.textContent = novoInput.value;
                    novaTarefa.style.display = "flex";
                    tarefaAtualizada.style.display = "none";

                }
            })
            let concluir = document.createElement("button");
            concluir.className = "principal__conteudo__lista__item__concluir";
            concluir.style.backgroundColor = "gray";
            concluir.textContent = "Concluir";
            if(novoInput.value != ""){
                concluir.style.backgroundColor = "rgb(0, 97, 0)";
            }
            concluir.addEventListener("click", function(){
                tituloTarefa.textContent = novoInput.value;
                novaTarefa.style.display = "flex";
                tarefaAtualizada.style.display = "none";
            })
            let limpar = document.createElement("button");
            limpar.className = "principal__conteudo__lista__item__remover";
            limpar.textContent = "Limpar";
            limpar.addEventListener("click", function(){
                novoInput.value = "";
            })
            
            lista.appendChild(tarefaAtualizada);
            tarefaAtualizada.appendChild(novoInput);
            tarefaAtualizada.appendChild(concluir);
            tarefaAtualizada.appendChild(limpar);

        })
    }
        let botaoAdicionar = document.querySelector("#add_button");
        botaoAdicionar.addEventListener("click", adicionarTarefa);
        let input = document.getElementById("add");
        input.addEventListener("keypress", function(){
            if(input.key == "Enter"){
                adicionarTarefa();
            }
        })

})



// document.addEventListener("DOMContentLoaded", function() {
//     function atualizarContador() {
//         let contador = document.getElementById("contador");
//         let totalTarefas = document.querySelectorAll(".principal__conteudo__lista__item").length;
//         contador.textContent = `Total de tarefas: ${totalTarefas}`;
//         atualizarFundoPagina(totalTarefas);
//     }

//     function atualizarFundoPagina(totalTarefas) {
//         let body = document.body;
//         body.style.backgroundColor = totalTarefas === 0 ? "#f0f0f0" : "rgb(0, 0, 54)";
//     }

//     function adicionarTarefa() { 
//         let input = document.getElementById("add");
//         let lista = document.querySelector(".principal__conteudo__lista");
//         let caixa = document.querySelector(".caixa");
//         let textoTarefa = input.value.trim();

//         if (textoTarefa !== "") {
//             let novaTarefa = document.createElement("li");
//             novaTarefa.textContent = textoTarefa;
//             novaTarefa.className = "principal__conteudo__lista__item";
            
//             let seletorPrioridade = document.createElement("select");
//             let opcoes = ["Baixa", "Média", "Alta"];
//             opcoes.forEach(prioridade => {
//                 let opcao = document.createElement("option");
//                 opcao.value = prioridade;
//                 opcao.textContent = prioridade;
//                 seletorPrioridade.appendChild(opcao);
//             });
//             seletorPrioridade.addEventListener("change", function() {
//                 if (seletorPrioridade.value === "Baixa") {
//                     novaTarefa.style.backgroundColor = "lightgreen";
//                     novaTarefa.style.color = "green";
//                 } else if (seletorPrioridade.value === "Média") {
//                     novaTarefa.style.backgroundColor = "yellow";
//                     novaTarefa.style.color = "orange";
//                 } else {
//                     novaTarefa.style.backgroundColor = "lightcoral";
//                     novaTarefa.style.color = "red";
//                 }
//             });
            
//             let remocao = document.createElement("button");
//             remocao.textContent = "Remover";
//             remocao.className = "principal__conteudo__lista__botao";
//             remocao.addEventListener("click", function() {
//                 novaTarefa.style.opacity = "0";
//                 setTimeout(() => {
//                     lista.removeChild(novaTarefa);
//                     atualizarContador();
//                 }, 300);
//             });
            
//             let marcarConcluida = document.createElement("button");
//             marcarConcluida.textContent = "Concluir";
//             marcarConcluida.className = "principal__conteudo__lista__botao";
//             marcarConcluida.addEventListener("click", function() {
//                 novaTarefa.classList.toggle("completed");
//                 remocao.style.backgroundColor = novaTarefa.classList.contains("completed") ? "green" : "red";
//             });
            
//             novaTarefa.addEventListener("dblclick", function() {
//                 let novoTexto = prompt("Edite a tarefa:", novaTarefa.textContent);
//                 if (novoTexto !== null && novoTexto.trim() !== "") {
//                     novaTarefa.textContent = novoTexto;
//                     novaTarefa.appendChild(seletorPrioridade);
//                     novaTarefa.appendChild(remocao);
//                     novaTarefa.appendChild(marcarConcluida);
//                 }
//             });
            
//             novaTarefa.appendChild(seletorPrioridade);
//             novaTarefa.appendChild(remocao);
//             novaTarefa.appendChild(marcarConcluida);
//             lista.appendChild(novaTarefa);
//             input.value = "";
//             atualizarContador();
            
//             novaTarefa.style.opacity = "0";
//             setTimeout(() => {
//                 novaTarefa.style.opacity = "1";
//             }, 100);
            
//             lista.appendChild(caixa);
//         }
//     }

//     function limparLista() {
//         let lista = document.querySelector(".principal__conteudo__lista");
//         lista.innerHTML = "";
//         lista.appendChild(document.querySelector(".caixa"));
//         atualizarContador();
//     }
    
//     let adicao = document.querySelector(".caixa button:nth-child(2)");
//     adicao.addEventListener("click", adicionarTarefa);
    
//     let limpar = document.querySelector(".caixa button:last-child");
//     limpar.addEventListener("click", limparLista);
// });
