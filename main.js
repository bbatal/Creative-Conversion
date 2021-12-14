const creativeApp = {};

// I want to add a click event to the hamburger button
// this click should trigger some styles to kick in
// side menu should slide in 

// lets capture the hamburger in a variable first perhaps
creativeApp.hamburger = document.querySelector('button.hamburger');

creativeApp.toggleClass = (node, styleClass) => {
    node.classList.toggle(styleClass);
}

// next lets add a click event to the hamburger
creativeApp.eventHandler = () => {
creativeApp.hamburger.addEventListener('click', () => {
    // we want to trigger the menu to display: block
    const menu = document.querySelector('ul.mobile');
    const specialLis = document.querySelectorAll('ul.mobile li.special-mobile');

    // specialLis.classList.remove('special-mobile');
    specialLis.forEach((item) => {
        item.classList.remove('special-mobile');
    });

    // we want to create a function that handles the toggling of classes
    creativeApp.toggleClass(menu, 'clicked');
    creativeApp.toggleClass(creativeApp.hamburger, 'hamburger-transformed');
});
};

// create init function
creativeApp.init = () => {
    creativeApp.eventHandler();
}

// run init
creativeApp.init();