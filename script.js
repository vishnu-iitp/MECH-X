// Main application object
const App = {
    // Initialize the application
    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupInteractiveElements();
        this.setupProgressIndicator();
        this.setupTypingEffect();
        this.setupParallaxEffects();
    },

    // Navigation functionality
    setupNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const header = document.querySelector('.header');

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling and active link highlighting
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Intersection Observer for active navigation
        const sections = document.querySelectorAll('.section');
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    },

    // Scroll effects and animations
    setupScrollEffects() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(element => fadeObserver.observe(element));

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    },

    // Setup interactive elements
    setupInteractiveElements() {
        this.setupPoll();
        this.setupMechatronicsInteraction();
        this.setupCardAnimations();
        this.setupQuizzes();
        this.setupHardwareGuide();
        this.setupCareerCalculator();
    },

    // Poll functionality
    setupPoll() {
        const pollOptions = document.querySelectorAll('.poll-option');
        const pollResult = document.querySelector('.poll-result');

        pollOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selections
                pollOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selection to clicked option
                option.classList.add('selected');
                
                // Show result with animation
                if (pollResult) {
                    pollResult.classList.add('show');
                    
                    // Add some statistics based on selection
                    const value = option.dataset.value;
                    this.updatePollResult(value, pollResult);
                }
            });
        });
    },

    // Update poll result with realistic statistics
    updatePollResult(selectedValue, resultElement) {
        const statistics = {
            '1-5': 'Interesting! Most people underestimate their smart device usage. The average person actually interacts with 20+ connected devices daily!',
            '6-10': 'Good estimate! You\'re aware of some smart devices around you, but there are likely many more you haven\'t considered.',
            '11-15': 'Great awareness! You recognize that smart technology is deeply integrated into our daily lives.',
            '16+': 'Excellent! You understand how pervasive IoT and smart devices have become in our modern world.'
        };

        const message = statistics[selectedValue] || 'Thanks for participating!';
        resultElement.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span style="font-size: 2rem;">📊</span>
                <div>
                    <p><strong>Your answer: ${selectedValue} devices</strong></p>
                    <p>${message}</p>
                    <p style="margin-top: 1rem; font-size: 0.9rem; color: #6B7280;">
                        Fun fact: Smart devices include phones, laptops, smart TVs, car systems, 
                        credit cards with chips, fitness trackers, and even smart city infrastructure!
                    </p>
                </div>
            </div>
        `;
    },

    // Mechatronics diagram interaction
    setupMechatronicsInteraction() {
        const mechatronicsCircles = document.querySelectorAll('.mechatronics-circle');
        const descriptions = {
            'mechanical': 'Mechanical Engineering: Physical structures, gears, motors, and moving parts that give robots their form and motion capabilities.',
            'electrical': 'Electrical Engineering: Power systems, circuits, sensors, and electronic components that provide energy and data collection.',
            'software': 'Computer Science: Programming, algorithms, AI, and software that gives robots intelligence and decision-making abilities.',
            'control': 'Control Engineering: Systems that coordinate all components, ensuring precise and safe operation of the entire robotic system.'
        };

        mechatronicsCircles.forEach(circle => {
            circle.addEventListener('mouseenter', (e) => {
                const type = e.target.classList.contains('circle-mechanical') ? 'mechanical' :
                           e.target.classList.contains('circle-electrical') ? 'electrical' :
                           e.target.classList.contains('circle-software') ? 'software' : 'control';
                
                this.showTooltip(e.target, descriptions[type]);
            });

            circle.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    },

    // Tooltip functionality
    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = text;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            font-size: 0.875rem;
            max-width: 300px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;

        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';

        setTimeout(() => tooltip.style.opacity = '1', 10);
    },

    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    },

    // Card hover animations
    setupCardAnimations() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    },

    // Progress indicator
    setupProgressIndicator() {
        const progressBar = document.querySelector('.progress-bar');
        
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const scrollTop = document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercentage = (scrollTop / scrollHeight) * 100;
                
                progressBar.style.width = scrollPercentage + '%';
            });
        }
    },

    // Typing effect for hero section
    setupTypingEffect() {
        const typingElement = document.querySelector('.typing-effect');
        if (!typingElement) return;

        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    },

    // Parallax effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.speed) || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    },

    // Hardware guide interactive features
    setupHardwareGuide() {
        const hardwareCards = document.querySelectorAll('.hardware-level');
        
        hardwareCards.forEach(card => {
            card.addEventListener('click', () => {
                this.showHardwareDetails(card);
            });
        });

        // Budget calculator
        const budgetInputs = document.querySelectorAll('.budget-input');
        budgetInputs.forEach(input => {
            input.addEventListener('change', this.calculateProjectBudget);
        });
    },

    // Career guidance features
    setupCareerCalculator() {
        const salaryCards = document.querySelectorAll('.salary-card');
        
        salaryCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.showSalaryBreakdown(card);
            });
        });

        // Company filter functionality
        const companyFilters = document.querySelectorAll('.company-filter');
        companyFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.filterCompanies(e.target.dataset.sector);
            });
        });

        // Job search tips
        this.setupJobSearchTips();
    },

    // Show detailed hardware information
    showHardwareDetails(card) {
        const level = card.classList.contains('beginner') ? 'beginner' :
                     card.classList.contains('intermediate') ? 'intermediate' : 'advanced';
        
        const details = {
            beginner: {
                timeToLearn: '2-4 weeks',
                projects: ['LED control', 'Sensor reading', 'Simple automation'],
                nextSteps: 'Move to ESP32 for wireless projects'
            },
            intermediate: {
                timeToLearn: '2-3 months',
                projects: ['IoT sensors', 'Computer vision', 'Wireless communication'],
                nextSteps: 'Explore AI with Jetson platforms'
            },
            advanced: {
                timeToLearn: '6+ months',
                projects: ['Autonomous systems', 'Real-time control', 'Professional robotics'],
                nextSteps: 'Start applying for engineering positions'
            }
        };

        this.showModal('Hardware Guide', this.createHardwareModal(details[level]));
    },

    // Create hardware details modal
    createHardwareModal(details) {
        return `
            <div style="padding: 1rem;">
                <h4 style="margin-bottom: 1rem;">Learning Path Details</h4>
                <p><strong>Time to Learn:</strong> ${details.timeToLearn}</p>
                <p><strong>Typical Projects:</strong></p>
                <ul style="margin-left: 1rem;">
                    ${details.projects.map(project => `<li>${project}</li>`).join('')}
                </ul>
                <p><strong>Next Steps:</strong> ${details.nextSteps}</p>
            </div>
        `;
    },

    // Job search tips functionality
    setupJobSearchTips() {
        const tipCards = document.querySelectorAll('.job-tip-card');
        
        tipCards.forEach(card => {
            card.addEventListener('click', () => {
                const tip = card.dataset.tip;
                this.showJobTip(tip);
            });
        });
    },

    // Show job search tips
    showJobTip(tipType) {
        const tips = {
            networking: `
                <h4>Networking Tips</h4>
                <ul style="margin-left: 1rem;">
                    <li>Join local robotics meetups and IEEE chapters</li>
                    <li>Attend tech conferences (RoboticsConf, IoT World)</li>
                    <li>Connect with professionals on LinkedIn</li>
                    <li>Participate in online communities (Reddit r/robotics)</li>
                    <li>Contribute to open-source robotics projects</li>
                </ul>
            `,
            portfolio: `
                <h4>Portfolio Building</h4>
                <ul style="margin-left: 1rem;">
                    <li>Showcase 5-7 diverse projects with clear documentation</li>
                    <li>Include videos demonstrating your projects in action</li>
                    <li>Write detailed README files explaining your design decisions</li>
                    <li>Host code on GitHub with clean, commented code</li>
                    <li>Create a personal website showcasing your work</li>
                </ul>
            `,
            interview: `
                <h4>Interview Preparation</h4>
                <ul style="margin-left: 1rem;">
                    <li>Practice coding problems on LeetCode/HackerRank</li>
                    <li>Be ready to explain your projects in technical detail</li>
                    <li>Study system design for robotics/IoT systems</li>
                    <li>Prepare for behavioral questions using STAR method</li>
                    <li>Research the company's products and recent news</li>
                </ul>
            `
        };

        this.showModal('Career Guidance', tips[tipType] || 'Tip not found');
    },

    // Filter companies by sector
    filterCompanies(sector) {
        const companyCards = document.querySelectorAll('.company-card');
        
        companyCards.forEach(card => {
            if (sector === 'all' || card.dataset.sector === sector) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    },

    // Calculate project budget
    calculateProjectBudget() {
        const components = document.querySelectorAll('.component-cost');
        let total = 0;
        
        components.forEach(component => {
            if (component.checked) {
                total += parseFloat(component.dataset.cost);
            }
        });

        const budgetDisplay = document.getElementById('budget-total');
        if (budgetDisplay) {
            budgetDisplay.textContent = `$${total.toFixed(2)}`;
            budgetDisplay.style.color = total > 500 ? 'var(--warning-color)' : 'var(--success-color)';
        }
    },

    // Show modal dialog
    showModal(title, content) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        `;

        modalContent.innerHTML = `
            <button onclick="this.closest('.modal').remove()" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
            ">×</button>
            <h3 style="margin-bottom: 1rem;">${title}</h3>
            ${content}
        `;

        modal.className = 'modal';
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    },

    // Quiz functionality for interactive learning
    setupQuizzes() {
        const quizElements = document.querySelectorAll('.quiz');
        
        quizElements.forEach(quiz => {
            const options = quiz.querySelectorAll('.quiz-option');
            const result = quiz.querySelector('.quiz-result');
            
            options.forEach(option => {
                option.addEventListener('click', () => {
                    options.forEach(opt => opt.classList.remove('selected', 'correct', 'incorrect'));
                    
                    const isCorrect = option.dataset.correct === 'true';
                    option.classList.add('selected', isCorrect ? 'correct' : 'incorrect');
                    
                    if (!isCorrect) {
                        // Show the correct answer
                        const correctOption = quiz.querySelector('[data-correct="true"]');
                        if (correctOption) {
                            correctOption.classList.add('correct');
                        }
                    }
                    
                    if (result) {
                        result.style.display = 'block';
                        result.innerHTML = isCorrect 
                            ? '✅ Correct! Great job understanding the concept.'
                            : '❌ Not quite right. The correct answer is highlighted above.';
                    }
                });
            });
        });
    },

    // Utility functions
    utils: {
        // Debounce function for performance
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Smooth scroll to element
        scrollToElement(element, offset = 0) {
            const targetPosition = element.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        },

        // Check if element is in viewport
        isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    }
};

