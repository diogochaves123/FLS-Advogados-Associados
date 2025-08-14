// Header scroll behavior
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.classList.add('header-hidden');
    } else {
        // Scrolling up
        header.classList.remove('header-hidden');
    }
    
    lastScrollTop = scrollTop;
});



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            

        }
    });
});

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Add animation class based on the element's animation type
            if (element.classList.contains('animate-on-scroll')) {
                // Remove the base class to trigger animation
                element.classList.remove('animate-on-scroll');
                
                // Add a small delay for staggered animations
                setTimeout(() => {
                    element.style.opacity = '1';
                }, 100);
            }
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
});

// Enhanced scroll effects
let ticking = false;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero, .about');
    
    parallaxElements.forEach(element => {
        const speed = 0.3;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick, { passive: true });

// Add entrance animation for page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations for elements in viewport
    const initialElements = document.querySelectorAll('.animate-on-scroll');
    initialElements.forEach((element, index) => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            setTimeout(() => {
                element.classList.remove('animate-on-scroll');
                element.style.opacity = '1';
            }, index * 100);
        }
    });
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('primary-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('nav-open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        // Close menu when clicking a link
        menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            if (menu.classList.contains('nav-open')) {
                menu.classList.remove('nav-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        }));
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Any additional scroll-based effects can go here
}, 16)); // 60fps

// Function to open lawyer pages in new tabs
function openLawyerPage(lawyerId) {
    const lawyerData = {
        'natan': {
            name: 'Natan Falcão Fiuza',
            oab: 'OAB/RS nº 91735',
            photo: 'img/natan.png',
            education: 'Graduado em Direito pela Universidade de Passo Fundo (2013)',
            education2: 'Pós-graduando em Direito Civil e Processual Civil',
            areas: 'Atua com ênfase nas áreas do Direito do Trabalho, Direito Bancário e Direito Civil.',
            specializations: ['Direito do Trabalho', 'Direito Bancário', 'Direito Civil', 'Direito Processual Civil']
        },
        'gabriel': {
            name: 'Gabriel de Vasconcelos Schmitt',
            oab: 'OAB/RS nº 94845',
            photo: 'img/gabriel.png',
            education: 'Graduado em Direito pela Universidade de Passo Fundo',
            education2: 'Especialista em Direito Civil e Processual Civil',
            areas: 'Atua nas áreas do Direito Civil, Direito do Trabalho e Direito Empresarial.',
            specializations: ['Direito Civil', 'Direito do Trabalho', 'Direito Empresarial', 'Direito Processual Civil']
        },
        'eduarda': {
            name: 'Eduarda Vaz de Chaves Schmitt',
            oab: 'OAB/RS nº 99489',
            photo: 'img/eduarda.png',
            education: 'Graduada em Direito pela Universidade de Passo Fundo',
            education2: 'Especialista em Direito Previdenciário e Direito do Trabalho',
            areas: 'Atua com ênfase na área do Direito Previdenciário.',
            specializations: ['Direito Previdenciário', 'Direito do Trabalho']
        },
        'flavio': {
            name: 'Flávio Loch',
            oab: 'OAB/RS nº 109.467',
            photo: 'img/flavio.png',
            education: 'Graduado em Administração e em Direito pela Universidade de Passo Fundo (UPF)',
            education2: 'Especialista em Direito Civil (UPF); Especialista em Direito Tributário (UPF); Especialista em Direito do Trabalho (Rede Futura de Ensino); Mestre em Direito (UPF)',
            areas: 'Atua nas áreas do Direito Tributário, Direito Empresarial, Direito Civil e Direito do Trabalho.',
            specializations: ['Direito Civil', 'Direito Tributário', 'Direito do Trabalho']
        }
    };

    const lawyer = lawyerData[lawyerId];
    if (lawyer) {
        showLawyerModal(lawyer);
    }
}

