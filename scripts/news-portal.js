let fetchData = [];

const fetchCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(response => response.json())
        .then(data => showCategories(data.data.news_category))
};
// fetchCategories();

const showCategories = data => {
    // console.log(data);

    /* capture "categories-container" to append all the category links */
    const categoriesContainer = document.getElementById('categories-container');
    data.forEach(category => {
        // console.log(category);


        /* 2 ways to add new element */

        // step-1: (advanced)-> but I'll use this method.
        categoriesContainer.innerHTML += `<a class="nav-link" href="#" onclick="fetchCategoryNews('${category?.category_id}', '${category.category_name}')">${category.category_name}</a>`

        // step-2: (recommended for all of us)
        // const linkContainer = document.createElement('p');
        // linkContainer.innerHTML = `<a class="nav-link" href="#" onclick="fetchCategoryNews('${category?.category_id}')">${category?.category_name}</a>`;
        // categoriesContainer.appendChild(linkContainer);
    });
};


/* fetch all news available in a category */
const fetchCategoryNews = (category_id, category_name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    // console.log(url);
    fetch(url).then(response => response.json()).then(data => {
        fetchData = data.data;
        showAllNews(data?.data, category_name)
    });
};

const showAllNews = (data, category_name) => {
    // console.log(data, category_name);
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;

    const newsContainer = document.getElementById('all-news');
    newsContainer.innerHTML = '';
    data.forEach(singleNews => {
        const { _id, image_url, title, details, author, total_view, rating } = singleNews;
        const dateFormatting = date(author.published_date);
        // console.log(singleNews);
        // newsContainer.innerHTML += ``
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.innerHTML =
            `<div class="row g-2">
            <div class="col-md-4">
                <img src="${image_url}" class="m-2 img-fluid rounded-start" alt="...">
            </div>
            <div class="d-flex flex-column col-md-8">
                <div class="card-body">
                    <h5 class="card-title fw-semibold">${title}</h5>
                    <p class="card-text">${details.slice(0, 200)}...</p>
                </div>

                <div class="d-flex justify-content-between align-items-center card-footer border-0 bg-body">
                    <div class="d-flex gap-1">
                        <img src="${author.img}" class="m-2 img-fluid rounded-circle" alt="..." height="40" width="40">
                        <div>
                            <p class="m-0 p-0">${author.name ? author.name : "Not Available"}</p>
                            <p class="m-0 p-0">${dateFormatting}</p>
                        </div>
                    </div>
                    <div class="d-flex gap-2 align-items-center">
                        <i class="fa-solid fa-eye"></i>
                        <p class="m-0 p-0">${total_view ? total_view : "Not Available"}</p>
                    </div>
                    <div>
                        ${ratingStars(rating.number)}
                        <span>${rating.number}</span>
                    </div>
                    <div>
                        <i class="fs-5 text-primary fa-solid fa-arrow-right" onclick="fetchNewsDetails('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </div>
                </div>
            </div>
        </div>`;
        newsContainer.appendChild(card);
    })
};

const fetchNewsDetails = news_id => {
    let url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    // console.log(url);
    fetch(url).then(response => response.json()).then(data => showNewsDetails(data.data[0]));
};

/* date formatting */
function date (givenDate){
    const dateGiven = new Date(givenDate);
    
    const month_name = function (monthNo) {
        monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthList[monthNo.getMonth()];
    }
    const month = month_name(dateGiven) ;
    const date = dateGiven.getDate();
    const year = dateGiven.getFullYear();
    // console.log(month, date, year);
    return month + " " + date + "," + " " + year;
    };

    const showNewsDetails = newsDetails => {
        // const modalContainer = document.getElementById('modal-body');
        // console.log(newsDetails);
        const { _id, image_url, title, details, author, total_view, others_info } = newsDetails;
        // console.log(singleNews);
        // newsContainer.innerHTML += ``
        const dateFormatting = date(author.published_date);
        document.getElementById('modal-body').innerHTML = `
            <div class="card mb-3">
                <div class="row g-2">
                    <div class="col-md-12">
                        <img src="${image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="d-flex flex-column col-md-12">
                        <div class="card-body">
                            <h5 class="card-title fw-semibold">${title} 
                                <span class="badge text-bg-warning">${others_info.is_trending ? "Trending" : ""}</span> 
                                <span class="badge text-bg-primary">${others_info.is_todays_pick ? "Today's Pick" : ""}</span> 
                            </h5>
                            <p class="card-text">${details}</p>
                        </div>

                        <div class="d-flex justify-content-between align-items-center card-footer border-0 bg-body">
                        <div class="d-flex gap-1">
                            <img src="${author.img}" class="m-2 img-fluid rounded-circle" alt="..." height="40" width="40">
                            <div>
                                <p class="m-0 p-0">${author.name ? author.name : "Not Available"}</p>
                                <p class="m-0 p-0">${dateFormatting}</p>
                            </div>
                        </div>
                        <div class="d-flex gap-2 align-items-center">
                            <i class="fa-solid fa-eye"></i>
                            <p class="m-0 p-0">${total_view ? total_view : "None"}</p>
                        </div>
                        <div>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    // show trending news
    const showTrending = () =>{
        // console.log(fetchData);
        const trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending === true);
        // console.log(trendingNews);
        const category_name = document.getElementById("category-name").innerText;
        showAllNews(trendingNews, category_name);
    };

    const showTodaysPick = () =>{
        const todaysPickNews = fetchData.filter(singleData => singleData.others_info.is_todays_pick === true);
        console.log(todaysPickNews);
        const category_name = document.getElementById("category-name").innerText;
        showAllNews(todaysPickNews, category_name);
    }

    // Total Optional
    // Generate Stars according to Ratings
    const ratingStars = rating =>{
        let ratingStars = '';
        for (let i = 1; i <= Math.floor(rating); i++) {
            ratingStars += `<i class="fa-solid fa-star"></i>`;
        };
        if(rating - Math.floor(rating)>0){
            ratingStars += `<i class="fa-solid fa-star-half-stroke"></i>`;
        };
        return ratingStars;
    }


/*  OR operator: || - if left side is false then right side will be executed */
/* AND operator: && - if left side is true  then right side will be executed */
/* ternary operator: '?', ':' - shortcut to if-else 
    condition ? "execute for truth" : "execute for false"
*/