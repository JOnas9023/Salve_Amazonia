# 🐾 Pet Rescue Platform

Uma plataforma completa e responsiva dedicada ao resgate e adoção de animais domésticos em situação de rua. O sistema oferece funcionalidades abrangentes para conectar animais necessitados com famílias amorosas, além de ferramentas para denúncias, doações e gerenciamento administrativo.

## 🌟 Funcionalidades Principais

### 📊 Dashboard e Estatísticas
- Estatísticas em tempo real de animais resgatados, adotados e em processo
- Gráficos interativos com histórico mensal e anual
- Métricas de campanhas de arrecadação e doações
- Relatórios detalhados para análise de impacto

### 🗺️ Mapa Interativo
- Visualização geográfica de denúncias e casos
- Filtros por urgência, tipo de animal e status
- Geolocalização para relatórios precisos
- Clusters inteligentes para melhor visualização

### 🐕 Sistema de Adoção
- Catálogo completo de animais disponíveis
- Busca avançada por espécie, porte, idade, localização
- Formulário detalhado de candidatura à adoção
- Sistema de matching entre adotantes e animais
- Processo de aprovação com verificação domiciliar

### 📢 Sistema de Denúncias
- Formulário intuitivo para relatar casos
- Upload de fotos com geolocalização automática
- Classificação por urgência e tipo de caso
- Acompanhamento do status das denúncias
- Notificações em tempo real para voluntários

### 💰 Sistema de Doações
- Múltiplas formas de doação (única, mensal, campanhas)
- Transparência total no uso dos recursos
- Certificados de doação para dedução fiscal
- Metas de campanha com progresso visual
- Histórico completo para doadores

### 📝 Blog e Notícias
- Artigos sobre cuidados com animais
- Atualizações sobre leis de proteção animal
- Histórias de sucesso e adoções
- Dicas de veterinários e especialistas
- Sistema de comentários moderados

### 👥 Gestão de Usuários
- Perfis diferenciados (usuário, voluntário, admin)
- Sistema de autenticação segura com JWT
- Perfil personalizado com histórico de atividades
- Notificações personalizadas
- Integração com redes sociais

### ⚙️ Painel Administrativo
- Dashboard completo para gestão
- Moderação de conteúdo e denúncias
- Gerenciamento de usuários e permissões
- Relatórios detalhados e exportação
- Configurações do sistema

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Framework principal
- **Material-UI (MUI)** - Componentes e design system
- **React Router Dom** - Roteamento
- **React Query** - Gerenciamento de estado e cache
- **Leaflet** - Mapas interativos
- **Chart.js** - Gráficos e visualizações
- **Axios** - Requisições HTTP
- **Socket.io Client** - Comunicação em tempo real

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação
- **Multer** - Upload de arquivos
- **Sharp** - Processamento de imagens
- **Socket.io** - WebSocket para tempo real
- **Bcrypt** - Criptografia de senhas
- **Joi** - Validação de dados

### Segurança e Performance
- **Helmet** - Headers de segurança
- **Rate Limiting** - Proteção contra spam
- **CORS** - Controle de origem cruzada
- **Validação de entrada** - Sanitização de dados
- **Compressão de imagens** - Otimização automática
- **Cache inteligente** - Melhoria de performance

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js (v18 ou superior)
- MySQL (v8 ou superior)
- NPM ou Yarn

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/pet-rescue-platform.git
cd pet-rescue-platform
```

### 2. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=pet_rescue_db

# JWT
JWT_SECRET=sua_chave_secreta_muito_forte

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app

# Google Maps (opcional)
MAPS_API_KEY=sua_chave_google_maps

# Stripe (opcional)
STRIPE_SECRET_KEY=sua_chave_stripe
```

### 3. Configure o banco de dados
```bash
# Instale as dependências do servidor
npm install

# Execute o script de criação do banco
mysql -u root -p < database/schema.sql
```

### 4. Instale dependências do cliente
```bash
npm run install-client
```

### 5. Execute a aplicação

#### Desenvolvimento (servidor + cliente)
```bash
npm run dev
```

#### Produção
```bash
npm run build
npm start
```

## 📱 Responsividade e Acessibilidade

### Design Responsivo
- Layout adaptativo para desktop, tablet e mobile
- Breakpoints otimizados para diferentes dispositivos
- Imagens responsivas com lazy loading
- Navegação touch-friendly

### Acessibilidade
- Conformidade com WCAG 2.1
- Navegação por teclado completa
- Alto contraste para usuários com deficiência visual
- Textos alternativos em todas as imagens
- ARIA labels e roles apropriados
- Suporte a leitores de tela

## 🎨 Design System

### Paleta de Cores
- **Primary**: `#4CAF50` (Verde suave)
- **Secondary**: `#FF9800` (Laranja suave)  
- **Background**: `#FAFAFA` (Cinza muito claro)
- **Text**: `#212121` (Cinza escuro)

### Tipografia
- **Headings**: Poppins (600-700)
- **Body**: Roboto (400-500)
- Escala tipográfica responsiva
- Line-height otimizado para legibilidade

### Componentes
- Cantos arredondados (12px)
- Sombras suaves e elevation
- Animações suaves e purposeful
- Estados de hover e focus bem definidos

## 📊 Estrutura do Banco de Dados

### Tabelas Principais
- `users` - Usuários do sistema
- `animals` - Animais cadastrados
- `adoptions` - Processos de adoção
- `reports` - Denúncias e relatórios
- `donations` - Doações realizadas
- `campaigns` - Campanhas de arrecadação
- `blog_posts` - Artigos do blog
- `testimonials` - Depoimentos

### Relacionamentos
- Relacionamentos bem definidos com foreign keys
- Índices otimizados para consultas frequentes
- Triggers para atualizações automáticas
- Views para consultas complexas

## 🔐 Segurança

### Autenticação
- JWT com expiração configurável
- Refresh tokens para sessões longas
- Verificação de email obrigatória
- Reset de senha seguro

### Validação
- Validação de entrada com Joi
- Sanitização de dados
- Upload de arquivos restrito
- Rate limiting por IP

### Proteção
- Headers de segurança com Helmet
- Proteção contra XSS e CSRF
- Validação de permissões em todas as rotas
- Logs de segurança detalhados

## 📈 Performance

### Frontend
- Code splitting automático
- Lazy loading de componentes
- Otimização de imagens
- Cache inteligente com React Query

### Backend
- Pool de conexões do banco
- Compressão de respostas
- Cache de consultas frequentes
- Otimização de queries

## 🧪 Testes

### Frontend
```bash
cd client
npm test
```

### Backend
```bash
npm test
```

### E2E
```bash
npm run test:e2e
```

## 📦 Deploy

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

### Docker
```bash
docker-compose up -d
```

### Variáveis de Ambiente de Produção
- Configure `NODE_ENV=production`
- Use banco de dados dedicado
- Configure domínio para CORS
- Use HTTPS obrigatoriamente

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Guidelines
- Siga o padrão de código estabelecido
- Inclua testes para novas funcionalidades
- Documente mudanças significativas
- Teste em diferentes dispositivos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

- **Email**: contato@petrescue.com
- **Website**: https://petrescue.com
- **GitHub**: https://github.com/seu-usuario/pet-rescue-platform

## 🙏 Agradecimentos

- Comunidade open source
- Veterinários e protetores parceiros
- Voluntários que testaram a plataforma
- Famílias que adotaram através do sistema

---

**Desenvolvido com ❤️ para salvar vidas e encontrar lares amorosos para nossos amigos de quatro patas.**
