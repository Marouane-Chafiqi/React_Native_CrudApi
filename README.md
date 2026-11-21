# Lab 12 – Application CRUD avec une API REST et React Native

Une application mobile Expo qui gère des produits à travers une vraie API REST ([Platzi Fake Store](https://api.escuelajs.co/api/v1/products)) : on peut **lire, ajouter, modifier et supprimer** des produits.

## Démonstration

▶️ **[Voir la vidéo de démo](

https://github.com/user-attachments/assets/fca0eb72-c655-4e18-92a4-28351fed1b31

)**

## Ce que fait l'application

- **Read** : affiche les 10 premiers produits (`GET`)
- **Create** : ajoute un produit avec le formulaire (`POST`)
- **Update** : bouton « Éditer », puis « Modifier » (`PUT`)
- **Delete** : bouton « Supprimer » avec confirmation (`DELETE`)
- Validation du formulaire (titre obligatoire, prix valide)
- Indicateur de chargement, messages d'erreur et bouton « Réessayer »
- Pull-to-refresh : tirer la liste vers le bas pour l'actualiser

## Structure du projet

```
├── App.js
└── src/
    ├── api/client.js              ← configuration d'Axios
    ├── components/
    │   ├── ProductItem.jsx        ← une ligne de la liste
    │   └── ProductForm.jsx        ← formulaire ajout / modification
    └── screens/HomeScreen.jsx     ← écran principal (toute la logique CRUD)
```

## Lancer le projet

**Prérequis :** Node.js, l'application **Expo Go** sur le téléphone, et PC + téléphone sur le même Wi-Fi.

### Option 1 : installation automatique (Windows)

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

### Option 2 : installation manuelle

```bash
npx create-expo-app@latest MonAppCrudApi --template blank
cd MonAppCrudApi
npm install axios
```

Copier `App.js` et le dossier `src/` dans `MonAppCrudApi`, puis :

```bash
npx expo start -c
```

Dans les deux cas, scanner le QR code avec **Expo Go**.



