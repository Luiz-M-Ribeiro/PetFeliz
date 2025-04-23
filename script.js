function adicionarAoCarrinho(nome, preco) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let total = parseFloat(localStorage.getItem("total")) || 0;

  carrinho.push({ nome, preco });
  total += preco;

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  localStorage.setItem("total", total.toFixed(2));

  alert(`${nome} adicionado ao carrinho!`);
}

function removerDoCarrinho(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let total = parseFloat(localStorage.getItem("total")) || 0;

  total -= carrinho[index].preco;
  carrinho.splice(index, 1);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  localStorage.setItem("total", total.toFixed(2));

  atualizarCarrinho();
}

function atualizarCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let total = parseFloat(localStorage.getItem("total")) || 0;

  const listaCarrinho = document.getElementById("carrinho") || document.getElementById("lista-carrinho");
  const totalElemento = document.getElementById("total") || document.getElementById("total-compra");

  if (!listaCarrinho || !totalElemento) return;

  listaCarrinho.innerHTML = "";

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome} - R$ ${item.preco.toFixed(2)}
      <button onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    listaCarrinho.appendChild(li);
  });

  totalElemento.textContent = total.toFixed(2);
}
 