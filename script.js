document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let filteredItems = [];
    
    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Get all currently visible items
            filteredItems = Array.from(document.querySelectorAll('.gallery-item[style="display: block;"], .gallery-item:not([style])'));
            currentIndex = filteredItems.indexOf(item);
            
            lightbox.style.display = 'flex';
            lightboxImg.src = item.querySelector('img').src;
            lightboxImg.alt = item.querySelector('img').alt;
            
            // Prevent scrolling when lightbox is open
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Click outside image to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigation
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        updateLightboxImage();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % filteredItems.length;
        updateLightboxImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
                updateLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % filteredItems.length;
                updateLightboxImage();
            }
        }
    });
    
    function updateLightboxImage() {
        const imgSrc = filteredItems[currentIndex].querySelector('img').src;
        const imgAlt = filteredItems[currentIndex].querySelector('img').alt;
        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt;
    }
});




// const filterButtons = document.querySelectorAll('.controls button');
// const cards = Array.from(document.querySelectorAll('.gallery .card'));

// function setFilter(filter) {
//     filterButtons.forEach(b => {
//         const isActive = b.dataset.filter === filter;
//         b.classList.toggle('active', isActive);
//         b.setAttribute('aria-pressed', isActive);
//     });

//     cards.forEach(card => {
//         if (filter === 'all' || card.dataset.category === filter) {
//             card.classList.remove('hidden');
//             card.setAttribute('tabindex', '0');
//         } else {
//             card.classList.add('hidden');
//             card.setAttribute('tabindex', '-1');
//         }
//     });
// }

// filterButtons.forEach(btn => {
//     btn.addEventListener('click', () => {
//         setFilter(btn.dataset.filter);
//     });
// });

// // Lightbox navigation
// let currentIndex = -1;
// const lightbox = document.getElementById('lightbox');
// const lbImg = document.getElementById('lightbox-img');
// const captionEl = document.getElementById('lightbox-caption');
// const prevBtn = document.getElementById('prev');
// const nextBtn = document.getElementById('next');
// const closeBtn = document.getElementById('close');

// const visibleCards = () => cards.filter(c => !c.classList.contains('hidden'));

// function openLightbox(index) {
//     const visible = visibleCards();
//     if (index < 0 || index >= visible.length) return;
//     const card = visible[index];
//     const img = card.querySelector('img');
//     lbImg.src = img.src;
//     lbImg.alt = img.alt;
//     captionEl.textContent = img.alt;
//     currentIndex = index;
//     lightbox.classList.add('active');
//     document.body.style.overflow = 'hidden'; // prevent background scroll
//     // focus for accessibility
//     closeBtn.focus();
// }

// function closeLightbox() {
//     lightbox.classList.remove('active');
//     document.body.style.overflow = '';
// }

// function showNext() {
//     const visible = visibleCards();
//     openLightbox((currentIndex + 1) % visible.length);
// }
// function showPrev() {
//     const visible = visibleCards();
//     openLightbox((currentIndex - 1 + visible.length) % visible.length);
// }

// // Click on card
// cards.forEach((card, idx) => {
//     card.addEventListener('click', () => {
//         // Determine its index among visible
//         const visible = visibleCards();
//         const index = visible.indexOf(card);
//         openLightbox(index);
//     });
//     card.addEventListener('keydown', (e) => {
//         if (e.key === 'Enter' || e.key === ' ') {
//             e.preventDefault();
//             const visible = visibleCards();
//             const index = visible.indexOf(card);
//             openLightbox(index);
//         }
//     });
// });

// // Navigation buttons
// nextBtn.addEventListener('click', (e) => {
//     e.stopPropagation();
//     showNext();
// });
// prevBtn.addEventListener('click', (e) => {
//     e.stopPropagation();
//     showPrev();
// });
// closeBtn.addEventListener('click', closeLightbox);
// lightbox.addEventListener('click', (e) => {
//     if (e.target === lightbox) closeLightbox();
// });

// // Keyboard
// document.addEventListener('keydown', (e) => {
//     if (!lightbox.classList.contains('active')) return;
//     if (e.key === 'ArrowRight') showNext();
//     if (e.key === 'ArrowLeft') showPrev();
//     if (e.key === 'Escape') closeLightbox();
// });

// // Update lightbox order if filtering changes while open
// filterButtons.forEach(btn => {
//     btn.addEventListener('click', () => {
//         // if lightbox open, adjust currentIndex to new filtered set
//         if (lightbox.classList.contains('active')) {
//             const visible = visibleCards();
//             if (currentIndex >= visible.length) {
//                 closeLightbox();
//             } else {
//                 // refresh image in case order changed
//                 openLightbox(currentIndex);
//             }
//         }
//     });
// });

// // Initialize
// setFilter('all');