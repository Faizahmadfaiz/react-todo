import firebase from 'firebase';

try {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD1u9GI6dUAEFOdwrhZsaIPeqOKxISH8hs",
        authDomain: "faiz-todo-app.firebaseapp.com",
        databaseURL: "https://faiz-todo-app.firebaseio.com",
        storageBucket: "faiz-todo-app.appspot.com",
        messagingSenderId: "143628229218"
    };

    firebase.initializeApp(config);
} catch(e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;