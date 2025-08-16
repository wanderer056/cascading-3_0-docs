// SEO-Enhanced Header Injection
function injectSEOHeader() {
    // --- Ensure CSS files are loaded ---
    if (!document.querySelector('link[href="css/common-layout.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/common-layout.css';
        document.head.appendChild(link);
    }

    if (!document.querySelector('link[href="pagefind/pagefind-ui.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'pagefind/pagefind-ui.css';
        document.head.appendChild(link);
    }

    // --- Remove existing headers ---
    const existingHeaders = document.querySelectorAll('div[id*="header"], div[class*="header"]');
    existingHeaders.forEach(h => h.remove());

    // --- Get current page info for SEO ---
    const currentPage = getCurrentPageInfo();
    
    // --- Inject SEO meta tags ---
    injectSEOMetaTags(currentPage);
    
    // --- Inject structured data ---
    injectStructuredData(currentPage);

    // --- Inject header HTML ---
    const headerHTML = `
<div id="header" style="position: fixed; top:0; left:0; right:0; width:100%; z-index:9999; transition: all 0.3s ease;">
  <div class="container">
    <div class="branding" onclick="window.location.href='index.html'" style="cursor:pointer;">
      <h1 class="header-title">🚀 Cascading 3.0 Documentation</h1>
      <p class="header-subtitle">✨ Original docs offline, Wayback tricky and slow 😅 — here's Cascading 3.0 Docs, fully searchable! 🔍</p>
    </div>
    <div id="search" style="margin-top:10px;"></div>
  </div>
</div>`;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // --- Load Pagefind JS dynamically ---
    if (!document.querySelector('script[src="pagefind/pagefind-ui.js"]')) {
        const script = document.createElement('script');
        script.src = 'pagefind/pagefind-ui.js';
        script.onload = () => {
            if (window.PagefindUI) {
                new PagefindUI({ element: "#search", showSubResults: true });
                addSearchCloseHandler();
            }
        };
        document.head.appendChild(script);
    } else {
        if (window.PagefindUI) {
            new PagefindUI({ element: "#search", showSubResults: true });
            addSearchCloseHandler();
        }
    }

    // --- Initialize header scroll behavior ---
    initHeaderScroll();
}

// Get current page information for SEO
function getCurrentPageInfo() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    // Define page metadata
    const pages = {
        'index.html': {
            title: 'Cascading 3.0 Documentation - Data Workflow Abstraction for Hadoop & Big Data',
            description: 'Complete Cascading 3.0 documentation with search functionality. Learn data workflow abstraction, ETL pipelines, pipe assemblies, flows, and best practices for big data processing on Hadoop, MapReduce, and Tez.',
            keywords: 'Cascading 3.0, data workflow abstraction, ETL pipelines, big data processing, Hadoop ecosystem, MapReduce abstraction, data pipeline orchestration, workflow management, data engineering, distributed computing, data transformation, data aggregation, data filtering, data joins, data workflows, Cascading framework, data processing framework, workflow engine, data pipeline framework, Hadoop workflow, big data workflows, data processing abstraction, workflow abstraction layer, data ETL, data processing pipelines, workflow orchestration, data workflow engine, Cascading API, workflow API, data processing API, big data API, Hadoop API, MapReduce API, Tez API, data workflow management, pipeline management, workflow management system, data processing management, big data management, Hadoop management, workflow orchestration tool, data pipeline tool, ETL tool, workflow tool, data processing tool, big data tool, Hadoop tool, MapReduce tool, Tez tool',
            type: 'website',
            image: 'https://via.placeholder.com/1200x630/2563eb/ffffff?text=Cascading+3.0+Data+Workflow+Abstraction'
        },
        'ch01-introduction.html': {
            title: 'Chapter 1: Introduction to Cascading 3.0 - Data Workflow Abstraction Basics',
            description: 'Learn the basics of Cascading 3.0, understand data workflow abstraction concepts, and get started with your first ETL pipeline for Hadoop and big data processing.',
            keywords: 'Cascading 3.0 introduction, data workflow abstraction, ETL pipeline basics, Hadoop workflow fundamentals, big data processing introduction, workflow abstraction layer, data pipeline orchestration, Cascading framework basics, data workflow engine, workflow management introduction, data processing abstraction, ETL workflow fundamentals, Hadoop ecosystem introduction, MapReduce abstraction basics, data pipeline framework, workflow engine basics, data processing framework, big data workflow fundamentals, distributed computing introduction, data transformation basics, workflow orchestration introduction',
            type: 'article',
            image: 'https://via.placeholder.com/1200x630/059669/ffffff?text=Cascading+Data+Workflow+Abstraction'
        },
        'ch02-diving-in.html': {
            title: 'Chapter 2: Diving In - Cascading 3.0 Data Workflow Architecture',
            description: 'Deep dive into Cascading 3.0 architecture, understanding data workflow abstraction patterns and building your first ETL pipeline for Hadoop and big data processing.',
            keywords: 'Cascading 3.0 deep dive, data workflow architecture, ETL pipeline architecture, workflow abstraction patterns, Hadoop pipeline architecture, big data workflow architecture, data pipeline design, workflow engine architecture, data processing architecture, workflow orchestration architecture, Cascading framework architecture, data workflow engine design, pipeline orchestration patterns, workflow management architecture, data processing framework architecture, big data pipeline architecture, Hadoop workflow architecture, MapReduce abstraction architecture, data transformation architecture, workflow abstraction design, data pipeline orchestration architecture, ETL workflow architecture, workflow engine design patterns, data processing abstraction architecture, big data workflow design, Hadoop ecosystem architecture, workflow orchestration design, data pipeline management architecture, workflow management system architecture',
            type: 'article',
            image: 'https://via.placeholder.com/1200x630/7c3aed/ffffff?text=Cascading+Data+Workflow+Architecture'
        },
        'ch03-basic-concepts.html': {
            title: 'Chapter 3: Basic Concepts - Cascading 3.0 Data Workflow Fundamentals',
            description: 'Master the fundamental concepts of Cascading 3.0 including taps, schemes, pipes, operations, and data workflow abstraction patterns for Hadoop and big data processing.',
            keywords: 'Cascading 3.0 concepts, data workflow fundamentals, taps schemes pipes operations, workflow abstraction fundamentals, ETL pipeline fundamentals, Hadoop workflow fundamentals, big data processing fundamentals, data pipeline fundamentals, workflow engine fundamentals, data processing fundamentals, workflow orchestration fundamentals, Cascading framework fundamentals, data workflow engine fundamentals, pipeline orchestration fundamentals, workflow management fundamentals, data processing framework fundamentals, big data workflow fundamentals, MapReduce abstraction fundamentals, data transformation fundamentals, workflow abstraction patterns, data pipeline orchestration fundamentals, ETL workflow fundamentals, workflow engine patterns, data processing abstraction fundamentals, big data workflow patterns, Hadoop ecosystem fundamentals, workflow orchestration patterns, data pipeline management fundamentals, workflow management system fundamentals, data workflow abstraction patterns, ETL pipeline patterns, Hadoop workflow patterns, big data processing patterns, data pipeline patterns, workflow engine patterns, data processing patterns, workflow orchestration patterns, Cascading framework patterns, data workflow engine patterns, pipeline orchestration patterns, workflow management patterns, data processing framework patterns, big data workflow patterns, MapReduce abstraction patterns, data transformation patterns, workflow abstraction fundamentals, data pipeline orchestration patterns, ETL workflow patterns, workflow engine fundamentals, data processing abstraction patterns, big data workflow fundamentals, Hadoop ecosystem patterns, workflow orchestration fundamentals, data pipeline management patterns, workflow management system patterns',
            type: 'article',
            image: 'https://via.placeholder.com/1200x630/dc2626/ffffff?text=Cascading+Data+Workflow+Fundamentals'
        }
    };
    
    // Default page info
    const defaultPage = {
        title: 'Cascading 3.0 Documentation - Data Workflow Abstraction Reference',
        description: 'Comprehensive Cascading 3.0 documentation with search functionality. Learn data workflow abstraction, ETL pipelines, and best practices for Hadoop, MapReduce, and big data processing.',
        keywords: 'Cascading 3.0, data workflow abstraction, ETL pipelines, big data processing, Hadoop ecosystem, MapReduce abstraction, data pipeline orchestration, workflow management, data engineering, distributed computing, data transformation, data aggregation, data filtering, data joins, data workflows, Cascading framework, data processing framework, workflow engine, data pipeline framework, Hadoop workflow, big data workflows, data processing abstraction, workflow abstraction layer, data ETL, data processing pipelines, workflow orchestration, data workflow engine, Cascading API, workflow API, data processing API, big data API, Hadoop API, MapReduce API, Tez API, data workflow management, pipeline management, workflow management system, data processing management, big data management, Hadoop management, workflow orchestration tool, data pipeline tool, ETL tool, workflow tool, data processing tool, big data tool, Hadoop tool, MapReduce tool, Tez tool, documentation, reference, guide, tutorial, examples, best practices, data workflow patterns, ETL patterns, Hadoop patterns, big data patterns, workflow patterns, pipeline patterns, data processing patterns, abstraction patterns, orchestration patterns, management patterns, framework patterns, engine patterns, API patterns, tool patterns',
        type: 'article',
        image: 'https://via.placeholder.com/1200x630/2563eb/ffffff?text=Cascading+Data+Workflow+Abstraction'
    };
    
    return pages[filename] || defaultPage;
}

// Inject SEO meta tags
function injectSEOMetaTags(pageInfo) {
    const metaTags = [
        // Basic SEO
        { name: 'description', content: pageInfo.description },
        { name: 'keywords', content: pageInfo.keywords },
        { name: 'author', content: 'Cascading Community' },
        { name: 'robots', content: 'index, follow' },
        
        // Open Graph
        { property: 'og:title', content: pageInfo.title },
        { property: 'og:description', content: pageInfo.description },
        { property: 'og:type', content: pageInfo.type },
        { property: 'og:url', content: window.location.href },
        { property: 'og:image', content: pageInfo.image },
        { property: 'og:site_name', content: 'Cascading 3.0 Documentation' },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: pageInfo.title },
        { name: 'twitter:description', content: pageInfo.description },
        { name: 'twitter:image', content: pageInfo.image },
        
        // Additional SEO
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'theme-color', content: '#2563eb' },
        { name: 'msapplication-TileColor', content: '#2563eb' }
    ];
    
    metaTags.forEach(tag => {
        const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
        if (!document.querySelector(selector)) {
            const meta = document.createElement('meta');
            if (tag.name) meta.name = tag.name;
            if (tag.property) meta.setAttribute('property', tag.property);
            meta.content = tag.content;
            document.head.appendChild(meta);
        }
    });
    
    // Set page title
    if (document.title !== pageInfo.title) {
        document.title = pageInfo.title;
    }
}

