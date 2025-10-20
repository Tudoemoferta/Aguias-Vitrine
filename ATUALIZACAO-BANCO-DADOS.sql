-- ========================================
-- ATUALIZAÇÃO DO BANCO DE DADOS
-- Adicionar campos: platform e category
-- ========================================

-- IMPORTANTE: Execute este código no SQL Editor do Supabase
-- APENAS SE você já criou a tabela antes!

-- Adicionar coluna 'platform' (plataforma de origem)
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS platform TEXT DEFAULT 'Shopee';

-- Adicionar coluna 'category' (categoria do produto)
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'outros';

-- Atualizar produtos existentes (opcional)
-- Isso define valores padrão para produtos já cadastrados
UPDATE products 
SET platform = 'Shopee' 
WHERE platform IS NULL;

UPDATE products 
SET category = 'outros' 
WHERE category IS NULL;

-- Verificar se as colunas foram adicionadas
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'products'
ORDER BY ordinal_position;

-- ========================================
-- RESULTADO ESPERADO:
-- ========================================
-- Você deve ver as colunas:
-- - id
-- - name
-- - price
-- - link
-- - image
-- - platform (NOVO!)
-- - category (NOVO!)
-- - created_at
-- ========================================

