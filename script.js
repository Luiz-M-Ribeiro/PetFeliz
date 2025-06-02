function adicionarAoCarrinho(nome, preco) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const existente = carrinho.find(item => item.nome === nome);

  if (existente) {
    existente.quantidade += 1;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }

  const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  localStorage.setItem("total", total.toFixed(2));

  alert(`${nome} adicionado ao carrinho!`);
}


function removerDoCarrinho(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.splice(index, 1);

  const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  localStorage.setItem("total", total.toFixed(2));

  atualizarCarrinho();
}

function atualizarCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const listaCarrinho = document.getElementById("carrinho") || document.getElementById("lista-carrinho");
  const totalElemento = document.getElementById("total") || document.getElementById("total-compra");

  if (!listaCarrinho || !totalElemento) return;

  listaCarrinho.innerHTML = "";

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
   li.innerHTML = `
    ${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
      <button onclick="diminuirQuantidade(${index})" style="margin-left:10px;">-</button>
      <button onclick="aumentarQuantidade(${index})">+</button>
      <button class="botaoRemover" onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    listaCarrinho.appendChild(li);
  });

  const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  totalElemento.textContent = `R$${total.toFixed(2)}`;
}

function aumentarQuantidade(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho[index].quantidade += 1;
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
}

function diminuirQuantidade(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho[index].quantidade > 1) {
    carrinho[index].quantidade -= 1;
  } else {
    carrinho.splice(index, 1);
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
}

function finalizarCompra(){
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let total = parseFloat(localStorage.getItem("total")) || 0;

  if (carrinho.length === 0){
    alert("Seu carrinho está vazio!");
    return;
  }

  alert(`Compra realizada com sucesso!\nTotal: R$ ${total.toFixed(2)}\nProdutos: ${carrinho.length}`);

  localStorage.removeItem('carrinho');
  localStorage.removeItem('total');

  atualizarCarrinho();

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}
 