# Sami Majdi Aboulabbada — Portfolio

Official portfolio website for **Sami Majdi Aboulabbada** — Graphic Designer, Event Architect, and Founder & Director of [Appsvenue](https://appsvenuekw.com) in Kuwait.

- **Live Site**: https://sami-aboulabbada-portfolio.web.app
- **Repository**: https://github.com/avedis598/appsvenue_sami_portfolio

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS v4, Motion, Lucide Icons
- **Backend / Infrastructure**: Firebase Hosting, Cloud Firestore (Enterprise Native), Firebase Authentication (Google Sign-In), Cloud Storage for Firebase

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Typecheck and build for production:
   ```bash
   npm run lint
   npm run build
   ```

## Deployment

Deploy Hosting or Firestore security rules using the Firebase CLI:

```bash
# Deploy static SPA build to Firebase Hosting
npm run build && npx -y firebase-tools@latest deploy --only hosting

# Deploy Firestore security rules & indexes
npx -y firebase-tools@latest deploy --only firestore
```
