const imageInput = document.querySelector("#img-files");
const previewImage = document.querySelector("#preview-images");
const submitImage = document.querySelector("#upload-image");
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
    const response = await fetch("/profile/img", {
      method: "PUT",
      body: JSON.stringify({
        profile_pic,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("success");
      console.log(response.json());
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector("#img-files").addEventListener("change", displayImg);
document.querySelector("#profile-img-form").addEventListener("submit", saveImg);
