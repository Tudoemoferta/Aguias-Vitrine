# 🚀 GUIA RÁPIDO - Configuração em 5 Minutos

## ⚡ CONFIGURAÇÃO SUPER RÁPIDA

### 1️⃣ CRIAR CONTA NO SUPABASE (2 minutos)

1. Acesse: **https://supabase.com**
2. Clique em **"Start your project"**
3. Faça login com **Google** ou **GitHub**
4. Clique em **"New Project"**
5. Preencha:
   - Nome: `aguias-vitrine`
   - Senha: (crie uma senha qualquer)
   - Região: **South America (São Paulo)**
6. Clique em **"Create new project"**
7. ⏳ Aguarde 2-3 minutos

---

### 2️⃣ CRIAR TABELA (1 minuto)

1. No Supabase, clique em **"SQL Editor"** (ícone 📊)
2. Clique em **"New Query"**
3. **Cole este código:**

```sql
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    link TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir tudo" ON products FOR ALL USING (true) WITH CHECK (true);
```

4. Clique em **"Run"** ▶️
5. ✅ Pronto!

---

### 3️⃣ COPIAR CREDENCIAIS (30 segundos)

1. Clique em **"Settings"** ⚙️ (no menu lateral)
2. Clique em **"API"**
3. Copie:
   - **Project URL** (ex: `https://abc123.supabase.co`)
   - **anon public** (chave longa começando com `eyJ...`)

---

### 4️⃣ CONFIGURAR O SITE (30 segundos)

1. Abra o arquivo **`index.html`**
2. Procure por (linha ~350):

```javascript
const SUPABASE_URL = 'https://xyzcompany.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

3. **Substitua** pelos valores que você copiou:
   - Cole seu **Project URL** no lugar de `https://xyzcompany.supabase.co`
   - Cole sua **anon public** no lugar da chave

4. **Salve** o arquivo

---

### 5️⃣ PUBLICAR NO NETLIFY (1 minuto)

**Opção Mais Fácil - Drag and Drop:**

1. Acesse: **https://app.netlify.com/drop**
2. **Arraste a pasta** `aguias-vitrine-sync` para a tela
3. ⏳ Aguarde o upload
4. ✅ **PRONTO!** Copie o link gerado

**OU via GitHub:**

1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Acesse: **https://app.netlify.com**
4. Clique em **"Add new site"** → **"Import an existing project"**
5. Conecte com GitHub
6. Selecione o repositório
7. Clique em **"Deploy site"**

---

## ✅ TESTAR A SINCRONIZAÇÃO

### No Desktop:
1. Abra o site no navegador
2. Clique em **"🔐 Administração"**
3. Digite a senha: **`aguias2025`**
4. Adicione um produto de teste

### No Celular:
1. Abra o mesmo link no celular
2. **O produto deve aparecer automaticamente!** 🎉

---

## 🎯 PRONTO PARA USAR!

Agora você tem:
- ✅ Site funcionando
- ✅ Sincronização entre dispositivos
- ✅ Produtos aparecem para todos
- ✅ Painel de administração seguro

---

## 🆘 PROBLEMAS?

### Produtos não aparecem?
1. Verifique se copiou as credenciais corretas
2. Abra o Console do navegador (F12) e veja se há erros
3. Confirme que a tabela foi criada no Supabase

### Erro de conexão?
1. Verifique sua internet
2. Confirme que o projeto do Supabase está ativo
3. Tente recarregar a página

---

## 📱 CONTATO

- 📧 tudoemoferta123@gmail.com
- 📱 Instagram: @tudoemofertas123

---

**🦅 Águias Vitrine - Agora com sincronização REAL!**

