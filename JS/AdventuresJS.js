let sectionContents = document.querySelectorAll('.section-content');

sectionContents.forEach(section => {
    let adventures = section.querySelectorAll('div');
    let count = 0;

    adventures.forEach(adventure => {
        if (count % 2 == 0) {
            adventure.classList.add('left');
        } else {
            let image = adventure.querySelector('img');
            adventure.appendChild(image);
            adventure.classList.add('right');
        }

        count = (count + 1) % 2;
    })
})