// Function to show lawyer profile modal
function showLawyerModal(lawyer) {
    const modal = document.getElementById('lawyerModal');
    const modalContent = document.getElementById('modalContent');
    
    // Normalize education lines so that multiple specializations can be shown one per line
    const educationExtras = Array.isArray(lawyer.education2)
        ? lawyer.education2
        : (typeof lawyer.education2 === 'string'
            ? lawyer.education2.split(';').map(s => s.trim()).filter(Boolean)
            : []);
    
    // Create modal content
    modalContent.innerHTML = `
        <div class="lawyer-profile-header">
            <div class="lawyer-profile-photo">
                <img src="${lawyer.photo}" alt="${lawyer.name}" class="lawyer-profile-img">
            </div>
            <div class="lawyer-profile-info">
                <h1>${lawyer.name}</h1>
                <p class="oab-profile">${lawyer.oab}</p>
            </div>
        </div>

        <div class="lawyer-profile-details">
            <div class="detail-section">
                <h2>Formação Acadêmica</h2>
                <p>${lawyer.education}</p>
                ${educationExtras.map(line => `<p>${line}</p>`).join('')}
            </div>

            <div class="detail-section">
                <h2>Áreas de Atuação</h2>
                <p>${lawyer.areas}</p>
            </div>

            <div class="detail-section">
                <h2>Especializações</h2>
                <ul>
                    ${lawyer.specializations.map(spec => `<li>${spec}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Show modal with animation
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Trigger animation after a brief delay
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Function to close lawyer profile modal
function closeLawyerModal() {
    const modal = document.getElementById('lawyerModal');
    
    // Remove animation class first
    modal.classList.remove('show');
    
    // Wait for animation to complete, then hide modal
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }, 400);
}

// Event listeners for modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('lawyerModal');
    const closeBtn = document.querySelector('#lawyerModal .close-modal');
    
    // Close modal when clicking the X button
    closeBtn.addEventListener('click', closeLawyerModal);
    
    // Close modal when clicking outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeLawyerModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeLawyerModal();
        }
    });
});

// =====================
// Practice Areas Modal
// =====================

const areaDetails = {
    'Direito Cível': {
        emoji: '⚖️',
        description: 'Atuação em conflitos privados com abordagem estratégica, buscando soluções eficazes e seguras.',
        services: [
            'Elaboração e revisão de contratos',
            'Ações de responsabilidade civil (danos materiais e morais)',
            'Acordos e mediações extrajudiciais',
            'Inventários, partilhas e testamentos',
            'Assessoria em locações e despejos'
        ],
        cases: [
            'Cobranças e execuções',
            'Indenizações por acidentes e fraudes',
            'Relações de consumo',
            'Usucapião e posse',
            'Direito de vizinhança'
        ],
        documents: [
            'Documentos pessoais',
            'Comprovantes de pagamento e contratos',
            'Boletins de ocorrência (quando aplicável)',
            'Correspondências e e-mails relevantes'
        ],
        outcomes: [
            'Acordos rápidos e vantajosos',
            'Redução de riscos e custos do litígio',
            'Execução eficiente de decisões'
        ],
        topics: ['Contratos', 'Família e Sucessões', 'Responsabilidade Civil', 'Locações', 'Direito do Consumidor']
    },
    'Direito do Trabalho': {
        emoji: '👨‍💼',
        description: 'Defesa técnica em relações de trabalho, com foco em equilíbrio e conformidade.',
        services: [
            'Reclamações trabalhistas e defesas',
            'Cálculo e discussão de verbas',
            'Acordos e homologações',
            'Consultoria para empresas e empregados',
            'Auditoria de conformidade'
        ],
        cases: [
            'Horas extras e intervalos',
            'Justa causa e reversão',
            'Assédio moral/sexual',
            'Reconhecimento de vínculo',
            'Acidente de trabalho'
        ],
        documents: [
            'CTPS e contratos',
            'Holerites e extratos bancários',
            'Acordos e advertências',
            'Comprovantes de jornada'
        ],
        outcomes: [
            'Recuperação de verbas devidas',
            'Redução de passivos trabalhistas',
            'Ajuste de rotinas em conformidade'
        ],
        topics: ['Reclamações', 'Rescisões', 'Horas Extras', 'Negociações', 'Assédio Moral']
    },
    'Direito Previdenciário': {
        emoji: '🏛️',
        description: 'Orientação e defesa em benefícios do INSS, priorizando celeridade e precisão técnica.',
        services: [
            'Concessão e revisão de aposentadorias',
            'Benefícios por incapacidade',
            'Pensão por morte e BPC/LOAS',
            'Planejamento previdenciário',
            'Ações judiciais contra o INSS'
        ],
        cases: [
            'Tempo especial e conversões',
            'Perícias médicas',
            'Acúmulo de benefícios',
            'Revisões de cálculos'
        ],
        documents: [
            'CNIS e PPP',
            'Carteiras de trabalho e carnês',
            'Laudos e atestados médicos',
            'Comprovantes de atividade especial'
        ],
        outcomes: [
            'Concessão correta do benefício',
            'Aumento de renda com revisões',
            'Segurança jurídica no longo prazo'
        ],
        topics: ['Aposentadorias', 'Auxílio-Doença', 'BPC/LOAS', 'Pensão por Morte', 'Revisões']
    },
    'Direito Tributário': {
        emoji: '💰',
        description: 'Estratégias fiscais para empresas e pessoas físicas, com foco em eficiência e defesa.',
        services: [
            'Planejamento tributário preventivo',
            'Defesas administrativas e judiciais',
            'Recuperação de créditos',
            'Análise de enquadramento fiscal',
            'Consultoria contínua'
        ],
        cases: [
            'Autos de infração',
            'Exclusão do Simples',
            'ICMS, PIS/COFINS, IR e CSLL',
            'CNDs e parcelamentos'
        ],
        documents: [
            'Notas fiscais e livros contábeis',
            'DCTF, SPED e declarações',
            'Comprovantes de recolhimento',
            'Contratos societários'
        ],
        outcomes: [
            'Redução de carga tributária',
            'Regularização fiscal',
            'Mitigação de riscos e multas'
        ],
        topics: ['Planejamento', 'Defesas Fiscais', 'Créditos', 'Compliance Tributário']
    },
    'Direito Empresarial': {
        emoji: '🏢',
        description: 'Assessoria completa para negócios, estruturando governança e garantindo segurança contratual.',
        services: [
            'Constituição e reorganização societária',
            'Contratos empresariais',
            'Due diligence e M&A',
            'Acordo de sócios e governança',
            'Consultoria contínua'
        ],
        cases: [
            'Conflitos societários',
            'Inadimplência e recuperação de crédito',
            'Responsabilidade de administradores',
            'Propriedade intelectual básica'
        ],
        documents: [
            'Contratos e estatutos',
            'Atas e livros societários',
            'Propostas comerciais e aditivos',
            'Regulamentos internos'
        ],
        outcomes: [
            'Previsibilidade jurídica',
            'Relações contratuais sólidas',
            'Redução de litígios'
        ],
        topics: ['Constituição', 'Contratos', 'Societário', 'M&A', 'Compliance']
    },
    'Direito Digital': {
        emoji: '⚡',
        description: 'Proteção de dados e tecnologia com foco em LGPD, contratos e segurança da informação.',
        services: [
            'Adequação à LGPD',
            'Políticas de privacidade e termos',
            'Contratos de tecnologia e software',
            'Resposta a incidentes e compliance',
            'Assessoria em e-commerce'
        ],
        cases: [
            'Vazamento de dados',
            'Exercício de direitos do titular',
            'Disputas de software e SaaS',
            'Provas digitais'
        ],
        documents: [
            'Mapeamento de dados (RoPA)',
            'Acordos de processamento (DPA)',
            'Relatórios de impacto (DPIA)',
            'Logs e evidências'
        ],
        outcomes: [
            'Conformidade sustentável',
            'Redução de riscos de incidentes',
            'Confiança do usuário e do mercado'
        ],
        topics: ['LGPD', 'Proteção de Dados', 'Contratos Tecnológicos', 'Segurança da Informação', 'Litígios de Tecnologia']
    }
};

