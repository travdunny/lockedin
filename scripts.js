function updateFields() {
    // Read the username and byline data points, store as variable as used tweice
    var input_username = document.getElementById("username_form").value;
    var input_byline = document.getElementById("byline_form").value;

    // If the user has not put in a required personal value, put in boilerplate text

    if (!input_username) {
        input_username = "Firstname Lastname";
    }

    if (!input_byline) {
        input_byline = "Byline";
    }

    var locality_input = document.getElementById("locality_form").value;
    
    // As before
    if (!locality_input) {
        locality_input = "Location";
    }
    
    document.getElementById('locality').innerHTML = locality_input;
    
    // Get post text
    var postText = document.getElementById('post_text');
    postText.innerHTML = document.getElementById("post_text_form").value;
    
    // Call change name and change by line functions
    changeName(input_username);
    changeByLine(input_byline);

    // Load the image
    var postImage = document.getElementById("post_image");

    // Read user uploaded image
    var picUpload = document.getElementById("postpic_form").files;

    // If post image is disabled, hide it, otherwise show it
    if (!picUpload || picUpload.length === 0) {

        postImage.style.maxHeight = "0";
        postText.style.marginBottom = "-20px";
    } else {
        postImage.style.maxHeight = "";
        postText.style.marginBottom = "20px";
        postPicture(picUpload);
    }

    // Read the user uploaded files for the images
    var pfpUpload = document.getElementById("pfp_form").files;
    var headerUpload = document.getElementById("headpic_form").files;

    updatePFP(pfpUpload);
    updateHeader(headerUpload);

    // Set up likes
    var likesCount = document.getElementById("likes_count_form").value;
    var likesIcon = document.getElementById("likes_icon");
    var likesCounter = document.getElementById('like_counter');
    
    if (likesCount == 0) {
        likesCounter.innerHTML = "";
        likesIcon.style.height = 0;
    } else {
        likesIcon.style.height = "";
        likesCounter.innerHTML = likesCount;
    }

    // Check for verified tag
    var isVerified = document.getElementById("verified_form").checked;
    var verifiedBadge = document.getElementById("verified-badge");
    var verifiedBadgeAlt = document.getElementById("verified-badge-alt");

    if (isVerified == false) {
        verifiedBadge.style.display = "none";
        verifiedBadgeAlt.style.display = "none";
    } else {
        verifiedBadge.style.display = "";
        verifiedBadgeAlt.style.display = "";
    }

    // Set post age
    var postAge = document.getElementById("age_form").value;
    var timeDisplay = document.getElementById('time');

    if (postAge == 0) {
        timeDisplay.innerHTML = "Now";
    } else {
        timeDisplay.innerHTML = postAge + "h";
    }

    // Check if user wants to add company name and picture

    var companyNameForm = document.getElementById('company_name_form').value;
    var companyPicForm = document.getElementById('companypic_form').files;
    var companyTag = document.getElementById('company_tag');

    var companyName = document.getElementById('company_name');
    var companyPic = document.getElementById('company_pic');

    if (!companyNameForm.trim()) {
        companyTag.style.display = "none";
    } else {
        companyTag.style.display = "";
        makeCompanyTag(companyNameForm,companyPicForm,companyPic,companyName);
    }

    // Check if user wants to add university name and picture

    var uniNameForm = document.getElementById('uni_name_form').value;
    var uniPicForm = document.getElementById('unipic_form').files;
    var uniTag = document.getElementById('uni_tag');

    var uniPic = document.getElementById('uni_pic');
    var uniName = document.getElementById('uni_name');

    if (!uniNameForm.trim()) {
        uniTag.style.display = "none";
    } else {
        uniTag.style.display = "";
        makeCompanyTag(uniNameForm,uniPicForm,uniPic,uniName);
    }

    return false;
}

function makeCompanyTag(name,pic,pic_tag,name_tag) {
    
    name_tag.innerHTML = name;

    if (pic[0]) {
        var blobURL = URL.createObjectURL(pic[0]);
        pic_tag.style.backgroundImage = `url(${blobURL})`;
    } else {
        pic_tag.style.backgroundImage = 'url(company_ph.png)';
    }

}

function randomLikes() {
    var likesBox = document.getElementById("likes_count_form");
    likesBox.value = Math.floor(Math.random() * (10000 - 0 + 1) + 0);
}

function clearUploadPic() {
    document.getElementById("postpic_form").value = "";
}

function changeName(input) {
    // Read the user name displays and change them
    var usernames = document.getElementsByClassName('user_name');
    usernames[0].innerHTML = input;
    usernames[1].innerHTML = input;
};

function changeByLine(input) {
    // Read the byline displays and change them
    var byLines = document.getElementsByClassName('byline');
    byLines[0].innerHTML = input;
    byLines[1].innerHTML = input;
}


function updatePFP(input) {
    if (!input || input.length === 0) return;
    
    var pfpMain = document.getElementById('pfp');
    var pfpAlt = document.getElementById('pfp_alt');
    var blobURL = URL.createObjectURL(input[0]);

    pfpMain.style.backgroundImage = `url(${blobURL})`;
    pfpAlt.style.backgroundImage = `url(${blobURL})`;
}

function updateHeader(input) {
    if (!input || input.length === 0) return;

    var headerPic = document.getElementById('header_picture');
    var blobURL = URL.createObjectURL(input[0]);

    headerPic.style.backgroundImage = `url(${blobURL})`;
}

function postPicture(input) {
    if (!input || input.length === 0) return;

    var postPic = document.getElementById('post_image');
    var blobURL = URL.createObjectURL(input[0]);

    postPic.src = blobURL;
}

function makeImage(div) {
    html2canvas(div, {
        onrendered: function (canvas) {
            var myImage = canvas.toDataURL("image/png");
            //create your own dialog with warning before saving file
            //beforeDownloadReadMessage();
            //Then download file
            downloadURI("data:" + myImage, "yourImage.png");
        }
    });
}

function downloadOutput() {
    var element = document.getElementById('output_container');

    html2canvas(element, {
        allowTaint: true
    }).then(function(canvas) {
        
        canvas.toBlob(function(blob) {
            window.saveAs(blob, "LockedIn_output.png");
        });
    });
    return false;
}