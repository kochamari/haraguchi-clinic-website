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

// Mobile Navigation Toggle - 完全新規実装
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('#main-menu');
    const body = document.body;

    // 要素の存在チェック
    if (!navToggle || !mainNav) {
        console.warn('Navigation elements not found');
        return;
    }

    // 初期状態を設定
    navToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('nav-active');
    navToggle.classList.remove('active');
    body.classList.remove('nav-open');

    // メニューを開く関数
    function openMobileMenu() {
        console.log('Opening mobile menu');
        navToggle.setAttribute('aria-expanded', 'true');
        mainNav.classList.add('nav-active');
        navToggle.classList.add('active');
        body.classList.add('nav-open');
    }

    // メニューを閉じる関数
    function closeMobileMenu() {
        console.log('Closing mobile menu');
        navToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('nav-active');
        navToggle.classList.remove('active');
        body.classList.remove('nav-open');
    }

    // メニューの状態を切り替える関数
    function toggleMobileMenu() {
        const isOpen = mainNav.classList.contains('nav-active');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // ハンバーガーボタンのクリックイベント
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });

    // メニューリンクのクリックでメニューを閉じる
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // オーバーレイクリックでメニューを閉じる
    mainNav.addEventListener('click', function(e) {
        // メニューアイテム以外の場所（オーバーレイ部分）をクリックした場合
        if (e.target === mainNav) {
            closeMobileMenu();
        }
    });

    // Escapeキーでメニューを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('nav-active')) {
            closeMobileMenu();
        }
    });

    // 画面リサイズ時の処理
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
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

// iPhone背景固定とデバッグ最適化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Enhanced mobile background system initialized');
    
    // iPhone/iOS検出とデバッグ
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobile = window.innerWidth <= 768;
    
    if (isIOS || isMobile) {
        console.log('📱 Mobile device detected');
        console.log('🌐 Browser:', isSafari ? 'Safari' : 'Other');
        
        // iOS用の追加最適化
        document.body.style.webkitTransform = 'translateZ(0)';
        document.body.style.webkitBackfaceVisibility = 'hidden';
        
        // 背景固定用の完全に新しいアプローチ
        setTimeout(() => {
            console.log('🔒 Creating fixed background for mobile...');
            
            // 既存の背景要素があれば削除（クリーンアップ）
            const existingBg = document.getElementById('mobile-parallax-bg');
            if (existingBg) existingBg.remove();
            
            // 完全固定背景要素を作成
            const fixedBg = document.createElement('div');
            fixedBg.id = 'mobile-parallax-bg';
            fixedBg.className = 'mobile-fixed-bg';
            
            // PC版と同じ華やかな背景パターンを適用
            fixedBg.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                background: 
                    radial-gradient(ellipse at 20% 20%, rgba(99, 187, 208, 0.4) 0%, transparent 25%),
                    radial-gradient(ellipse at 80% 80%, rgba(127, 179, 213, 0.35) 0%, transparent 25%),
                    radial-gradient(circle at 60% 40%, rgba(173, 216, 230, 0.3) 0%, transparent 30%),
                    radial-gradient(ellipse at 40% 80%, rgba(135, 206, 235, 0.25) 0%, transparent 35%),
                    repeating-conic-gradient(
                        from 0deg at 50% 50%,
                        transparent 0deg,
                        rgba(99, 187, 208, 0.03) 30deg,
                        transparent 60deg,
                        rgba(127, 179, 213, 0.03) 90deg,
                        transparent 120deg
                    ),
                    repeating-linear-gradient(
                        30deg,
                        transparent,
                        transparent 20px,
                        rgba(173, 216, 230, 0.04) 20px,
                        rgba(173, 216, 230, 0.04) 40px
                    ),
                    repeating-linear-gradient(
                        -30deg,
                        transparent,
                        transparent 25px,
                        rgba(135, 206, 235, 0.03) 25px,
                        rgba(135, 206, 235, 0.03) 50px
                    ) !important;
                background-size: 150% 150%, 150% 150%, 200% 200%, 120% 120%, 300px 300px, 100px 100px, 120px 120px !important;
                z-index: -100 !important;
                pointer-events: none !important;
                -webkit-transform: translateZ(0) !important;
                transform: translateZ(0) !important;
                -webkit-backface-visibility: hidden !important;
                backface-visibility: hidden !important;
                will-change: transform !important;
            `;
            
            // body の最初に挿入
            document.body.insertBefore(fixedBg, document.body.firstChild);
            
            console.log('✅ Mobile fixed background created');
            
            // 背景固定維持機能
            function maintainFixedBackground() {
                const bgElement = document.getElementById('mobile-parallax-bg');
                if (bgElement) {
                    // 完全固定を強制
                    bgElement.style.position = 'fixed';
                    bgElement.style.top = '0px';
                    bgElement.style.left = '0px';
                    bgElement.style.transform = 'translate3d(0,0,0)';
                    bgElement.style.webkitTransform = 'translate3d(0,0,0)';
                }
            }
            
            // スクロール時とリサイズ時に背景固定を維持
            let fixTicking = false;
            const maintainBackground = () => {
                if (!fixTicking) {
                    requestAnimationFrame(() => {
                        maintainFixedBackground();
                        fixTicking = false;
                    });
                    fixTicking = true;
                }
            };
            
            window.addEventListener('scroll', maintainBackground, { passive: true });
            window.addEventListener('resize', maintainBackground, { passive: true });
            window.addEventListener('orientationchange', maintainBackground, { passive: true });
            
            // 初期固定
            maintainFixedBackground();
            
            console.log('🔒 Mobile background fix completed');
        }, 200);
        
        console.log('✅ Mobile optimization complete');
    } else {
        console.log('💻 Desktop detected - using standard background');
    }
});
