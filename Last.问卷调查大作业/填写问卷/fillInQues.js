window.onload = function () {

    let title = localStorage.getItem("title");
    //改变标题
    let titleContent = document.getElementById("titleContent");
    titleContent.textContent = title;

    //内容
    let contentHTML = localStorage.getItem(title);
    let quesList = document.getElementById("quesList");
    quesList.insertAdjacentHTML('beforeend', contentHTML);

}