var modalEl = document.querySelector("#modal");

function modal(event) {
  console.log("click");
  openModal();
  document.querySelector("#close").addEventListener("click", closeModal);
  document.querySelector(".delete").addEventListener("click", closeModal);
  document
    .querySelector("#add-post-form")
    .addEventListener("submit", postFormHandler);
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
      post_img,
      post_text,
      pet_id: req.session.id
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("//");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#add-post-btn").addEventListener("click", modal);
