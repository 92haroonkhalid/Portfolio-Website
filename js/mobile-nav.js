// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger input');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        // Toggle mobile menu
        hamburger.addEventListener('change', function() {
            navMenu.classList.toggle('active');
            document.body.style.overflow = this.checked ? 'hidden' : '';
        });

        // Close menu on nav click
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.checked = false;
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});
