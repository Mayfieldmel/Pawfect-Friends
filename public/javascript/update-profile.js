async function updateFormHandler(event) {
    event.preventDefault();
    console.log(event.target)
    const email = document.querySelector('#email-update').value.trim();
    const password = document.querySelector('#password-update').value.trim();
    
    
//     if (email && password) {
//         const response = await fetch(`/api/pets/${req.session.pet_id}`, {
//             method: 'put',
//         body: JSON.stringify({
//           email,
//           password
//         }),
//         headers: { 'Content-Type': 'application/json' }
//       });
  
//       if (response.ok) {
//         console.log(response)
//         // document.location.replace('/profile');
//       } 
//     }
//   }

  function checkForm()
  {
   var oldPass=document.getElementById("oldP").value;
   var newPass=document.getElementById("newP").value;
   var confirmPass =document.getElementById("confirmP").value;

   if(oldPass!=""&&newPass!=""&&confirmPass!="")
   {
     if(oldPass!=newPass)
     {
       if(newPass==confirmPass)
        {
         return true;
        }
        else
         {
           alert("Confirm password is not same as you new password.");
           return false;
         }
     }
     else
    {
     alert("This Is Your Old Password,Please Provide A New Password");
     return false;
    }
   }
   else
   {
    alert("All Fields Are Required");
    return false;
   }
}}

//  document.querySelector('#update-pro').addEventListener('submit', updateFormHandler);