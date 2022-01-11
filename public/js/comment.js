const commentSection = document.querySelector('.comments-section');

document.getElementById('btnSubmitComment').addEventListener('click', function () {
    // Replace line breaks in comment with br tags.
    var newcomment = document.getElementById('txComment').value.replace(/\n/g, "<br>");
    // Define a new, keyed, post.
    var newPostRef = commentsRef.push();
    // Fill the new keyed post with data
    newPostRef.set({
        name: document.getElementById('tbName').value.trim(),
        comment: newcomment.trim(),
        frompage: location.pathname,
        when: firebase.database.ServerValue.TIMESTAMP
    });
});

function showpastcomments() {
    var showat = document.getElementById('pastcomments');
    // Get comments whose frompage equals this page's pathname
    var commentsRef = firebase.database().ref('comments/').orderByChild('frompage').equalTo(location.pathname);
    commentsRef.once('value', function (snapshot) {
        snapshot.forEach(function (itemSnapshot) {
            // Get the object for one snapshot
            var itemData = itemSnapshot.val();
            var comment = itemData.comment;
            var name = itemData.name;
            var when = new Date(itemData.when).toLocaleDateString("en-us");
            showat.innerHTML += "<li>" + comment + "<span> -- " + name + " (" + when + ")</span></li>";
        })
    })
}
// Called when page first opens and also after Submit button click.
showpastcomments();