const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//http request 1
exports.randomNumber = functions.https.onRequest((request, response)=>{
    const number = Math.round(Math.random()*100);
    console.log("Generated number: "+number);
    response.send(number.toString());
});

//http request 2
exports.myWebsite = functions.https.onRequest((request, response)=>{
    response.redirect('https://justacpulover.com');
});

//http callable 1
exports.sayHello=functions.https.onCall((data, context)=>{
    const name=data.name;
    return `hello ${name}!!!`;
})