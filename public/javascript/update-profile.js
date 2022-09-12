async function updateFormHandler(event) {
    event.preventDefault();
    console.log(event.target)
    const email = document.querySelector('#email-update').value.trim();
    const password = document.querySelector('#password-update').value.trim();
    
    
    if (email && password) {
        const response = await fetch(`/api/pets/${req.session.pet_id}`, {
            method: 'put',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        console.log(response)
        // document.location.replace('/profile');
      } 
    }
  }

 document.querySelector('#update-pro').addEventListener('submit', updateFormHandler);