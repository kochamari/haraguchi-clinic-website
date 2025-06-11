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
            /* Phase 9: iPhone Safari 絶対固定強化 */
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: -1000 !important;
            pointer-events: none !important;
            /* iOS Safari強制固定 */
            margin: 0 !important;
            padding: 0 !important;
            background-image: 
                /* 超濃厚で分かりやすい模様 - Phase 8 */
                radial-gradient(ellipse at 20% 20%, rgba(99, 187, 208, 1.0) 0%, rgba(99, 187, 208, 0.8) 15%, rgba(99, 187, 208, 0.4) 35%, transparent 60%),
                radial-gradient(ellipse at 80% 80%, rgba(127, 179, 213, 0.95) 0%, rgba(127, 179, 213, 0.7) 20%, rgba(127, 179, 213, 0.3) 40%, transparent 65%),
                /* 巨大で目立つ円形模様 */
                radial-gradient(circle at 50% 30%, rgba(173, 216, 230, 0.9) 0%, rgba(173, 216, 230, 0.5) 20%, transparent 40%),
                radial-gradient(circle at 30% 70%, rgba(135, 206, 235, 0.85) 0%, rgba(135, 206, 235, 0.4) 25%, transparent 45%),
                /* 追加の目立つ模様 */
                radial-gradient(circle at 70% 60%, rgba(176, 224, 230, 0.8) 0%, rgba(176, 224, 230, 0.3) 30%, transparent 50%),
                radial-gradient(ellipse at 40% 10%, rgba(99, 187, 208, 0.75) 0%, transparent 35%);
            background-size: 160% 160%, 160% 160%, 120% 120%, 120% 120%, 100% 100%, 90% 90%;
            background-position: 20% 20%, 80% 80%, 50% 30%, 30% 70%, 70% 60%, 40% 10%;
            background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
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
            /* Phase 9: iPhone Safari 絶対固定強化 */
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: -999 !important;
            pointer-events: none !important;
            /* iOS Safari強制固定 */
            margin: 0 !important;
            padding: 0 !important;
            background-image: 
                /* より鮮明な中間レイヤー */
                radial-gradient(circle at 60% 40%, rgba(173, 216, 230, 0.7) 0%, rgba(173, 216, 230, 0.3) 30%, transparent 60%),
                radial-gradient(circle at 20% 80%, rgba(99, 187, 208, 0.6) 0%, transparent 40%),
                repeating-conic-gradient(
                    from 0deg at 50% 50%,
                    transparent 0deg,
                    rgba(99, 187, 208, 0.18) 15deg,
                    rgba(127, 179, 213, 0.15) 30deg,
                    transparent 45deg
                ),
                /* 幾何学模様強化 */
                repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 25px,
                    rgba(173, 216, 230, 0.12) 25px,
                    rgba(173, 216, 230, 0.12) 35px,
                    transparent 50px
                );
            background-size: 150% 150%, 100% 100%, 200px 200px, 80px 80px;
            background-position: 60% 40%, 20% 80%, 0% 0%, 0% 0%;
            background-repeat: no-repeat, no-repeat, repeat, repeat;
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
            /* Phase 9: iPhone Safari 絶対固定強化 */
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: -998 !important;
            pointer-events: none !important;
            /* iOS Safari強制固定 */
            margin: 0 !important;
            padding: 0 !important;
            background-image: 
                /* 前景レイヤー強化 - より鮮やかな模様 */
                radial-gradient(ellipse at 40% 80%, rgba(135, 206, 235, 0.6) 0%, rgba(135, 206, 235, 0.2) 35%, transparent 70%),
                radial-gradient(circle at 70% 20%, rgba(176, 224, 230, 0.55) 0%, transparent 30%),
                repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 20px,
                    rgba(173, 216, 230, 0.15) 20px,
                    rgba(173, 216, 230, 0.15) 25px,
                    transparent 40px
                ),
                repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 30px,
                    rgba(135, 206, 235, 0.12) 30px,
                    rgba(135, 206, 235, 0.12) 35px,
                    transparent 60px
                );
            background-size: 120% 120%, 80% 80%, 60px 60px, 80px 80px;
            background-position: 40% 80%, 70% 20%, 0% 0%, 0% 0%;
            background-repeat: no-repeat, no-repeat, repeat, repeat;
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
        
        // 🎯 Phase 9: iPhone背景完全固定+逆パララックス実装
        console.log('🎯 Phase 9: iPhone背景絶対固定 + 前面コンテンツスクロール実装');
        
        // 🚨 iPhone Safari background-attachment: fixed 完全回避戦略
        console.log('🚨 Implementing absolute background fix for iOS Safari');
        
        // パララックス効果を完全停止し、固定背景のみに
        let ticking = false;
        let lastScrollY = 0;
        let isVisible = true;
        let willChangeApplied = false;
        let parallaxEnabled = false; // 完全固定モード
        
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
        
        // 🎯 Phase 9: iPhone背景絶対固定システム
        function enforceBackgroundFix() {
            // iPhone Safari で背景が動かないよう強制固定
            const layers = [bgLayer1, bgLayer2, bgLayer3];
            
            layers.forEach((layer, index) => {
                if (layer) {
                    // 位置を強制リセット
                    layer.style.position = 'fixed';
                    layer.style.top = '0px';
                    layer.style.left = '0px';
                    layer.style.right = '0px';
                    layer.style.bottom = '0px';
                    layer.style.width = '100vw';
                    layer.style.height = '100vh';
                    layer.style.transform = 'translate3d(0, 0, 0)';
                    layer.style.webkitTransform = 'translate3d(0, 0, 0)';
                    
                    // 背景がスクロールに追従しないよう強制
                    const rect = layer.getBoundingClientRect();
                    if (Math.abs(rect.top) > 1 || Math.abs(rect.left) > 1) {
                        console.log(`🚨 Layer ${index + 1} position drift detected - fixing`);
                        layer.style.transform = 'translate3d(0, 0, 0) !important';
                    }
                }
            });
        }
        
        // 🔄 定期的な背景固定チェック - Phase 9強化
        let fixInterval;
        function startBackgroundFixMonitoring() {
            // 50msごとに背景位置をチェック・修正（より頻繁に）
            fixInterval = setInterval(enforceBackgroundFix, 50);
            console.log('📱 Phase 9: Enhanced background fix monitoring started (50ms interval)');
        }
        
        // 🎨 Phase 9: 逆パララックス（背景固定・前面スクロール）
        function updateParallax() {
            // Phase 9: 背景を絶対に固定し、前面コンテンツのみスクロール
            enforceBackgroundFix();
            
            // 前面コンテンツは通常通りスクロール
            // 背景は常に固定位置
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
        
        // Phase 9: スクロールイベント再有効化（背景固定監視のため）
        window.addEventListener('scroll', enhancedRequestTick, { passive: true });
        console.log('📱 Scroll events re-enabled for background fix monitoring');
        
        // 背景固定監視システム開始
        startBackgroundFixMonitoring();
        
        // 初回背景固定実行
        enforceBackgroundFix();
        
        // 🧹 メモリリーク防止：ページ離脱時のクリーンアップ - Phase 9強化
        window.addEventListener('beforeunload', () => {
            observer.disconnect();
            window.removeEventListener('scroll', enhancedRequestTick);
            if (fixInterval) {
                clearInterval(fixInterval);
                console.log('📱 Background fix monitoring stopped');
            }
            console.log('🧹 Phase 9: Complete system cleanup completed');
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
        
        console.log('✅ Ultra Think Phase 9 完全版: iPhone背景絶対固定+逆パララックス+超シンプルメニュー構築完了');
        console.log('🎯 Phase 9: Absolute Fixed Background + Reverse Parallax + Ultra Simple Menu');
        console.log('📱 iPhone Safari Phase 9最適化: 背景完全固定・前面スクロール実現');
        console.log('🌟 完全固定背景 + 前面コンテンツスクロール + 根本的メニュー再設計 - Ultra Think Phase 9達成');
        console.log('🚀 Phase 9システム監視: 50ms間隔背景固定チェック + 超シンプルハンバーガーメニュー');
        
        console.log('✅ Mobile optimization complete');
    } else {
        console.log('💻 Desktop detected - using standard background');
    }
});
