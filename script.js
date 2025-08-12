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
            areas: 'Atua com ênfase nas áreas do Direito Previdenciário, Direito do Trabalho e Direito Civil.',
            specializations: ['Direito Previdenciário', 'Direito do Trabalho', 'Direito Civil', 'Direito Processual Civil']
        },
        'flavio': {
            name: 'Flávio Loch',
            oab: 'OAB/RS nº 109.467',
            photo: 'img/flavio.png',
            education: 'Graduado em Direito pela Universidade de Passo Fundo',
            education2: 'Especialista em Direito Tributário e Direito Empresarial',
            areas: 'Atua nas áreas do Direito Tributário, Direito Empresarial e Direito Digital.',
            specializations: ['Direito Tributário', 'Direito Empresarial', 'Direito Digital', 'Direito Civil']
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
                <p>${lawyer.education2}</p>
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
        const limited = items.slice(0, 9);
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
    }

    async function fetchViaCORSProxy() {
        // Public, no-auth CORS proxy for simple demos. For production, consider a server-side proxy.
        const proxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(RSS_URL);
        const res = await fetch(proxy, { cache: 'no-store' });
        if (!res.ok) throw new Error('Proxy request failed');
        return res.text();
    }

    async function fetchDirect() {
        const res = await fetch(RSS_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error('Direct request failed');
        return res.text();
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
        try {
            // Try direct first; if blocked by CORS, fallback to proxy
            let xmlText;
            try {
                xmlText = await fetchDirect();
            } catch (_e) {
                xmlText = await fetchViaCORSProxy();
            }
            const items = parseRSS(xmlText);
            renderItems(items);
        } catch (err) {
            console.error('Falha ao carregar RSS do STJ:', err);
            container.innerHTML = '<div class="news-skeleton">Não foi possível carregar as notícias agora. Tente novamente mais tarde.</div>';
        }
    }

    // Initial load and periodic refresh every 30 minutes
    loadNews();
    setInterval(loadNews, 30 * 60 * 1000);
})();