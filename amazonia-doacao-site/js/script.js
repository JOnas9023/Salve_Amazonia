// ===== AMAZÔNIA SALVA - JAVASCRIPT PRINCIPAL =====
// Funcionalidades: Menu responsivo, Formulários, Doações, Animações, Interações

// Aguardar carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌱 AmazôniaSalva - Site carregado com sucesso! 🌳');
    
    // Inicializar todas as funcionalidades
    initMobileMenu();
    initNavigation();
    initNewsletterForm();
    initContactForm();
    initDonationSystem();
    initScrollAnimations();
    initSmoothScroll();
    initProgressBars();
    initCounters();
    initImageLazyLoading();
    initBackToTop();
    initTooltips();
    initDonationTabs();
    initProjectFilters();
    
    console.log('✅ Todas as funcionalidades foram inicializadas');
});

// === MENU RESPONSIVO ===
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animar hamburger
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// === FORMULÁRIO DE NEWSLETTER ===
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Validação básica
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Estado de carregamento
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscrevendo...';
            submitBtn.disabled = true;
            
            try {
                // Simular envio (substituir pela integração real)
                await simulateAPICall();
                
                // Sucesso
                showNotification('Inscrição realizada com sucesso! 🎉', 'success');
                this.reset();
                
                // Salvar no localStorage para evitar re-inscrições
                localStorage.setItem('newsletter_subscribed', email);
                
            } catch (error) {
                showNotification('Erro ao inscrever. Tente novamente.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// === ANIMAÇÕES NO SCROLL ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observar elementos com animação
    const animatedElements = document.querySelectorAll(`
        .mission-card, 
        .project-card, 
        .team-member, 
        .feature-card, 
        .faq-item,
        .stat-item,
        .impact-card,
        .step-item
    `);
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Aplicar animação quando visível
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// === SCROLL SUAVE ===
function initSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === BARRAS DE PROGRESSO ===
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                
                progressBar.style.width = '0%';
                progressBar.style.transition = 'width 2s ease-out';
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
}

// === CONTADORES ANIMADOS ===
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = formatNumber(Math.floor(current));
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = formatNumber(target);
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.7 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// === FAQ ACCORDION (se existir) ===
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const isActive = item.classList.contains('active');
                
                // Fechar todos os outros
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = null;
                        }
                    }
                });
                
                // Toggle atual
                item.classList.toggle('active');
                
                if (answer) {
                    if (!isActive) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        answer.style.maxHeight = null;
                    }
                }
            });
        }
    });
}

// === FORMULÁRIO DE CONTATO ===
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Validação
            if (!validateContactForm(formData)) {
                return;
            }
            
            // Estado de carregamento
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            try {
                // Simular envio
                await simulateAPICall();
                
                showNotification('Mensagem enviada com sucesso! Retornaremos em breve.', 'success');
                this.reset();
                
            } catch (error) {
                showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// === RASTREAMENTO DE DOAÇÕES ===
function initDonationTracking() {
    // Verificar se existe parâmetro de doação na URL
    const urlParams = new URLSearchParams(window.location.search);
    const donationId = urlParams.get('donation_id');
    
    if (donationId) {
        showDonationConfirmation(donationId);
    }
    
    // Botões de doação
    const donationButtons = document.querySelectorAll('a[href*="doacoes.html"]');
    
    donationButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Analytics tracking
            trackEvent('donation_click', {
                source: this.closest('section')?.className || 'unknown',
                button_text: this.textContent.trim()
            });
        });
    });
}

// === GERADOR DE CERTIFICADO ===
function initCertificateGenerator() {
    // Verificar se usuário fez doação recente
    const recentDonation = localStorage.getItem('recent_donation');
    
    if (recentDonation) {
        const donationData = JSON.parse(recentDonation);
        
        // Mostrar opção de gerar certificado após 2 segundos
        setTimeout(() => {
            showCertificateOption(donationData);
        }, 2000);
    }
}

