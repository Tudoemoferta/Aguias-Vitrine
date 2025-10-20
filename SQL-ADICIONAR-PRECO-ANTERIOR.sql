-- Adicionar coluna de preço anterior (opcional)
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS previous_price TEXT;

-- Verificar se a coluna foi adicionada
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'products'
ORDER BY ordinal_position;

