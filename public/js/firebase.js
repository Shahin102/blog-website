const firebaseConfig = {
    apiKey: "AIzaSyDYCLgI0B9yfTUrCgh356SZsnuHdzXQKNc",
    authDomain: "blog-website-c5512.firebaseapp.com",
    databaseURL: "https://blog-website-c5512-default-rtdb.firebaseio.com",
    projectId: "blog-website-c5512",
    storageBucket: "blog-website-c5512.appspot.com",
    messagingSenderId: "636561138990",
    appId: "1:636561138990:web:1e990307e25ee61d7046bf"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

const logoutUser = () => {
    auth.signOut();
    location.reload();
}

const rootRef = firebase.database().ref();

const commentsRef = rootRef.child('comments');