// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav-3d");
  if (window.scrollY > 100) {
    nav.style.background = "rgba(10, 10, 15, 0.95)";
  } else {
    nav.style.background = "rgba(10, 10, 15, 0.9)";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Observe cards and other elements
document
  .querySelectorAll(".glass-card, .project-card-3d, .skill-category")
  .forEach((element) => {
    observer.observe(element);
  });

// Particle system for hero background
function createParticles() {
  const particlesContainer = document.querySelector(".particles-container");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
    particlesContainer.appendChild(particle);
  }
}

// CSS for particle animation
const particleStyle = document.createElement("style");
particleStyle.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(${
              Math.random() * 200 - 100
            }px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
createParticles();

// 3D cursor effect
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor-3d") || createCursor();
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

function createCursor() {
  const cursor = document.createElement("div");
  cursor.className = "cursor-3d";
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0, 255, 255, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
    `;
  document.body.appendChild(cursor);
  return cursor;
}

// Skill progress animation
function animateSkillProgress() {
  const progressCircles = document.querySelectorAll(".progress-fill");

  progressCircles.forEach((circle) => {
    const progress = circle.getAttribute("data-progress");
    const circumference = 2 * Math.PI * 45; // radius is 45
    const offset = circumference - (progress / 100) * circumference;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    // Animate when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            circle.style.strokeDashoffset = offset;
          }, 500);
        }
      });
    });

    observer.observe(circle);
  });
}

// Initialize skill progress animation
animateSkillProgress();

// Typing effect for hero roles
function initTypewriter() {
  const roles = document.querySelectorAll(".role-item");
  let currentRole = 0;

  function showNextRole() {
    roles.forEach((role) => role.classList.remove("active"));
    roles[currentRole].classList.add("active");
    currentRole = (currentRole + 1) % roles.length;
  }

  // Initial display
  showNextRole();

  // Rotate every 3 seconds
  setInterval(showNextRole, 3000);
}

// Initialize typewriter effect
initTypewriter();

// Form handling
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    const submitBtn = this.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      submitBtn.textContent = "Message Sent!";
      submitBtn.style.background = "linear-gradient(135deg, #00ff88, #00ffff)";

      // Reset form
      this.reset();

      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
      }, 3000);

      // Show success message
      showNotification(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
    }, 2000);
  });
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "rgba(0, 255, 136, 0.9)"
            : "rgba(0, 255, 255, 0.9)"
        };
        color: #0a0a0f;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(
    ".floating-icons .icon-3d"
  );

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px) rotate(${
      scrolled * 0.1
    }deg)`;
  });
});

// Add gradient to SVG for progress rings
function addSVGGradients() {
  const svgs = document.querySelectorAll(".progress-svg");

  svgs.forEach((svg) => {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient"
    );
    gradient.id = "gradient";
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "0%");

    const stop1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop"
    );
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#00ffff");

    const stop2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop"
    );
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#00ff88");

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
  });
}

// Initialize SVG gradients
addSVGGradients();

// Smooth reveal animations
const revealElements = document.querySelectorAll(
  ".glass-card, .project-card-3d, .skill-category, .service-card, .testimonial-card"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Set initial state and observe elements
revealElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(30px)";
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  revealObserver.observe(element);
});

// Add loading animation
window.addEventListener("load", () => {
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0f, #050508);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;

  const loaderContent = document.createElement("div");
  loaderContent.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 60px; height: 60px; border: 3px solid rgba(0, 255, 255, 0.3); border-top: 3px solid #00ffff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <div style="font-family: 'Orbitron', monospace; color: #00ffff; font-size: 1.2rem; font-weight: 700;">Loading Experience...</div>
        </div>
    `;

  loader.appendChild(loaderContent);
  document.body.appendChild(loader);

  // Add spin animation
  const spinStyle = document.createElement("style");
  spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(spinStyle);

  // Remove loader after a short delay
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(loader);
    }, 500);
  }, 1500);
});

// Add interactive hover effects to project cards
document.querySelectorAll(".project-card-3d").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
    card.style.boxShadow = "0 20px 40px rgba(0, 255, 255, 0.2)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "";
  });
});

// Add glow effect to buttons on hover
document
  .querySelectorAll(".cta-btn, .service-btn, .view-project-btn, .submit-btn")
  .forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.5)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.boxShadow = "";
    });
  });

// Initialize all animations and effects
document.addEventListener("DOMContentLoaded", () => {
  // Add any additional initialization code here
  console.log("IC Melvin Portfolio - Loaded and Ready! 🚀");
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener("scroll", debouncedScrollHandler);

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation");
});

// Add focus styles for keyboard navigation
const keyboardStyle = document.createElement("style");
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #00ffff !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyle);
