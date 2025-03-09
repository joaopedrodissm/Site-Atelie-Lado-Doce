function alterarQuantidade(id, valor) {
    let input = document.getElementById(id);
    let quantidade = parseInt(input.value) + valor;

    // Impede valores negativos
    if (quantidade < 0) quantidade = 0;

    input.value = quantidade;

    atualizarTotalCarrinho();
}

// Atualiza o valor total do carrinho
function atualizarTotalCarrinho() {
    let total = 0;

    document.querySelectorAll(".contador").forEach(contador => {
        let input = contador.querySelector("input");
        let preco = parseFloat(contador.querySelector(".preco-produto").dataset.preco) || 0;
        let quantidade = parseInt(input.value);

        total += quantidade * preco;
    });

    let totalCarrinho = document.getElementById("total-carrinho");
    if (totalCarrinho) {
        totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
}

// Função para adicionar itens ao carrinho e salvar no localStorage
function adicionarAoCarrinho() {
    let produtos = [
        { nome: "Brigadeiro", id: "brigadeiro", preco: 3.00 },
        { nome: "Beijinho", id: "beijinho", preco: 3.00 },
        { nome: "Dois Amores", id: "dois-amores", preco: 3.50 },
        { nome: "Caseirinho de Chocolate", id: "caseirinho-chocolate", preco: 5.00 },
        { nome: "Caseirinho de Leite Ninho", id: "caseirinho-leite", preco: 5.00 },
        { nome: "Caseirinho de Dois Amores", id: "caseirinho-doisamores", preco: 5.50 },
        { nome: "Cookie Tradicional", id: "cookie-tradicional", preco: 6.00 },
        { nome: "Cookie Red Velvet", id: "cookie-red", preco: 6.50 },
        { nome: "Cookie de Chocolate", id: "cookie-chocolate", preco: 6.50 },
        { nome: "Locação do Carrinho Gourmet", id: "locacao-carrinho", preco: 50.00 }
    ];

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    produtos.forEach(produto => {
        let quantidade = parseInt(document.getElementById(produto.id).value);
        if (quantidade > 0) {
            let itemExistente = carrinho.find(item => item.nome === produto.nome);
            if (itemExistente) {
                itemExistente.quantidade += quantidade;
            } else {
                carrinho.push({ nome: produto.nome, quantidade, preco: produto.preco });
            }
        }
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContadorCarrinho();

    alert("Itens adicionados ao carrinho!");
}

// Função para carregar os itens do carrinho na tabela
function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let tabela = document.getElementById("carrinho-itens");
    tabela.innerHTML = ""; // Limpa antes de adicionar novos itens

    carrinho.forEach((item, index) => {
        let linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
            <td><button onclick="removerItem(${index})">❌</button></td>
        `;
        tabela.appendChild(linha);
    });

    atualizarTotalCarrinho();
}

// Função para remover item do carrinho
function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1); // Remove o item da lista
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
}

// Função para limpar todo o carrinho
function limparCarrinho() {
    localStorage.removeItem("carrinho");
    carregarCarrinho();
}

// Atualiza o contador e valor total do carrinho
function atualizarContadorCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Total de itens e valor final
    let totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    let totalValor = carrinho.reduce((total, item) => total + (item.quantidade * (item.preco || 0)), 0);

    let contador = document.getElementById("carrinho-contador");
    if (contador) {
        contador.textContent = totalItens;
        contador.style.display = totalItens > 0 ? "block" : "none";
    }

    let totalCarrinho = document.getElementById("total-carrinho");
    if (totalCarrinho) {
        totalCarrinho.textContent = `Total: R$ ${totalValor.toFixed(2)}`;
    }
}

// Carregar carrinho ao abrir a página
document.addEventListener("DOMContentLoaded", () => {
    carregarCarrinho();
    atualizarContadorCarrinho();
});

// Enviar pedido pelo WhatsApp
function enviarPedido() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá Ateliê Lado Doce, gostaria de solicitar os seguintes pedidos:\n";
    
    carrinho.forEach(item => {
        mensagem += `- ${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });

    let mensagemCodificada = encodeURIComponent(mensagem);
    let numeroWhatsApp = "5541988769179";
    let url = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    window.open(url, "_blank");
}
