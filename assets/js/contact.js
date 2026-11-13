
// Initialize EmailJS
(function () {
    emailjs.init({
        publicKey: "FtIcsoS4TdjYZTRXb",
    });
})();

// Get form elements
const contactForm = document.getElementById('contact-form');
const contactFeedback = document.getElementById('contact-feedback');
const submitButton = contactForm.querySelector('input[type="submit"]');

// Handle form submission
contactForm.addEventListener('submit', async event => {
    event.preventDefault();

    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const phone = document.getElementById('contact-phone');
    const message = document.getElementById('contact-message');

    const fields = [name, email, phone, message];

    // Reset previous errors
    fields.forEach(field => field.classList.remove('input-error'));

    contactFeedback.className = 'contact__feedback';
    contactFeedback.textContent = '';

    // Validate empty fields
    const emptyField = fields.find(field => !field.value.trim());

    if (emptyField) {
        emptyField.classList.add('input-error');
        contactFeedback.classList.add('is-error');
        contactFeedback.textContent = 'Please complete all fields.';
        emptyField.focus();
        return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        email.classList.add('input-error');
        contactFeedback.classList.add('is-error');
        contactFeedback.textContent = 'Please enter a valid email address.';
        email.focus();
        return;
    }

    // Validate phone number
    if (!/^\d+$/.test(phone.value.trim())) {
        phone.classList.add('input-error');
        contactFeedback.classList.add('is-error');
        contactFeedback.textContent = 'Phone number must contain digits only.';
        phone.focus();
        return;
    }

    // Prevent multiple submissions
    submitButton.disabled = true;
    submitButton.value = 'Sending...';

    try {
        // Send email using EmailJS
        await emailjs.sendForm(
            'service_vecoo15',
            'template_glxlgfq',
            contactForm
        );

        contactFeedback.classList.add('is-success');
        contactFeedback.textContent =
            'Thanks! Your message has been sent successfully.';

        contactForm.reset();

    } catch (error) {
        console.error('Email sending failed:', error);

        contactFeedback.classList.add('is-error');
        contactFeedback.textContent =
            'Sorry, your message could not be sent. Please try again.';
    } finally {
        submitButton.disabled = false;
        submitButton.value = 'Submit';
    }
});
