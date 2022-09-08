const image = document.querySelector('#input-files')
const previewImage = document.querySelector('#preview-images')

function displayImg(event) {
    console.log("click");
    console.log(event.target)
    console.log(event.target.value)
    console.log(image)
    console.log(image.files)
        if (image.files) {
            
            var reader = new FileReader();
            reader.onload = function(event) {
            document.createElement("img");
            let img = document.createElement('img')
            img.setAttribute('src', event.target.result)
            previewImage.appendChild(img);
            };
            reader.readAsDataURL(image.files);
            console.log(reader)
          
        }
}


image.addEventListener ("change", displayImg)

// reader = new FileReader();
// reader.readAsDataURL();