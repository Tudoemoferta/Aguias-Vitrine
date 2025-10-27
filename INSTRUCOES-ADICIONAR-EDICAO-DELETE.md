# 📝 INSTRUÇÕES - Adicionar Edição, Delete e Preço Anterior

## 🎯 O QUE VAMOS ADICIONAR:

1. ✏️ **Botão de Editar** em cada produto
2. 🗑️ **Botão de Deletar** em cada produto
3. 💰 **Preço Anterior** (riscado) nos cards
4. 📝 **Campo de Preço Anterior** no formulário

---

## 📍 PASSO 1: ATUALIZAR O BANCO DE DADOS

Abra o **SQL Editor do Supabase** e execute:

```sql
-- Adicionar coluna de preço anterior
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS previous_price TEXT;

-- Adicionar política de DELETE
CREATE POLICY "Permitir exclusão pública" ON products
    FOR DELETE
    USING (true);
```

---

## 📍 PASSO 2: ADICIONAR ESTILOS CSS

**ONDE:** Dentro da tag `<style>`, **ANTES** de `@media (max-width: 768px)`

**ADICIONE:**

```css
        /* Preço Anterior */
        .product-previous-price {
            font-size: 1.2rem;
            color: #999;
            text-decoration: line-through;
            margin-bottom: 0.5rem;
        }

        /* Botões de Ação no Card */
        .product-actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }

        .btn-edit,
        .btn-delete {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 15px;
            cursor: pointer;
            font-weight: bold;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }

        .btn-edit {
            background: #4CAF50;
            color: white;
        }

        .btn-edit:hover {
            background: #45a049;
        }

        .btn-delete {
            background: #f44336;
            color: white;
        }

        .btn-delete:hover {
            background: #da190b;
        }

        /* Modo de Edição */
        .editing-mode {
            background: #fff3cd !important;
            border: 3px solid #ffc107 !important;
        }
```

---

## 📍 PASSO 3: ADICIONAR CAMPO NO FORMULÁRIO

**ONDE:** No formulário de admin, **DEPOIS** do campo "Preço" e **ANTES** do campo "Plataforma"

**ADICIONE:**

```html
                <div class="form-group">
                    <label>Preço Anterior (Opcional):</label>
                    <input type="text" id="productPreviousPrice" placeholder="Ex: R$ 199,90 (deixe vazio se não houver)">
                </div>
```

---

## 📍 PASSO 4: ATUALIZAR A FUNÇÃO displayProducts()

**ONDE:** Procure a função `displayProducts()` no JavaScript

**SUBSTITUA** a parte que cria os cards (dentro do `.map()`) por:

```javascript
                filtered.map(product => `
                    <div class="product-card" id="product-${product.id}">
                        <div class="product-badges">
                            ${product.platform ? `<span class="badge badge-platform">${product.platform}</span>` : ''}
                            ${product.category ? `<span class="badge badge-category">${getCategoryName(product.category)}</span>` : ''}
                        </div>
                        <img src="${product.image}" alt="${product.name}" class="product-image" 
                             onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22><rect fill=%22%23667eea%22 width=%22400%22 height=%22300%22/><text x=%2250%%22 y=%2250%%22 fill=%22white%22 font-size=%2224%22 text-anchor=%22middle%22>🦅</text></svg>'">
                        <div class="product-info">
                            <div class="product-name">${product.name}</div>
                            ${product.previous_price ? `<div class="product-previous-price">${product.previous_price}</div>` : ''}
                            <div class="product-price">${product.price}</div>
                            <a href="${product.link}" target="_blank" class="product-link">
                                <i class="fas fa-shopping-cart"></i> Ver Oferta
                            </a>
                            <div class="product-actions">
                                <button class="btn-edit" onclick="editProduct(${product.id})">
                                    <i class="fas fa-edit"></i> Editar
                                </button>
                                <button class="btn-delete" onclick="deleteProduct(${product.id})">
                                    <i class="fas fa-trash"></i> Deletar
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')
```

---

## 📍 PASSO 5: ATUALIZAR A FUNÇÃO addProduct()

**ONDE:** Procure a função `addProduct()` no JavaScript

**SUBSTITUA** a parte que cria `newProduct` por:

```javascript
            const newProduct = {
                name: name,
                price: price,
                link: link,
                image: image,
                platform: platform,
                category: category,
                previous_price: document.getElementById('productPreviousPrice').value.trim() || null,
                created_at: new Date().toISOString()
            };
