/**
 * Md. Nasimul Islam Rizvi - Personal Portfolio JavaScript
 * Interactive Features:
 * - Project Category Filter with smooth transitions
 * - Sticky Navbar Active State Scroll Spy
 * - Mobile Navigation Toggle
 * - Email Copy-to-Clipboard with visual feedback
 * - Smooth anchor scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  initScrollSpy();
  initMobileNav();
  initEmailCopy();
});

/* ==========================================================================
   1. Smart Project Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute('data-filter');

      // Update button active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards with smooth fade
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (selectedFilter === 'all' || category === selectedFilter) {
          card.style.display = 'flex';
          // Trigger reflow for transition
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            card.style.pointerEvents = 'auto';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px) scale(0.97)';
          card.style.pointerEvents = 'none';
          setTimeout(() => {
            if (card.style.opacity === '0') {
              card.style.display = 'none';
            }
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   2. Sticky Navbar Scroll Spy
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  function onScroll() {
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   3. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('active');
    toggleBtn.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  toggleBtn.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close menu on click outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('active');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.focus();
    }
  });
}

/* ==========================================================================
   4. Email Copy to Clipboard
   ========================================================================== */
function initEmailCopy() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyText = document.getElementById('copyBtnText');
  const email = 'hello@nasimulrizvi.com';

  if (!copyBtn || !copyText) return;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for non-https or restricted environments
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      const originalText = copyText.textContent;
      copyText.textContent = 'Copied!';
      copyBtn.style.borderColor = 'var(--accent)';
      copyBtn.style.color = 'var(--accent)';

      setTimeout(() => {
        copyText.textContent = originalText;
        copyBtn.style.borderColor = '';
        copyBtn.style.color = '';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  });
}
