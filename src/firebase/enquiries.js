import { db } from './config';
import {
  collection, addDoc, doc, updateDoc, onSnapshot,
  query, orderBy, serverTimestamp
} from 'firebase/firestore';

const COLLECTION = 'enquiries';

function generateEnquiryId() {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `GG-${digits}`;
}

export async function createEnquiry({ buyerName, phone, address, specialReq, items, totalPcs, totalStyles }) {
  const enquiryId = generateEnquiryId();
  const docRef = await addDoc(collection(db, COLLECTION), {
    enquiryId,
    buyerName,
    phone,
    address,
    specialReq: specialReq || '',
    items,
    totalPcs,
    totalStyles,
    status: 'new',
    createdAt: serverTimestamp()
  });
  return { id: docRef.id, enquiryId };
}

export function subscribeEnquiries(callback) {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const enquiries = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(enquiries);
  });
}

export async function updateEnquiryStatus(docId, status) {
  await updateDoc(doc(db, COLLECTION, docId), { status });
}
