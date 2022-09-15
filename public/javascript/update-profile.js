async function updateFormHandler(event) {
    event.preventDefault();
    console.log(event.target)
    const email = document.querySelector('#newEmail').value.trim();
    const password = document.querySelector('#newPassword').value.trim();
    

    
    if (email && password) {
        // const response = await fetch(`/api/pets/${req.session.pet_id}`, {
        const response = await fetch(`/api/pets/`, {
            method: 'put',
            body: JSON.stringify({
                email,
                password,
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        console.log(response)
        document.location.replace('/profile/update');
      } 
    }
  }
  
 document.querySelector('#newProfileUpdates').addEventListener('submit', updateFormHandler);

 const imageInput = document.querySelector("#input-files");
const previewImage = document.querySelector("#preview-images");
const submitImage = document.querySelector("#upload-image");
var imgModalEl = document.querySelector("#imgModal");
const reader = new FileReader();
 
async function displayImg(event) {
  const file = event.target.files[0];
  // Encode the file using the FileReader API
  reader.onloadend = () => {
    result = reader.result;
    let img = document.createElement("img");
    img.setAttribute("src", reader.result);
    previewImage.appendChild(img);
  };
  reader.readAsDataURL(file);
}
 
async function saveImg(event) {
  event.preventDefault();
  if (imageInput.files) {
    const profile_pic = reader.result;
    console.log(profile_pic)
    const response = await fetch('/profile/img', {
      method: "PUT",
      body: JSON.stringify({
        profile_pic
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("success");
      document.location.replace('/profile/update');
    } else {
      alert(response.statusText);
    }
  }
}




function imgModal(event) {
  console.log("click");
  openModal();
  document.querySelector("#exit").addEventListener("click", closeModal);
  document.querySelector("#end").addEventListener("click", closeModal);
  document
    .querySelector("#add-img-form")
    .addEventListener("submit", saveImg);
  document.querySelector("#input-files").addEventListener("change", displayImg);
}

// Functions to open and close a modal
function openModal() {
  imgModalEl.classList.add("is-active");
  return;
}
function closeModal() {
  imgModalEl.classList.remove("is-active");
  return;
}



document.querySelector("#add-img-btn").addEventListener("click", imgModal);