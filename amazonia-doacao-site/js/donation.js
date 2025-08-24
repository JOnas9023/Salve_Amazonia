// ===== SISTEMA DE DOAÇÕES - AMAZÔNIA SALVA =====
// Lógica específica para processo de doação e pagamentos

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Sistema de doações carregado');
    
    initDonationFlow();
    initPaymentMethods();
    initCorporateForm();
    initImpactCalculator();
});

// === FLUXO DE DOAÇÃO MULTI-STEP ===
function initDonationFlow() {
    const steps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    let currentStep = 1;
    
    // Navegação entre steps
    nextButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (validateCurrentStep(currentStep)) {
                goToNextStep();
            }
        });
    });
    
    prevButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            goToPrevStep();
        });
    });
    
    function goToNextStep() {
        if (currentStep < steps.length) {
            steps[currentStep - 1].classList.remove('active');
            currentStep++;
            steps[currentStep - 1].classList.add('active');
            updateProgressBar();
            updateSummary();
        }
    }
    
    function goToPrevStep() {
        if (currentStep > 1) {
            steps[currentStep - 1].classList.remove('active');
            currentStep--;
            steps[currentStep - 1].classList.add('active');
            updateProgressBar();
        }
    }
    
    function updateProgressBar() {
        const progressBar = document.querySelector('.donation-progress');
        if (progressBar) {
            const progress = (currentStep / steps.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }
}

// === VALIDAÇÃO DE STEPS ===
function validateCurrentStep(step) {
    const currentStepElement = document.querySelector(`[data-step="${step}"]`);
    
    switch(step) {
        case 1: // Valor da doação
            return validateAmount();
        case 2: // Dados pessoais
            return validatePersonalData();
        case 3: // Forma de pagamento
            return validatePaymentMethod();
        case 4: // Revisão
            return validateTerms();
        default:
            return true;
    }
}

function validateAmount() {
    const selectedAmount = getCurrentAmount();
    
    if (!selectedAmount || selectedAmount < 10) {
        showNotification('Valor mínimo de doação é R$ 10,00', 'error');
        return false;
    }
    
    return true;
}

function validatePersonalData() {
    const form = document.getElementById('individualDonationForm');
    const requiredFields = form.querySelectorAll('[data-step="2"] input[required]');
    
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            showNotification(`Campo obrigatório: ${field.previousElementSibling.textContent}`, 'error');
            field.focus();
            return false;
        }
        
        // Validação específica de email
        if (field.type === 'email' && !isValidEmail(field.value)) {
            showNotification('E-mail inválido', 'error');
            field.focus();
            return false;
        }
        
        // Validação de CPF
        if (field.name === 'cpf' && !isValidCPF(field.value)) {
            showNotification('CPF inválido', 'error');
            field.focus();
            return false;
        }
    }
    
    return true;
}

function validatePaymentMethod() {
    const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
    
    if (!selectedPayment) {
        showNotification('Selecione uma forma de pagamento', 'error');
        return false;
    }
    
    // Se cartão de crédito, validar dados do cartão
    if (selectedPayment.value === 'credit') {
        return validateCreditCard();
    }
    
    return true;
}

function validateCreditCard() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value;
    
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
        showNotification('Preencha todos os dados do cartão', 'error');
        return false;
    }
    
    // Validação básica de cartão (Luhn algorithm seria ideal)
    if (cardNumber.replace(/\s/g, '').length < 13) {
        showNotification('Número do cartão inválido', 'error');
        return false;
    }
    
    return true;
}

function validateTerms() {
    const termsCheckbox = document.querySelector('input[name="terms"]');
    
    if (!termsCheckbox.checked) {
        showNotification('Você deve aceitar os termos de uso', 'error');
        return false;
    }
    
    return true;
}

// === MÉTODOS DE PAGAMENTO ===
function initPaymentMethods() {
    const paymentCards = document.querySelectorAll('input[name="paymentMethod"]');
    const creditCardForm = document.querySelector('.credit-card-form');
    
    paymentCards.forEach(radio => {
        radio.addEventListener('change', function() {
            // Mostrar/esconder formulário de cartão
            if (this.value === 'credit') {
                creditCardForm.style.display = 'block';
            } else {
                creditCardForm.style.display = 'none';
            }
            
            // Atualizar preview de pagamento
            updatePaymentPreview(this.value);
        });
    });
    
    // Máscara para cartão de crédito
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            this.value = this.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
        });
    }
    
    // Máscara para data de validade
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
        });
    }
}

