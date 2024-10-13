export function setupKeyboardEffect() {
    // Select h1 and h2 elements within the .hero-content class
    const heroContent = document.querySelector('.hero-content');
    const h1Element = heroContent.querySelector('h1');
    const h2Element = heroContent.querySelector('h2');

    const h1Text = "HAGUE HACKERS"; // Text for the h1 element
    const h2Text = "Making the digital world safer through education"; // Text for the h2 element

    let currentH1CharIndex = 0;
    let currentH2CharIndex = 0;

    /**
     * Function to simulate typing effect for h1
     */
    function typeH1() {
        if (currentH1CharIndex < h1Text.length) {
            h1Element.textContent += h1Text[currentH1CharIndex];
            currentH1CharIndex++;
            const typingSpeed = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
            setTimeout(typeH1, typingSpeed);
        } else {
            typeH2(); // Start typing h2 after h1 completes
        }
    }

    /**
     * Function to simulate typing effect for h2
     */
    function typeH2() {
        if (currentH2CharIndex < h2Text.length) {
            h2Element.textContent += h2Text[currentH2CharIndex];
            currentH2CharIndex++;
            const typingSpeed = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
            setTimeout(typeH2, typingSpeed);
        } else {
            startCursorBlinking(h2Element);
        }
    }

    /**
     * Function to start cursor blinking for the h2 element
     */
    function startCursorBlinking(element) {
        const cursorSpan = document.createElement('span');
        cursorSpan.textContent = '|';
        element.appendChild(cursorSpan);
        setInterval(() => {
            cursorSpan.style.visibility = (cursorSpan.style.visibility === 'visible') ? 'hidden' : 'visible';
        }, 500);
    }

    // Initiate typing effect for h1 first
    h1Element.textContent = ''; // Clear the existing text
    h2Element.textContent = ''; // Clear the existing text
    typeH1();
}