// js/components/mailto.js
export function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Construct the mailto link
            const subject = encodeURIComponent('Contact Form Submission');
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
            const mailtoLink = `mailto:contact@haguehackers.nl?subject=${subject}&body=${body}`;

            // Open the mail client with the form data
            window.location.href = mailtoLink;
        });
    } else {
        console.warn('Contact form not found on the page.');
    }
}
