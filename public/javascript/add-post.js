// create new post
async function postFormHandler(event) {
  console.log("submit")
  event.preventDefault();

  const post_text = document.querySelector('textarea[name="post-text"]').value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
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