// Analytics and Learning Insights
const LearningAnalytics = {
    startTime: Date.now(),
    interactions: [],
    sectionViews: {},

    init() {
        this.trackSectionViews();
        this.trackInteractions();
        this.setupCompletionTracking();
    },

    trackSectionViews() {
        const sections = document.querySelectorAll('.section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (!this.sectionViews[sectionId]) {
                        this.sectionViews[sectionId] = {
                            viewTime: Date.now(),
                            duration: 0
                        };
                    }
                } else {
                    const sectionId = entry.target.id;
                    if (this.sectionViews[sectionId] && this.sectionViews[sectionId].viewTime) {
                        this.sectionViews[sectionId].duration += Date.now() - this.sectionViews[sectionId].viewTime;
                        this.sectionViews[sectionId].viewTime = null;
                    }
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    },

    trackInteractions() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.poll-option, .quiz-option, .card, .nav-link')) {
                this.interactions.push({
                    type: 'click',
                    element: e.target.className,
                    timestamp: Date.now(),
                    section: this.getCurrentSection()
                });
            }
        });
    },

    getCurrentSection() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            const absoluteTop = rect.top + window.scrollY;
            const absoluteBottom = absoluteTop + rect.height;

            if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
                return section.id;
            }
        }
        return null;
    },

    setupCompletionTracking() {
        window.addEventListener('beforeunload', () => {
            this.generateLearningReport();
        });
    },

    generateLearningReport() {
        const totalTime = Date.now() - this.startTime;
        const report = {
            sessionDuration: totalTime,
            sectionsViewed: Object.keys(this.sectionViews).length,
            totalInteractions: this.interactions.length,
            averageTimePerSection: totalTime / Object.keys(this.sectionViews).length,
            completionPercentage: this.calculateCompletionPercentage()
        };

        console.log('Learning Session Report:', report);
        // In a real application, this would be sent to an analytics service
    },

    calculateCompletionPercentage() {
        const totalSections = document.querySelectorAll('.section').length;
        const viewedSections = Object.keys(this.sectionViews).length;
        return Math.round((viewedSections / totalSections) * 100);
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    LearningAnalytics.init();
});

// Handle window resize
window.addEventListener('resize', App.utils.debounce(() => {
    // Recalculate any position-dependent elements
    const mechatronicsCircles = document.querySelectorAll('.mechatronics-circle');
    mechatronicsCircles.forEach(circle => {
        // Refresh circle positions on resize
        circle.style.transform = '';
    });
}, 250));

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