```

**E ADICIONE** esta linha na parte de limpar campos (depois de `uploadedImageData = null;`):

```javascript
                document.getElementById('productPreviousPrice').value = '';
```

---

## 📍 PASSO 6: ADICIONAR NOVAS FUNÇÕES

**ONDE:** No final do JavaScript, **ANTES** de `loadProducts();`

**ADICIONE:**

```javascript
        // Variável global para controlar edição
        let editingProductId = null;

        // Editar produto
        async function editProduct(productId) {
            const product = allProducts.find(p => p.id === productId);
            if (!product) return;

            // Abrir modal
            openAdminModal();
            
            // Fazer login automático se necessário
            document.getElementById('adminForm').style.display = 'block';
            document.getElementById('loginBtn').style.display = 'none';
            document.getElementById('adminPassword').parentElement.style.display = 'none';

            // Preencher campos
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productPreviousPrice').value = product.previous_price || '';
            document.getElementById('productPlatform').value = product.platform || 'Shopee';
            document.getElementById('productCategory').value = product.category || 'outros';
            document.getElementById('productLink').value = product.link;
            document.getElementById('productImage').value = product.image;
            document.getElementById('productImage').style.display = 'block';

            // Mostrar preview da imagem
            document.getElementById('imagePreview').src = product.image;
            document.getElementById('imagePreview').style.display = 'block';

            // Mudar botão para "Atualizar"
            const submitBtn = document.querySelector('.btn-submit');
            submitBtn.innerHTML = '<i class="fas fa-save"></i> Atualizar Produto';
            submitBtn.onclick = function() { updateProduct(productId); };

            // Destacar card sendo editado
            editingProductId = productId;
            document.querySelectorAll('.product-card').forEach(card => {
                card.classList.remove('editing-mode');
            });
            document.getElementById('product-' + productId)?.classList.add('editing-mode');

            // Scroll para o modal
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Atualizar produto
        async function updateProduct(productId) {
            const name = document.getElementById('productName').value.trim();
            const price = document.getElementById('productPrice').value.trim();
            const previousPrice = document.getElementById('productPreviousPrice').value.trim();
            const link = document.getElementById('productLink').value.trim();
            const platform = document.getElementById('productPlatform').value;
            const category = document.getElementById('productCategory').value;
            const imageUrl = document.getElementById('productImage').value.trim();
            const image = uploadedImageData || imageUrl;

            if (!name || !price || !link || !image) {
                alert('⚠️ Preencha todos os campos obrigatórios!');
                return;
            }

            const updatedProduct = {
                name: name,
                price: price,
                previous_price: previousPrice || null,
                link: link,
                image: image,
                platform: platform,
                category: category
            };

            try {
                const { error } = await supabase
                    .from('products')
                    .update(updatedProduct)
                    .eq('id', productId);

                if (error) {
                    console.error('Erro ao atualizar:', error);
                    // Atualizar localmente
                    const index = allProducts.findIndex(p => p.id === productId);
                    if (index !== -1) {
                        allProducts[index] = { ...allProducts[index], ...updatedProduct };
                        saveToLocalStorage();
                    }
                    updateConnectionStatus(false);
                } else {
                    updateConnectionStatus(true);
                }

                // Recarregar produtos
                await loadProducts();

                // Limpar formulário
                resetForm();
                closeAdminModal();
                
                alert('✅ Produto atualizado com sucesso!');
            } catch (err) {
                console.error('Erro:', err);
                alert('❌ Erro ao atualizar produto!');
            }
        }

        // Deletar produto
        async function deleteProduct(productId) {
            if (!confirm('🗑️ Tem certeza que deseja deletar este produto?')) {
                return;
            }

            try {
                const { error } = await supabase
                    .from('products')
                    .delete()
                    .eq('id', productId);

                if (error) {
                    console.error('Erro ao deletar:', error);
                    // Deletar localmente
                    allProducts = allProducts.filter(p => p.id !== productId);
                    saveToLocalStorage();
                    updateConnectionStatus(false);
                } else {
                    updateConnectionStatus(true);
                }

                // Recarregar produtos
                await loadProducts();
                
                alert('✅ Produto deletado com sucesso!');
            } catch (err) {
                console.error('Erro:', err);
                // Deletar localmente como fallback
                allProducts = allProducts.filter(p => p.id !== productId);
                saveToLocalStorage();
                displayProducts();
                alert('✅ Produto deletado localmente!');
            }
        }

        // Resetar formulário
        function resetForm() {
            document.getElementById('productName').value = '';
            document.getElementById('productPrice').value = '';
            document.getElementById('productPreviousPrice').value = '';
            document.getElementById('productLink').value = '';
            document.getElementById('productImage').value = '';
            document.getElementById('imagePreview').style.display = 'none';
            uploadedImageData = null;
            editingProductId = null;

            // Restaurar botão para "Adicionar"
            const submitBtn = document.querySelector('.btn-submit');
            submitBtn.innerHTML = '<i class="fas fa-plus"></i> Adicionar Produto';
            submitBtn.onclick = addProduct;

            // Remover destaque dos cards
            document.querySelectorAll('.product-card').forEach(card => {
                card.classList.remove('editing-mode');
            });
        }
```

---

## 📍 PASSO 7: ATUALIZAR closeAdminModal()

**ONDE:** Procure a função `closeAdminModal()`

**SUBSTITUA** por:

```javascript
        function closeAdminModal() {
            document.getElementById('adminModal').style.display = 'none';
            resetForm();
        }
```

---

## ✅ RESUMO DAS MUDANÇAS:

| Local | O que fazer |
|-------|-------------|
| **SQL Supabase** | Adicionar coluna `previous_price` |
| **CSS** | Adicionar estilos dos botões e preço anterior |
| **HTML Formulário** | Adicionar campo "Preço Anterior" |
| **displayProducts()** | Adicionar botões Editar/Deletar e preço anterior |
| **addProduct()** | Incluir campo `previous_price` |
| **Final do JS** | Adicionar funções: `editProduct()`, `updateProduct()`, `deleteProduct()`, `resetForm()` |
| **closeAdminModal()** | Chamar `resetForm()` |

---

## 🎯 RESULTADO FINAL:

### **Card do Produto:**
```
┌─────────────────────┐
│ [Shopee] [📚 Livros]│
│                     │
│   [IMAGEM]          │
│                     │
│ Nome do Produto     │
│ R$ 199,90 (riscado) │ ← Preço anterior
│ R$ 89,90           │ ← Preço atual
│ [Ver Oferta]       │
│ [✏️ Editar] [🗑️ Del]│ ← Novos botões
└─────────────────────┘
```

---

## 💡 COMO USAR:

### **Editar:**
1. Clique em "✏️ Editar" no produto
2. Modal abre com campos preenchidos
3. Altere o que quiser
4. Clique em "Atualizar Produto"

### **Deletar:**
1. Clique em "🗑️ Deletar"
2. Confirme a exclusão
3. Produto é removido

### **Preço Anterior:**
1. Ao adicionar/editar produto
2. Preencha "Preço Anterior" (opcional)
3. Aparecerá riscado no card

---

## 🚨 IMPORTANTE:

- Faça backup do `index.html` atual antes de modificar
- Teste cada mudança separadamente
- Se der erro, me avise qual parte

---

**Quer que eu crie o arquivo completo já modificado? Ou prefere fazer manualmente seguindo estas instruções?**

