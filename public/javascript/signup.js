async function signupFormHandler(event) {
  event.preventDefault();
  const pet_name = document.querySelector("#petname-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (pet_name && email && password) {
    const response = await fetch("/api/pets", {
      method: "post",
      body: JSON.stringify({
        pet_name,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log(response);
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#sign-up")
  .addEventListener("submit", signupFormHandler);
