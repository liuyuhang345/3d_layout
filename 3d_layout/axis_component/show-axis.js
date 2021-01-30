function $show_axis(selector){
	$(selector).css("transform-style","preserve-3d");
	$(selector).append($("<div class='axis x-axis'></div>"));
	$(selector).append($("<div class='axis y-axis'></div>"));
	$(selector).append($("<div class='axis z-axis'></div>"));
	
}