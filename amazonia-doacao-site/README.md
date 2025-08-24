# 🌳 AmazôniaSalva - Site de Doações para Preservação da Amazônia

Um site moderno e responsivo para plataforma de doações voltada à preservação da Amazônia, desenvolvido com foco em transparência, usabilidade e impacto visual.

## 🎯 Sobre o Projeto

O **AmazôniaSalva** é uma plataforma digital completa para:
- Captação de doações (PIX, cartão, boleto)
- Transparência total no uso dos recursos
- Geração automática de certificados digitais
- Acompanhamento em tempo real dos projetos
- Engajamento de comunidades e empresas

## 🚀 Funcionalidades Principais

### 🏠 **Homepage**
- Hero com missão destacada
- Estatísticas de impacto animadas
- Projetos em destaque
- Call-to-actions estratégicos
- Newsletter integrada

### 💰 **Sistema de Doações**
- **Pessoa Física**: Valores pré-definidos e personalizados
- **Pessoa Jurídica**: Compensação de carbono e benefícios fiscais
- **Formas de Pagamento**: PIX, Cartão (até 12x), Débito, Boleto
- **Doações Recorrentes**: Mensal ou anual
- **Calculadora de Impacto**: Mostra o resultado da doação em tempo real

### 🔍 **Transparência**
- Dashboard em tempo real
- Relatórios de auditoria
- Distribuição detalhada dos recursos
- Certificações oficiais
- Histórico de projetos

### 📱 **Blog & Campanhas**
- Sistema de posts para conscientização
- Campanhas sazonais
- Conteúdo educativo
- Integração com redes sociais

### 📞 **Contato & Suporte**
- Formulário inteligente com validação
- Links para redes sociais
- Suporte dedicado
- FAQ interativo

## 🛠 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Design responsivo com variáveis CSS e Flexbox/Grid
- **JavaScript ES6+**: Interações, validações e animações
- **Font Awesome**: Ícones profissionais
- **Google Fonts**: Tipografia moderna (Inter)

## 📁 Estrutura do Projeto

```
amazonia-doacao-site/
├── index.html                 # Homepage principal
├── doacoes-completa.html     # Página completa de doações
├── css/
│   └── style.css             # Estilos principais
├── js/
│   ├── script.js             # JavaScript principal
│   └── donation.js           # Lógica de doações
├── assets/
│   └── README.md            # Guia de imagens necessárias
└── README.md                # Este arquivo
```

## 🎨 Design System

### Paleta de Cores
- **Verde Primário**: `#1B5E20` - Amazônia, confiança
- **Verde Secundário**: `#2E7D32` - Natureza, crescimento
- **Verde Claro**: `#66BB6A` - Esperança, vida
- **Verde Sucesso**: `#4CAF50` - Conquistas, resultados

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700
- **Escalas**: 0.75rem - 3rem com sistema responsivo

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Funcionalidades Mobile-First
- Menu hamburger animado
- Cards empilháveis
- Botões touch-friendly
- Formulários otimizados
- Imagens adaptativas

## ⚡ Performance

### Otimizações Implementadas
- **Lazy Loading**: Imagens carregadas sob demanda
- **CSS Otimizado**: Variáveis, sem duplicação
- **JavaScript Modular**: Carregamento eficiente
- **Animações Performáticas**: Transform e opacity
- **Fontes Web**: Carregamento otimizado

## 🔧 Como Usar

### 1. Setup Básico
```bash
# Clone ou baixe os arquivos
# Abra index.html em um navegador moderno
```

### 2. Personalizações

#### Cores e Branding
Edite as variáveis CSS em `css/style.css`:
```css
:root {
    --primary-green: #1B5E20;    /* Sua cor primária */
    --secondary-green: #2E7D32;  /* Sua cor secundária */
    /* ... outras variáveis */
}
```

#### Conteúdo
- Substitua textos nos arquivos HTML
- Adicione suas imagens na pasta `assets/`
- Configure analytics no `js/script.js`

### 3. Integração de Pagamentos

#### PIX
```javascript
// Em js/donation.js - integrar com API do banco/gateway
function processPIXPayment(amount, email) {
    // Sua lógica de PIX aqui
}
```

#### Cartões
```javascript
// Integração com PagSeguro, MercadoPago, etc.
function processCreditCard(cardData) {
    // Sua integração aqui
}
```

### 4. Deploy

#### Hospedagem Simples (Netlify, Vercel, GitHub Pages)
```bash
# Apenas faça upload dos arquivos
# O site funcionará imediatamente
```

