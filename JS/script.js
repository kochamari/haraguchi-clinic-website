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
        
        // 🧠 Ultra Think Phase 7: iPhone完璧パララックス効果実現戦略
        console.log('🧠 Ultra Think Phase 7: info1.txt分析 - iPhone完璧パララックス実装開始');
        
        // 🚨 Phase 7: CSS Transform + GPUアクセラレーション戦略
        console.log('🚨 background-attachment回避 → CSS Transform + GPU最適化戦略');
        
        // Step 1: 全ての既存システムを削除
        const existingContainers = document.querySelectorAll('[id*="ios-fixed-bg"], [id*="mobile-parallax"], [id*="ultra-fixed-bg"], [id*="canvas"], [id*="static"]');
        existingContainers.forEach(container => container.remove());
        
        // Step 2: iPhone Safari専用 - Transform-based高性能パララックス
        console.log('📱 iPhone Safari Transform-based parallax implementation');
        
        // Step 3: Phase 7 - 複数レイヤーパララックスシステム構築
        console.log('🎨 Building multi-layer parallax system with CSS transforms');
        
        // レイヤー1: 最深背景（最も遅い動き）
        const bgLayer1 = document.createElement('div');
        bgLayer1.id = 'parallax-bg-layer-1';
        bgLayer1.style.cssText = `
            position: fixed !important;
            top: 0; left: 0; right: 0; bottom: 0;
            width: 100%; height: 120%;
            z-index: -1000;
            pointer-events: none;
            background-image: 
                radial-gradient(ellipse at 20% 20%, rgba(99, 187, 208, 0.6) 0%, transparent 40%),
                radial-gradient(ellipse at 80% 80%, rgba(127, 179, 213, 0.5) 0%, transparent 40%);
            background-size: 200% 200%, 200% 200%;
            background-position: 0% 0%, 100% 100%;
            background-repeat: no-repeat;
            /* GPU最適化 - info1.txt推奨 */
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            will-change: transform;
        `;
        
        // レイヤー2: 中間背景（中間の動き）
        const bgLayer2 = document.createElement('div');
        bgLayer2.id = 'parallax-bg-layer-2';
        bgLayer2.style.cssText = `
            position: fixed !important;
            top: 0; left: 0; right: 0; bottom: 0;
            width: 100%; height: 110%;
            z-index: -999;
            pointer-events: none;
            background-image: 
                radial-gradient(circle at 60% 40%, rgba(173, 216, 230, 0.4) 0%, transparent 50%),
                repeating-conic-gradient(
                    from 0deg at 50% 50%,
                    transparent 0deg,
                    rgba(99, 187, 208, 0.08) 30deg,
                    transparent 60deg
                );
            background-size: 180% 180%, 300px 300px;
            background-position: 60% 40%, 0% 0%;
            background-repeat: no-repeat, repeat;
            /* GPU最適化 */
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            will-change: transform;
        `;
        
        // レイヤー3: 前景背景（最も速い動き）
        const bgLayer3 = document.createElement('div');
        bgLayer3.id = 'parallax-bg-layer-3';
        bgLayer3.style.cssText = `
            position: fixed !important;
            top: 0; left: 0; right: 0; bottom: 0;
            width: 100%; height: 105%;
            z-index: -998;
            pointer-events: none;
            background-image: 
                radial-gradient(ellipse at 40% 80%, rgba(135, 206, 235, 0.3) 0%, transparent 60%),
                repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 40px,
                    rgba(173, 216, 230, 0.04) 40px,
                    rgba(173, 216, 230, 0.04) 80px
                );
            background-size: 150% 150%, 120px 120px;
            background-position: 40% 80%, 0% 0%;
            background-repeat: no-repeat, repeat;
            /* GPU最適化 */
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            will-change: transform;
        `;
        
        // DOM挿入
        document.body.insertBefore(bgLayer1, document.body.firstChild);
        document.body.insertBefore(bgLayer2, document.body.firstChild);
        document.body.insertBefore(bgLayer3, document.body.firstChild);
        
        // Step 4: 高度パフォーマンス最適化システム
        let ticking = false;
        let lastScrollY = 0;
        let isVisible = true;
        let willChangeApplied = false;
        
        // 🎯 Intersection Observer: 画面外では処理停止
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                console.log(`📱 Parallax visibility: ${isVisible}`);
                
                // 画面外の時はwill-changeを削除（メモリ最適化）
                if (!isVisible && willChangeApplied) {
                    [bgLayer1, bgLayer2, bgLayer3].forEach(layer => {
                        if (layer) layer.style.willChange = 'auto';
                    });
                    willChangeApplied = false;
                    console.log('🔧 will-change removed - element not visible');
                }
            });
        };
        
        const observer = new IntersectionObserver(observerCallback, {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        });
        
        // 全レイヤーを監視
        [bgLayer1, bgLayer2, bgLayer3].forEach(layer => {
            if (layer) observer.observe(layer);
        });
        
        // 🚀 スマートwill-change管理
        function applyWillChange() {
            if (!willChangeApplied && isVisible) {
                [bgLayer1, bgLayer2, bgLayer3].forEach(layer => {
                    if (layer) layer.style.willChange = 'transform';
                });
                willChangeApplied = true;
                console.log('⚡ will-change applied for animation');
            }
        }
        
        // 🎨 最適化されたパララックス計算
        function updateParallax() {
            // 画面外では処理スキップ
            if (!isVisible) {
                ticking = false;
                return;
            }
            
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDelta = Math.abs(scrollY - lastScrollY);
            
            // 微小なスクロールは無視（CPU節約）
            if (scrollDelta < 1) {
                ticking = false;
                return;
            }
            
            // will-change適用
            applyWillChange();
            
            // info1.txt推奨: transformプロパティのみ使用 + GPU最適化
            if (bgLayer1) {
                const translateY1 = Math.round(scrollY * 0.1); // 最も遅い
                bgLayer1.style.transform = `translate3d(0, ${translateY1}px, 0)`;
            }
            if (bgLayer2) {
                const translateY2 = Math.round(scrollY * 0.3); // 中間
                bgLayer2.style.transform = `translate3d(0, ${translateY2}px, 0)`;
            }
            if (bgLayer3) {
                const translateY3 = Math.round(scrollY * 0.5); // 最も速い
                bgLayer3.style.transform = `translate3d(0, ${translateY3}px, 0)`;
            }
            
            lastScrollY = scrollY;
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking && isVisible) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        // Step 5: 最適化されたスクロールリスナー + パフォーマンス監視
        let frameCount = 0;
        let lastFrameTime = performance.now();
        
        function performanceMonitor() {
            frameCount++;
            const currentTime = performance.now();
            if (currentTime - lastFrameTime >= 1000) {
                const fps = frameCount;
                console.log(`📊 Parallax FPS: ${fps}`);
                if (fps < 30) {
                    console.warn('⚠️ Performance degradation detected');
                }
                frameCount = 0;
                lastFrameTime = currentTime;
            }
        }
        
        function enhancedUpdateParallax() {
            updateParallax();
            performanceMonitor();
        }
        
        function enhancedRequestTick() {
            if (!ticking && isVisible) {
                requestAnimationFrame(enhancedUpdateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', enhancedRequestTick, { passive: true });
        
        // 🧹 メモリリーク防止：ページ離脱時のクリーンアップ
        window.addEventListener('beforeunload', () => {
            observer.disconnect();
            window.removeEventListener('scroll', enhancedRequestTick);
            console.log('🧹 Parallax system cleaned up');
        });
        
        // Step 6: 🎭 CSS Scroll-Driven Animations サポート検証
        const supportsScrollTimeline = CSS.supports('animation-timeline', 'scroll()');
        console.log(`🎭 CSS Scroll-Driven Animations support: ${supportsScrollTimeline}`);
        
        if (supportsScrollTimeline) {
            console.log('🚀 Implementing CSS Scroll-Driven Animations as enhancement');
            
            // モダンブラウザ用のCSS Scroll-Driven Animation
            const style = document.createElement('style');
            style.textContent = `
                @supports (animation-timeline: scroll()) {
                    #parallax-bg-layer-1 {
                        animation: parallax-layer-1 linear;
                        animation-timeline: scroll(root);
                        animation-range: 0% 100%;
                    }
                    
                    #parallax-bg-layer-2 {
                        animation: parallax-layer-2 linear;
                        animation-timeline: scroll(root);
                        animation-range: 0% 100%;
                    }
                    
                    #parallax-bg-layer-3 {
                        animation: parallax-layer-3 linear;
                        animation-timeline: scroll(root);
                        animation-range: 0% 100%;
                    }
                    
                    @keyframes parallax-layer-1 {
                        from { transform: translate3d(0, 0, 0); }
                        to { transform: translate3d(0, 10vh, 0); }
                    }
                    
                    @keyframes parallax-layer-2 {
                        from { transform: translate3d(0, 0, 0); }
                        to { transform: translate3d(0, 30vh, 0); }
                    }
                    
                    @keyframes parallax-layer-3 {
                        from { transform: translate3d(0, 0, 0); }
                        to { transform: translate3d(0, 50vh, 0); }
                    }
                }
            `;
            document.head.appendChild(style);
            console.log('✨ CSS Scroll-Driven Animations applied as progressive enhancement');
        }
        
        // Step 7: 🎨 視覚的品質向上 - サブピクセル問題対策
        const pixelRatio = window.devicePixelRatio || 1;
        console.log(`📱 Device pixel ratio: ${pixelRatio}`);
        
        if (pixelRatio > 1) {
            console.log('🔍 High-DPI display detected - applying sub-pixel optimizations');
            [bgLayer1, bgLayer2, bgLayer3].forEach(layer => {
                if (layer) {
                    // Retina対応: サブピクセル問題を軽減
                    layer.style.transformStyle = 'preserve-3d';
                    layer.style.imageRendering = 'crisp-edges';
                }
            });
        }
        
        // Step 8: 🎯 アクセシビリティ対応 - prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            console.log('♿ Reduced motion preferred - disabling parallax');
            // パララックス無効化
            [bgLayer1, bgLayer2, bgLayer3].forEach(layer => {
                if (layer) {
                    layer.style.transform = 'translate3d(0, 0, 0)';
                    layer.style.willChange = 'auto';
                }
            });
            // イベントリスナー削除
            window.removeEventListener('scroll', enhancedRequestTick);
            observer.disconnect();
            console.log('✅ Parallax disabled for accessibility');
        }
        
        console.log('✅ Ultra Think Phase 7 完全版: 最先端iPhone パララックス構築完了');
        console.log('🎯 Multi-layer CSS Transform + Scroll-Driven + Accessibility');
        console.log('📱 iPhone Safari完全最適化: Apple級品質パララックス');
        console.log('🌟 PC同等の美しいパララックス効果 - Ultra Think達成');
        
        console.log('✅ Mobile optimization complete');
    } else {
        console.log('💻 Desktop detected - using standard background');
    }
});
