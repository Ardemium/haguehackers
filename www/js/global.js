// global.js
document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
    const pageName = getPageName(); // e.g., 'index', 'contact'
    const pageJsPath = `./pages/${pageName}.js`;

    // Dynamically import the per-page JS module
    import(pageJsPath)
        .then(module => {
            const pageSetupConfig = module.pageSetupConfig; // Assuming the module exports a pageSetupConfig object
            const headPartialUrl = getHeadPartialUrl();

            // Load head partial first
            return loadPartial(headPartialUrl, '#head-placeholder')
                .then(() => {
                    const { partials = [], components = [] } = pageSetupConfig;

                    // First load the partials
                    return loadPartials(partials)
                        .then(() => {
                            // After partials are loaded, load components
                            return loadComponents(components);
                        });
                });
        })
        .then(() => {
            console.log('Page initialized successfully');
        })
        .catch(error => {
            console.error('Error during page initialization:', error);
            handleError(error);
        });
}


function getPageName() {
    const currentPage = window.location.pathname.split('/').pop(); // Get the current file name from the URL
    const pageName = currentPage.split('.')[0]; // Extract the page name (e.g., 'index' or 'contact')
    return pageName || 'index'; // Default to 'index' if pageName is empty (e.g., if URL ends with '/')
}

function getHeadPartialUrl() {
    const pageName = getPageName();
    return `includes/pages/${pageName}-head.html`;
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
 * Dynamically imports components from the provided configuration.
 * Each component is imported as an ES module, and its specified initialization function is called.
 * 
 * @param {Array<Object>} components - Array of component objects with `url` and `initFunction` keys.
 * @returns {Promise} - A promise that resolves when all components are loaded and initialized.
 */
function loadComponents(components) {
    return Promise.all(components.map(({ url, initFunction }) => {
        return import(url)
            .then(module => {
                if (module[initFunction] && typeof module[initFunction] === 'function') {
                    module[initFunction](); // Initialize the component.
                } else {
                    console.warn(`Initialization function ${initFunction} not found in module ${url}`);
                }
            })
            .catch(error => {
                console.error(`Error loading component ${url}:`, error);
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
