// components/navigation.js
export function setupNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
    });

    // Close menu when a navigation link is clicked (optional)
    navList.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            mainNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}
