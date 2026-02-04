/**
 * Gestion des inscriptions avec localStorage
 * Les données sont sauvegardées localement dans le navigateur
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inscriptionForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collecter les données du formulaire
            const inscription = {
                nom: form.nom.value.trim(),
                email: form.email.value.trim().toLowerCase(),
                telephone: form.telephone.value.trim(),
                age: form.age.value ? parseInt(form.age.value) : null,
                ville: form.ville.value.trim(),
                niveau: form.niveau.value || 'non-spécifié',
                motivation: form.motivation.value.trim(),
                conditions: form.conditions.checked,
                dateInscription: new Date().toISOString(),
                id: Date.now() // ID unique basé sur le timestamp
            };

            // Récupérer les inscriptions existantes du localStorage
            const saved = localStorage.getItem('inscriptions');
            const inscriptions = saved ? JSON.parse(saved) : [];

            // Vérifier si l'email existe déjà
            const existeDeja = inscriptions.some(item =>
                item.email === inscription.email
            );

            if (existeDeja) {
                alert('Une inscription avec cet email existe déjà.');
                return;
            }

            // Ajouter la nouvelle inscription
            inscriptions.push(inscription);

            // Sauvegarder dans localStorage
            localStorage.setItem('inscriptions', JSON.stringify(inscriptions));

            // Log pour debug
            console.log('✅ Inscription sauvegardée avec succès');
            console.log('Nombre total d\'inscriptions:', inscriptions.length);
            console.log('Détails:', inscription);

            // Réinitialiser le formulaire
            form.reset();

            // Redirection vers la page de confirmation
            window.location.href = 'submit-inscription-copie.html';
        });
    }
});

/**
 * Fonction utilitaire pour récupérer toutes les inscriptions
 */
function getInscriptions() {
    const saved = localStorage.getItem('inscriptions');
    return saved ? JSON.parse(saved) : [];
}

/**
 * Fonction utilitaire pour supprimer une inscription
 */
function deleteInscription(id) {
    const inscriptions = getInscriptions();
    const filtered = inscriptions.filter(item => item.id !== id);
    localStorage.setItem('inscriptions', JSON.stringify(filtered));
    console.log('Inscription supprimée:', id);
}

/**
 * Fonction utilitaire pour exporter les inscriptions en JSON
 */
function exportInscriptions() {
    const inscriptions = getInscriptions();
    const json = JSON.stringify(inscriptions, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inscriptions-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

/**
 * Fonction utilitaire pour effacer toutes les inscriptions
 */
function clearAllInscriptions() {
    if (confirm('Êtes-vous sûr de vouloir supprimer toutes les inscriptions ?')) {
        localStorage.removeItem('inscriptions');
        console.log('Toutes les inscriptions ont été supprimées');
    }
}
