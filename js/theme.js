// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Initialize theme
    const initTheme = () => {
        const storedTheme = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (storedTheme !== null) {
            document.body.classList.toggle('dark-mode', storedTheme === 'true');
        } else if (prefersDark) {
            document.body.classList.add('dark-mode');
        }
        
        // Update icon based on current theme
        const themeIcon = themeToggle.querySelector('i');
        if (themeIcon) {
            themeIcon.className = document.body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    // Toggle theme
    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        // Update icon
        const themeIcon = themeToggle.querySelector('i');
        if (themeIcon) {
            themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    // Initialize theme on page load
    initTheme();

    // Add click event listener to theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}); 