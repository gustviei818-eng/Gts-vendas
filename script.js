let carrinho = [];

function adicionarCarrinho(nome, preco) {

    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();

    alert("Produto adicionado ao carrinho!");
}


function atualizarCarrinho() {

    const lista = document.getElementById("listaCarrinho");
    const contador = document.getElementById("contador");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach((produto, index) => {

        total += produto.preco * produto.quantidade;
        quantidadeTotal += produto.quantidade;

        const item = document.createElement("div");

        item.className = "item-carrinho";

        item.innerHTML = `
            <div>
                <strong>${produto.nome}</strong>
                <br>
                ${produto.quantidade}x
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
            </div>

            <button
                class="remover"
                onclick="removerProduto(${index})">
                Remover
            </button>
        `;

        lista.appendChild(item);
    });

    contador.textContent = quantidadeTotal;

    totalElemento.textContent =
        "R$ " + total.toFixed(2).replace(".", ",");
}


function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


function abrirCarrinho() {

    document.getElementById("carrinho").style.display = "flex";

    atualizarCarrinho();
}


function fecharCarrinho() {

    document.getElementById("carrinho").style.display = "none";
}


function finalizarPedido() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Quero fazer um pedido na GV Vendas:%0A%0A";

    let total = 0;

    carrinho.forEach(produto => {

        const subtotal =
            produto.preco * produto.quantidade;

        total += subtotal;

        mensagem +=
            `• ${produto.nome} - ${produto.quantidade}x - R$ ${subtotal.toFixed(2)}%0A`;
    });

    mensagem +=
        `%0ATotal: R$ ${total.toFixed(2)}%0A%0A`;

    mensagem +=
        "Gostaria de saber como finalizar a compra.";

    /*
      TROQUE O NÚMERO ABAIXO PELO
      WHATSAPP DA SUA LOJA.

      Exemplo:
      558898110865
    */

    const numero = "5588981180378";

    const url =
        "https://wa.me/" + numero + "?text=" + mensagem;

    window.open(url, "_blank");
}


function buscarProduto() {

    const busca =
        document.getElementById("busca")
        .value
        .toLowerCase();

    const produtos =
        document.querySelectorAll(".produto");

    produtos.forEach(produto => {

        const nome =
            produto.dataset.nome;

        if (nome.includes(busca)) {
            produto.style.display = "block";
        } else {
            produto.style.display = "none";
        }
    });
}