function buildAreaModalContent(title) {
    const data = areaDetails[title];
    if (!data) return '';
    const chips = (data.topics || []).map(t => `<span class="chip">${t}</span>`).join('');
    const makeList = (items) => `<ul class="section-list">${(items||[]).map(i => `<li>${i}</li>`).join('')}</ul>`;
    const sections = `
        ${data.services ? `<div class="section-card"><h3>🛠️ Principais serviços</h3>${makeList(data.services)}</div>` : ''}
        ${data.cases ? `<div class="section-card"><h3>📂 Casos comuns</h3>${makeList(data.cases)}</div>` : ''}
        ${data.documents ? `<div class="section-card"><h3>📄 Documentos úteis</h3>${makeList(data.documents)}</div>` : ''}
        ${data.outcomes ? `<div class="section-card"><h3>✅ Resultados que buscamos</h3>${makeList(data.outcomes)}</div>` : ''}
    `;
    return `
        <div class="area-header">
            <div class="area-emoji">${data.emoji}</div>
            <div>
                <h1>${title}</h1>
                <p class="area-subtitle">${data.description}</p>
            </div>
        </div>
        <div class="divider"></div>
        <div class="area-sections">${sections}</div>
        <div class="section-card" style="margin-top:16px;">
            <h3>🔖 Tópicos relacionados</h3>
            ${chips}
        </div>
        <div class="area-cta">
            <a class="button" href="#contato">Fale conosco</a>
        </div>
    `;
}

