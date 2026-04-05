// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for nav links (only for internal anchors)
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        // Only prevent default and scroll for internal anchors (#)
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            navLinks.classList.remove('active');
        }
        // For external links (like destinations.html, gallery.html), let them navigate normally
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const images = [         
    "asset/tawang/SelaPass.jpg",   
    "asset/tawang/panga-teng-tso-lake-tawang-arunachal.jpg",
    "asset/tawang/TawangVillage2.jpg",
    "asset/assam/brahmaputra2.jpg",
    "asset/assam/KazirangaNationalPark.jpg",
    "asset/meghalaya/landcloud.jpg",
    "asset/meghalaya/meghalayahill.jpg",
    "asset/meghalaya/SevenSisterFalls.png",
    "asset/meghalaya/meghalayafall2.jpg",
  ];

  const hero = document.querySelector(".hero");

  // Create slide divs dynamically
  images.forEach((img, i) => {
    const slide = document.createElement("div");
    slide.classList.add("hero-slide");
    slide.style.backgroundImage = 
      `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${img}')`;
    if (i === 0) slide.classList.add("active"); // first image visible
    hero.appendChild(slide);
  });

  const slides = document.querySelectorAll(".hero-slide");
  let current = 0;

  function showNextSlide() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }

  setInterval(showNextSlide, 6000); // change every 6s
});

