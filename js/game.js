$(function() {
	/* Make Opera's version of document.hasFocus compatible */
	if (!document.hasFocus)
		document.hasFocus = function() { return document.hidden; };

	/* System Static Variables */
	var savename = 'FTSave',
		gameUpdate, autoSave;
	
	var Game = {};
	var activeSave;
	
	window.Game = Game;
	window.activeSave = function() { return activeSave; };
	
	/* Game Window init */
	$(function() {
		if (top == self) Game.Start();
		else window.top.location = self.location.pathname;
	});
	
	/* Game Start, Update */
	Game.Start = function() {
		if (localStorage['FTSave'] != undefined) {
			Game.Load();
		} else {
			activeSave = Game.CreateSave();
			Game.Save();
		}
		
		gameUpdate = setInterval(Game.Update,60);
		autoSave = setInterval(Game.Save,2500);
		
		ko.applyBindings(activeSave);
	}
	
	Game.Update = function() {
		if (activeSave.lastFrame() == undefined) activeSave.lastFrame(Date.now);
		
		var ms = Date.now() - activeSave.lastFrame();
		
		window.IdleWorkersTick(ms);
		window.FarmersTick(ms);
		window.WoodCuttersTick(ms);
		
		window.ViewModelTick();
		
		activeSave.lastFrame(activeSave.lastFrame() + ms);
	}
	
	/* Load and Save Feature */	
	Game.CreateSave = function() {
		return {
			Building: window.Building,
			Worker: window.Worker,
			Resources: window.Resources,
			Upgrades: {},
			Stats: {},
			version: ko.observable('alpha 1.0.0'),
			started: Date.now(),
			lastSave: ko.observable(0),
			lastFrame: ko.observable(Date.now())
		}
	}
	
	Game.Save = function() {
		activeSave.lastSave(Date.now());
		
		var save = Save(activeSave);
		var savestring = Encode(save);
		
		localStorage[savename] = savestring;
	}
	
	Game.Load = function() {
		activeSave = Game.CreateSave();
		
		var loadedSave = Load(activeSave, Decode());
		
		activeSave = loadedSave;
	}
	
	function Load(defaultData, storedData) {
		if (storedData)
			$.each(storedData, function(index, data) {
				if (typeof(data) == 'object') {
					var loadedPiece = Load(defaultData[index], data);
					
					$.merge(defaultData[index], loadedPiece);
				} else if (index.indexOf('precise') >= 0) {
					defaultData[index] = data;
				} else {
					defaultData[index] = ko.observable(data);
				}
			});
		
		return defaultData;
	}
	
	function Save(obj, ary) {
		var save = {};
		
		$.each(obj, function(index, data) {
			if (typeof(data) == 'function')
				save[index] = data();
			else if (typeof(data) == 'object')
				save[index] = Save(data, save[index]);
			else
				save[index] = data;
		});
		
		return save;
	}
	
	function Encode(s) {
		return window.btoa(unescape(encodeURIComponent(JSON.stringify(s))));
	}
	function Decode() {
		try {
			return JSON.parse(decodeURIComponent(escape(window.atob(localStorage[savename]))));
		}
		catch (e) {
			alert(e);
		}
	}
	
	/* Helper Functions */
	function ObjectLength(obj) {
		var size = 0;
		$.each(obj, function () { size++; });
		return size;
	}
});