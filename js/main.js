// 1. Improved Toggle Menu with Touch Support
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');
    if (!menu || !hamburger) return;
    
    const isActive = menu.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    
    // Prevent scrolling when menu is open on mobile
    document.body.style.overflow = isActive ? 'hidden' : '';
}

// 2. Fix: Close menu when clicking links (Essential for Mobile)
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (menu) menu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
    });
});

// 3. Close menu when clicking outside (with touch support)
document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav:not(.bottom-nav)');
    const menu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (!nav || !menu || !hamburger) return;
    
    // Only close if menu is active and click is outside nav
    if (menu.classList.contains('active') && !nav.contains(e.target)) {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Back to Top Button
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
}

// Scroll reveal animation for sections
const sections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('visible');
    sectionObserver.observe(section);
});

// NEW Badge Auto-removal (hides badges older than 24 hours)
(function() {
    const badges = document.querySelectorAll('[data-posted]');
    const now = new Date();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    badges.forEach(item => {
        const postedDate = new Date(item.getAttribute('data-posted'));
        const age = now - postedDate;
        
        if (age > twentyFourHours) {
            const badge = item.querySelector('.new-badge');
            if (badge) badge.classList.add('hidden');
        }
    });
})();

// 4. Optimized Theme Toggle (Dark mode = default, Light mode = toggle)
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.querySelector('.theme-toggle');
    if (!themeBtn) return;
    
    // Toggle light-mode class (dark is default)
    const isLight = body.classList.toggle('light-mode');
    
    // Update button: in dark mode show ☀️ Light, in light mode show 🌙 Dark
    const icon = themeBtn.querySelector('.icon');
    const label = themeBtn.querySelector('.label');
    
    if (icon) icon.textContent = isLight ? '🌙' : '☀️';
    if (label) label.textContent = isLight ? 'Dark' : 'Light';
    themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// 5. Load saved theme WITHOUT flickering (Dark is default)
(function() {
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.querySelector('.theme-toggle');
    
    // Only add light-mode if explicitly saved as light
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeBtn) {
            const icon = themeBtn.querySelector('.icon');
            const label = themeBtn.querySelector('.label');
            if (icon) icon.textContent = '🌙';
            if (label) label.textContent = 'Dark';
            themeBtn.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
})();
