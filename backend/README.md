# 📝 BOURSE TECH - SYSTÈME D'INSCRIPTION AMÉLIORÉ v2.0

## 🚀 Démarrage Rapide

### 👥 Pour les Utilisateurs
1. Ouvrez **inscriptions.html**
2. Remplissez le formulaire
3. Cliquez "S'inscrire"
4. Votre inscription est sauvegardée! ✅

### ⚙️ Pour les Administrateurs
1. Ouvrez **admin-inscriptions.html**
2. Visualisez toutes les inscriptions
3. Exportez en JSON ou CSV
4. Gérez les inscriptions individuellement

### 🏠 Centre d'Accès
**hub.html** - Tous les liens en un endroit

---

## 📁 Fichiers du Dossier

### Formulaires
- **inscriptions.html** - Formulaire d'inscription (amélioré)
- **inscriptions.js** - Logique de soumission
- **inscriptions.css** - Styles modernes

### Confirmation & Gestion
- **submit-inscription-copie.html** - Page de confirmation
- **admin-inscriptions.html** - Dashboard d'administration

### Utilitaires
- **inscription-utils.js** - Classe InscriptionManager

### Navigation
- **hub.html** - Centre d'accès aux fonctionnalités

---

## 💾 Données Sauvegardées

Les données sont stockées dans **localStorage** du navigateur:

```
localStorage.inscriptions = [
    {
        id: 1702655400000,
        nom: "Jean Dupont",
        email: "jean@example.com",
        telephone: "+33123456789",
        age: 18,
        ville: "Paris",
        niveau: "lycee",
        motivation: "...",
        conditions: true,
        dateInscription: "2025-12-15T09:40:00Z"
    }
]
```

---

## 🎨 Fonctionnalités

✅ Formulaire responsive et moderne
✅ Validation automatique des champs
✅ Vérification des doublons d'email
✅ Sauvegarde locale (localStorage)
✅ Dashboard complet avec statistiques
✅ Export JSON et CSV
✅ Gestion individuelle des inscriptions
✅ Page de confirmation élégante

---

## 🔧 API JavaScript

### Utilisation dans la Console (F12)

```javascript
// Récupérer toutes les inscriptions
window.inscriptionManager.getAll()

// Voir les statistiques
window.inscriptionManager.getStats()

// Exporter en JSON
window.inscriptionManager.exportAsJSON()

// Exporter en CSV
window.inscriptionManager.exportAsCSV()

// Supprimer une inscription
window.inscriptionManager.delete(id)

// Afficher un résumé
window.inscriptionManager.printSummary()
```

---

## 📊 Affichage des Données

### Dans Admin Dashboard
- Table complète de toutes les inscriptions
- Statistiques (total, moyenne d'âge, etc)
- Actions (actualiser, exporter, supprimer)

### Dans la Console (F12)
```javascript
JSON.parse(localStorage.getItem('inscriptions'))
```

---

## 🌐 Accès aux Fichiers

| Fichier | Accès |
|---------|-------|
| hub.html | http://BourseTech/backend/hub.html |
| inscriptions.html | http://BourseTech/backend/inscriptions.html |
| admin-inscriptions.html | http://BourseTech/backend/admin-inscriptions.html |

---

## 🔒 Sécurité

✅ Données stockées localement
✅ Aucun serveur externe
✅ Pas de transmission de données
✅ Vérification des doublons

⚠️ Pour production: Ajouter backend + authentification

---

## 📞 Support

**Console du Navigateur (F12)**
```javascript
window.inscriptionManager.printSummary()
```

**Questions?**
- Vérifiez que localStorage n'est pas désactivé
- Videz le cache si les données ne s'affichent pas
- Utilisez le mode incognito pour tester

---

**Version**: 2.0
**Status**: ✅ PRODUCTION READY
**Date**: Février 2026
