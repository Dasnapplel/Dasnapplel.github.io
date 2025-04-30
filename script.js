let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('aside div a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 300;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('aside div a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};