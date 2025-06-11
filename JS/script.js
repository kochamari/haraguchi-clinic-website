// AOS (Animate On Scroll) initialization
// Waits for the DOM to be fully loaded before initializing AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
});

// 🚀 Ultra Think: Bulletproof iPhone Safari Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Ultra Think Hamburger Menu System Started');
    
    // Element references with error handling
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('#main-menu');
    const body = document.body;
    const html = document.documentElement;

    // Critical error checking
    if (!navToggle) {
        console.error('❌ Critical Error: .nav-toggle not found');
        return;
    }
    if (!navMenu) {
        console.error('❌ Critical Error: #main-menu not found');
        return;
    }

    console.log('✅ All navigation elements found successfully');

    // State management
    let isMenuOpen = false;
    let isAnimating = false;
    let scrollPosition = 0;

    // iPhone Safari specific fixes
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isIOS) {
        console.log('📱 iPhone/iOS detected - applying Safari optimizations');
        
        // Prevent iOS rubber band scrolling issues
        document.addEventListener('touchmove', function(e) {
            if (isMenuOpen) {
                const element = e.target;
                const isScrollable = element.closest('.hamburger-open');
                if (!isScrollable) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
    }

    // Menu opening function
    function openMenu() {
        if (isAnimating || isMenuOpen) return;
        
        isAnimating = true;
        isMenuOpen = true;
        
        // Store current scroll position for iPhone Safari
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Apply classes with proper timing
        requestAnimationFrame(() => {
            navMenu.classList.add('hamburger-open');
            navToggle.classList.add('hamburger-active');
            body.classList.add('hamburger-menu-open');
            
            // iPhone Safari specific scroll prevention
            if (isIOS) {
                body.style.top = `-${scrollPosition}px`;
                body.style.position = 'fixed';
                body.style.width = '100%';
            }
            
            // Update ARIA attributes
            navToggle.setAttribute('aria-expanded', 'true');
            navToggle.setAttribute('aria-label', 'メニューを閉じる');
            
            console.log('✅ Menu opened successfully');
            
            // Animation complete
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        });
    }

    // Menu closing function
    function closeMenu() {
        if (isAnimating || !isMenuOpen) return;
        
        isAnimating = true;
        isMenuOpen = false;
        
        requestAnimationFrame(() => {
            navMenu.classList.remove('hamburger-open');
            navToggle.classList.remove('hamburger-active');
            body.classList.remove('hamburger-menu-open');
            
            // iPhone Safari specific scroll restoration
            if (isIOS) {
                body.style.position = '';
                body.style.top = '';
                body.style.width = '';
                window.scrollTo(0, scrollPosition);
            }
            
            // Update ARIA attributes
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'メニューを開く');
            
            console.log('✅ Menu closed successfully');
            
            // Animation complete
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        });
    }

    // Toggle function
    function toggleMenu() {
        if (isAnimating) return;
        
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Event Listeners
    
    // Hamburger button click
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🍔 Hamburger button clicked');
        toggleMenu();
    });

    // Touch events for iPhone Safari
    navToggle.addEventListener('touchstart', function(e) {
        e.stopPropagation();
    }, { passive: true });

    // Menu link clicks
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            console.log(`🔗 Menu link ${index + 1} clicked`);
            // Close menu after a brief delay to show visual feedback
            setTimeout(() => {
                closeMenu();
            }, 150);
        });
    });

    // ESC key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            console.log('⌨️ ESC key pressed - closing menu');
            closeMenu();
        }
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            console.log('🖱️ Outside click detected - closing menu');
            closeMenu();
        }
    });

    // Window resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768 && isMenuOpen) {
                console.log('📱 Window resized to desktop - closing menu');
                closeMenu();
            }
        }, 250);
    });

    // Prevent iOS Safari bounce scrolling when menu is open
    if (isIOS) {
        document.addEventListener('touchmove', function(e) {
            if (isMenuOpen && !navMenu.contains(e.target)) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Initialize menu state
    closeMenu();
    
    console.log('🚀 Ultra Think Hamburger Menu System Initialized Successfully');
    console.log(`📱 Device: ${isIOS ? 'iOS' : 'Other'}, Browser: ${isSafari ? 'Safari' : 'Other'}`);
});

// Smooth scroll for anchor links (if you add any internal page links like #section)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Check if the link is for a different page (e.g. index.html#about from contact.html)
        // or if it's purely an anchor on the current page.
        // This simple check might not be robust enough for all scenarios if URLs are complex.
        if (this.pathname === window.location.pathname && this.hash) {
            e.preventDefault();
            const targetElement = document.querySelector(this.hash);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Optimized header scroll effect with throttling
let headerScrollTicking = false;

function updateHeaderOnScroll() {
    const header = document.querySelector('.site-header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    headerScrollTicking = false;
}

window.addEventListener('scroll', function() {
    if (!headerScrollTicking) {
        requestAnimationFrame(updateHeaderOnScroll);
        headerScrollTicking = true;
    }
}, { passive: true });

// CSS for .scrolled header (add this to your style.css if you want a visual change)
/*
.site-header.scrolled {
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    background-color: rgba(255, 255, 255, 0.98); // Slightly transparent or different background
    padding: 10px 0; // Reduce padding on scroll
}
*/

// CSS for .nav-toggle.open (burger to X animation - add to style.css)
/*
.nav-toggle.open span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}
.nav-toggle.open span:nth-child(2) {
    opacity: 0;
}
.nav-toggle.open span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}
*/

// Optimized image loading for all devices
document.addEventListener('DOMContentLoaded', function() {
    console.log('🖼️ Image Loading Optimization Started');
    
    const images = document.querySelectorAll('.doctor-photo, .hero-doctor-icon');
    console.log(`Found ${images.length} images to optimize`);
    
    images.forEach(function(img, index) {
        console.log(`Image ${index + 1}:`, img.src);
        
        img.addEventListener('load', function() {
            console.log(`✅ Image ${index + 1} loaded successfully`);
            // Add fade-in effect
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            console.error(`❌ Failed to load image ${index + 1}:`, img.src);
        });
        
        // Set initial opacity for fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Check if already loaded
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
            console.log(`✅ Image ${index + 1} was already loaded`);
        }
    });
    
    console.log('🖼️ Image optimization setup complete');
});

// 📱 iPhone Safari Background Optimization System
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 iPhone Safari Background System Started');
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isMobile = window.innerWidth <= 768;
    
    if (isIOS && isMobile) {
        console.log('📱 iPhone detected - applying Safari background optimizations');
        
        // Create optimized background styles for iPhone Safari
        const iosStyle = document.createElement('style');
        iosStyle.id = 'ios-safari-optimizations';
        iosStyle.textContent = `
            /* iPhone Safari specific optimizations */
            @media (max-width: 768px) {
                body::before {
                    background-attachment: scroll !important;
                    -webkit-transform: translateZ(0) !important;
                    transform: translateZ(0) !important;
                }
                
                .hero::before {
                    background-attachment: scroll !important;
                    -webkit-transform: translateZ(0) !important;
                    transform: translateZ(0) !important;
                }
                
                .clinic-features::before {
                    background-attachment: scroll !important;
                    -webkit-transform: translateZ(0) !important;
                    transform: translateZ(0) !important;
                }
                
                /* Improve scrolling performance */
                * {
                    -webkit-overflow-scrolling: touch;
                }
            }
        `;
        document.head.appendChild(iosStyle);
        console.log('✅ iPhone Safari background optimizations applied');
    } else if (isMobile) {
        console.log('📱 Mobile device detected - standard optimizations');
    } else {
        console.log('💻 Desktop detected - standard configuration');
    }
});
