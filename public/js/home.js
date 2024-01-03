const signupForm = document.getElementById("signupBtn");
const loginForm = document.getElementById("loginBtn");

//LOGIN FORM
loginForm.addEventListener("click", async function (e) {
  e.preventDefault();
  const inputEmail = document.getElementById("loginEmail");
  const inputPassword = document.getElementById("loginPassword");
  const userObj = {
    userName: inputEmail.value,
    password: inputPassword.value,
  };

  try {
    const isValidUser = await axios.post(`/user/login`, userObj);
    if (isValidUser.status == 200) {
      e.preventDefault();
      console.log(isValidUser.data);
      localStorage.setItem(
        "token",
        JSON.stringify({
          name: isValidUser.data.user._id,
          token: isValidUser.data.token,
        })
      );
      //window.location.href = `/user/dashboard`;
    }
  } catch (error) {
    window.location.href = `/html/incorrectPassword.html`;
    console.log(error);
  }
});

//SIGNUP FORM
signupForm.addEventListener("click", async (e) => {
  e.preventDefault();
  const inputName = document.getElementById("name");
  const inputEmail = document.getElementById("signupEmail");
  const inputPassword = document.getElementById("signupPassword");
  const userObj = {
    Name: inputName.value,
    userName: inputEmail.value,
    password: inputPassword.value,
  };
  try {
    
    const response = await axios.post(`/user/signup`, userObj);
    
    if (response.status == 200)
    window.location.href = `/html/registeredSuccessfully.html`;
     
  } catch (error) {
    window.location.href = `/html/alreadyUser.html`;
    console.log(error);
  }
});
