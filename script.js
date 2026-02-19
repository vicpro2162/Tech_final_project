document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(registrationForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Add registration date
        data.registrationDate = new Date().toISOString();

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Inscription réussie !');
                registrationForm.reset(); // Clear the form
            } else {
                const errorData = await response.json();
                alert('Erreur lors de l\'inscription : ' + (errorData.message || response.statusText));
            }
        } catch (error) {
            console.error('Erreur réseau ou du serveur:', error);
            alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    });
});
