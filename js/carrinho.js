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
        { nome: "Cento de Docinhos Tradicionais", id: "cento-tradicionais", preco: 90.00 },
        { nome: "Docinho de Brigadeiro", id: "brigadeiro", preco: 1.50 },
        { nome: "Docinho de Beijinho", id: "beijinho", preco: 1.50 },
        { nome: "Docinhos de Dois Amores", id: "dois-amores", preco: 1.50 },
        { nome: "Docinho de Leite Ninho", id: "leite-ninho", preco: 1.50 },
        { nome: "Docinho de Cacau", id: "cacau", preco: 1.50 },
        { nome: "Docinho de Amendoim", id: "amendoim", preco: 1.50 },
        {nome: "Cento de Docinhos Gourmet", id: "cento-gourmet", preco: 160.00 },
        { nome: "Docinho de Confete", id: "confete", preco: 2.00 },
        { nome: "Docinho de Surpresa de Uva", id: "surpresa-uva", preco: 2.00 },
        { nome: "Docinho de Ninho com Nutella", id: "ninho-nutella", preco: 2.00 },
        { nome: "Docinho de Café", id: "cafe", preco: 2.00 },
        { nome: "Docinho de Maracujá", id: "maracuja", preco: 2.00 },
        { nome: "Docinho de Red Velvet", id: "red-velvet", preco: 2.00 },
        { nome: "Docinho de Churros", id: "churros", preco: 2.00 },
        {nome: "Cento de Docinhos Especiais", id: "cento-especiais", preco: 190.00 },
        { nome: "Docinho de Ferrero Rocher", id: "ferrero", preco: 3.00 },
        { nome: "Docinho de Kinder Bueno", id: "kinder", preco: 3.00 },
        { nome: "Docinho de Pistache", id: "pistache", preco: 3.00 },
        { nome: "Docinho de Cereija", id: "cereija-brigadeiro", preco: 3.00 },
        { nome: "Docinho de Nozes", id: "nozes", preco: 3.00 },
        { nome: "Docinho de Amêndoas", id: "amendoas", preco: 3.00 },
        { nome: "Docinho de Romeu e Julieta", id: "romeu-julieta", preco: 3.00 },

        { nome: "Caseirinho de Chocolate", id: "caseirinho-chocolate", preco: 5.00 },
        { nome: "Caseirinho de Leite Ninho", id: "caseirinho-leite", preco: 5.00 },
        { nome: "Caseirinho de Dois Amores", id: "caseirinho-doisamores", preco: 5.50 },
        { nome: "Cookie Tradicional", id: "cookie-tradicional", preco: 6.00 },
        { nome: "Cookie Red Velvet", id: "cookie-red", preco: 6.50 },
        { nome: "Cookie de Chocolate", id: "cookie-chocolate", preco: 6.50 },
        { nome: "Locação do Carrinho Gourmet", id: "carrinho-gourmet", preco: 150.00 },
        { nome: "Cesta Chamego", id: "cesta-chamego", preco: 90.00 },
        { nome: "Cesta Coração de Mãe", id: "cesta-coracao", preco: 140.00 },
        { nome: "Cesta Carinho", id: "cesta-carinho", preco: 140.00 },
        { nome: "Cesta Dengo", id: "cesta-dengo", preco: 95.00 },
        { nome: "Ovo de Colher Brigadeiro 185g", id: "ovo-colher-brigadeiro-185g", preco: 45.00 },
        { nome: "Ovo de Colher Brigadeiro 385g", id: "ovo-colher-brigadeiro-385g", preco: 65.00 },
        { nome: "Ovo de Colher Dois Amores 185g", id: "ovo-colher-dois-amores-185g", preco: 45.00 },
        { nome: "Ovo de Colher Dois Amores 385g", id: "ovo-colher-dois-amores-385g", preco: 65.00 },
        { nome: "Ovo de Colher Brigadeiro de Café 185g", id: "ovo-colher-cafe-185g", preco: 45.00 },
        { nome: "Ovo de Colher Brigadeiro de Café 385g", id: "ovo-colher-cafe-385g", preco: 65.00 },
        { nome: "Ovo de Colher Beijinho 185g", id: "ovo-colher-beijinho-185g", preco: 45.00 },
        { nome: "Ovo de Colher Beijinho 385g", id: "ovo-colher-beijinho-385g", preco: 65.00 },
        
        
    ];

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    produtos.forEach(produto => {
        let inputElement = document.getElementById(produto.id);
        if (!inputElement) {
            console.error(`Elemento com ID ${produto.id} não encontrado.`);
            return;
        }
    
        let quantidade = parseInt(inputElement.value);
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
            <td class="td-preco">R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
            <td><button class="btn-lixeira" onclick="removerItem(${index})">🗑️</button></td>
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
    atualizarContadorCarrinho(); // Chamar essa função aqui para atualizar o total corretamente
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
        totalCarrinho.textContent = `Total no carrinho: R$ ${totalValor.toFixed(2)}`;
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

    let mensagem = "Olá Ateliê Lado Doce, gostaria de solicitar os seguintes pedidos:\n\n";
    
    carrinho.forEach(item => {
        mensagem += `- ${item.quantidade} ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });

    let total = document.getElementById("total-carrinho").innerText;
    mensagem += `\n${total}`; 

    let mensagemCodificada = encodeURIComponent(mensagem);
    let numeroWhatsApp = "5541988769179";
    let url = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    window.open(url, "_blank");
}

// function atualizarPreco() {
//     let precoElemento = document.getElementById("preco-produto");
//     console.log(precoElemento); // Verificar se o elemento está sendo encontrado
    
//     if (!precoElemento) {
//         console.error("Elemento #preco-produto não encontrado!");
//         return; // Evita o erro de null
//     }

    
// }
