$(function() {
	/* ERROR MESSAGES */
	var needMoreMoney    = 'Need more Money',
		needMoreFood     = 'Need more Food',
		needMoreWood     = 'Need more Wood',
		needMoreHouses   = 'Need more housing',
		needMoreWorkers  = 'Need more Workers',
		
		needMoreFarms    = 'Need more Farms',
		needMoreLogCamps = 'Need more Logging Camps';
	
	$('#gather-food').click(function() {
		window.activeSave().Resources.preciseFood += 1;
	});
	
	/* TRAINING */
	$('#hire-worker').click(function() {
		var worker = window.activeSave().Worker.Idle,
			resources = window.activeSave().Resources,
			building = window.activeSave().Building,
			capacity = building.House.Count() * building.House.Capacity.Workers();
		
		if (capacity <= window.TotalWorkers())
			ErrorHire($(this), needMoreHouses);
		else if (resources.preciseMoney < worker.Cost.Money())
			ErrorHire($(this), needMoreMoney);
		else if (resources.Food() < worker.Cost.Food())
			ErrorHire($(this), needMoreFood);
		else {
			resources.preciseMoney -= worker.Cost.Money();
			
			window.activeSave().Resources.preciseFood -= worker.Cost.Food();
			
			worker.Count(worker.Count() + 1);
		}
	});
	$('#hire-farmer').click(function() {
		var idle = window.activeSave().Worker.Idle,
		 farmers = window.activeSave().Worker.Farmers,
	   resources = window.activeSave().Resources;
		
		if (idle.Count() < farmers.Cost.Idle())
			ErrorHire($(this), needMoreWorkers);
		else if (resources.preciseFood < farmers.Cost.Food())
			ErrorHire($(this), needMoreFood);
		else if (window.Capacity.Farmers() <= farmers.Count())
			ErrorHire($(this), needMoreFarms);
		else {
			idle.Count(idle.Count() - farmers.Cost.Idle());
			farmers.Count(farmers.Count() + 1);
			
			resources.preciseFood -= farmers.Cost.Food();
		}
	});
	$('#fire-farmer').click(function() {
		var idle = window.activeSave().Worker.Idle,
		 farmers = window.activeSave().Worker.Farmers;
		
		if (farmers.Count() > 0) {
			idle.Count(idle.Count() + farmers.Cost.Idle());
			farmers.Count(farmers.Count() - 1);
		}
	});
	$('#hire-woodcutter').click(function() {
		var     idle = window.activeSave().Worker.Idle,
		  woodcutter = window.activeSave().Worker.WoodCutter,
		   resources = window.activeSave().Resources;
		
		if (idle.Count() < woodcutter.Cost.Idle())
			ErrorHire($(this), needMoreWorkers);
		else if (resources.preciseFood < woodcutter.Cost.Food())
			ErrorHire($(this), needMoreFood);
		else if (window.Capacity.WoodCutter() <= woodcutter.Count())
			ErrorHire($(this), needMoreLogCamps);
		else {
			idle.Count(idle.Count() - woodcutter.Cost.Idle());
			resources.preciseFood -= woodcutter.Cost.Food();
			woodcutter.Count(woodcutter.Count() + 1);
		}
	});
	$('#fire-woodcutter').click(function() {
		var     idle = window.activeSave().Worker.Idle,
		  woodcutter = window.activeSave().Worker.WoodCutter;
		
		if (woodcutter.Count() > 0) {
			idle.Count(idle.Count() + woodcutter.Cost.Idle());
			woodcutter.Count(woodcutter.Count() - 1);
		}
	});
	
	/* BUILDING */
	$('#build-house').click(function() {
		var resources = window.activeSave().Resources,
			buildings = window.activeSave().Building,
			house     = buildings.House;
			
		if (resources.preciseMoney < house.Cost.Money())
			ErrorHire($(this), needMoreMoney);
		else if (resources.preciseWood < house.Cost.Wood())
			ErrorHire($(this), needMoreWood);
		else {
			resources.preciseMoney -= house.Cost.Money();
			resources.preciseWood -= house.Cost.Wood();
			
			house.Count(house.Count() + 1);
		}
	});
	$('#build-stockpile').click(function() {
		var resources = window.activeSave().Resources,
			buildings = window.activeSave().Building,
			stockpile = buildings.Stockpile,
			amount    = parseInt($(this).parents('.input-group').find('option:selected').val());
			
		if (resources.preciseMoney < (stockpile.Cost.Money() * amount))
			ErrorHire($(this), needMoreMoney);
		else if (resources.preciseWood < (stockpile.Cost.Wood() * amount))
			ErrorHire($(this), needMoreWood);
		else {
			resources.preciseMoney -= (stockpile.Cost.Money() * amount);
			resources.preciseWood  -= (stockpile.Cost.Wood() * amount);
			
			stockpile.Count(stockpile.Count() + amount);
			
			resources.FoodCapacity(window.Capacity.Food());
			resources.WoodCapacity(window.Capacity.Wood());
		}
	});
	$('#build-granary').click(function() {
		var resources = window.activeSave().Resources,
			buildings = window.activeSave().Building,
			granary = buildings.Granary;
			
		if (resources.preciseMoney < granary.Cost.Money())
			ErrorHire($(this), needMoreMoney);
		else if (resources.preciseWood < granary.Cost.Wood())
			ErrorHire($(this), needMoreWood);
		else {
			resources.preciseMoney -= granary.Cost.Money();
			resources.preciseWood  -= granary.Cost.Wood();
			
			granary.Count(granary.Count() + 1);
			
			resources.FoodCapacity(window.Capacity.Food());
		}
	});
	$('#build-loggingcamp').click(function() {
		var resources = window.activeSave().Resources,
			buildings = window.activeSave().Building,
			loggingcamp = buildings.LoggingCamp;
			
		if (resources.preciseMoney < loggingcamp.Cost.Money())
			ErrorHire($(this), needMoreMoney);
		else if (resources.preciseWood < loggingcamp.Cost.Wood())
			ErrorHire($(this), needMoreWood);
		else {
			resources.preciseMoney -= loggingcamp.Cost.Money();
			resources.preciseWood  -= loggingcamp.Cost.Wood();
			
			loggingcamp.Count(loggingcamp.Count() + 1);
			
			resources.WoodCutterCapacity(window.Capacity.WoodCutter());
		}
	});
	$('#build-farm').click(function() {
		var resources = window.activeSave().Resources,
			buildings = window.activeSave().Building,
			farm = buildings.Farm;
			
		if (resources.preciseMoney < farm.Cost.Money())
			ErrorHire($(this), needMoreMoney);
		else if (resources.preciseFood < farm.Cost.Food())
			ErrorHire($(this), needMoreFood);
		else {
			resources.preciseMoney -= farm.Cost.Money();
			resources.preciseFood  -= farm.Cost.Food();
			
			farm.Count(farm.Count() + 1);
			
			resources.FarmersCapacity(window.Capacity.Farmers());
		}
	});
	
	/* ERROR */
	function ErrorHire(button, text, delay) {
		if (delay == undefined) delay = 2000;
		button
			.parents('tr')
				.find('.label-danger:hidden')
				.text(text)
				.fadeIn()
				.delay(delay)
				.fadeOut();
	}
	
	/* TABBING */
	var training = $('#tab-training'),
		building = $('#tab-building');
	
	$('#open-training').click(function() {
		building.slideUp(function() { training.slideDown(); });
		ga('send', 'tab', 'training');
	});
	$('#open-building').click(function() {
		training.slideUp(function() { building.slideDown(); });
		ga('send', 'tab', 'building');
	});
	
	/* MARKET */
	var FoodBuyPrice  = 0.5,
		FoodSellPrice = 0.2,
		WoodBuyPrice  = 5,
		WoodSellPrice = 2;
	
	$('.buy-food').click(function() {
		var amount    = parseInt(($(this).data('amount') != 1) ? $(this).data('amount') : ($('#buy-food-amount').val() != "") ? $('#buy-food-amount').val() : 1);
			ttlPrice  = amount * FoodBuyPrice,
			resources = window.activeSave().Resources;
		
		if (resources.preciseMoney >= ttlPrice) {
			resources.preciseMoney -= ttlPrice;
			resources.preciseFood  += amount;
		}
	});
	$('.sell-food').click(function() {
		var amount    = parseInt(($(this).data('amount') != 1) ? $(this).data('amount') : ($('#sell-food-amount').val() != "") ? $('#sell-food-amount').val() : 1);
			ttlPrice  = amount * FoodSellPrice;
			resources = window.activeSave().Resources;
		
		if (resources.preciseFood  >= amount) {
			resources.preciseMoney += ttlPrice;
			resources.preciseFood  -= amount;
		}
	});
	$('.buy-wood').click(function() {
		var amount    = parseInt(($(this).data('amount') != 1) ? $(this).data('amount') : ($('#buy-wood-amount').val() != "") ? $('#buy-wood-amount').val() : 1),
			ttlPrice  = amount * WoodBuyPrice,
			resources = window.activeSave().Resources;
		
		if (resources.preciseMoney >= ttlPrice) {
			resources.preciseMoney -= ttlPrice;
			resources.preciseWood += amount;
		}
	});
	$('.sell-wood').click(function() {
		var amount    = parseInt(($(this).data('amount') != 1) ? $(this).data('amount') : ($('#sell-wood-amount').val() != "") ? $('#sell-wood-amount').val() : 1)
			ttlPrice  = amount * WoodSellPrice,
			resources = window.activeSave().Resources;
		
		if (resources.preciseWood  >= amount) {
			resources.preciseMoney += ttlPrice;
			resources.preciseWood  -= amount;
		}
	});
});