# YOUSEF ATAF - Graphic Designer Portfolio

## Overview

This is a personal portfolio website for YOUSEF ATAF, a graphic designer. The site serves as a professional showcase of creative services, branding work, and design projects. It's built as a single-page application with multiple sections including home, about, services, portfolio, and contact. The website emphasizes visual appeal and user experience to effectively present the designer's work and attract potential clients.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Single Page Application (SPA)**: The site uses a traditional multi-section single-page design with smooth scrolling navigation between sections
- **Vanilla JavaScript**: Pure JavaScript implementation without frameworks, focusing on lightweight performance and direct DOM manipulation
- **Modular CSS Structure**: Separated into main styles (`style.css`) and responsive styles (`responsive.css`) for better maintainability
- **CSS Custom Properties**: Extensive use of CSS variables for consistent theming, including colors, typography, spacing, shadows, and transitions

### Design System

- **Typography**: Dual font system using Google Fonts - Poppins for body text and Playfair Display for headings
- **Color Palette**: Primary purple theme (#6366f1) with secondary amber (#f59e0b) and accent pink (#ec4899) colors
- **Responsive Design**: Mobile-first approach with breakpoints at 768px (mobile) and 1024px (tablet)
- **Component-Based Styling**: Systematic use of spacing, shadow, and border-radius variables for consistency

### Navigation System

- **Sticky Navigation**: Fixed navbar that changes appearance on scroll
- **Mobile-Responsive Menu**: Hamburger menu for mobile devices with slide-in navigation
- **Active Section Tracking**: Dynamic highlighting of current section in navigation based on scroll position
- **Smooth Scrolling**: JavaScript-powered smooth transitions between sections

### Interactive Features

- **Portfolio Filtering**: Dynamic content filtering system for portfolio items
- **Contact Form**: Form handling with validation and submission functionality
- **Scroll Animations**: Progressive enhancement with scroll-triggered animations
- **Mobile Menu**: Touch-friendly navigation for mobile devices

## External Dependencies

### CDN Resources

- **Google Fonts**: Typography system using Poppins and Playfair Display font families
- **Font Awesome 6.4.0**: Icon library for UI elements and social media icons

### Browser APIs

- **DOM API**: Direct manipulation for dynamic content and interactions
- **Intersection Observer API**: Likely used for scroll-based animations and active section tracking
- **CSS Custom Properties**: Modern browser support for CSS variables and theming

### Development Tools

- **Responsive Design**: CSS Grid and Flexbox for layout systems
- **CSS3 Features**: Advanced styling with transforms, transitions, and modern selectors
- **ES6+ JavaScript**: Modern JavaScript features for enhanced functionality
