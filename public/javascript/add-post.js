var modalEl = document.querySelector("#modal");
const imageInput = document.querySelector("#input-files");
const previewImage = document.querySelector("#preview-images");

function modal(event) {
  console.log("click");
  openModal();
  document.querySelector("#close").addEventListener("click", closeModal);
  document.querySelector(".delete").addEventListener("click", closeModal);
  document
    .querySelector("#add-post-form")
    .addEventListener("submit", postFormHandler);
  //   document.querySelector("#input-files").addEventListener("change", displayImg);
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
  //   const post_img = imageInput.files[0];
  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      //   post_img,
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


document.querySelector("#add-post-btn").addEventListener("click", modal);
