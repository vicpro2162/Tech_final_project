document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        // Bascule la classe 'show-menu' sur la balise nav
        navMenu.classList.toggle('show-menu');
        
        // Optionnel : bascule une classe 'is-active' pour animer le burger en croix
        menuToggle.classList.toggle('is-active'); 
    });
});