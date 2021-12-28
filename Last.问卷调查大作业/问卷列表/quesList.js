/**
 * 20211220
 * 
 * 1.上下移动
 *  1.1 鼠标显示时添加hover  done
 *  1.2 remove the element when the mouse was left
 *  2. 点击
 *      1. 点击上下移动触发event
 *          1. 得到quesList元素.children
 *          2. 排序
 *                  click元素的父节点，与children元素比对
 *          3. 重新赋值
 *      2. 点击复用复制到最后
 *      3. 点击删除先移动节点，再从storage中删除
 * 
 * 2. 本地storage
 *  2.1 将问卷数据存入LocalStorage
 *      question: 如何存入一整个对象
        方案:将outerHTML存入
    2.2 如何将储存数据渲染到HTML
        
 *  1. 根据storage显示列表
 *  
 */



let newQues = document.getElementById("newQues");
// 新建问卷按钮
let newBotton = document.getElementById("newBotton");
// 列表中新建问卷按钮
let newBotton2 = document.getElementById("newBotton2");
let newQuesStyle = newQues.style;
let addtext = document.getElementById('addtext');
// 问卷问题父元素
let quesList = document.getElementById('quesList');
let editQues = document.getElementById("editQues");
let questionList = document.getElementById("questionList");

let radioAdd = document.getElementById('radioAdd');
let checkboxAdd = document.getElementById("checkboxAdd");
let textAdd = document.getElementById('textAdd');

let releaseQues = document.getElementById("releaseQues");
let closeBox = document.getElementById("closeBox");
let promptBox = document.getElementById('promptBox');

let dateQues = document.getElementById("dateQues");
/**
 * 问卷列表中
 * 1. 上移 
 * 2. 下移按钮
 * 3. 复用按钮
 * 4. 删除按钮
 * */
let moveupQues;
let movedownQues;
let reuseQues;
let deleteQues;


// let testBotton = document.getElementById("testBotton");

function viewData() {
    document.location.href = 'http://127.0.0.1:5500/1.Web%E4%BD%9C%E4%B8%9A/Last.%E9%97%AE%E5%8D%B7%E8%B0%83%E6%9F%A5%E5%A4%A7%E4%BD%9C%E4%B8%9A/%E6%9F%A5%E7%9C%8B%E6%95%B0%E6%8D%AE%E9%A1%B5/viewData.html';
}
function removeItemQues(that) {
    let target = that.parentElement.parentElement;
    target.remove();
    let content = target.children;
    let title = content[1].innerHTML;
    localStorage.removeItem(title);
}


//编辑按钮
function editItemQues(that) {
    hiddenElement(questionList);
    displayElement(editQues);
    // hiddenElement(newQues);

    //获取问卷内容
    let target = that.parentElement.parentElement;
    let content = target.children;
    let title = content[1].innerHTML;
    let contentHTML = localStorage.getItem(title);

    //改变标题
    let titleContent = document.getElementById("titleContent");
    titleContent.textContent = title;

    let quesList = document.getElementById("quesList");
    quesList.insertAdjacentHTML('beforeend', contentHTML);

}

// 查看问卷按钮

function fillInQues(that) {
    //获取问卷内容
    let target = that.parentElement.parentElement;
    let content = target.children;
    let title = content[1].innerHTML;
    localStorage.setItem("title",title);
    window.open('http://127.0.0.1:5500/1.Web%E4%BD%9C%E4%B8%9A/Last.%E9%97%AE%E5%8D%B7%E8%B0%83%E6%9F%A5%E5%A4%A7%E4%BD%9C%E4%B8%9A/%E5%A1%AB%E5%86%99%E9%97%AE%E5%8D%B7/fillInQues.html');
}

// testBotton.addEventListener('click', testFunction, false);

function testFunction() {
    judgeData();
}

/**
 * 问卷下方 三个添加问题
 */
let radioQues = document.getElementById("radioQues");
let textQues = document.getElementById("textQues");
let checkboxQues = document.getElementById("checkboxQues");

// 发布问卷的确定按钮
let releaseConfirm = document.getElementById("releaseConfirm");

closeBox.addEventListener('click', function () {
    hiddenElement(promptBox);
}, true);

checkboxAdd.addEventListener('click', function () {
    addItem(checkboxQues);
}, true)
radioAdd.addEventListener('click', function () {
    addItem(radioQues);
}, true);

textAdd.addEventListener('click', function () {
    addItem(textQues);
}, true);

releaseQues.addEventListener('click', function () {
    let operation = releaseQues.dataset.operation;
    promptBoxInit(operation);
}, true);

newBotton.addEventListener('click', function () {
    hiddenElement(newQues);
    displayElement(editQues);
}, true);

newBotton2.addEventListener('click', function () {
    // let content = this;
    hiddenElement(questionList);
    // hiddenElement(newQues);
    displayElement(editQues);
}, true);

addtext.addEventListener('click', function () {
    let chooseQuesStyle = document.getElementById('chooseQues').style;
    let display = chooseQuesStyle.getPropertyValue("display");
    if (display === '') {
        chooseQuesStyle.setProperty('display', "none");
    } else {
        chooseQuesStyle.removeProperty('display');
    }
}, true)

releaseConfirm.addEventListener('click', releaseQuesConfirm, false);

// 此函数为发布/保存问卷函数

