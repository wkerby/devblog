const signUpButton = document.getElementById("signup");

signUpButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const userName = document.getElementById("name").value.trim(); //make sure to get rid of any extra blank space that the user entered
    const password = document.getElementById("password").value.trim(); //make sure to get rid of any extra blank space that the user entered

    await fetch("/api/signup", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      }).then((res) => {
        console.log(res);
        //for display message something like if res.message == ....
        if (res.status == 200) {
          window.location.href = "/"; //this should take us to the user's dashboard eventually when the dashboard view is set up
        }

      });
      console.log("Submitted!");


})