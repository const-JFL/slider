# slider
> PC端轮播图插件 兼容IE7+

## 使用方法  

0. 引入该插件前，首先引入jQuery文件  
1. 该插件共有两个文件 slider.css, slider.js  
2. 需要新建一个挂载点，设置好宽和高(必须)
3. 具体功能是否使用均可以自由设置（分页器、文字显示、左右方向按钮） 
4. 初始化该插件
```
    <link type="text/css" href="slider">
    <script src="slider.js"></script>
    <script>
        $('#sliderWrap').slider();
    </script>
```  

```
<div id="sliderWrap">   //设置挂载点
    <!--轮播图容器-->     //以下代码复制进去，如果不想要某些功能，可以不用复制相应的代码
    <div id="slide">
        <!--轮播图片-->
        <div id="imgList">
            <ul>
                <li>
                    <a href="http://www.baidu.com" target="_blank">
                        <img src="img/1.jpg" />
                    </a>
                </li>
            </ul>
        </div>
        <!-- 文字内容 -->
        <div id="slide_text_list">
            <ul>
                <li class="textActive">
                    <a href="http://www.baidu.com" target="_blank">
                            控制左右方向按钮1
                    </a>
                </li>
            </ul>
        </div>
        <!--分页器-->
        <div id="point"></div>
        <!--控制左右方向按钮-->
        <div id="direction">
            <ul>
                <li class="toLeft"><</li>
                <li class="toRight">></li>
            </ul>
        </div>
    </div>
</div>

```

## 产品特点  

0. 文件体积非常小，总体不到8kb
1. 做到兼容IE7+，市面上主流浏览器均能稳定运行  
2. 简单易用，成熟稳定


## 产品信息

|key|value|
|:---|:---|
|姓名|蒋福来|
|版本|1.0|
|开发时间|2018-8-22|  

更多功能开发中以及代码持续优化中...