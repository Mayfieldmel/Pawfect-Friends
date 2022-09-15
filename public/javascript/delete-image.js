const deleteImage = document.querySelector("#delete-image");

async function deleteImg() {
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/img/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.replace('/profile/');
  } else {
    alert(response.statusText);
  }
}
  

deleteImage.addEventListener("click", deleteImg)