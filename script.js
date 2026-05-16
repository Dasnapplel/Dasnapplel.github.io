// Variables
let sections = document.querySelectorAll('section');
let resumes = document.querySelectorAll('.resume');
let landscapeNavLinks = document.querySelectorAll('.landscape-navbar a');
const portraitNavMenu = document.querySelector('.portrait-navbar-menu')

const sideBarOpen = document.querySelector('.sidebar-open');
const sideBar = document.querySelector('.sidebar');
const sideBarClose = document.querySelector('.sidebar-close');
const pageChangeButtons = document.querySelectorAll('.sidebar a');
const main = document.querySelector('main');

const portraitNavmenuOpen = document.querySelector('.portrait-navbar-p2')

const lightToggleBtn = document.querySelector('.light-toggle-btn');

const highlightToggleBtn = document.querySelector('.highlight-toggle-btn');

// Dark Mode Toggle
const enterState = localStorage.getItem('DarkMode') === 'true';
if (enterState) {
    lightToggleBtn.classList.add('active');
    lightToggleBtn.innerHTML = '☽';
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('dark-mode');
    })
}

lightToggleBtn.addEventListener('click', () => {
    lightToggleBtn.classList.toggle('active');
    lightToggleBtn.innerHTML = lightToggleBtn.classList.contains('active') ? '☽' : '☼';
    document.querySelectorAll('section').forEach(section => {
        section.classList.toggle('dark-mode');
    })
    if (localStorage.getItem('DarkMode') === 'true') {
        localStorage.setItem('DarkMode', false);
    } else {
        localStorage.setItem('DarkMode', true);
    }
});


// Color Theme Toggle
let colors = [
    ['rgb(230, 240, 10)','rgb(225, 10, 240)'],
    ['rgb(40, 200, 10)','rgb(255, 0, 190)'],
    ['rgb(5, 240, 5)', 'rgb(230, 5, 5)'],
    ['rgb(0, 210, 210)', 'rgb(255, 165, 0)']
]

const primaryColor = document.querySelector('.highlight-toggle-btn');
const secondaryColor = document.querySelector('.highlight-toggle-btn');

let count = 0;
highlightToggleBtn.addEventListener('click', () => {
    document.documentElement.style.setProperty('--primary', colors[count][0]);
    document.documentElement.style.setProperty('--secondary', colors[count][1]);
    count = (count + 1) % colors.length;
    
    // For completely random colors lmao
    // const num1 = Math.floor(Math.random() * 255);
    // const num2 = Math.floor(Math.random() * 255);
    // const num3 = Math.floor(Math.random() * 255);
    // const num4 = Math.floor(Math.random() * 255);
    // const num5 = Math.floor(Math.random() * 255);
    // const num6 = Math.floor(Math.random() * 255);
    //document.documentElement.style.setProperty('--primary', 'rgb(' + num1 + ',' + num2 + ',' + num3 + ')');
    //document.documentElement.style.setProperty('--secondary', 'rgb(' + num4 + ',' + num5 + ',' + num6 + ')');
});


// Side Bar Page Change Animation
main.style.opacity = 1;
pageChangeButtons.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        const target = button.href;
        sideBar.classList.remove('active');
        main.style.opacity = 0;

        setTimeout(() => {
            window.location.href = target;
        }, 250); // Must match CSS transition duration
  
    });
});


// Sidebar Open and Close
sideBarOpen.addEventListener('click', () => {
    sideBar.classList.add('active');
});
sideBarClose.addEventListener('click', () => {
    sideBar.classList.remove('active');
});


// Nav Bar Link Activations
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 300;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        let title = document.querySelector('.portrait-navbar-p2');

        if(top >= offset && top < offset + height) {
            landscapeNavLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.landscape-navbar a[href*=' + id + ']').classList.add('active');
                title.innerHTML = id + ' ▼';
                portraitNavMenu.classList.remove('active');
            });
        };
    });
    // potential feature for multiple resumes in the resume section
    // resumes.forEach(res => {
    //     let top = window.scrollY;
    //     let offset = res.offsetTop - 300;
    //     let height = res.offsetHeight;
    //     let id = res.getAttribute('id');
    //     let title = document.querySelector('.portrait-navbar-p2');

    //     if(top >= offset && top < offset + height) {
    //         landscapeNavLinks.forEach(links => {
    //             links.classList.remove('active');
    //             document.querySelector('.landscape-navbar a[href*=' + id + ']').classList.add('active');
    //             title.innerHTML = id + ' ▼';
    //             portraitNavMenu.classList.remove('active');
    //         });
    //     };
    // });
};


// Portrait NavBar Menu Open
portraitNavmenuOpen.addEventListener('click', () => {
    if (portraitNavmenuOpen.innerHTML.includes('▲')) {
        portraitNavmenuOpen.innerHTML = portraitNavmenuOpen.innerHTML.replace('▲', '▼');
        portraitNavMenu.classList.remove('active');
    } else if (portraitNavmenuOpen.innerHTML.includes('▼')) {
        portraitNavmenuOpen.innerHTML = portraitNavmenuOpen.innerHTML.replace('▼', '▲');
        portraitNavMenu.classList.add('active');
    }
    // 
    // for (let i=0; i < portraitNavMenu.children.length; i++) {
    //     let child = portraitNavMenu.children[i]
    //     child.classList.toggle('active');
    // }
});


// Projects Page Slide Buttons
sections.forEach(content => {
    let title = content.querySelector('h1');
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
            const text = title.textContent.trim().slice(0, -3);
            title.textContent = text + `${currentSlide + 1}/${slides.length}`;
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
            const text = title.textContent.trim().slice(0, -3);
            title.textContent = text + `${currentSlide + 1}/${slides.length}`;
            debounce = false;
        }, 250); // time in ms
    });
});
