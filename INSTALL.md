# 🚀 Guia de Instalação - Pet Rescue Platform

## ✅ Pré-requisitos Necessários

### 1. Node.js (Obrigatório)
O Node.js não foi encontrado no seu sistema. Siga os passos:

1. **Baixe o Node.js:**
   - Acesse: https://nodejs.org/
   - Baixe a versão LTS (recomendada)
   - Execute o instalador e siga as instruções

2. **Verifique a instalação:**
   ```powershell
   node --version
   npm --version
   ```

### 2. MySQL (Recomendado)
Para ter todas as funcionalidades:

1. **XAMPP (Mais fácil):**
   - Baixe: https://www.apachefriends.org/
   - Instale e inicie o Apache e MySQL

2. **MySQL direto:**
   - Baixe: https://dev.mysql.com/downloads/mysql/
   - Siga as instruções de instalação

## 🛠️ Instalação do Projeto

### Passo 1: Instalar Dependências do Servidor
```powershell
# No diretório do projeto
cd C:\Users\Jonnatas\pet-rescue-platform

# Instalar dependências do backend
npm install
```

### Passo 2: Instalar Dependências do Cliente
```powershell
# Instalar dependências do frontend
cd client
npm install
cd ..
```

### Passo 3: Configurar Banco de Dados

#### Se usando XAMPP:
1. Abra http://localhost/phpmyadmin
2. Crie um banco chamado: `pet_rescue_db`
3. Importe o arquivo: `database/schema.sql`

#### Se usando MySQL direto:
```bash
mysql -u root -p -e "CREATE DATABASE pet_rescue_db"
mysql -u root -p pet_rescue_db < database/schema.sql
```

### Passo 4: Configurar Variáveis de Ambiente
```powershell
# Copiar arquivo de exemplo
copy .env.example .env

# Editar o arquivo .env com suas configurações:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=sua_senha_mysql
# DB_NAME=pet_rescue_db
# JWT_SECRET=uma_chave_secreta_qualquer
```

## 🚀 Executar o Projeto

### Modo Desenvolvimento (Recomendado)
```powershell
# Executar servidor e cliente juntos
npm run dev
```

Isso irá:
- Iniciar o servidor backend na porta 5000
- Iniciar o cliente React na porta 3000
- Abrir automaticamente no navegador

### Executar Separadamente (Opcional)
```powershell
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

## 🌐 Acessar o Site

Após executar, acesse:
- **Frontend:** http://localhost:3000
- **API Backend:** http://localhost:5000

## 🔧 Solução de Problemas

### Erro de Porta Ocupada
```powershell
# Matar processo na porta 3000
netstat -ano | findstr :3000
taskkill /PID <número_do_processo> /F

# Matar processo na porta 5000
netstat -ano | findstr :5000
taskkill /PID <número_do_processo> /F
```

### Erro de Banco de Dados
1. Verifique se o MySQL está rodando
2. Confirme usuário e senha no arquivo .env
3. Verifique se o banco `pet_rescue_db` existe

### Erro de Dependências
```powershell
# Limpar cache e reinstalar
npm cache clean --force
rm -rf node_modules
rm -rf client/node_modules
npm install
cd client && npm install
```

## ⚡ Versão Simplificada (Sem Banco)

Se quiser apenas ver a interface sem configurar banco:

1. **Edite o arquivo:** `server.js`
2. **Comente as linhas de banco de dados**
3. **Execute:** `npm run client`
4. **Acesse:** http://localhost:3000

## 📱 Funcionalidades Disponíveis

Com banco configurado:
- ✅ Sistema completo de animais
- ✅ Mapa interativo
- ✅ Sistema de denúncias  
- ✅ Blog e notícias
- ✅ Painel administrativo
- ✅ Sistema de usuários

Sem banco (apenas interface):
- ✅ Visualização das páginas
- ✅ Interface responsiva
- ✅ Navegação entre seções
- ❌ Funcionalidades dinâmicas

## 🆘 Precisa de Ajuda?

Se encontrar problemas:
1. Verifique os logs no terminal
2. Confirme se todos os pré-requisitos estão instalados
3. Execute passo a passo seguindo este guia

## 🎯 Resumo Rápido

```powershell
# 1. Instalar Node.js (https://nodejs.org/)
# 2. No terminal:
cd C:\Users\Jonnatas\pet-rescue-platform
npm install
cd client && npm install && cd ..
copy .env.example .env
# 3. Editar .env com suas configurações
# 4. Executar:
npm run dev
# 5. Abrir: http://localhost:3000
```

---

**🐾 Em poucos minutos você terá um site completo funcionando!**
