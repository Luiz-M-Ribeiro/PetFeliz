let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    salvarCarrinho();
    atualizarCarrinho();
  }

  function removerDoCarrinho(index) {
    total -= carrinho[index].preco;
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
  }

  function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    localStorage.setItem("total", total.toFixed(2));
  }

  function atualizarCarrinho() {
   const listaCarrinho = document.getElementById("carrinho");
   const totalElemento = document.getElementById("total");

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


  
  
  
  
  