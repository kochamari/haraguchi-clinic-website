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

// 🚀 Ultra Think: Floating Modal Menu System for iPhone Safari
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Ultra Think Floating Menu System Started');
    
    // Element references with error handling
    const navToggle = document.querySelector('.nav-toggle');
    const floatingMenuOverlay = document.querySelector('#floating-menu-overlay');
    const floatingMenuModal = document.querySelector('#floating-menu-modal');
    const floatingMenuClose = document.querySelector('.floating-menu-close');
    const body = document.body;
    const html = document.documentElement;

    // Critical error checking
    if (!navToggle) {
        console.error('❌ Critical Error: .nav-toggle not found');
        return;
    }
    if (!floatingMenuOverlay) {
        console.error('❌ Critical Error: #floating-menu-overlay not found');
        return;
    }
    if (!floatingMenuModal) {
        console.error('❌ Critical Error: #floating-menu-modal not found');
        return;
    }

    console.log('✅ All floating menu elements found successfully');

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
                const isScrollable = element.closest('.floating-menu-modal');
                if (!isScrollable) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
    }

    // Floating menu opening function
    function openFloatingMenu() {
        if (isAnimating || isMenuOpen) return;
        
        isAnimating = true;
        isMenuOpen = true;
        
        // Store current scroll position for iPhone Safari
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Apply classes with proper timing
        requestAnimationFrame(() => {
            floatingMenuOverlay.classList.add('show');
            floatingMenuModal.classList.add('show');
            navToggle.classList.add('floating-menu-active');
            body.classList.add('floating-menu-open');
            
            // iPhone Safari specific scroll prevention
            if (isIOS) {
                body.style.top = `-${scrollPosition}px`;
                body.style.position = 'fixed';
                body.style.width = '100%';
            }
            
            // Update ARIA attributes
            navToggle.setAttribute('aria-expanded', 'true');
            navToggle.setAttribute('aria-label', 'メニューを閉じる');
            
            console.log('✅ Floating menu opened successfully');
            
            // Animation complete
            setTimeout(() => {
                isAnimating = false;
            }, 400);
        });
    }

    // Floating menu closing function
    function closeFloatingMenu() {
        if (isAnimating || !isMenuOpen) return;
        
        isAnimating = true;
        isMenuOpen = false;
        
        requestAnimationFrame(() => {
            floatingMenuOverlay.classList.remove('show');
            floatingMenuModal.classList.remove('show');
            navToggle.classList.remove('floating-menu-active');
            body.classList.remove('floating-menu-open');
            
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
            
            console.log('✅ Floating menu closed successfully');
            
            // Animation complete
            setTimeout(() => {
                isAnimating = false;
            }, 400);
        });
    }

    // Toggle function
    function toggleFloatingMenu() {
        if (isAnimating) return;
        
        if (isMenuOpen) {
            closeFloatingMenu();
        } else {
            openFloatingMenu();
        }
    }

    // Event Listeners
    
    // Hamburger button click
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🍔 Hamburger button clicked');
        toggleFloatingMenu();
    });

    // Touch events for iPhone Safari
    navToggle.addEventListener('touchstart', function(e) {
        e.stopPropagation();
    }, { passive: true });

    // Floating menu close button
    if (floatingMenuClose) {
        floatingMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('✕ Close button clicked');
            closeFloatingMenu();
        });
    }

    // Floating menu overlay click (close on outside click)
    floatingMenuOverlay.addEventListener('click', function(e) {
        if (e.target === floatingMenuOverlay) {
            console.log('🖱️ Overlay clicked - closing menu');
            closeFloatingMenu();
        }
    });

    // Menu link clicks
    const floatingMenuLinks = document.querySelectorAll('.floating-menu-list a');
    floatingMenuLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            console.log(`🔗 Floating menu link ${index + 1} clicked`);
            // Close menu after a brief delay to show visual feedback
            setTimeout(() => {
                closeFloatingMenu();
            }, 150);
        });
    });

    // ESC key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            console.log('⌨️ ESC key pressed - closing floating menu');
            closeFloatingMenu();
        }
    });

    // Window resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768 && isMenuOpen) {
                console.log('📱 Window resized to desktop - closing floating menu');
                closeFloatingMenu();
            }
        }, 250);
    });

    // Prevent iOS Safari bounce scrolling when floating menu is open
    if (isIOS) {
        document.addEventListener('touchmove', function(e) {
            if (isMenuOpen && !floatingMenuModal.contains(e.target)) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Initialize menu state
    closeFloatingMenu();
    
    console.log('🚀 Ultra Think Floating Menu System Initialized Successfully');
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