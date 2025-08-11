@echo off
echo 🐾 Pet Rescue Platform - Iniciando Site Completo
echo ================================================

REM Adicionar Node.js ao PATH temporariamente
set PATH=%PATH%;C:\Program Files\nodejs

echo.
echo ✅ Node.js configurado temporariamente
echo 📦 Versão do Node.js:
node --version

echo.
echo 📋 Instalando dependências do servidor...
npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao instalar dependências do servidor
    pause
    exit /b 1
)

echo.
echo 📋 Instalando dependências do cliente...
cd client
npm install
cd ..

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao instalar dependências do cliente
    pause
    exit /b 1
)

echo.
echo 🔧 Configurando arquivo .env...
if not exist .env (
    copy .env.example .env
    echo ✅ Arquivo .env criado
) else (
    echo ℹ️  Arquivo .env já existe
)

echo.
echo 🚀 Iniciando o servidor de desenvolvimento...
echo.
echo 📍 URLs do site:
echo    Frontend: http://localhost:3000
echo    API Backend: http://localhost:5000
echo.
echo ⚠️  Para parar o servidor, pressione Ctrl+C
echo.

REM Iniciar o site em modo desenvolvimento
npm run dev

pause
