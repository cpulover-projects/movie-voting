const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

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
    // for background triggers you must return a value/promise
    return admin.firestore().collection('users').doc(user.uid).set({
      email: user.email,
      upvotedOn: [],
    });
  });
  
  // auth trigger (user deleted)
  exports.userDeleted = functions.auth.user().onDelete(user => {
    const doc = admin.firestore().collection('users').doc(user.uid);
    return doc.delete();
  });

  // http callable function (adding a movie)
exports.addMovie = functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated', 
        'Only authenticated users can add requests'
      );
    }
    if (data.text.length > 30) {
      throw new functions.https.HttpsError(
        'invalid-argument', 
        'Request must be no more than 30 characters long'
      );
    }
    return admin.firestore().collection('movies').add({
      text: data.text,
      upvotes: 0
    }).then((data)=>{
        return console.log("Movie added: "+data);
    });
  });

  //http callable function: upvote
  exports.upvote = functions.https.onCall((data, context)=>{
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated', 
        'Only authenticated users can add requests'
      );
    }

    //get refs for user doc and movie doc
    const user = admin.firestore().collection('users').doc(context.auth.uid);
    const movie = admin.firestore().collection('movies').doc(data.id);

    return user.get().then(doc => {
      // check thew user hasn't already upvoted
      if(doc.data().upvotedOn.includes(data.id)){
        throw new functions.https.HttpsError(
          'failed-precondition', 
          'You can only vote something up once'
        );
      }
  
      // update the array in user document
      return user.update({
        upvotedOn: [...doc.data().upvotedOn, data.id]
      })
      .then(() => {
        // update the votes on the request
        return movie.update({
          upvotes: admin.firestore.FieldValue.increment(1)
        });
      });
  

      
    })
  })