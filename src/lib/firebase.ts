import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyBpD1HhFZYJZne3cw8AAIJnnBcOCcDtnWA",
  authDomain: "codoo-b75f8.firebaseapp.com",
  projectId: "codoo-b75f8",
  storageBucket: "codoo-b75f8.firebasestorage.app",
  messagingSenderId: "688267408960",
  appId: "1:688267408960:web:5b994d60b364dcc7c1d1a5",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(
  file: File,
  setProgress?: (progress: number) => void,
) {
  return new Promise((resolve, reject) => {
    try {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          if (setProgress) setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl as string);
          });
        },
      );
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
