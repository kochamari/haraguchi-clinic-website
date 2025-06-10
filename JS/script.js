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

// iPhone背景デバッグと最適化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Lightweight parallax effect initialized');
    
    // iPhone/iOS検出とデバッグ
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isIOS) {
        console.log('📱 iPhone/iOS detected');
        console.log('🌐 Browser:', isSafari ? 'Safari' : 'Other');
        
        // 背景要素の確認
        const body = document.body;
        const computedStyle = window.getComputedStyle(body);
        console.log('🎨 Body background:', computedStyle.background);
        console.log('🎨 Body background-image:', computedStyle.backgroundImage);
        
        // iOS用の追加最適化
        document.body.style.webkitTransform = 'translateZ(0)';
        document.body.style.webkitBackfaceVisibility = 'hidden';
        
        // iPhone用パララックス背景要素を動的作成（確実に動作）
        setTimeout(() => {
            console.log('🔍 iPhone用パララックス背景作成開始...');
            
            // 既存の背景要素があれば削除
            const existingBg = document.getElementById('mobile-parallax-bg');
            if (existingBg) existingBg.remove();
            
            // iOS対応の完全固定背景要素を作成
            const parallaxBg = document.createElement('div');
            parallaxBg.id = 'mobile-parallax-bg';
            parallaxBg.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: 
                    radial-gradient(ellipse at 20% 20%, rgba(99, 187, 208, 0.4) 0%, transparent 30%),
                    radial-gradient(ellipse at 80% 80%, rgba(127, 179, 213, 0.35) 0%, transparent 30%),
                    radial-gradient(circle at 50% 50%, rgba(173, 216, 230, 0.3) 0%, transparent 40%),
                    repeating-linear-gradient(
                        30deg,
                        transparent,
                        transparent 20px,
                        rgba(173, 216, 230, 0.08) 20px,
                        rgba(173, 216, 230, 0.08) 40px
                    );
                background-size: 120% 120%, 120% 120%, 150% 150%, 60px 60px;
                background-attachment: scroll !important;
                background-repeat: no-repeat;
                background-position: 0 0, 100% 100%, 50% 50%, 0 0;
                z-index: -10 !important;
                pointer-events: none;
                overflow: hidden;
                -webkit-transform: translate3d(0,0,0) !important;
                transform: translate3d(0,0,0) !important;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            `;
            
            // body の最初に挿入
            document.body.insertBefore(parallaxBg, document.body.firstChild);
            
            // セクション用パララックス要素も作成
            const sections = [
                { selector: '.hero', id: 'hero-parallax', speed: 0.3 },
                { selector: '.clinic-features', id: 'features-parallax', speed: 0.5 }
            ];
            
            sections.forEach(section => {
                const sectionEl = document.querySelector(section.selector);
                if (sectionEl) {
                    const existingSectionBg = document.getElementById(section.id);
                    if (existingSectionBg) existingSectionBg.remove();
                    
                    const sectionBg = document.createElement('div');
                    sectionBg.id = section.id;
                    sectionBg.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: 
                            radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.2) 0%, transparent 50%),
                            radial-gradient(circle at 70% 30%, rgba(135, 206, 235, 0.15) 0%, transparent 50%);
                        background-size: 80% 80%, 60% 60%;
                        background-attachment: local;
                        background-position: center center;
                        pointer-events: none;
                        z-index: 1;
                        transform: none !important;
                    `;
                    
                    // セクションの最初に挿入
                    sectionEl.style.position = 'relative';
                    sectionEl.insertBefore(sectionBg, sectionEl.firstChild);
                }
            });
            
            // 完全固定背景（強制固定）
            function forceFixedBackground() {
                if (parallaxBg) {
                    parallaxBg.style.position = 'fixed';
                    parallaxBg.style.top = '0px';
                    parallaxBg.style.left = '0px';
                    parallaxBg.style.transform = 'translate3d(0,0,0)';
                    parallaxBg.style.webkitTransform = 'translate3d(0,0,0)';
                }
                
                // セクション背景も固定
                sections.forEach(section => {
                    const element = document.getElementById(section.id);
                    if (element) {
                        element.style.transform = 'none';
                        element.style.webkitTransform = 'none';
                    }
                });
            }
            
            // スクロール時に強制固定
            let fixTicking = false;
            window.addEventListener('scroll', () => {
                if (!fixTicking) {
                    requestAnimationFrame(() => {
                        forceFixedBackground();
                        fixTicking = false;
                    });
                    fixTicking = true;
                }
            }, { passive: true });
            
            // 初期固定
            forceFixedBackground();
            
            console.log('🔒 スマホ用強制固定背景設定完了');
            
            console.log('🎨 iPhone用パララックス背景作成完了');
            console.log('✅ 背景要素:', document.getElementById('mobile-parallax-bg') ? '作成成功' : '作成失敗');
        }, 300);
        
        console.log('✅ iPhone最適化適用完了');
    } else {
        console.log('💻 デスクトップ/Android detected');
    }
});
