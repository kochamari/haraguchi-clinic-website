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
        
        // 既存のJavaScript背景要素があれば削除
        const existingBg = document.getElementById('mobile-parallax-bg');
        if (existingBg) {
            console.log('🗑️ Removing existing JavaScript background element');
            existingBg.remove();
        }
        
        // シンプルなパララックス効果をbody背景に適用
        console.log('🎨 Applying simple parallax effect to CSS background');
        
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5; // パララックスの強度（0.5 = 半分の速度）
            
            // body要素の背景位置を調整
            document.body.style.backgroundPosition = `center ${scrolled * parallaxSpeed}px`;
            
            ticking = false;
        }
        
        // スクロール時のパララックス効果
        function handleScroll() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        console.log('✅ Simple parallax effect applied');
        
        console.log('✅ Mobile optimization complete');
    } else {
        console.log('💻 Desktop detected - using standard background');
    }
});
