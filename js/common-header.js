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
    
    // Then inject the header
    const header = `
<div id="header">
  <div class="container">
    <div class="branding" onclick="window.location.href='index.html'" style="cursor: pointer;">
      <h1>🚀 Cascading 3.0 Documentation</h1>
      <p>✨ Rehosted because the original site vanished and the Wayback Machine was driving me nuts! 🔍</p>
    </div>
  </div>
</div>`;
    
    // Find the body tag and insert header after it
    const body = document.querySelector('body');
    if (body) {
        body.insertAdjacentHTML('afterbegin', header);
    }
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