// === FUNÇÕES UTILITÁRIAS ===

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validar formulário de contato
function validateContactForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || name.trim().length < 2) {
        showNotification('Nome deve ter pelo menos 2 caracteres.', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return false;
    }
    
    if (!message || message.trim().length < 10) {
        showNotification('Mensagem deve ter pelo menos 10 caracteres.', 'error');
        return false;
    }
    
    return true;
}

// Simular chamada de API
function simulateAPICall() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 90% de sucesso
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Simulação de erro'));
            }
        }, 1500);
    });
}

// Mostrar notificação
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos inline para garantir que apareça
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '9999',
        maxWidth: '400px',
        padding: '15px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        color: '#fff',
        fontWeight: '500',
        fontSize: '14px',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-out'
    });
    
    // Cores baseadas no tipo
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Botão de fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto-fechar após 5 segundos
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

// Esconder notificação
function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Formatar números
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

// Mostrar confirmação de doação
function showDonationConfirmation(donationId) {
    const modal = document.createElement('div');
    modal.className = 'donation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-heart text-green"></i> Obrigado pela sua doação!</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>ID da Doação:</strong> ${donationId}</p>
                <p>Sua contribuição para a preservação da Amazônia foi recebida com sucesso!</p>
                <p>Você receberá um email de confirmação em breve com todos os detalhes.</p>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="generateCertificate('${donationId}')">
                        <i class="fas fa-certificate"></i> Gerar Certificado
                    </button>
                    <button class="btn btn-outline" onclick="closeModal()">Fechar</button>
                </div>
            </div>
        </div>
    `;
    
    // Estilos do modal
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
    
    // Fechar modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    // Fechar clicando fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Mostrar opção de certificado
function showCertificateOption(donationData) {
    const notification = document.createElement('div');
    notification.className = 'certificate-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h4><i class="fas fa-certificate"></i> Certificado Disponível!</h4>
            <p>Sua doação de R$ ${donationData.amount} gerou um certificado "Amigo da Amazônia"</p>
            <div class="notification-actions">
                <button class="btn btn-primary btn-sm" onclick="generateCertificate('${donationData.id}')">
                    Gerar Certificado
                </button>
                <button class="btn btn-secondary btn-sm" onclick="dismissCertificate()">
                    Mais Tarde
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
}

// Gerar certificado (placeholder)
function generateCertificate(donationId) {
    showNotification('Certificado sendo gerado... Você receberá por email em alguns minutos!', 'success');
    
    // Remover da localStorage após gerar
    localStorage.removeItem('recent_donation');
    
    // Remover modal se existir
    const modal = document.querySelector('.donation-modal');
    if (modal) modal.remove();
    
    // Analytics
    trackEvent('certificate_generated', { donation_id: donationId });
}

// Dispensar certificado
function dismissCertificate() {
    const notification = document.querySelector('.certificate-notification');
    if (notification) notification.remove();
}

// Fechar modal
function closeModal() {
    const modal = document.querySelector('.donation-modal');
    if (modal) modal.remove();
}

// Rastreamento de eventos (Google Analytics ou similar)
function trackEvent(eventName, parameters = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('trackCustom', eventName, parameters);
    }
    
    // Console para desenvolvimento
    console.log('Event tracked:', eventName, parameters);
}

// === HEADER SCROLL EFFECT ===
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (header) {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.backgroundColor = '#ffffff';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        }
    }
});

// === LAZY LOADING DE IMAGENS ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// === PERFORMANCE MONITORING ===
window.addEventListener('load', function() {
    // Medir performance
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Site carregado em ${loadTime}ms`);
        
        // Enviar para analytics se necessário
        trackEvent('page_load_time', { load_time: loadTime });
    }
});

