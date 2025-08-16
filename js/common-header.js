// Common Header for Cascading 3.0 Documentation
// This script injects the header into all pages

function injectHeader() {
    // First, ensure the CSS is loaded
    if (!document.querySelector('link[href="css/common-layout.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/common-layout.css';
        document.head.appendChild(link);
    }
    
    // Remove any existing headers first
    const existingHeaders = document.querySelectorAll('div[id*="header"], div[class*="header"]');
    existingHeaders.forEach(header => {
        if (header.id !== 'header') { // Don't remove our new header
            header.remove();
        }
    });
    
    // Remove any existing header with our ID to avoid duplicates
    const ourHeader = document.getElementById('header');
    if (ourHeader) {
        ourHeader.remove();
    }
    
    // Then inject the header with sticky positioning
    const header = `
<div id="header" style="position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; width: 100% !important; z-index: 9999 !important; transition: all 0.3s ease !important;">
  <div class="container">
    <div class="branding" onclick="window.location.href='index.html'" style="cursor: pointer; transition: all 0.3s ease;">
      <h1 class="header-title">🚀 Cascading 3.0 Documentation</h1>
      <p class="header-subtitle">✨ Rehosted because the original site vanished and the Wayback Machine was driving me nuts! 🔍</p>
    </div>
  </div>
</div>`;
    
    // Find the body tag and insert header after it
    const body = document.querySelector('body');
    if (body) {
        body.insertAdjacentHTML('afterbegin', header);
    }
    
    // Initialize header scroll behavior
    initHeaderScroll();
}

// Initialize header scroll behavior
function initHeaderScroll() {
    console.log('Initializing header scroll behavior...');
    let lastScrollTop = 0;
    const header = document.getElementById('header');
    const title = header?.querySelector('.header-title');
    const subtitle = header?.querySelector('.header-subtitle');
    
    console.log('Header elements found:', { header, title, subtitle });
    
    if (!header || !title || !subtitle) {
        console.error('Header elements not found, cannot initialize scroll behavior');
        return;
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        console.log('Scroll detected:', scrollTop);
        
        if (scrollTop > 50) {
            // Scrolled down - shrink header slightly
            console.log('Shrinking header...');
            header.style.setProperty('padding', '10px 0', 'important');
            title.style.setProperty('font-size', '1.8em', 'important');
            title.style.setProperty('margin', '0 0 5px 0', 'important');
            subtitle.style.setProperty('font-size', '0.85em', 'important');
            subtitle.style.setProperty('margin', '0', 'important');
            header.style.setProperty('box-shadow', '0 2px 10px rgba(0,0,0,0.15)', 'important');
        } else {
            // At top - keep header at consistent compact size
            console.log('Compact header size...');
            header.style.setProperty('padding', '12px 0', 'important');
            title.style.setProperty('font-size', '2em', 'important');
            title.style.setProperty('margin', '0 0 6px 0', 'important');
            subtitle.style.setProperty('font-size', '0.9em', 'important');
            subtitle.style.setProperty('margin', '0', 'important');
            header.style.setProperty('box-shadow', '0 4px 15px rgba(0,0,0,0.1)', 'important');
        }
        
        lastScrollTop = scrollTop;
    });
    
    console.log('Scroll event listener attached successfully');
    
    // Test the scroll behavior immediately
    setTimeout(() => {
        console.log('Testing scroll behavior...');
        const testScroll = window.pageYOffset || document.documentElement.scrollTop;
        console.log('Current scroll position:', testScroll);
    }, 1000);
}

// Inject header when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
} else {
    injectHeader();
}

// Also try to inject after a short delay to ensure all styles are loaded
setTimeout(injectHeader, 100);

// Debug: log when header is injected
console.log('Common header script loaded');
