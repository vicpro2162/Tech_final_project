// ===========================
// GESTION DES MESSAGES DE CONTACT
// ===========================

// Gestionnaire de messages
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

    /**
     * Ajouter un nouveau message
     */
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
            statut: 'non-lu', // 'non-lu', 'lu', 'traité'
            notes: ''
        };
        messages.push(newMessage);
        localStorage.setItem(this.storageKey, JSON.stringify(messages));
        return newMessage;
    }

    /**
     * Récupérer tous les messages
     */
    getAll() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Récupérer un message par ID
     */
    getById(id) {
        return this.getAll().find(m => m.id === id);
    }

    /**
     * Récupérer les messages par email
     */
    getByEmail(email) {
        return this.getAll().filter(m => m.email.toLowerCase() === email.toLowerCase());
    }

    /**
     * Récupérer les messages par sujet
     */
    getBySubject(sujet) {
        return this.getAll().filter(m => m.sujet === sujet);
    }

    /**
     * Mettre à jour le statut d'un message
     */
    updateStatus(id, statut) {
        const messages = this.getAll();
        const messageIndex = messages.findIndex(m => m.id === id);
        if (messageIndex !== -1) {
            messages[messageIndex].statut = statut;
            localStorage.setItem(this.storageKey, JSON.stringify(messages));
            return true;
        }
        return false;
    }

    /**
     * Ajouter une note à un message
     */
    addNote(id, note) {
        const messages = this.getAll();
        const messageIndex = messages.findIndex(m => m.id === id);
        if (messageIndex !== -1) {
            messages[messageIndex].notes = note;
            localStorage.setItem(this.storageKey, JSON.stringify(messages));
            return true;
        }
        return false;
    }

    /**
     * Supprimer un message
     */
    delete(id) {
        const messages = this.getAll().filter(m => m.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(messages));
        return true;
    }

    /**
     * Supprimer tous les messages
     */
    clearAll() {
        localStorage.setItem(this.storageKey, JSON.stringify([]));
        return true;
    }

    /**
     * Obtenir les statistiques
     */
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

    /**
     * Exporter les messages en JSON
     */
    exportAsJSON() {
        const messages = this.getAll();
        const dataStr = JSON.stringify(messages, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `messages-contact-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Exporter les messages en CSV
     */
    exportAsCSV() {
        const messages = this.getAll();
        const headers = ['ID', 'Nom', 'Email', 'Téléphone', 'Sujet', 'Message', 'Date', 'Statut', 'Notes'];
        const rows = messages.map(m => [
            m.id,
            `"${m.nom}"`,
            m.email,
            m.telephone || '-',
            m.sujet,
            `"${m.message.replace(/"/g, '""')}"`,
            new Date(m.dateEnvoi).toLocaleString('fr-FR'),
            m.statut,
            `"${m.notes}"`
        ]);

        let csv = headers.join(',') + '\n';
        rows.forEach(row => {
            csv += row.join(',') + '\n';
        });

        const dataBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `messages-contact-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Afficher un résumé des messages
     */
    printSummary() {
        const stats = this.getStats();
        console.log('📧 RÉSUMÉ DES MESSAGES');
        console.log('======================');
        console.log(`Total: ${stats.total}`);
        console.log(`Non lus: ${stats.nonLus}`);
        console.log(`En cours: ${stats.enCours}`);
        console.log(`Traités: ${stats.traites}`);
        console.log('Sujets:', stats.sujets);
        console.log('Dernier message:', stats.dernierMessage ? new Date(stats.dernierMessage).toLocaleString('fr-FR') : 'Aucun');
    }
}

// Créer une instance globale
if (!window.messageManager) {
    window.messageManager = new MessageManager();
    console.log('✅ MessageManager initialisé avec succès');
} else {
    console.log('⚠️ MessageManager déjà initialisé');
}

// ===========================
// GESTION DU FORMULAIRE
// ===========================

document.addEventListener('DOMContentLoaded', function () {
    console.log('📄 DOMContentLoaded déclenché');
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    console.log('Form:', form);
    console.log('Success element:', successMessage);
    console.log('Error element:', errorMessage);

    if (!form) {
        console.warn('⚠️ Formulaire contactForm non trouvé');
        return;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('📤 Soumission du formulaire');

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
            console.log('✅ Message ajouté:', result);

            // Afficher le succès
            if (successMessage) {
                successMessage.style.display = 'block';
            }
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }

            // Réinitialiser le formulaire
            form.reset();

            // Masquer le message de succès après 5 secondes
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 5000);

            console.log('✅ Message envoyé avec succès!');
            console.log('📊 Stats:', window.messageManager.getStats());

        } catch (error) {
            console.error('❌ Erreur:', error.message);
            if (errorMessage) {
                errorMessage.textContent = '❌ ' + error.message;
                errorMessage.style.display = 'block';
            }
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }
    });
});
