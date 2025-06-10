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
        
        // 🧠 Ultra Think Phase 5: Canvas完全独立背景システム
        console.log('🧠 Ultra Think Phase 5: CSS制約完全回避 - Canvas背景レンダリング開始');
        
        // Step 1: 全ての既存システムを完全削除
        const existingContainers = document.querySelectorAll('[id*="ios-fixed-bg"], [id*="mobile-parallax"], [id*="ultra-fixed-bg"]');
        existingContainers.forEach(container => container.remove());
        
        // Step 2: CSS背景を完全無効化
        document.body.style.background = 'transparent !important';
        document.documentElement.style.background = 'transparent !important';
        
        // Step 3: 革命的Canvas背景システム構築
        const canvasBackground = document.createElement('canvas');
        canvasBackground.id = 'canvas-ultimate-background';
        canvasBackground.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: -1000 !important;
            pointer-events: none !important;
            display: block !important;
        `;
        
        // Step 4: iPhone 16 Pro Max専用Canvas背景システム
        function initializeCanvasSystem() {
            // iPhone 16 Pro Max検出
            const isIPhone16ProMax = (window.screen.width === 430 && window.screen.height === 932) ||
                                   (window.screen.width === 932 && window.screen.height === 430);
            
            console.log('📱 Device detected:', {
                width: window.screen.width,
                height: window.screen.height,
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                isIPhone16ProMax: isIPhone16ProMax
            });
            
            // Dynamic Island + Safe Area対応
            const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)') || '0');
            const safeAreaBottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)') || '0');
            
            // iPhone 16 Pro Max専用の高解像度対応
            const devicePixelRatio = isIPhone16ProMax ? 3 : (window.devicePixelRatio || 1);
            
            // 実際の表示領域を取得（Dynamic Island考慮）
            const actualWidth = window.innerWidth;
            const actualHeight = window.innerHeight;
            
            console.log('🎯 Canvas sizing:', {
                devicePixelRatio: devicePixelRatio,
                actualWidth: actualWidth,
                actualHeight: actualHeight,
                safeAreaTop: safeAreaTop,
                safeAreaBottom: safeAreaBottom
            });
            
            // Canvas サイズ設定（iPhone 16 Pro Max最適化）
            const canvasWidth = actualWidth * devicePixelRatio;
            const canvasHeight = actualHeight * devicePixelRatio;
            
            canvasBackground.width = canvasWidth;
            canvasBackground.height = canvasHeight;
            canvasBackground.style.width = actualWidth + 'px';
            canvasBackground.style.height = actualHeight + 'px';
            
            // iPhone 16 Pro Max専用position調整
            if (isIPhone16ProMax) {
                canvasBackground.style.cssText = `
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: ${actualWidth}px !important;
                    height: ${actualHeight}px !important;
                    z-index: -1000 !important;
                    pointer-events: none !important;
                    display: block !important;
                    transform: translateZ(0) !important;
                    -webkit-transform: translateZ(0) !important;
                    backface-visibility: hidden !important;
                    -webkit-backface-visibility: hidden !important;
                `;
            }
            
            // Canvas コンテキスト取得
            const ctx = canvasBackground.getContext('2d');
            ctx.scale(devicePixelRatio, devicePixelRatio);
            
            return ctx;
        }
        
        function drawCanvasBackground(ctx) {
            if (!ctx) {
                ctx = initializeCanvasSystem();
            }
            
            // Canvas をクリア
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // 🎨 Base gradient layer
            const baseGrad = ctx.createLinearGradient(0, 0, width, height);
            baseGrad.addColorStop(0, 'rgba(240, 248, 255, 0.9)');
            baseGrad.addColorStop(0.5, 'rgba(220, 240, 255, 0.6)');
            baseGrad.addColorStop(1, 'rgba(240, 248, 255, 0.9)');
            ctx.fillStyle = baseGrad;
            ctx.fillRect(0, 0, width, height);
            
            // 🎨 Radial Gradient 1 - 左上
            const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.2, 0, width * 0.2, height * 0.2, Math.min(width, height) * 0.4);
            grad1.addColorStop(0, 'rgba(99, 187, 208, 0.4)');
            grad1.addColorStop(0.25, 'rgba(99, 187, 208, 0.2)');
            grad1.addColorStop(1, 'transparent');
            ctx.fillStyle = grad1;
            ctx.fillRect(0, 0, width, height);
            
            // 🎨 Radial Gradient 2 - 右下
            const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.8, 0, width * 0.8, height * 0.8, Math.min(width, height) * 0.4);
            grad2.addColorStop(0, 'rgba(127, 179, 213, 0.35)');
            grad2.addColorStop(0.25, 'rgba(127, 179, 213, 0.2)');
            grad2.addColorStop(1, 'transparent');
            ctx.fillStyle = grad2;
            ctx.fillRect(0, 0, width, height);
            
            // 🎨 Radial Gradient 3 - 中央右
            const grad3 = ctx.createRadialGradient(width * 0.6, height * 0.4, 0, width * 0.6, height * 0.4, Math.min(width, height) * 0.5);
            grad3.addColorStop(0, 'rgba(173, 216, 230, 0.3)');
            grad3.addColorStop(0.3, 'rgba(173, 216, 230, 0.15)');
            grad3.addColorStop(1, 'transparent');
            ctx.fillStyle = grad3;
            ctx.fillRect(0, 0, width, height);
            
            // 🎨 Radial Gradient 4 - 左下
            const grad4 = ctx.createRadialGradient(width * 0.4, height * 0.8, 0, width * 0.4, height * 0.8, Math.min(width, height) * 0.45);
            grad4.addColorStop(0, 'rgba(135, 206, 235, 0.25)');
            grad4.addColorStop(0.35, 'rgba(135, 206, 235, 0.12)');
            grad4.addColorStop(1, 'transparent');
            ctx.fillStyle = grad4;
            ctx.fillRect(0, 0, width, height);
            
            // 🎨 Geometric Pattern Overlay
            ctx.fillStyle = 'rgba(173, 216, 230, 0.04)';
            for (let x = 0; x < width; x += 100) {
                for (let y = 0; y < height; y += 100) {
                    if ((x + y) % 200 === 0) {
                        ctx.fillRect(x, y, 40, 40);
                    }
                }
            }
            
            // 🎨 Subtle stripe pattern
            ctx.strokeStyle = 'rgba(99, 187, 208, 0.03)';
            ctx.lineWidth = 1;
            for (let i = 0; i < width; i += 80) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i + height * 0.3, height);
                ctx.stroke();
            }
            
            console.log('🎨 Canvas background rendered - 完全固定 (Enhanced)');
        }
        
        // Initialize Canvas system
        const ctx = initializeCanvasSystem();
        
        // Step 5: DOM挿入とCanvas描画実行
        document.body.insertBefore(canvasBackground, document.body.firstChild);
        drawCanvasBackground(ctx);
        
        // Step 6: iPhone 16 Pro Max専用監視システム
        let resizeTimeout;
        let scrollMonitorActive = false;
        
        function handleCanvasResize() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                console.log('📱 Resize detected - reinitializing Canvas for iPhone');
                
                // Canvas システム再初期化
                const resizedCtx = initializeCanvasSystem();
                
                // 背景再描画
                drawCanvasBackground(resizedCtx);
                console.log('🔄 Canvas background resized and redrawn for iPhone 16 Pro Max');
            }, 100);
        }
        
        // iPhone 16 Pro Max専用スクロール監視（デバッグ用）
        function iPhoneCanvasDebugMonitor() {
            if (!scrollMonitorActive) {
                scrollMonitorActive = true;
                
                requestAnimationFrame(() => {
                    const canvasElement = document.getElementById('canvas-ultimate-background');
                    if (canvasElement) {
                        const rect = canvasElement.getBoundingClientRect();
                        const computedStyle = window.getComputedStyle(canvasElement);
                        
                        console.log('📊 iPhone Canvas Status:', {
                            position: computedStyle.position,
                            top: computedStyle.top,
                            left: computedStyle.left,
                            width: computedStyle.width,
                            height: computedStyle.height,
                            rectTop: rect.top,
                            rectLeft: rect.left,
                            scrollY: window.scrollY,
                            timestamp: Date.now()
                        });
                        
                        // Canvas位置が動いている場合の緊急修正
                        if (rect.top !== 0 || rect.left !== 0) {
                            console.log('🚨 iPhone Canvas position drift detected - EMERGENCY FIX');
                            canvasElement.style.position = 'fixed';
                            canvasElement.style.top = '0px';
                            canvasElement.style.left = '0px';
                            canvasElement.style.transform = 'translateZ(0)';
                            canvasElement.style.webkitTransform = 'translateZ(0)';
                        }
                    }
                    
                    scrollMonitorActive = false;
                });
            }
        }
        
        // イベントリスナー追加
        window.addEventListener('resize', handleCanvasResize);
        window.addEventListener('orientationchange', handleCanvasResize);
        window.addEventListener('scroll', iPhoneCanvasDebugMonitor, { passive: true });
        window.addEventListener('touchstart', iPhoneCanvasDebugMonitor, { passive: true });
        window.addEventListener('touchmove', iPhoneCanvasDebugMonitor, { passive: true });
        
        console.log('✅ Ultra Think Phase 5: Canvas背景システム構築完了');
        console.log('🎯 Canvas背景は完全に固定されています（CSS制約完全回避）');
        console.log('📐 Canvas size:', canvasBackground.width, 'x', canvasBackground.height);
        console.log('🌟 iOS Safari背景移動問題 - 完全解決');
        
        console.log('✅ Mobile optimization complete');
    } else {
        console.log('💻 Desktop detected - using standard background');
    }
});
