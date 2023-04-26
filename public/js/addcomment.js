const addCommentButton = document.getElementById("newComment");
if (addCommentButton) {
    console.log("Button exists!")

}

else {
    console.log("Button does not exist.")
}

addCommentButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const currUrl = window.location.href;
    const urlStrArray = currUrl.split("/"); //will create an array of the text content in the url separated by forward slashes
    const post_id = urlStrArray[urlStrArray.length - 1] //the post_id will be the last element in this array
    console.log(`The post id is ${post_id}`)
    const content = document.getElementById("commentContent").value.trim();
    await fetch("api/newcomment", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*", 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: content,
            post_id: post_id
          }),
    }).then((res) => {
        console.log(res);
        if (res.status == 200) {
            window.location.href = `/post/${post_id}`//refresh the page with the new post in the user's dashboard if the post is successful
        }
        else {
            console.log("FAILURE")
        }
        
    })
})