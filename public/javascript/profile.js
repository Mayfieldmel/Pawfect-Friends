async function fetchData(event) {
    console.log("hi")
      const response = await fetch('/profile/display');
      console.log(response)
      if (response.ok) {
        response.json().then(result => {
            console.log(result)
        })
        
          
      } else {
        alert(response.statusText);
      }

  }
 
  window.addEventListener('load', fetchData)