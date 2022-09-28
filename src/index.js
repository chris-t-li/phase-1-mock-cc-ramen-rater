// 1st Deliverable - when page loads, see all ramen images in div#ramen-menu

// Variable Declarations
const ramenMenu = document.getElementById("ramen-menu");
const base_URL = "http://localhost:3000/ramens";
const mainImage = document.querySelector(".detail-image")
const mainName = document.querySelector(".name");
const mainRestaurant = document.querySelector(".restaurant");
const mainRating = document.querySelector("#rating-display");
const mainComment = document.querySelector("#comment-display");
const editRating = document.getElementById("edit-rating");
const editComment = document.getElementById("edit-comment");

// GET Request from JSON Server
fetch(base_URL)
    .then(res => res.json())
    .then(data => {
        data.forEach(element => renderRamen(element));
        // Advanced Deliverables 1 - Load First Ramen as soon as page loads
        displayRamenDetails(data[0])
    })

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
function displayRamenDetails(param) {
    mainImage.src = param.image;
    mainName.textContent = param.name;
    mainRestaurant.textContent = param.restaurant;
    mainRating.textContent = param.rating;
    mainComment.textContent = param.comment;
}

// 3rd Deliverable
document.getElementById("new-ramen").addEventListener("submit", e => {
    e.preventDefault();

    const newRamenObj = {
        name: e.target.name.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        restaurant: e.target.restaurant.value,
        comment: e.target["new-comment"].value
    }
    renderRamen(newRamenObj);
    addNewRamentoJSON(newRamenObj);
    e.target.reset();
})

// Advanced Deliverables 2 - Update Ramen Details
document.getElementById("edit-ramen").addEventListener("submit", e => {
    e.preventDefault();
    mainRating.textContent = editRating.value;
    mainComment.textContent = editComment.value;
    getRamenID();
})

// Advanced Deliverables 3 - Delete Featured Ramen (Brute force approach... )
document.getElementById("delete-ramen").addEventListener("submit", e => {
    e.preventDefault();
    // Selet all images within the menu div. Loop through each one and test if img src is equal to main image. If it is, remove.
    const menuImg = document.querySelectorAll("div#ramen-menu img");
    menuImg.forEach(el => {
        if(el.src === mainImage.src) {
            el.src = "";
        } 
    })

    // Reset Main Display
    mainImage.src = "./assets/image-placeholder.jpg";
    mainName.textContent = "Insert Name Here";
    mainRestaurant.textContent = "Insert Restuarant Here";
    mainRating.textContent = "Insert Rating Here";
    mainComment.textContent = "Insert Comment Here";
})

// Extra Advanced Deliverables

// persist new ramens that I create (POST request)
function addNewRamentoJSON(obj){
    fetch(base_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(console.log)
    .catch(err => console.error(err))
}

// persist my updates to a ramen's rating and comment. (PATCH request)

function getRamenID() {
    fetch(base_URL)
    .then(res => res.json())
    .then(data => data.forEach(el => {
    if(mainName.textContent === el.name) {
        updateRamenJSON(el.id)
    }
}))
}

function updateRamenJSON(id) {
    fetch(`${base_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            rating: editRating.value,
            comment: editComment.value,
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.getElementById("edit-ramen").reset();
    })
}

// persist any ramen deletions (DELETE request)