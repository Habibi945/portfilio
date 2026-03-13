// --- Carousel Functionality ---
const items = document.querySelectorAll('.carousel-img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Define initial positions
let order = [0, 1, 2]; // index array corresponding to left, center, right

function updateCarousel() {
    // Remove all position classes
    items.forEach(item => {
        item.classList.remove('left-img', 'center-img', 'right-img');
    });
    
    // Re-assign based on current order
    if (items[order[0]]) items[order[0]].classList.add('left-img');
    if (items[order[1]]) items[order[1]].classList.add('center-img');
    if (items[order[2]]) items[order[2]].classList.add('right-img');
}

function moveNext() {
    let first = order.shift();
    order.push(first);
    updateCarousel();
}

function movePrev() {
    let last = order.pop();
    order.unshift(last);
    updateCarousel();
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        moveNext();
        resetInterval();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        movePrev();
        resetInterval();
    });
}

// Autoplay every 5 seconds
let autoPlay = setInterval(moveNext, 5000);

function resetInterval() {
    clearInterval(autoPlay);
    autoPlay = setInterval(moveNext, 5000);
}

// --- Smooth Scrolling Navigation & Active State ---
const sections = document.querySelectorAll('main, section');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current) && current !== '') {
            link.classList.add('active');
        }
    });
});

// --- Stats Counter Animation Observer ---
const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            
            setTimeout(() => {
                stats.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const increment = target / 80; 
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.innerText = Math.ceil(current) + '+';
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.innerText = target + '+';
                        }
                    };
                    updateCounter();
                });
            }, 2000);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// --- Process Steps Animation Observer ---
const processElements = document.querySelectorAll('.process-box, .process-headline');
const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            const numberEl = entry.target.querySelector('.process-number');
            if (numberEl) {
                const target = +numberEl.getAttribute('data-target');
                let current = 0;
                const updateCounter = () => {
                    current += 0.05; 
                    if (current < target) {
                        numberEl.innerText = '0' + Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        numberEl.innerText = '0' + target;
                    }
                };
                updateCounter();
            }

            processObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

processElements.forEach(el => processObserver.observe(el));
