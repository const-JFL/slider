/*
 * 作者：蒋福来
 * 版本：1.0
 * 开发时间:2018/8/22
 * 此插件特点：
 * 				0.兼容IE7+
 * 				1.文件大小不到8K
 * 				2.简单易用，运行稳定
 * 
 * 使用方法: 事先需要引入jquery， 需要一个挂载点，初始化滚动插件，例如: $('#sliderWrap').slider();
 * 
 * 
 * 
*/

(function($){
	$.fn.slider = function(option){
		var slideSwitch = false;			//滚动时控制点击事件的开关，true可点击，false不可点击
		var sliderInterval = null;			//初始化定时器
		var sliderTimeout = null;			//初始化延时器
		var addSpeed = 0;					//初始化加速度
		var slideTime = 1;					//默认滚动时长为 1 秒
		var slideDirection = 'right';		//默认滚动方向为右侧,手动点击时可以为左侧，但是自动转为右侧
		var wrapper  = $(this);				//获取挂载点jquery对象
		//初始获取图片列表
		var imgList = wrapper.find('#imgList');
		var imgListUl = imgList.find('ul');
		var imgListLi = imgList.find('li');
		var imgWidth = imgListLi.width();		//获取图片宽度

		var textList = wrapper.find("#slide_text_list");

		// 初始获取分页器
		var point = wrapper.find('#point');
		//初始获取方向按钮对象
		var direction = wrapper.find('#direction');
		var directionLi = direction.find('li');
		//初始化方法
		var init = function(){				
			//初始化ul宽度
			var liLen = imgListLi.length;
			var ulWid = liLen * imgWidth;
			imgListUl.width(ulWid);
			//初始化li宽度
			imgListLi.width(imgWidth);
			//初始化分页器
			var pointList = '<ul>';
			for(var i = 0;i<liLen;i++){
				pointList += '<li></li>';
				imgListLi.eq(i).attr('index',i);
			}
			pointList += '</ul>';
			point.empty().append(pointList);
			wrapper.find('#point ul li:first').addClass('slideActive');
			//分页器点击事件
			point.find('li').on('click', function(e){
				window.event.cancelBubble = true;
				e.stopPropagation();//阻止冒泡
				var clickIndex = $(this).index();
				slidePoint(clickIndex);
			});
			// 绑定方向控制按钮
			directionLi.on('click', function (e) {
				window.event.cancelBubble = true;
				e.stopPropagation(); //阻止冒泡
				dirClick(e);
			});
			//启动滚动事件
			slide();
		}	

		//滚动事件，左右滚动合并代码
		var slide = function(sum){
			clearInterval(sliderInterval);
			clearTimeout(sliderTimeout);
			slideSwitch = false;
			// 左右滚动  默认从右往左滚动 ，left为负
			
			if (sum == 0) { //一次滚动几下，如果没有则默认为1
				var indexCount = 0;
			}else if(sum == undefined){
				var indexCount = 1;
			}else{
				var indexCount = sum;
			}
			console.log(indexCount);
			
			if(slideDirection == 'right'){
				var slideRatio = -((imgWidth * indexCount / 250) / slideTime);		//比率	
				var ratioSum = 0;
			}else{	//如果从左往右滚动，需要实现插入dom元素
				var slideRatio = ((imgWidth * indexCount / 250) / slideTime);
				for(var i = 0;i<indexCount;i++){
					imgListUl.prepend(imgListUl.find('li:last'));
				}
				imgListUl.css('left', -imgWidth * indexCount);
				var ratioSum = -(imgWidth * indexCount);
			}						
			var addSum = 0; //滚动距离
			sliderInterval = setInterval(function(){
				ratioSum += slideRatio;	
				addSum += slideRatio;
				if(slideDirection == 'right'){				//从右往左滚动
					if(ratioSum <= -(imgWidth * indexCount)){
						slideSwitch = true;
						clearInterval(sliderInterval);
						for(var i = 0;i<indexCount;i++){
							imgListUl.append(imgListUl.find('li:first'));
						}
						ratioSum = 0;
						var slideIndex = imgListUl.find('li:first').attr('index');
						textList.find('li').removeClass('textActive');
						textList.find('li').eq(slideIndex).addClass('textActive');
						point.find('li').removeClass('slideActive');
						point.find('li').eq(slideIndex).addClass('slideActive');
						sliderTimeout = setTimeout(function(){
							slide();
						},3000);
					}
				}else{										//从左往右滚动
					if(addSum >= (imgWidth * indexCount)){
						slideSwitch = true;
						clearInterval(sliderInterval);
						addSum = 0;
						var slideIndex = imgListUl.find('li:first').attr('index');
						textList.find('li').removeClass('textActive');
						textList.find('li').eq(slideIndex).addClass('textActive');
						point.find('li').removeClass('slideActive');
						point.find('li').eq(slideIndex).addClass('slideActive');
						slideDirection = 'right';
						sliderTimeout = setTimeout(function(){
							slide();
						},3000);
					}
				}
				imgListUl.css('left', ratioSum);
			},1);   //这里事件设置为1毫秒，1000毫秒==1秒，会加250下
		}
		//分页器点击事件
		var slidePoint = function(index){		
			if(slideSwitch){//只有等定时器结束时才能点击，否则会增加更多的定时器
				/*	toIndex == 点击时的索引
					fromIndex == 当前索引
				*/
				var toIndex = index;
				var fromIndex = imgListUl.find('li:first').attr('index');
				var indexDisparity = Math.abs(fromIndex - toIndex);
				if(fromIndex < toIndex){		//正常方向滚动，从右到左
					slideDirection = 'right';
				}else if(fromIndex > toIndex){	//反方向滚动，从左到右
					slideDirection = 'left';
				}
				slide(indexDisparity);
			}
		}
		//方向按钮点击事件
		var dirClick = function(e){
			if((e.target.className == 'toRight') && slideSwitch){
				slideDirection = 'right';
				slide();
			}else if((e.target.className == 'toLeft') && slideSwitch){
				slideDirection = 'left';
				slide();
			}
		}
		init();
	}
})(jQuery)
