
// MODA CRISTÃ — CATÁLOGO DIGITAL

const WHATSAPP_NUMBER = "5544999461196";
const SIZES = ["P", "M", "G", "GG", "XG"];

// CATÁLOGO DE PRODUTOS
const products = [
  {
    id: 1,
    name: "Camiseta Gucci",
    gender: "masculino",
    description: "Modelo estampado. Consulte disponibilidade.",
    price: 59.99,
    image: "./assets/manequim-gucci.jpg",
    tag: "DESTAQUE"
  },
  {
    id: 2,
    name: "Camiseta Jesus Meu Maior Amor",
    gender: "feminino",
    description: "Estampa temática. Consulte disponibilidade.",
    price: 48.99,
    image: "./assets/manequim-jesus.jpg",
    tag: "FÉ E ESTILO"
  },
  {
    id: 3,
    name: "Camiseta D&G",
    gender: "masculino",
    description: "Modelo estampado. Consulte disponibilidade.",
    price: 55.90,
    image: "./assets/camiseta-dg-manequim.jpg",
    tag: "DESTAQUE"
  },
  {
    id: 4,
    name: "Camiseta Preta Estilo Britânico",
    gender: "masculino",
    description: "Camiseta preta com estampa e detalhes em tom claro.",
    price: 60.00,
    image: "./assets/camiseta-burberry-clean.jpg",
    tag: "NOVIDADE"
  },
  {
    id: 5,
    name: "Camiseta Preta Clássica",
    gender: "masculino",
    description: "Modelo preto com detalhes verdes e visual esportivo.",
    price: 69.90,
    image: "./assets/camiseta-lacoste-clean.jpg",
    tag: "NOVIDADE"
  },
  {
    id: 6,
    name: "Camiseta Em Tudo Dai Graças",
    gender: "feminino",
    description: "Camiseta branca com mensagem inspirada em 1 Tessalonicenses 5:18.",
    price: 59.90,
    image: "./assets/camiseta-gratidao-clean.jpg",
    tag: "FÉ E ESTILO"
  }
];

let activeFilter = document.body.dataset.filter || "todos";

// FORMATAÇÃO DE PREÇOS
function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// LINK DO WHATSAPP
function whatsappLink(product, size) {
  const message =
    `Olá! Tenho interesse na ${product.name}, tamanho ${size}, por ${formatPrice(product.price)}. Poderia me informar a disponibilidade?`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// EXIBIR PRODUTOS
function renderProducts() {
  const container = document.getElementById("products");

  if (!container) return;

  const visible = products.filter(product =>
    activeFilter === "todos" || product.gender === activeFilter
  );

  if (!visible.length) {
    container.innerHTML =
      '<p class="no-products">Ainda não há produtos cadastrados.</p>';
    return;
  }

  container.innerHTML = visible.map(product => `
    <article class="product-card">

      <div class="product-image">
        <img
          class="real-product"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        ${product.tag ? `<span class="tag">${product.tag}</span>` : ""}
      </div>

      <div class="product-info">

        <p class="product-category">
          ${product.gender === "masculino" ? "MASCULINA" : "FEMININA"}
        </p>

        <h3>${product.name}</h3>

        <p class="product-price">
          ${formatPrice(product.price)}
        </p>

        <p class="product-description">
          ${product.description}
        </p>

        <label class="size-label" for="size-${product.id}">
          TAMANHO
        </label>

        <select
          class="size-select"
          id="size-${product.id}"
          aria-label="Escolha o tamanho de ${product.name}"
        >
          ${SIZES.map(size =>
            `<option value="${size}">${size}</option>`
          ).join("")}
        </select>

        <a
          class="product-whatsapp"
          href="${whatsappLink(product, "P")}"
          data-product="${product.id}"
          target="_blank"
          rel="noopener"
        >
          CONSULTAR NO WHATSAPP ↗
        </a>

      </div>
    </article>
  `).join("");

  // VERIFICAR SE AS IMAGENS CARREGARAM
  container.querySelectorAll(".real-product").forEach(img => {
    img.addEventListener("error", () => {
      console.error("Não foi possível carregar a imagem:", img.src);

      img.alt = "Imagem não encontrada: " + img.alt;

      img.style.display = "none";

      const aviso = document.createElement("p");
      aviso.textContent = "Imagem não encontrada. Confira o arquivo no GitHub.";
      aviso.style.padding = "25px 10px";
      aviso.style.textAlign = "center";
      aviso.style.color = "#b00020";
      aviso.style.fontSize = "12px";

      img.parentElement.appendChild(aviso);
    });
  });

  // ATUALIZAR TAMANHO NO WHATSAPP
  container.querySelectorAll(".size-select").forEach(select => {
    select.addEventListener("change", () => {
      const id = Number(select.id.replace("size-", ""));

      const product = products.find(p => p.id === id);

      const link = container.querySelector(
        `.product-whatsapp[data-product="${id}"]`
      );

      if (product && link) {
        link.href = whatsappLink(product, select.value);
      }
    });
  });
}

// INICIAR CATÁLOGO
renderProducts();
