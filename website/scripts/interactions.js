/**
 * Phase 3: Micro-interactions and Enhanced UX
 * The Rittenhouse Residence Homepage
 */

(function() {
  'use strict';

  // ========================================
  // STICKY NAVBAR ON SCROLL
  // ========================================
  function initStickyNav() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add "scrolled" class after scrolling down 100px
      if (currentScroll > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // ========================================
  // FLOATING BOOKING BAR
  // ========================================
  function initFloatingBookBar() {
    // Create the floating bar HTML
    const floatingBar = document.createElement('div');
    floatingBar.id = 'floating-book-bar';
    floatingBar.innerHTML = `
      <div class="bar-content">
        <div class="bar-text">
          <strong>Ready to Experience History?</strong>
          <small>Book your stay at 1822 Pine Street • From $1,600/night</small>
        </div>
        <div class="bar-buttons">
          <a href="https://www.airbnb.com/rooms/6000930" class="btn btn-gold" target="_blank" rel="noopener">Book on Airbnb</a>
          <a href="https://www.vrbo.com/757481" class="btn btn-outline" target="_blank" rel="noopener">Book on VRBO</a>
        </div>
        <button class="close-bar" aria-label="Close booking bar">&times;</button>
      </div>
    `;

    document.body.appendChild(floatingBar);

    // Show bar after scrolling past hero section
    let barDismissed = sessionStorage.getItem('bookingBarDismissed');

    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      const heroHeight = window.innerHeight * 0.85; // 85vh hero

      if (scrollPosition > heroHeight && !barDismissed) {
        floatingBar.classList.add('visible');
      } else if (scrollPosition <= heroHeight) {
        floatingBar.classList.remove('visible');
      }
    });

    // Close button functionality
    const closeBtn = floatingBar.querySelector('.close-bar');
    closeBtn.addEventListener('click', () => {
      floatingBar.classList.remove('visible');
      sessionStorage.setItem('bookingBarDismissed', 'true');
    });
  }

  // ========================================
  // INTERSECTION OBSERVER - FADE IN ANIMATIONS
  // ========================================
  function initScrollAnimations() {
    // Check if browser supports Intersection Observer
    if (!('IntersectionObserver' in window)) {
      // Fallback: just show all elements
      document.querySelectorAll('.fade-in-section, .glance-card, .story-card, .review, .timeline-item').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', // Trigger 100px before element enters viewport
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optionally unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
      '.fade-in-section, .glance-card, .story-card, .review, .timeline-item'
    );

    animatedElements.forEach(el => observer.observe(el));
  }

  // ========================================
  // SMOOTH SCROLL TO ANCHOR LINKS
  // ========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Ignore if it's just "#"
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
          const targetPosition = target.offsetTop - navbarHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ========================================
  // ADD FADE-IN CLASSES TO SECTIONS
  // ========================================
  function addAnimationClasses() {
    // Add fade-in class to major sections
    const sections = document.querySelectorAll('.at-a-glance, .photo-story, .the-story, .room-showcase, .reviews-section, .availability, .location-section, .final-cta');
    sections.forEach(section => {
      section.classList.add('fade-in-section');
    });
  }

  // ========================================
  // ENHANCE EXTERNAL LINKS
  // ========================================
  function enhanceExternalLinks() {
    // Add visual indicator and security attributes to external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      // Skip if it's a link to the same domain (includes github.io subdomains)
      const currentDomain = window.location.hostname;
      const linkDomain = link.hostname;

      // Check if it's truly external (not same domain or subdomain)
      const isExternal = linkDomain !== currentDomain &&
                         !linkDomain.endsWith(currentDomain);

      if (!isExternal) return;

      // For truly external links (Airbnb, VRBO, social media, etc.)
      // Add rel attributes for security
      if (!link.getAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
      }

      // Add target blank for external links only
      if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
      }
    });
  }

  // ========================================
  // PARALLAX EFFECT ON HERO (SUBTLE)
  // ========================================
  function initParallaxHero() {
    const hero = document.querySelector('.hero-image');
    if (!hero) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const heroHeight = document.querySelector('.hero-full')?.offsetHeight || 0;

          // Only apply parallax while hero is visible
          if (scrolled < heroHeight) {
            // Subtle parallax - move slower than scroll
            hero.style.transform = `translateY(${scrolled * 0.4}px)`;
          }

          ticking = false;
        });

        ticking = true;
      }
    });
  }

  // ========================================
  // LOADING INDICATOR (Hide once ready)
  // ========================================
  function hideLoadingIndicator() {
    document.body.classList.add('loaded');
  }

  // ========================================
  // ANALYTICS - Track CTA Clicks
  // ========================================
  function trackCTAClicks() {
    const ctaButtons = document.querySelectorAll('a[href*="airbnb"], a[href*="vrbo"], .btn-hero, .btn-accent');

    ctaButtons.forEach(button => {
      button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        const buttonHref = this.getAttribute('href');

        // Log to console (replace with actual analytics)
        console.log('CTA Click:', {
          text: buttonText,
          href: buttonHref,
          timestamp: new Date().toISOString()
        });

        // If you have Google Analytics:
        // gtag('event', 'cta_click', {
        //   'event_category': 'engagement',
        //   'event_label': buttonText,
        //   'value': buttonHref
        // });
      });
    });
  }

  // ========================================
  // IMAGE LIGHTBOX / GALLERY VIEWER
  // ========================================
  function initImageLightbox() {
    // Create lightbox HTML structure
    const lightbox = document.createElement('div');
    lightbox.id = 'image-lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <button class="lightbox-prev" aria-label="Previous image">‹</button>
        <button class="lightbox-next" aria-label="Next image">›</button>
        <img src="" alt="" class="lightbox-image">
        <div class="lightbox-caption"></div>
        <div class="lightbox-counter"></div>
      </div>
    `;
    document.body.appendChild(lightbox);

    // Get all gallery images
    const galleryImages = document.querySelectorAll('.gallery-image, img[src*="/images/"]');
    let currentIndex = 0;
    let imageArray = [];

    // Build array of images with their data
    galleryImages.forEach((img, index) => {
      imageArray.push({
        src: img.src,
        alt: img.alt || '',
        caption: img.alt || img.getAttribute('title') || ''
      });

      // Add click handler to open lightbox
      img.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = index;
        openLightbox();
      });

      // Make images look clickable
      img.style.cursor = 'pointer';
    });

    function openLightbox() {
      if (imageArray.length === 0) return;

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      showImage(currentIndex);
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Restore scroll
    }

    function showImage(index) {
      if (index < 0) index = imageArray.length - 1;
      if (index >= imageArray.length) index = 0;

      currentIndex = index;

      const imgData = imageArray[index];
      const lightboxImg = lightbox.querySelector('.lightbox-image');
      const caption = lightbox.querySelector('.lightbox-caption');
      const counter = lightbox.querySelector('.lightbox-counter');

      lightboxImg.src = imgData.src;
      lightboxImg.alt = imgData.alt;
      caption.textContent = imgData.caption;
      counter.textContent = `${index + 1} / ${imageArray.length}`;

      // Show/hide navigation buttons
      const prevBtn = lightbox.querySelector('.lightbox-prev');
      const nextBtn = lightbox.querySelector('.lightbox-next');

      if (imageArray.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
      }
    }

    function nextImage() {
      showImage(currentIndex + 1);
    }

    function prevImage() {
      showImage(currentIndex - 1);
    }

    // Event listeners
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);

    // Click outside image to close
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;

      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
      }
    });
  }

  // ========================================
  // INITIALIZE ALL FEATURES
  // ========================================
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Initialize all features
    addAnimationClasses();
    initStickyNav();
    initFloatingBookBar();
    initScrollAnimations();
    initSmoothScroll();
    enhanceExternalLinks();
    initParallaxHero();
    initImageLightbox();
    trackCTAClicks();
    hideLoadingIndicator();

    console.log('✨ Phase 3 interactions initialized (with image lightbox)');
  }

  // Start the magic!
  init();

})();
