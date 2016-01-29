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
		activeSave.lastFrame(Date.now());
	}
	
	/* Load and Save Feature */	
	Game.CreateSave = function() {
		return {
			Money: ko.observable(5000),
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
		
		localStorage[savename] = Encode(save);
	}
	
	Game.Load = function() {
		activeSave = Game.CreateSave();
		
		var save = Load(Decode());
		
		activeSave = save;
	}
	
	function Load(obj) {
		var ary = {};
		$.each(obj, function(i,j) {
			if (typeof(j) == 'object') {
				ary[i] = Load(j);
			} else {
				ary[i] = ko.observable(j);
			}
		});
		return ary;
	}
	
	function Save(obj, ary) {
		var save = {};
		
		$.each(obj, function(i, j) {
			if (typeof(j) == 'function')
				save[i] = j();
			else if (typeof(j) == 'object')
				save[i] = Save(j, save[i]);
			else
				save[i] = j;
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
});