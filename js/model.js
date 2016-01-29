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
		}
	},
	Farmers: {
		Count: ko.observable(0),
		Cost: {
			Idle: ko.observable(1)
		}
	},
	WoodCutter: {
		Count: ko.observable(0),
		Cost: {
			Idle: ko.observable(1)
		}
	}
}

window.Resources = {
	Food: ko.observable(25),
	Wood: ko.observable(100)
}