function releaseQuesConfirm() {
    //获取问卷标题
    let titleContent = document.getElementById("titleContent").innerText;
    //获取问卷内容
    let HTMLContent = quesList.outerHTML;
    localStorage.setItem(titleContent, HTMLContent);

    // 显示问卷列表
    displayElement(questionList);
    hiddenElement(editQues);
    promptBox.style.display = 'none';
    window.alert("保存问卷成功");
    location.reload();
}

function myQues() {
    displayElement(questionList);
    hiddenElement(editQues);
}

function moveupEvent() {
    /**
     * 此函数为上移函数
     */
    let target = moveupQues.parentElement.parentElement;

    let previousElement = target.previousElementSibling;
    if (previousElement) {
        target.remove();
        previousElement.before(target);
    } else {
        window.alert("已到达顶端!");
    }
}

function movedownEvent() {
    /**
   * 此函数为下移函数
   */
    let target = moveupQues.parentElement.parentElement;

    let nextElementSibling = target.nextElementSibling;
    if (nextElementSibling) {
        target.remove();
        nextElementSibling.after(target);
    } else {
        window.alert("已到达末端!");
    }
}

/**
 * 待修复, 不是复制在下方
 */
function reuseEvent() {
    /**
     * 此函数为复用函数
     */
    let target = moveupQues.parentElement.parentElement;
    let targetId = target.id;
    if (targetId === "radioQues") {
        addItem(radioQues);
    } else if (targetId === "checkboxQues") {
        addItem(checkboxQues);
    } else {
        addItem(textQues);
    }
}
function deleteEvent() {
    let target = moveupQues.parentElement.parentElement;
    target.remove();
}

window.addEventListener('resize', function () { changeRize(newQuesStyle) }, true);

window.onload = function () {
    //改变新建问卷大小
    changeRize(newQuesStyle);
    // createQues();

    //隐藏新建问卷
    // hiddenElement(newQues);
    // promptBoxInit();

    // 查看缓存有无数据
    judgeData();
}


function changeRize(Style) {
    let styleWidth = window.innerWidth * 0.8;
    let styleHeight = window.innerHeight * 0.33;
    Style.setProperty('width', styleWidth + 'px');
    Style.setProperty('height', styleHeight + 'px');
}


// function createQues() {
//     newQuesStyle.setProperty('display', 'none');
// }

//hidden Element
function hiddenElement(element) {
    element.style.setProperty('display', 'none');
}

// 根据传来的元素显示
function displayElement(element) {
    element.style.removeProperty('display');
}

let index = 0;
// 将传来的元素添加到quesList元素下
function addItem(element) {
    let quesList = document.getElementById("quesList");
    let str = element.outerHTML;
    quesList.insertAdjacentHTML('beforeend', str);

    //为刚刚添加的元素添加鼠标监听事件
    let target = quesList.lastElementChild;

    target.addEventListener('mouseenter', function () {
        addOperation(target);
    }, false);

    //离开便移除操作元素
    target.addEventListener('mouseleave', function () {
        removeOperation(target);
    }, false);
}

// 将操作元素添加到问题下方
function addOperation(target) {
    let operation = document.getElementById("radio-operation").outerHTML;
    target.insertAdjacentHTML('beforeend', operation);
    addOperationEvent();
}

// 添加按钮点击事件，因为每次都是新添加元素到问卷列表中，故每次都需重新添加事件
function addOperationEvent() {
    moveupQues = document.getElementById("moveupQues");
    movedownQues = document.getElementById("movedownQues");
    reuseQues = document.getElementById("reuseQues");
    deleteQues = document.getElementById("deleteQues");

    moveupQues.addEventListener('click', moveupEvent, false);
    movedownQues.addEventListener('click', movedownEvent, false);
    reuseQues.addEventListener("click", reuseEvent, false);
    deleteQues.addEventListener("click", deleteEvent, false);
}

// 将操作元素从问题下方删除
function removeOperation(target) {
    let element = target.lastElementChild;
    element.remove();
}

function promptBoxInit(operation) {
    //获取页面宽度
    let styleWidth = window.innerWidth;
    let styleHeight = window.innerHeight;

    //获取输入框style
    let Style = promptBox.style;

    if (operation === "release") {
        let hint_content = document.getElementById('hint-content');
        let nowdate = dateQues.value;
        hint_content.setAttribute('style', 'white-space: pre-wrap;');
        hint_content.textContent = "确认要发布此问卷？" + "\n\n" + "（此问卷截至日期至" + nowdate + ")";
    }

    //设置长宽高
    Style.setProperty('width', styleWidth + 'px');
    Style.setProperty('height', styleHeight + 'px');
    Style.removeProperty("display");
}

function judgeData() {
    let quesListData = checkStorage();
    if (quesListData.length == 0) {
        displayElement(newQues);
        // displayElement(editQues);

    } else {
        quesListData.forEach((value) => {
            //此处为所要挂上的内容
            let singleContent = document.getElementById("singleContent");
            let titleElement = singleContent.firstElementChild.nextElementSibling;
            titleElement.textContent = value;
            content_title.insertAdjacentHTML('afterend', singleContent.outerHTML);
            content_title.nextElementSibling.setAttribute('id', 'changContent');
            content_title.nextElementSibling.setAttribute('title', value);
        })
        displayElement(questionList);
    }
}

function checkStorage() {
    let quesListData = [];
    for (var i = 0; i < window.localStorage.length; i++) {
        quesListData[i] = localStorage.key(i);
    }
    return quesListData;
}