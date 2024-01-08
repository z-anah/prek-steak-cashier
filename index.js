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
const collection_ps_menu_order = db.collection("ps_order_menu");
let display_ps_menu = [];

const get_ps_menu = async () => {
  let val = [];
  try {
    const querySnapshot = await collection_ps_menu.orderBy("label").get();
    querySnapshot.forEach((doc) => {
      val.push(doc.data());
    });
    return val;
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

const get_ps_order_menu_by_ps_order_id = async (ps_order_id) => {
  let val = [];
  try {
    const querySnapshot = await collection_ps_menu_order
      .where("ps_order_id", "==", ps_order_id)
      .get();
    querySnapshot.forEach((doc) => {
      val.push(doc.data());
    });
    return val;
  } catch (error) {
    console.error("Error getting documents: ", error);
    alert(error);
  }
};