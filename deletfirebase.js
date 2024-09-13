
function deleteTodoFromFirebase(todoObj) {
    fetch(`https://todolist-zahra-default-rtdb.firebaseio.com//todos/${todoObj.id}.json`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        console.log('Item deleted successfully');
      } else {
        console.error('Error deleting item');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }