// index.js
export const pageSetupConfig = {
    partials: [
        { url: 'includes/components/header.html', selector: '#header-placeholder' },
        { url: 'includes/components/hero.html', selector: '#hero-placeholder' },
        { url: 'includes/components/cards.html', selector: '#cards-placeholder' },
        { url: 'includes/components/footer.html', selector: '#footer-placeholder' }
    ],
    components: [
        { url: './components/navigation.js', initFunction: 'setupNavigation' }
        // Additional components can be added here
    ]
};
