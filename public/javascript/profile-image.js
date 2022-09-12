const imageInput = document.querySelector("#img-files");
const previewImage = document.querySelector("#preview-images");
const submitImage = document.querySelector("#upload-image");
// const getImages = document.querySelector("#getAll");
// const display = document.querySelector("#displayAll");
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
    const image = reader.result;
    const type = imageInput.files[0].type;
    const name = imageInput.files[0].name;
    const size = imageInput.files[0].size;
    const profile_pic = true;
    // const pet_id = 3; // req.session.id assigned in backend

    const response = await fetch('/img', {
      method: "POST",
      body: JSON.stringify({
        image,
        type,
        name,
        size,
        profile_pic
        // pet_id, // req.session.id assigned in backend
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("success");
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
}

// function getAllImages(event) {
//   fetch("/img/display").then((response) => {
//     var content = response.json();
//     content.then((result) => {
//       let img = document.createElement("img");
//       img.setAttribute("src", result[0].image);
//       display.appendChild(img);
//     });
//   });
// }





  document
    .querySelector("#profile-img-form")
    .addEventListener("submit", saveImg);
  document.querySelector("#img-files").addEventListener("change", displayImg);


