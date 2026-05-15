import { db } from './config';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const DOC_PATH = 'settings/business';

export function subscribeSettings(callback) {
  return onSnapshot(doc(db, 'settings', 'business'), (snap) => {
    if (snap.exists()) {
      callback(snap.data());
    } else {
      callback({
        whatsappNumber: '919876543210',
        tagline_en: 'Premium wholesale men\'s shirts · Chennai',
        tagline_ta: 'சென்னையின் சிறந்த மொத்த விலை ஆண்கள் சட்டைகள்'
      });
    }
  });
}

export async function getSettings() {
  const snap = await getDoc(doc(db, 'settings', 'business'));
  if (snap.exists()) return snap.data();
  return {
    whatsappNumber: '919876543210',
    tagline_en: 'Premium wholesale men\'s shirts · Chennai',
    tagline_ta: 'சென்னையின் சிறந்த மொத்த விலை ஆண்கள் சட்டைகள்'
  };
}

export async function updateSettings(data) {
  await setDoc(doc(db, 'settings', 'business'), data, { merge: true });
}
