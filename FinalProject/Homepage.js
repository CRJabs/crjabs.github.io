// Infinite seamless carousel scroll with auto-scroll to the right

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('carousel');
  const items = Array.from(carousel.children);
  const itemCount = items.length;
  const itemWidth = items[0].offsetWidth + 24; // 24px gap

  // Clone items for seamless effect
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.add('clone');
    carousel.appendChild(clone);
  });

  // Set carousel scroll position to start of original items
  carousel.scrollLeft = 0;

  // Handle scroll to create infinite effect
  carousel.addEventListener('scroll', function () {
    if (carousel.scrollLeft >= itemWidth * itemCount) {
      // Jump back to start of originals
      carousel.scrollLeft -= itemWidth * itemCount;
    } else if (carousel.scrollLeft <= 0) {
      // Jump to end of originals
      carousel.scrollLeft += itemWidth * itemCount;
    }
  });

  // Optional: Add left/right buttons for navigation
  window.scrollCarousel = function(direction) {
    carousel.scrollBy({ left: direction * itemWidth, behavior: 'smooth' });
  };

  // Auto-scroll to the right
  let autoScrollInterval = setInterval(() => {
    carousel.scrollBy({ left: 2, behavior: 'auto' }); // Adjust speed by changing the value
  }, 8); // Adjust interval for smoothness/speed

  // Pause auto-scroll on mouse enter, resume on mouse leave
  carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  carousel.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(() => {
      carousel.scrollBy({ left: 2, behavior: 'auto' });
    }, 8);
  });
});
