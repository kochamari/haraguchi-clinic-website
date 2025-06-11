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

// 🍔 Phase 9: ハンバーガーメニュー根本再設計 - 超シンプル化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 Phase 9: Hamburger menu fundamental redesign - Ultra Simple');
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('#main-menu');
    const body = document.body;

    // 要素の存在チェック
    if (!navToggle || !navMenu) {
        console.warn('❌ Menu elements not found');
        return;
    }

    console.log('✅ Menu elements found:', navToggle, navMenu);

    let isMenuOpen = false;

    // 🎯 超シンプルなメニュー制御
    function toggleMenu() {
        console.log('🔄 Toggling menu, current state:', isMenuOpen);
        
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            // メニューを開く - 超シンプル
            navMenu.classList.add('nav-active');
            navToggle.classList.add('active');
            body.classList.add('nav-open');
            navToggle.setAttribute('aria-expanded', 'true');
            console.log('📱 Menu opened');
        } else {
            // メニューを閉じる - 超シンプル
            navMenu.classList.remove('nav-active');
            navToggle.classList.remove('active');
            body.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            console.log('📱 Menu closed');
        }
    }

    // 🎯 メニューを閉じる専用関数
    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            navMenu.classList.remove('nav-active');
            navToggle.classList.remove('active');
            body.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            console.log('📱 Menu force closed');
        }
    }

    // 🔧 イベントリスナー - 超シンプル
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🍔 Toggle clicked');
        toggleMenu();
    });

    // メニューリンククリックで閉じる
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('📎 Nav link clicked');
            closeMenu();
        });
    });

    // オーバーレイクリックで閉じる
    navMenu.addEventListener('click', function(e) {
        if (e.target === navMenu) {
            console.log('🎯 Overlay clicked');
            closeMenu();
        }
    });

    // ESCキーで閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            console.log('⌨️ ESC pressed');
            closeMenu();
        }
    });

    // 画面リサイズで閉じる
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            console.log('📱 Resized to desktop');
            closeMenu();
        }
    });

    // 初期状態設定
    closeMenu();
    
    console.log('🍔 Ultra Simple Hamburger menu initialized');
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

// Add a class to the header when scrolled
window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

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

// Simple image loading debug for iPhone
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 iPhone画像デバッグ開始');
    
    const doctorImages = document.querySelectorAll('.doctor-photo');
    console.log('Doctor images found:', doctorImages.length);
    
    doctorImages.forEach(function(img, index) {
        console.log('Doctor image', index, ':', img.src);
        
        img.addEventListener('load', function() {
            console.log('✅ Image loaded successfully:', index);
        });
        
        img.addEventListener('error', function() {
            console.error('❌ Failed to load image:', img.src);
        });
        
        // Force refresh if needed
        if (!img.complete) {
            console.log('🔄 Forcing image reload:', index);
            const originalSrc = img.src;
            img.src = '';
            img.src = originalSrc;
        }
    });
});

// 📱 iPhone/スマホでもPC表示を忠実再現システム
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 PC表示忠実再現: iPhone最適化システム開始');
    
    // モバイルデバイス検出
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        console.log('📱 モバイルデバイス検出: PC表示を忠実に再現します');
        
        // PC用CSSの擬似要素背景をモバイルでも有効にする
        console.log('🎨 PC用背景システムをモバイルに適用中...');
        
        // iPhone Safari用最適化: PC用CSS背景を強制有効化
        const style = document.createElement('style');
        style.id = 'mobile-pc-faithful';
        style.textContent = `
            /* iPhone Safari専用: PC用背景を強制有効化 */
            @media (max-width: 768px) {
                /* PC用背景擬似要素を強制表示 */
                body::before {
                    display: block !important;
                    content: '' !important;
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    background-attachment: scroll !important; /* iPhone Safari対応 */
                }
                
                .hero::before {
                    display: block !important;
                    content: '' !important;
                    position: fixed !important;
                    background-attachment: scroll !important;
                }
                
                .clinic-features::before {
                    display: block !important;
                    content: '' !important;
                    position: fixed !important;
                    background-attachment: scroll !important;
                }
            }
        `;
        document.head.appendChild(style);
        console.log('✅ PC用背景システムをモバイルに適用完了');
        
        console.log('🎯 PC表示忠実再現完了: モバイル版最適化完了');
    } else {
        console.log('💻 Desktop detected - using standard background');
    }
});
