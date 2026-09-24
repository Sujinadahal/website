// Mobile nav toggle + sticky header shadow + scroll-reveal
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('navtoggle');
  var links = document.getElementById('navlinks');
  if (toggle && links) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sticky header gets a shadow once the page scrolls
  var header = document.querySelector('header.site');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Scroll-reveal for elements marked .reveal — progressive enhancement only
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-ready');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // Contact form — submits to the backend API instead of reloading the page
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      var payload = {
        name: form.name.value,
        email: form.email.value,
        organization: form.organization.value,
        topic: form.topic.value,
        message: form.message.value
      };
      status.className = 'form-status';
      status.textContent = 'Sending…';
      status.style.display = 'block';
      try {
        var res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        var data = await res.json();
        if (res.ok && data.ok) {
          status.className = 'form-status ok';
          status.textContent = data.message || 'Thank you — your message has been received.';
          form.reset();
        } else {
          status.className = 'form-status err';
          status.textContent = data.error || 'Something went wrong. Please try again.';
        }
      } catch (err) {
        status.className = 'form-status err';
        status.textContent = 'Could not reach the server. Please try again shortly.';
      }
    });
  }

  // Dynamic testimonials block (fetched from /api/testimonials)
  var tContainer = document.getElementById('testimonials-list');
  if (tContainer) {
    var emptyMessage = tContainer.getAttribute('data-empty-message') || 'Testimonials will appear here once available.';
    fetch('/api/testimonials')
      .then(function (r) { return r.json(); })
      .then(function (items) {
        var real = (items || []).filter(function (t) {
          return t && t.quote && t.name && t.name.toLowerCase() !== 'name';
        });
        if (!real.length) {
          tContainer.innerHTML = '<p class="quote-note">' + emptyMessage + '</p>';
          return;
        }
        tContainer.innerHTML = real.map(function (t) {
          return '<div class="quote-card"><p>"' + t.quote + '"</p><cite>— ' + t.name + ', ' + t.role + '</cite></div>';
        }).join('');
      })
      .catch(function () {
        tContainer.innerHTML = '<p class="quote-note">' + emptyMessage + '</p>';
      });
  }
});
