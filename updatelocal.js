window.addEventListener('storage', function(event) {
    if (event.key === 'todos' && !event.newValue) {
      
      clearTodosFromFirebase();
    }
  });
  
  function clearTodosFromFirebase() {
    fetch('https://todolist-zahra-default-rtdb.firebaseio.com//todos.json', {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        console.log('All todos deleted successfully from Firebase');
      } else {
        console.error('Error deleting todos from Firebase');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  
  