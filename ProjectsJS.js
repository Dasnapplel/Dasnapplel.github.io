// Project Nav Btns
let counter = 0;
let slidercounter = 0;
let sliders = document.querySelectorAll('.slider');
let sliderNavs = document.querySelectorAll('.slider-nav');

sliders.forEach(slider => {
    let slides = slider.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.id = counter;
        const newNavBtn = document.createElement('a');
        newNavBtn.href = '#' + counter;
        newNavBtn.role = 'button';
        sliderNavs[slidercounter].appendChild(newNavBtn);
        counter += 1;
    })
    sliderNavs[slidercounter].firstElementChild.classList.add('active');
    slidercounter += 1;
})


sections.forEach(section => {
    let sectionContent = section.querySelector('.section-content');
    let btn = section.querySelector('.project-section-btn');
    let btnCircle = section.querySelector('.button-circle');
    let sliderBtns = section.querySelectorAll('.slider-nav a');

    // Open Project Section Box
    btn.addEventListener('click', () => {
        section.classList.toggle('active');
    });

    // Project Nav Btn Active Class Toggle
    sliderBtns.forEach(button => {
        button.addEventListener('click', e => {
            sliderBtns.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

});