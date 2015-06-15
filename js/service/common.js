						 //主列表点击事件
			mui('#footer_nav').on('tap', 'a', function() {
				var id = this.getAttribute('href');
				var href = this.href;
				var type = this.getAttribute("open-type")||"common";
				if(id=="#"){
					return;
				} 
				var webview_style = {
						popGesture: "close"
					};
					//侧滑菜单需动态控制一下zindex值；
					if (~id.indexOf('offcanvas-')) {
						webview_style.zindex = 9998;
						webview_style.popGesture = ~id.indexOf('offcanvas-with-right') ? "close" : "none";
					}
				//不使用父子模板方案的页面
				if (type == "common") {
					var webview_style = {
						popGesture: "close"
					};
					//侧滑菜单需动态控制一下zindex值；
					if (~id.indexOf('offcanvas-')) {
						webview_style.zindex = 9998;
						webview_style.popGesture = ~id.indexOf('offcanvas-with-right') ? "close" : "none";
					}
					mui.openWindow({
						id: id,
						url: this.href,
						styles: webview_style,
						show: {
							aniShow: aniShow
						},
						waiting: {
							autoShow: true
						}
					});
				} else if (id && ~id.indexOf('.html')) {
					if (!~id.indexOf('popovers.html')&&!~id.indexOf('tab-with-viewpagerindicator.html')&&mui.os.ios) {
						mui.openWindow({
							id: id,
							url: this.href,
							styles: {
								popGesture: 'close'
							},
							show: {
								aniShow: aniShow
							},
							waiting: {
								autoShow: false
							}
						});
					} else {
						//TODO  by chb 当初这么设计，是为了一个App中有多个模板，目前仅有一个模板的情况下，实际上无需这么复杂
						//使用父子模板方案打开的页面
						//获得共用模板组
						var template = getTemplate('default');
						//判断是否显示右上角menu图标；
						var showMenu = ~href.indexOf('popovers.html') ? true : false;
						//获得共用父模板
						var headerWebview = template.header;
						//获得共用子webview
						var contentWebview = template.content;
						var title = this.innerText.trim();
						//通知模板修改标题，并显示隐藏右上角图标；
						mui.fire(headerWebview, 'updateHeader', {
							title: title,
							showMenu: showMenu
						});
						
						var reload = true;
						if (!template.loaded) {
							if (contentWebview.getURL() != this.href) {
								contentWebview.loadURL(this.href);
							} else {
								reload = false;
							}
						} else {
							reload = false;
						}
						(!reload) && contentWebview.show();
						
						headerWebview.show(aniShow, 150);
					}
				}
			});