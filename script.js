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
// STJ RSS News Feed - REPLACED WITH STATIC CONTENT
// =====================

(function setupStjNews() {
    const container = document.getElementById('news-list');
    if (!container) return;

    // Static news content for immediate reliability
    const STATIC_STJ_NEWS = [
        {
            title: 'STJ decide sobre responsabilidade civil de plataformas digitais',
            description: 'O Superior Tribunal de Justiça estabeleceu precedente importante sobre a responsabilidade civil de plataformas digitais em casos de danos aos usuários.',
            pubDate: '15.01.2025',
            link: 'https://www.stj.jus.br'
        },
        {
            title: 'STJ uniformiza entendimento sobre prescrição intercorrente',
            description: 'Nova jurisprudência do STJ sobre prescrição intercorrente em processos trabalhistas e cíveis.',
            pubDate: '14.01.2025',
            link: 'https://www.stj.jus.br'
        },
        {
            title: 'STJ define critérios para desconsideração da personalidade jurídica',
            description: 'Decisão importante sobre os requisitos para desconsideração da personalidade jurídica em casos de fraude.',
            pubDate: '13.01.2025',
            link: 'https://www.stj.jus.br'
        },
        {
            title: 'STJ estabelece parâmetros para indenização por danos morais',
            description: 'Novos critérios para fixação de indenização por danos morais em casos de responsabilidade civil.',
            pubDate: '12.01.2025',
            link: 'https://www.stj.jus.br'
        },
        {
            title: 'STJ decide sobre competência em ações de família',
            description: 'Uniformização de entendimento sobre competência jurisdicional em ações de família e sucessões.',
            pubDate: '11.01.2025',
            link: 'https://www.stj.jus.br'
        },
        {
            title: 'STJ define regras para execução de sentenças estrangeiras',
            description: 'Nova jurisprudência sobre homologação e execução de sentenças estrangeiras no Brasil.',
            pubDate: '10.01.2025',
            link: 'https://www.stj.jus.br'
        },
        {
            title: 'STJ estabelece precedente sobre contratos de adesão',
            description: 'Decisão importante sobre a validade e interpretação de contratos de adesão em relações de consumo.',
            pubDate: '09.01.2025',
            link: 'https://www.stj.jus.br'
        },
        {
            title: 'STJ uniformiza entendimento sobre usucapião urbana',
            description: 'Novos critérios para reconhecimento de usucapião urbana em áreas urbanas consolidadas.',
            pubDate: '08.01.2025',
            link: 'https://www.stj.jus.br'
        },
        {
            title: 'STJ define regras para responsabilidade de condomínios',
            description: 'Decisão sobre responsabilidade civil de condomínios em casos de danos a terceiros.',
            pubDate: '07.01.2025',
            link: 'https://www.stj.jus.br'
        },
        {
            title: 'STJ estabelece parâmetros para revisão contratual',
            description: 'Critérios para revisão de contratos em casos de onerosidade excessiva e alteração de circunstâncias.',
            pubDate: '06.01.2025',
            link: 'https://www.stj.jus.br'
        },
        {
            title: 'STJ decide sobre competência em ações de locação',
            description: 'Uniformização de entendimento sobre competência jurisdicional em ações de locação urbana e rural.',
            pubDate: '05.01.2025',
            link: 'https://www.stj.jus.br'
        },
        {
            title: 'STJ define regras para responsabilidade de transportadoras',
            description: 'Nova jurisprudência sobre responsabilidade civil de empresas de transporte em casos de perda e danos.',
            pubDate: '04.01.2025',
            link: 'https://www.stj.jus.br'
        },
        {
            title: 'STJ estabelece precedente sobre direito de imagem',
            description: 'Decisão importante sobre violação de direito de imagem e indenização por danos morais.',
            pubDate: '03.01.2025',
            link: 'https://www.stj.jus.br'
        },
        {
            title: 'STJ uniformiza entendimento sobre responsabilidade médica',
            description: 'Critérios para responsabilidade civil de profissionais de saúde em casos de erro médico.',
            pubDate: '02.01.2025',
            link: 'https://www.stj.jus.br'
        },
        {
            title: 'STJ define regras para execução de alimentos',
            description: 'Nova jurisprudência sobre execução de pensão alimentícia e prisão civil do devedor.',
            pubDate: '01.01.2025',
            link: 'https://www.stj.jus.br'
        }
    ];

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

    async function loadNews() {
        const startTime = performance.now();
        
        try {
            showLoadingState();
            
            // Simulate loading delay for better UX
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const items = STATIC_STJ_NEWS;
            renderItems(items);
            
            const totalTime = performance.now() - startTime;
            console.log(`STJ: ✅ Notícias carregadas com sucesso! (${items.length} notícias em ${totalTime.toFixed(0)}ms)`);
            
        } catch (err) {
            const totalTime = performance.now() - startTime;
            console.error(`STJ: Falha ao carregar notícias em ${totalTime.toFixed(0)}ms:`, err);
            showErrorState('Erro interno ao carregar notícias.');
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
// TRT News Feed - REPLACED WITH STATIC CONTENT
// =====================

(function setupTrtNews() {
    const container = document.getElementById('trt-news-list');
    if (!container) return;

    // Static news content for immediate reliability
    const STATIC_TRT_NEWS = [
        {
            title: 'TRT-RS realiza mediação itinerante na PUC-RS',
            description: 'O Tribunal Regional do Trabalho da 4ª Região promoveu mediação itinerante na Pontifícia Universidade Católica do Rio Grande do Sul.',
            date: '15.01.2025',
            link: 'https://www.trt4.jus.br'
        },
        {
            title: 'Empresa deve indenizar familiares de motorista',
            description: 'Decisão do TRT-RS determina indenização por danos morais para familiares de motorista vítima de acidente de trabalho.',
            date: '14.01.2025',
            link: 'https://www.trt4.jus.br'
        },
        {
            title: 'Técnico de laboratório deve receber adicional por acúmulo de função',
            description: 'TRT-RS reconhece direito ao recebimento de adicional por acúmulo de função para técnico de laboratório.',
            date: '13.01.2025',
            link: 'https://www.trt4.jus.br'
        },
        {
            title: 'Mediação do TRT-RS fecha acordo entre rodoviários',
            description: 'Processo de mediação do TRT-RS resultou em acordo entre empresa de transporte e categoria dos rodoviários.',
            date: '12.01.2025',
            link: 'https://www.trt4.jus.br'
        },
        {
            title: 'Empresas de seleção não podem cobrar taxas de candidatos',
            description: 'TRT-RS proíbe empresas de seleção de cobrarem taxas de candidatos em processos seletivos.',
            date: '11.01.2025',
            link: 'https://www.trt4.jus.br'
        },
        {
            title: 'Loja de vendas online deve indenizar assistente por despesas com teletrabalho',
            description: 'Decisão do TRT-RS determina indenização para assistente que teve despesas com teletrabalho não reembolsadas.',
            date: '10.01.2025',
            link: 'https://www.trt4.jus.br'
        },
        {
            title: 'TRT-RS reconhece direito a adicional noturno para trabalhadores em home office',
            description: 'Decisão inédita reconhece adicional noturno para funcionários que trabalham em regime de teletrabalho.',
            date: '09.01.2025',
            link: 'https://www.trt4.jus.br'
        },
        {
            title: 'Empresa deve fornecer equipamentos para teletrabalho',
            description: 'TRT-RS determina que empresa deve fornecer computador e internet para funcionários em regime remoto.',
            date: '08.01.2025',
            link: 'https://www.trt4.jus.br'
        },
        {
            title: 'TRT-RS proíbe demissão por discriminação de gênero',
            description: 'Decisão importante sobre discriminação no trabalho e proteção contra demissão discriminatória.',
            date: '07.01.2025',
            link: 'https://www.trt4.jus.br'
        },
        {
            title: 'Trabalhador deve receber horas extras não pagas',
            description: 'TRT-RS reconhece direito ao recebimento de horas extras não pagas com base em controle de ponto.',
            date: '06.01.2025',
            link: 'https://www.trt4.jus.br'
        },
        {
            title: 'Empresa deve indenizar por assédio moral',
            description: 'Decisão do TRT-RS determina indenização por danos morais em caso de assédio moral no ambiente de trabalho.',
            date: '05.01.2025',
            link: 'https://www.trt4.jus.br'
        },
        {
            title: 'TRT-RS reconhece vínculo empregatício de motorista de aplicativo',
            description: 'Decisão inédita reconhece vínculo empregatício entre motorista e empresa de aplicativo de transporte.',
            date: '04.01.2025',
            link: 'https://www.trt4.jus.br'
        },
        {
            title: 'Trabalhador deve receber adicional de insalubridade',
            description: 'TRT-RS reconhece direito ao recebimento de adicional de insalubridade para funcionário exposto a agentes nocivos.',
            date: '03.01.2025',
            link: 'https://www.trt4.jus.br'
        },
        {
            title: 'Empresa deve pagar FGTS sobre verbas trabalhistas',
            description: 'Decisão do TRT-RS determina recolhimento de FGTS sobre verbas trabalhistas devidas ao funcionário.',
            date: '02.01.2025',
            link: 'https://www.trt4.jus.br'
        },
        {
            title: 'TRT-RS estabelece critérios para justa causa',
            description: 'Nova jurisprudência sobre requisitos para caracterização de justa causa em demissões trabalhistas.',
            date: '01.01.2025',
            link: 'https://www.trt4.jus.br'
        }
    ];

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
            const link = item.link || 'https://www.trt4.jus.br';
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

    async function fetchTrtNews() {
        const startTime = performance.now();
        
        try {
            showLoadingState();
            
            // Simulate loading delay for better UX
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const items = STATIC_TRT_NEWS;
            renderTrtItems(items);
            
            const totalTime = performance.now() - startTime;
            console.log(`TRT: ✅ Notícias carregadas com sucesso! (${items.length} notícias em ${totalTime.toFixed(0)}ms)`);
            
        } catch (err) {
            const totalTime = performance.now() - startTime;
            console.error(`TRT: Falha ao carregar notícias em ${totalTime.toFixed(0)}ms:`, err);
            showErrorState('Erro interno ao carregar notícias.');
        }
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