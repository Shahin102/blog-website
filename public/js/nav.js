const ul = document.querySelector('.links__container');

auth.onAuthStateChanged((user) => {
    if (user) {
        // user is login
        ul.innerHTML += `
        <li class="link__item" id="dashboard"><a class="link" href="/admin">Dashboard</a></li>
        <li class="link__item"><a class="link" href="#" onclick="logoutUser()">Logout</a></li>
        `
    } else {
        // no one is logged in
        ul.innerHTML += `
        <li class="link__item" id="login"><a class="link" href="/admin">login</a></li>
        `
    }
});