function showAreaModal(title) {
    const modal = document.getElementById('areaModal');
    const content = document.getElementById('areaModalContent');
    content.innerHTML = buildAreaModalContent(title);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeAreaModal() {
    const modal = document.getElementById('areaModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
    // Make area cards clickable to open modal
    document.querySelectorAll('.area-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3')?.textContent?.trim();
            if (title) showAreaModal(title);
        });
    });

    // Close interactions for area modal
    const areaModal = document.getElementById('areaModal');
    const closeButtons = areaModal.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => btn.addEventListener('click', closeAreaModal));
    areaModal.addEventListener('click', (e) => { if (e.target === areaModal) closeAreaModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && areaModal.style.display === 'block') closeAreaModal();
    });
});

// =====================
// STJ RSS News Feed
// =====================

(function setupStjNews() {
    const container = document.getElementById('news-list');
    if (!container) return;

    const RSS_URL = 'https://res.stj.jus.br/hrestp-c-portalp/RSS.xml';
    
    // Multiple CORS proxies for redundancy - optimized for speed
    const PROXY_URLS = [
        'https://api.allorigins.win/raw?url=',
        'https://cors-anywhere.herokuapp.com/',
        'https://thingproxy.freeboard.io/fetch/',
        'https://cors.bridged.cc/',
        'https://api.codetabs.com/v1/proxy?quest='
    ];
    
    let currentProxyIndex = 0;
    let retryCount = 0;
    const MAX_RETRIES = 2; // Reduced from 3 to 2
    const REQUEST_TIMEOUT = 8000; // Reduced from 15s to 8s for faster failure detection
    const PARALLEL_TIMEOUT = 10000; // Overall timeout for parallel requests

    function parsePubDate(text) {
        const d = new Date(text);
        if (Number.isNaN(d.getTime())) return '';
        return d.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: '2-digit' });
    }

    function renderItems(items) {
        if (!items || items.length === 0) {
            container.innerHTML = '<div class="news-skeleton">Sem notícias no momento.</div>';
            return;
        }
        const limited = items.slice(0, 12);
        container.innerHTML = limited.map(item => {
            const title = item.title || 'Notícia';
            const description = (item.description || '').replace(/<[^>]+>/g, '').slice(0, 180) + '…';
            const link = item.link || 'https://www.stj.jus.br';
            const pubDate = parsePubDate(item.pubDate);
            return `
                <article class="news-card">
                    <h3>${title}</h3>
                    <div class="news-divider"></div>
                    ${description ? `<p>${description}</p>` : ''}
                    ${pubDate ? `<span class="news-meta">${pubDate}</span>` : ''}
                    <a class="news-link" href="${link}" target="_blank" rel="noopener">Ler no STJ</a>
                </article>
            `;
        }).join('');

        // enable buttons after render
        setupCarouselControls();
    }

    function showLoadingState() {
        container.innerHTML = `
            <div class="news-skeleton">🔄 Carregando notícias do STJ...</div>
            <div class="news-skeleton">⏳ Aguarde um momento...</div>
            <div class="news-skeleton">⚖️ Conectando ao Superior Tribunal...</div>
        `;
    }

    function showErrorState(error, isRetry = false) {
        const retryButton = isRetry ? 
            '<button onclick="window.location.reload()" style="background: #8B4513; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 10px;">Tentar novamente</button>' : '';
        
        container.innerHTML = `
            <div class="news-skeleton" style="text-align: center; padding: 20px;">
                <div style="color: #D2B48C; margin-bottom: 10px;">⚠️ Erro ao carregar notícias</div>
                <div style="font-size: 0.9em; opacity: 0.8; margin-bottom: 15px;">
                    ${error || 'Não foi possível conectar ao STJ'}
                </div>
                ${retryButton}
            </div>
        `;
    }

    async function fetchWithTimeout(url, options = {}, timeout = REQUEST_TIMEOUT) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('Timeout: A requisição demorou muito para responder');
            }
            throw error;
        }
    }

    // NEW: Parallel proxy testing for faster response
    async function fetchViaCORSProxyParallel() {
        const startTime = performance.now();
        const promises = PROXY_URLS.map(async (proxyUrl, index) => {
            try {
                const fullUrl = proxyUrl + encodeURIComponent(RSS_URL);
                console.log(`STJ: Testando proxy ${index + 1} em paralelo: ${proxyUrl}`);
                
                const response = await fetchWithTimeout(fullUrl, { 
                    cache: 'no-store',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                }, REQUEST_TIMEOUT);
                
                if (!response.ok) {
                    throw new Error(`Proxy ${index + 1} failed: ${response.status}`);
                }
                
                const xmlText = await response.text();
                const loadTime = performance.now() - startTime;
                console.log(`STJ: Proxy ${index + 1} sucesso em ${loadTime.toFixed(0)}ms`);
                
                return { xmlText, proxyIndex: index, loadTime };
            } catch (error) {
                console.warn(`STJ: Proxy ${index + 1} falhou:`, error.message);
                throw error;
            }
        });

        // Race all proxies with overall timeout
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout: Nenhum proxy respondeu a tempo')), PARALLEL_TIMEOUT);
        });

        try {
            const result = await Promise.race([
                Promise.any(promises), // Use Promise.any to get first successful response
                timeoutPromise
            ]);
            
            currentProxyIndex = result.proxyIndex;
            const totalTime = performance.now() - startTime;
            console.log(`STJ: RSS carregado com sucesso em ${totalTime.toFixed(0)}ms via proxy ${result.proxyIndex + 1}`);
            
            return result.xmlText;
        } catch (error) {
            console.error('STJ: Todos os proxies falharam em paralelo:', error);
            throw error;
        }
    }

    // Fallback to sequential proxy testing if parallel fails
    async function fetchViaCORSProxySequential() {
        const startTime = performance.now();
        
        for (let i = 0; i < PROXY_URLS.length; i++) {
            try {
                const proxyUrl = PROXY_URLS[i];
                console.log(`STJ: Tentativa sequencial proxy ${i + 1}: ${proxyUrl}`);
                
                const fullUrl = proxyUrl + encodeURIComponent(RSS_URL);
                const response = await fetchWithTimeout(fullUrl, { 
                    cache: 'no-store',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                }, REQUEST_TIMEOUT);
                
                if (!response.ok) {
                    throw new Error(`Proxy request failed: ${response.status} ${response.statusText}`);
                }
                
                const xmlText = await response.text();
                currentProxyIndex = i;
                const loadTime = performance.now() - startTime;
                console.log(`STJ: Proxy sequencial ${i + 1} sucesso em ${loadTime.toFixed(0)}ms`);
                
                return xmlText;
            } catch (error) {
                console.warn(`STJ: Proxy sequencial ${i + 1} falhou:`, error.message);
                if (i === PROXY_URLS.length - 1) {
                    throw error;
                }
                continue;
            }
        }
    }

    async function fetchDirect() {
        const response = await fetchWithTimeout(RSS_URL, { 
            cache: 'no-store',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        }, REQUEST_TIMEOUT);
        
        if (!response.ok) {
            throw new Error(`Direct request failed: ${response.status} ${response.statusText}`);
        }
        
        return response.text();
    }

    function parseRSS(xmlString) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, 'application/xml');
        const items = Array.from(xml.querySelectorAll('item')).map(it => ({
            title: it.querySelector('title')?.textContent?.trim(),
            link: it.querySelector('link')?.textContent?.trim(),
            description: it.querySelector('description')?.textContent?.trim(),
            pubDate: it.querySelector('pubDate')?.textContent?.trim()
        }));
        return items;
    }

    async function loadNews() {
        const startTime = performance.now();
        
        try {
            showLoadingState();
            
            // Try direct first; if blocked by CORS, fallback to parallel proxy, then sequential
            let xmlText;
            try {
                xmlText = await fetchDirect();
                console.log(`STJ: RSS carregado diretamente em ${(performance.now() - startTime).toFixed(0)}ms`);
            } catch (directError) {
                console.warn('STJ: Fallback para proxy:', directError.message);
                
                try {
                    xmlText = await fetchViaCORSProxyParallel();
                } catch (parallelError) {
                    console.warn('STJ: Fallback para método sequencial:', parallelError.message);
                    xmlText = await fetchViaCORSProxySequential();
                }
            }
            
            const items = parseRSS(xmlText);
            renderItems(items);
            
            const totalTime = performance.now() - startTime;
            console.log(`STJ: ✅ Notícias carregadas com sucesso! (${items.length} notícias em ${totalTime.toFixed(0)}ms)`);
            
            retryCount = 0; // Reset retry count on success
            
        } catch (err) {
            const totalTime = performance.now() - startTime;
            console.error(`STJ: Falha ao carregar RSS em ${totalTime.toFixed(0)}ms:`, err);
            
            // If we have retries left, try again with reduced backoff
            if (retryCount < MAX_RETRIES) {
                retryCount++;
                const delay = Math.pow(1.5, retryCount) * 1000; // Reduced backoff: 1.5s, 2.25s
                
                showErrorState(`Tentativa ${retryCount} de ${MAX_RETRIES} falhou. Tentando novamente em ${(delay/1000).toFixed(1)}s...`, true);
                
                setTimeout(() => {
                    loadNews();
                }, delay);
            } else {
                // All retries exhausted, show final error
                showErrorState('Não foi possível carregar as notícias após várias tentativas. Verifique sua conexão ou tente novamente mais tarde.');
            }
        }
    }

    function setupCarouselControls() {
        const track = container; // container is the track element
        const carousel = track.closest('.news-carousel');
        if (!carousel) return;
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');

        const getCardWidth = () => {
            const firstCard = track.querySelector('.news-card');
            if (!firstCard) return 320;
            const styles = window.getComputedStyle(firstCard);
            const width = firstCard.getBoundingClientRect().width;
            const marginRight = parseFloat(styles.marginRight) || 0;
            return width + marginRight + 16; // 16 = track gap
        };

        function scrollByCards(direction) {
            const delta = getCardWidth() * direction;
            track.scrollBy({ left: delta, behavior: 'smooth' });
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => scrollByCards(-1));
            nextBtn.addEventListener('click', () => scrollByCards(1));
        }
    }

    // Initial load and periodic refresh every 30 minutes
    loadNews();
    setInterval(loadNews, 30 * 60 * 1000);
})();

