
var ipath = getImportRootPath_89866("web3D.js");

var sc = '<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>';
sc += '<script src="'+ipath+'/tools/tools.js" type="text/javascript" charset="utf-8"></script>';
sc += '<script src="'+ipath+'/axis_component/show-axis.js" type="text/javascript" charset="utf-8"></script>';
sc += '<script src="'+ipath+'/monitor_component/monitor_component.js" type="text/javascript" charset="utf-8"></script>';
sc += '<script src="'+ipath+'/thikness_component/thickness.js" type="text/javascript" charset="utf-8"></script>';
sc += '<script src="'+ipath+'/cube/cube.js" type="text/javascript" charset="utf-8"></script>';
sc += '<script src="'+ipath+'/cylinder/cylinder.js" type="text/javascript" charset="utf-8"></script>';
sc += '<script src="http://leaverou.github.com/prefixfree/prefixfree.min.js"></script>';
sc +='<link rel="stylesheet" type="text/css" href="'+ipath+'/d3d.css" />'
document.write(sc);

// 用于组件开发中，求得当前被应用得js或css的路径
function getImportRootPath_89866(js_css_filename) {
	var js = document.scripts || document.getElementsByTagName("script");
	var jsPath;
	for (var i = js.length; i > 0; i--) {
		// if (js[i - 1].src.indexOf("import.js") > -1) {
		if (js[i - 1].src.indexOf(js_css_filename) > -1) {
			jsPath = js[i - 1].src.substring(0, js[i - 1].src.lastIndexOf("/") + 1);
		}
	}
	return jsPath;
}







		
		