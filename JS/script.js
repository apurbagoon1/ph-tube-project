const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
};
const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
};

function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (let btn of activeButtons) {
        btn.classList.remove("active");
    }
}

function loadCategories() {
    // 1- fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        //2 - convert promise to json
        .then((res) => res.json())
        //3 - send data to display
        .then((data) => displayCategories(data.categories));
}

function loadVideos(searchText = "") {
    showLoader();
    fetch(
        `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
    )
        .then((response) => response.json())
        .then((data) => {
            removeActiveClass();
            document.getElementById("btn-all").classList.add("active");
            displayVideos(data.videos);
        });
}

document.getElementById("search-input").addEventListener("keyup", (e) => {
    const input = e.target.value;
    loadVideos(input);
});

const loadCategoryVideos = (id) => {
    showLoader();
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add("active");
            displayVideos(data.category);
        });
};

const loadVideoDetails = (videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayVideoDetails(data.video));
};


// {
//     "category_id": "1001",
//     "category": "Music"
// }

function displayCategories(categories) {
    const categoryContainer = document.getElementById("category-container");

    for (let cat of categories) {
        const categoryDiv = document.createElement("div");

        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})"  class="btn btn-sm btn-soft font-medium px-4 hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;

        categoryContainer.append(categoryDiv);
    }
}

// {
//     "category_id": "1003",
//     "video_id": "aaak",
//     "thumbnail": "https://i.ibb.co/ZNggzdm/cake.jpg",
//     "title": "Beyond The Pale",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/MZ2vbXR/jimm.jpg",
//             "profile_name": "Jim Gaffigan",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "2.6K",
//         "posted_date": "15400"
//     },
//     "description": "'Beyond The Pale' by Jim Gaffigan, with 2.6K views, is a comedic gem that explores everyday observations and family life with a
//     light-hearted and witty approach. Jim's humor is accessible and delightful, making this show perfect for anyone who enjoys clean, observational 
//     comedy."
// }

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");

    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.innerHTML = `
    <div
        class="py-20 col-span-full flex flex-col justify-center items-center text-center"
      >
        <img class="w-40 mb-6" src="./assets/Icon.png" alt="" />
        <h2 class="text-3xl font-bold">
          Oops!! Sorry, There is no <br> content here.
        </h2>
      </div>
    `;
        hideLoader();
        return;
    }

    videos.forEach((video) => {
        console.log(video);

        const videoCard = document.createElement("div");

        videoCard.innerHTML = `
        <div class="card bg-base-100">
         <figure class="relative">
           <img class="w-full h-44 object-cover" src="${video.thumbnail}" alt="" />
           <span
             class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2">3hrs 56 min ago
            </span>
         </figure>
        <div class="flex gap-3 px-0 py-5">
           <div class="profile">
             <div class="avatar">
               <div
                 class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                 <img src="${video.authors[0].profile_picture}"/>
               </div>
             </div>
           </div>
 
           <div class="intro">
             <h2 class="font-bold">${video.title}</h2>
             <p class="text-gray-400 flex gap-1">
              ${video.authors[0].profile_name}

              ${video.authors[0].verified == true ? `<img
                class="ml-1 w-5 h-5"
                src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
                alt=""/>` : ``
            }
             </p>
             <p class="text-sm text-gray-400">${video.others.views} views</p>
           </div>
         </div>
         <button onclick=loadVideoDetails('${video.video_id
            }') class="btn btn-block rounded-lg rounded-t-none">Show Details</button>
       </div>        
        `;

        videoContainer.append(videoCard);
    });
    hideLoader();
};

const displayVideoDetails = (video) => {
    console.log(video);
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details-container");

    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
    <figure>
      <img
        src="${video.thumbnail}"
        alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${video.title}</h2>
      <p>${video.description}</p>
      <div class="card-actions justify-end">
        
      </div>
    </div>
  </div>
    `;
};

loadCategories();
