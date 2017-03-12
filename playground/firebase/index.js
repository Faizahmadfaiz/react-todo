import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD1u9GI6dUAEFOdwrhZsaIPeqOKxISH8hs",
    authDomain: "faiz-todo-app.firebaseapp.com",
    databaseURL: "https://faiz-todo-app.firebaseio.com",
    storageBucket: "faiz-todo-app.appspot.com",
    messagingSenderId: "143628229218"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

firebaseRef.set({
    app: {
        name: 'Todo App',
        version: '1.0.0'
    },
    isRunning: true,
    user: {
        name: 'Andrew',
        age: 25
    }
});

/*var notesRef = firebaseRef.child('notes');

notesRef.on('child_added', (snapshot) => {
    console.log('Child_added', snapshot.key, snapshot.val());
});

notesRef.on('child_changed', (snapshot) => {
    console.log('child_changed', snapshot.key, snapshot.val());
});
notesRef.on('child_removed', (snapshot) => {
    console.log('Child_removed', snapshot.key, snapshot.val());
});

var newNoteRef = notesRef.push({
    text: 'Play with cat!'
});

console.log('Todo id', newNoteRef.key);*/

var todosRef = firebaseRef.child('todos');

todosRef.on('child_added', (snapshot) => {
    console.log('child_added', snapshot.key, snapshot.val());
});

todosRef.on('child_changed', (snapshot) => {
    console.log('child_changed', snapshot.key, snapshot.val());
});

todosRef.push({
    text: 'Add notes'
});

todosRef.push({
    text: 'Add food'
});