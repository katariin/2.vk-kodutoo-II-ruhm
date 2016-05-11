(function(){
  "use strict";

  var Calendar = function(){
    if(Calendar.instance){
      return Calendar.instance;
    }
    Calendar.instance = this;
    this.routes = Calendar.routes;
    this.currentRoute = null;
    this.error = document.querySelector("#error");
    this.menu = document.querySelector(".menu");
    this.events = [];
    this.loend = document.querySelector('#loend');
    this.init();
  };

  window.Calendar = Calendar;

  Calendar.routes = {
    'insert-view': {
      'render': function(){}
    },
	
    'list-view': {
      'render': function(){}
    }
  };

  Calendar.prototype = {

    init: function(){
      window.addEventListener('hashchange', this.routeChange.bind(this));
      if(!window.location.hash){
        window.location.hash = 'insert-view';
      }else{
        this.routeChange();
      }
      this.show();
      this.vajutaNuppu();
    },

    show: function(){

      while(this.loend.firstChild){
        this.loend.removeChild(this.loend.firstChild);
      }
      if(localStorage.events){
        this.events = JSON.parse(localStorage.events);
        for(var i = 0; i < this.events.length; i++){
          var new_event = new Event(this.events[i].add_date, this.events[i].event_description);
          var li = new_event.createHtmlElement();
          var item = this.loend.appendChild(li);
          item.innerHTML += " &nbsp <button  style='color:#FF3366' class='remove' id='" + i + "'>&#8999</button>";
          item.innerHTML += " &nbsp <button class='change' id='" + i + "'>&#10227</button>";    //http://m.unicode-table.com/ru/blocks/miscellaneous-technical/
        }
      }
    },
	
	/*  bindEvents: function(){
      document.querySelector('#search').addEventListener('keyup', this.search.bind(this));
    },
	
	  search: function(event){
      var kokku=0;
      var needle = document.querySelector('#search').value.toLowerCase();
      console.log(needle);
      var list = document.querySelectorAll('#loend');
      console.log(list);
      for(var i=0; i<list.length; i++){
        var li = list[i];
          var stack = li.querySelector('.content').innerHTML.toLowerCase();
          if(stack.indexOf(needle) !== -1){
            li.style.display = 'list-view';
          }else{
            li.style.display = 'none';
          }
          if(li.style.display == 'list-view'){kokku++;}
          document.querySelector('#kokku').innerHTML='Kokku: '+kokku;
      }
    },*/

    vajutaNuppu: function(){
      document.querySelector('#add_new_event').addEventListener('click', this.newClick.bind(this));
      this.vajutaNuppu_2();
    },

    vajutaNuppu_2: function(){
      var add_remove = document.getElementsByClassName('remove');
      var add_change = document.getElementsByClassName('change');
      for(var i = 0; i < add_change.length; i++) {
        add_remove[i].addEventListener('click', this.remove.bind(this));
        add_change[i].addEventListener('click', this.change.bind(this));
      }
    },

    remove: function(event){
	  var p = confirm('Oled kindel?');
	   if(!p){return;}
	   
      var index = event.target.id;	  
      this.events = JSON.parse(localStorage.events);	  
	 //  var ul = event.target.parentNode.parentNode;
     //  var li = event.target.parentNode;
     // ul.removeChild(li);
      this.events.splice(index, 1);
      localStorage.setItem('events', JSON.stringify(this.events));
      this.show();
      this.vajutaNuppu_2();
    },

    change: function(event){
      var index = event.target.id;
      this.events = JSON.parse(localStorage.events);
      this.events[index].event_description = prompt("Uus sundmus");
      localStorage.setItem('events', JSON.stringify(this.events));
      this.show();
      this.vajutaNuppu_2();
    },

    newClick: function(event){
      var add_date = document.querySelector('#add_date').value;
      var event_description = document.querySelector('#event_description').value;
	  
      if(add_date && event_description){
        var new_event = new Event(add_date, event_description);
        this.events.push(new_event);
        console.log(JSON.stringify(this.events));
        localStorage.setItem('events', JSON.stringify(this.events));
        var li = new_event.createHtmlElement();
        var item = this.loend.appendChild(li);
        item.innerHTML += " &nbsp <button style='color:#FF3366' class='remove' id='" + (this.events.length - 1) + "'>&#8999</button>";
        item.innerHTML += " &nbsp <button class='change' id='" + (this.events.length - 1) + "'>&#10227</button>";
        var add_remove = document.getElementsByClassName('remove');
        var add_change = document.getElementsByClassName('change');
        add_remove[this.events.length - 1].addEventListener('click', this.remove.bind(this));
        add_change[this.events.length - 1].addEventListener('click', this.change.bind(this));
        error.innerHTML = "";
		var today = new Date();
		var date = today.getFullYear();
	 }else if(Date.parse(add_date)> Date.parse(date)){
		  error.innerHTML = "<br>Aeg peab olema tulevikus!";
      }else{
        error.innerHTML = "<br>Tekst või kuupäev puudub!";
      }
    },

    routeChange: function(){
      this.currentRoute = location.hash.slice(1);
      if(this.routes[this.currentRoute]){
        this.updateMenu();
        this.routes[this.currentRoute].render();
      }
    },

    updateMenu: function(){
       document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('active-menu', '');
       document.querySelector('.'+this.currentRoute).className += ' active-menu';
    }

  };

  var Event = function(new_add_date, new_event_description){
    this.add_date = new_add_date;
    this.event_description = new_event_description;
  };

  Event.prototype = {
    createHtmlElement: function(){
      var li = document.createElement('li');
      var span_with_content = document.createElement('span');
      span_with_content.className = 'content';
      var content = document.createTextNode(this.add_date + ' | ' + this.event_description );
      span_with_content.appendChild(content);
      li.appendChild(span_with_content);
      return li;
    }

  };

  window.onload = function(){
    var app = new Calendar();
  };

})();