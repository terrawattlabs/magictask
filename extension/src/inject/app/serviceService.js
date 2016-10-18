angular.module('app').service('serviceService', function ($q, $http) {



var _this = this;

var	values = {
	"asana" : {
		"name": "Asana",
		"base_url": "https://app.asana.com/",
		"img_url" : "https://asanatraining.com/wp-content/uploads/2016/07/Asana-Logo.png"
	},
	"trello" : {
		"name": "Trello",
		"base_url": "https:/trello.com/",
		"img_url" : "https://asanatraining.com/wp-content/uploads/2016/07/Asana-Logo.png"
	}
};

this.getServiceValues = function(s){

	if (s == 'asana') {
		return values.asana;
	} if (s == 'trello') {
		return values.trello;
	};

};



//end service
});
