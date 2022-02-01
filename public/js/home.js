const blogSection = document.querySelector('.blogs__section');

db.collection("blogs").get().then((blogs) => {
    blogs.forEach(blog => {
        if (blog.id != decodeURI(location.pathname.split("/").pop())) {
            createBlog(blog);
        }
    })
})

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog__card">
        <img src="${data.bannerImage}" class="blog__image" alt="">
        <h2 class="blog__title">${data.title.substring(0, 60) + '...'}</h2>
        <p class="blog__overview">${data.article.substring(0, 120) + '...'}</p>
        <a href="/${blog.id}" class="btn dark" style="box-shadow: 10px 10px 10px;">read</a>
    </div>
    `;
}

// navbar hide and show on scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-60px";
    }
    prevScrollpos = currentScrollPos;
}

// navigate to search-bar
document.getElementById("navigate").onclick = function () {
    window.location.hash = "#navigateHere";
};

// search
function search_blog() {
    let input = document.getElementById('searchBar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('blog__card');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "";
        }
    }
}
