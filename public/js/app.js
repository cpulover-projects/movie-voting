const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-movie');
const requestForm = document.querySelector('.new-request form');



// open request modal
requestLink.addEventListener('click', () => {
  requestModal.classList.add('open');
});

// close request modal
requestModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('new-request')) {
    requestModal.classList.remove('open');
  }
});

//get Firebase Function reference (to use callable functions)
const firebaseFunctionRef = firebase.functions();

// const helloButton = document.querySelector('#say-hello')
// helloButton.addEventListener('click', ()=>{
//     //get callable function reference from the Firebase Function
//     const sayHello = firebaseFunctionRef.httpsCallable('sayHello');

//     //callable function is asyn so we can you then() to handle the result
//     sayHello({name: "Hieu"}).then(result => {
//         console.log(result.data);
//     });
// })

// add a new request
requestForm.addEventListener('submit', (e) => {
  e.preventDefault();

   //get callable function reference from the Firebase Function
  const addMovie = firebaseFunctionRef.httpsCallable('addMovie');
  addMovie({ 
    text: requestForm.request.value 
  })
  .then(() => {
    requestForm.reset();
    requestForm.querySelector('.error').textContent = '';
    requestModal.classList.remove('open');
  })
  .catch(error => {
    requestForm.querySelector('.error').textContent = error.message;
  });
});