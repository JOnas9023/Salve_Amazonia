@echo off
chcp 65001
cls

echo.
echo ████████████████████████████████████████████████████
echo ███                                              ███
echo ███    🚀 PUBLICAR NO GITHUB                    ███ 
echo ███    Pet Rescue Platform                      ███
echo ███                                              ███
echo ████████████████████████████████████████████████████
echo.

echo ✅ Git configurado e arquivos prontos!
echo 📁 Commit realizado com sucesso!
echo.

echo 📋 PRÓXIMOS PASSOS:
echo.
echo 1. 🌐 Criar conta no GitHub (se não tiver)
echo    https://github.com
echo.
echo 2. ➕ Criar novo repositório:
echo    • Nome: pet-rescue-platform  
echo    • Público ✅
echo    • README.md ✅
echo    • .gitignore: Node ✅
echo    • Licença: MIT ✅
echo.
echo 3. 🔗 Conectar e enviar:
echo    git remote add origin https://github.com/SEU-USUARIO/pet-rescue-platform.git
echo    git push -u origin main
echo.
echo 4. ⚙️ Ativar GitHub Pages:
echo    Settings → Pages → Deploy from branch → main → / (root)
echo.
echo 5. 🎉 Acessar seu site:
echo    https://SEU-USUARIO.github.io/pet-rescue-platform/
echo.

echo 🌐 Abrindo GitHub para você...
start https://github.com/new

echo.
echo 📖 Abrir guia detalhado? (s/n)
set /p guia="Digite s para abrir o guia: "

if /i "%guia%"=="s" (
    echo.
    echo 📋 Abrindo guia GITHUB_SETUP.md...
    start GITHUB_SETUP.md
)

echo.
echo 📂 Ver status dos arquivos?
set /p status="Digite s para ver status: "

if /i "%status%"=="s" (
    echo.
    echo 📊 Status do Git:
    git status
    echo.
    echo 📝 Último commit:
    git log --oneline -1
)

echo.
echo 🎯 COMANDOS IMPORTANTES:
echo.
echo Conectar ao GitHub:
echo git remote add origin https://github.com/SEU-USUARIO/pet-rescue-platform.git
echo.
echo Enviar arquivos:
echo git push -u origin main
echo.
echo Atualizar depois:
echo git add .
echo git commit -m "Atualização"
echo git push
echo.

echo ⭐ LEMBRE-SE:
echo • Substitua SEU-USUARIO pelo seu nome do GitHub
echo • Aguarde 5-10 minutos após ativar Pages
echo • Teste em dispositivos móveis
echo • Compartilhe o link!
echo.

echo 🐾 Em breve seu site estará salvando vidas na internet!
echo.
pause