function updatePaymentPreview(paymentMethod) {
    const paymentLabels = {
        'pix': 'PIX',
        'credit': 'Cartão de Crédito',
        'debit': 'Débito Online',
        'boleto': 'Boleto Bancário'
    };
    
    const reviewPayment = document.getElementById('reviewPayment');
    if (reviewPayment) {
        reviewPayment.textContent = paymentLabels[paymentMethod] || paymentMethod;
    }
}

// === CALCULADORA DE IMPACTO ===
function initImpactCalculator() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.querySelector('.custom-amount');
    
    // Botões de valor pré-definido
    amountButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            amountButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (this.classList.contains('custom')) {
                customAmountInput.style.display = 'block';
                customAmountInput.focus();
            } else {
                customAmountInput.style.display = 'none';
                const amount = parseInt(this.dataset.amount);
                updateImpactCalculator(amount);
                updateAllAmountDisplays(amount);
            }
        });
    });
    
    // Input customizado
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            const amount = parseInt(this.value) || 0;
            updateImpactCalculator(amount);
            updateAllAmountDisplays(amount);
        });
    }
    
    // Frequência de doação
    const frequencyInputs = document.querySelectorAll('input[name="frequency"]');
    frequencyInputs.forEach(input => {
        input.addEventListener('change', function() {
            updateFrequencyPreview(this.value);
        });
    });
}

function updateImpactCalculator(amount) {
    // Cálculos baseados em valores reais de ONGs ambientais
    const impact = {
        trees: Math.floor(amount / 5),        // R$ 5 por muda
        education: Math.floor(amount / 100),   // R$ 100 por dia de educação
        protection: Math.floor(amount / 0.2)   // R$ 0.20 por m²
    };
    
    // Atualizar elementos da calculadora
    updateElement('selectedAmount', amount);
    updateElement('treesCount', impact.trees);
    updateElement('educationDays', impact.education);
    updateElement('protectionArea', impact.protection);
    
    // Atualizar no resumo também
    updateElement('reviewTrees', impact.trees);
    updateElement('reviewEducation', impact.education);
    updateElement('reviewProtection', impact.protection);
}

function updateAllAmountDisplays(amount) {
    const formattedAmount = amount.toFixed(2).replace('.', ',');
    updateElement('selectedAmount', amount);
    updateElement('reviewAmount', formattedAmount);
    updateElement('reviewTotal', formattedAmount);
}

