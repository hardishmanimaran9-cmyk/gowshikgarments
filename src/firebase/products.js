import { db, storage } from './config';
import {
  collection, addDoc, deleteDoc, doc, onSnapshot,
  query, where, orderBy, serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const COLLECTION = 'products';

export function subscribeProducts(callback) {
  const q = query(
    collection(db, COLLECTION),
    where('isActive', '==', true)
  );
  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(products);
  });
}

const IMGBB_API_KEY = 'b2b0b2c8f3f81941a7ebece028f8c5b6';

export async function addProduct({ productCode, note, price, imageFile }) {
  // 1. Upload to ImgBB
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  
  if (!result.success) {
    throw new Error('Image upload failed');
  }

  const imageUrl = result.data.url;

  // 2. Save to Firestore
  return addDoc(collection(db, COLLECTION), {
    productCode,
    note,
    price: Number(price),
    imageUrl,
    isActive: true,
    createdAt: serverTimestamp()
  });
}

export async function deleteProduct(product) {
  await deleteDoc(doc(db, COLLECTION, product.id));
  if (product.imagePath) {
    try {
      await deleteObject(ref(storage, product.imagePath));
    } catch (e) {
      console.warn('Image deletion failed:', e);
    }
  }
}
