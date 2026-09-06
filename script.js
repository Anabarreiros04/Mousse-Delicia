const products = [
    {
        id: 1,
        name: "Mousse de Cacau com Abacate e Banana",
        cat: "saudavel",
        desc: "Cremoso, leve e saudável.",
        price: 15.00,
        img: "assets/abacata.jpeg"
    },
    {
        id: 2,
        name: "Mousse de Maracujá com Iogurte Grego",
        cat: "saudavel",
        desc: "O equilíbrio perfeito entre doce, azedinho e saudável.",
        price: 15.00,
        img: "assets/maracuja nat.png"
    },
    {
        id: 3,
        name: "Mousse de Chocolate",
        cat: "doce",
        desc: "Chocolate intenso com textura super cremosa.",
        price: 10.00,
        img: "assets/choc.jpeg"
    },
    {
        id: 4,
        name: "Mousse de Maracujá",
        cat: "doce",
        desc: "Intenso, cremoso e delicioso.",
        price: 8.00,
        img: "assets/mara.jpeg"
    },
    {
        id: 5,
        name: "Mousse de Morango",
        cat: "doce",
        desc: "Uma experiência deliciosa.",
        price: 8.00,
        img: "assets/moram.jpeg"
    },
    {
        id: 6,
        name: "Mousse Leve de Morango",
        cat: "saudavel",
        desc: "Leve, cremoso e com pedaços de morango.",
        price: 15.00,
        img: "assets/morango.jpeg"
    },
    {
        id: 7,
        name: "Mousse de Manga com Sementes de Chia",
        cat: "saudavel",
        desc: "Cremoso e refrescante.",
        price: 15.00,
        img: "assets/manga.jpeg"
    },
    {
        id: 8,
        name: "Mousse de Açaí com Morango e Banana",
        cat: "saudavel",
        desc: "Cremoso, saboroso e refrescante.",
        price: 15.00,
        img: "assets/açai.jpeg"
    },
    {
        id: 9,
        name: "Água",
        cat: "bebidas",
        desc: "Água mineral.",
        price: 3.00,
        img: "assets/agu.jpeg"
    },
    {
        id: 10,
        name: "Coca-Cola 600ml",
        cat: "bebidas",
        desc: "Coca-Cola 600ml.",
        price: 7.00,
        img: "assets/coc.jpg"
    },
    {
        id: 11,
        name: "Combo Delícia",
        cat: "combo",
        desc: "Mousse de Cacau com Abacate e Banana + Mousse de Açaí com Morango e Banana + Água.",
        price: 29.90,
        img: "assets/con aça"
    },
    {
        id: 12,
        name: "Combo Mara",
        cat: "combo",
        desc: "Mousse de Maracujá + Mousse de Maracujá com Iogurte Grego.",
        price: 19.90,
        img: "assets/con mara"
    },
    {
        id: 13,
        name: "Combo Doce",
        cat: "combo",
        desc: "Mousse de Chocolate + Mousse de Maracujá + Mousse de Morango.",
        price: 22.90,
        img: "assets/conbo"
    },
    {
        id: 14,
        name: "Azedinho Limão",
        cat: "saudavel",
        desc: "Mousse de Limão com o equilibrio correto nem muito doce nem muito citrico.",
        price: 15.00,
        img: "assets/aze.png"
    }
];


// ========================================
// CARRINHO
// ========================================

let cart = JSON.parse(
    localStorage.getItem("mousseCart") || "[]"
);


// ========================================
// AVALIAÇÕES DOS CLIENTES
//
// IMPORTANTE:
// As avaliações feitas na página avaliacao.html
// ficam salvas somente durante a sessão do navegador.
//
// Assim elas aparecem na página principal,
// mas desaparecem quando a aba/janela principal
// é fechada.
// ========================================

let customerReviews = [];


// ========================================
// FORMATAÇÃO DE DINHEIRO
// ========================================

