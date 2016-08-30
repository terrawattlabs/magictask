chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		
		// ----------------------------------------------------------


	//below here 

			$.get(chrome.extension.getURL('/src/inject/inject.html'), function(data) {
		    $("body").append(data);


			function renderCSSForSelector(css, selector) {
			    return ((css+"")||"").replace(/\n|\t/g, " ")
			      .replace(/\s+/g, " ")
			      .replace(/\s*\/\*.*?\*\/\s*/g, " ")
			      .replace(/(^|\})(.*?)(\{)/g, function($0, $1, $2, $3) {
			        var collector = [], parts = $2.split(",");
			        for (var i in parts) {
			            collector.push(selector + " " + parts[i].replace(/^\s*|\s*$/, ""));
			        }
			        return $1 + " " + collector.join(", ") + " " + $3;
			    });
			};

					    function applyCSSToElement(css, elementSelector) {
			    $("head").append("<style type=\"text/css\">" + renderCSSForSelector(css, elementSelector) + "</style>");
			};



		    function applyCSSFileToElement(cssUrl, elementSelector) {
		    	$.get(chrome.extension.getURL(cssUrl), function(d) {
		    		applyCSSToElement(d, elementSelector);
			    });
			};

				
				applyCSSFileToElement('/src/inject/lib/bootstrap/css/bootstrap.css', '.magic-content-container');
		    // Or if you're using jQuery 1.8+:
		    // $($.parseHTML(data)).appendTo('body');

		    // $.get(chrome.extension.getURL('/src/inject/inject.html'), function(data) {
		    // $("body").prepend(data);

		    angular.bootstrap(document.body, ['app'])

		});

	
		

	// above here	
	} 
	}, 10);

	
});

