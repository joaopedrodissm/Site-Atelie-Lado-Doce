var swiper = new Swiper(".mySwipers", {
    slidesPerView: "auto", /* Mantém a largura adequada para centralização */
    spaceBetween: 20,
    centeredSlides: true, /* Centraliza os slides no carrossel */
    loop: true, /* Permite rolagem contínua */
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        480: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
});

const viewItemsButtons = document.querySelectorAll('.view-items');
viewItemsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;
        // Alterna a visibilidade do conteúdo
        accordionContent.style.display = 
            accordionContent.style.display === 'block' ? 'none' : 'block';
    });
});