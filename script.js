// ========== PRODUCTS DATA ==========
const productsData = [
  { id: 1, name: "chaussures football Master Pro", price: "55 000 Ar", description: "Contrôle précis du ballon", image: "images/god0001.jpg", category: "chaussures" },
  { id: 2, name: "crampons ProMatch", price: "55 000 Ar", description: "Confort optimal et excellente adhérence", image: "images/god0002.webp", category: "chaussures" },
  { id: 3, name: "crampons Dynamic Play Pro", price: "42 000 Ar", description: "Confort et performance avancés", image: "images/god0003.jpg", category: "chaussures" },
  { id: 4, name: "chaussures-de-football-puma", price: "52 000 Ar", description: "Maîtrise totale du jeu", image: "images/god0004.jpg", category: "chaussures" },
  { id: 5, name: "Vakana tsileondozalahy", price: "3 000 Ar/paquet", description: "vakana malagasy", image: "images/vak001.jpg", category: "vakana" },
  { id: 6, name: "Vakana mafetena", price: "3 000 Ar/paquet", description: "vakana malagasy", image: "images/vak002.jpg", category: "vakana" },
  { id: 7, name: "Vakana tsiambanirafy", price: "3 000 Ar/paquet", description: "vakana malagasy", image: "images/vak003.jpg", category: "vakana" },
  { id: 8, name: "Vakana soamanodidina", price: "3 000 Ar/paquet", description: "vakana malagasy", image: "images/vak004.jpg", category: "vakana" },
  { id: 9, name: "Vakana manaribitanavavy", price: "3 000 Ar/paquet", description: "vakana malagasy", image: "images/vak005.jpg", category: "vakana" },
  { id: 10, name: "Vakana manaribitanalahy", price: "3 000 Ar/paquet", description: "vakana malagasy", image: "images/vak006.jpg", category: "vakana" },
  { id: 11, name: "Vakana felatanatsifona", price: "3 000 Ar/paquet", description: "vakana malagasy", image: "images/vak007.jpg", category: "vakana" },
  { id: 12, name: "Vakana tsimatindreo", price: "3 000 Ar/paquet", description: "vakana malagasy", image: "images/vak008.jpg", category: "vakana" },
  { id: 13, name: "Vakana ramilamina", price: "3 000 Ar/paquet", description: "vakana malagasy", image: "images/vak009.jpg", category: "vakana" },
  { id: 14, name: "Vakana madravasarotra", price: "3 000 Ar/paquet", description: "vakana malagasy", image: "images/vak010.jpg", category: "vakana" },
  { id: 15, name: "Vakana zanaharimanatrika", price: "3 000 Ar/paquet", description: "vakana malagasy", image: "images/vak011.jpg", category: "vakana" },
  { id: 16, name: "Vakana tongahasina fotsy", price: "3 000 Ar/paquet", description: "vakana malagasy", image: "images/vak012.jpg", category: "vakana" },
  { id: 17, name: "Téléphone portable", price: "250 000 Ar", description: "Smartphone 64Go", icon: "fa-mobile-alt", bg: "#d9f0ec", category: "electronique" },
  { id: 18, name: "Casque Bluetooth", price: "45 000 Ar", description: "Son clair", icon: "fa-headphones", bg: "#f0e6f5", category: "electronique" },
  { id: 19, name: "Lampe solaire", price: "22 000 Ar", description: "Autonome", icon: "fa-sun", bg: "#fff0cc", category: "maison" },
  { id: 20, name: "Coussin déco", price: "15 000 Ar", description: "Tissu local", icon: "fa-couch", bg: "#fce4b2", category: "maison" },
  { id: 21, name: "T-shirt moderne", price: "30 000 Ar", description: "T-shirt manja sy classique", image: "images/ts001.png", category: "vetements" },
  { id: 21, name: "T-shirt moderne", price: "30 000 Ar", description: "T-shirt manja sy classique", image: "images/ts002.png", category: "vetements" },
];

let currentCategory = "all";
let searchTerm = "";

// Affiche les boutons de catégories
function renderCategoryButtons() {
  const container = document.getElementById("categoriesContainer");
  if (!container) return;
  
  const cats = ["all", "chaussures", "vakana", "electronique", "maison", "vetements"];
  const names = {
    all: "📦 Rehetra",
    chaussures: "👟 Chaussures",
    vakana: "💎 Vakana",
    electronique: "📱 Électronique",
    maison: "🏠 Maison",
    vetements: "👕vêtements"
  };
  
  container.innerHTML = "";
  cats.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `cat-btn ${currentCategory === cat ? "active" : ""}`;
    btn.textContent = names[cat];
    btn.onclick = () => {
      currentCategory = cat;
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterAndRender();
    };
    container.appendChild(btn);
  });
}

