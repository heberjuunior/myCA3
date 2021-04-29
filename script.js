function validate(){
    //access the value inside text box with id="staffPass"
     var staffInput = document.getElementById('staffPass').value;

     // REGEX password validation
     var regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!-\/:-@\[-`{-~]).{8,}$/;


    //Showing feedback after password input
     if (regx.test(staffInput)){
       document.getElementById('Valid').style.visibility = "visible";
       document.getElementById('inValid').style.visibility = "hidden";
     }
     else {
        document.getElementById('inValid').style.visibility = "visible";
        document.getElementById('Valid').style.visibility = "hidden";
     }
  }



 function getUsers(){
     fetch("https://randomuser.me/api/?results=5")
   .then((res) => res.json())
   .then((data) => {
    let output = '<h2>Users</h2>';  
    data.forEach(user){
      output +=
      `
      <div>
      <h3>${results.name}</h3>
      <ul>
        <li> ${results.location.street.country}</li>
        <li> ${results.picture.medium}</li>
        <li> ${results.gender}</li>    
      </ul>
      </div>
       `;
    });
    document.getElementById('output').innerHTML = output;}