// Gallery Modal Functionality with Categories and Enhanced Lightbox
document.addEventListener("DOMContentLoaded", () => {
  // Only run on pages with gallery
  if (document.querySelector('.gallery-grid')) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('lightboxImage');
    const titleText = document.getElementById('lightboxTitle');
    const descriptionText = document.getElementById('lightboxDescription');
    const categoryText = document.getElementById('lightboxCategory');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const thumbnailsContainer = document.getElementById('thumbnailsContainer');

    let currentImageIndex = 0;
    let filteredImages = [];
    const allGalleryImages = document.querySelectorAll('.gallery-item img');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Initialize with all images
    filteredImages = Array.from(allGalleryImages);

    // Category filtering functionality
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        if (filterValue === 'all') {
          filteredImages = Array.from(allGalleryImages);
          document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.6s ease forwards';
          });
        } else {
          const filteredItems = document.querySelectorAll(`.gallery-item[data-category="${filterValue}"]`);
          filteredImages = Array.from(filteredItems).map(item => item.querySelector('img'));

          // Hide all items first
          document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.display = 'none';
          });

          // Show filtered items with animation
          filteredItems.forEach((item, index) => {
            item.style.display = 'block';
            item.style.animation = `fadeInUp 0.6s ease forwards`;
            item.style.animationDelay = `${index * 0.1}s`;
          });
        }
      });
    });

    // Function to show image in lightbox
    function showImage(index) {
      if (index >= 0 && index < filteredImages.length) {
        currentImageIndex = index;
        const img = filteredImages[index];
        const galleryItem = img.closest('.gallery-item');

        modalImg.src = img.src;
        modalImg.alt = img.alt;

        const overlay = galleryItem.querySelector('.overlay-content');
        titleText.innerHTML = overlay.querySelector('h3').textContent;
        descriptionText.innerHTML = overlay.querySelector('p').textContent;
        categoryText.innerHTML = overlay.querySelector('.category-tag').textContent;

        updateThumbnails();
      }
    }

    // Function to create and update thumbnails
    function updateThumbnails() {
      thumbnailsContainer.innerHTML = '';

      filteredImages.forEach((img, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = img.src;
        thumbnail.alt = img.alt;
        thumbnail.className = 'thumbnail' + (index === currentImageIndex ? ' active' : '');
        thumbnail.addEventListener('click', () => showImage(index));
        thumbnailsContainer.appendChild(thumbnail);
      });
    }

    // Function to show next image
    function showNext() {
      const nextIndex = (currentImageIndex + 1) % filteredImages.length;
      showImage(nextIndex);
    }

    // Function to show previous image
    function showPrev() {
      const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
      showImage(prevIndex);
    }

    // Add click event to all gallery images
    allGalleryImages.forEach((img, index) => {
      img.addEventListener('click', function() {
        // Update filtered images based on current filter
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        if (activeFilter === 'all') {
          filteredImages = Array.from(allGalleryImages);
          currentImageIndex = index;
        } else {
          filteredImages = Array.from(document.querySelectorAll(`.gallery-item[data-category="${activeFilter}"] img`));
          currentImageIndex = filteredImages.indexOf(img);
        }

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        showImage(currentImageIndex);
      });
    });

    // Navigation button events
    if (prevBtn) {
      prevBtn.addEventListener('click', showPrev);
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', showNext);
    }

    // Close modal when clicking the close button
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
      });
    }

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('lightbox-overlay')) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (modal.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          showPrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          showNext();
        } else if (e.key === 'Escape') {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto'; // Restore scrolling
        }
      }
    });

    // Image loading animation with intersection observer for better performance
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, { threshold: 0.1 });

    allGalleryImages.forEach(img => {
      imageObserver.observe(img);
    });

    // Smooth scroll animations for gallery items
    const galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-item').forEach(item => {
      galleryObserver.observe(item);
    });
  }

  // Tour Details Modal Functionality
  const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

  const tourData = {
      meghalaya: {
        title: 'Meghalaya Shillong, Sohra (Cherrapunjee), Dawki and Mawlynnong (4 DAYS/ 5 NIGHTS)',
        image: 'asset/meghalaya/meghalayahill.jpg',
        itinerary: `
          <h3>Tour Highlights</h3>
          <ul>
            <li>Umiam Lake – Beautiful Reservoir Lake</li>
            <li>Sohra (Cherrapunjee)- Waterfalls &amp; Caves</li>
            <li>Dawki – Crystal clear water</li>
            <li>Mawlynnong – Asia’s cleanest village</li>
            <li>Laitlum Canyons – Deep Valleys and misty clouds</li>
          </ul>
          
          <h3>Detailed Itinerary</h3>
          <div class="itinerary-day">
            <h4>Day 1: Arrival at Guwahati &amp; Travel to Shillong</h4>
            <p>Morning/Afternoon: Arrive at Guwahati Airport or Railway Station and take a scenic drive to Shillong, the capital of Meghalaya. En route: Stop at a picturesque Umiam Lake (also known as Barapani) for views and optional water activities. Evening: Check in to your hotel and spend the evening exploring the bustling Police Bazar area for shopping and local food.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 2: Shillong Sightseeing and Journey to Sohra (Cherrapunjee)</h4>
            <p>Morning: After breakfast, visit local Shillong attractions such as the tiered Elephant Falls and Shillong Peak for panoramic city views. Afternoon: Drive to Sohra (Cherrapunjee), one of the wettest place on Earth. On the way stop at the scenic Mawkdok Dympep Valley Viewpoint. Evening: Upon arrival in Sohra, check into your accommodation and relax.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 3: Exploring Sohra's (Cherrapunjee) Wonders &amp; the Double Decker Root Bridge Trek</h4>
            <p>Morning: After breakfast, explore the natural limestone formations of the Mawsmai Cave &amp; Arwah Cave. Afternoon: Witness the magnificent Nohkalikai Falls, India's tallest plunge waterfall &amp; Seven Sisters Waterfalls, a stunning seven-segmented waterfall. Evening: Return to hotel in Sohra (Cherrapunjee) for an overnight stay.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 4: Mawlynnong Village &amp; Dawki River Adventure</h4>
            <p>Morning: After breakfast, drive to Mawlynnong Village, known as "Asia's Cleanest Village". Walk around the pristine village and see the local Living Root Bridge and the Natural Balancing Rock. Afternoon: Proceed to Dawki, a town on the India-Bangladesh border, famous for the crystal-clear water of the Umngot River. Enjoy a tranquil boat ride on the river. Evening: Drive back to Shillong for your overnight stay.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 5: Laitlum Canyon &amp; Departure</h4>
            <p>Morning: After breakfast, visit the stunning Laitlum Canyons, offering breathtaking panoramic views of the hills and gorges. Afternoon: Depart for Guwahati Airport or Railway Station for your onward journey, carrying memories of Meghalaya's natural beauty.</p>
          </div>
          
          <h3>Package Includes</h3>
          <ul>
            <li>Accommodation in comfortable hotels, guest house, etc.</li>
            <li>Meals (Breakfast &amp; Dinner)</li>
            <li>Transportation</li>
            <li>English &amp; Hindi speaking guides</li>
            <li>Parking</li>
          </ul>
          
          <h3>Package Excludes</h3>
          <ul>
            <li>Airfare/Train fare</li>
            <li>Personal expenses</li>
            <li>Camera fees</li>
            <li>Entry fees (at chargeable spots)</li>
            <li>Travel insurance</li>
            <li>Any additional activities</li>
          </ul>
        `
      },
      assam: {
        title: 'Assam Guwahati, Kamakhya Temple, Kaziranga National Park And Manjuli Island (4 Days/ 5 Nights)',
        image: 'asset/Kaziranga1.png',
        itinerary: `
          <h3>Tour Highlights</h3>
          <ul>
            <li>Kamakhya Temple – One of the 108 Shakti Peethas</li>
            <li>Kaziranga National Park – UNESCO World Heritage Site</li>
            <li>Majuli Island – World's largest inhabited river island</li>
            <li>Umananda Temple – A temple in an island in the Brahmaputra River</li>
          </ul>
          
          <h3>Detailed Itinerary</h3>
          <div class="itinerary-day">
            <h4>Day 1: Arrival in Guwahati and Local Exploration</h4>
            <p>Morning/Afternoon: Upon arrival at Guwahati Airport or Railway Station, check into your hotel. Afternoon: Visit the revered Kamakhya Temple located atop Nilachal Hills. Evening: Enjoy a picturesque Sunset Cruise on the Brahmaputra River and overnight stay in Guwahati.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 2: Guwahati to Kaziranga National Park</h4>
            <p>Morning: After breakfast, visit Umananda Temple located in the Brahmaputra River accessible via regular ferry services from Guwahati. Afternoon: Drive to Kaziranga National Park, a UNESCO World Heritage Site famous for one-horned rhinoceros. En Route: Visit the Maha Mritunjay Temple, featuring the World's largest Shiva Linga (126 feet tall). Evening: Check into your hotel for an overnight stay.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 3: Kaziranga Safaris &amp; Orchid Park</h4>
            <p>Morning: Start your day with an early morning Elephant or Jeep Safari in the park's central or western range for a chance to spot diverse wildlife up close. Afternoon: Visit the Kaziranga Orchid and Biodiversity Park, the largest in North East India. Evening: It can be spent at leisure or exploring nearby tea gardens and local villages.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 4: Majuli Island Exploration</h4>
            <p>Morning: Drive to Jorhat (around 2.5 hrs) and take a ferry to Majuli island, the world's Largest River Island and hub of Neo-Vaishnavite culture. Afternoon: Explore traditional Satras (monasteries), witness traditional mask making and observe the Missing tribal villages. Evening: Stay overnight in Majuli or Jorhat.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 5: Guwahati &amp; Departure</h4>
            <p>Morning: Drive back to Guwahati (7 hrs approx). Afternoon: Visit Tirupati Sri Balaji Temple, a prominent South Indian style temple featuring 4 tons idol of Lord Venkateshwara. Evening: Drop at Guwahati Airport or Railway Station for your onward journey, carrying Assam's cordiality.</p>
          </div>
          
          <h3>Package Includes</h3>
          <ul>
            <li>Accommodation in comfortable hotels, guest house, etc.</li>
            <li>Meals (Breakfast &amp; Dinner)</li>
            <li>Transportation</li>
            <li>English &amp; Hindi speaking guides</li>
            <li>Parking</li>
          </ul>
          
          <h3>Package Excludes</h3>
          <ul>
            <li>Airfare/Train fare</li>
            <li>Personal expenses</li>
            <li>Camera fees</li>
            <li>Entry fees (at chargeable spots)</li>
            <li>Travel insurance</li>
          </ul>
        `
      },
      'assam-meghalaya': {
        title: 'Assam &amp; Meghalaya (4 Nights/ 5 Days)',
        image: 'asset/assam/assam0012.jpg',
        itinerary: `
          <h3>Tour Highlights</h3>
          <ul>
            <li>Kaziranga National Park- UNESCO World Heritage Site</li>
            <li>Dawki- Crystal clear water</li>
            <li>Sohra- Waterfalls &amp; Caves</li>
            <li>Mawlynnong- Asia's cleanest village</li>
          </ul>
          
          <h3>Detailed Itinerary</h3>
          <div class="itinerary-day">
            <h4>Day 1: Arrival &amp; Kaziranga</h4>
            <p>Morning: Arrive in Guwahati Airport or Railway Station, travel to Kaziranga National Park. Evening: Visit the Kaziranga Orchid and Biodiversity Park, the largest in North East India.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 2: Kaziranga Safari &amp; travel to Shillong</h4>
            <p>Morning: Start your day with an early morning Elephant or Jeep Safari in the park's central or western range for a chance to spot diverse wildlife and the one-horned rhinoceros up close. After breakfast: Travel to Shillong, the capital of Meghalaya. En route: Stop at a picturesque Umiam Lake (also known as Barapani) for views and optional water activities. Evening: Check in to your hotel and spend the evening exploring the bustling Police Bazar area for shopping and local food.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 3: Sohra (Cherrapunjee)</h4>
            <p>Morning &amp; Afternoon: Full-day excursion in Sohra (Cherrapunjee), witness the magnificent Nohkalikai Falls, India's tallest plunge waterfall &amp; Seven Sisters Waterfalls, a stunning seven-segmented waterfall and explore the natural limestone formations of the Mawsmai Cave &amp; Arwah Cave. Evening: Return to Shillong for overnight stay.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 4: Mawlynnong Village &amp; Dawki River Adventure</h4>
            <p>Morning: After breakfast, visit Mawlynnong, "Asia's Cleanest Village", and enjoy a boat ride on the crystal clear water of Umngot River in Dawki. Evening: Return to Shillong for an overnight stay.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 5: Shillong sight-seeing &amp; Departure</h4>
            <p>Morning: Visit Elephant Falls, a stunning three tiered waterfall and the Don Bosco Museum provides a glimpse of the rich and multi-cultural lifestyle of the indigenous people of Northeast. Evening: Depart for Guwahati Airport or Railway Station for your onward journey.</p>
          </div>
          
          <h3>Package Includes</h3>
          <ul>
            <li>Accommodation in comfortable hotels, guest house, etc.</li>
            <li>Meals (Breakfast &amp; Dinner)</li>
            <li>Transportation</li>
            <li>English &amp; Hindi speaking guides</li>
            <li>Parking</li>
          </ul>
          
          <h3>Package Excludes</h3>
          <ul>
            <li>Airfare/Train fare</li>
            <li>Personal expenses</li>
            <li>Camera fees</li>
            <li>Entry fees (at chargeable spots)</li>
            <li>Travel insurance</li>
          </ul>
        `
      },
      'assam-arunachal': {
        title: 'Assam & Arunachal Pradesh Tour (Kaziranga, Tawang) - 8 Days / 7 Nights',
        image: 'asset/tawang/panga-teng-tso-lake-tawang-arunachal.jpg',
        itinerary: `
          <h3>Tour Highlights</h3>
          <ul>
            <li>Kamakhya Temple – One of the 108 Shakti Peethas</li>
            <li>Kaziranga National Park – UNESCO World Heritage Site</li>
            <li>Bomdila- stunning Himalayan views &amp; serene Tibetan Buddhist Monasteries</li>
            <li>Dirang- Hot Springs , Apple Orchards &amp; historic fort</li>
            <li>Tawang- Asia's Second Largest Monastery, frozen lake &amp; Waterfalls</li>
          </ul>
          
          <h3>Detailed Itinerary</h3>
          <div class="itinerary-day">
            <h4>Day 1: Arrival at Guwahati &amp; Local Exploration</h4>
            <p>Morning/Afternoon: Upon arrival at Guwahati Airport or Railway Station, check into your hotel. Afternoon: Visit the revered Kamakhya Temple located atop Nilachal Hills. Evening: Enjoy a picturesque Sunset Cruise on the Brahmaputra River and overnight stay in Guwahati.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 2: Guwahati to Kaziranga National Park</h4>
            <p>Morning: After breakfast, visit Umananda Temple located in the Brahmaputra River accessible via regular ferry services from Guwahati. Afternoon: Drive to Kaziranga National Park, a UNESCO World Heritage Site famous for one-horned rhinoceros. Evening: Visit the Kaziranga Orchid and Biodiversity Park, the largest in North East India.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 3: Kaziranga Safaris &amp; Dirang (Arunachal Pradesh)</h4>
            <p>Morning: Start your day with an early morning Elephant or Jeep Safari in the park's central or western range for a chance to spot diverse wildlife and one horned rhinoceros up close. After breakfast: Start your journey to Dirang. En route: Visit the Bomdila Monastery considered the replica of the Tsona Gontse Monastery in South Tibet, witness the beautiful Nichiphula Waterfall located in a deep valley surrounded by Himalayan Mountains and experience walking on a hanging bridge. Evening: Check into your hotels and you can explore the local Dirang Market.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 4: Dirang to Tawang</h4>
            <p>Morning: After breakfast, visit the Dirang Dzong Fort centuries old four storey fort offering a glimpse into the historic architecture and witness the naturally occurring Hot Water Springs situated on a hilltop, believed to have medicinal properties known as the Dirang Hot Water Spring. En route: Stop at Sela Lake (at 13,700 ft) known for its deep blue waters in summer and frozen surface in winter. Evening: Check into your hotels for an overnight stay.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 5: Exploring Tawang</h4>
            <p>Morning: After breakfast, visit the Gaden Namgyal Lhatse Monastery (Tawang Monastery), 'India's Largest Monastery &amp; Asia's Second Largest Monastery.' After which you can visit the Buddha Park it offers a panoramic views of the surrounding hills and at the centerpiece a 30 ft tall gilded statue of the Lord Buddha situated on a hill. Afternoon: You can explore the Local Market. Evening: Witness the Tawang War Memorial where you can see a 40 ft high Buddhist style Stupa honoring 2420 Indian soldiers who died in the 1962 Indo-China War. Sound &amp; Light Shows are also held here which depicts the War's events and sacrifices. The Major Ralengnao Bob Khating Museum is located nearby. Lastly, you can enjoy the cultural programme like the traditional Monpa Dance &amp; the Snow Lion Dance here.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 6: Sangetsar Lake (Madhuri Lake) &amp; Bumla Pass</h4>
            <p>Morning: After breakfast, set out to visit Bumla Pass it is a historic Sino-Indian Border post famously used by the Dalai Lama to enter India. It offers panoramic views of the Tibetan Plateau. En route: You will witness Sangetsar Lake also known as Madhuri Lake after a song from Koyla movie was shot here. It is a stunning high altitude lake formed by an earthquake in the 1970s, it is renowned for its scenic beauty and partially submerged tree trunks. Evening: Check into your hotel for an overnight stay.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 7: Tawang to Tezpur</h4>
            <p>Morning: Set on your journey to Tezpur (Assam). En route: Stop at Nuranang Waterfalls (Jang Falls), is a spectacular 100 meter-high waterfall and visit Jaswant Garh War Memorial, a memorial in honour of Rifleman Jaswant Singh Rawat who valiantly fought the Chinese Army during 1962 Sino-Indian War. Evening: Check into your hotel for an overnight stay at Tezpur.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 8: Tezpur to Guwahati</h4>
            <p>Morning: After breakfast, drive back to Guwahati. En route: Visit the Maha Mritunjay Temple, featuring the World's largest Shiva Linga (126 feet tall). Evening: Drop at Guwahati Airport or Railway Station for your onward journey, ending your tour with wonderful memories.</p>
          </div>
          
          <h3>Package Includes</h3>
          <ul>
            <li>Accommodation in comfortable hotels, guest house, etc.</li>
            <li>Meals (Breakfast &amp; Dinner)</li>
            <li>Transportation</li>
            <li>English &amp; Hindi speaking guides</li>
            <li>Parking</li>
          </ul>
          
          <h3>Package Excludes</h3>
          <ul>
            <li>Airfare/Train fare</li>
            <li>Personal expenses</li>
            <li>Camera fees</li>
            <li>Entry fees (at chargeable spots)</li>
            <li>Travel insurance</li>
            <li>Any additional activities</li>
          </ul>
        `
      }
  };

  const tourBookingLinks = {
    meghalaya: "https://wa.me/919612763725?text=Hello%20Travel%20Bug%20North%20East!%20I%20am%20interested%20in%20the%20Meghalaya%20Shillong%2C%20Sohra%20(Cherrapunjee)%2C%20Dawki%20and%20Mawlynnong%20(4%20Days%2F5%20Nights)%20Tour.%20Please%20provide%20booking%20details.",
    assam: "https://wa.me/919612763725?text=Hello%20Travel%20Bug%20North%20East!%20I%20am%20interested%20in%20the%20Assam%20Guwahati%2C%20Kamakhya%20Temple%2C%20Kaziranga%20National%20Park%20And%20Majuli%20Island%20(4%20Days%2F5%20Nights)%20Tour.%20Please%20provide%20booking%20details.",
    "assam-meghalaya": "https://wa.me/919612763725?text=Hello%20Travel%20Bug%20North%20East!%20I%20am%20interested%20in%20the%20Assam%20%26%20Meghalaya%20(4%20Nights%2F5%20Days)%20Tour.%20Please%20provide%20booking%20details.",
    "assam-arunachal": "https://wa.me/919612763725?text=Hello%20Travel%20Bug%20North%20East!%20I%20am%20interested%20in%20the%20Assam%20%26%20Arunachal%20Pradesh%20Tour%20(Kaziranga%2C%20Tawang)%20-%208%20Days%20%2F%207%20Nights.%20Please%20provide%20booking%20details."
  };

  function renderTourDetailsHtml(tourId, bookNowUrl) {
    return `
      <div class="modal-header-section" style="background-image: url('${tourData[tourId].image}');">
        <h2>${tourData[tourId].title}</h2>
      </div>
      <div class="modal-content-section">
        ${tourData[tourId].itinerary}
        <div class="modal-book-now-section">
          <a href="${bookNowUrl}" class="modal-book-now-btn">
            <i class="fab fa-whatsapp"></i>
            Book Now via WhatsApp
          </a>
        </div>
        <div class="modal-footer">
          <p>✨ Your gateway to Northeast India's beauty - Travel Bug North East</p>
        </div>
      </div>
    `;
  }

  // Destinations page behavior: View Details navigates to plan page (instead of modal)
  if (viewDetailsBtns.length > 0) {
    viewDetailsBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const tourId = this.getAttribute('data-tour');
        if (!tourId || !tourData[tourId]) return;
        window.location.href = `${encodeURIComponent(tourId)}.html`;
      });
    });
  }

  // Tour plan page behavior: Render the same content as the old modal.
  const tourPlanDetails = document.getElementById('tourPlanDetails');
  if (tourPlanDetails) {
    const params = new URLSearchParams(window.location.search);
    const tourId =
      params.get('tour') ||
      document.body.getAttribute('data-tour') ||
      null;
    if (tourId && tourData[tourId]) {
      const bookNowUrl = tourBookingLinks[tourId] || '#';
      tourPlanDetails.innerHTML = renderTourDetailsHtml(tourId, bookNowUrl);
    } else {
      tourPlanDetails.innerHTML = `
        <div class="modal-content-section">
          <h2 style="margin-bottom: 0.5rem;">Tour not found</h2>
          <p style="color:#4a5568;">Please go back and select a tour package.</p>
          <div style="margin-top: 1.5rem;">
            <a class="view-details-btn" href="destinations.html" style="display:inline-block; text-decoration:none; text-align:center;">
              Back to Destinations
            </a>
          </div>
        </div>
      `;
    }
  }

  // (Old modal behavior removed intentionally.)
});

