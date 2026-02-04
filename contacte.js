// ===========================
// GESTION DES MESSAGES DE CONTACT - contacte.html
// ===========================

// Charger la classe MessageManager depuis messages-contact.js si nécessaire
class MessageManager {
    constructor() {
        this.storageKey = 'contact_messages';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
    }

    add(message) {
        const messages = this.getAll();
        const newMessage = {
            id: Date.now(),
            nom: message.nom.trim(),
            email: message.email.trim().toLowerCase(),
            telephone: message.telephone ? message.telephone.trim() : '',
            sujet: message.sujet,
            message: message.message.trim(),
            dateEnvoi: new Date().toISOString(),
            statut: 'non-lu',
            notes: ''
        };
        messages.push(newMessage);
        localStorage.setItem(this.storageKey, JSON.stringify(messages));
        return newMessage;
    }

    getAll() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    getStats() {
        const messages = this.getAll();
        const nonLus = messages.filter(m => m.statut === 'non-lu').length;
        const traites = messages.filter(m => m.statut === 'traité').length;

        const sujets = {};
        messages.forEach(m => {
            sujets[m.sujet] = (sujets[m.sujet] || 0) + 1;
        });

        return {
            total: messages.length,
            nonLus: nonLus,
            traites: traites,
            enCours: messages.filter(m => m.statut === 'lu').length,
            sujets: sujets,
            dernierMessage: messages.length > 0 ? messages[messages.length - 1].dateEnvoi : null
        };
    }
}

// Initialiser le gestionnaire de messages
if (!window.messageManager) {
    window.messageManager = new MessageManager();
    console.log('✅ MessageManager initialisé pour contacte.html');
} else {
    console.log('⚠️ MessageManager déjà existant');
}

// ===========================
// GESTION DU FORMULAIRE DE CONTACT
// ===========================

document.addEventListener('DOMContentLoaded', function () {
    console.log('📄 DOMContentLoaded - Initialisation du formulaire contacte.html');
    
    const form = document.getElementById('contactForm');
    
    if (!form) {
        console.warn('⚠️ Formulaire contactForm non trouvé');
        return;
    }

    console.log('✅ Formulaire trouvé');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('📤 Soumission du formulaire contacte.html');

        try {
            // Récupérer les données du formulaire
            const message = {
                nom: form.nom.value,
                email: form.email.value,
                telephone: form.telephone.value,
                sujet: form.sujet.value,
                message: form.message.value
            };

            console.log('📋 Données du formulaire:', message);

            // Valider l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(message.email)) {
                throw new Error('Email invalide');
            }

            // Valider que le message n'est pas vide
            if (message.message.trim().length < 10) {
                throw new Error('Le message doit contenir au moins 10 caractères');
            }

            // Ajouter le message
            const result = window.messageManager.add(message);
            console.log('✅ Message enregistré:', result);

            // Afficher un message de succès
            alert('✅ Votre message a été reçu avec succès!\nNous vous répondrons dès que possible.');

            // Réinitialiser le formulaire
            form.reset();
            
            // Log des statistiques
            console.log('📊 Statistiques:', window.messageManager.getStats());

        } catch (error) {
            console.error('❌ Erreur:', error.message);
            alert('❌ Erreur: ' + error.message);
        }
    });

    console.log('✅ Écouteur de soumission du formulaire configuré');
});
