
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
                console.log(error.message);
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