let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("blogs").doc(blogId);

docRef.get().then((doc) => {
    if (doc.exists) {
        setupBlog(doc.data());
    } else {
        location.replace("/");
    }
})

const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');

    banner.style.backgroundImage = `url(${data.bannerImage})`;

    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;
    publish.innerHTML += ` -- ${data.author}`;

    try {
        if (data.author == auth.currentUser.email.split('@')[0]) {
            let editBtn = document.getElementById('edit__blog--btn');
            editBtn.style.display = 'inline';
            editBtn.href = `${blogId}/editor`;
        }
    } catch {
        // nothing
    }

    const article = document.querySelector('.article');
    addArticle(article, data.article);
}

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    console.log(data);
    data.forEach(item => {
        // check for heading
        if (item[0] == '#') {
            let hCount = 0;
            let i = 0;
            while (item[i] == '#') {
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        }
        //checking for image format
        else if (item[0] == "h" && item[8] == "f" && item[44] == "b" && item[49] == "w"
            && item[57] == "c" && item[61] == "2" && item[63] == "a" && item[77] == "i" && item[78] == "m" && item[79] == "a" && item[80] == "g"
            && item[81] == "e" && item[82] == "s") {
            // console.log("done");

            let imageName = [];
            let j = 0;
            for (let i = 86; i <= item.length; i++) {
                if (item[i] != '?') {
                    imageName[j] = item[i];
                    j++;
                }
                else
                    break;
            }

            let alt = imageName.join("");
            // console.log(item);
            // console.log(alt);
            ele.innerHTML += `
            <img src="${item}" alt="${alt}" class="article__image">
            `;
        }

        else {
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
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
