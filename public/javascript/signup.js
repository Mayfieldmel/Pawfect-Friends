async function signupFormHandler(event) {
    event.preventDefault();
  
    const petname = document.querySelector('#petname-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (petname && email && password) {
      const response = await fetch('/api/pets', {
        method: 'post',
        body: JSON.stringify({
          // pet_name,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }

  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);