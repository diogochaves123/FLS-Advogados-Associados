// =====================
// Performance Monitor for News Loading
// =====================

class NewsPerformanceMonitor {
    constructor() {
        this.metrics = {
            trt: { attempts: 0, totalTime: 0, avgTime: 0, lastLoadTime: 0, proxySuccess: {} },
            stj: { attempts: 0, totalTime: 0, avgTime: 0, lastLoadTime: 0, proxySuccess: {} }
        };
        this.startTime = performance.now();
        this.setupMonitoring();
    }

    setupMonitoring() {
        // Monitor TRT news loading
        this.interceptFunction('setupTrtNews', 'fetchTrtNews', 'TRT');
        
        // Monitor STJ news loading
        this.interceptFunction('setupStjNews', 'loadNews', 'STJ');
        
        // Add performance display to page
        this.addPerformanceDisplay();
    }

    interceptFunction(setupName, functionName, newsType) {
        // Find the original function and wrap it with performance monitoring
        const originalSetup = window[setupName];
        if (originalSetup) {
            // Store original function
            const originalFunction = originalSetup.toString();
            
            // Create wrapper with performance monitoring
            const wrapper = `
                (function ${setupName}() {
                    const container = document.getElementById('${newsType === 'TRT' ? 'trt-news-list' : 'news-list'}');
                    if (!container) return;

                    const TRT_URL = 'https://www.trt4.jus.br/portais/trt4/modulos/noticias/Jur%C3%ADdica/0';
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
                    const MAX_RETRIES = 2;
                    const REQUEST_TIMEOUT = 8000;
                    const PARALLEL_TIMEOUT = 10000;

                    // Performance monitoring
                    const monitor = window.newsPerformanceMonitor;
                    
                    // Rest of the original function implementation...
                    ${originalFunction.replace(/^function\s+\w+\s*\([^)]*\)\s*\{/, '')}
                })();
            `;
            
            // Execute the wrapper
            eval(wrapper);
        }
    }

    recordLoadTime(newsType, loadTime, proxyIndex, success) {
        const metric = this.metrics[newsType.toLowerCase()];
        if (metric) {
            metric.attempts++;
            metric.totalTime += loadTime;
            metric.avgTime = metric.totalTime / metric.attempts;
            metric.lastLoadTime = loadTime;
            
            if (success && proxyIndex !== undefined) {
                metric.proxySuccess[proxyIndex] = (metric.proxySuccess[proxyIndex] || 0) + 1;
            }
            
            this.updateDisplay();
            this.logMetrics(newsType, loadTime, proxyIndex);
        }
    }

    logMetrics(newsType, loadTime, proxyIndex) {
        const metric = this.metrics[newsType.toLowerCase()];
        console.log(`📊 ${newsType} Performance Metrics:`);
        console.log(`   • Tentativa: ${metric.attempts}`);
        console.log(`   • Tempo atual: ${loadTime.toFixed(0)}ms`);
        console.log(`   • Tempo médio: ${metric.avgTime.toFixed(0)}ms`);
        console.log(`   • Tempo total: ${metric.totalTime.toFixed(0)}ms`);
        if (proxyIndex !== undefined) {
            console.log(`   • Proxy usado: ${proxyIndex + 1}`);
        }
        console.log(`   • Taxa de sucesso por proxy:`, metric.proxySuccess);
    }

    addPerformanceDisplay() {
        const display = document.createElement('div');
        display.id = 'performance-display';
        display.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            max-width: 300px;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(display);
        this.updateDisplay();
    }

    updateDisplay() {
        const display = document.getElementById('performance-display');
        if (!display) return;

        const trt = this.metrics.trt;
        const stj = this.metrics.stj;
        const uptime = ((performance.now() - this.startTime) / 1000).toFixed(0);

        display.innerHTML = `
            <div style="margin-bottom: 10px; font-weight: bold; color: #FFD700;">📊 Performance Monitor</div>
            
            <div style="margin-bottom: 8px;">
                <div style="color: #87CEEB;">🟦 TRT News:</div>
                <div>• Tentativas: ${trt.attempts}</div>
                <div>• Último: ${trt.lastLoadTime.toFixed(0)}ms</div>
                <div>• Média: ${trt.avgTime.toFixed(0)}ms</div>
            </div>
            
            <div style="margin-bottom: 8px;">
                <div style="color: #98FB98;">🟩 STJ News:</div>
                <div>• Tentativas: ${stj.attempts}</div>
                <div>• Último: ${stj.lastLoadTime.toFixed(0)}ms</div>
                <div>• Média: ${stj.avgTime.toFixed(0)}ms</div>
            </div>
            
            <div style="font-size: 10px; color: #CCC;">
                Uptime: ${uptime}s
            </div>
            
            <button onclick="window.newsPerformanceMonitor.resetMetrics()" 
                    style="margin-top: 8px; padding: 4px 8px; background: #FF6B6B; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 10px;">
                Reset
            </button>
        `;
    }

    resetMetrics() {
        this.metrics = {
            trt: { attempts: 0, totalTime: 0, avgTime: 0, lastLoadTime: 0, proxySuccess: {} },
            stj: { attempts: 0, totalTime: 0, avgTime: 0, lastLoadTime: 0, proxySuccess: {} }
        };
        this.startTime = performance.now();
        this.updateDisplay();
        console.log('📊 Performance metrics reset');
    }

    getPerformanceReport() {
        const trt = this.metrics.trt;
        const stj = this.metrics.stj;
        const uptime = (performance.now() - this.startTime) / 1000;

        return {
            uptime: uptime,
            trt: {
                attempts: trt.attempts,
                avgLoadTime: trt.avgTime,
                lastLoadTime: trt.lastLoadTime,
                proxySuccess: trt.proxySuccess
            },
            stj: {
                attempts: stj.attempts,
                avgLoadTime: stj.avgTime,
                lastLoadTime: stj.lastLoadTime,
                proxySuccess: stj.proxySuccess
            },
            recommendations: this.generateRecommendations()
        };
    }

    generateRecommendations() {
        const recommendations = [];
        const trt = this.metrics.trt;
        const stj = this.metrics.stj;

        if (trt.avgTime > 5000) {
            recommendations.push('TRT: Considerar otimizações adicionais - tempo médio > 5s');
        }
        if (stj.avgTime > 5000) {
            recommendations.push('STJ: Considerar otimizações adicionais - tempo médio > 5s');
        }

        // Check proxy success rates
        const trtProxySuccess = Object.values(trt.proxySuccess);
        const stjProxySuccess = Object.values(stj.proxySuccess);
        
        if (trtProxySuccess.length > 0 && Math.max(...trtProxySuccess) < 3) {
            recommendations.push('TRT: Baixa taxa de sucesso dos proxies - verificar estabilidade');
        }
        if (stjProxySuccess.length > 0 && Math.max(...stjProxySuccess) < 3) {
            recommendations.push('STJ: Baixa taxa de sucesso dos proxies - verificar estabilidade');
        }

        return recommendations;
    }
}

// Initialize performance monitor when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.newsPerformanceMonitor = new NewsPerformanceMonitor();
    
    // Add performance testing functions to global scope
    window.testNewsPerformance = () => {
        const report = window.newsPerformanceMonitor.getPerformanceReport();
        console.log('📊 Performance Report:', report);
        return report;
    };
    
    window.resetPerformanceMetrics = () => {
        window.newsPerformanceMonitor.resetMetrics();
    };
    
    console.log('📊 News Performance Monitor initialized');
    console.log('💡 Use testNewsPerformance() to get detailed report');
    console.log('💡 Use resetPerformanceMetrics() to reset metrics');
});
