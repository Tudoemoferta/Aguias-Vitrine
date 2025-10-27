# 🎯 GUIA COMPLETO - Configuração do Supabase para Águias Vitrine

## 📋 VISÃO GERAL

Este guia vai te ajudar a configurar o Supabase para que seus produtos apareçam em **TODOS os dispositivos** automaticamente.

**Tempo estimado:** 5-7 minutos  
**Custo:** GRÁTIS (plano gratuito do Supabase)

---

## 🚀 PASSO 1: CRIAR CONTA NO SUPABASE

### 1.1 Acessar o Site
1. Abra: **https://supabase.com**
2. Clique em **"Start your project"** (botão verde no topo)

### 1.2 Fazer Login
Escolha uma opção:
- **GitHub** (recomendado se você já tem conta)
- **Google** (mais rápido)
- **Email** (se preferir)

### 1.3 Autorizar
- Se escolheu GitHub/Google, autorize o acesso
- Você será redirecionado para o painel do Supabase

---

## 🏗️ PASSO 2: CRIAR NOVO PROJETO

### 2.1 No Painel do Supabase
1. Você verá a tela inicial (pode estar vazia se é sua primeira vez)
2. Clique em **"New Project"** ou **"Create a new project"**

### 2.2 Escolher Organização
- Se for sua primeira vez, clique em **"Create a new organization"**
- Nome da organização: `aguias-vitrine` (ou qualquer nome)
- Clique em **"Create organization"**

### 2.3 Configurar o Projeto
Preencha os campos:

**Name (Nome do projeto):**
```
aguias-vitrine
```

**Database Password (Senha do banco de dados):**
- Clique em **"Generate a password"** (gerar senha automática)
- OU crie uma senha forte (mínimo 8 caracteres)
- **⚠️ IMPORTANTE:** Copie e guarde essa senha em local seguro!

**Region (Região):**
- Escolha: **South America (São Paulo)** 
- (Isso deixa o site mais rápido para usuários brasileiros)

**Pricing Plan (Plano de preços):**
- Deixe selecionado: **Free** (Grátis)
- O plano gratuito é suficiente para começar

### 2.4 Criar Projeto
1. Clique em **"Create new project"**
2. ⏳ Aguarde 2-3 minutos enquanto o projeto é criado
3. Você verá uma barra de progresso
4. Quando terminar, você será levado ao painel do projeto

---

## 📊 PASSO 3: CRIAR A TABELA DE PRODUTOS

### 3.1 Abrir SQL Editor
1. No menu lateral esquerdo, procure por **"SQL Editor"**
2. Clique em **"SQL Editor"**
3. Você verá uma área para escrever código SQL

### 3.2 Criar Nova Query
1. Clique em **"New Query"** (botão no topo)
2. Uma área de texto em branco aparecerá

### 3.3 Copiar e Colar o Código SQL

**COPIE TODO ESTE CÓDIGO:**

```sql
-- Criar tabela de produtos
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    link TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security (Segurança)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Permitir que qualquer pessoa possa LER os produtos
CREATE POLICY "Permitir leitura pública" ON products
    FOR SELECT
    USING (true);

-- Permitir que qualquer pessoa possa ADICIONAR produtos
CREATE POLICY "Permitir inserção pública" ON products
    FOR INSERT
    WITH CHECK (true);

-- Permitir que qualquer pessoa possa ATUALIZAR produtos
CREATE POLICY "Permitir atualização pública" ON products
    FOR UPDATE
    USING (true);

-- Permitir que qualquer pessoa possa DELETAR produtos
CREATE POLICY "Permitir exclusão pública" ON products
    FOR DELETE
    USING (true);
```

### 3.4 Executar o Código
1. **Cole** todo o código acima na área de texto
2. Clique em **"Run"** (botão verde) ou pressione **Ctrl+Enter**
3. Você verá a mensagem: **"Success. No rows returned"**
4. ✅ Pronto! A tabela foi criada!

---

## 🔑 PASSO 4: OBTER AS CREDENCIAIS

### 4.1 Acessar Configurações
1. No menu lateral esquerdo, clique em **"Settings"** (ícone de engrenagem ⚙️)
2. Clique em **"API"**

### 4.2 Copiar Project URL
1. Procure por **"Project URL"**
2. Você verá algo como: `https://xyzcompany.supabase.co`
3. Clique no ícone de **copiar** ao lado
4. **Cole em um bloco de notas** para guardar

**Exemplo:**
```
https://abcdefghijk.supabase.co
```

### 4.3 Copiar anon public Key
1. Role a página para baixo
2. Procure por **"Project API keys"**
3. Encontre **"anon public"**
4. Você verá uma chave longa começando com `eyJ...`
5. Clique no ícone de **copiar** ao lado
6. **Cole no bloco de notas** para guardar

