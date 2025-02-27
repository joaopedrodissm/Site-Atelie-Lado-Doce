// Função para aumentar ou diminuir a quantidade no input
function alterarQuantidade(id, valor) {
    let input = document.getElementById(id);
    let quantidade = parseInt(input.value) + valor;
    if (quantidade < 0) quantidade = 0;
    input.value = quantidade;
}

// Função para validar a entrada de números no input
function validarQuantidade(input) {
    if (input.value < 0 || isNaN(input.value)) {
        input.value = 0;
    }
}

function adicionarAoCarrinho() {
    let produtos = [
        { nome: "Brigadeiro", id: "brigadeiro" },
        { nome: "Beijinho", id: "beijinho" },
        { nome: "Dois Amores", id: "dois-amores" },
        { nome: "Caseirinho de Chocolate", id: "caseirinho-chocolate" },
        { nome: "Caseirinho de Leite Ninho", id: "caseirinho-leite" },
        { nome: "Caseirinho de Dois Amores", id: "caseirinho-doisamores" },
        { nome: "Cookie Tradicional", id: "cookie-tradicional" },
        { nome: "Cookie Red Velvet", id: "cookie-red" },
        { nome: "Cookie de Chocolate", id: "cookie-chocolate" },
        { nome: "Locação do Carrinho Gourmet", id: "locacao-carrinho" }
        
    ];

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    produtos.forEach(produto => {
        let quantidade = parseInt(document.getElementById(produto.id).value);
        if (quantidade > 0) {
            let itemExistente = carrinho.find(item => item.nome === produto.nome);
            if (itemExistente) {
                itemExistente.quantidade += quantidade;
            } else {
                carrinho.push({ nome: produto.nome, quantidade });
            }
        }
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    
    alert("Itens adicionados ao carrinho!");
  }

  function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let tabela = document.getElementById("carrinho-itens");
    tabela.innerHTML = ""; // Limpa antes de adicionar novos itens

    carrinho.forEach((item, index) => {
        let linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td><button onclick="removerItem(${index})">❌</button></td>
        `;
        tabela.appendChild(linha);
    });
}

// Função para remover item específico do carrinho
function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1); // Remove o item da lista
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho(); // Recarrega a tabela
}

// Função para limpar todo o carrinho
function limparCarrinho() {
    localStorage.removeItem("carrinho");
    carregarCarrinho();
}

// Carregar os itens do carrinho ao abrir a página
document.addEventListener("DOMContentLoaded", carregarCarrinho);

function atualizarContadorCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

    let contador = document.getElementById("carrinho-contador");
    if (contador) {
        contador.textContent = totalItens;
        contador.style.display = totalItens > 0 ? "block" : "none";
    }
}

document.addEventListener("DOMContentLoaded", atualizarContadorCarrinho);

function enviarPedido() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá Ateliê Lado Doce, gostaria de solicitar os seguintes pedidos:\n";
    
    carrinho.forEach(item => {
        mensagem += `- ${item.quantidade} ${item.nome}\n`;
    });

    // Codifica a mensagem para ser usada na URL do WhatsApp
    let mensagemCodificada = encodeURIComponent(mensagem);

    // Substitua pelo número do WhatsApp do Ateliê
    let numeroWhatsApp = "5541988769179"; // Exemplo: "5511999999999" (Brasil)

    let url = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    
    // Abre o WhatsApp com a mensagem pronta
    window.open(url, "_blank");
}
function alterarQuantidade(id, delta) {
    let input = document.getElementById(id);
    let valor = parseInt(input.value) + delta;

    // Garante que o valor esteja entre 0 e 1
    if (valor < 0) {
        valor = 0;
    } else if (valor > 1) {
        valor = 1;
    }

    input.value = valor;
}
