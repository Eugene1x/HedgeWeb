// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeCharts();
    initializeForms();
    initializeAnimations();
    populateReturnsTable();
});

// Navigation Functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Chart.js Charts
function initializeCharts() {
    // Performance Chart in Hero Section
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Fund Performance',
                    data: [100, 102.5, 105.8, 108.2, 112.1, 115.3, 118.7, 122.4, 125.9, 129.2, 132.8, 136.5],
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(255, 255, 255, 0.9)',
                    pointBorderColor: 'rgba(255, 255, 255, 1)',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        display: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                size: 12
                            },
                            callback: function (value) {
                                return '$' + value.toFixed(0);
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 6
                    }
                }
            }
        });
    }

    // Cumulative Performance Chart
    const cumulativeCtx = document.getElementById('cumulativeChart');
    if (cumulativeCtx) {
        new Chart(cumulativeCtx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Quantum Capital Partners',
                    data: [100, 115.2, 132.8, 148.9, 165.3],
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'S&P 500',
                    data: [100, 112.5, 108.2, 125.8, 138.9],
                    borderColor: '#6c757d',
                    backgroundColor: 'rgba(108, 117, 125, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            callback: function (value) {
                                return value + '%';
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
}

// Form Handling
function initializeForms() {
    // Investment Form
    const investmentForm = document.getElementById('investmentForm');
    if (investmentForm) {
        investmentForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleInvestmentSubmission(this);
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleContactSubmission(this);
        });
    }

    // Investment Amount Formatter
    const investmentAmount = document.getElementById('investmentAmount');
    if (investmentAmount) {
        investmentAmount.addEventListener('input', function (e) {
            const value = e.target.value;
            if (value && value < 100000) {
                this.setCustomValidity('Minimum investment amount is $100,000');
            } else {
                this.setCustomValidity('');
            }
        });
    }
}

// Handle Investment Form Submission
function handleInvestmentSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate form
    if (!validateInvestmentForm(data)) {
        return;
    }

    // Simulate form submission
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showSuccessModal();
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Handle Contact Form Submission
function handleContactSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate form
    if (!validateContactForm(data)) {
        return;
    }

    // Simulate form submission
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you within 24 hours.');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Form Validation
function validateInvestmentForm(data) {
    if (!data.firstName || !data.lastName || !data.email || !data.investmentAmount) {
        alert('Please fill in all required fields.');
        return false;
    }

    if (parseInt(data.investmentAmount) < 100000) {
        alert('Minimum investment amount is $100,000.');
        return false;
    }

    if (!data.accredited) {
        alert('You must confirm that you are an accredited investor.');
        return false;
    }

    if (!data.terms) {
        alert('You must agree to the terms and conditions.');
        return false;
    }

    return true;
}

function validateContactForm(data) {
    if (!data.contactName || !data.contactEmail || !data.contactMessage) {
        alert('Please fill in all required fields.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactEmail)) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}

// Modal Functionality
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function (event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with X button
document.querySelector('.close').addEventListener('click', closeModal);

// Scroll to Section Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Populate Returns Table
function populateReturnsTable() {
    const tableBody = document.getElementById('returnsTableBody');
    if (!tableBody) return;

    const returnsData = [
        { period: '2024 Q1', fundReturn: '8.2%', sp500: '5.8%', excess: '2.4%' },
        { period: '2023 Q4', fundReturn: '6.7%', sp500: '4.9%', excess: '1.8%' },
        { period: '2023 Q3', fundReturn: '5.3%', sp500: '3.2%', excess: '2.1%' },
        { period: '2023 Q2', fundReturn: '4.1%', sp500: '2.8%', excess: '1.3%' },
        { period: '2023 Q1', fundReturn: '7.2%', sp500: '5.4%', excess: '1.8%' },
        { period: '2022 Q4', fundReturn: '3.8%', sp500: '2.1%', excess: '1.7%' },
        { period: '2022 Q3', fundReturn: '2.9%', sp500: '1.2%', excess: '1.7%' },
        { period: '2022 Q2', fundReturn: '-1.2%', sp500: '-2.8%', excess: '1.6%' },
        { period: '2022 Q1', fundReturn: '4.5%', sp500: '3.1%', excess: '1.4%' },
        { period: '2021 Q4', fundReturn: '6.8%', sp500: '5.2%', excess: '1.6%' },
        { period: '2021 Q3', fundReturn: '5.2%', sp500: '3.9%', excess: '1.3%' },
        { period: '2021 Q2', fundReturn: '4.7%', sp500: '3.2%', excess: '1.5%' }
    ];

    tableBody.innerHTML = '';
    returnsData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.period}</td>
            <td class="${row.fundReturn.startsWith('-') ? 'negative' : 'positive'}">${row.fundReturn}</td>
            <td class="${row.sp500.startsWith('-') ? 'negative' : 'positive'}">${row.sp500}</td>
            <td class="positive">${row.excess}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Animations and Scroll Effects
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.strategy-card, .feature, .metric, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Counter Animation
function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isDecimal = target.includes('.');

    let numericValue;
    if (isPercentage) {
        numericValue = parseFloat(target.replace('%', ''));
    } else if (isDecimal) {
        numericValue = parseFloat(target);
    } else {
        numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
    }

    const suffix = target.replace(/[\d.]/g, '');
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        current += increment;

        if (step >= steps) {
            current = numericValue;
            clearInterval(timer);
        }

        if (isPercentage) {
            element.textContent = current.toFixed(1) + '%';
        } else if (isDecimal) {
            element.textContent = current.toFixed(2);
        } else {
            element.textContent = suffix.includes('B') ?
                (current / 1000).toFixed(1) + 'B' + suffix.replace('B', '') :
                current.toFixed(0) + suffix;
        }
    }, duration / steps);
}

// Real-time Data Updates (Simulated)
function initializeRealTimeUpdates() {
    // Simulate real-time performance updates
    setInterval(() => {
        updatePerformanceMetrics();
    }, 30000); // Update every 30 seconds
}

function updatePerformanceMetrics() {
    // Simulate small changes in performance metrics
    const metrics = document.querySelectorAll('.metric h3');
    metrics.forEach(metric => {
        const currentValue = parseFloat(metric.textContent.replace(/[^\d.]/g, ''));
        const change = (Math.random() - 0.5) * 0.1; // Small random change
        const newValue = currentValue + change;

        if (metric.textContent.includes('%')) {
            metric.textContent = newValue.toFixed(1) + '%';
        } else if (metric.textContent.includes('B')) {
            metric.textContent = '$' + newValue.toFixed(1) + 'B+';
        } else {
            metric.textContent = newValue.toFixed(2);
        }
    });
}

// Initialize real-time updates
setTimeout(initializeRealTimeUpdates, 5000);

// Add CSS for positive/negative returns
const style = document.createElement('style');
style.textContent = `
    .positive { color: #28a745; font-weight: 600; }
    .negative { color: #dc3545; font-weight: 600; }
`;
document.head.appendChild(style); 