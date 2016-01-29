$(function() {
	$('#hire-worker').click(function() {
		var worker = window.activeSave().Worker.Idle;
		
		if (window.activeSave().Money() >= worker.Cost.Money() && window.activeSave().Resources.Food() >= worker.Cost.Food()) {		
			window.activeSave().Money(window.activeSave().Money() - worker.Cost.Money());
			window.activeSave().Resources.Food(window.activeSave().Resources.Food() - worker.Cost.Food());
			
			worker.Count(worker.Count() +1);
		}
	});
	$('#hire-farmer').click(function() {
		var idle = window.activeSave().Worker.Idle,
		 farmers = window.activeSave().Worker.Farmers;
		
		if (idle.Count() >= farmers.Cost.Idle()) {
			idle.Count(idle.Count() - farmers.Cost.Idle());
			farmers.Count(farmers.Count() + 1);
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
		  woodcutter = window.activeSave().Worker.WoodCutter;
		
		if (idle.Count() >= woodcutter.Cost.Idle()) {
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
});