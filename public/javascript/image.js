const image = document.querySelector('#input-files');
const previewImage = document.querySelector('#preview-images');
const submitImage = document.querySelector('#upload-image');

function displayImg(event) {
    console.log(event.target.value)
    console.log(image)
    console.log(image.files)
    console.log(image.files[0].type)
        if (image.files) {
            
            var reader = new FileReader();
            reader.onload = function(event) {
            document.createElement("img");
            let img = document.createElement('img')
            img.setAttribute('src', event.target.result)
            previewImage.appendChild(img);
            };
            reader.readAsDataURL(image.files[0]);
            console.log(reader)
          
        }
}

function saveImg(event) {
    event.preventDefault();
    if (image.files) {
         const image = image.files[0];
         const type = image.files[0].type;
         const name = image.files[0].name;
         const size = image.files[0].size;
         const user_id = 3; // req.session.id
    //      
    //     name: {
    //       type: DataTypes.STRING,
    //     },
    //     size: {
    //       type: DataTypes.INTEGER,
    //     },
    //     post_id: {
    //       type: DataTypes.INTEGER,
      
    }
}


image.addEventListener ("change", displayImg)
submitImage.addEventListener ("submit", saveImg)

// reader = new FileReader();
// reader.readAsDataURL();