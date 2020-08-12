const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


//http request 2
exports.myWebsite = functions.https.onRequest((request, response)=>{
    response.redirect('https://justacpulover.com');
});

//http callable 1
exports.sayHello=functions.https.onCall((data, context)=>{
    const name=data.name;
    return `hello ${name}!!!`;
})

// auth trigger (new user signup)
exports.newUserSignUp = functions.auth.user().onCreate(user => {
    console.log('user created: ', user.email, user.uid);
  });
  
  // auth trigger (user deleted)
  exports.userDeleted = functions.auth.user().onDelete(user => {
    console.log('user deleted: ', user.email, user.uid);
  });