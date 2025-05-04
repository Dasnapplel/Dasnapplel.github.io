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


//should only work if the btns are 100 opacity
//Burger menu 
const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.side-bar')
const offScreenClose = document.querySelector('.side-bar-close')

hamMenu.addEventListener('click', () => {
    offScreenMenu.classList.add('active');
})
offScreenClose.addEventListener('click', () => {
    offScreenMenu.classList.remove('active');
})
