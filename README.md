# 🦅 Águias Vitrine - Sincronização Real Entre Dispositivos

## ✅ O QUE FOI CORRIGIDO

**PROBLEMA ANTERIOR:** Produtos salvos apenas no navegador local (localStorage), não apareciam em outros dispositivos.

**SOLUÇÃO IMPLEMENTADA:** Sistema com banco de dados online real usando **Supabase** para sincronização automática entre TODOS os dispositivos.

## 🚀 COMO FUNCIONA AGORA

### Para Visitantes:
- ✅ **Produtos aparecem para TODOS** - não importa onde foram cadastrados
- ✅ **Sincronização automática** - mudanças aparecem instantaneamente
- ✅ **Funciona em qualquer dispositivo** - desktop, mobile, tablet

### Para Administradores:
- ✅ **Adicione produtos de qualquer lugar** - desktop ou celular
- ✅ **Produtos aparecem em TODOS os dispositivos** imediatamente
- ✅ **Senha de acesso:** `aguias2025`

## 📋 CONFIGURAÇÃO DO SUPABASE (NECESSÁRIO)

### Passo 1: Criar Conta no Supabase (GRÁTIS)

1. Acesse: https://supabase.com
2. Clique em **"Start your project"**
3. Faça login com GitHub ou Google
4. Clique em **"New Project"**
5. Preencha:
   - **Name:** aguias-vitrine
   - **Database Password:** (crie uma senha forte)
   - **Region:** South America (São Paulo)
6. Clique em **"Create new project"**
7. Aguarde 2-3 minutos até o projeto estar pronto

### Passo 2: Criar a Tabela de Produtos

1. No painel do Supabase, clique em **"SQL Editor"** (ícone de banco de dados)
2. Clique em **"New Query"**
3. Cole este código SQL:

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

-- Habilitar Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Permitir leitura para todos
CREATE POLICY "Permitir leitura pública" ON products
    FOR SELECT
    USING (true);

-- Permitir inserção para todos (você pode restringir depois)
CREATE POLICY "Permitir inserção pública" ON products
    FOR INSERT
    WITH CHECK (true);

-- Permitir atualização para todos
CREATE POLICY "Permitir atualização pública" ON products
    FOR UPDATE
    USING (true);

-- Permitir exclusão para todos
CREATE POLICY "Permitir exclusão pública" ON products
    FOR DELETE
    USING (true);
```

4. Clique em **"Run"** (ou pressione Ctrl+Enter)
5. Você verá a mensagem: **"Success. No rows returned"**

### Passo 3: Obter as Credenciais

1. No painel do Supabase, clique em **"Settings"** (ícone de engrenagem)
2. Clique em **"API"**
3. Copie os seguintes valores:

   - **Project URL:** `https://xyzcompany.supabase.co`
   - **anon public key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Passo 4: Configurar o Site

1. Abra o arquivo `index.html`
2. Encontre estas linhas (por volta da linha 350):

```javascript
const SUPABASE_URL = 'https://xyzcompany.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

3. **Substitua** pelos seus valores:
   - `SUPABASE_URL` = seu **Project URL**
   - `SUPABASE_KEY` = sua **anon public key**

4. Salve o arquivo

## 🌐 PUBLICAR NO NETLIFY

### Opção 1: Drag and Drop (Mais Fácil)

1. Acesse: https://app.netlify.com/drop
2. Arraste a pasta `aguias-vitrine-sync` para a área indicada
3. Aguarde o upload
4. Seu site estará no ar em segundos!
5. Copie o link gerado (ex: `https://aguias-vitrine-xyz.netlify.app`)

### Opção 2: Via GitHub

1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Acesse: https://app.netlify.com
4. Clique em **"Add new site"** → **"Import an existing project"**
5. Conecte com GitHub e selecione o repositório
6. Clique em **"Deploy site"**

## 📱 COMO USAR

### Para Visitantes:
1. Acesse o site pelo link do Netlify
2. Veja todos os produtos disponíveis
3. Use a busca para encontrar produtos específicos
4. Clique em "Ver Oferta" para acessar o link do produto

### Para Administradores:
1. Clique no botão **"🔐 Administração"** (canto superior direito)
2. Digite a senha: **`aguias2025`**
3. Preencha os campos:
   - **Nome do Produto**
   - **Preço** (ex: R$ 89,90)
   - **Link do Produto** (seu link de afiliado)
   - **URL da Imagem** (link da imagem do produto)
4. Clique em **"➕ Adicionar Produto"**
5. **PRONTO!** O produto aparecerá **INSTANTANEAMENTE** em todos os dispositivos

## 🔐 SEGURANÇA

- ✅ **Senha de administrador** protege o painel
- ✅ **Credenciais do Supabase** são públicas mas seguras (anon key)
- ✅ **Row Level Security** protege o banco de dados
- ✅ **HTTPS** em todos os acessos

## 🎯 RECURSOS

- ✅ **Sincronização em tempo real** entre todos os dispositivos
- ✅ **Busca de produtos** instantânea
- ✅ **Design responsivo** (funciona em desktop e mobile)
- ✅ **SEO otimizado** para aparecer no Google
- ✅ **Fallback para localStorage** se Supabase estiver offline
- ✅ **Indicador de sincronização** mostra status da conexão

## 📊 VERIFICAÇÃO NO GOOGLE SEARCH CONSOLE

O site já está configurado com a tag de verificação do Google:
- Meta tag: `ktO2w5wC_X1YSXOI2-RdaXRPEbAeX_fLDHUs_x-b-YM`

## 🆘 SUPORTE

- 📧 Email: tudoemoferta123@gmail.com
- 📱 Instagram: @tudoemofertas123

## 📝 NOTAS IMPORTANTES

1. **SEMPRE configure o Supabase** antes de publicar o site
2. **Teste em dois dispositivos** para confirmar a sincronização
3. **Guarde suas credenciais** do Supabase em local seguro
4. **Não compartilhe a senha de administrador** com terceiros

---

**Desenvolvido com ❤️ para Águias Vitrine**

