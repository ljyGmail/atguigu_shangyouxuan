// 作用: 需要将所有的DOM元素对象以及相关的资源全部都加载完毕之后，再来实现的事件函数
window.onload = function () {
  // 路径导航的数据渲染
  navPathDataBind();

  function navPathDataBind() {
    /**
     * 思路:
     * 1. 先获取路径导航的页面元素(navPath)
     * 2. 再来获取所需要的数据(data.js -> goodData.path)
     * 3. 由于数据是需要动态产生的，那么相应的DOM元素也应该是动态产生的，含义: 需要创建DOM元素，根据数据的数量来进行创建DOM元素
     * 4. 在遍历数据创建DOM元素的最后一条，只创建a标签，而不创建i标签
     */

    // 1. 获取页面导航的元素
    var navPath = document.querySelector(
      "#wrapper #content .contentMain #navPath"
    );

    // 2. 获取数据
    var path = goodData.path;

    // 3. 遍历数据
    for (var i = 0; i < path.length; i++) {
      if (i == path.length - 1) {
        // 只需要创建a且没有href属性
        var aNode = document.createElement("a");
        aNode.innerText = path[i].title;
        navPath.appendChild(aNode);
      } else {
        // 4. 创建a标签
        var aNode = document.createElement("a");
        aNode.href = path[i].url;
        aNode.innerText = path[i].title;

        // 5. 创建i标签
        var iNode = document.createElement("i");
        iNode.innerText = "/";

        // 6. 让navPath元素来追加a和i
        navPath.appendChild(aNode);
        navPath.appendChild(iNode);
      }
    }
  }

  // 放大镜的移入、移出效果
  bigClassBind();
  function bigClassBind() {
    /**
     * 思路:
     * 1. 获取小图框元素对象，并且设置移入事件(onmouseenter)
     * 2. 动态创建蒙板元素以及大图框和大图片元素
     * 3. 移出时(onmouseleave)需要移除蒙板元素和大图框
     */
    // 1. 获取小图框元素
    var smallPic = document.querySelector(
      "#wrapper #content .contentMain #center #left #leftTop #smallPic"
    );

    // 获取leftTop元素
    var leftTop = document.querySelector(
      "#wrapper #content .contentMain #center #left #leftTop"
    );

    // 2. 设置移入事件
    smallPic.onmouseenter = function () {
      // 3. 创建蒙板元素
      var maskDiv = document.createElement("div");
      maskDiv.className = "mask";

      // 4. 创建大图框元素
      var bigPic = document.createElement("div");
      bigPic.id = "bigPic";

      // 5. 创建大图片元素
      var bigImg = document.createElement("img");
      bigImg.src = "images/s1.png";

      // 6. 大图框来追加大图片
      bigPic.appendChild(bigImg);

      // 7. 让小图框追加蒙板元素
      smallPic.appendChild(maskDiv);

      // 8. 让leftTop元素追加大图框
      leftTop.appendChild(bigPic);

      // 设置鼠标移动事件
      smallPic.onmousemove = function (event) {
        // event.clientX: 鼠标点距离浏览器左侧X轴的值
        // getBoundingClientRect().left: 小图框元素距离浏览器左侧可视left值
        // offsetWidth: 为元素的占位宽度
        var left =
          event.clientX -
          smallPic.getBoundingClientRect().left -
          maskDiv.offsetWidth / 2;

        var top =
          event.clientY -
          smallPic.getBoundingClientRect().top -
          maskDiv.offsetHeight / 2;

        // 判断
        if (left < 0) {
          left = 0;
        } else if (left > smallPic.clientWidth - maskDiv.offsetWidth) {
          left = smallPic.clientWidth - maskDiv.offsetWidth;
        }

        if (top < 0) {
          top = 0;
        } else if (top > smallPic.clientHeight - maskDiv.offsetHeight) {
          top = smallPic.clientHeight - maskDiv.offsetHeight;
        }

        // 设置left和top属性
        maskDiv.style.left = left + "px";
        maskDiv.style.top = top + "px";

        // 移动的比例关系 = 蒙板元素移动的距离 / 大图片元素移动的距离
        // 蒙板元素移动的距离 = 小图框宽度 - 蒙板元素的宽度
        // 大图片元素移动的距离 = 大图片宽度 - 大图框元素的宽度
        var scale =
          (smallPic.clientWidth - maskDiv.offsetWidth) /
          (bigImg.offsetWidth - bigPic.clientWidth);
        console.log(scale); // 0.495

        bigImg.style.left = -left / scale + "px";
        bigImg.style.top = -top / scale + "px";
      };

      // 设置移出事件
      smallPic.onmouseleave = function () {
        // 让小图框移除蒙板元素
        smallPic.removeChild(maskDiv);
        // 让leftTop元素移除大图框
        leftTop.removeChild(bigPic);
      };
    };
  }

  // 动态渲染放大镜缩略图的数据
  thumbnailData();
  function thumbnailData() {
    /**
     * 思路:
     * 1. 先获取piclist元素下的ul
     * 2. 再获取data.js文件下的goodData->imageSrc
     * 3. 遍历数组，根据数组的长度来创建li元素
     * 4. 让ul遍历追加li元素
     */
    // 1. 获取piclist的ul
    var ul = document.querySelector(
      "#wrapper #content .contentMain #center #left #leftBottom #piclist ul"
    );

    // 2. 获取imageSrc数据
    var imagessrc = goodData.imagessrc;

    // 3. 遍历数组
    for (var i = 0; i < imagessrc.length; i++) {
      // 4. 创建li元素
      var newLi = document.createElement("li");

      // 5. 创建img元素
      var newImg = document.createElement("img");
      newImg.src = imagessrc[i].s;

      // 6. 让li追加img元素
      newLi.appendChild(newImg);

      // 7. 让ul追加li元素
      ul.appendChild(newLi);
    }
  }
};
