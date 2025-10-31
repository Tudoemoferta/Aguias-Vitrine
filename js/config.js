const cfg = window.__CONFIG__;
const supabase = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_KEY);

async function loadProducts() {
  const { data, error } = await supabase.from('produtos').select('*').order('id', { ascending: false });
  if (error) return console.error('Erro ao carregar produtos:', error);
  renderProducts(data);
}

function renderProducts(products) {
  const list = document.getElementById('productList');
  list.innerHTML = '';

  products.forEach(p => {
    const item = document.createElement('div');
    item.className = 'product-item';
    item.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description || ''}</p>
      <div class="prices">
        <span class="old">R$${p.old_price}</span>
        <span class="new">R$${p.new_price}</span>
        <span class="discount">-${p.discount}%</span>
      </div>
      <button class="visit" onclick="visitProduct('${p.url}')">Ver oferta</button>
      <button class="delete" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
    `;
    list.appendChild(item);
  });
}

function chuvaDeConfetes() {
  for (let i = 0; i < 100; i++) {
    const confete = document.createElement('div');
    confete.className = 'confete';
    confete.style.left = Math.random() * 100 + 'vw';
    confete.style.animationDuration = 2 + Math.random() * 3 + 's';
    document.body.appendChild(confete);
    setTimeout(() => confete.remove(), 5000);
  }
}

function visitProduct(url) {
  chuvaDeConfetes();
  setTimeout(() => window.open(url, '_blank'), 1200);
}

async function deleteProduct(id) {
  await supabase.from('produtos').delete().eq('id', id);
  loadProducts();
}

document.getElementById('addProductForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('productName').value;
  const url = document.getElementById('productUrl').value;
  const platform = document.getElementById('platform').value;
  const old_price = document.getElementById('oldPrice').value;
  const new_price = document.getElementById('newPrice').value;
  const discount = document.getElementById('discount').value;
  const description = document.getElementById('description').value;

  const { error } = await supabase.from('produtos').insert([{ name, url, platform, old_price, new_price, discount, description }]);
  if (error) alert('Erro ao adicionar produto!');
  else {
    e.target.reset();
    loadProducts();
  }
});

loadProducts();
