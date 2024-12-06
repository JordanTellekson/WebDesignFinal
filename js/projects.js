// Timeline Section

// Wait for the DOM to load before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Define an array of timeline items with dates, titles, and content
    const timelineItems = [
        {
            date: "August 2024",
            title: "Started School",
            content: "I began my studies in Software Development at Mid-State Technical College."
        },
        {
            date: "September 2024",
            title: "My First Project Completed",
            content: "Completed my first project: A fictitious travel website!"
        },
        {
            date: "November 2024",
            title: "JavaScript Game Completed",
            content: "Finished my first JavaScript Game: I made 2048!"
        },
        {
            date: "December 2024",
            title: "Personal Portfolio Completed",
            content: "Completed my first large-scale project: My own personalized portfolio! (Hmm this seems kinda familiar)"
        }
    ];

    // Track the current timeline item being displayed
    let currentItem = 0;

    // Select the main timeline item element
    const timelineItemElement = document.querySelector('.timeline-item');
    
    // Select the navigation arrows
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');

    // Function to update the displayed timeline content
    function updateTimeline() {
        const item = timelineItems[currentItem]; // Get the current item data
        timelineItemElement.querySelector('.timeline-date').textContent = item.date; // Update date
        timelineItemElement.querySelector('.timeline-content h3').textContent = item.title; // Update title
        timelineItemElement.querySelector('.timeline-content p').textContent = item.content; // Update content
    }

    // Event listener for the left arrow click
    arrowLeft.addEventListener('click', function () {
        // Move to the previous item, looping back to the last if at the start
        currentItem = (currentItem - 1 + timelineItems.length) % timelineItems.length;
        updateTimeline(); // Refresh the timeline display
    });

    // Event listener for the right arrow click
    arrowRight.addEventListener('click', function () {
        // Move to the next item, looping back to the first if at the end
        currentItem = (currentItem + 1) % timelineItems.length;
        updateTimeline(); // Refresh the timeline display
    });

    // Initialize the timeline display with the first item
    updateTimeline();
});

// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Select the main container for the project cards
    const cardsContainer = document.querySelector('.cards-container');
    // Select the Reset button to show all projects
    const resetButton = document.getElementById('reset-button');

    // Define project data with titles, images, and detailed descriptions
    const projects = {
        1: {
            title: 'Travel Website Project',
            images: [
                '../images/travel2.png',
                '../images/travelCode1.png',
                '../images/travelCode2.png'
            ],
            details: [
                'This is the landing page for the Travel Website that I created. It is comprised of basic HTML, CSS, and JavaScript. The HTML for this page is provided in the card beneath this one.',
                'This is part of the HTML file responsible for the Travel Website landing page. It is comprised of several sections and divs, which are quite basic, however I was a beginner at the time. I made use of classes to group the images together, along with IDs for grouping in the other pages.',
                'This is part of the JavaScript file responsible for the Travel Website. The header/nav-bar is injected via JavaScript using rootpath, with checks to determine whether the current path includes the pages folder or not. Additionally, there is an event listener that switches the font to enhance visibility and readability on the page.'
            ]
        },
        2: {
            title: '2048 Project',
            images: [
                '../images/2048code-3.png',
                '../images/2048code-1.png',
                '../images/2048code-2.png'
            ],
            details: [
                'This is the partial CSS that I used for the 2048 game. I used grids for the tiles in the game, including some more general CSS to enhance visibility and provide a clean layout. I changed the color of each grid cell depending on which value was inside of it, and I really like how it turned out.',
                'This is part of the JavaScript used to make 2048. It creates the 4x4 grid and initializes the board with two randomly placed tiles. The tiles have a 90% chance of being a 2, and a 10% chance of being a 4. The updateBoard function updates the board whenever a tile is moved, created, or combined.',
                'This is another part of the JavaScript used to make the 2048 game function. The handleMove function handles how the tiles move, using the arrow keys. The movement is dependent on whether or not the tiles are moving left to right, or up and down. It makes use of splicing, reversing, and many conditional loops. The if statement at the bottom adds a random tile to the grid after the board has changed in any way.'
            ]
        },
        3: {
            title: 'Personal Portfolio Project',
            images: [
                '../images/portfolioCode1.png',
                '../images/portfolioCode2.png',
                '../images/portfolioCode3.png'
            ],
            details: [
                'This is part of the JavaScript responsible for the Contact page of this website! Shown here is the logic behind determining whether or not the name field is valid. It checks if the name is too short (under 3 characters), too long (over 25 characters), contains invalid characters (spaces at the start, symbols, numbers), and whether or not it is left empty. If every check passes, the field is returned with valid, allowing you to submit your name! Similar logic is used for most other fields within the contact section.',
                'This is part of the JavaScript that was used for making the slider on the home page. The handleDrag function allows support for desktop and mobile, ensuring that you can interact with the slider whether you\'re clicking or tapping. It also makes sure that the slider cannot go out of bounds of the page. The stopDragging function determines whether or not the information behind the slider will reveal itself, depending on how fully open the slider is. If the slider is less than 50% opened, it will close and you will have to use the slider again to open it.',
                'This is the part of the HTML responsible for the Projects page of this Portfolio website! It contains many sections and divs with classes and IDs, along with buttons that expand information for each project and filter each project by type.'
            ]
        }
    };

    // Add click event listeners to all "Expand Details" buttons
    document.querySelectorAll('.expand-button').forEach(button => {
        button.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project'); // Get the project ID from the button's data attribute
            expandProject(projectId); // Expand the selected project
        });
    });

    // Add click event listener to the Reset button to reset the view
    resetButton.addEventListener('click', function () {
        filterDropdown.value = 'all'; //Reset dropdown to "All Projects"
        cards.forEach(card => {
            card.style.display = 'block';
        });
        
        resetProjects(); // Show all projects
    });

    // Function to display detailed information for a specific project
    function expandProject(projectId) {
        const project = projects[projectId]; // Retrieve the project data
        cardsContainer.classList.add('expanded-view'); // Apply expanded view class

        const projectsHeading = document.querySelector('h2');
        const timelineSection = document.querySelector('#timeline');
        const infoSection = document.querySelector('#info-section');

        projectsHeading.style.display = 'none';
        timelineSection.style.display = 'none';
        infoSection.style.display = 'none';

        // Populate the container with detailed project cards
        cardsContainer.innerHTML = `
            <div class="card">
                <h2>${project.title}</h2>
                <img src="${project.images[0]}" alt="${project.title} Thumbnail">
                <p>${project.details[0]}</p>
            </div>
            <div class="card">
                <img src="${project.images[1]}" alt="${project.title} Image 2">
                <p>${project.details[1]}</p>
            </div>
            <div class="card">
                <img src="${project.images[2]}" alt="${project.title} Image 3">
                <p>${project.details[2]}</p>
            </div>
        `;
        resetButton.style.display = 'inline-block'; // Show the Reset button
        filterDropdown.style.display = 'none'; // Hide the Filter button
    }

    // Function to reset the view to show all projects
    function resetProjects() {
        cardsContainer.classList.remove('expanded-view'); // Remove expanded view class

        const projectsHeading = document.querySelector('h2');
        const timelineSection = document.querySelector('#timeline');
        const infoSection = document.querySelector('#info-section');

        projectsHeading.style.display = 'block';
        timelineSection.style.display = 'block';
        infoSection.style.display = 'block';

        // Populate the container with the default project cards
        cardsContainer.innerHTML = `
            <div class="card" data-project="1">
                <img src="../images/travel1.png" alt="Travel Website Thumbnail">
                <h3>Travel Website</h3>
                <p>This was my first project I ever created. It is a fictitious travel website that includes some basic HTML, CSS, and JavaScript.</p>
                <button class="expand-button" data-project="1">Expand Details</button>
            </div>
            <div class="card" data-project="2">
                <img src="../images/2048-1.png" alt="2048 Project Thumbnail">
                <h3>2048</h3>
                <p>This was the first game I ever created using JavaScript. It is a simple rendition of the game 2048.</p>
                <button class="expand-button" data-project="2">Expand Details</button>
            </div>
            <div class="card" data-project="3">
                <img src="../images/portfolio1.png" alt="Personal Portfolio Thumbnail">
                <h3>Personal Portfolio</h3>
                <p>This seems awfully familiar! The website you are viewing right now is my first large-scale project!</p>
                <button class="expand-button" data-project="3">Expand Details</button>
            </div>
        `;
        resetButton.style.display = 'none'; // Hide the Reset button
        filterDropdown.style.display = 'inline-block'; // Show the Filter button
        initializeExpandButtons(); // Reattach event listeners to new "Expand Details" buttons
    }

    // Function to reattach event listeners to "Expand Details" buttons
    function initializeExpandButtons() {
        document.querySelectorAll('.expand-button').forEach(button => {
            button.addEventListener('click', function () {
                const projectId = this.getAttribute('data-project'); // Get the project ID
                expandProject(projectId); // Expand the selected project
            });
        });
    }

    // Filter Projects by Type
    const filterDropdown = document.getElementById('filter-dropdown');
    const cards = document.querySelectorAll('.card');

    filterDropdown.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;

        cards.forEach(card => {
            const projectType = card.getAttribute('data-project-type'); // New attribute for type
            if (selectedCategory === 'all' || projectType === selectedCategory) {
                card.style.display = 'block'; // Show matching cards
            } else {
                card.style.display = 'none'; // Hide non-matching cards
            }
        });
    });
});