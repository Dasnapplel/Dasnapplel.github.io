//Nav Bar link activations
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.head-contain a');
const NavMenu = document.querySelector('.portrait-nav-menu')

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 300;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        let title = document.querySelector('.portrait-head-p2');
        
        

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.head-contain a[href*=' + id + ']').classList.add('active');
                title.innerHTML = id + ' ▼';
                NavMenu.classList.remove('active');
            });
        };
    });
};

//Burger menu 
const hamMenu = document.getElementsByTagName('nav');
const sideBar = document.querySelector('.side-bar');
const sideBarClose = document.querySelector('.side-bar-close');

for (let i=0; i < sideBar.children.length; i++) {
    const child = sideBar.children[i]
    if(child in document.querySelectorAll('side-bar a')) {
        child.addEventListener('click', () => {
            sideBar.classList.remove('active');
        })};
};


hamMenu[0].addEventListener('click', () => {
    sideBar.classList.add('active');
});
sideBarClose.addEventListener('click', () => {
    sideBar.classList.remove('active');
});

//portrait NavBar open
const NavBtn = document.querySelector('.portrait-head-p2')

NavBtn.addEventListener('click', () => {
    // Change mode
    if (NavBtn.innerHTML.includes('▲')) {
        NavBtn.innerHTML = NavBtn.innerHTML.replace('▲', '▼');
        NavMenu.classList.remove('active');
    } else if (NavBtn.innerHTML.includes('▼')) {
        NavBtn.innerHTML = NavBtn.innerHTML.replace('▼', '▲');
        NavMenu.classList.add('active');
    }
    // 
    // for (let i=0; i < NavMenu.children.length; i++) {
    //     let child = NavMenu.children[i]
    //     child.classList.toggle('active');
    // }
});

//projects page slide btns
const sectionContent = document.querySelectorAll('.section-content');

sectionContent.forEach(content => {
    let leftBtn = content.querySelector('.left-btn');
    let rightBtn = content.querySelector('.right-btn');
    let slides = content.querySelector('.slides-container').children;
    let currentSlide = 0;
    let debounce = false;

    leftBtn.addEventListener('click', () => {
        if (debounce) return;
        debounce = true;

        slides[currentSlide].style.animation = 'fadeout 0.25s forwards';
        slides[(currentSlide - 1 + slides.length) % slides.length].style.animation = 'fadein 0.125s';

        setTimeout(() => {
            slides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].style.display = 'flex';
            debounce = false;
        }, 250); // time in ms
    });
    rightBtn.addEventListener('click', () => {
        if (debounce) return;
        debounce = true;

        slides[currentSlide].style.animation = 'fadeout 0.25s forwards';
        slides[(currentSlide + 1 + slides.length) % slides.length].style.animation = 'fadein 0.125s';

        setTimeout(() => {
            slides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1 + slides.length) % slides.length;
            slides[currentSlide].style.display = 'flex';
            debounce = false;
        }, 250); // time in ms
    });
});