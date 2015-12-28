$.fn.jqueryTab = function(){
	
	this.each(function(){
		
		var tab = this;
		var activePanelId = $(".active a", tab).attr("href");

		$(".panel > div:not(" + activePanelId + ")", tab).css("visibility", "hidden").css("height", "0px");
		
		$("> ul a", tab).click(function(){

			$("> ul li.active", tab).removeClass("active");
			$(".panel > div", tab).css("visibility", "hidden").css("height", "0px");
			$(this).parent("li").addClass("active");
			$($(this).attr("href")).css("visibility", "visible").css("height", "auto");
			$(".panel").css("height", "auto");

			return false;
		});

	});

	return this;
};