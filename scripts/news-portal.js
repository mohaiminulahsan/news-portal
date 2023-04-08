const fetchCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response=> response.json())
    .then(data=> showCategories(data.data.news_category))
};
// fetchCategories();

const showCategories = data =>{
    // console.log(data);
    
    /* capture "categories-container" to append all the category links */
    const categoriesContainer =  document.getElementById('categories-container');
    data.forEach(category =>{
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
const fetchCategoryNews = (category_id, category_name) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    // console.log(url);
    fetch(url).then(response => response.json()).then(data=>showAllNews(data?.data, category_name));
};

const showAllNews = (data, category_name) =>{
    console.log(data, category_name);
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;
};