// Shopping Cart Logic

const Cart = {
    key: 'techshop_cart',

    get() {
        const cart = localStorage.getItem(this.key);
        return cart ? JSON.parse(cart) : [];
    },

    save(cart) {
        localStorage.setItem(this.key, JSON.stringify(cart));
        this.updateCount();
    },

    add(product) {
        const cart = this.get();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.save(cart);
        alert('Item added to cart!');
    },

    remove(productId) {
        let cart = this.get();
        cart = cart.filter(item => item.id !== productId);
        this.save(cart);
    },

    updateQuantity(productId, quantity) {
        const cart = this.get();
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.remove(productId);
                return;
            }
        }
        this.save(cart);
    },

    clear() {
        localStorage.removeItem(this.key);
        this.updateCount();
    },

    updateCount() {
        const cart = this.get();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const badges = document.querySelectorAll('#cart-count');
        badges.forEach(badge => badge.textContent = count);
    }
};

// Expose globally
window.Cart = Cart;

// Initialize count on load
document.addEventListener('DOMContentLoaded', () => {
    Cart.updateCount();
});