**Exemplo:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3NjU0MzIsImV4cCI6MjAxNDM0MTQzMn0.exemplo_de_assinatura
```

---

## 💻 PASSO 5: CONFIGURAR O SITE

### 5.1 Abrir o Arquivo index.html
1. Abra a pasta `aguias-vitrine-sync`
2. Abra o arquivo `index.html` em um editor de texto
   - Pode usar: Notepad++, VS Code, Sublime Text, ou até o Bloco de Notas

### 5.2 Encontrar as Linhas de Configuração
1. Pressione **Ctrl+F** para buscar
2. Procure por: `SUPABASE_URL`
3. Você encontrará estas linhas (por volta da linha 350):

```javascript
const SUPABASE_URL = 'https://xyzcompany.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### 5.3 Substituir pelos Seus Valores

**ANTES:**
```javascript
const SUPABASE_URL = 'https://xyzcompany.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjE2MTYxNiwiZXhwIjoxOTMxNzM3NjE2fQ.example';
```

**DEPOIS (com seus valores):**
```javascript
const SUPABASE_URL = 'https://abcdefghijk.supabase.co';  // ← Cole seu Project URL aqui
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3NjU0MzIsImV4cCI6MjAxNDM0MTQzMn0.exemplo_de_assinatura';  // ← Cole sua anon public key aqui
```

### 5.4 Salvar o Arquivo
1. Pressione **Ctrl+S** para salvar
2. Feche o editor

---

## 🌐 PASSO 6: PUBLICAR NO NETLIFY

### Opção A: Drag and Drop (Mais Fácil)

1. Acesse: **https://app.netlify.com/drop**
2. Se não tiver conta, crie uma (grátis, pode usar GitHub/Google)
3. **Arraste a pasta** `aguias-vitrine-sync` para a área indicada
4. ⏳ Aguarde o upload (30 segundos a 1 minuto)
5. ✅ Pronto! Copie o link gerado

**Exemplo de link:**
```
https://aguias-vitrine-xyz123.netlify.app
```

### Opção B: Via GitHub (Mais Profissional)

1. Crie um repositório no GitHub
2. Faça upload dos arquivos da pasta `aguias-vitrine-sync`
3. Acesse: **https://app.netlify.com**
4. Clique em **"Add new site"** → **"Import an existing project"**
5. Conecte com GitHub
6. Selecione o repositório
7. Clique em **"Deploy site"**

---

## ✅ PASSO 7: TESTAR A SINCRONIZAÇÃO

### 7.1 Teste no Desktop
1. Abra o link do Netlify no navegador do desktop
2. Clique em **"🔐 Administração"**
3. Digite a senha: `aguias2025`
4. Adicione um produto de teste:
   - Nome: `Produto Teste Desktop`
   - Preço: `R$ 99,90`
   - Link: `https://exemplo.com`
   - Imagem: `https://cf.shopee.com.br/file/br-11134207-7r98o-lxvks8lzh2jn54`
5. Clique em **"➕ Adicionar Produto"**

### 7.2 Teste no Celular
1. Abra o **MESMO LINK** no celular
2. **O produto deve aparecer automaticamente!** 🎉
3. Você também pode adicionar produtos pelo celular

### 7.3 Verificar Sincronização em Tempo Real
1. Deixe o site aberto no desktop E no celular
2. Adicione um produto em um dos dispositivos
3. O produto deve aparecer **INSTANTANEAMENTE** no outro dispositivo!

---

## 🎯 VERIFICAÇÕES FINAIS

### ✅ Checklist de Sucesso:

- [ ] Conta no Supabase criada
- [ ] Projeto criado com sucesso
- [ ] Tabela `products` criada no banco de dados
- [ ] Credenciais (URL e Key) copiadas
- [ ] Arquivo `index.html` atualizado com as credenciais
- [ ] Site publicado no Netlify
- [ ] Produto de teste adicionado
- [ ] Produto aparece em múltiplos dispositivos

---

## 🆘 PROBLEMAS COMUNS

### Problema: "Produtos não aparecem"
**Solução:**
1. Verifique se copiou as credenciais corretamente
2. Abra o Console do navegador (F12)
3. Veja se há erros em vermelho
4. Confirme que a tabela foi criada no Supabase

### Problema: "Erro de conexão com Supabase"
**Solução:**
1. Verifique sua conexão com a internet
2. Confirme que o projeto do Supabase está ativo
3. Tente recarregar a página

### Problema: "Senha do admin não funciona"
**Solução:**
- A senha padrão é: `aguias2025`
- Verifique se não há espaços antes ou depois

---

## 📱 CONTATO E SUPORTE

- 📧 Email: tudoemoferta123@gmail.com
- 📱 Instagram: @tudoemofertas123

---

## 🎉 PARABÉNS!

Agora você tem um site profissional com sincronização REAL entre todos os dispositivos!

**Recursos ativos:**
- ✅ Banco de dados online
- ✅ Sincronização automática
- ✅ Produtos aparecem para TODOS
- ✅ Funciona em qualquer dispositivo
- ✅ SEO otimizado para Google
- ✅ Design profissional

---

**🦅 Águias Vitrine - Agora com sincronização real entre dispositivos!**

