var div_1 = document.createElement('div');//在js内存里生成一个div
div_1.className = "demo";//将样式名命名为demo
document.body.appendChild(div_1)//在body里加上这个div

/*document.body.onclick = function (e) {
    div_1.style.top = e.clientY + 'px';
    //让div跟着鼠标点到那到那
    div_1.style.left = e.clientX + 'px';
}*/
//声明两个变量实现数据访问
var lastX
var lastY
var dragging = false;
div_1.onmousedown = function (e) {
    lastX = e.clientX;
    lastY = e.clientY;
    dragging = true;
}
/*
//存在bug，如果鼠标移动到外面松开，div监听不到就达不到效果
div_1.onmouseup = function () {
    dragging = false;
}*/

//用document就可以很好避免这个问题，但是还有一个bug，div拉出去了怎么拉回来，怎么阻止这个拉出去的问题
document.onmouseup = function () {
    dragging = false;
}

//如果document.body变成div_1，存在bug鼠标移动太快会跟不上，所有只能在document上进行监听
document.body.onmousemove = function (e) {
    if (dragging === true) {
        var deltaX = e.clientX - lastX;
        var deltaY = e.clientY - lastY;
        //js取值只能取js内存变动的值，不能取css里面的值，所有要对值进行取整，其他值就在后面加个或者等于0
        var top = parseInt(div_1.style.top) || 0;
        var left = parseInt(div_1.style.left) || 0;
        //解决拉出界面问题：加一个判断,但是完成了左上边还有右下没有解决
        var resultY = top + deltaY;
        var resultX = left + deltaX;
        if (resultY < 0) {
            resultY = 0;
        }
        if (resultX < 0) {
            resultX = 0;
        }
        div_1.style.top = resultY + 'px';//让div跟着鼠标拖动
        div_1.style.left = resultX + 'px';
        //当初没有想到更新，每个点的位置都应该对应鼠标移动的位置，而不是第一次的那个点
        lastX = e.clientX;
        lastY = e.clientY;
    }

}
