  const carousel = document.querySelector('.product-carousel');
  const leftArrow = document.querySelector('.arrow:first-child');
  const rightArrow = document.querySelector('.arrow:nth-child(2)');
  const productCards = document.querySelectorAll(".product-card .product-img");


  const scrollAmount = 150; 

  leftArrow.addEventListener('click', () => {
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  });

 
  rightArrow.addEventListener('click', () => {
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  });

  
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; 
    carousel.scrollLeft = scrollLeft - walk;
  });

  
  carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('touchend', () => {
    isDown = false;
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });



//   selected item code
 let currentIndex = 0;

  function updateSelectedItem() {
    productCards.forEach((img, index) => {
      img.classList.toggle("selected", index === currentIndex);
    });

    // Scroll to the selected item
    const card = productCards[currentIndex].closest(".product-card");
    card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSelectedItem();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < productCards.length - 1) {
      currentIndex++;
      updateSelectedItem();
    }
  });

  
  updateSelectedItem();
