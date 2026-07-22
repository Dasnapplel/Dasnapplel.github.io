function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let counter = 0;
let slidercounter = 0;
let sliderNavs = document.querySelectorAll('.slider-nav');

sections.forEach(section => {
    let slider = section.querySelector('.slider');
    let slides = slider.querySelectorAll('.slide');

    // Create and Assign Project Nav Btns
    slides.forEach(slide => {
        slide.id = counter;
        const newNavBtn = document.createElement('a');
        newNavBtn.href = '#' + counter;
        newNavBtn.role = 'button';
        sliderNavs[slidercounter].appendChild(newNavBtn);
        counter += 1;
    })

    // Create Left/Right Project Nav Btns
    sliderNavs[slidercounter].firstElementChild.classList.add('active');
    let leftBtn = document.createElement('div');
    leftBtn.role = 'button';
    leftBtn.innerHTML = "⮜";
    leftBtn.classList.add('left-navBtn');
    leftBtn.classList.add('active');
    sliderNavs[slidercounter].prepend(leftBtn);
    let rightBtn = document.createElement('div');
    rightBtn.role = 'button';
    rightBtn.innerHTML = "⮞";
    rightBtn.classList.add('right-navBtn');
    sliderNavs[slidercounter].appendChild(rightBtn);
    slidercounter += 1;

    // Left/Right Nav Btn Events
    leftBtn.addEventListener('click', e => { 
        changeSlide(section, "left");
    })
    rightBtn.addEventListener('click', e => { 
        changeSlide(section, "right");
    })


    // Mobile Swipping
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const threshold = 50; 

    // 1. Capture initial touch position
    slider.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });

    // 2. Capture final touch position and process direction
    slider.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
    
        handleSwipe();
    }, { passive: true });

    // 3. Mathematical comparison logic
    function handleSwipe() {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;


        // Check if horizontal movement is greater than vertical movement
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    console.log('right');
                    changeSlide(section, "left");
                } else {
                    console.log('left');
                    changeSlide(section, "right");
                }
            }
        } 
    }

    let topBar = section.querySelector('h1');
    let sliderBtns = section.querySelectorAll('.slider-nav a');

    // Open Project Section Box
    topBar.addEventListener('click', async() => {
        section.classList.toggle('active');
        topBar.classList.toggle('active');
        if (topBar.innerHTML.includes('▲')) {
            topBar.innerHTML = topBar.innerHTML.replace('▲', '▼');
        } 
        else if (topBar.innerHTML.includes('▼')) {
            topBar.innerHTML = topBar.innerHTML.replace('▼', '▲');
        }

        await sleep(200);
        if (section.classList.contains('active')) { 
            section.scrollIntoView({ 
                behavior: 'smooth', // This creates the "sliding" animation
                block: 'start'      // Aligns the element to the top of the viewport
            });
        } 
    });

    // Project Nav Btn Active Class Toggle
    sliderBtns.forEach(button => {
        button.addEventListener('click', e => {
            // Make current nav active and others not
            sliderBtns.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const sliderCheck = sliderMinMaxCheck(section);
            console.log(sliderCheck);
            // Check for left/right buttons
            if (sliderCheck == "left") {
                leftBtn.classList.add('active');
                rightBtn.classList.remove('active');
            } else if (sliderCheck == "right") {
                rightBtn.classList.add('active');
                leftBtn.classList.remove('active');
            } else {
                leftBtn.classList.remove('active');
                rightBtn.classList.remove('active');
            }
        });
    });
})

function sliderMinMaxCheck(section) {
    let sliderBtns = section.querySelectorAll('.slider-nav a');
    let activeBtn = section.querySelector('.slider-nav a.active');
    let btnsArray = Array.from(sliderBtns);
    let slideLength = btnsArray.length;
    let activeIndex = btnsArray.indexOf(activeBtn);

    if (activeIndex == 0) {
        return "left";
    } else if (activeIndex == (slideLength - 1)) {
        return "right";
    } else {
        return "none";
    }
}

function changeSlide(section, direction) {
    let sliderBtns = section.querySelectorAll('.slider-nav a');
    let activeBtn = section.querySelector('.slider-nav a.active');
    let btnsArray = Array.from(sliderBtns);
    let slideLength = btnsArray.length;
    let activeIndex = btnsArray.indexOf(activeBtn);

    if (direction == "left" && activeIndex > 0) {
        btnsArray[activeIndex - 1].click();
    } else if (direction == "right" && activeIndex < (slideLength - 1)) {
        btnsArray[activeIndex + 1].click();
    }
}


// Open Project Section when using Navbars 
const portraitNavbar = document.querySelector('.portrait-navbar');
const landscapeNavBar = document.querySelector('.landscape-navbar');
const portraitNavBtns = portraitNavbar.querySelectorAll('a');
const landscapeNavBtns = landscapeNavBar.querySelectorAll('a');
let portraitNavBtnsArray = Array.from(portraitNavBtns);
let landscapeNavBtnsArray = Array.from(landscapeNavBtns);
let allSections = document.querySelectorAll('section');

function navBtnClick(btn, navBtnsArray) {
    let btnIndex = navBtnsArray.indexOf(btn);
    let currSection = allSections[btnIndex];
    let sectionButton = currSection.querySelector('h1');
    btn.addEventListener('click', e => {
        if (!currSection.classList.contains('active')) {
            sectionButton.click();
        }
    })
}

portraitNavBtns.forEach(btn => {
    navBtnClick(btn, portraitNavBtnsArray);
})

landscapeNavBtns.forEach(btn => {
    navBtnClick(btn, landscapeNavBtnsArray);
})
    

// Offset slider image gallery
const galleries = document.querySelectorAll('.assorted-gallery');

galleries.forEach(gallery => {
    for(const img of gallery.children) {
        const x = Math.floor(Math.random() * (20 + 20 + 1)) - 20;
        const y = Math.floor(Math.random() * (20 + 20 + 1)) - 20;

        img.style.transform = `translate(${x}px, ${y}px)`;
    }
})