// Filtre produit (catégorie + recherche)
function filterAndRender() {
  let filtered = productsData;
  if (currentCategory !== "all") {
    filtered = filtered.filter(p => p.category === currentCategory);
  }
  if (searchTerm.trim()) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  renderProducts(filtered);
}

// Affiche les produits dans la grille
function renderProducts(products) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;
  
  if (products.length === 0) {
    grid.innerHTML = "<div style='text-align:center;padding:3rem;'>❌ Tsy misy produit mifanaraka</div>";
    return;
  }
  
  grid.innerHTML = "";
  products.forEach(p => {
    const waMsg = encodeURIComponent(`Bonjour, je souhaite commander ${p.name} – Tout Pour Tous Mada`);
    const card = document.createElement("div");
    card.className = "product-card";
    
    let imageHtml;
    if (p.image) {
      imageHtml = `<div class="product-img" style="padding:0;"><img src="${p.image}" alt="${p.name}" class="product-clickable-img" style="width:100%; height:100%; object-fit:cover; display:block; cursor:pointer;" data-image="${p.image}"></div>`;
    } else {
      imageHtml = `<div class="product-img" style="background:${p.bg || '#f0f0f0'};"><i class="fas ${p.icon || 'fa-box'} fa-2x"></i></div>`;
    }
    
    card.innerHTML = `
      ${imageHtml}
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="price">${p.price}</div>
        <div class="description">${p.description}</div>
        <button class="whatsapp-btn" data-wa="https://wa.me/261332688967?text=${waMsg}">
          <i class="fab fa-whatsapp"></i> Commander via WhatsApp
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
  
  document.querySelectorAll(".whatsapp-btn").forEach(btn => {
    btn.onclick = () => window.open(btn.getAttribute("data-wa"), "_blank");
  });
  
  setupImageModal();
}

// Fonction pour le modal d'agrandissement d'image
function setupImageModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".modal-close");
  
  if (!modal) return;
  
  const productImages = document.querySelectorAll(".product-clickable-img");
  
  productImages.forEach(img => {
    img.onclick = (e) => {
      e.stopPropagation();
      modal.style.display = "block";
      modalImg.src = img.getAttribute("data-image") || img.src;
    };
  });
  
  modalImg.ondblclick = () => {
    modal.style.display = "none";
  };
  
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = "none";
    };
  }
  
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });
}

// Barre de recherche
function setupSearch() {
  const input = document.getElementById("searchInput");
  if (input) {
    input.oninput = (e) => {
      searchTerm = e.target.value;
      filterAndRender();
    };
  }
}

// Formulaire de contact
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById("contactName")?.value.trim();
      const email = document.getElementById("contactEmail")?.value.trim();
      const msg = document.getElementById("contactMsg")?.value.trim();
      
      if (!name || !email || !msg) {
        alert("Veuillez remplir tous les champs.");
        return;
      }
      
      const waMsg = encodeURIComponent(`Bonjour, je suis ${name} (${email}). Message: ${msg}`);
      window.open(`https://wa.me/261332688967?text=${waMsg}`, "_blank");
      alert("✅ Message envoyé ! Vous allez être redirigé vers WhatsApp.");
      form.reset();
    };
  }
}

// Mode sombre / clair
function initDarkMode() {
  const btn = document.getElementById("darkModeToggle");
  if (localStorage.getItem("dark") === "true") {
    document.body.classList.add("dark");
  }
  
  btn.onclick = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("dark", isDark);
    btn.textContent = isDark ? "☀️ Mode clair" : "🌓 Mode sombre";
  };
  
  btn.textContent = document.body.classList.contains("dark") ? "☀️ Mode clair" : "🌓 Mode sombre";
}

// Défilement en douceur
function setupSmoothScroll() {
  document.querySelectorAll(".nav-links a, footer a[href^='#']").forEach(link => {
    link.onclick = (e) => {
      const href = link.getAttribute("href");
      if (href && href[0] === "#") {
        e.preventDefault();
        const target = document.getElementById(href.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
  });
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  renderCategoryButtons();
  setupSearch();
  filterAndRender();
  setupContactForm();
  initDarkMode();
  setupSmoothScroll();
});