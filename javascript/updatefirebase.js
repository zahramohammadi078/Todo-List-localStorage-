function updateTodoInFirebase(todoObj) {
    fetch(`https://todolist-zahra-default-rtdb.firebaseio.com//todos/${todoObj.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoObj),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }