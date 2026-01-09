# Cupom Prime

Comparador de preços inteligente para e-commerce brasileiro.

## 🚀 Sobre o Projeto

Cupom Prime é um MVP de comparador de preços que monitora produtos em 3 grandes e-commerces brasileiros:
- Amazon Brasil
- Mercado Livre  
- Magazine Luiza

### Diferenciais

- **Transparência Total**: Cada preço exibe data e hora exata da coleta
- **Análise Contextual**: Percentuais de variação vs média 90d, menor histórico e última coleta
- **Histórico Completo**: Gráficos interativos com até 1 ano de dados
- **Status Inteligente**: Classificação automática (Excelente/Bom/Neutro/Caro)
- **Alertas de Preço**: Notificações por email ou WhatsApp quando o preço atingir seu alvo

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Gráficos**: Recharts
- **Data Fetching**: TanStack Query (React Query)
- **Formatação**: Intl API (BRL, pt-BR)

## 📦 Instalação

```powershell
# Instalar dependências
npm install

# Copiar arquivo de ambiente
copy .env.local.example .env.local

# Rodar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL base da API n8n (opcional - usa mock data se não definido)
NEXT_PUBLIC_API_BASE_URL=https://sua-api.com/api

# Senha do admin (opcional - apenas para demo)
NEXT_PUBLIC_ADMIN_PASSWORD=sua_senha_aqui
```

### Modo Mock (Padrão)

Por padrão, o projeto usa dados mockados. Isso permite testar todas as funcionalidades sem precisar de uma API backend.

Para conectar a uma API real, basta definir `NEXT_PUBLIC_API_BASE_URL` no `.env.local`.

## 📁 Estrutura do Projeto

```
CupomPrime/
├── app/                      # Páginas Next.js (App Router)
│   ├── page.tsx             # Home
│   ├── buscar/              # Busca
│   ├── produto/[id]/        # Detalhe do produto
│   └── como-funciona/       # Página institucional
├── components/              # Componentes React
│   ├── header.tsx
│   ├── footer.tsx
│   ├── search-bar.tsx
│   ├── product-card.tsx
│   ├── offer-card.tsx
│   ├── price-history-chart.tsx
│   ├── filters.tsx
│   ├── sort-select.tsx
│   ├── alert-form.tsx
│   └── ...
├── lib/                     # Utilitários e lógica
│   ├── api.ts              # Cliente API
│   ├── mock-data.ts        # Dados mockados
│   ├── utils.ts            # Formatação e helpers
│   ├── analytics.ts        # Tracking de eventos
│   └── local-storage.ts    # Persistência local
└── types/                   # Tipos TypeScript
    └── index.ts
```

## 🎯 Funcionalidades

### ✅ Implementado

- [x] Busca de produtos
- [x] Listagem com filtros (loja, status, queda recente)
- [x] Ordenação (relevância, menor preço, maior queda, melhor status)
- [x] Detalhe do produto com análise completa
- [x] Gráfico de histórico de preços (7d, 30d, 90d, 180d, 365d)
- [x] Comparação entre lojas
- [x] Formulário de alertas de preço
- [x] Produtos similares
- [x] Monitorados recentemente (localStorage)
- [x] Destaques de hoje
- [x] SEO e metadata dinâmica
- [x] Responsividade mobile-first
- [x] Toast notifications
- [x] Dark mode (suporte via Tailwind)

### 📋 Contratos de API

O projeto está preparado para consumir uma API REST com os seguintes endpoints:

#### GET /search?q={query}
Busca produtos por termo

#### GET /product/{id}
Detalhes completos de um produto

#### POST /alerts
Cria um alerta de preço

#### POST /refresh/{id} (opcional)
Força atualização de um produto

Veja `types/index.ts` para os contratos completos.

## 🎨 Design - Puro Suco Indie

**Estética "Puro Suco Indie"**: branco sólido, traços imperfeitos, cor apenas como informação.

### Princípios Visuais

- **Fundo Branco Sólido**: `#FFFFFF` — branco é "matéria", não transparência
- **Traços Imperfeitos**: Bordas com jitter controlado via SVG (componentes `SketchFrame` e `SketchDivider`)
- **Cor como Informação**: Verde/azul/vermelho apenas para status (EXCELENTE/BOM/CARO), nunca como enfeite
- **Tipografia Simples**: System font + mono para números e valores
- **Zero Enfeites**: Proibido gradients, glassmorphism, blur, neon, sombras realistas

### Componentes Sketch

- `SketchFrame`: Wrapper com borda SVG imperfeita
- `SketchDivider`: Linha horizontal "torta"
- `Button`, `Input`, `Card`: Todos com bordas sketch

### Transparência Radical

- Todo preço exibe "Coletado em DD/MM/AAAA às HH:mm"
- Δ% vs média 90d, menor histórico, última coleta sempre visível
- Sem linguagem de promessa, apenas dados

### Acessibilidade

- Contraste preto no branco
- Navegação por teclado
- ARIA labels
- Mobile-first responsive

## 📊 Analytics

O projeto inclui um wrapper de analytics (`lib/analytics.ts`) que atualmente apenas loga eventos no console.

Para integrar com GA4, Meta Pixel ou outras plataformas, basta modificar a função `trackEvent`.

## 🔗 Links de Afiliados

Todos os links de compra:
- Abrem em nova aba
- Incluem `rel="nofollow sponsored noopener noreferrer"`
- Disparam evento de tracking ao serem clicados

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm run build
vercel --prod
```

### Outras Plataformas

O projeto é um Next.js padrão e pode ser deployado em qualquer plataforma que suporte Node.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Railway
- Render

## 📝 Licença

Este é um projeto MVP para demonstração.

## 🤝 Contribuindo

Este é um projeto MVP. Para melhorias:

1. Adicionar testes unitários (Jest + React Testing Library)
2. Implementar backend real (n8n ou custom)
3. Adicionar mais e-commerces
4. Implementar notificações reais de alertas
5. Adicionar página de admin com autenticação real
6. Implementar rate limiting e cache
7. Adicionar PWA support

---

**Cupom Prime** - Compare preços com inteligência 🎯
