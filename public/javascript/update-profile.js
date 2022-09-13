async function updateFormHandler(event) {
    event.preventDefault();
    console.log(event.target)
    const email = document.querySelector('#newEmail').value.trim();
    const password = document.querySelector('#newPassword').value.trim();
    
    
    if (email && password) {
        // const response = await fetch(`/api/pets/${req.session.pet_id}`, {
        const response = await fetch("/api/pets/11", {
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

 document.querySelector('#newProfileUpdates').addEventListener('submit', updateFormHandler);