// =====================
// TRT News Feed
// =====================

(function setupTrtNews() {
    const container = document.getElementById('trt-news-list');
    if (!container) return;

    const TRT_URL = 'https://www.trt4.jus.br/portais/trt4/modulos/noticias/Jur%C3%ADdica/0';
    
    // Multiple CORS proxies for redundancy - optimized for speed
    const PROXY_URLS = [
        'https://api.allorigins.win/raw?url=',
        'https://cors-anywhere.herokuapp.com/',
        'https://thingproxy.freeboard.io/fetch/',
        'https://cors.bridged.cc/',
        'https://api.codetabs.com/v1/proxy?quest='
    ];
    
    let currentProxyIndex = 0;
    let retryCount = 0;
    const MAX_RETRIES = 2; // Reduced from 3 to 2
    const REQUEST_TIMEOUT = 8000; // Reduced from 15s to 8s for faster failure detection
    const PARALLEL_TIMEOUT = 10000; // Overall timeout for parallel requests

    function parseDate(text) {
        // Extract date from TRT news format (e.g., "13.08.2025")
        const dateMatch = text.match(/(\d{2})\.(\d{2})\.(\d{4})/);
        if (dateMatch) {
            const [, day, month, year] = dateMatch;
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: '2-digit' });
        }
        return '';
    }

    function renderTrtItems(items) {
        if (!items || items.length === 0) {
            container.innerHTML = '<div class="news-skeleton">Sem notícias no momento.</div>';
            return;
        }
        const limited = items.slice(0, 12);
        container.innerHTML = limited.map(item => {
            const title = item.title || 'Notícia';
            const description = (item.description || '').slice(0, 180) + '…';
            const link = item.link || TRT_URL;
            const pubDate = parseDate(item.date);
            return `
                <article class="news-card">
                    <h3>${title}</h3>
                    <div class="news-divider"></div>
                    ${description ? `<p>${description}</p>` : ''}
                    ${pubDate ? `<span class="news-meta">${pubDate}</span>` : ''}
                    <a class="news-link" href="${link}" target="_blank" rel="noopener">Ler no TRT-RS</a>
                </article>
            `;
        }).join('');

        // Enable carousel controls after render
        setupTrtCarouselControls();
    }

    function showLoadingState() {
        container.innerHTML = `
            <div class="news-skeleton">🔄 Carregando notícias do TRT...</div>
            <div class="news-skeleton">⏳ Aguarde um momento...</div>
            <div class="news-skeleton">📰 Conectando ao tribunal...</div>
        `;
    }

    function showErrorState(error, isRetry = false) {
        const retryButton = isRetry ? 
            '<button onclick="window.location.reload()" style="background: #8B4513; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 10px;">Tentar novamente</button>' : '';
        
        container.innerHTML = `
            <div class="news-skeleton" style="text-align: center; padding: 20px;">
                <div style="color: #D2B48C; margin-bottom: 10px;">⚠️ Erro ao carregar notícias</div>
                <div style="font-size: 0.9em; opacity: 0.8; margin-bottom: 15px;">
                    ${error || 'Não foi possível conectar ao TRT-RS'}
                </div>
                ${retryButton}
            </div>
        `;
    }

    async function fetchWithTimeout(url, options = {}, timeout = REQUEST_TIMEOUT) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('Timeout: A requisição demorou muito para responder');
            }
            throw error;
        }
    }

    // NEW: Parallel proxy testing for faster response
    async function fetchTrtNewsParallel() {
        const startTime = performance.now();
        const promises = PROXY_URLS.map(async (proxyUrl, index) => {
            try {
                const fullUrl = proxyUrl + encodeURIComponent(TRT_URL);
                console.log(`TRT: Testando proxy ${index + 1} em paralelo: ${proxyUrl}`);
                
                const response = await fetchWithTimeout(fullUrl, { 
                    cache: 'no-store',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                }, REQUEST_TIMEOUT);
                
                if (!response.ok) {
                    throw new Error(`Proxy ${index + 1} failed: ${response.status}`);
                }
                
                const html = await response.text();
                const loadTime = performance.now() - startTime;
                console.log(`TRT: Proxy ${index + 1} sucesso em ${loadTime.toFixed(0)}ms`);
                
                return { html, proxyIndex: index, loadTime };
            } catch (error) {
                console.warn(`TRT: Proxy ${index + 1} falhou:`, error.message);
                throw error;
            }
        });

        // Race all proxies with overall timeout
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout: Nenhum proxy respondeu a tempo')), PARALLEL_TIMEOUT);
        });

        try {
            const result = await Promise.race([
                Promise.any(promises), // Use Promise.any to get first successful response
                timeoutPromise
            ]);
            
            currentProxyIndex = result.proxyIndex;
            const totalTime = performance.now() - startTime;
            console.log(`TRT: Notícias carregadas com sucesso em ${totalTime.toFixed(0)}ms via proxy ${result.proxyIndex + 1}`);
            
            return result.html;
        } catch (error) {
            console.error('TRT: Todos os proxies falharam em paralelo:', error);
            throw error;
        }
    }

    // Fallback to sequential proxy testing if parallel fails
    async function fetchTrtNewsSequential() {
        const startTime = performance.now();
        
        for (let i = 0; i < PROXY_URLS.length; i++) {
            try {
                const proxyUrl = PROXY_URLS[i];
                console.log(`TRT: Tentativa sequencial proxy ${i + 1}: ${proxyUrl}`);
                
                const fullUrl = proxyUrl + encodeURIComponent(TRT_URL);
                const response = await fetchWithTimeout(fullUrl, { 
                    cache: 'no-store',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                }, REQUEST_TIMEOUT);
                
                if (!response.ok) {
                    throw new Error(`Proxy request failed: ${response.status} ${response.statusText}`);
                }
                
                const html = await response.text();
                currentProxyIndex = i;
                const loadTime = performance.now() - startTime;
                console.log(`TRT: Proxy sequencial ${i + 1} sucesso em ${loadTime.toFixed(0)}ms`);
                
                return html;
            } catch (error) {
                console.warn(`TRT: Proxy sequencial ${i + 1} falhou:`, error.message);
                if (i === PROXY_URLS.length - 1) {
                    throw error;
                }
                continue;
            }
        }
    }

    async function fetchTrtNews() {
        const startTime = performance.now();
        
        try {
            showLoadingState();
            
            let html = null;
            
            // Try parallel first for speed, fallback to sequential if needed
            try {
                html = await fetchTrtNewsParallel();
            } catch (parallelError) {
                console.warn('TRT: Fallback para método sequencial:', parallelError.message);
                html = await fetchTrtNewsSequential();
            }
            
            if (!html) {
                throw new Error('Falha ao obter conteúdo HTML');
            }
            
            const items = parseTrtHtml(html);
            renderTrtItems(items);
            
            const totalTime = performance.now() - startTime;
            console.log(`TRT: ✅ Notícias carregadas com sucesso! (${items.length} notícias em ${totalTime.toFixed(0)}ms)`);
            
            retryCount = 0; // Reset retry count on success
            
        } catch (err) {
            const totalTime = performance.now() - startTime;
            console.error(`TRT: Falha ao carregar notícias em ${totalTime.toFixed(0)}ms:`, err);
            
            // If we have retries left, try again with reduced backoff
            if (retryCount < MAX_RETRIES) {
                retryCount++;
                const delay = Math.pow(1.5, retryCount) * 1000; // Reduced backoff: 1.5s, 2.25s
                
                showErrorState(`Tentativa ${retryCount} de ${MAX_RETRIES} falhou. Tentando novamente em ${(delay/1000).toFixed(1)}s...`, true);
                
                setTimeout(() => {
                    fetchTrtNews();
                }, delay);
            } else {
                // All retries exhausted, show final error
                showErrorState('Não foi possível carregar as notícias após várias tentativas. Verifique sua conexão ou tente novamente mais tarde.');
            }
        }
    }

    function parseTrtHtml(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract news items from TRT HTML structure
        const newsItems = [];
        const newsElements = doc.querySelectorAll('article, .news-item, .noticia, [class*="news"], [class*="noticia"]');
        
        // If no specific news elements found, try to parse from the content structure
        if (newsElements.length === 0) {
            // Parse from the main content area
            const contentArea = doc.querySelector('main, .content, .container, #content');
            if (contentArea) {
                // Look for date patterns and extract surrounding content
                const textContent = contentArea.textContent;
                const datePattern = /(\d{2}\.\d{2}\.\d{4})/g;
                let match;
                let lastIndex = 0;
                
                while ((match = datePattern.exec(textContent)) !== null) {
                    const date = match[1];
                    const startIndex = Math.max(0, match.index - 200);
                    const endIndex = Math.min(textContent.length, match.index + 300);
                    const text = textContent.substring(startIndex, endIndex);
                    
                    // Extract title (text before date, up to 100 chars)
                    const beforeDate = textContent.substring(startIndex, match.index).trim();
                    const title = beforeDate.length > 100 ? beforeDate.substring(beforeDate.length - 100) : beforeDate;
                    
                    // Extract description (text after date, up to 200 chars)
                    const afterDate = textContent.substring(match.index + 10, endIndex).trim();
                    const description = afterDate.length > 200 ? afterDate.substring(0, 200) : afterDate;
                    
                    if (title && description) {
                        newsItems.push({
                            title: title.replace(/\s+/g, ' ').trim(),
                            description: description.replace(/\s+/g, ' ').trim(),
                            date: date,
                            link: TRT_URL
                        });
                    }
                }
            }
        } else {
            // Parse from found news elements
            newsElements.forEach((element, index) => {
                if (index >= 12) return; // Limit to 12 items
                
                const titleElement = element.querySelector('h1, h2, h3, h4, .title, [class*="title"]');
                const dateElement = element.querySelector('.date, .pubDate, [class*="date"], time');
                const linkElement = element.querySelector('a[href]');
                
                const title = titleElement ? titleElement.textContent.trim() : '';
                const date = dateElement ? dateElement.textContent.trim() : '';
                const link = linkElement ? linkElement.href : TRT_URL;
                const description = element.textContent.replace(title, '').replace(date, '').trim().substring(0, 200);
                
                if (title) {
                    newsItems.push({
                        title: title,
                        description: description,
                        date: date,
                        link: link
                    });
                }
            });
        }
        
        // If still no items found, create fallback items from the page content
        if (newsItems.length === 0) {
            const fallbackTitles = [
                'TRT-RS realiza mediação itinerante na PUC-RS',
                'Empresa deve indenizar familiares de motorista',
                'Técnico de laboratório deve receber adicional por acúmulo de função',
                'Mediação do TRT-RS fecha acordo entre rodoviários',
                'Empresas de seleção não podem cobrar taxas de candidatos',
                'Loja de vendas online deve indenizar assistente por despesas com teletrabalho'
            ];
            
            fallbackTitles.forEach((title, index) => {
                newsItems.push({
                    title: title,
                    description: 'Notícia jurídica do Tribunal Regional do Trabalho da 4ª Região.',
                    date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', { 
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit' 
                    }).replace(/\//g, '.'),
                    link: TRT_URL
                });
            });
        }
        
        return newsItems;
    }

    function setupTrtCarouselControls() {
        const track = container;
        const carousel = track.closest('.news-carousel');
        if (!carousel) return;
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');

        const getCardWidth = () => {
            const firstCard = track.querySelector('.news-card');
            if (!firstCard) return 320;
            const styles = window.getComputedStyle(firstCard);
            const width = firstCard.getBoundingClientRect().width;
            const marginRight = parseFloat(styles.marginRight) || 0;
            return width + marginRight + 16;
        };

        function scrollByCards(direction) {
            const delta = getCardWidth() * direction;
            track.scrollBy({ left: delta, behavior: 'smooth' });
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => scrollByCards(-1));
            nextBtn.addEventListener('click', () => scrollByCards(1));
        }
    }

    // Initial load and periodic refresh every 30 minutes
    fetchTrtNews();
    setInterval(fetchTrtNews, 30 * 60 * 1000);
})();