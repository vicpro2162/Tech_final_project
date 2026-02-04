/**
 * 🛠️ Utilitaires de Gestion des Inscriptions
 * Ensemble de fonctions helper pour gérer les données d'inscription
 */

class InscriptionManager {
    constructor() {
        this.storageKey = 'inscriptions';
    }

    /**
     * Récupère toutes les inscriptions
     * @returns {Array} Tableau des inscriptions
     */
    getAll() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Ajoute une nouvelle inscription
     * @param {Object} inscription - Les données d'inscription
     * @returns {boolean} true si succès, false sinon
     */
    add(inscription) {
        const inscriptions = this.getAll();

        // Vérifier si l'email existe déjà
        if (this._emailExists(inscription.email)) {
            console.warn('Email déjà existant:', inscription.email);
            return false;
        }

        // Ajouter l'ID si absent
        if (!inscription.id) {
            inscription.id = Date.now();
        }

        inscriptions.push(inscription);
        localStorage.setItem(this.storageKey, JSON.stringify(inscriptions));
        console.log('✅ Inscription ajoutée:', inscription);
        return true;
    }

    /**
     * Supprime une inscription par ID
     * @param {number} id - L'ID de l'inscription
     * @returns {boolean} true si suppression réussie
     */
    delete(id) {
        const inscriptions = this.getAll();
        const filtered = inscriptions.filter(item => item.id !== id);

        if (filtered.length === inscriptions.length) {
            console.warn('Inscription non trouvée:', id);
            return false;
        }

        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
        console.log('✅ Inscription supprimée:', id);
        return true;
    }

    /**
     * Récupère une inscription par ID
     * @param {number} id - L'ID de l'inscription
     * @returns {Object|null} L'inscription ou null
     */
    getById(id) {
        const inscriptions = this.getAll();
        return inscriptions.find(item => item.id === id) || null;
    }

    /**
     * Récupère une inscription par email
     * @param {string} email - L'email
     * @returns {Object|null} L'inscription ou null
     */
    getByEmail(email) {
        const inscriptions = this.getAll();
        return inscriptions.find(item => item.email === email.toLowerCase()) || null;
    }

    /**
     * Obtient les statistiques
     * @returns {Object} Objet avec les stats
     */
    getStats() {
        const inscriptions = this.getAll();
        const niveaux = {};
        let totalAge = 0;
        let countAge = 0;

        inscriptions.forEach(item => {
            niveaux[item.niveau] = (niveaux[item.niveau] || 0) + 1;
            
            if (item.age) {
                totalAge += item.age;
                countAge++;
            }
        });

        return {
            total: inscriptions.length,
            parNiveau: niveaux,
            moyenneAge: countAge > 0 ? (totalAge / countAge).toFixed(1) : 0,
            derniereInscription: inscriptions.length > 0 ? inscriptions[inscriptions.length - 1].dateInscription : null
        };
    }

    /**
     * Exporte les inscriptions en JSON
     */
    exportAsJSON(filename = null) {
        const inscriptions = this.getAll();
        
        if (inscriptions.length === 0) {
            alert('Aucune inscription à exporter');
            return;
        }

        const json = JSON.stringify(inscriptions, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = filename || `inscriptions-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        console.log(`✅ ${inscriptions.length} inscription(s) exportée(s)`);
    }

    /**
     * Exporte les inscriptions en CSV
     */
    exportAsCSV(filename = null) {
        const inscriptions = this.getAll();
        
        if (inscriptions.length === 0) {
            alert('Aucune inscription à exporter');
            return;
        }

        const headers = Object.keys(inscriptions[0]);
        let csv = headers.join(',') + '\n';

        inscriptions.forEach(item => {
            const row = headers.map(header => {
                let value = item[header];
                if (typeof value === 'string') {
                    value = value.replace(/"/g, '""');
                    if (value.includes(',')) {
                        value = `"${value}"`;
                    }
                }
                return value;
            });
            csv += row.join(',') + '\n';
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = filename || `inscriptions-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        console.log(`✅ ${inscriptions.length} inscription(s) exportée(s) en CSV`);
    }

    /**
     * Efface TOUTES les inscriptions
     * @param {boolean} confirmé - Doit être true pour effectuer l'opération
     */
    clearAll(confirmé = false) {
        if (!confirmé) {
            console.warn('⚠️ clearAll nécessite confirmé=true');
            return false;
        }

        localStorage.removeItem(this.storageKey);
        console.log('🗑️ Toutes les inscriptions ont été supprimées');
        return true;
    }

    /**
     * Affiche un résumé dans la console
     */
    printSummary() {
        const stats = this.getStats();
        console.group('📊 Résumé des Inscriptions');
        console.log('Total:', stats.total);
        console.log('Par Niveau:', stats.parNiveau);
        console.log('Moyenne Age:', stats.moyenneAge);
        console.log('Dernière Inscription:', stats.derniereInscription);
        console.groupEnd();
    }

    /**
     * Vérifier si un email existe
     * @private
     */
    _emailExists(email) {
        const inscriptions = this.getAll();
        return inscriptions.some(item => item.email === email.toLowerCase());
    }
}

// Instance globale
window.inscriptionManager = new InscriptionManager();

console.log('✅ InscriptionManager chargé');
console.log('Utilisation: window.inscriptionManager.getAll()');
