//1. 字面量创建对象
var person1 = {
    studentNo: "001",
    name: "马儿扎哈",
    major: "法师"
};
person1.printInfo = function () {
    alert("字面量创建对象:" + "name:" + this.name + " studentNo:" + this.studentNo + "major:" + this.major);
}
//调用方法
person1.printInfo(); // one


//2.构造函数
function Person2(name, studentNo, major) {
    this.name = name;
    this.studentNo = studentNo;
    this.major = major
}
//原型添加方法
Person2.prototype.printInfo = function (method) {
    alert(method + "name:" + this.name + " studentNo:" + this.studentNo + "major:" + this.major);
}

let person = new Person2("阿克尚", '007', '刺客');
person.printInfo("构造函数创建对象");


// Object.create()创建
let person3 = Object.create(Person2.prototype, {
    name: {
        value: '破败之王',
        writable: true,
    }
});

person3.studentNo = "022";
person3.major = "永失吾爱";
person3.printInfo("Object.create()创建对象");