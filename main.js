// I want to add a click event to the hamburger button
// this click should trigger some styles to kick in
// side menu should slide in 

// lets capture the hamburger in a variable first perhaps
const hamburger = document.querySelector('button.hamburger');

// next lets add a click event to the hamburger
hamburger.addEventListener('click', () => {
    // we want to trigger the menu to display: block
    const menu = document.querySelector('ul.mobile');
    const specialLis = document.querySelectorAll('ul.mobile li.special-mobile');
    menu.classList.toggle('menu-pop-out');
    // specialLis.classList.remove('special-mobile');
    specialLis.forEach((item) => {
        item.classList.remove('special-mobile');
    });
})