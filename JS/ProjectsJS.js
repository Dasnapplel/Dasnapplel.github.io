function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
    btn.addEventListener('click', async() => {
        section.classList.toggle('active');
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
            sliderBtns.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

});