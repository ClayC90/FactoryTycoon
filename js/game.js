$(function($) {
	/* Make Opera's version of document.hasFocus compatible */
	if (!document.hasFocus)
		document.hasFocus = function() { return document.hidden; };

	/* System Static Variables */
	var savename = 'FTSave',
		gameUpdate;
	
	var Game = {};
	window.Game = Game;
	var activeSave;
	window.activeSave = activeSave;
	
	/* Game Window init */
	$(function() {
		if (top == self)
			Game.Start();
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
		
		try {
			ko.applyBindings(activeSave);
		}
		catch(e) {
			
		}
	}
	
	Game.Update = function() {
		activeSave.lastFrame(Date.now());
	}
	
	/* Load and Save Feature */	
	Game.CreateSave = function() {
		return {
			Money: ko.observable(5000),
			Building: {},
			Upgrades: {},
			Stats: {},
			version: 'alpha 1.0.0',
			started: Date.now(),
			lastFrame: ko.observable(Date.now())
		}
	}
	
	Game.Save = function() {
		localStorage[savename] = Encode(activeSave);
	}
	
	Game.Load = function() {
		activeSave = Game.CreateSave();
		
		$.each(Decode(), function(i,j) {
			if (typeof(j) !== 'object') {
				activeSave[i] = ko.observable(j);
			} else {
				activeSave[i] = j;
			}
		});
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