// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Show loading screen and initialize after delay
  showLoadingScreen();

  // Initialize all functionality after loading
  setTimeout(() => {
    initNavigation();
    initScrollEffects();
    initPortfolioFilter();
    initContactForm();
    initAnimations();
    initSmoothScrolling();
    hideLoadingScreen();

    console.log("Portfolio website initialized successfully");
  }, 3500); // Show loading for 3.5 seconds
});

// Loading screen functionality
function showLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.style.display = "flex";
    startLoadingCounter();
  }
}

function startLoadingCounter() {
  const percentElement = document.getElementById("loading-percent");
  let currentPercent = 0;

  const interval = setInterval(() => {
    currentPercent += Math.random() * 15 + 5; // Random increment between 5-20

    if (currentPercent >= 100) {
      currentPercent = 100;
      clearInterval(interval);
    }

    if (percentElement) {
      percentElement.textContent = Math.floor(currentPercent);
    }
  }, 200); // Update every 200ms
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.classList.add("fade-out");
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 800); // Wait for fade animation to complete
  }
}

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  mobileMenu.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active navigation link based on scroll position
  updateActiveNavLink();
  window.addEventListener("scroll", updateActiveNavLink);
}

// Update active navigation link based on current section
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Scroll effects and animations
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe elements for fade-in animations
  const elementsToAnimate = document.querySelectorAll(
    ".service-card, .portfolio-item, .about-content, .contact-content"
  );

  elementsToAnimate.forEach((element) => {
    element.classList.add("fade-in");
    observer.observe(element);
  });
}

// Portfolio animation functionality
function initPortfolioFilter() {
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  // Initialize portfolio items with fade-in
  portfolioItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "all 0.3s ease-out";

    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  const formInputs = contactForm.querySelectorAll("input, select, textarea");

  // Add floating label functionality
  formInputs.forEach((input) => {
    // Set initial state
    if (input.value) {
      input.classList.add("has-value");
    }

    // Handle focus and blur events
    input.addEventListener("focus", function () {
      this.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      this.classList.remove("focused");
      if (this.value) {
        this.classList.add("has-value");
      } else {
        this.classList.remove("has-value");
      }
    });

    // Handle input events
    input.addEventListener("input", function () {
      if (this.value) {
        this.classList.add("has-value");
      } else {
        this.classList.remove("has-value");
      }
    });
  });

  // Form submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Validate form
    if (validateForm(formObject)) {
      // Simulate form submission
      submitForm(formObject);
    }
  });
}

// Form validation
function validateForm(data) {
  const errors = [];

  // Required fields validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Please enter a valid email address");
  }

  if (!data.service) {
    errors.push("Please select a service");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters long");
  }

  // Display errors if any
  if (errors.length > 0) {
    showFormErrors(errors);
    return false;
  }

  return true;
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show form validation errors
function showFormErrors(errors) {
  // Remove existing error messages
  const existingErrors = document.querySelectorAll(".form-error");
  existingErrors.forEach((error) => error.remove());

  // Create and show new error messages
  const errorContainer = document.createElement("div");
  errorContainer.className = "form-error";
  errorContainer.style.cssText = `
        background: #fee2e2;
        border: 1px solid #fecaca;
        color: #dc2626;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    `;

  const errorList = document.createElement("ul");
  errorList.style.margin = "0";
  errorList.style.paddingLeft = "1rem";

  errors.forEach((error) => {
    const listItem = document.createElement("li");
    listItem.textContent = error;
    errorList.appendChild(listItem);
  });

  errorContainer.appendChild(errorList);

  const form = document.getElementById("contactForm");
  form.insertBefore(errorContainer, form.firstChild);

  // Scroll to error
  errorContainer.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Simulate form submission
function submitForm(data) {
  const submitButton = document.querySelector(
    '#contactForm button[type="submit"]'
  );
  const originalText = submitButton.textContent;

  // Show loading state
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // Show success message
    showFormSuccess();

    // Reset form
    document.getElementById("contactForm").reset();

    // Reset button
    submitButton.textContent = originalText;
    submitButton.disabled = false;

    // Reset input classes
    const formInputs = document.querySelectorAll(
      "#contactForm input, #contactForm select, #contactForm textarea"
    );
    formInputs.forEach((input) => {
      input.classList.remove("has-value", "focused");
    });

    // Log form data (in real implementation, this would be sent to a server)
    console.log("Form submitted with data:", data);
  }, 2000);
}

// Show form success message
function showFormSuccess() {
  // Remove existing messages
  const existingMessages = document.querySelectorAll(
    ".form-error, .form-success"
  );
  existingMessages.forEach((message) => message.remove());

  // Create success message
  const successContainer = document.createElement("div");
  successContainer.className = "form-success";
  successContainer.style.cssText = `
        background: #d1fae5;
        border: 1px solid #a7f3d0;
        color: #065f46;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        text-align: center;
    `;

  successContainer.innerHTML = `
        <strong>Thank you!</strong> Your message has been sent successfully. 
        I'll get back to you within 24 hours.
    `;

  const form = document.getElementById("contactForm");
  form.insertBefore(successContainer, form.firstChild);

  // Scroll to success message
  successContainer.scrollIntoView({ behavior: "smooth", block: "center" });

  // Remove success message after 5 seconds
  setTimeout(() => {
    successContainer.remove();
  }, 5000);
}

// Initialize animations
function initAnimations() {
  // Add stagger animation to service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Add hover effects to portfolio items
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  portfolioItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Parallax effect for hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".float-element");

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.2;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Create the green light element
const mouseLight = document.createElement("div");
mouseLight.classList.add("mouse-light");
document.body.appendChild(mouseLight);

// Update light position on mouse move
document.addEventListener("mousemove", (e) => {
  mouseLight.style.left = `${e.pageX - 10}px`;
  mouseLight.style.top = `${e.pageY - 10}px`;
});

// Utility functions
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function () {
  updateActiveNavLink();
}, 100);

// Replace the scroll event listener for active nav link
window.removeEventListener("scroll", updateActiveNavLink);
window.addEventListener("scroll", optimizedScrollHandler);

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", function () {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0];
      console.log(
        "Page load time:",
        perfData.loadEventEnd - perfData.loadEventStart,
        "ms"
      );
    }, 0);
  });
}

// Error handling
window.addEventListener("error", function (e) {
  console.error("JavaScript error:", e.error);
  // In production, you might want to send this to an error tracking service
});

// Accessibility improvements
document.addEventListener("keydown", function (e) {
  // Skip to main content with Tab key
  if (
    e.key === "Tab" &&
    !e.shiftKey &&
    document.activeElement === document.body
  ) {
    e.preventDefault();
    const mainContent =
      document.querySelector("main") || document.querySelector("#home");
    if (mainContent) {
      mainContent.focus();
    }
  }

  // Close mobile menu with Escape key
  if (e.key === "Escape") {
    const mobileMenu = document.getElementById("mobile-menu");
    const navMenu = document.getElementById("nav-menu");
    if (navMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }
});

// Service Worker registration (for future PWA functionality)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    // Uncomment when service worker is implemented
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered'))
    //     .catch(error => console.log('SW registration failed'));
  });
}
