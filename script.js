//Nav Bar link activations
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.side-bar a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 300;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.side-bar a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};


//Burger menu 
const hamMenu = document.querySelector('.ham-menu');
const sideBar = document.querySelector('.side-bar')
const sideBarClose = document.querySelector('.side-bar-close')

for (let i=0; i < sideBar.children.length; i++) {
    const child = sideBar.children[i]
    if(child in document.querySelectorAll('side-bar a')) {
        child.addEventListener('click', () => {
            sideBar.classList.remove('active');
        })};
};


hamMenu.addEventListener('click', () => {
    sideBar.classList.add('active');
});
sideBarClose.addEventListener('click', () => {
    sideBar.classList.remove('active');
});

//Portait NavBar open
const NavBtn = document.querySelector('.portait-head')
const NavMenu = document.querySelector('.portait-nav-menu')

NavBtn.addEventListener('click', () => {
    NavMenu.classList.toggle('active');
    for (let i=0; i < NavMenu.children.length; i++) {
        const child = NavMenu.children[i]
        child.classList.toggle('active');
    }});
