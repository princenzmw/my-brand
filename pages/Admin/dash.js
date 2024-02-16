// Script to open and close sidebar
function pblogs1_open() {
    document.getElementById("dashboard_navbar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function pblogs1_close() {
    document.getElementById("dashboard_navbar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

// Modal Image Gallery
function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
}
