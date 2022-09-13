async function fetchData(event) {
    event.preventDefault();
      const response = await fetch('/api/pets');
      if (response.ok) {
        response.json().then((data) => {
            console.log(data)
        })
          
      } else {
        alert(response.statusText);
      }
  }
 
  window.addEventListener('load', fetchData)