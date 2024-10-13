// contact.js
export const pageSetupConfig = {
    partials: [
        { url: 'includes/components/header.html', selector: '#header-placeholder' },
        { url: 'includes/components/contact.html', selector: '#contact-placeholder' },
        { url: 'includes/components/footer.html', selector: '#footer-placeholder' }
    ],
    components: [
        { url: './components/navigation.js', initFunction: 'setupNavigation' },
        { url: './components/mailto.js', initFunction: 'setupContactForm' }
        // Additional components can be added here
    ]
};