#### Hospedagem Tradicional
```bash
# Upload via FTP/SFTP
# Certifique-se que o servidor suporta HTTPS
```

## 🎯 Configurações Avançadas

### Google Analytics
```html
<!-- Adicionar no <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Email Marketing
```javascript
// Integração com Mailchimp, RD Station, etc.
function subscribeNewsletter(email) {
    // Sua integração aqui
}
```

### Sistema de Certificados
```javascript
// Geração automática de PDFs
function generateCertificate(donationData) {
    // Integração com jsPDF ou API externa
}
```

## 🛡 Segurança

### Implementações Incluídas
- **Validação Client-side**: Formulários validados
- **Sanitização**: Prevenção contra XSS básico
- **HTTPS Ready**: Prepared para SSL
- **Headers Seguros**: Meta tags de segurança

### Recomendações Adicionais
- Configure CSP (Content Security Policy)
- Use HTTPS obrigatório
- Implemente rate limiting no backend
- Monitore tentativas de fraude

## 📊 Analytics & Tracking

### Eventos Rastreados
```javascript
// Exemplos implementados
trackEvent('donation_click', { source: 'hero', amount: 100 });
trackEvent('newsletter_signup', { email: email });
trackEvent('certificate_generated', { donation_id: id });
```

### Métricas Sugeridas
- Taxa de conversão de doações
- Valor médio de doação
- Origem dos usuários
- Taxa de abandono no funil
- Engagement com conteúdo

## 🎨 Customização Visual

### Temas Alternativos
Para criar variações visuais:
```css
/* Tema Escuro */
.dark-theme {
    --primary-green: #66BB6A;
    --background: #121212;
    --text: #ffffff;
}

/* Tema Azul (Oceano) */
.ocean-theme {
    --primary-green: #0277BD;
    --secondary-green: #0288D1;
}
```

### Animações Customizadas
```css
@keyframes customFadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
```

## 🧪 Testes

### Testes Manuais
- [ ] Responsividade em diferentes dispositivos
- [ ] Formulários funcionando
- [ ] Links internos/externos
- [ ] Performance de carregamento
- [ ] Acessibilidade básica

### Ferramentas Recomendadas
- **Lighthouse**: Performance e SEO
- **GTMetrix**: Velocidade de carregamento
- **WAVE**: Acessibilidade
- **Responsinator**: Teste responsivo

## 🆘 Solução de Problemas

### Problemas Comuns

#### JavaScript não funciona
- Verifique console do navegador
- Confirme se todos os arquivos estão carregando
- Teste em navegador atualizado

#### CSS não carrega
- Verifique caminhos relativos
- Confirme se arquivo existe
- Limpe cache do navegador

#### Formulários não enviam
- Verifique validações JavaScript
- Confirme integração com backend
- Teste conexão com APIs

## 🔄 Atualizações Futuras

### Versão 2.0 (Planejado)
- [ ] Dashboard do doador
- [ ] App mobile nativo
- [ ] Integração blockchain
- [ ] Gamificação de doações
- [ ] Relatórios de IA

## 🤝 Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

### Padrões de Code
- Comentários em português
- Indentação com 4 espaços
- Nomes de variáveis descritivos
- CSS organizado por seções

## 📞 Suporte

### Contato
- **Email**: desenvolvimento@amazoniasalva.org
- **Discord**: Comunidade AmazôniaDev
- **GitHub Issues**: Para bugs e sugestões

### Documentação Adicional
- [Guia de Imagens](assets/README.md)
- [API de Doações](docs/api-donations.md) _(em desenvolvimento)_
- [Guia de Deploy](docs/deployment.md) _(em desenvolvimento)_

## 📜 Licença

Este projeto está licenciado sob MIT License - veja o arquivo `LICENSE.md` para detalhes.

## 🏆 Reconhecimentos

### Inspirações
- Organizações reais de preservação ambiental
- Best practices de ONGs digitais
- Design systems de empresas sustentáveis

### Recursos Utilizados
- **Unsplash**: Imagens de referência
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia
- **CSS Grid Garden**: Layout reference

---

<div align="center">

### 🌱 Feito com ❤️ para preservar a Amazônia

**"Cada linha de código pode ajudar a salvar uma árvore"**

[⭐ Star este projeto](../../stargazers) | [🐛 Reportar Bug](../../issues) | [💡 Sugerir Feature](../../issues)

</div>
