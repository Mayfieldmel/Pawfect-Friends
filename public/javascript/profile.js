// const sortArray = require('sort-array');
// const { post } = require('../../controllers');

// async function fetchData(event) {
//     console.log("hi")
//       const response = await fetch('/profile/display');
//       console.log(response)
//       if (response.ok) {
//         response.json().then(result => {
//             console.log(result)
//             displayData(result)
//         })
        
          
//       } else {
//         alert(response.statusText);
//       }

//   }
 
// //   window.addEventListener('load', fetchData)


// function displayData(data) {
//     const displayArea = document.querySelector("#display")
//     dataArr = sortArray(data, {
//         by: 'created_at',
//         order: 'desc'
//       })
//     dataArr.forEach(object => {
//         if(object.image) {
//             listItem = document.createElement("li");
//             picture = document.createElement("img");
//             picture.setAttribute("src", object.image);
//             listItem.appendChild(picture);
//             displayArea.appendChild(listItem);
//         } else {
//             listItem = document.createElement("li");
//             listItem.classList.add("media-content");
//             content = document.createElement("div");
//             content.classList.add("content");
//             post = document.createElement('p');
//             post.textContent = object.post_text
//             content.appendChild(post);
//             listItem.appendChild(content);
//             displayArea.appendChild(listItem);
//         }
//     });
// }