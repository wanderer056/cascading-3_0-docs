// Common Footer for Cascading 3.0 Documentation
// This script injects the footer into all pages

function injectFooter() {
    // First, ensure the CSS is loaded
    if (!document.querySelector('link[href="css/common-layout.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/common-layout.css';
        document.head.appendChild(link);
    }
    
    // Remove any existing footers first
    const existingFooters = document.querySelectorAll('div[class*="footer"], div[id*="footer"]');
    existingFooters.forEach(footer => {
        footer.remove();
    });
    
    // Remove any existing footer with our class to avoid duplicates
    const ourFooter = document.querySelector('.footer');
    if (ourFooter) {
        ourFooter.remove();
    }
    
    // Then inject the footer
    const footer = `
<div class="footer">
  <div class="footer-text">
      <a href="index.html">⬆️ Back to Top</a>
      <p>💖 Rehosted by Sumanta Paudel | Keeping the Cascading 3.0 docs alive! 🎯</p>
  </div>
</div>`;
    
    // Find the body tag and insert footer before it closes
    const body = document.querySelector('body');
    if (body) {
        body.insertAdjacentHTML('beforeend', footer);
    }
}

// Inject footer when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
} else {
    injectFooter();
}

// Also try to inject after a short delay to ensure all styles are loaded
setTimeout(injectFooter, 100);

// Debug: log when footer is injected
console.log('Common footer script loaded');
