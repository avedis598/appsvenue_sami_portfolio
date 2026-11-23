import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const { measurementId, ...sdkConfig } = firebaseConfig;

export const app = initializeApp(
  measurementId ? firebaseConfig : sdkConfig,
);

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