// Inject structured data (JSON-LD)
function injectStructuredData(pageInfo) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": pageInfo.type === 'website' ? "WebSite" : "TechArticle",
        "name": pageInfo.title,
        "description": pageInfo.description,
        "url": window.location.href,
        "publisher": {
            "@type": "Organization",
            "name": "Cascading Community",
            "url": "https://cascading.sumantapaudel.com.np"
        },
        "mainEntity": pageInfo.type === 'website' ? undefined : {
            "@type": "TechArticle",
            "headline": pageInfo.title,
            "description": pageInfo.description,
            "author": {
                "@type": "Organization",
                "name": "Cascading Project Team"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Cascading Community"
            },
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString().split('T')[0]
        }
    };
    
    // Remove undefined properties
    if (structuredData.mainEntity === undefined) {
        delete structuredData.mainEntity;
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Function to add click handler for closing search results
function addSearchCloseHandler() {
    setTimeout(() => {
        document.addEventListener('click', function(event) {
            const searchResults = document.querySelector('.pagefind-ui__results-area');
            if (searchResults && !searchResults.contains(event.target) && !event.target.closest('#search')) {
                // Click is outside search area, close results
                const searchInput = document.querySelector('.pagefind-ui__search-input');
                if (searchInput) {
                    searchInput.value = '';
                    // Trigger input event to clear results
                    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
        });
    }, 500);
}

// --- Scroll shrink behavior ---
function initHeaderScroll() {
    const header = document.getElementById('header');
    const title = header?.querySelector('.header-title');
    const subtitle = header?.querySelector('.header-subtitle');
    if (!header || !title || !subtitle) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.style.setProperty('padding', '10px 0', 'important');
            title.style.setProperty('font-size', '1.8em', 'important');
            title.style.setProperty('margin', '0 0 5px 0', 'important');
            subtitle.style.setProperty('font-size', '0.85em', 'important');
            subtitle.style.setProperty('margin', '0', 'important');
            header.style.setProperty('box-shadow', '0 2px 10px rgba(0,0,0,0.15)', 'important');
        } else {
            header.style.setProperty('padding', '12px 0', 'important');
            title.style.setProperty('font-size', '2em', 'important');
            title.style.setProperty('margin', '0 0 6px 0', 'important');
            subtitle.style.setProperty('font-size', '0.9em', 'important');
            subtitle.style.setProperty('margin', '0', 'important');
            header.style.setProperty('box-shadow', '0 4px 15px rgba(0,0,0,0.1)', 'important');
        }
    });
}

// --- Initialize on DOM ready ---
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSEOHeader);
} else {
    injectSEOHeader();
}

// Debug
console.log('SEO-enhanced header script loaded');
