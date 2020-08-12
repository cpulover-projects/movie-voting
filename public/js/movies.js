var app = new Vue({
    el: '#app',
    data: {
      movies: [],
    },
    mounted() {
      const ref = firebase.firestore().collection('movies');
      ref.onSnapshot(snapshot => {
        let movies = [];
        snapshot.forEach(doc => {
          movies.push({...doc.data(), id: doc.id});
        });
        this.movies = movies;
      });
    }
  });