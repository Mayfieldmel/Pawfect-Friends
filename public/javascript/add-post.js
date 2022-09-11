var modalEl = document.querySelector("#modal");
const imageInput = document.querySelector("#input-files");
const previewImage = document.querySelector("#preview-images");
const submitImage = document.querySelector("#upload-image");
// var imgModalEl = document.querySelector("#imgModal");

function modal(event) {
  console.log("click");
  openModal();
  document.querySelector("#close").addEventListener("click", closeModal);
  document.querySelector(".delete").addEventListener("click", closeModal);
  document
    .querySelector("#add-post-form")
    .addEventListener("submit", postFormHandler);

  document
  .querySelector("#add-img-form")
  .addEventListener("submit", saveImg);
document.querySelector("#input-files").addEventListener("change", displayImg);
}

// Functions to open and close a modal
function openModal() {
  modalEl.classList.add("is-active");
}
function closeModal($el) {
  modalEl.classList.remove("is-active");
}

// create new post
async function postFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector(
    'textarea[name="post-content"]'
  ).value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      post_text,
      //   pet_id: req.session.id --- add on backend
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}
// async function displayImg(event) {
//   if (imageInput.files) {
//     console.log(imageInput.files);
//     var reader = new FileReader();
//     reader.onload = function (event) {
//       previewImage.textContent = "preview image";
//       document.createElement("img");
//       let img = document.createElement("img");
//       img.setAttribute("src", event.target.result);
//       previewImage.appendChild(img);
//     };
//     reader.readAsDataURL(imageInput.files[0]);
//   }
// }

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
    // const pet_id = 3; // req.session.id assigned in backend

    const response = await fetch('/img', {
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
      document.location.replace('/');
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







// document.querySelector("#add-img-btn").addEventListener("click", modal);

document.querySelector("#add-post-btn").addEventListener("click", modal);