function updateFrequencyPreview(frequency) {
    const frequencyLabels = {
        'once': 'Doação única',
        'monthly': 'Mensal',
        'yearly': 'Anual (com desconto de 5%)'
    };
    
    updateElement('reviewFrequency', frequencyLabels[frequency] || frequency);
}

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// === FORMULÁRIO CORPORATIVO ===
function initCorporateForm() {
    const corporateForm = document.querySelector('.corporate-form');
    
    if (corporateForm) {
        corporateForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Validação
            if (!validateCorporateForm(formData)) {
                return;
            }
            
            // Estado de carregamento
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            try {
                // Simular envio
                await simulateAPICall();
                
                showNotification('Solicitação enviada! Nossa equipe entrará em contato em até 24 horas.', 'success');
                this.reset();
                
                // Analytics
                trackEvent('corporate_form_submit', {
                    company: formData.get('companyName'),
                    revenue: formData.get('annualRevenue')
                });
                
            } catch (error) {
                showNotification('Erro ao enviar solicitação. Tente novamente.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

function validateCorporateForm(formData) {
    const required = ['companyName', 'cnpj', 'contactName', 'contactEmail', 'contactPhone'];
    
    for (let field of required) {
        if (!formData.get(field)) {
            showNotification(`Campo obrigatório: ${field}`, 'error');
            return false;
        }
    }
    
    // Validar CNPJ
    const cnpj = formData.get('cnpj');
    if (!isValidCNPJ(cnpj)) {
        showNotification('CNPJ inválido', 'error');
        return false;
    }
    
    // Validar email
    const email = formData.get('contactEmail');
    if (!isValidEmail(email)) {
        showNotification('E-mail de contato inválido', 'error');
        return false;
    }
    
    return true;
}

// === PROCESSAMENTO DE PAGAMENTO ===
async function processDonation(donationData) {
    const paymentMethod = donationData.paymentMethod;
    
    try {
        let result;
        
        switch(paymentMethod) {
            case 'pix':
                result = await processPIXPayment(donationData);
                break;
            case 'credit':
                result = await processCreditCardPayment(donationData);
                break;
            case 'debit':
                result = await processDebitPayment(donationData);
                break;
            case 'boleto':
                result = await processBoletoPayment(donationData);
                break;
            default:
                throw new Error('Método de pagamento inválido');
        }
        
        return result;
        
    } catch (error) {
        console.error('Erro no processamento:', error);
        throw error;
    }
}

async function processPIXPayment(donationData) {
    // Integração com API PIX (Banco Central, PagSeguro, MercadoPago, etc.)
    console.log('Processando PIX:', donationData);
    
    // Simular resposta da API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
        success: true,
        paymentId: 'PIX_' + Date.now(),
        qrCode: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="200" height="200" viewBox="0 0 200 200">
                <rect width="200" height="200" fill="white"/>
                <text x="100" y="100" text-anchor="middle" font-size="12">QR CODE PIX</text>
                <text x="100" y="120" text-anchor="middle" font-size="10">R$ ${donationData.amount}</text>
            </svg>
        `),
        message: 'PIX gerado com sucesso!'
    };
}

async function processCreditCardPayment(donationData) {
    // Integração com gateway de pagamento
    console.log('Processando cartão:', donationData);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
        success: true,
        paymentId: 'CC_' + Date.now(),
        installments: donationData.installments || 1,
        message: 'Pagamento aprovado!'
    };
}

async function processDebitPayment(donationData) {
    console.log('Processando débito:', donationData);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    return {
        success: true,
        paymentId: 'DB_' + Date.now(),
        message: 'Débito autorizado!'
    };
}

async function processBoletoPayment(donationData) {
    console.log('Processando boleto:', donationData);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
        success: true,
        paymentId: 'BOL_' + Date.now(),
        boletoUrl: '#',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias
        message: 'Boleto gerado com sucesso!'
    };
}

// === VALIDADORES AUXILIARES ===
function getCurrentAmount() {
    const activeButton = document.querySelector('.amount-btn.active');
    const customInput = document.querySelector('.custom-amount');
    
    if (activeButton && activeButton.classList.contains('custom')) {
        return parseInt(customInput.value) || 0;
    } else if (activeButton) {
        return parseInt(activeButton.dataset.amount) || 0;
    }
    
    return 0;
}

function isValidCPF(cpf) {
    // Remover formatação
    cpf = cpf.replace(/[^\d]/g, '');
    
    // Verificar se tem 11 dígitos
    if (cpf.length !== 11) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validação dos dígitos verificadores (algoritmo simplificado)
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    
    let digit1 = 11 - (sum % 11);
    if (digit1 > 9) digit1 = 0;
    
    if (parseInt(cpf.charAt(9)) !== digit1) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    
    let digit2 = 11 - (sum % 11);
    if (digit2 > 9) digit2 = 0;
    
    return parseInt(cpf.charAt(10)) === digit2;
}

function isValidCNPJ(cnpj) {
    // Remover formatação
    cnpj = cnpj.replace(/[^\d]/g, '');
    
    // Verificar se tem 14 dígitos
    if (cnpj.length !== 14) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cnpj)) return false;
    
    // Validação simplificada (seria ideal implementar o algoritmo completo)
    return true;
}

function updateSummary() {
    // Atualizar resumo na última etapa
    const amount = getCurrentAmount();
    const frequency = document.querySelector('input[name="frequency"]:checked')?.value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    
    if (amount) updateAllAmountDisplays(amount);
    if (frequency) updateFrequencyPreview(frequency);
    if (paymentMethod) updatePaymentPreview(paymentMethod);
}

// === SUBMISSÃO FINAL ===
document.addEventListener('submit', function(e) {
    if (e.target.id === 'individualDonationForm') {
        e.preventDefault();
        handleDonationSubmit(e.target);
    }
});

async function handleDonationSubmit(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Preparar dados
    const donationData = {
        amount: getCurrentAmount(),
        frequency: document.querySelector('input[name="frequency"]:checked')?.value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')?.value,
        personalData: {
            name: form.fullName.value,
            email: form.email.value,
            phone: form.phone.value,
            cpf: form.cpf.value,
            newsletter: form.newsletter?.checked,
            anonymous: form.anonymous?.checked
        },
        timestamp: new Date().toISOString()
    };
    
    // Estado de carregamento
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
    submitBtn.disabled = true;
    
    try {
        // Processar pagamento
        const result = await processDonation(donationData);
        
        if (result.success) {
            // Salvar doação no localStorage
            localStorage.setItem('recent_donation', JSON.stringify({
                id: result.paymentId,
                amount: donationData.amount,
                timestamp: donationData.timestamp
            }));
            
            // Mostrar confirmação
            showDonationSuccess(result, donationData);
            
            // Analytics
            trackEvent('donation_completed', {
                amount: donationData.amount,
                payment_method: donationData.paymentMethod,
                frequency: donationData.frequency
            });
            
        } else {
            throw new Error(result.message || 'Erro no pagamento');
        }
        
    } catch (error) {
        console.error('Erro na doação:', error);
        showNotification('Erro ao processar doação. Tente novamente.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function showDonationSuccess(result, donationData) {
    const modal = document.createElement('div');
    modal.className = 'donation-success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="success-header">
                <i class="fas fa-check-circle"></i>
                <h2>Doação Realizada com Sucesso!</h2>
            </div>
            <div class="success-body">
                <p><strong>Valor:</strong> R$ ${donationData.amount.toFixed(2).replace('.', ',')}</p>
                <p><strong>ID:</strong> ${result.paymentId}</p>
                <p><strong>Método:</strong> ${result.paymentMethod || donationData.paymentMethod}</p>
                
                ${result.qrCode ? `
                    <div class="qr-code">
                        <h3>PIX - QR Code</h3>
                        <img src="${result.qrCode}" alt="QR Code PIX">
                        <p>Escaneie o código ou use a chave PIX enviada por email</p>
                    </div>
                ` : ''}
                
                ${result.boletoUrl ? `
                    <div class="boleto-info">
                        <h3>Boleto Bancário</h3>
                        <p>Vencimento: ${result.dueDate?.toLocaleDateString('pt-BR')}</p>
                        <a href="${result.boletoUrl}" class="btn btn-primary" target="_blank">
                            <i class="fas fa-download"></i> Baixar Boleto
                        </a>
                    </div>
                ` : ''}
                
                <div class="next-steps">
                    <h3>Próximos Passos:</h3>
                    <ul>
                        <li>✅ Confirmação enviada para seu email</li>
                        <li>📊 Acompanhe o impacto no painel do doador</li>
                        <li>🏆 Certificado "Amigo da Amazônia" será enviado</li>
                        <li>📱 Você receberá relatórios mensais</li>
                    </ul>
                </div>
            </div>
            <div class="success-actions">
                <button class="btn btn-primary" onclick="generateCertificate('${result.paymentId}')">
                    <i class="fas fa-certificate"></i> Gerar Certificado
                </button>
                <button class="btn btn-outline" onclick="closeSuccessModal()">
                    Fechar
                </button>
            </div>
        </div>
    `;
    
    // Estilos inline para o modal
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000'
    });
    
    document.body.appendChild(modal);
    
    // Auto-fechar em 30 segundos se não interagir
    setTimeout(() => {
        if (document.contains(modal)) {
            modal.remove();
        }
    }, 30000);
}

function closeSuccessModal() {
    const modal = document.querySelector('.donation-success-modal');
    if (modal) {
        modal.remove();
    }
}

// Exportar funções para uso global se necessário
if (typeof window !== 'undefined') {
    window.DonationSystem = {
        processDonation,
        validateCPF: isValidCPF,
        validateCNPJ: isValidCNPJ,
        updateImpactCalculator
    };
}
