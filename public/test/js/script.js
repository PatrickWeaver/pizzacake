
angular.element(document).ready(function () {
	setTimeout(clearLoader, waitTime)
});

function loading() {
	var loading = document.getElementById("loading");
    loading.style.display = "block";
}

var waitTime = 1200;
function clearLoader() {
    var loading = document.getElementById("loading");
    loading.style.display = "none";

}

