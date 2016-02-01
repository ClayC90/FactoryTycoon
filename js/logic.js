$(function() {
	window.IdleWorkersTick = function(ms) {
		var count = window.activeSave().Worker.Idle.Count(),
			consume = window.activeSave().Worker.Idle.Consumes.Food(),
			resources = window.activeSave().Resources;
		
		window.activeSave().Resources.preciseFood -= ((count * consume) / 1000 * ms);
	}
	window.FarmersTick = function(ms) {
		var count = window.activeSave().Worker.Farmers.Count(),
			consume = window.activeSave().Worker.Farmers.Consumes.Food(),
			produce = window.activeSave().Worker.Farmers.Produce.Food(),
			resources = window.activeSave().Resources;
		
		window.activeSave().Resources.preciseFood += ((count * produce) / 1000 * ms);
		window.activeSave().Resources.preciseFood -= ((count * consume) / 1000 * ms);
	}
	window.WoodCuttersTick = function(ms) {
		var count = window.activeSave().Worker.WoodCutter.Count(),
			consume = window.activeSave().Worker.WoodCutter.Consumes.Food(),
			produce = window.activeSave().Worker.WoodCutter.Produce.Wood(),
			resources = window.activeSave().Resources;
		
		window.activeSave().Resources.preciseWood += ((count * produce) / 1000 * ms);
		window.activeSave().Resources.preciseFood -= ((count * consume) / 1000 * ms);
	}
	
	window.ViewModelTick = function() {
		window.activeSave().Resources.Money(Math.round(window.activeSave().Resources.preciseMoney));
		window.activeSave().Resources.Food(Math.round(window.activeSave().Resources.preciseFood));
		window.activeSave().Resources.Wood(Math.round(window.activeSave().Resources.preciseWood));
	}
});