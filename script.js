// ============================================
// PARTICLE SYSTEM
// ============================================
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
        
        container.appendChild(particle);
    }
}

createParticles();

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        document.getElementById('mobileNav').classList.remove('show');
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// MOBILE MENU
// ============================================
document.getElementById('mobileMenu').addEventListener('click', () => {
    document.getElementById('mobileNav').classList.toggle('show');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileNav.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileNav.classList.remove('show');
    }
});

// ============================================
// COPY SCRIPT FUNCTION
// ============================================
function copyScript() {
    const scriptText = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/KS-script/KS-RIVALS-HUB.Load/refs/heads/main/KS.Loader"))()';
    
    navigator.clipboard.writeText(scriptText).then(() => {
        showToast();
        
        const btn = document.getElementById('copyBtn');
        btn.classList.add('copied');
        btn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = '<i class="fas fa-copy"></i><span>Copy</span>';
        }, 2500);
    }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = scriptText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast();
    });
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// EXECUTOR TOGGLE
// ============================================
function toggleExecutors() {
    const executorList = document.getElementById('executorList');
    const toggleBtn = document.getElementById('executorToggle');
    
    executorList.classList.toggle('show');
    toggleBtn.classList.toggle('active');
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-card, .script-info-card, .social-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
});

// Add animate-in class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ============================================
// PARALLAX EFFECT FOR BACKGROUND
// ============================================
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 30;
        const xMove = x * speed;
        const yMove = y * speed;
        orb.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

// ============================================
// PREVENT DISCORD LINK CLICK
// ============================================
document.querySelector('.social-card.discord')?.addEventListener('click', (e) => {
    e.preventDefault();
});

// ============================================
// TYPING EFFECT FOR HERO (Optional Enhancement)
// ============================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================
// FEATURE CARDS STAGGER ANIMATION
// ============================================
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ============================================
// CODE SYNTAX HIGHLIGHT HOVER EFFECT
// ============================================
const codeBox = document.querySelector('.code-box');
if (codeBox) {
    codeBox.addEventListener('mouseenter', () => {
        codeBox.style.textShadow = '0 0 10px rgba(99, 102, 241, 0.3)';
    });
    
    codeBox.addEventListener('mouseleave', () => {
        codeBox.style.textShadow = 'none';
    });
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('animate-in');
    }, 300);
});
