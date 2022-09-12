async function profileNav(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/pets', {
        method: 'get',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        // console.log(response.json())
        const pet_id = response.json()
        pet_id.then(result => {
          document.location.replace(`profile/${result.Pet.id}`);
          
        })
      } else {
        alert(response.statusText);
      }
    }
  }
 