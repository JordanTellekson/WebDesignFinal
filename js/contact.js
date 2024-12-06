// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');  // Get the form element by its ID
    const submitButton = document.querySelector('.submit-btn');  // Get the submit button
    const resetButton = document.querySelector('.reset-btn');  // Get the reset button

    // Function to validate the name field
    function validateName(input) {
        const feedback = input.nextElementSibling; // Get the feedback element (error message)
        const nameRegex = /^[A-Za-z\s]+$/; // Regex to allow only letters and spaces
        const nameLength = input.value.trim().length; // Get the length of the trimmed value
    
        // Check if the input is empty
        if (!input.value.trim()) {
            input.style.borderColor = '#f44336'; // Red border for invalid input
            feedback.classList.remove('valid');  // Remove valid class
            feedback.classList.add('error');     // Add error class
            feedback.textContent = 'Name is required!'; // Error message
            feedback.style.visibility = 'visible'; // Show the error message
        } 
        // Check if the input contains invalid characters (numbers, symbols, or leading spaces)
        else if (!nameRegex.test(input.value) || input.value.trim().startsWith(' ')) {
            input.style.borderColor = '#f44336'; 
            feedback.classList.remove('valid');
            feedback.classList.add('error');
            feedback.textContent = 'Invalid name! Only letters and spaces are allowed.';
            feedback.style.visibility = 'visible';
        }
        // Check if the name is too short
        else if (nameLength < 3) {
            input.style.borderColor = '#f44336'; 
            feedback.classList.remove('valid');
            feedback.classList.add('error');
            feedback.textContent = 'Name must be at least 3 characters long.';
            feedback.style.visibility = 'visible';
        }
        // Check if the name is too long
        else if (nameLength > 25) {
            input.style.borderColor = '#f44336'; 
            feedback.classList.remove('valid');
            feedback.classList.add('error');
            feedback.textContent = 'Name must not exceed 25 characters.';
            feedback.style.visibility = 'visible';
        } 
        // If all checks pass, mark as valid
        else {
            input.style.borderColor = '#4CAF50'; // Green border for valid input
            feedback.classList.remove('error');
            feedback.classList.add('valid');
            feedback.textContent = 'Valid name!'; // Success message
            feedback.style.visibility = 'visible';
        }
    }

    // Function to validate the email field
    function validateEmail(input) {
        const feedback = input.nextElementSibling; // Get feedback element
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email regex
        
        // Check if email input is empty
        if (!input.value.trim()) {
            input.style.borderColor = '#f44336'; 
            feedback.classList.remove('valid');
            feedback.classList.add('error');
            feedback.textContent = 'Email is required!';
            feedback.style.visibility = 'visible';
        } 
        // Check if the email matches the regex pattern
        else if (!emailRegex.test(input.value)) {
            input.style.borderColor = '#f44336'; 
            feedback.classList.remove('valid');
            feedback.classList.add('error');
            feedback.textContent = 'Invalid email format!';
            feedback.style.visibility = 'visible';
        } 
        // If email is valid
        else {
            input.style.borderColor = '#4CAF50'; 
            feedback.classList.remove('error');
            feedback.classList.add('valid');
            feedback.textContent = 'Valid email!';
            feedback.style.visibility = 'visible';
        }
    }

    // Function to validate the company field
    function validateCompany(input) {
        const feedback = input.nextElementSibling; // Get feedback element
        
        // Check if the company input is empty
        if (!input.value.trim()) {
            input.style.borderColor = '#f44336'; 
            feedback.classList.remove('valid');
            feedback.classList.add('error');
            feedback.textContent = 'Company name is required!';
            feedback.style.visibility = 'visible';
        } 
        // Check if the company name starts with a space
        else if (input.value.trim().startsWith(' ')) {
            input.style.borderColor = '#f44336'; 
            feedback.classList.remove('valid');
            feedback.classList.add('error');
            feedback.textContent = 'Company name cannot start with a space!';
            feedback.style.visibility = 'visible';
        } 
        // If the company name is valid
        else {
            input.style.borderColor = '#4CAF50'; 
            feedback.classList.remove('error');
            feedback.classList.add('valid');
            feedback.textContent = 'Valid company name!';
            feedback.style.visibility = 'visible';
        }
    }

    // Function to validate the date field
    function validateDate(input) {
        const feedback = input.nextElementSibling; // Get feedback element
        const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
        
        // Check if the date input is empty
        if (!input.value.trim()) {
            input.style.borderColor = '#f44336'; 
            feedback.classList.remove('valid');
            feedback.classList.add('error');
            feedback.textContent = 'Date is required!';
            feedback.style.visibility = 'visible';
        } 
        // Check if the date is in the past
        else if (input.value < currentDate) {
            input.style.borderColor = '#f44336'; 
            feedback.classList.remove('valid');
            feedback.classList.add('error');
            feedback.textContent = 'Date cannot be in the past!';
            feedback.style.visibility = 'visible';
        } 
        // If the date is valid
        else {
            input.style.borderColor = '#4CAF50'; 
            feedback.classList.remove('error');
            feedback.classList.add('valid');
            feedback.textContent = 'Valid date!';
            feedback.style.visibility = 'visible';
        }
    }

    // Function to validate the fields on blur (when the user leaves the input field)
    function validateField(input) {
        const id = input.id; // Get the id of the input field

        // Call the appropriate validation function based on the field's id
        if (id === 'name') {
            validateName(input);
        } else if (id === 'email') {
            validateEmail(input);
        } else if (id === 'company') {
            validateCompany(input);
        } else if (id === 'date') {
            validateDate(input);
        }
    }

    // Event listeners for the input fields
    const inputs = form.querySelectorAll('input, textarea'); // Get all input and textarea fields
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input)); // Validate when the user leaves the field
        input.addEventListener('input', () => validateField(input)); // Validate on input (real-time validation)
    });

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        let formIsValid = true; // Flag to track form validity
        inputs.forEach(input => {
            // If the field is invalid, update formIsValid to false and show validation feedback
            if (!input.validity.valid || input.style.borderColor === 'rgb(244, 67, 54)') {
                formIsValid = false;
                validateField(input); // Check and show validation feedback
            }
        });

        // If the form is valid, submit it
        if (formIsValid) {
            alert('Form submitted successfully! Thank you for filling out this form!');
            form.reset(); // Reset the form
            inputs.forEach(input => input.style.borderColor = '#ccc'); // Reset input borders
            inputs.forEach(input => {
                const feedback = input.nextElementSibling;
                feedback.style.visibility = 'hidden'; // Hide error messages
            });
        } else {
            alert('Please fill out all required fields correctly.');
        }
    });

    // Handle form reset (when the reset button is clicked)
    resetButton.addEventListener('click', function () {
        form.reset(); // Reset form fields
        inputs.forEach(input => {
            input.style.borderColor = '#ccc'; // Reset borders
            input.style.boxShadow = 'none'; // Reset box shadow
            const feedback = input.nextElementSibling;
            feedback.style.visibility = 'hidden'; // Hide error messages
        });
    });
});