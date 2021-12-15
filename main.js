const creativeApp = {};

// I want to add a click event to the hamburger button
// this click should trigger some styles to kick in
// side menu should slide in 

// lets capture the hamburger in a variable first perhaps
creativeApp.hamburger = document.querySelector('button.hamburger');
creativeApp.html = document.documentElement;

creativeApp.toggleClass = (node, styleClass) => {
    node.classList.toggle(styleClass);
}

creativeApp.closeMenu = (event) => {
    // get the event path
    const path = event.composedPath();
    // check if it has the menu element
    if (path.some(elem => elem.id === 'myMenuId')) {
        // terminate this function if it does
        return
    }
    const menu = document.querySelector('ul.mobile');
    menu.classList.remove('clicked');
    creativeApp.toggleClass(creativeApp.hamburger, 'hamburger-transformed');
    creativeApp.html.removeEventListener('click', creativeApp.closeMenu);
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

    // if a user clicks outside of menu and the menu is open then attach an event listener to the html document in order to close it, otherwise remove the event listener
    // solution provided by Anthony Oyathelemhi link:https://medium.com/@frontendtony/how-to-close-a-navigation-menu-when-the-page-is-clicked-3c607065a379
    if(menu.classList[3]) {
        creativeApp.html.addEventListener('click', creativeApp.closeMenu);
    } else {
        creativeApp.html.removeEventListener('click', creativeApp.closeMenu);
    }
});
};

// create init function
creativeApp.init = () => {
    creativeApp.eventHandler();
}

// run init
creativeApp.init();