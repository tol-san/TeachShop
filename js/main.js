// Main JS - handling page logic

document.addEventListener('DOMContentLoaded', () => {
    // Check which page we are on by looking for key elements
    if (document.getElementById('products-container')) {
        initProductsPage();
    }

    if (document.getElementById('product-detail-container')) {
        initProductDetailPage();
    }

    if (document.getElementById('cart-container')) {
        initCartPage();
    }
});

function initProductsPage() {
    const container = document.getElementById('products-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (!container) return; // Guard clause if we are on index.html but sharing script

    function renderProducts(filter = 'all') {
        container.innerHTML = ''; // Clear container

        const currentProducts = window.products || [];

        const filteredProducts = filter === 'all'
            ? currentProducts
            : currentProducts.filter(p => p.category === filter);

        if (filteredProducts.length === 0) {
            container.innerHTML = '<div class="col-12 text-center py-5"><p class="lead text-muted">No products found in this category.</p></div>';
            return;
        }

        filteredProducts.forEach(product => {
            // console.log('Rendering product:', product.name);
            const card = document.createElement('div');
            card.className = 'col-sm-6 col-lg-4 col-xl-3'; // Responsive grid

            // Format price: check if there's an original price for discount display
            const priceHtml = product.originalPrice
                ? `<span class="text-danger fw-bold">$${product.price}</span> <small class="text-muted text-decoration-line-through">$${product.originalPrice}</small>`
                : `<span class="text-success fw-bold">$${product.price}</span>`;

            card.innerHTML = `
                <div class="card h-100 border-0 shadow-sm hover-card product-card">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-img" alt="${product.name}" style="height: 200px; object-fit: contain; padding: 1rem;">
                        ${product.featured ? '<span class="position-absolute top-0 end-0 badge bg-danger m-2">Hot</span>' : ''}
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-dark">${product.name}</h5>
                        <p class="card-text small text-secondary mb-2">${product.specs}</p>
                        <div class="mt-auto">
                            <div class="mb-3">${priceHtml}</div>
                            <button class="btn btn-primary w-100 rounded-pill mb-2" onclick="Cart.add(products.find(p => p.id === ${product.id}))">Add to Cart</button>
                            <a href="product-detail.html?id=${product.id}" class="btn btn-outline-secondary w-100 rounded-pill">View Details</a>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Initial render
    renderProducts();

    // Check URL hash for initial filter (e.g. products.html#laptops)
    const hash = window.location.hash.substring(1);
    if (hash) {
        // Activate button
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === hash) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        renderProducts(hash);
    }

    // Filter Click Events
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // UI Toggle
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Render
            const filter = btn.dataset.filter;
            renderProducts(filter);

            // Update URL hash without scroll
            history.replaceState(null, null, `#${filter}`);
        });
    });
}

function initProductDetailPage() {
    const container = document.getElementById('product-detail-container');
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');

    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    const currentProducts = window.products || [];
    const product = currentProducts.find(p => p.id === productId);

    if (!product) {
        container.innerHTML = `
            <div class="text-center py-5">
                <h2 class="text-danger">Product Not Found</h2>
                <p class="lead">We couldn't find the product you're looking for.</p>
                <a href="products.html" class="btn btn-primary rounded-pill mt-3">Back to Products</a>
            </div>
        `;
        if (breadcrumbCurrent) breadcrumbCurrent.textContent = 'Not Found';
        return;
    }

    // Update Breadcrumb
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = product.name;
    document.title = `${product.name} - TechShop KH`;

    // Render Details
    const priceHtml = product.originalPrice
        ? `<h2 class="text-danger display-5 fw-bold mb-0 me-3">$${product.price}</h2> <h4 class="text-muted text-decoration-line-through mt-2">$${product.originalPrice}</h4>`
        : `<h2 class="text-success display-5 fw-bold mb-0">$${product.price}</h2>`;

    container.innerHTML = `
        <div class="row align-items-center bg-white rounded-4 shadow-sm p-4 border">
            <div class="col-md-6 mb-4 mb-md-0 text-center">
                <img src="${product.image}" alt="${product.name}" class="img-fluid" style="max-height: 400px; object-fit: contain;">
            </div>
            <div class="col-md-6">
                 <div class="mb-3">
                    <span class="badge bg-primary rounded-pill px-3 py-2 text-uppercase">${product.category}</span>
                    ${product.featured ? '<span class="badge bg-danger rounded-pill px-3 py-2 text-uppercase ms-2">Featured</span>' : ''}
                </div>
                <h1 class="display-5 fw-bold text-dark mb-3">${product.name}</h1>
                <div class="d-flex align-items-center mb-4">
                    ${priceHtml}
                </div>
                <p class="lead text-secondary mb-4">${product.description}</p>
                
                <div class="mb-4">
                    <h5 class="fw-bold text-dark mb-2">Specifications:</h5>
                    <ul class="list-group list-group-flush">
                        ${product.specs.split('•').map(spec => `<li class="list-group-item bg-transparent px-0"><i class="bi bi-check2-circle text-primary me-2"></i>${spec.trim()}</li>`).join('')}
                    </ul>
                </div>

                <div class="d-grid gap-2 d-md-flex">
                    <button class="btn btn-primary btn-lg rounded-pill px-5 flex-grow-1" onclick="Cart.add(products.find(p => p.id === ${product.id}))">Add to Cart</button>
                    <a href="products.html" class="btn btn-outline-secondary btn-lg rounded-pill px-4">Continue Shopping</a>
                </div>
            </div>
        </div>
    `;
}

function initCartPage() {
    const container = document.getElementById('cart-container');
    const cart = Cart.get();

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-cart-x display-1 text-muted mb-4"></i>
                <h2 class="h4">Your cart is empty</h2>
                <p class="text-muted mb-4">Looks like you haven't added any products yet.</p>
                <a href="products.html" class="btn btn-primary rounded-pill px-4">Start Shopping</a>
            </div>
        `;
        return;
    }

    let cartHtml = `
        <div class="row">
            <div class="col-lg-8">
                <div class="card border-0 shadow-sm rounded-4 mb-4">
                    <div class="card-body p-4">
                        <div class="table-responsive">
                            <table class="table align-middle">
                                <thead class="text-secondary">
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
    `;

    let grandTotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;
        cartHtml += `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" class="rounded-3 me-3" style="width: 60px; height: 60px; object-fit: contain;">
                        <h6 class="mb-0 fw-bold">${item.name}</h6>
                    </div>
                </td>
                <td class="fw-bold">$${item.price}</td>
                <td>
                    <div class="input-group input-group-sm" style="width: 100px;">
                        <button class="btn btn-outline-secondary" onclick="Cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                        <button class="btn btn-outline-secondary" onclick="Cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </td>
                <td class="fw-bold text-primary">$${itemTotal}</td>
                <td>
                    <button class="btn btn-link text-danger p-0" onclick="Cart.remove(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    cartHtml += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card border-0 shadow-sm rounded-4">
                    <div class="card-body p-4">
                        <h5 class="fw-bold mb-4">Order Summary</h5>
                        <div class="d-flex justify-content-between mb-3">
                            <span class="text-secondary">Subtotal</span>
                            <span class="fw-bold">$${grandTotal}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <span class="text-secondary">Shipping</span>
                            <span class="text-success fw-bold">Free</span>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between mb-4">
                            <span class="h5 fw-bold">Total</span>
                            <span class="h5 fw-bold text-primary">$${grandTotal}</span>
                        </div>
                        <button class="btn btn-primary w-100 rounded-pill py-2" onclick="alert('Checkout functionality coming soon!')">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = cartHtml;
}
