console.log("index is connected");
 
function loadCategories() { 
// 1- fetch the data
fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //2 - convert promise to json
    .then((res) => res.json())
    //3 - send data to display
    .then((data) => displayCategories(data.categories));
}

// {
//     "category_id": "1001",
//     "category": "Music"
// }

function displayCategories(categories) {
console.log(categories);
const categoryContainer = document.getElementById("category-container");

for (let cat of categories) {
    console.log(cat);

    const categoryDiv = document.createElement("div");

    categoryDiv.innerHTML = `
    <button class="btn btn-sm btn-soft font-medium px-4 hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;

    categoryContainer.append(categoryDiv);
}
}

loadCategories();