downloadBtn.addEventListener("click", downloadDataFromFirebase);

function downloadDataFromFirebase() {
  fetch('https://todolist-zahra-default-rtdb.firebaseio.com//todos.json')
    .then(response => response.json())
    .then(data => {
      const jsonStr = JSON.stringify(data, null, 2); 
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "todos.txt"; 
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}


