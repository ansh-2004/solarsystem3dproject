import { collection, addDoc, getDocs, doc, getDoc, Timestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { SolarSystemConfig } from '../types';

const COLLECTION_NAME = 'solarSystemConfigs';

export const saveConfiguration = async (config: SolarSystemConfig): Promise<string> => {
  try {
    const configWithTimestamp = {
      ...config,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), configWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error saving configuration:', error);
    throw error;
  }
};

export const getConfigurations = async (): Promise<SolarSystemConfig[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        planets: data.planets,
        createdAt: data.createdAt?.toDate()
      } as SolarSystemConfig;
    });
  } catch (error) {
    console.error('Error getting configurations:', error);
    throw error;
  }
};

export const getConfigurationById = async (id: string): Promise<SolarSystemConfig | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name,
        planets: data.planets,
        createdAt: data.createdAt?.toDate()
      } as SolarSystemConfig;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting configuration by ID:', error);
    throw error;
  }
};