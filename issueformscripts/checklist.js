(function(window) {
    'use strict';
  
    var App = window.App || {};
    var $ = window.jQuery;
  
    function CheckList(selector) {
      if(!selector) {
        throw new Error('No selector provided');
      }
  
      this.$element = $(selector);
  
      if (this.$element.length === 0) {
        throw new Error('Could not find element with selector: ' + selector);
      }
    }
  
    CheckList.prototype.addClickHandler = function(fn) {
      this.$element.on('click', 'input', function(event) {
        var email = event.target.value;
        this.removeRow(email);
        fn(email)
        .then(function() {
          this.removeRow(email);
        }.bind(this));
      }.bind(this));
    };
  
  
    CheckList.prototype.addRow = function(issueOrder) {
      // Remove any existing rows that match the email address
      this.removeRow(issueOrder.emailAddress);
      //Create new instance of a row, using the coffee order info.
      var rowElement = new Row(issueOrder);
  
      // Add the new row instance's $element property to the checklist.
      this.$element.append(rowElement.$element);
    };
  
    CheckList.prototype.removeRow = function(email) {
      this.$element
        .find('[value="' + email + '"]')
        .closest('[data-coffee-order="checkbox"]')
        .remove();
    }
  
    function Row(issueOrder) {
      var $div = $('<div></div>', {
        'data-coffee-order': 'checkbox',
        'class': 'checkbox'
      });
  
      var $label = $('<label></label>');
  
      var $checkbox = $('<input></input>', {
        type: 'checkbox',
        value: issueOrder.emailAddress
      });
  
      var description = ' [' + issueOrder.strength + 'x]';
      description += issueOrder.size + ' ';
  
      if (issueOrder.flavor) {
        description += issueOrder.flavor + ' ';
  
        switch (issueOrder.flavor) {
          case 'caramel':
            $div.css("background-color", "#ff7575");
            break;
  
          case 'almond':
            $div.css("background-color", "#82D4BB");
            break;
  
          case 'mocha':
            $div.css('background-color', '#7D82B8');
            break;
        }
      }
  
      description += issueOrder.coffee + ', ';
      description += ' (' + issueOrder.emailAddress + ')';
  
      $label.append($checkbox);
      $label.append(description);
      $div.append($label);
  
      this.$element = $div;
    }
  
    App.CheckList = CheckList;
    window.App = App;
  })(window);