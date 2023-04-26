const addPostButton = document.getElementById("newPost");

addPostButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const title = document.getElementById("titleContent").value.trim();
    const content = document.getElementById("contentContent").value.trim();
    await fetch("api/newpost", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*", 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
          }),
    }).then((res) => {
        console.log(res);
        if (res.status == 200) {
            window.location.href = "/dashboard" //refresh the page with the new post in the user's dashboard if the post is successful
        }
        
    })
})