// 1st Deliverable - when page loads, see all ramen images in div#ramen-menu

// Variable Declarations
const ramenMenu = document.getElementById("ramen-menu");
const base_URL = "http://localhost:3000/ramens";

// GET Request from JSON Server
fetch(base_URL)
.then(res => res.json())
.then(data => data.forEach(element => renderRamen(element)))

// Renders Ramen Objects to the DOM
function renderRamen(ramen) {
    const ramenImg = document.createElement("img");
    ramenImg.src = ramen.image;
    ramenMenu.append(ramenImg);

    // 2nd Deliverable - add event listener to each img in #ramen-menu
    ramenImg.addEventListener("click", () => {
        displayRamenDetails(ramen)
    })
}

// 2nd Deliverable - ramen info displayed inside #ramen-detail
function displayRamenDetails(param){
    document.querySelector(".detail-image").src = param.image;
    document.querySelector(".name").textContent = param.name;
    document.querySelector(".restaurant").textContent = param.restaurant;
    document.querySelector("#rating-display").textContent = param.rating;
    document.querySelector("#comment-display").textContent = param.comment;   
}

// 3rd Deliverable
document.getElementById("new-ramen").addEventListener("submit", e => {
    e.preventDefault();
    const newName = document.getElementById("new-name");
    const newRestaurant = document.getElementById("new-restaurant");
    const newImage = document.getElementById("new-image");
    const newRating = document.getElementById("new-rating");
    const newComment = document.getElementById("new-comment");

    const newRamenObj = {
        name: newName.value,
        image: newImage.value,
        rating: newRating.value,
        restaurant: newRestaurant.value,
        comment: newComment.value
    }
    renderRamen(newRamenObj);
    e.target.reset();
})