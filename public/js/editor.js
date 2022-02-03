const blogTitleField = document.querySelector('.title');
const articleFeild = document.querySelector('.article');

// banner
const bannerImage = document.querySelector('#banner__upload');
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish__btn');
const uploadInput = document.querySelector('#image__upload');

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
})

function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) {
        var imageName = file.name + getRandomString(20);
        var storageRef = firebase.storage().ref('images/' + imageName);
        var uploadTask = storageRef.put(file);
        uploadTask.on('state_changed', function (snapshot) {
            //get task progress by following code
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is " + progress + " done");
        }, function (error) {
            //handle error here
            console.log(error.message);
        }, function () {
            //handle successfull upload here..
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                //get your image download url here and upload it to databse
                if (uploadType == "image") {
                    // addImage(data, file.name);
                    addImage(downloadURL);
                } else {
                    bannerPath = `${downloadURL}`;
                    banner.style.backgroundImage = `url("${bannerPath}")`;
                }
            });
        });
    } else {
        alert("upload Image only");
    }
}

const addImage = (imagepath) => {
    let curPos = articleFeild.selectionStart;
    // let textToInsert = `\r<img src="${imagepath}">\r`;
    let textToInsert = `\r${imagepath}\r`;
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

publishBtn.addEventListener('click', () => {
    if (articleFeild.value.length && blogTitleField.value.length) {
        // generating id

        let docName;
        if (blogId[0] == 'editor') {
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            let blogTitle = blogTitleField.value.split(" ").join("-");
            let id = '';
            for (let i = 0; i < 4; i++) {
                id += letters[Math.floor(Math.random() * letters.length)];
            }
            docName = `${blogTitle}-${id}`;
        } else {
            docName = decodeURI(blogId[0]);
        }

        // setting up docName
        let date = new Date(); // for published at info

        //access firstore with db variable;
        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            article: articleFeild.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
            author: auth.currentUser.email.split('@')[0]
        })
            .then(() => {
                location.href = `/${docName}`;
            })
            .catch((err) => {
                console.error(err);
            })
    }

})

// checking for user logged in or not
auth.onAuthStateChanged((user) => {
    if (!user) {
        location.replace("/admin"); // this'll re-direct to admin route if no one is logged in.
    }
})

let blogId = location.pathname.split("/");
blogId.shift(); // remove first item from the array because first item is empty 

if (blogId[0] != 'editor') {
    // means we are in existing blog route
    let docRef = db.collection("blogs").doc(decodeURI(blogId[0]));
    docRef.get().then((doc) => {
        console.log(doc);
        if (doc.exists) {
            let data = doc.data();
            bannerPath = data.bannerImage;
            banner.style.backgroundImage = `url(${bannerPath})`;
            blogTitleField.value = data.title;
            articleFeild.value = data.article;
        } else {
            location.replace("/");
        }
    })
}