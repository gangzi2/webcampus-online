# Formulaire de Contact Spartan

Un composant de formulaire de contact complètement fonctionnel utilisant les composants Spartan UI pour Angular.

## 📁 Fichiers

- **`contact-form.component.ts`** - Composant principal du formulaire
- **`contact-form.component.scss`** - Styles du formulaire
- **`contact-page.component.ts`** - Page de démonstration complète avec informations de contact
- **`index.ts`** - Fichier d'export

## 🎯 Caractéristiques

### Composant FormulaiComponent (`ContactFormComponent`)

- ✅ Validation complète des champs
- ✅ Messages d'erreur détaillés
- ✅ États de chargement
- ✅ Messages de succès animés
- ✅ Support du dark mode (via Tailwind)
- ✅ Accessibilité (ARIA attributes)
- ✅ Réutilisable et indépendant

### Champs du formulaire

- **Nom complet** - Requis, minimum 2 caractères
- **Email** - Requis, validation email
- **Téléphone** - Optionnel, validation format téléphone
- **Sujet** - Requis, minimum 3 caractères
- **Message** - Requis, minimum 10 caractères

### Composants Spartan utilisés

- 🔘 `HlmButton` - Boutons stylisés
- 📝 `HlmInput` - Champs de saisie
- 📄 `HlmTextarea` - Zone de texte multiligne
- 🎨 Classes utilitaires Tailwind CSS + CVA (Class Variance Authority)

## 🚀 Utilisation

### Import du composant

```typescript
import { ContactFormComponent } from '@webcampus2/contact-form';

@Component({
  selector: 'app-my-component',
  imports: [ContactFormComponent],
  template: `<app-contact-form></app-contact-form>`,
})
export class MyComponent {}
```

### Page de contact complète

```typescript
import { ContactPageComponent } from '@webcampus2/contact-page';

// Dans votre configuration de routes
const routes: Routes = [{ path: 'contact', component: ContactPageComponent }];
```

## 🎨 Personnalisation

### Modifier les validations

Éditez le `FormGroup` dans le constructeur:

```typescript
this.contactForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  // ...
});
```

### Envoi des messages

Le formulaire appelle `POST /api/contact`. En développement, l'adresse de
l'API est définie dans `src/environements/environement.developement.ts`.
En production, `src/environements/environement.ts` utilise la même origine :
le serveur frontal doit relayer `/api/` vers l'API .NET.

Configurez côté serveur les variables d'environnement `EmailSettings__Server`,
`EmailSettings__Port`, `EmailSettings__SenderEmail`,
`EmailSettings__SenderPassword` et `EmailSettings__ContactRecipient`. Ne
placez pas de mot de passe dans le code ou les fichiers Angular. Le destinataire
est choisi côté serveur ; l'adresse du visiteur sert d'adresse de réponse.
Redémarrez l'API après avoir modifié son environnement.

En développement, l'API autorise l'origine `http://localhost:4200`. La route
limite chaque adresse IP à cinq requêtes par minute. Si l'API est derrière un
proxy inverse, configurez correctement la transmission des adresses client.

### Ajouter des champs

1. Ajoutez le contrôle au `FormGroup`
2. Créez une nouvelle section `<div>` avec label, input, et validation
3. Mettez à jour les validations dans `getFieldError()`

## 🔐 Sécurité

- ✅ Validation côté client avec Angular Reactive Forms
- ✅ Sanitisation des entrées utilisateur via Angular
- ⚠️ **Important**: Validez TOUJOURS les données côté serveur
- ⚠️ N'oubliez pas CSRF protection sur votre API

## 🎯 Classe de tailwind utilisées

| Classe                  | Utilité                              |
| ----------------------- | ------------------------------------ |
| `space-y-6`             | Espacement vertical entre les champs |
| `bg-destructive`        | Couleur des messages d'erreur        |
| `text-foreground`       | Texte principal                      |
| `text-muted-foreground` | Texte secondaire/placeholder         |
| `border-border`         | Couleur des bordures                 |
| `rounded-lg`            | Bordures arrondies                   |
| `dark:`                 | Variantes dark mode                  |

## 📱 Responsive

Le formulaire et la page de contact sont entièrement responsive:

- Mobile: Colonne unique
- Tablette: 2 colonnes
- Desktop: 3 colonnes (formulaire + infos de contact)

## 🔗 Dépendances

- `@angular/forms` - Reactive Forms
- `@ng-icons/core` + `@ng-icons/lucide` - Icônes
- `@spartan-ng/brain` - Composants de base
- `tailwindcss` - Styles
- `class-variance-authority` - CVA pour les variants
- `clsx` - Gestion des classes CSS

---

**Créé avec ❤️ en utilisant Spartan UI Components**
