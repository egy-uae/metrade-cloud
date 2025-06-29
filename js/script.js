document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const nav = document.querySelector('nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');

            // Close other open FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.style.maxHeight = null;
                    otherQuestion.nextElementSibling.style.paddingBottom = '0';
                    otherQuestion.querySelector('i').classList.remove('active');
                }
            });

            // Toggle current FAQ
            question.classList.toggle('active');
            icon.classList.toggle('active'); // Rotate icon

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.style.paddingBottom = '0';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.paddingBottom = '20px';
            }
        });
    });

    // Handle form submission (placeholder)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form submitted! (This is a placeholder. You need a backend to process form submissions.)');
            // Here you would typically send form data to a server using fetch() or XMLHttpRequest
            contactForm.reset();
        });
    }
});
