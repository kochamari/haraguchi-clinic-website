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
        
        // iPhone用チェック柄背景を超強力に適用
        setTimeout(() => {
            console.log('🔍 強制背景適用開始...');
            
            // 最強の背景適用 - 絶対に表示される
            body.style.setProperty('background-color', '#e3f2fd', 'important');
            body.style.setProperty('background-image', `
                linear-gradient(45deg, rgba(173, 216, 230, 0.7) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(127, 179, 213, 0.6) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(99, 187, 208, 0.65) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(135, 206, 235, 0.55) 75%)
            `, 'important');
            body.style.setProperty('background-size', '25px 25px', 'important');
            body.style.setProperty('background-position', '0 0, 0 12px, 12px -12px, -12px 0px', 'important');
            body.style.setProperty('min-height', '100vh', 'important');
            
            // セクションにも強制適用
            const hero = document.querySelector('.hero');
            const features = document.querySelector('.clinic-features');
            const newsDigest = document.querySelector('.news-digest');
            
            if (hero) {
                hero.style.setProperty('background-color', 'rgba(173, 216, 230, 0.4)', 'important');
            }
            
            if (features) {
                features.style.setProperty('background-color', 'rgba(127, 179, 213, 0.35)', 'important');
            }
            
            if (newsDigest) {
                newsDigest.style.setProperty('background-color', 'rgba(135, 206, 235, 0.38)', 'important');
            }
            
            console.log('🎨 iPhone強力背景適用完了');
            
            // 確認
            setTimeout(() => {
                const finalStyle = window.getComputedStyle(body);
                console.log('🔍 最終背景確認:', finalStyle.backgroundImage);
                
                if (finalStyle.backgroundImage !== 'none' && finalStyle.backgroundImage !== '') {
                    console.log('✅ iPhone背景パターン表示成功！');
                } else {
                    console.log('❌ 背景表示失敗 - 再試行');
                    // 最後の手段
                    body.style.backgroundColor = '#bbdefb';
                    body.style.backgroundImage = 'repeating-linear-gradient(45deg, rgba(173, 216, 230, 0.5) 0px, rgba(173, 216, 230, 0.5) 10px, transparent 10px, transparent 20px)';
                }
            }, 500);
        }, 200);
        
        console.log('✅ iPhone最適化適用完了');
    } else {
        console.log('💻 デスクトップ/Android detected');
    }
});
