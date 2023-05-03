document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn1").addEventListener("click", function () {
        alert("You have clicked the button");
        document.getElementsByTagName("body")[0].style.backgroundColor = 'orange';
    })
})