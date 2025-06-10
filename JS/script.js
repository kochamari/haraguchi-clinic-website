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
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isMobileChrome = isChrome && /Mobile/.test(navigator.userAgent);
    const isMobile = window.innerWidth <= 768;
    
    if (isIOS || isMobile) {
        console.log('📱 Mobile device detected');
        console.log('🌐 Browser:', isSafari ? 'Safari' : (isMobileChrome ? 'Mobile Chrome' : 'Other'));
        
        // Chrome特有の問題に対応
        if (isMobileChrome) {
            console.log('🔧 Applying Chrome-specific optimizations');
            // Chrome用のシンプルな背景フォールバック
            document.body.style.background = `
                radial-gradient(ellipse at 20% 20%, rgba(99, 187, 208, 0.5) 0%, transparent 40%),
                radial-gradient(ellipse at 80% 80%, rgba(127, 179, 213, 0.45) 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, rgba(173, 216, 230, 0.4) 0%, transparent 50%),
                linear-gradient(135deg, 
                    rgba(240, 248, 255, 0.9) 0%, 
                    rgba(220, 240, 255, 0.6) 50%,
                    rgba(240, 248, 255, 0.9) 100%
                )
            `;
            document.body.style.backgroundSize = '120% 120%, 120% 120%, 150% 150%, 100% 100%';
        }
        
        // iOS用の追加最適化
        document.body.style.webkitTransform = 'translateZ(0)';
        document.body.style.webkitBackfaceVisibility = 'hidden';
        
        // 既存のJavaScript背景要素があれば削除
        const existingBg = document.getElementById('mobile-parallax-bg');
        if (existingBg) {
            console.log('🗑️ Removing existing JavaScript background element');
            existingBg.remove();
        }
        
        // 🧠 Ultra Think Phase 6: iPhone Safari根本制約調査
        console.log('🧠 Ultra Think Phase 6: iPhone Safari徹底調査 - 根本原因特定開始');
        
        // 🚨 Ultra Think Phase 6: 根本的アプローチ変更
        console.log('🚨 Canvas背景もカクつく → 完全新戦略: iPhone専用静的CSS背景');
        
        // Step 1: 全ての動的システムを完全削除
        const existingContainers = document.querySelectorAll('[id*="ios-fixed-bg"], [id*="mobile-parallax"], [id*="ultra-fixed-bg"], [id*="canvas"]');
        existingContainers.forEach(container => container.remove());
        
        // Step 2: iPhone Safari専用 - 完全静的背景戦略
        console.log('📱 iPhone Safari detected - implementing STATIC-ONLY background');
        
        // JavaScript制御を一切使わず、純粋CSSのみで背景を作成
        const iPhoneStaticBackground = document.createElement('div');
        iPhoneStaticBackground.id = 'iphone-static-ultimate-bg';
        
        // iPhone Safari専用 - 最もシンプルな固定背景
        iPhoneStaticBackground.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: -1000 !important;
            pointer-events: none !important;
            
            /* 純粋CSS背景 - JavaScript制御なし */
            background-image: 
                radial-gradient(ellipse at 20% 20%, rgba(99, 187, 208, 0.4) 0%, transparent 25%),
                radial-gradient(ellipse at 80% 80%, rgba(127, 179, 213, 0.35) 0%, transparent 25%),
                radial-gradient(circle at 60% 40%, rgba(173, 216, 230, 0.3) 0%, transparent 30%),
                radial-gradient(ellipse at 40% 80%, rgba(135, 206, 235, 0.25) 0%, transparent 35%),
                linear-gradient(135deg, 
                    rgba(240, 248, 255, 0.9) 0%, 
                    rgba(220, 240, 255, 0.6) 50%,
                    rgba(240, 248, 255, 0.9) 100%
                ) !important;
                
            background-size: 150% 150%, 150% 150%, 200% 200%, 120% 120%, 100% 100% !important;
            background-repeat: no-repeat !important;
            background-position: 0% 0%, 100% 100%, 60% 40%, 40% 80%, 0% 0% !important;
            background-attachment: scroll !important;
            
            /* iPhone Safari最適化 - 動きを完全阻止 */
            transform: translate3d(0, 0, 0) !important;
            -webkit-transform: translate3d(0, 0, 0) !important;
            backface-visibility: hidden !important;
            -webkit-backface-visibility: hidden !important;
            will-change: auto !important;
            
            /* 固定化強制 */
            display: block !important;
            overflow: hidden !important;
        `;
        
        // Step 3: 静的背景をDOM挿入（JavaScript制御なし）
        document.body.insertBefore(iPhoneStaticBackground, document.body.firstChild);
        
        // Step 4: iPhone専用 - 最小限の安定化処理
        console.log('📱 iPhone Static Background System Initialized');
        console.log('🎯 Strategy: Zero JavaScript Control - Pure CSS Only');
        console.log('✅ Background Position: COMPLETELY STATIC');
        
        // Step 5: iPhone緊急時のみの最小限監視（CSS固定優先）
        let emergencyFixActive = false;
        
        function iPhoneEmergencyStabilizer() {
            if (!emergencyFixActive) {
                emergencyFixActive = true;
                
                setTimeout(() => {
                    const staticBg = document.getElementById('iphone-static-ultimate-bg');
                    if (staticBg) {
                        // 緊急時のみ - 位置を強制リセット
                        const rect = staticBg.getBoundingClientRect();
                        if (Math.abs(rect.top) > 1 || Math.abs(rect.left) > 1) {
                            console.log('🚨 Emergency position reset for iPhone static background');
                            staticBg.style.position = 'fixed';
                            staticBg.style.top = '0px';
                            staticBg.style.left = '0px';
                            staticBg.style.transform = 'translate3d(0, 0, 0)';
                        }
                    }
                    emergencyFixActive = false;
                }, 50);
            }
        }
        
        // 最小限のイベント監視（緊急時のみ）
        window.addEventListener('scroll', iPhoneEmergencyStabilizer, { passive: true });
        
        console.log('✅ Ultra Think Phase 6: iPhone専用静的背景システム構築完了');
        console.log('🎯 Static CSS背景 - JavaScript制御最小限');
        console.log('📱 iPhone Safari最適化戦略: PURE CSS APPROACH');
        console.log('🌟 カクつき問題 - 静的アプローチで解決予定');
        
        console.log('✅ Mobile optimization complete');
    } else {
        console.log('💻 Desktop detected - using standard background');
    }
});
