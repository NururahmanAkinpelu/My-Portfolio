const contactForm = document.getElementById('contact-form')
const contactFeedback = document.getElementById('contact-feedback')

contactForm.addEventListener('submit', event => {
    event.preventDefault()

    const name = document.getElementById('contact-name')
    const email = document.getElementById('contact-email')
    const phone = document.getElementById('contact-phone')
    const message = document.getElementById('contact-message')
    const fields = [name, email, phone, message]

    fields.forEach(field => field.classList.remove('input-error'))
    contactFeedback.className = 'contact__feedback'
    contactFeedback.textContent = ''

    const emptyField = fields.find(field => !field.value.trim())
    if (emptyField) {
        emptyField.classList.add('input-error')
        contactFeedback.classList.add('is-error')
        contactFeedback.textContent = 'Please complete all fields.'
        emptyField.focus()
        return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email.value.trim())) {
        email.classList.add('input-error')
        contactFeedback.classList.add('is-error')
        contactFeedback.textContent = 'Please enter a valid email address.'
        email.focus()
        return
    }

    if (!/^\d+$/.test(phone.value.trim())) {
        phone.classList.add('input-error')
        contactFeedback.classList.add('is-error')
        contactFeedback.textContent = 'Phone number must contain digits only.'
        phone.focus()
        return
    }

    contactFeedback.classList.add('is-success')
    contactFeedback.textContent = 'Thanks! Your message has been sent.'
    contactForm.reset()
})
