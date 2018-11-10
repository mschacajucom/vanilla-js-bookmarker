//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Saving bookmark
function saveBookmark(e){

    var bookmarkName = document.getElementById('websiteName').value;
    var bookmarkUrl = document.getElementById('websiteUrl').value;

   if(!validateForm(bookmarkName, bookmarkUrl)){
    return false;
   }
        
    var bookmark = {
        name: bookmarkName,
        url: bookmarkUrl
    }
    /*
        // Local Storage Test
        localStorage.setItem('test','Hello World');
        console.log(localStorage.getItem('test'));
        localStorage.removeItem('test');
        console.log(localStorage.getItem('test'));
    */

    //checks is may laman yung local storage
    if(localStorage.getItem('bookmarks') === null){
       
        //Init array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
        //Set to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    } else{ /*if meron then parse to json*/

        //Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add Bookmark to array
        bookmarks.push(bookmark);
        //Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    document.getElementById('myForm').reset();
    fetchBookmark();

    //para may mapakita sa console.log
    e.preventDefault();
    
}

function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i = 0; i < bookmarks.length; i++){
       if(bookmarks[i].url == url){
           //Remove from array
        bookmarks.splice(i, 1);
       }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));   

    fetchBookmark();

}

function fetchBookmark(){
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarkResults = document.getElementById('bookmarkResult');

    bookmarkResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="well"><h2>' + name + '<a class="btn btn-default" href="' + url + '" role="button" >Visit</a><a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a></h2></div>';
    }
}

function validateForm(bookmarkName, bookmarkUrl){
    if(!bookmarkName || !bookmarkUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!bookmarkUrl.match(regex)) {
        alert("No match");
        return false;
    }

    return true;
}