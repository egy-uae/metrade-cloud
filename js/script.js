document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Get target section and scroll smoothly
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const nav = document.querySelector('nav');
            const hamburger = document.querySelector('.hamburger');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
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

    // Language Switcher Logic
    const langToggleButton = document.getElementById('lang-toggle-btn');
    const htmlElement = document.documentElement; // The <html> tag
    const translatableElements = document.querySelectorAll('[data-en], [data-ar], [data-en-q], [data-ar-q], [data-en-a], [data-ar-a], [data-en-placeholder], [data-ar-placeholder], [data-en-alt], [data-ar-alt]');

    // Function to set the language
    function setLanguage(lang) {
        if (lang === 'ar') {
            htmlElement.setAttribute('lang', 'ar');
            htmlElement.setAttribute('dir', 'rtl');
            langToggleButton.textContent = 'English';
            langToggleButton.setAttribute('data-lang', 'ar'); // Store current language
        } else {
            htmlElement.setAttribute('lang', 'en');
            htmlElement.setAttribute('dir', 'ltr');
            langToggleButton.textContent = 'العربية';
            langToggleButton.setAttribute('data-lang', 'en'); // Store current language
        }

        // Update all translatable elements
        translatableElements.forEach(element => {
            const currentLang = htmlElement.getAttribute('lang');
            const enText = element.getAttribute(`data-en`);
            const arText = element.getAttribute(`data-ar`);
            const enQ = element.getAttribute(`data-en-q`);
            const arQ = element.getAttribute(`data-ar-q`);
            const enA = element.getAttribute(`data-en-a`);
            const arA = element.getAttribute(`data-ar-a`);
            const enPlaceholder = element.getAttribute(`data-en-placeholder`);
            const arPlaceholder = element.getAttribute(`data-ar-placeholder`);
            const enAlt = element.getAttribute(`data-en-alt`);
            const arAlt = element.getAttribute(`data-ar-alt`);


            if (enText && arText) {
                element.textContent = (currentLang === 'en') ? enText : arText;
            }
            if (enQ && arQ) {
                // For FAQ questions, ensure the icon is preserved
                const icon = element.querySelector('i');
                element.innerHTML = ((currentLang === 'en') ? enQ : arQ) + (icon ? icon.outerHTML : '');
            }
            if (enA && arA) {
                // For FAQ answers, replace content within the <p> tag
                const pTag = element.querySelector('p');
                if (pTag) {
                    pTag.textContent = (currentLang === 'en') ? enA : arA;
                }
            }
            if (enPlaceholder && arPlaceholder) {
                element.setAttribute('placeholder', (currentLang === 'en') ? enPlaceholder : arPlaceholder);
            }
            if (enAlt && arAlt) {
                element.setAttribute('alt', (currentLang === 'en') ? enAlt : arAlt);
            }
        });

        // Update page title
        const pageTitle = document.querySelector('title');
        pageTitle.textContent = (lang === 'en') ? pageTitle.getAttribute('data-en') : pageTitle.getAttribute('data-ar');

        // Store language preference in localStorage
        localStorage.setItem('langPreference', lang);
    }

    // Load language preference from localStorage or default to English
    const savedLang = localStorage.getItem('langPreference') || 'en';
    setLanguage(savedLang); // Set language on load

    // Add event listener for the language toggle button
    langToggleButton.addEventListener('click', () => {
        const currentLang = langToggleButton.getAttribute('data-lang');
        const newLang = (currentLang === 'en') ? 'ar' : 'en';
        setLanguage(newLang);
    });

    // Handle form submission (placeholder)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Get current language for alert message
            const currentLang = htmlElement.getAttribute('lang');
            if (currentLang === 'ar') {
                alert('تم إرسال النموذج بنجاح! (هذا مجرد مثال. تحتاج إلى واجهة خلفية لمعالجة بيانات النموذج.)');
            } else {
                alert('Form submitted successfully! (This is a placeholder. You need a backend to process form submissions.)');
            }
            // Here you would typically send form data to a server using fetch() or XMLHttpRequest
            contactForm.reset();
        });
    }
});
