
var app = new Vue({
    el: '#app',
    data: {
      movies: [],
    },
    methods: {
        upvoteMovie(id){
            console.log(id);
            const upvote = firebaseFunctionRef.httpsCallable('upvote');
            upvote({id}).then( //shorthand for {id: id}
                console.log(`>>> ${id} upvoted`)
            ).catch((error)=>{
                showNotification(error.message);
            });
        }
    },
    mounted() {
      const ref = firebase.firestore().collection('movies').orderBy('upvotes', 'desc');
      ref.onSnapshot(snapshot => {
        let movies = [];
        snapshot.forEach(doc => {
          movies.push({...doc.data(), id: doc.id});
        });
        this.movies = movies;
      });
    }
  });

  // notification
const notification = document.querySelector('.notification');

const showNotification = (message) => {
  notification.textContent = message;
  notification.classList.add('active');
  setTimeout(() => {
    notification.classList.remove('active');
    notification.textContent = '';
  }, 4000);
};