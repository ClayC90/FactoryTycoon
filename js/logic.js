$(function() {
	window.IdleWorkersTick = function(ms) {
		var count = window.activeSave().Worker.Idle.Count(),
			resources = window.activeSave().Resources;
	}
	window.FarmersTick = function(ms) {
		var worker = window.activeSave().Worker,
			count = worker.Farmers.Count(),
			resources = window.activeSave().Resources,
			building = window.activeSave().Building,
			production = worker.Farmers.Produce.Food() * worker.Farmers.Count(),
			consumption = 0;
			
		$.each(worker, function(index, data) {
			consumption += data.Consumes.Food() * data.Count();
		});
		
		var change = (production - consumption) / 1000 * ms;
		
		if (resources.preciseFood + change >= resources.FoodCapacity())
			resources.preciseFood = resources.FoodCapacity();
		else
			resources.preciseFood += change;
	}
	window.WoodCuttersTick = function(ms) {
		var count = window.activeSave().Worker.WoodCutter.Count(),
			produce = window.activeSave().Worker.WoodCutter.Produce.Wood(),
			resources = window.activeSave().Resources,
			building = window.activeSave().Building;
		
		if (resources.preciseWood + produce > resources.WoodCapacity())
			resources.preciseWood = resources.WoodCapacity();
		else
			resources.preciseWood += ((count * produce) / 1000 * ms);
	}

	window.ViewModelTick = function() {
		var resources = window.activeSave().Resources;
		
		resources.Money(Math.round(window.activeSave().Resources.preciseMoney));
		resources.Food(Math.round(window.activeSave().Resources.preciseFood));
		resources.Wood(Math.round(window.activeSave().Resources.preciseWood));
		
		// Per Second
		var foodPerSec = 0,
			woodPerSec = 0;
		
		$.each(window.activeSave().Worker, function(index, data) {
			if (index == 'Farmers')
				foodPerSec += (data.Produce.Food() * data.Count());
			
			if (index == 'WoodCutter')
				woodPerSec += (data.Produce.Wood() * data.Count());
			
			foodPerSec -= (data.Consumes.Food() * data.Count());
		});
		
		resources.foodpsec(foodPerSec);
		resources.woodpsec(woodPerSec);
	}
	window.TotalWorkers = function() {
		var count = 0;
		$.each(window.activeSave().Worker, function(index, worker) {
			if (index != 'length')
				count += worker.Count();
		});
		return count;
	}
});