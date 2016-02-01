window.Building = {
	House: {
		Count: ko.observable(0),
		Cost: {
			Money: ko.observable(1000),
			Wood: ko.observable(500)
		},
		Capacity: {
			Workers: ko.observable(10)
		}
	},
	Stockpile: {
		Count: ko.observable(1),
		Cost: {
			Money: ko.observable(5000),
			Wood: ko.observable(1000)
		}
	}
}

window.Worker = {
	Idle: {
		Count: ko.observable(0),
		Cost: {
			Money: ko.observable(250),
			Food: ko.observable(25)
		},
		Consumes: {
			Food: ko.observable(1)
		}
	},
	Farmers: {
		Count: ko.observable(0),
		Cost: {
			Idle: ko.observable(1),
			Food: ko.observable(100)
		},
		Produce: {
			Food: ko.observable(1.2)
		},
		Consumes: {
			Food: ko.observable(0.8)
		}
	},
	WoodCutter: {
		Count: ko.observable(0),
		Cost: {
			Idle: ko.observable(1),
			Food: ko.observable(100)
		},
		Produce: {
			Wood: ko.observable(0.1)
		},
		Consumes: {
			Food: ko.observable(2)
		}
	}
}

window.Resources = {
	Money: ko.observable(5000),
	Food: ko.observable(100),
	Wood: ko.observable(100),
	
	// These values are for accurate numbering only and will not be displayed on the GUI
	preciseMoney: 5000,
	preciseFood: 250,
	preciseWood: 100
}