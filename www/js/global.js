// global.js
// Import navigation component as an example; more components can be added similarly.
import { setupNavigation } from './components/navigation.js';

document.addEventListener('DOMContentLoaded', initializePage);

/**
 * Configuration object for managing page setup.
 * Contains the partials and components to be loaded dynamically.
 */
const pageSetupConfig = {
    partials: [
        { url: 'includes/header.html', selector: '#header-placeholder' },
        { url: 'includes/hero.html', selector: '#hero-placeholder' },
        { url: 'includes/cards.html', selector: '#cards-placeholder' },
        { url: 'includes/contact.html', selector: '#contact-placeholder' },
        { url: 'includes/footer.html', selector: '#footer-placeholder' }
    ],
    components: [
        { path: './components/navigation.js', initFunction: 'setupNavigation' }
        // Additional components can be added here as { path: './components/<component>.js', initFunction: '<initializeFunction>' }
    ]
};

/**
 * Initializes the page by first loading the head partial, and then other partials and components concurrently.
 */
function initializePage() {
    // Load head partial first
    loadPartial('includes/head.html', '#head-placeholder')
        .then(() => {
            // After head is loaded, load remaining partials and components concurrently
            const { partials, components } = pageSetupConfig;

            // Load partials and components concurrently
            return Promise.all([loadPartials(partials), loadComponents(components)]);
        })
        .then(() => {
            console.log('Page initialized successfully');
        })
        .catch(handleError);
}

/**
 * Loads multiple partials from the provided configuration.
 * 
 * @param {Array<Object>} partials - Array of partial objects with `url` and `selector` keys.
 * @returns {Promise} - A promise that resolves when all partials are loaded.
 */
function loadPartials(partials) {
    return Promise.all(partials.map(({ url, selector }) => loadPartial(url, selector)));
}

/**
 * Fetches and inserts the content of a single partial into the DOM.
 * 
 * @param {string} url - The URL of the partial to load.
 * @param {string} selector - The CSS selector of the element where the partial should be inserted.
 * @returns {Promise} - A promise that resolves when the partial is successfully loaded and inserted.
 */
function loadPartial(url, selector) {
    return fetch(url)
        .then(checkResponse)
        .then(data => insertPartial(data, selector));
}

/**
 * Checks the response from a fetch request to ensure it was successful.
 * 
 * @param {Response} response - The fetch response object.
 * @returns {Promise<string>} - A promise that resolves with the response text if successful.
 * @throws {Error} - Throws an error if the response status is not OK (200-299).
 */
function checkResponse(response) {
    if (!response.ok) {
        throw new Error(`Failed to load: ${response.url}, status: ${response.statusText}`);
    }
    return response.text();
}

/**
 * Inserts the content of a partial into a DOM element specified by the selector.
 * 
 * @param {string} content - The HTML content to insert.
 * @param {string} selector - The CSS selector for the target element.
 */
function insertPartial(content, selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = content;
    } else {
        console.error(`Selector ${selector} not found in the DOM.`);
    }
}

/**
 * Dynamically loads components from the provided configuration.
 * Each component is dynamically imported, and its specified initialization function is called.
 * 
 * @param {Array<Object>} components - Array of component objects with `path` and `initFunction` keys.
 * @returns {Promise} - A promise that resolves when all components are loaded and initialized.
 */
function loadComponents(components) {
    return Promise.all(components.map(({ path, initFunction }) => {
        return import(path)
            .then(module => {
                if (module[initFunction] && typeof module[initFunction] === 'function') {
                    module[initFunction](); // Initialize the component.
                } else {
                    console.warn(`Initialization function ${initFunction} not found in ${path}`);
                }
            })
            .catch(error => {
                console.error(`Error loading component ${path}:`, error);
            });
    }));
}

/**
 * Handles errors that occur during the page initialization process.
 * 
 * @param {Error} error - The error object containing information about what went wrong.
 */
function handleError(error) {
    console.error('Error initializing page:', error.message);
}
