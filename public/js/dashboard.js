// https://firebase.google.com/docs/auth/web/firebaseui

const ui = new firebaseui.auth.AuthUI(auth);

const login = document.querySelector('.login');

const blogSection = document.querySelector('.blogs__section');

auth.onAuthStateChanged((user) => {
    if (user) {
        login.style.display = "none";
        getUserWrittenBlogs();
    } else {
        setupLoginButton();
    }
})

const setupLoginButton = () => {
    ui.start("#loginUI", {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectURL) {
                login.style.display = "none";
                return false;
            }
        },
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    })
}

// fetch user written blogs
const getUserWrittenBlogs = () => {
    db.collection("blogs").where("author", "==", auth.currentUser.email.split('@')[0])
        .get()
        .then((blogs) => {
            blogs.forEach((blog) => {
                createBlog(blog);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog__card">
        <img src="${data.bannerImage}" class="blog__image" alt="">
        <h2 class="blog__title">${data.title.substring(0, 60) + '...'}</h2>
        <p class="blog__overview">${data.article.substring(0, 120) + '...'}</p>
        <div class="buttons">
            <a href="/${blog.id}" class="btn dark">read</a>
            <a href="/${blog.id}/editor" class="btn grey">edit</a>
            <a href="#" onclick="deleteBlog('${blog.id}')" class="btn danger">delete</a>
        </div>
    </div>
    `;
}

const deleteBlog = (id) => {
    db.collection("blogs").doc(id).delete().then(() => {
        location.reload();
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

// header hide and show on scroll
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

// Return to Top
$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('#topBtn').fadeIn();
        } else {
            $('#topBtn').fadeOut();
        }
    });

    $("#topBtn").click(function () {
        $('html ,body').animate({ scrollTop: 0 }, 800);
    });
});