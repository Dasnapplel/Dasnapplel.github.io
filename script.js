// Variables
let sections = document.querySelectorAll('section');
let resumes = document.querySelectorAll('.resume');
let landscapeNavLinks = document.querySelectorAll('.landscape-navbar a');
const portraitNavMenu = document.querySelector('.portrait-navbar-menu')

const sideBarOpen = document.querySelector('.sidebar-open');
const sideBar = document.querySelector('.sidebar');
const sideBarClose = document.querySelector('.sidebar-close');

const portraitNavmenuOpen = document.querySelector('.portrait-navbar-p2')

const lightToggleBtn = document.querySelector('.light-toggle-btn');


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


// Sidebar Open and Close
sideBarOpen.addEventListener('click', () => {
    sideBar.classList.add('active');
});
sideBarClose.addEventListener('click', () => {
    sideBar.classList.remove('active');
});
// redundent feature that closes the side bar after traveling pages
// for (let i=0; i < sideBar.children.length; i++) {
//     const child = sideBar.children[i]
//     if(child in document.querySelectorAll('sidebar a')) {
//         child.addEventListener('click', () => {
//             sideBar.classList.remove('active');
//         })};
// };


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

