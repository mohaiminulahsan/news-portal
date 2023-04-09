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
    fetch(url).then(response => response.json()).then(data => showAllNews(data?.data, category_name));
};

const showAllNews = (data, category_name) => {
    // console.log(data, category_name);
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;

    const newsContainer = document.getElementById('all-news');
    newsContainer.innerHTML = '';
    data.forEach(singleNews => {
        const {image_url, title, details, author, total_view} = singleNews;
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
                            <p class="m-0 p-0">${author.name}</p>
                            <p class="m-0 p-0">${author.published_date}</p>
                        </div>
                    </div>
                    <div class="d-flex gap-2 align-items-center">
                        <i class="fa-solid fa-eye"></i>
                        <p class="m-0 p-0">${total_view}</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div>
                        <i class="fs-5 text-primary fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>`;
        newsContainer.appendChild(card);
    })
};