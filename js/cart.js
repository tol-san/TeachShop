// Shopping Cart Logic

const Cart = {
    key: 'techshop_cart',
    onUpdate: null, // Callback for UI updates

    get() {
        const cart = localStorage.getItem(this.key);
        return cart ? JSON.parse(cart) : [];
    },

    save(cart) {
        localStorage.setItem(this.key, JSON.stringify(cart));
        this.updateCount();
        if (this.onUpdate) this.onUpdate(); // Trigger UI refresh
    },

    add(productId) {
        // Look up product from global window.products
        const product = window.products ? window.products.find(p => p.id === productId) : null;

        if (!product) {
            console.error('Product not found for ID:', productId);
            return;
        }

        const cart = this.get();
        const existingItem = cart.find(item => item.id === productId);

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
        // Alert removed as requested
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
            const newQuantity = parseInt(quantity);
            if (newQuantity <= 0) {
                // Determine if we should remove or just stop at 1. 
                // Usually user expects < 1 to remove, or use remove button. 
                // Let's remove for standard cart behavior.
                this.remove(productId);
                return;
            }
            item.quantity = newQuantity;
        }
        this.save(cart);
    },

    clear() {
        localStorage.removeItem(this.key);
        this.updateCount();
        if (this.onUpdate) this.onUpdate();
    },

    updateCount() {
        const cart = this.get();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const badges = document.querySelectorAll('#cart-count');
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-block' : 'none';
        });
    }
};

// Expose globally
window.Cart = Cart;

// Initialize count on load
document.addEventListener('DOMContentLoaded', () => {
    Cart.updateCount();
});
