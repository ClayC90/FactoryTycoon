window.Building = {
	House: {
		Count: ko.observable(1),
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
		},
		Capacity: {
			Wood: ko.observable(200),
			Food: ko.observable(200)
		}
	},
	Granary: {
		Count: ko.observable(0),
		Cost: {
			Money: ko.observable(3000),
			Wood: ko.observable(2500)
		},
		Capacity: {
			Food: ko.observable(300)
		}
	},
	Farm: {
		Count: ko.observable(1),
		Cost: {
			Money: ko.observable(5000),
			Food: ko.observable(2500)
		},
		Capacity: {
			Farmers: ko.observable(10)
		}
	},
	LoggingCamp: {
		Count: ko.observable(0),
		Cost: {
			Money: ko.observable(3000),
			Wood: ko.observable(2500)
		},
		Capacity: {
			WoodCutter: ko.observable(10)
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
	
	FoodCapacity: ko.observable(0),
	WoodCapacity: ko.observable(0),
	
	FarmersCapacity: ko.observable(0),
	WoodCutterCapacity: ko.observable(0),
	
	// These values are for accurate numbering only and will not be displayed on the GUI
	preciseMoney: 5000,
	preciseFood: 250,
	preciseWood: 100,
	
	// Per second values
	foodpsec: ko.observable(0),
	woodpsec: ko.observable(0)
}

window.Capacity = {
	Farmers: function() {
		return window.Building.Farm.Capacity.Farmers() * window.Building.Farm.Count();
	},
	WoodCutter: function() {
		return window.Building.LoggingCamp.Capacity.WoodCutter() * window.Building.LoggingCamp.Count();
	},
	Food: function() {
		return (window.Building.Stockpile.Capacity.Food() * window.Building.Stockpile.Count()) +
			   (window.Building.Granary.Capacity.Food() * window.Building.Granary.Count());
	},
	Wood: function() {
		return window.Building.Stockpile.Capacity.Wood() * window.Building.Stockpile.Count();
	}
}

window.ViewModel = {
	Money: ko.pureComputed({
		read: function() {
			return $(window.Resources.Money()).money();
		}
	}),
	foodPerSec: ko.pureComputed({
		read: function() {
			var value = window.Resources.foodpsec();
			
			if (value > 0)
				$('#foodPerSec').addClass('text-success').removeClass('text-danger');
			else
				$('#foodPerSec').addClass('text-danger').removeClass('text-success');
		
			return value.toFixed(0);
		},
		owner: this
	}).extend({ notify: 'always' }),
	woodPerSec: ko.pureComputed({
		read: function() {
			var value = window.Resources.woodpsec();
			if (value > 0)
				$('#woodPerSec').addClass('text-success').removeClass('text-danger');
			else
				$('#woodPerSec').addClass('text-danger').removeClass('text-success');
		
			return value.toFixed(0);
		},
		owner: this
	}).extend({ notify: 'always' })
}