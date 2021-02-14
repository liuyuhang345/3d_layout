var root_path = get_RootPath();


var sc ='<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>	<script src="{.}/component/axis_component/show-axis.js" type="text/javascript" charset="utf-8"></script><script src="{.}/component/monitor_component/monitor_component.js" type="text/javascript" charset="utf-8"></script><script src="{.}component/thikness_component/thickness.js" type="text/javascript" charset="utf-8"></script><script src="http://leaverou.github.com/prefixfree/prefixfree.min.js"></script>' ;


sc = sc.replace(/\{.\}/g,root_path);


document.write(sc);



// 以下方法专用于做js插件。求得当前js（monitor_component.js）所在路径
// 来自https://www.cnblogs.com/blosaa/archive/2011/10/17/2215606.html
// 感谢昵称为“云中雀”的博主
function get_RootPath() {
	var js = document.scripts || document.getElementsByTagName("script");
	var jsPath;
	for (var i = js.length; i > 0; i--) {
		if (js[i - 1].src.indexOf("import.js") > -1) {
			jsPath = js[i - 1].src.substring(0, js[i - 1].src.lastIndexOf("/") + 1);
		}
	}
	return jsPath;
}