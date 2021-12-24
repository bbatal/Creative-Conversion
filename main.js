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

// Function to ask the window to stay put
// thanks to David Wells for this code snippet
// https://davidwells.io/snippets/disable-scrolling-with-javascript
creativeApp.noScroll = () => {
    window.scrollTo(0,0);
}

// Will make an overlay function to toggle whether the overlay is on or not
creativeApp.toggleOverlay = (boolean) => {
    // div for setting background to dim
    const overlay = document.createElement('div');
    overlay.classList.add('opaque');

    if (boolean) {
        creativeApp.html.appendChild(overlay);
    } else {        
        const someDiv = document.querySelector('div.opaque');
        creativeApp.html.removeChild(someDiv);
    }
}

// function will handle checking if click is happening on the menu and will terminate, otherwise it will toggle the clicked class on the ul to remove it
creativeApp.closeMenu = (event) => {
    // some variables
    const menu = document.querySelector('ul.mobile');
    // get the event path
    const path = event.composedPath();
    // check if it has the menu element
    if (path.some(elem => elem.id === 'myMenuId' || elem.id === 'myListId')) {
        const someDiv = document.querySelector('div.opaque');
        // terminate this function if it does
        if (creativeApp.html.contains(someDiv)) {
            return;
        } else {
            creativeApp.toggleOverlay(true);
            return;
        };
    }
    // checks if the html has an overlay, if not then run the code
    menu.classList.remove('clicked');
    creativeApp.toggleClass(creativeApp.hamburger, 'hamburger-transformed');
    creativeApp.html.removeEventListener('click', creativeApp.closeMenu);
    window.removeEventListener('scroll', creativeApp.noScroll);
    creativeApp.toggleOverlay(false);

}

// next lets add a click event to the hamburger
creativeApp.eventHandler = () => {
    creativeApp.hamburger.addEventListener('click', () => {
        // we want to trigger the menu to display: block
        // there is a slight quirk here where if you manually stretch the screen while the menu is open then some things will remain on the screen such as the overlay, and some li's
        const menu = document.querySelector('ul.mobile');
        const specialLis = document.querySelectorAll('ul.mobile li.dissapearing');

        // removes display: none to bring back 2 of the li items/ opposite happens when the menu is closed
        specialLis[0].classList.remove('special-mobile');
        specialLis[1].classList.remove('special-mobile');

        // we want to create a function that handles the toggling of classes
        creativeApp.toggleClass(menu, 'clicked');
        creativeApp.toggleClass(creativeApp.hamburger, 'hamburger-transformed');

        // if a user clicks outside of menu and the menu is open then attach an event listener to the html document in order to close it, otherwise remove the event listener
        // solution provided by Anthony Oyathelemhi link:https://medium.com/@frontendtony/how-to-close-a-navigation-menu-when-the-page-is-clicked-3c607065a379
        if(menu.classList[3]) {
            creativeApp.html.addEventListener('click', creativeApp.closeMenu);
            window.addEventListener('scroll', creativeApp.noScroll);
        } else {
            creativeApp.html.removeEventListener('click', creativeApp.closeMenu);
            creativeApp.toggleOverlay(false);
            specialLis[0].classList.add('special-mobile');
            specialLis[1].classList.add('special-mobile');
            window.removeEventListener('scroll', creativeApp.noScroll);
        }
    });
};

// create init function
creativeApp.init = () => {
    creativeApp.eventHandler();
}

// run init
creativeApp.init();


// Works well, in the future maybe add a fixed menu so it scrolls with the page, or prevent the page from scrolling when the menu is open.