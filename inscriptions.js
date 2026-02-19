document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8000/inscriptions')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#inscriptions-table tbody');
            tableBody.innerHTML = ''; // vide la table avant de remplir

            data.forEach(inscription => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${inscription.fullName}</td>
                    <td>${inscription.email}</td>
                    <td>${inscription.phone}</td>
                    <td>${inscription.age || 'N/A'}</td>
                    <td>${inscription.city}</td>
                    <td>${inscription.educationLevel}</td>
                    <td>${inscription.motivation}</td>
                    <td>${inscription.registrationDate ? new Date(inscription.registrationDate).toLocaleString('fr-FR') : 'N/A'}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des inscriptions:', error));
});
