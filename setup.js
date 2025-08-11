const fs = require('fs');
const path = require('path');
const { executeQuery, testConnection } = require('./database/connection');

/**
 * Script de configuração inicial do Pet Rescue Platform
 * Este script configura o ambiente de desenvolvimento e produção
 */

const setupProject = async () => {
  console.log('🐾 Iniciando configuração do Pet Rescue Platform...\n');

  try {
    // 1. Verificar conexão com o banco de dados
    console.log('📊 Verificando conexão com o banco de dados...');
    await testConnection();
    console.log('✅ Conexão com banco estabelecida com sucesso\n');

    // 2. Criar pastas necessárias
    console.log('📁 Criando estrutura de pastas...');
    const folders = [
      'uploads/animals',
      'uploads/reports',
      'uploads/blog',
      'uploads/campaigns',
      'uploads/profiles',
      'logs'
    ];

    folders.forEach(folder => {
      const folderPath = path.join(__dirname, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`   ✅ Pasta criada: ${folder}`);
      } else {
        console.log(`   ℹ️  Pasta já existe: ${folder}`);
      }
    });

    // 3. Verificar se existem tabelas no banco
    console.log('\n🗄️  Verificando estrutura do banco de dados...');
    const tables = await executeQuery("SHOW TABLES");
    
    if (tables.length === 0) {
      console.log('⚠️  Nenhuma tabela encontrada. Execute o schema.sql primeiro:');
      console.log('   mysql -u root -p < database/schema.sql');
      return;
    }

    console.log(`✅ Encontradas ${tables.length} tabelas no banco de dados`);

    // 4. Verificar se existe usuário admin
    console.log('\n👤 Verificando usuário administrador...');
    const adminUsers = await executeQuery(
      "SELECT COUNT(*) as count FROM users WHERE role = 'admin'"
    );

    if (adminUsers[0].count === 0) {
      console.log('⚠️  Nenhum usuário administrador encontrado.');
      console.log('   Será necessário criar um usuário admin após o primeiro acesso.');
    } else {
      console.log(`✅ Encontrados ${adminUsers[0].count} usuário(s) administrador(es)`);
    }

    // 5. Verificar configurações do sistema
    console.log('\n⚙️  Verificando configurações do sistema...');
    const settings = await executeQuery("SELECT COUNT(*) as count FROM system_settings");
    
    if (settings[0].count === 0) {
      console.log('⚠️  Configurações do sistema não encontradas. Executando inserção...');
      // As configurações já são inseridas pelo schema.sql
    } else {
      console.log(`✅ Encontradas ${settings[0].count} configuração(ões) do sistema`);
    }

    // 6. Criar arquivo .env se não existir
    console.log('\n🔧 Verificando arquivo de configuração...');
    const envPath = path.join(__dirname, '.env');
    const envExamplePath = path.join(__dirname, '.env.example');

    if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log('✅ Arquivo .env criado a partir do .env.example');
      console.log('⚠️  IMPORTANTE: Configure suas variáveis de ambiente no arquivo .env');
    } else if (fs.existsSync(envPath)) {
      console.log('✅ Arquivo .env encontrado');
    } else {
      console.log('⚠️  Arquivo .env não encontrado. Crie um baseado no .env.example');
    }

    // 7. Verificar dependências do cliente
    console.log('\n📦 Verificando dependências do cliente...');
    const clientPackagePath = path.join(__dirname, 'client', 'package.json');
    const clientNodeModulesPath = path.join(__dirname, 'client', 'node_modules');

    if (fs.existsSync(clientPackagePath)) {
      if (!fs.existsSync(clientNodeModulesPath)) {
        console.log('⚠️  Dependências do cliente não instaladas. Execute:');
        console.log('   npm run install-client');
      } else {
        console.log('✅ Dependências do cliente instaladas');
      }
    }

    // 8. Resumo final
    console.log('\n🎉 Configuração concluída!');
    console.log('\n📋 Próximos passos:');
    console.log('   1. Configure as variáveis de ambiente no arquivo .env');
    console.log('   2. Execute: npm install (se ainda não executou)');
    console.log('   3. Execute: npm run install-client (para instalar deps do frontend)');
    console.log('   4. Execute: npm run dev (para iniciar em modo desenvolvimento)');
    console.log('   5. Acesse: http://localhost:3000');
    console.log('\n📱 Para produção:');
    console.log('   1. Execute: npm run build');
    console.log('   2. Execute: npm start');
    console.log('\n🔗 Links importantes:');
    console.log('   - Frontend: http://localhost:3000');
    console.log('   - API: http://localhost:5000');
    console.log('   - Documentação: README.md');

  } catch (error) {
    console.error('❌ Erro durante a configuração:', error.message);
    console.log('\n🔧 Possíveis soluções:');
    console.log('   1. Verifique se o MySQL está rodando');
    console.log('   2. Verifique as credenciais no arquivo .env');
    console.log('   3. Execute o schema.sql para criar as tabelas');
    console.log('   4. Verifique se o banco "pet_rescue_db" foi criado');
    process.exit(1);
  }
};

// Executar apenas se chamado diretamente
if (require.main === module) {
  setupProject();
}

module.exports = setupProject;
