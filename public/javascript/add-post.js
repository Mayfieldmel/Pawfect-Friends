var modalEl = document.querySelector("#modal");


// function modal(event) {
//   console.log("click");
//   openModal();
//   document.querySelector("#close").addEventListener("click", closeModal);
//   document.querySelector(".delete").addEventListener("click", closeModal);
  
//   //   document.querySelector("#input-files").addEventListener("change", displayImg);
// }

// // Functions to open and close a modal
// function openModal() {
//   modalEl.classList.add("is-active");
// }
// function closeModal() {
//   modalEl.classList.remove("is-active");
// }

// create new post
async function postFormHandler(event) {
  console.log("submit")
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post-text"]').value;

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
    document.location.replace("/profile");
  } else {
    alert(response.statusText);
  }
}



document
    .querySelector("#add-post-form")
    .addEventListener("submit", postFormHandler);

// document.querySelector("#add-post-btn").addEventListener("click", modal);
