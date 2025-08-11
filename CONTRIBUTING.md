# 🤝 Guia de Contribuição - Pet Rescue Platform

Obrigado por considerar contribuir para o Pet Rescue Platform! Este documento fornece diretrizes para contribuir com o projeto.

## 🌟 Como Contribuir

### 1. Reportar Issues
- Use o template de issue apropriado
- Forneça informações detalhadas
- Inclua screenshots se aplicável
- Mencione sua versão do sistema operacional e navegador

### 2. Sugerir Melhorias
- Abra uma issue com o label "enhancement"
- Descreva claramente a funcionalidade desejada
- Explique por que seria útil para a comunidade

### 3. Contribuir com Código
1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commits das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📋 Padrões de Código

### Backend (Node.js)
- Use ESLint e Prettier
- Siga o padrão de nomenclatura camelCase
- Documente funções complexas com JSDoc
- Use async/await em vez de Promises quando possível
- Implemente tratamento de erro adequado

```javascript
/**
 * Busca animais disponíveis para adoção
 * @param {Object} filters - Filtros de busca
 * @param {number} page - Página atual
 * @param {number} limit - Itens por página
 * @returns {Promise<Object>} Lista de animais e metadados
 */
const getAvailableAnimals = async (filters, page, limit) => {
  try {
    // Implementação
  } catch (error) {
    throw new Error(`Erro ao buscar animais: ${error.message}`);
  }
};
```

### Frontend (React)
- Use componentes funcionais com hooks
- Siga a estrutura de pastas estabelecida
- Use PropTypes ou TypeScript para tipagem
- Implemente acessibilidade (ARIA labels, semantic HTML)
- Use Material-UI de forma consistente

```jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';

const AnimalCard = ({ animal, onAdopt }) => {
  // Implementação do componente
};

AnimalCard.propTypes = {
  animal: PropTypes.object.isRequired,
  onAdopt: PropTypes.func.isRequired
};

export default AnimalCard;
```

### CSS/Styling
- Use o sistema de tema do Material-UI
- Evite CSS inline quando possível
- Use classes utilitárias quando apropriado
- Mantenha responsividade em todos os dispositivos

## 🧪 Testes

### Executando Testes
```bash
# Backend
npm test

# Frontend
cd client && npm test

# E2E
npm run test:e2e
```

### Escrevendo Testes
- Escreva testes para novas funcionalidades
- Mantenha cobertura de testes acima de 80%
- Use nomes descritivos para os testes
- Organize testes em blocos describe/it

```javascript
describe('Animal Service', () => {
  describe('getAvailableAnimals', () => {
    it('should return animals with correct format', async () => {
      // Test implementation
    });
  });
});
```

## 📱 Responsividade e Acessibilidade

### Responsividade
- Teste em dispositivos móveis, tablets e desktop
- Use breakpoints do Material-UI
- Implemente navigation touch-friendly
- Otimize performance para conexões lentas

### Acessibilidade
- Siga diretrizes WCAG 2.1
- Use semantic HTML
- Implemente navegação por teclado
- Adicione alt text em imagens
- Use ARIA labels apropriados

```jsx
<Button
  aria-label="Adotar este animal"
  onClick={handleAdopt}
  startIcon={<FavoriteIcon />}
>
  Adotar
</Button>
```

## 🔐 Segurança

### Boas Práticas
- Nunca commite secrets ou credenciais
- Valide todas as entradas do usuário
- Use HTTPS em produção
- Implemente rate limiting
- Sanitize dados antes de armazenar

### Validação
```javascript
const validateAnimalData = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    species: Joi.string().valid('dog', 'cat', 'other').required(),
    age: Joi.number().min(0).max(30).required()
  });
  
  return schema.validate(data);
};
```

## 📊 Performance

### Backend
- Use índices apropriados no banco de dados
- Implemente cache quando necessário
- Otimize queries SQL
- Use paginação em listas grandes

### Frontend
- Use lazy loading para componentes
- Otimize imagens (WebP, responsive)
- Implemente virtual scrolling para listas grandes
- Use React.memo para componentes custosos

## 🐛 Debug

### Logs
```javascript
// Use níveis de log apropriados
console.log('Info: Animal criado com sucesso');
console.warn('Warning: Campo opcional vazio');
console.error('Error: Falha ao salvar no banco');
```

### Ferramentas
- React Developer Tools
- Redux DevTools
- Network tab para requisições
- Lighthouse para performance

## 📝 Documentação

### Commits
Use conventional commits:
```
feat: adiciona filtro por idade nos animais
fix: corrige erro na validação do formulário
docs: atualiza README com instruções de instalação
style: ajusta espaçamento nos cards de animais
refactor: reorganiza estrutura de pastas
test: adiciona testes para o serviço de adoção
```

### Pull Requests
- Use template de PR
- Descreva mudanças claramente
- Referencie issues relacionadas
- Inclua screenshots se aplicável

## 🚀 Deploy

### Ambiente de Desenvolvimento
```bash
npm run dev
```

### Build de Produção
```bash
npm run build
npm start
```

### Docker
```bash
docker-compose up -d
```

## 📞 Suporte

- Abra uma issue para bugs
- Use Discussions para perguntas
- Email: dev@petrescue.com
- Discord: [Link do servidor]

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a MIT License.

## 🙏 Reconhecimento

Todos os contribuidores são reconhecidos no README principal e no arquivo CONTRIBUTORS.md.

---

**Obrigado por ajudar a tornar o Pet Rescue Platform ainda melhor! 🐾**
