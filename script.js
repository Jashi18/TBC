document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dropbtn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                if (dropdown !== this.parentElement) {
                    dropdown.classList.remove('show');
                    dropdown.querySelector('.dropbtn').classList.remove('active');
                }
            });

            this.parentElement.classList.toggle('show');
            this.classList.toggle('active');
        });
    });

    window.addEventListener('click', function(e) {
        if (!e.target.matches('.dropbtn')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('show');
                dropdown.querySelector('.dropbtn').classList.remove('active');
            });
        }
    });

    // Mobile menu toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileMenuIcon.addEventListener('click', () => {
        mobileNav.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    window.addEventListener('click', (e) => {
        if (!e.target.matches('.mobile-menu-icon') && !e.target.closest('.mobile-nav')) {
            mobileNav.classList.remove('show');
        }
    });
});

const sliders = document.querySelectorAll('.slider');
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

sliders.forEach(slider => {
    slider.addEventListener('mousedown', startDragging);
    slider.addEventListener('mouseup', stopDragging);
    slider.addEventListener('mouseleave', stopDragging);
    slider.addEventListener('mousemove', dragging);
    slider.addEventListener('touchstart', startDragging);
    slider.addEventListener('touchend', stopDragging);
    slider.addEventListener('touchmove', dragging);
});

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function startDragging(event) {
    isDragging = true;
    startPos = getPositionX(event);
    event.currentTarget.style.cursor = 'grabbing';
}

function stopDragging(event) {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;
    const sliderId = event.currentTarget.id;
    const slider = document.getElementById(sliderId);

    if (movedBy < -100 && currentIndexes[sliderId] < slider.querySelectorAll('.item').length - 3) {
        moveSlider(1, sliderId, `${sliderId}-progress`);
    } else if (movedBy > 100 && currentIndexes[sliderId] > 0) {
        moveSlider(-1, sliderId, `${sliderId}-progress`);
    } else {
        slider.style.transform = `translateX(-${currentIndexes[sliderId] * (slider.clientWidth / 3)}px)`;
    }

    prevTranslate = currentTranslate;
    event.currentTarget.style.cursor = 'grab';
}

function dragging(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
        event.currentTarget.style.transform = `translateX(${currentTranslate}px)`;
    }
}

const currentIndexes = {
    slider1: 0,
    slider2: 0,
};

function moveSlider(direction, sliderId, progressId) {
    const slider = document.getElementById(sliderId);
    const totalItems = slider.querySelectorAll('.item').length;
    const visibleItems = 3;
    const itemWidth = slider.clientWidth / visibleItems;
    const maxIndex = totalItems - visibleItems;

    currentIndexes[sliderId] += direction;

    if (currentIndexes[sliderId] < 0) {
        currentIndexes[sliderId] = 0;
    } else if (currentIndexes[sliderId] > maxIndex) {
        currentIndexes[sliderId] = maxIndex;
    }

    slider.style.transform = `translateX(-${currentIndexes[sliderId] * itemWidth}px)`;
    prevTranslate = -currentIndexes[sliderId] * itemWidth;

    const progress = (currentIndexes[sliderId] / maxIndex) * 100;
    document.getElementById(progressId).style.width = `${progress}%`;
}



