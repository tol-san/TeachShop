const products = [
    {
        id: 1,
        name: "Dell XPS 13",
        category: "laptops",
        price: 1299,
        originalPrice: 1499,
        image: "images/dell.webp",
        specs: "Intel i7 • 16GB RAM • 512GB SSD • 13.3\" FHD",
        description: "The Dell XPS 13 is designed to be the best. With a 4-sided InfinityEdge display, it delivers an immersive screen experience.",
        featured: true
    },
    {
        id: 2,
        name: "MacBook Air M2",
        category: "laptops",
        price: 1099,
        originalPrice: 1199,
        image: "images/macbookm2.webp",
        specs: "Apple M2 • 8GB RAM • 256GB SSD • 13.6\" Retina",
        description: "Supercharged by M2. The MacBook Air is strikigly thin and fast.",
        featured: true
    },
    {
        id: 3,
        name: "ASUS ZenBook 14",
        category: "laptops",
        price: 999,
        originalPrice: null,
        image: "images/asuszenbook.webp",
        specs: "AMD Ryzen 7 • 16GB RAM • 1TB SSD • 14\" OLED",
        description: "Zenbook 14 OLED is built for effortless portability. It's your new favorite travel companion.",
        featured: false
    },
    {
        id: 4,
        name: "Gaming PC Pro",
        category: "desktops",
        price: 2199,
        originalPrice: 2499,
        image: "images/gammingPC.webp",
        specs: "RTX 4070 • Ryzen 9 • 32GB RAM • 1TB NVMe",
        description: "Dominate the competition with the Gaming PC Pro. High frames and low temperatures guaranteed.",
        featured: true
    },
    {
        id: 5,
        name: "Office Desktop Intel",
        category: "desktops",
        price: 699,
        originalPrice: null,
        image: "images/desktopoffice.webp",
        specs: "Intel i5 • 16GB RAM • 512GB SSD • Windows 11",
        description: "Reliable performance for your daily office tasks. Compact and efficient.",
        featured: false
    },
    {
        id: 6,
        name: "Mac Mini M2",
        category: "desktops",
        price: 699,
        originalPrice: null,
        image: "images/desktopmacbook.webp",
        specs: "Apple M2 • 16GB RAM • 512GB SSD • macOS",
        description: "More muscle. More hustle. The new Mac mini with M2 pro chip.",
        featured: false
    },
    {
        id: 7,
        name: "Logitech MX Master 3S",
        category: "accessories",
        price: 99,
        originalPrice: null,
        image: "images/mouse.webp",
        specs: "Wireless • 8000 DPI • Multi-device",
        description: "Meet the master. An icon remastered. Feel the performance.",
        featured: false
    },
    {
        id: 8,
        name: "Keychron K8 Pro",
        category: "accessories",
        price: 129,
        originalPrice: 149,
        image: "images/keyboard.webp",
        specs: "RGB • Hot-swappable • Bluetooth",
        description: "A wireless mechanical keyboard for everyone. VIA programmable.",
        featured: true
    },
    {
        id: 9,
        name: "Dell 27\" 4K Monitor",
        category: "accessories",
        price: 379,
        originalPrice: 429,
        image: "images/dellMonitor.webp",
        specs: "IPS • 4K UHD • USB-C • 60Hz",
        description: "See more and do more with a 27-inch 4K monitor.",
        featured: false
    }
];

// Make products available globally
window.products = products;