function money(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// ========================================
// SALVAR CARRINHO
// ========================================

function save() {

    localStorage.setItem(
        "mousseCart",
        JSON.stringify(cart)
    );

    renderCart();

    document
        .querySelectorAll("[data-cart-count]")
        .forEach(element => {

            element.textContent = cart.reduce(
                (total, item) => total + item.qty,
                0
            );

        });
}


// ========================================
// ADICIONAR PRODUTO
// ========================================

function add(id) {

    const product = products.find(
        item => item.id === id
    );

    if (!product) return;

    const item = cart.find(
        item => item.id === id
    );

    if (item) {

        item.qty++;

    } else {

        cart.push({
            ...product,
            qty: 1
        });

    }

    save();

    toast("Adicionado ao pedido 💜");
}


// ========================================
// ALTERAR QUANTIDADE
// ========================================

function change(id, difference) {

    const item = cart.find(
        item => item.id === id
    );

    if (!item) return;

    item.qty += difference;

    if (item.qty <= 0) {

        cart = cart.filter(
            item => item.id !== id
        );

    }

    save();
}


// ========================================
// MENSAGEM
// ========================================

function toast(message) {

    const element =
        document.querySelector(".toast");

    if (!element) return;

    element.textContent = message;

    element.classList.add("show");

    setTimeout(() => {

        element.classList.remove("show");

    }, 2200);
}


// ========================================
// MOSTRAR PRODUTOS
// ========================================

function renderProducts(filter = "todos") {

    const box =
        document.querySelector("#product-grid");

    if (!box) return;

    const list =
        filter === "todos"
            ? products
            : products.filter(
                product => product.cat === filter
            );

    box.innerHTML = list.map(product => `

        <article class="card">

            <img
                class="card-img"
                src="${product.img}"
                alt="${product.name}"
            >

            <div class="card-body">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.desc}
                </p>

                <div class="price-row">

                    <span class="price">
                        ${money(product.price)}
                    </span>

                    <button
                        class="mini-btn"
                        onclick="add(${product.id})"
                    >
                        + Adicionar
                    </button>

                </div>

            </div>

        </article>

    `).join("");
}


// ========================================
// MOSTRAR CARRINHO
// ========================================

function renderCart() {

    const box =
        document.querySelector("#cart-list");

    const total =
        document.querySelector("#cart-total");

    if (!box || !total) return;

    if (!cart.length) {

        box.innerHTML = `
            <p style="color:var(--muted)">
                Seu pedido está vazio.
                Escolha uma delícia no cardápio. 🤍
            </p>
        `;

        total.textContent = money(0);

        return;
    }

    box.innerHTML = cart.map(item => `

        <div class="order-item">

            <div>

                <b>
                    ${item.name}
                </b>

                <br>

                <small>
                    ${money(item.price)} cada
                </small>

            </div>

            <div class="qty">

                <button
                    onclick="change(${item.id}, -1)"
                >
                    −
                </button>

                <b>
                    ${item.qty}
                </b>

                <button
                    onclick="change(${item.id}, 1)"
                >
                    +
                </button>

            </div>

        </div>

    `).join("");

    const cartTotal =
        cart.reduce(
            (total, item) =>
                total + item.price * item.qty,
            0
        );

    total.textContent =
        money(cartTotal);
}


// ========================================
// AVALIAÇÕES
// ========================================

function renderReviews() {

    const box =
        document.querySelector("#reviews");

    if (!box) return;


    // ====================================
    // AVALIAÇÕES FIXAS
    // ====================================

    const defaults = [

        {
            name: "Mariana",
            stars: 5,
            text: "O mousse de maracujá é maravilhoso! Muito cremoso.",
            img: "assets/avama.jfif"
        },

        {
            name: "Lucas",
            stars: 5,
            text: "Pedi o combo e chegou tudo bem embalado. Amei!",
            img: "assets/ava.png"
        },

        {
            name: "Beatriz",
            stars: 5,
            text: "Fiquei com medo de ser muito azedo mais não, e a sensação perfeita da cremosidade e refrescância com o equilíbrio perfeito entre o azedo e o doce.",
            img: "assets/avali.jfif"
        }

    ];


    // ====================================
    // JUNTAR:
    // AVALIAÇÕES DO CLIENTE + FIXAS
    // ====================================

    const allReviews = [
        ...customerReviews,
        ...defaults
    ];


    // ====================================
    // MOSTRAR TODAS
    // ====================================

    box.innerHTML = allReviews.map(review => {

        const stars = Math.min(
            5,
            Math.max(
                1,
                Number(review.stars) || 5
            )
        );

        return `

            <article class="review">

                <div class="stars">
                    ${"★".repeat(stars)}
                    ${"☆".repeat(5 - stars)}
                </div>

                <h3>
                    ${review.name}
                </h3>

                <p>
                    ${review.text}
                </p>

                ${
                    review.img
                    ? `
                        <img
                            src="${review.img}"
                            alt="Foto da avaliação de ${review.name}"
                        >
                    `
                    : ""
                }

                <small>
                    Avaliação verificada
                </small>

            </article>

        `;

    }).join("");
}


// ========================================
// CONFIGURAÇÃO DO SITE
// ========================================

function setup() {

    renderProducts();

    save();

    renderReviews();


    // ====================================
    // CATEGORIAS DO CARDÁPIO
    // ====================================

    document
        .querySelectorAll(".tab")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(".tab")
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });

                    button.classList.add("active");

                    renderProducts(
                        button.dataset.cat
                    );

                }
            );

        });


    // ====================================
    // BOTÕES DE ROLAGEM
    // ====================================

    document
        .querySelectorAll("[data-scroll]")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    document
                        .querySelector(
                            button.dataset.scroll
                        )
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                }
            );

        });


    // ====================================
    // FORMULÁRIO DE ENCOMENDA
    // ====================================

    document
        .querySelector("#order-form")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                if (!cart.length) {

                    toast(
                        "Adicione pelo menos um item 💜"
                    );

                    return;
                }

                toast(
                    "Pedido recebido! Entraremos em contato para confirmar. ✨"
                );

                cart = [];

                save();

                event.target.reset();

            }
        );


    // ====================================
    // FORMULÁRIO DE AVALIAÇÃO
    // ====================================

    document
        .querySelector("#review-form")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const file =
                    document
                        .querySelector("#photo")
                        ?.files?.[0];


                // ====================================
                // PUBLICAR A AVALIAÇÃO
                // ====================================

                const publish = (image = "") => {

                    const review = {

                        name:
                            event.target.name.value,

                        text:
                            event.target.text.value,

                        stars:
                            event.target.stars.value,

                        img:
                            image

                    };


                    // ====================================
                    // IMPORTANTE:
                    // NÃO USA LOCALSTORAGE
                    //
                    // A avaliação fica somente
                    // enquanto esta página estiver aberta.
                    // ====================================

                    customerReviews.unshift(
                        review
                    );


                    toast(
                        "Avaliação enviada! Obrigada 💜"
                    );


                    event.target.reset();


                    // Nome da foto

                    const photoName =
                        document.querySelector(
                            "#photo-name"
                        );

                    if (photoName) {

                        photoName.textContent =
                            "JPG, PNG ou WEBP";

                    }


                    // Remover prévia

                    const preview =
                        document.querySelector(
                            "#photo-preview"
                        );

                    if (preview) {

                        preview.remove();

                    }


                    // Atualizar avaliações

                    renderReviews();

                };


                // ====================================
                // SE TIVER FOTO
                // ====================================

                if (file) {

                    const reader =
                        new FileReader();


                    reader.onload =
                        () => {

                            publish(
                                reader.result
                            );

                        };


                    reader.readAsDataURL(file);

                } else {

                    publish();

                }

            }
        );


    // ========================================
    // PRÉ-VISUALIZAÇÃO DA FOTO
    // ========================================

    document
        .querySelector("#photo")
        ?.addEventListener(
            "change",
            event => {

                const file =
                    event.target.files[0];


                const photoName =
                    document.querySelector(
                        "#photo-name"
                    );


                if (photoName) {

                    photoName.textContent =
                        file
                            ? `Foto selecionada: ${file.name}`
                            : "JPG, PNG ou WEBP";

                }


                const oldPreview =
                    document.querySelector(
                        "#photo-preview"
                    );


                if (oldPreview) {

                    oldPreview.remove();

                }


                if (file) {

                    const image =
                        document.createElement("img");


                    image.id =
                        "photo-preview";


                    image.className =
                        "photo-preview";


                    image.alt =
                        "Prévia da foto";


                    image.src =
                        URL.createObjectURL(file);


                    document
                        .querySelector("#photo")
                        .insertAdjacentElement(
                            "afterend",
                            image
                        );

                }

            }
        );

}


// ========================================
// INICIAR SITE
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    setup
);