// === TRATAMENTO DE ERROS GLOBAIS ===
window.addEventListener('error', function(event) {
    console.error('Erro JavaScript:', event.error);
    
    // Reportar erros críticos
    trackEvent('javascript_error', {
        message: event.error?.message || 'Unknown error',
        filename: event.filename,
        lineno: event.lineno
    });
});

// === MODO OFFLINE ===
window.addEventListener('online', function() {
    showNotification('Conexão restaurada! 🌐', 'success');
});

window.addEventListener('offline', function() {
    showNotification('Você está offline. Algumas funcionalidades podem estar limitadas.', 'warning');
});

// === NAVEGAÇÃO ATIVA ===
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section[id]');
    
    // Marcar seção ativa no scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// === SISTEMA DE DOAÇÕES ===
function initDonationSystem() {
    // Valores pré-definidos
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.querySelector('.custom-amount');
    let selectedAmount = 100; // Valor padrão
    
    amountButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            amountButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (this.classList.contains('custom')) {
                customAmountInput.style.display = 'block';
                customAmountInput.focus();
            } else {
                customAmountInput.style.display = 'none';
                selectedAmount = parseInt(this.dataset.amount);
                updateImpactPreview(selectedAmount);
            }
        });
    });
    
    // Input de valor customizado
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            selectedAmount = parseInt(this.value) || 0;
            updateImpactPreview(selectedAmount);
        });
    }
    
    // Tabs de doação (individual/corporativo)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetTab)?.classList.add('active');
        });
    });
}

// === ABAS DE DOAÇÃO ===
function initDonationTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active de todos
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Adiciona active aos selecionados
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// === FILTROS DE PROJETOS ===
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Atualizar botões ativos
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar projetos
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// === CARREGAMENTO LAZY DE IMAGENS ===
function initImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// === BOTÃO VOLTAR AO TOPO ===
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    
    // Estilos inline
    Object.assign(backToTopBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        background: 'var(--primary-green)',
        color: 'white',
        cursor: 'pointer',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        zIndex: '1000',
        fontSize: '18px'
    });
    
    document.body.appendChild(backToTopBtn);
    
    // Mostrar/esconder baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll para o topo ao clicar
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === TOOLTIPS ===
function initTooltips() {
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltips.forEach(element => {
        let tooltip;
        
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.dataset.tooltip;
            
            tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            Object.assign(tooltip.style, {
                position: 'absolute',
                background: '#333',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                zIndex: '10000',
                opacity: '0',
                transition: 'opacity 0.3s ease'
            });
            
            document.body.appendChild(tooltip);
            
            // Posicionar tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            // Animar entrada
            requestAnimationFrame(() => {
                tooltip.style.opacity = '1';
            });
        });
        
        element.addEventListener('mouseleave', function() {
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// === ATUALIZAR PREVIEW DE IMPACTO ===
function updateImpactPreview(amount) {
    const impactPreview = document.querySelector('.impact-preview');
    if (!impactPreview) return;
    
    const impactItems = {
        trees: Math.floor(amount / 5), // R$ 5 por muda
        education: Math.floor(amount / 100), // R$ 100 por dia de educação
        protection: Math.floor(amount / 0.2) // R$ 0.20 por m²
    };
    
    // Atualizar valores
    const treeSpan = impactPreview.querySelector('.trees');
    const educationSpan = impactPreview.querySelector('.education');
    const protectionSpan = impactPreview.querySelector('.protection');
    
    if (treeSpan) treeSpan.textContent = `${impactItems.trees} mudas plantadas`;
    if (educationSpan) educationSpan.textContent = `${impactItems.education} dias de educação ambiental`;
    if (protectionSpan) protectionSpan.textContent = `${impactItems.protection}m² de área protegida`;
    
    // Atualizar título
    const title = impactPreview.querySelector('h4');
    if (title) title.textContent = `Seu impacto com R$ ${amount}:`;
}

// === EXPORT PARA TESTE (se necessário) ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        formatNumber,
        trackEvent,
        updateImpactPreview
    };
}
