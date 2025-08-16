function injectHeader() {
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

    // --- Inject header HTML ---
    const headerHTML = `
<div id="header" style="position: fixed; top:0; left:0; right:0; width:100%; z-index:9999; transition: all 0.3s ease;">
  <div class="container">
    <div class="branding" onclick="window.location.href='index.html'" style="cursor:pointer;">
      <h1 class="header-title">🚀 Cascading 3.0 Documentation</h1>
      <p class="header-subtitle">✨ Original docs offline, Wayback tricky and slow 😅 — here’s Cascading 3.0 Docs, fully searchable! 🔍</p>
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
    document.addEventListener('DOMContentLoaded', injectHeader);
} else {
    injectHeader();
}

// Debug
console.log('Common header script loaded');

