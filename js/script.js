document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const langToggleButton = document.getElementById('lang-toggle-btn');
    const htmlElement = document.documentElement;

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Close all other questions
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
                q.nextElementSibling.style.padding = '0';
            });

            // Open the clicked question if it wasn't active
            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 25px 20px 25px'; // Adjust padding on open
            }
        });
    });

    // --- Language Switcher Logic ---

    const translatableElements = document.querySelectorAll('[data-en], [data-ar], [data-en-alt], [data-ar-alt], [data-en-placeholder], [data-ar-placeholder], [data-en-q], [data-ar-q], [data-en-a], [data-ar-a]');

    function setLanguage(lang) {
        // Set HTML attributes
        htmlElement.setAttribute('lang', lang);
        htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        // Update button text and data attribute
        langToggleButton.textContent = lang === 'ar' ? 'English' : 'العربية';
        langToggleButton.setAttribute('data-lang', lang);

        // Update all elements with data attributes
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            const altText = el.getAttribute(`data-${lang}-alt`);
            const placeholderText = el.getAttribute(`data-${lang}-placeholder`);
            const questionText = el.getAttribute(`data-${lang}-q`);
            const answerText = el.getAttribute(`data-${lang}-a`);

            if (text) el.textContent = text;
            if (altText) el.setAttribute('alt', altText);
            if (placeholderText) el.setAttribute('placeholder', placeholderText);
            if (questionText) {
                const icon = el.querySelector('i');
                el.innerHTML = questionText + (icon ? icon.outerHTML : '');
            }
            if (answerText) {
                const pTag = el.querySelector('p');
                if (pTag) pTag.textContent = answerText;
            }
        });
        
        // Save preference to localStorage
        localStorage.setItem('userLang', lang);
    }

    // Language toggle button event
    langToggleButton.addEventListener('click', () => {
        const currentLang = langToggleButton.getAttribute('data-lang');
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    });

    // On page load, check for saved language or default to 'en'
    const savedLang = localStorage.getItem('userLang') || 'en';
    setLanguage(savedLang);

});
