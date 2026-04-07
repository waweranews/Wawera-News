// ===== WAWERA NEWS - MAIN SCRIPT =====
// Inicialização e funcionalidades principais

document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Menu Mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Animação do ícone hambúrguer
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });
  }
  
  // Fechar menu ao clicar em um link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
  
  // 2. Scroll Reveal (Intersection Observer)
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => revealObserver.observe(el));
  
  // 3. Header Scroll Effect
  const header = document.querySelector('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = 'var(--shadow-md)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'var(--shadow-sm)';
    }
    
    lastScroll = currentScroll;
  });
  
  // 4. Filtros do Portfólio
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');
  
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Atualizar botão ativo
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  
  // 5. Newsletter Form (simulação)
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      if (email) {
        alert(`Obrigado por se inscrever, ${email}! Em breve você receberá nossas novidades.`);
        newsletterForm.reset();
      }
    });
  }
  
  // 6. Lazy Loading de Imagens
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // 7. Smooth Scroll para âncoras
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#0') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  
  // 8. Carregar conteúdo dinâmico (para integração com CMS)
  async function loadContent() {
    // Aqui você pode adicionar a lógica para buscar os posts do CMS
    // Exemplo: fetch('/content/posts.json') etc.
    console.log('CMS content loader ready');
  }
  
  loadContent();
  loadClients();
});

// Carregar clientes do CMS
async function loadClients() {
  try {
    const response = await fetch('/content/clients/clients.json');
    const clients = await response.json();
    const grid = document.querySelector('.clients-grid');
    
    if (grid && clients.length) {
      grid.innerHTML = clients
        .filter(client => client.active)
        .sort((a,b) => a.order - b.order)
        .map(client => `
          <div class="client-item">
            ${client.url ? `<a href="${client.url}" target="_blank" rel="noopener noreferrer">` : ''}
              <img src="${client.logo}" alt="${client.name}" class="client-logo grayscale">
            ${client.url ? '</a>' : ''}
          </div>
        `).join('');
    }
  } catch (error) {
    console.log('Clientes carregados estaticamente');
  }
}

// 9. Verificar se é admin (para exibir botão de edição)
function isAdminMode() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has('edit');
}

if (isAdminMode()) {
  // Adicionar barra de edição flutuante para administradores
  const editBar = document.createElement('div');
  editBar.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--primary);
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 9999;
    cursor: pointer;
    box-shadow: var(--shadow-md);
  `;
  editBar.innerHTML = '✏️ Editar Conteúdo';
  editBar.onclick = () => {
    window.location.href = '/admin/';
  };
  document.body.appendChild(editBar);
}
