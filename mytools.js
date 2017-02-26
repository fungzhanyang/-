/**
 *  获取内部文本的兼容方法
 * @param element
 * @param text
 * chrome两个都支持
 * FF 新版的两个都支持 旧版的只支持textContent
 * IE 新版的两个都支持 旧版的只支持innerText
 */
function getInnerText(element) {
    if (typeof element.innerText === 'string') {
        return element.innerText;
    }
    else {
        return element.textContent;
    }
}
/**
 *  设置内部文本的兼容方法
 * @param element
 * @param text
 */
function setInnerText(element,text) {
    if (typeof element.innerText === 'string') {
        element.innerText=text;
    }
    else {
        element.textContent=text;
    }
}
/**
 * 获取下一个兄弟元素的兼容写法
 * @param element
 * @returns {*}
 */
function getNextElementSibling(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var next = element.nextSibling;
        while (next && 1 !== next.nodeType) {
            next = next.nextSibling;
        }
        return next;
    }
}
/**
 * 获取上一个兄弟元素的兼容写法
 * @param element
 * @returns {*}
 */
function getPreviousElementSibling(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var prev = element.previousSibling;
        while (prev && 1 !== prev.nodeType) {
            prev=prev.previousSibling;
        }
        return prev;
    }
}
/**
 * 封装 获取当前元素的第一个子元素
 * @param element
 * @returns {*}
 */
function getFirstElementChild(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var el = element.firstChild;//第一个子节点
        while (el && 1 !== el.nodeType) {
            el = el.nextSibling;//往后找
        }
        return el;
    }
    //return element.children[0];
}
/**
 * 封装 获取当前元素的最后一个子元素
 * @param element
 * @returns {*}
 */
function getLastElementChild(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var el = element.lastChild;
        while (el && 1 !== el.nodeType) {
            el = el.previousSibling;//上一个兄弟节点
        }
        return el;
    }
    //return element.children[element.children.length-1];
}
//封装 通过类名获取元素对象的兼容方法
function getElementsByClassName(element, className) {
    //原来就有
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(className);
    } else {
        //首先找到element里面所有的标签 然后判断 有没有我们要的类名
        //如果有就把当前标签 放到一个集合中 最后全都找完了 把集合返回
        var filterArr = [];//这个数组用来放匹配的元素
        var elements = element.getElementsByTagName("*");//通配符 表示所有标签
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].className.indexOf(className) !== -1) {
                //包含了我们要的类名 这个元素是我们要的
                filterArr.push(elements[i]);
            }
        }
        return filterArr;
    }
}


//scroll兼容  封装一个函数 将来调用的时候调用这个函数
// .top就可以获取被卷去的头部的高度
// .left就可以获取被卷去的左侧的宽度

function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}
function client(){
    return {
	//即能够兼容所有的浏览器 还可以兼容怪异模式
        height: window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0,
        width: window.innerWidth||document.documentElement.clientWidth||document.body.clientHeight||0
    };
}

//获取计算后样式
function getStyle( obj, attr ) {
	if ( window.getComputedStyle ) {
		return window.getComputedStyle( obj, null )[ attr ];
	} else {
		return obj.currentStyle[ attr ];
	}
}