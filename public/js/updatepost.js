// const initUpdatePostButton = document.getElementById("updatePost");
const finalUpdatePostButton = document.getElementById("finalUpdateBtn");
// const updateFormEls = document.getElementByClassName("updateform");
const newTitle = document.getElementById("postupdatetitle");
const newContent = document.getElementById("postupdatecontent");
// initUpdatePostButton.addEventListener("click", async (e) => {
//     e.preventDefault();
//     for (i = 0; i< updateFormEls.length; i++) {
//         updateFormEls[i].setAttribute("style","display:block;")
//     }

// })

finalUpdatePostButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const title = newTitle.value.trim();
    const content = newContent.value.trim();
    const currUrl = window.location.href;
    const urlStrArray = currUrl.split("/"); //will create an array of the text content in the url separated by forward slashes
    const post_id = urlStrArray[urlStrArray.length - 1];
    let currentDate = new Date(); //retrieve a date stamp
    let today = currentDate.toLocaleString(); //convert it into format that is more readable for end-user
    await fetch("/api/updatepost", {
        method: "PUT",
        headers: {
            Accept: "application/json, text/plain, */*", 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
            post_id: post_id, 
            date: today,
          }),
    }).then((res) => {
        console.log(res);
        if (res.status == 200) {
            window.location.href = `/post/${post_id}` //refresh the page with the new post in the user's dashboard if the post is successful
        }
        
    })
})