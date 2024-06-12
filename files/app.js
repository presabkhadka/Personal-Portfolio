document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Clear previous errors
    document.getElementById('fullnameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';

    // Form validation
    let isValid = true;
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (fullname === '') {
        isValid = false;
        document.getElementById('fullnameError').textContent = 'Full Name is required';
    }

    if (email === '') {
        isValid = false;
        document.getElementById('emailError').textContent = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        isValid = false;
        document.getElementById('emailError').textContent = 'Email is invalid';
    }

    if (message === '') {
        isValid = false;
        document.getElementById('messageError').textContent = 'Message is required';
    }

    if (isValid) {
        // Submit the form
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                access_key: '50514944-43cf-4f7b-883d-74cb1eb612e5',
                fullname: fullname,
                email: email,
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Form submitted successfully!');
                // Clear the form
                document.getElementById('contactForm').reset();
            } else {
                alert('Form submission failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    }
});
