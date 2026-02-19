# Système d'Inscription Minimaliste

Ce projet est un système d'inscription simple composé d'une interface web et d'un serveur backend en Python.

## Composants

- **Frontend** : `index.html`, `style.css`, `script.js` - Le formulaire d'inscription.
- **Frontend (Vue)** : `inscriptions.html`, `inscriptions.css`, `inscriptions.js` - Une page pour visualiser les inscriptions.
- **Backend** : `server.py` - Un serveur web Python qui reçoit les données et les stocke.
- **Stockage** : `inscriptions.json` - Un fichier JSON où les données sont sauvegardées.

## Comment lancer le projet

### 1. Démarrer le serveur backend

Le serveur est écrit en Python et n'utilise que des bibliothèques standard. Pour le lancer, exécutez la commande suivante dans votre terminal :

```bash
python server.py
```

Le serveur démarrera sur `http://localhost:8000`.

### 2. Accéder au formulaire d'inscription

Ouvrez votre navigateur web et accédez à l'URL suivante pour remplir et soumettre le formulaire :

[http://localhost:8000](http://localhost:8000)

### 3. Voir les inscriptions

Pour voir la liste de toutes les inscriptions enregistrées, ouvrez l'URL suivante dans votre navigateur :

[http://localhost:8000/inscriptions.html](http://localhost:8000/inscriptions.html)
