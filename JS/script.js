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

// Floating Menu Navigation System - 完全新設計
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const floatingOverlay = document.querySelector('#floating-menu-overlay');
    const floatingModal = document.querySelector('#floating-menu-modal');
    const body = document.body;

    // 要素の存在チェック
    if (!navToggle || !floatingOverlay || !floatingModal) {
        console.warn('Floating menu elements not found');
        console.log('navToggle:', navToggle);
        console.log('floatingOverlay:', floatingOverlay);
        console.log('floatingModal:', floatingModal);
        return;
    }

    console.log('✅ Floating menu elements found successfully');

    // 初期状態を設定
    navToggle.setAttribute('aria-expanded', 'false');
    floatingOverlay.classList.remove('active', 'floating-in', 'floating-out');
    navToggle.classList.remove('active');
    body.classList.remove('floating-menu-open');

    // フローティングメニューを開く関数
    function openFloatingMenu() {
        console.log('🎈 Opening floating menu');
        navToggle.setAttribute('aria-expanded', 'true');
        floatingOverlay.classList.add('active', 'floating-in');
        floatingOverlay.classList.remove('floating-out');
        navToggle.classList.add('active');
        body.classList.add('floating-menu-open');
        
        // フォーカスをモーダル内の最初のリンクに移動
        const firstLink = floatingModal.querySelector('a');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
    }

    // フローティングメニューを閉じる関数
    function closeFloatingMenu() {
        console.log('🎈 Closing floating menu');
        navToggle.setAttribute('aria-expanded', 'false');
        floatingOverlay.classList.add('floating-out');
        floatingOverlay.classList.remove('floating-in');
        navToggle.classList.remove('active');
        body.classList.remove('floating-menu-open');
        
        // アニメーション完了後にactiveクラスを削除（1秒のアニメーション）
        setTimeout(() => {
            floatingOverlay.classList.remove('active', 'floating-out');
        }, 1000);
        
        // フォーカスをハンバーガーボタンに戻す
        navToggle.focus();
    }

    // メニューの状態を切り替える関数
    function toggleFloatingMenu() {
        const isOpen = floatingOverlay.classList.contains('active');
        if (isOpen) {
            closeFloatingMenu();
        } else {
            openFloatingMenu();
        }
    }

    // ハンバーガーボタンのクリックイベント
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🍔 Hamburger button clicked');
        toggleFloatingMenu();
    });

    // メニューリンクのクリックでメニューを閉じる
    const floatingMenuLinks = floatingModal.querySelectorAll('a');
    floatingMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('🔗 Menu link clicked:', this.textContent);
            closeFloatingMenu();
        });
    });

    // オーバーレイクリックでメニューを閉じる（モーダル外の部分）
    floatingOverlay.addEventListener('click', function(e) {
        if (e.target === floatingOverlay) {
            console.log('🎯 Overlay clicked');
            closeFloatingMenu();
        }
    });

    // Escapeキーでメニューを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && floatingOverlay.classList.contains('active')) {
            console.log('⌨️ Escape key pressed');
            closeFloatingMenu();
        }
    });

    // 画面リサイズ時の処理
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            console.log('📱 Screen resized to desktop');
            closeFloatingMenu();
        }
    });

    // タッチイベントの処理（iPhoneでの動作改善）
    let startY = 0;
    
    floatingOverlay.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    floatingOverlay.addEventListener('touchmove', function(e) {
        const currentY = e.touches[0].clientY;
        const diff = startY - currentY;
        
        // 上下スワイプでメニューを閉じる
        if (Math.abs(diff) > 100) {
            if (e.target === floatingOverlay) {
                closeFloatingMenu();
            }
        }
    }, { passive: true });
    
    console.log('🎈 Floating menu system initialized successfully');
});

// iPhone-compatible Parallax Effect
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 Initializing iPhone-compatible parallax effect');
    
    // Create parallax background element
    const parallaxBg = document.createElement('div');
    parallaxBg.className = 'parallax-bg';
    document.body.insertBefore(parallaxBg, document.body.firstChild);
    
    // Add class to body to hide CSS fallback
    document.body.classList.add('parallax-active');
    
    let ticking = false;
    
    function updateParallax() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const speed = 0.5; // パララックス速度調整
        
        // transform を使用してGPU加速
        const yPos = -(scrollTop * speed);
        parallaxBg.style.transform = `translate3d(0, ${yPos}px, 0)`;
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // スクロールイベントリスナー
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // リサイズ時の処理
    window.addEventListener('resize', function() {
        requestTick();
    }, { passive: true });
    
    // 初期実行
    updateParallax();
    
    console.log('✅ iPhone parallax effect initialized');
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
