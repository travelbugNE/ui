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
    "asset/SevenSisterFalls.png",
    "asset/Kaziranga1.png",
    "asset/Kaziranga2.png",
    "asset/Tawang.png",
    "asset/Cherrapunji.png",
    "asset/Mawlynnong.png",
    "asset/Shillong.jpg",
    "asset/Sunset.png",
    "asset/Shillong3.jpg",
    "asset/WeiSawdong.jpg",
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

// Gallery Modal Functionality
document.addEventListener("DOMContentLoaded", () => {
  // Only run on pages with gallery
  if (document.querySelector('.gallery-grid')) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentImageIndex = 0;
    const galleryImages = document.querySelectorAll('.gallery-item img');

    // Function to show image in modal
    function showImage(index) {
      if (index >= 0 && index < galleryImages.length) {
        currentImageIndex = index;
        const img = galleryImages[index];
        modalImg.src = img.src;
        captionText.innerHTML = img.getAttribute('data-description') || img.alt;
      }
    }

    // Function to show next image
    function showNext() {
      const nextIndex = (currentImageIndex + 1) % galleryImages.length;
      showImage(nextIndex);
    }

    // Function to show previous image
    function showPrev() {
      const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage(prevIndex);
    }

    // Add click event to all gallery images
    galleryImages.forEach((img, index) => {
      img.addEventListener('click', function() {
        modal.style.display = 'block';
        showImage(index);
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
      });
    }

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
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
        }
      }
    });

    // Image loading animation
    galleryImages.forEach(img => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
      }
    });
  }

  // Tour Details Modal Functionality
  const tourModal = document.getElementById('tourModal');
  const tourDetails = document.getElementById('tourDetails');
  const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

  const tourData = {
      arunachal: {
        title: '6 Nights / 7 Days Arunachal Pradesh Tour (Dirang – Tawang)',
        image: 'asset/Tawang.png',
        itinerary: `
          <h3>Tour Highlights</h3>
          <ul>
            <li>Bhalukpong - Gateway to Arunachal Pradesh</li>
            <li>Tipi Orchid Centre - World's largest orchidarium</li>
            <li>Dirang Dzong - Ancient fort and monastery</li>
            <li>Tawang Monastery - Largest monastery in India</li>
            <li>Beautiful landscapes and cultural experiences</li>
          </ul>
          
          <h3>Detailed Itinerary</h3>
          <div class="itinerary-day">
            <h4>Day 1: Arrival at Bhalukpong</h4>
            <p>Arrival at Bhalukpong. Transfer to hotel. Evening free for relaxation. Overnight stay.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 2: Bhalukpong to Dirang</h4>
            <p>After breakfast, drive to Dirang. Visit Tipi Orchid Centre. Check into hotel. Evening at leisure. Overnight stay.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 3: Dirang Sightseeing</h4>
            <p>Visit Dirang Dzong and Hot Spring. Explore the beautiful Dirang Valley. Overnight stay in Dirang.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 4: Dirang to Tawang</h4>
            <p>Early morning drive to Tawang (Sela Pass). Visit Sela Lake and Pass. Arrive Tawang. Overnight stay.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 5: Tawang Sightseeing</h4>
            <p>Visit Tawang Monastery, War Memorial, and local markets. Explore the cultural heritage. Overnight stay.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 6: Tawang to Bomdila</h4>
            <p>Drive to Bomdila. Visit Bomdila Monastery and viewpoints. Overnight stay in Bomdila.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 7: Departure</h4>
            <p>After breakfast, drive back to Bhalukpong/Guwahati for departure. Tour ends with sweet memories.</p>
          </div>
          
          <h3>Package Includes</h3>
          <ul>
            <li>Accommodation in comfortable hotels</li>
            <li>All meals (Breakfast, Lunch, Dinner)</li>
            <li>Transportation by private vehicle</li>
            <li>English speaking guide</li>
            <li>All entry fees and permits</li>
            <li>Inner line permit assistance</li>
          </ul>
          
          <h3>Package Excludes</h3>
          <ul>
            <li>Airfare/Train fare</li>
            <li>Personal expenses</li>
            <li>Camera fees</li>
            <li>Any additional activities</li>
            <li>Travel insurance</li>
          </ul>
        `
      },
      mawsynram: {
        title: '3 Nights / 4 Days Mawsynram Tour Package (Shillong – Mawsynram – Dawki)',
        image: 'asset/Cherrapunji.png',
        itinerary: `
          <h3>Tour Highlights</h3>
          <ul>
            <li>Umiam Lake (Barapani) - Beautiful reservoir lake</li>
            <li>Elephant Falls - Scenic waterfall in Shillong</li>
            <li>Shillong Peak - Highest point in Shillong</li>
            <li>Mawsynram - Wettest place on Earth</li>
            <li>Dawki River - Crystal clear waters</li>
          </ul>
          
          <h3>Detailed Itinerary</h3>
          <div class="itinerary-day">
            <h4>Day 1: Arrival in Shillong</h4>
            <p>Arrival at Shillong. Transfer to hotel. Visit Umiam Lake and Elephant Falls. Evening at leisure. Overnight stay in Shillong.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 2: Shillong Sightseeing</h4>
            <p>Visit Shillong Peak, Ward's Lake, and local markets. Explore the colonial architecture. Overnight stay in Shillong.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 3: Shillong to Mawsynram to Dawki</h4>
            <p>Drive to Mawsynram (wettest place on Earth). Visit waterfalls and living root bridges. Continue to Dawki for boat ride on Umngot River. Overnight stay in Dawki.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 4: Departure</h4>
            <p>After breakfast, transfer to Guwahati/Shillong airport/railway station for departure. Tour ends.</p>
          </div>
          
          <h3>Package Includes</h3>
          <ul>
            <li>Accommodation in comfortable hotels</li>
            <li>All meals (Breakfast, Lunch, Dinner)</li>
            <li>Transportation by private vehicle</li>
            <li>English speaking guide</li>
            <li>All entry fees</li>
          </ul>
          
          <h3>Package Excludes</h3>
          <ul>
            <li>Airfare/Train fare</li>
            <li>Personal expenses</li>
            <li>Camera fees</li>
            <li>Any additional activities</li>
            <li>Travel insurance</li>
          </ul>
        `
      },
      nartiang: {
        title: '3 Nights / 4 Days Nartiang Tour Package (Shillong – Jaintia Hills – Dawki)',
        image: 'asset/Shillong.jpg',
        itinerary: `
          <h3>Tour Highlights</h3>
          <ul>
            <li>Umiam Lake - Beautiful reservoir lake</li>
            <li>Elephant Falls - Scenic waterfall</li>
            <li>Shillong Peak - Panoramic views</li>
            <li>Jaintia Hills - Traditional Khasi culture</li>
            <li>Dawki River - Crystal clear waters</li>
          </ul>
          
          <h3>Detailed Itinerary</h3>
          <div class="itinerary-day">
            <h4>Day 1: Arrival in Shillong</h4>
            <p>Arrival at Shillong. Transfer to hotel. Visit Umiam Lake and Elephant Falls. Evening at leisure. Overnight stay in Shillong.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 2: Shillong Sightseeing</h4>
            <p>Visit Shillong Peak, Ward's Lake, and local markets. Explore the colonial architecture. Overnight stay in Shillong.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 3: Shillong to Jaintia Hills to Dawki</h4>
            <p>Drive to Jaintia Hills. Visit Nartiang Monoliths and traditional villages. Continue to Dawki for boat ride on Umngot River. Overnight stay in Dawki.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 4: Departure</h4>
            <p>After breakfast, transfer to Guwahati/Shillong airport/railway station for departure. Tour ends.</p>
          </div>
          
          <h3>Package Includes</h3>
          <ul>
            <li>Accommodation in comfortable hotels</li>
            <li>All meals (Breakfast, Lunch, Dinner)</li>
            <li>Transportation by private vehicle</li>
            <li>English speaking guide</li>
            <li>All entry fees</li>
          </ul>
          
          <h3>Package Excludes</h3>
          <ul>
            <li>Airfare/Train fare</li>
            <li>Personal expenses</li>
            <li>Camera fees</li>
            <li>Any additional activities</li>
            <li>Travel insurance</li>
          </ul>
        `
      },
      'northeast-kaziranga': {
        title: '5 Nights / 6 Days North East Tour (Kaziranga – Shillong – Cherrapunjee – Dawki – Mawlynnong)',
        image: 'asset/Kaziranga1.png',
        itinerary: `
          <h3>Tour Highlights</h3>
          <ul>
            <li>Kaziranga National Park - UNESCO World Heritage Site</li>
            <li>Elephant Safari - Wildlife experience</li>
            <li>Jeep Safari - Explore the park</li>
            <li>Shillong - Scotland of the East</li>
            <li>Cherrapunjee - Wettest place on Earth</li>
            <li>Dawki - Crystal clear river</li>
            <li>Mawlynnong - Asia's cleanest village</li>
          </ul>
          
          <h3>Detailed Itinerary</h3>
          <div class="itinerary-day">
            <h4>Day 1: Arrival at Kaziranga</h4>
            <p>Arrival at Kaziranga. Transfer to resort. Evening at leisure. Overnight stay in Kaziranga.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 2: Kaziranga Wildlife Safari</h4>
            <p>Morning and evening jeep/elephant safari in Kaziranga National Park. Spot rhinos, tigers, and birds. Overnight stay in Kaziranga.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 3: Kaziranga to Shillong</h4>
            <p>Drive to Shillong. Visit Umiam Lake and Elephant Falls on the way. Check into hotel. Evening at leisure. Overnight stay in Shillong.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 4: Shillong to Cherrapunjee to Mawlynnong</h4>
            <p>Drive to Cherrapunjee. Visit Nohkalikai Falls and viewpoints. Continue to Mawlynnong village. Overnight stay near Mawlynnong.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 5: Mawlynnong to Dawki</h4>
            <p>Visit Mawlynnong village. Drive to Dawki for boat ride on Umngot River. Explore the border area. Overnight stay in Dawki.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 6: Departure</h4>
            <p>After breakfast, transfer to Guwahati airport/railway station for departure. Tour ends with wonderful memories.</p>
          </div>
          
          <h3>Package Includes</h3>
          <ul>
            <li>Accommodation in comfortable hotels/resorts</li>
            <li>All meals (Breakfast, Lunch, Dinner)</li>
            <li>Transportation by private vehicle</li>
            <li>English speaking guide</li>
            <li>Kaziranga safari fees</li>
            <li>All entry fees</li>
          </ul>
          
          <h3>Package Excludes</h3>
          <ul>
            <li>Airfare/Train fare</li>
            <li>Personal expenses</li>
            <li>Camera fees</li>
            <li>Any additional activities</li>
            <li>Travel insurance</li>
          </ul>
        `
      },
      meghalaya: {
        title: '3 Nights / 4 Days Meghalaya Tour (Shillong – Cherrapunjee – Mawlynnong – Dawki)',
        image: 'asset/Mawlynnong.png',
        itinerary: `
          <h3>Tour Highlights</h3>
          <ul>
            <li>Umiam Lake (Barapani) - Beautiful reservoir</li>
            <li>Elephant Falls - Scenic waterfall</li>
            <li>Shillong Peak - Panoramic views</li>
            <li>Cherrapunjee - Wettest place on Earth</li>
            <li>Mawlynnong - Asia's cleanest village</li>
            <li>Dawki River - Crystal clear waters</li>
          </ul>
          
          <h3>Detailed Itinerary</h3>
          <div class="itinerary-day">
            <h4>Day 1: Arrival in Shillong</h4>
            <p>Arrival at Shillong. Transfer to hotel. Visit Umiam Lake and Elephant Falls. Evening at leisure. Overnight stay in Shillong.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 2: Shillong to Cherrapunjee</h4>
            <p>Drive to Cherrapunjee. Visit Nohkalikai Falls, Seven Sisters Falls, and Eco Park. Explore the viewpoints. Overnight stay in Cherrapunjee.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 3: Cherrapunjee to Mawlynnong to Dawki</h4>
            <p>Visit Mawlynnong village (Asia's cleanest village). See living root bridges. Continue to Dawki for boat ride on Umngot River. Overnight stay in Dawki.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 4: Departure</h4>
            <p>After breakfast, transfer to Guwahati/Shillong airport/railway station for departure. Tour ends.</p>
          </div>
          
          <h3>Package Includes</h3>
          <ul>
            <li>Accommodation in comfortable hotels</li>
            <li>All meals (Breakfast, Lunch, Dinner)</li>
            <li>Transportation by private vehicle</li>
            <li>English speaking guide</li>
            <li>All entry fees</li>
          </ul>
          
          <h3>Package Excludes</h3>
          <ul>
            <li>Airfare/Train fare</li>
            <li>Personal expenses</li>
            <li>Camera fees</li>
            <li>Any additional activities</li>
            <li>Travel insurance</li>
          </ul>
        `
      },
      'northeast-shillong': {
        title: '2 Nights / 3 Days North East Tour (Shillong – Cherrapunjee)',
        image: 'asset/Shillong3.jpg',
        itinerary: `
          <h3>Tour Highlights</h3>
          <ul>
            <li>Umiam Lake (Barapani) - Beautiful reservoir lake</li>
            <li>Shillong Peak - Highest point in Shillong</li>
            <li>Elephant Falls - Scenic waterfall</li>
            <li>Cherrapunjee - Wettest place on Earth</li>
            <li>Seven Sisters Falls - Spectacular waterfalls</li>
          </ul>
          
          <h3>Detailed Itinerary</h3>
          <div class="itinerary-day">
            <h4>Day 1: Arrival in Shillong</h4>
            <p>Arrival at Shillong. Transfer to hotel. Visit Umiam Lake, Elephant Falls, and Shillong Peak. Evening at leisure. Overnight stay in Shillong.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 2: Shillong to Cherrapunjee</h4>
            <p>Drive to Cherrapunjee. Visit Nohkalikai Falls, Seven Sisters Falls, and Eco Park. Explore the viewpoints and living root bridges. Overnight stay in Cherrapunjee.</p>
          </div>
          
          <div class="itinerary-day">
            <h4>Day 3: Departure</h4>
            <p>After breakfast, transfer to Guwahati/Shillong airport/railway station for departure. Tour ends.</p>
          </div>
          
          <h3>Package Includes</h3>
          <ul>
            <li>Accommodation in comfortable hotels</li>
            <li>All meals (Breakfast, Lunch, Dinner)</li>
            <li>Transportation by private vehicle</li>
            <li>English speaking guide</li>
            <li>All entry fees</li>
          </ul>
          
          <h3>Package Excludes</h3>
          <ul>
            <li>Airfare/Train fare</li>
            <li>Personal expenses</li>
            <li>Camera fees</li>
            <li>Any additional activities</li>
            <li>Travel insurance</li>
          </ul>
        `
      }
  };

  const tourBookingLinks = {
    mawsynram: "https://wa.me/919612763725?text=Hello%20Travel%20Bug%20North%20East!%20I%20am%20interested%20in%20the%203%20Nights%204%20Days%20Mawsynram%20Tour%20Package.%20Please%20provide%20booking%20details.",
    nartiang: "https://wa.me/919612763725?text=Hello%20Travel%20Bug%20North%20East!%20I%20am%20interested%20in%20the%203%20Nights%204%20Days%20Nartiang%20Tour%20Package.%20Please%20provide%20booking%20details.",
    arunachal: "https://wa.me/919612763725?text=Hello%20Travel%20Bug%20North%20East!%20I%20am%20interested%20in%20the%206%20Nights%207%20Days%20Arunachal%20Pradesh%20Tour%20(Dirang%20%E2%80%93%20Tawang).%20Please%20provide%20booking%20details.",
    "northeast-kaziranga": "https://wa.me/919612763725?text=Hello%20Travel%20Bug%20North%20East!%20I%20am%20interested%20in%20the%205%20Nights%206%20Days%20North%20East%20Tour.%20Please%20provide%20booking%20details.",
    meghalaya: "https://wa.me/919612763725?text=Hello%20Travel%20Bug%20North%20East!%20I%20am%20interested%20in%20the%203%20Nights%204%20Days%20Meghalaya%20Tour.%20Please%20provide%20booking%20details.",
    "northeast-shillong": "https://wa.me/919612763725?text=Hello%20Travel%20Bug%20North%20East!%20I%20am%20interested%20in%20the%202%20Nights%203%20Days%20North%20East%20Tour.%20Please%20provide%20booking%20details."
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

