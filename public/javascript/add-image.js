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
    const image = reader.result;
    const type = imageInput.files[0].type;
    const name = imageInput.files[0].name;
    const size = imageInput.files[0].size;
    // const pet_id = 3; // req.session.id assigned in backend

    const response = await fetch("/img", {
      method: "POST",
      body: JSON.stringify({
        image,
        type,
        name,
        size,
        // pet_id, // req.session.id assigned in backend
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("success");
      closeModal();
      let icon = document.querySelector("#success-icon");
      let message = document.querySelector("#success-message");
      icon.classList.remove("hide");
      message.classList.remove("hide");
      closeModal();
    } else {
      console.log(error);
    }
  }
}

function imgModal(event) {
  openModal();
  document.querySelector("#exit").addEventListener("click", closeModal);
  document.querySelector("#end").addEventListener("click", closeModal);
  document.querySelector("#add-img-form").addEventListener("submit", saveImg);
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
