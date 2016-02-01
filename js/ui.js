$(function() {
	$('#gather-food').click(function() {
		window.activeSave().Resources.preciseFood += 1;
	});
	
	$('#hire-worker').click(function() {
		var worker = window.activeSave().Worker.Idle,
			resources = window.activeSave().Resources;
		
		if (resources.preciseMoney >= worker.Cost.Money() && resources.Food() >= worker.Cost.Food()) {
			resources.preciseMoney -= worker.Cost.Money();
			
			window.activeSave().Resources.preciseFood -= worker.Cost.Food();
			
			worker.Count(worker.Count() + 1);
		}
	});
	$('#hire-farmer').click(function() {
		var idle = window.activeSave().Worker.Idle,
		 farmers = window.activeSave().Worker.Farmers,
	   resources = window.activeSave().Resources;
		
		if (idle.Count() >= farmers.Cost.Idle() && 
			resources.preciseFood >= farmers.Cost.Food()) {
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
		
		if (idle.Count() >= woodcutter.Cost.Idle() && 
			resources.Food >= woodcutter.Cost.Food()) {
			idle.Count(idle.Count() - woodcutter.Cost.Idle());
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
	
	/* MARKET */
	var FoodBuyPrice = 1,
		FoodSellPrice = 0.7,
		WoodBuyPrice = 5,
		WoodSellPrice = 3.7;
	
	$('.buy-food').click(function() {
		var ttlPrice = $(this).data('amount') * FoodBuyPrice,
			resources = window.activeSave().Resources;
		
		if (resources.preciseMoney >= ttlPrice) {
			resources.preciseMoney -= ttlPrice;
			
			window.activeSave().Resources.preciseFood += $(this).data('amount');
		}
	});
	$('.sell-food').click(function() {
		var amount = $(this).data('amount'),
			ttlPrice = amount * FoodSellPrice,
			resources = window.activeSave().Resources;
		
		if (resources.preciseFood >= amount) {
			resources.preciseMoney += ttlPrice;
			
			resources.preciseFood -= amount;
		}
	});
	$('.buy-wood').click(function() {
		var amount = $(this).data('amount'),
			ttlPrice = amount * WoodBuyPrice,
			resources = window.activeSave().Resources;
		
		if (resources.preciseMoney >= ttlPrice) {
			resources.preciseMoney -= ttlPrice;
			
			resources.preciseWood += amount;
		}
	});
	$('.sell-wood').click(function() {
		var amount = $(this).data('amount'),
			ttlPrice = amount * WoodSellPrice,
			resources = window.activeSave().Resources;
		
		if (resources.preciseWood >= amount) {
			resources.preciseMoney += ttlPrice;
			
			resources.preciseWood -= amount;
		}
	});
});