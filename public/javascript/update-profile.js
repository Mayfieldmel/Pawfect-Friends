const imageInput = document.querySelector("#input-files");
const previewImage = document.querySelector("#preview-images");
const submitImage = document.querySelector("#upload-image");
var imgModalEl = document.querySelector("#imgModal");

async function updateFormHandler(event) {
  event.preventDefault();
  const email = document.querySelector("#newEmail").value.trim();
  const password = document.querySelector("#newPassword").value.trim();

  if (email && password) {
    const response = await fetch(`/api/pets/`, {
      method: "put",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log(response);
      document.location.replace("/profile/update");
    }
  }
}

//  update profile picture
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
    console.log(profile_pic);
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
      document.location.replace("/profile/update");
    } else {
      alert(response.statusText);
    }
  }
}

// image modal
function imgModal(event) {
  console.log("click");
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

// delete profile
async function deleteProfile() {
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log(id);
  const response = await fetch(`api/pets/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    logout();
    document.location.replace("/");
  } else {
    console.log("error");
  }
}

async function logout() {
  const response = await fetch("/api/pets/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#newProfileUpdates")
  .addEventListener("submit", updateFormHandler);
document.querySelector("#add-img-btn").addEventListener("click", imgModal);
