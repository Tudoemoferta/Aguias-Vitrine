const cfg = window.__CONFIG__;
const supabase = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_KEY);
const produtosContainer = document.getElementById("produtos");

async function carregarProdutos() {
  const { data, error } = await supabase.from("produtos").select("*").order("id", { ascending: false });
  if (error) {
    console.error(error);
    return;
  }

  produtosContainer.innerHTML = "";
  data.forEach(produto => {
    const div = document.createElement("div");
    div.classList.add("produto");
    div.innerHTML = `
      <img src="${produto.imgUrl}" alt="${produto.titulo}">
      <h3>${produto.titulo}</h3>
      <p><del>R$ ${produto.valorAntigo}</del> <strong>R$ ${produto.valorAtual}</strong></p>
      <p>${produto.desconto}% OFF</p>
      <button onclick="abrirLink('${produto.linkAfiliado}')">Ver Oferta</button>
    `;
    produtosContainer.appendChild(div);
  });
}

function abrirLink(url) {
  confete();
  setTimeout(() => window.open(url, "_blank"), 1200);
}

// Efeito confete
function confete() {
  for (let i = 0; i < 100; i++) {
    const c = document.createElement("div");
    c.classList.add("confete");
    c.style.left = Math.random() * 100 + "vw";
    c.style.animationDuration = (Math.random() * 3 + 2) + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}

// Adicionar produto
document.getElementById("btnAddProduto").addEventListener("click", async () => {
  const produto = {
    imgUrl: document.getElementById("imgUrl").value,
    titulo: document.getElementById("titulo").value,
    valorAtual: document.getElementById("valorAtual").value,
    valorAntigo: document.getElementById("valorAntigo").value,
    desconto: document.getElementById("desconto").value,
    descricao: document.getElementById("descricao").value,
    plataforma: document.getElementById("plataforma").value,
    linkAfiliado: document.getElementById("linkAfiliado").value
  };

  const { error } = await supabase.from("produtos").insert([produto]);
  if (error) alert("Erro ao inserir: " + error.message);
  else {
    alert("Produto adicionado!");
    carregarProdutos();
  }
});

carregarProdutos();
