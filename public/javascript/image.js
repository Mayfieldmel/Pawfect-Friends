const imageInput = document.querySelector('#input-files');
const previewImage = document.querySelector('#preview-images');
const submitImage = document.querySelector('#upload-image');
const getImages = document.querySelector('#getAll');
const display = document.querySelector('#displayAll');

function displayImg(event) {
    console.log(event.target.value)
    console.log(imageInput)
    console.log(imageInput.files)
    console.log(imageInput.files[0].type)
        if (imageInput.files) {
            
            var reader = new FileReader();
            reader.onload = function(event) {
            document.createElement("img");
            let img = document.createElement('img')
            img.setAttribute('src', event.target.result)
            previewImage.appendChild(img);
            };
            reader.readAsDataURL(imageInput.files[0]);
            console.log(reader)
          
        }
}

async function saveImg(event) {
    event.preventDefault();
    if (imageInput.files) {
        const image = imageInput.files[0];
        const type = imageInput.files[0].type;
        const name = imageInput.files[0].name;
        const size = imageInput.files[0].size;
        const pet_id = 3; // req.session.id
        
        const response = await fetch('/img', {
            method: 'POST',
            body: JSON.stringify({
                image,
                type,
                name,
                size,
                pet_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            console.log("success")
            document.location.replace('/');
          } else {
            alert(response.statusText);
          }
    }
}

function getAllImages(event) {
    fetch('/img/display')
    .then(response => {
        console.log(response)
      var content = response.json();
      console.log(content)
      return content
    //   var post = document.createElement('img');
      

    })
    .then(content => {
        console.log(content)
      
    reader = new FileReader();
    imageContent = reader.readAsDataURL(content);
    display.appendChild(imageContent)
    })
    
}

imageInput.addEventListener ("change", displayImg)
submitImage.addEventListener ("submit", saveImg)
getImages.addEventListener ("click", getAllImages)

// reader = new FileReader();
// reader.readAsDataURL();