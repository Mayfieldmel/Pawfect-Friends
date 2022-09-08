const upload = document.querySelector('#upload');

function uploadImg() {
    console.log("click");
    console.log(upload.value);
    console.log(upload)
}

upload.addEventListener ("change", uploadImg)