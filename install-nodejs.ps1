# Script de Instalação Automática do Node.js
# Pet Rescue Platform - Instalador Automatizado

Write-Host "🐾 Pet Rescue Platform - Instalador Node.js" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Verificar se Node.js já está instalado
Write-Host "`n🔍 Verificando se Node.js já está instalado..." -ForegroundColor Yellow

try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✅ Node.js já está instalado: $nodeVersion" -ForegroundColor Green
        Write-Host "`n🚀 Você pode pular para a instalação das dependências!" -ForegroundColor Green
        Write-Host "Execute: npm install" -ForegroundColor Cyan
        exit 0
    }
} catch {
    Write-Host "❌ Node.js não encontrado. Vamos instalar!" -ForegroundColor Red
}

# Verificar se Chocolatey está instalado (gerenciador de pacotes do Windows)
Write-Host "`n🍫 Verificando Chocolatey..." -ForegroundColor Yellow

try {
    $chocoVersion = choco --version 2>$null
    if ($chocoVersion) {
        Write-Host "✅ Chocolatey encontrado: $chocoVersion" -ForegroundColor Green
        Write-Host "`n📦 Instalando Node.js via Chocolatey..." -ForegroundColor Yellow
        
        # Instalar Node.js via Chocolatey
        Start-Process -FilePath "choco" -ArgumentList "install", "nodejs", "-y" -Wait -Verb RunAs
        
        Write-Host "✅ Node.js instalado com sucesso!" -ForegroundColor Green
        Write-Host "`n🔄 Reinicie o terminal e execute: node --version" -ForegroundColor Cyan
        exit 0
    }
} catch {
    Write-Host "❌ Chocolatey não encontrado." -ForegroundColor Yellow
}

# Verificar se winget está disponível (Windows Package Manager)
Write-Host "`n📦 Verificando Windows Package Manager (winget)..." -ForegroundColor Yellow

try {
    $wingetVersion = winget --version 2>$null
    if ($wingetVersion) {
        Write-Host "✅ winget encontrado: $wingetVersion" -ForegroundColor Green
        Write-Host "`n📦 Instalando Node.js via winget..." -ForegroundColor Yellow
        
        # Instalar Node.js via winget
        winget install OpenJS.NodeJS
        
        Write-Host "✅ Node.js instalado com sucesso!" -ForegroundColor Green
        Write-Host "`n🔄 Reinicie o terminal e execute: node --version" -ForegroundColor Cyan
        exit 0
    }
} catch {
    Write-Host "❌ winget não encontrado." -ForegroundColor Yellow
}

# Se nenhum gerenciador de pacotes foi encontrado, instruções manuais
Write-Host "`n⚠️  Nenhum gerenciador de pacotes encontrado." -ForegroundColor Yellow
Write-Host "📋 Siga estas instruções para instalação manual:" -ForegroundColor Cyan

Write-Host "`n1️⃣ OPÇÃO 1 - Download Manual (Recomendado):" -ForegroundColor Green
Write-Host "   • Abra seu navegador" -ForegroundColor White
Write-Host "   • Vá para: https://nodejs.org/" -ForegroundColor Cyan
Write-Host "   • Clique no botão verde 'LTS' (versão recomendada)" -ForegroundColor White
Write-Host "   • Execute o arquivo baixado (.msi)" -ForegroundColor White
Write-Host "   • Siga o assistente de instalação" -ForegroundColor White

Write-Host "`n2️⃣ OPÇÃO 2 - Instalar Chocolatey primeiro:" -ForegroundColor Green
Write-Host "   • Abra PowerShell como Administrador" -ForegroundColor White
Write-Host "   • Execute o comando:" -ForegroundColor White
Write-Host "     Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" -ForegroundColor Cyan
Write-Host "   • Depois execute este script novamente" -ForegroundColor White

Write-Host "`n3️⃣ OPÇÃO 3 - Link direto para download:" -ForegroundColor Green
Write-Host "   • Windows x64: https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi" -ForegroundColor Cyan

# Tentar abrir o site do Node.js automaticamente
Write-Host "`n🌐 Tentando abrir o site do Node.js automaticamente..." -ForegroundColor Yellow

try {
    Start-Process "https://nodejs.org/"
    Write-Host "✅ Site do Node.js aberto no navegador!" -ForegroundColor Green
} catch {
    Write-Host "❌ Não foi possível abrir automaticamente." -ForegroundColor Red
    Write-Host "   Abra manualmente: https://nodejs.org/" -ForegroundColor Cyan
}

Write-Host "`n🔄 Após instalar o Node.js:" -ForegroundColor Green
Write-Host "   1. Reinicie o terminal (feche e abra novamente)" -ForegroundColor White
Write-Host "   2. Execute: node --version" -ForegroundColor Cyan
Write-Host "   3. Execute: npm install" -ForegroundColor Cyan
Write-Host "   4. Execute: npm run dev" -ForegroundColor Cyan

Write-Host "`n🎉 Em seguida você terá o site completo funcionando!" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Pausa para o usuário ler as instruções
Write-Host "`nPressione qualquer tecla para continuar..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
