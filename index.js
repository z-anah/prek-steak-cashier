const firebaseConfig = {
  apiKey: "AIzaSyBQQdDLImj_2kxfOUUlBLhITt2Z682d95k",
  authDomain: "perso-news-app.firebaseapp.com",
  projectId: "perso-news-app",
  storageBucket: "perso-news-app.appspot.com",
  messagingSenderId: "906006395441",
  appId: "1:906006395441:web:a03165775f4621fe123310",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const collection_ps_menu = db.collection("ps_menu");
let display_ps_menu = [];

const get_ps_menu = async () => {
  let ps_menu = [];
  try {
    const querySnapshot = await collection_ps_menu.get();
    querySnapshot.forEach((doc) => {
      ps_menu.push(doc.data());
    });
    return ps_menu;
  } catch (error) {
    console.error("Error getting documents: ", error);
    alert(error);
  }
};
const add_ps_menu = async () => {
    let label = document.getElementById("ps-menu-label").value;
    let harga = document.getElementById("ps-menu-harga").value;
  try {
    await collection_ps_menu.doc().set({
      label: label,
      harga: harga,
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    alert(error);
  }
};
