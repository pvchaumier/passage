(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _vue = require('./vue.js');

console.log(_vue.app);

},{"./vue.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
Vue.component('message-groups-iterator', {
  props: ['messageGroups'],
  template: '\n    <div>\n      <message-group-dispatcher\n        v-for="messageGroup in messageGroups"\n        v-bind:messageGroup="messageGroup"\n      >\n      </message-group-dispatcher>\n    </div>\n  '
});

Vue.component('message-group-dispatcher', {
  props: ['messageGroup'],
  template: '\n    <user-messages-container\n      v-if="messageGroup.fromUser"\n      v-bind:userMessages="messageGroup.messages"\n    >\n    </user-messages-container>\n    <robot-messages-container\n      v-else\n      v-bind:robotMessages="messageGroup.messages"\n      v-bind:isTyping="messageGroup.isTyping"\n    >\n    </robot-messages-container>\n  '
});

Vue.component('user-messages-container', {
  props: ['userMessages'],
  template: '\n    <div class="_1t_p clearfix">\n      <div class="_41ud">\n        <h5 class="_ih3 _-ne">\n          <span class="_3oh-">Micka\xEBl</span>\n        </h5>\n        <user-message \n          v-for="message in userMessages" \n          v-bind:message="message"\n        >\n        </user-message>\n      </div>\n    </div>\n  '
});

Vue.component('user-message', {
  props: ['message'],
  template: '\n    <div class="clearfix _o46 _3erg _3i_m _nd_ direction_ltr text_align_ltr">\n      <div class="_3058 _ui9 _hh7 _s1- _52mr _43by _3oh-" id="js_1zj">\n        <div class="_aok">\n          <span class="_3oh- _58nk">{{ message.text }}</span>\n        </div>\n      </div>\n      <span class="_40fu"><span class="_2u_d"></span></span>\n      <last-seen-message-by-robot v-if="message.lastSeen">\n      </last-seen-message-by-robot>\n    </div>\n  '
});

Vue.component('robot-messages-container', {
  props: ['robotMessages', 'isTyping'],
  template: '\n    <div class="_1t_p clearfix">\n      <div class="_1t_q">\n        <div class="_4ldz _1t_r" data-tooltip-content="Patrick Bateman 4:35pm" data-hover="tooltip" data-tooltip-position="left" style="width: 32px; height: 32px;">\n          <div class="_4ld-" style="width: 32px; height: 32px;">\n            <img alt="Patrick Bateman" src="./Messenger_files/17499392_1651165904924361_806913937995688309_n.png" height="32" width="32" class="img">\n          </div>\n          <div class="_4ld_ _2pom">\n            <div class="_2pon _2poo">\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class="_41ud">\n        <h5 class="_ih3 _-ne"><span class="_3oh-">Patrick Bateman</span>\n        </h5>\n        <div class="clearfix _o46 _3erg _29_7 direction_ltr text_align_ltr">\n          <template v-for="message in robotMessages">\n            <robot-message v-bind:message="message" >\n            </robot-message>\n            <span class="_40fu"><span class="_2u_d"></span></span>\n            <last-seen-message-by-robot v-if="message.lastSeen">\n            </last-seen-message-by-robot>\n          </template>\n          <robot-is-typing-indicator \n            v-if="isTyping"\n          >\n          </robot-is-typing-indicator>\n        </div>\n      </div>\n    </div>\n  '
});

Vue.component('robot-message', {
  props: ['message'],
  template: '\n    <div class="_3058 _ui9 _hh7 _s1- _52mr _3oh-">\n      <div class="_aok">\n        <span class="_3oh- _58nk">{{ message.text }}</span>\n      </div>\n    </div>\n  '
});

Vue.component('robot-is-typing-indicator', {
  template: '\n    <div class=\'jsm-chat-message jsm-left jsm-typing-indicator\' style=\'margin-left: 0px;\'>\n      <span class=\'no-wrap-space\'></span><span class=\'no-wrap-space\'></span><span class=\'no-wrap-space\'></span>\n    </div>\n  '
});

Vue.component('last-seen-message-by-robot', {
  template: '<span class="_4jzq _jf4 _jf5"><img alt="Seen by Patrick Bateman at 4:35pm" class="_jf2 img" src="./Messenger_files/17499392_1651165904924361_806913937995688309_n.png" title="Seen by Patrick"></span>'
});

var app = new Vue({
  el: '#js_1',

  template: '\n    <div>\n      <h4 class="_497p _2lpt">\n        <time class="_3oh-"><span id=\'time\'>{{now}}</span></time>\n      </h4>\n      <message-groups-iterator v-bind:messageGroups="messageGroups"\n        v-bind:robotIsTyping="robotIsTyping"\n      >\n      </message-groups-iterator >\n    </div>\n  ',

  data: {
    robotIsTyping: false,

    messages: [{ text: 'test', fromUser: true, lastSeen: false }, { text: 'test2', fromUser: false, lastSeen: true }, { text: 'test3', fromUser: false, lastSeen: true }, { text: 'test4', fromUser: false, lastSeen: true }, { text: 'test56efWWW', fromUser: false, lastSeen: true }]
  },

  computed: {
    'now': function now() {
      var date = new Date();
      return date.getHours() + ':' + date.getMinutes();
    },


    /**
     * Group messages in a way we can construct
     * the chat interface
     * and add relevant metadata
     */
    'messageGroups': function messageGroups() {
      var messageGroups = [];

      _.forEach(this.messages, function (message, key, messages) {
        var lastMessageGroup = _.last(messageGroups);
        var shouldCreateNewGroup = _.isEmpty(lastMessageGroup) || lastMessageGroup.fromUser !== message.fromUser;

        if (shouldCreateNewGroup) {
          var newMessageGroup = {
            messages: [message],
            fromUser: message.fromUser
          };

          messageGroups.push(newMessageGroup);
          return;
        }

        lastMessageGroup.messages.push(message);
      });

      // Adding typing indicator if necessary
      var lastMessageGroup = _.last(messageGroups);
      var shouldCreateNewRobotGroup = _.isEmpty(lastMessageGroup) || lastMessageGroup.fromUser;

      if (shouldCreateNewRobotGroup) {
        var newRobotMessageGroup = {
          messages: [],
          fromUser: false,
          isTyping: this.robotIsTyping
        };

        messageGroups.push(newRobotMessageGroup);

        return messageGroups;
      }

      lastMessageGroup.isTyping = this.robotIsTyping;

      return messageGroups;
    }
  }
});

var messengerContentEditableInput = '\n  <div class="_5rp7 _5rp8">\n    <div class="_1p1t">\n      <div class="_1p1v" id="placeholder-9igde">\n      Type a message...</div>\n    </div>\n    <div class="_5rpb">\n      <div aria-autocomplete="list" aria-describedby="placeholder-9igde" aria-expanded="false" aria-haspopup="false" aria-label="Type a message..." aria-owns="js_1yt" class="_5rpu" contenteditable="true" data-interaction-root-id="_c1m" role="combobox" spellcheck="true" tabindex="0" style="outline: none; white-space: pre-wrap; word-wrap: break-word;">\n      </div>\n    </div>\n  </div>\n';

var inputApp = new Vue({
  el: '#inputBlock',

  data: {
    newMessageText: ''
  },

  // template: messengerContentEditableInput,
  template: '\n    <div class="_5rp7 _5rp8">\n      <input\n        autofocus\n        placeholder="Type a message..." \n        v-model="newMessageText"\n        @keyup.enter="sendNewMessage"\n      >\n    </div>\n  ',

  methods: {
    sendNewMessage: function sendNewMessage() {
      app.messages.push({ text: this.newMessageText, fromUser: true });
      this.newMessageText = '';
    }
  }
});

exports.default = {
  app: app,
  inputApp: inputApp
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvaW5kZXguanMiLCJlczYvdnVlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQSxRQUFRLEdBQVI7Ozs7Ozs7O0FDRkEsSUFBSSxTQUFKLENBQWMseUJBQWQsRUFBeUM7QUFDdkMsU0FBTyxDQUNMLGVBREssQ0FEZ0M7QUFJdkM7QUFKdUMsQ0FBekM7O0FBZUEsSUFBSSxTQUFKLENBQWMsMEJBQWQsRUFBMEM7QUFDeEMsU0FBTyxDQUNMLGNBREssQ0FEaUM7QUFJeEM7QUFKd0MsQ0FBMUM7O0FBbUJBLElBQUksU0FBSixDQUFjLHlCQUFkLEVBQXlDO0FBQ3ZDLFNBQU8sQ0FBQyxjQUFELENBRGdDO0FBRXZDO0FBRnVDLENBQXpDOztBQWtCQSxJQUFJLFNBQUosQ0FBYyxjQUFkLEVBQThCO0FBQzVCLFNBQU8sQ0FBQyxTQUFELENBRHFCO0FBRTVCO0FBRjRCLENBQTlCOztBQWdCQSxJQUFJLFNBQUosQ0FBYywwQkFBZCxFQUEwQztBQUN4QyxTQUFPLENBQUMsZUFBRCxFQUFrQixVQUFsQixDQURpQztBQUV4QztBQUZ3QyxDQUExQzs7QUFvQ0EsSUFBSSxTQUFKLENBQWMsZUFBZCxFQUErQjtBQUM3QixTQUFPLENBQUMsU0FBRCxDQURzQjtBQUU3QjtBQUY2QixDQUEvQjs7QUFXQSxJQUFJLFNBQUosQ0FBYywyQkFBZCxFQUEyQztBQUN6QztBQUR5QyxDQUEzQzs7QUFRQSxJQUFJLFNBQUosQ0FBYyw0QkFBZCxFQUE0QztBQUMxQztBQUQwQyxDQUE1Qzs7QUFJQSxJQUFNLE1BQU0sSUFBSSxHQUFKLENBQVE7QUFDbEIsTUFBSSxPQURjOztBQUdsQiwwVEFIa0I7O0FBZWxCLFFBQU07QUFDSixtQkFBZSxLQURYOztBQUdKLGNBQVUsQ0FDUixFQUFFLE1BQU0sTUFBUixFQUFnQixVQUFVLElBQTFCLEVBQWdDLFVBQVUsS0FBMUMsRUFEUSxFQUVSLEVBQUUsTUFBTSxPQUFSLEVBQWlCLFVBQVUsS0FBM0IsRUFBa0MsVUFBVSxJQUE1QyxFQUZRLEVBR1IsRUFBRSxNQUFNLE9BQVIsRUFBaUIsVUFBVSxLQUEzQixFQUFrQyxVQUFVLElBQTVDLEVBSFEsRUFJUixFQUFFLE1BQU0sT0FBUixFQUFpQixVQUFVLEtBQTNCLEVBQWtDLFVBQVUsSUFBNUMsRUFKUSxFQUtSLEVBQUUsTUFBTSxhQUFSLEVBQXVCLFVBQVUsS0FBakMsRUFBd0MsVUFBVSxJQUFsRCxFQUxRO0FBSE4sR0FmWTs7QUEyQmxCLFlBQVU7QUFDUixTQURRLGlCQUNDO0FBQ1AsVUFBTSxPQUFPLElBQUksSUFBSixFQUFiO0FBQ0EsYUFBTyxLQUFLLFFBQUwsS0FBa0IsR0FBbEIsR0FBd0IsS0FBSyxVQUFMLEVBQS9CO0FBQ0QsS0FKTzs7O0FBTVI7Ozs7O0FBS0EsbUJBWFEsMkJBV1c7QUFDakIsVUFBTSxnQkFBZ0IsRUFBdEI7O0FBRUEsUUFBRSxPQUFGLENBQVUsS0FBSyxRQUFmLEVBQXlCLFVBQVUsT0FBVixFQUFtQixHQUFuQixFQUF3QixRQUF4QixFQUFrQztBQUN6RCxZQUFNLG1CQUFtQixFQUFFLElBQUYsQ0FBTyxhQUFQLENBQXpCO0FBQ0EsWUFBTSx1QkFBdUIsRUFBRSxPQUFGLENBQVUsZ0JBQVYsS0FDMUIsaUJBQWlCLFFBQWpCLEtBQThCLFFBQVEsUUFEekM7O0FBR0EsWUFBSSxvQkFBSixFQUEwQjtBQUN4QixjQUFNLGtCQUFrQjtBQUN0QixzQkFBVSxDQUFDLE9BQUQsQ0FEWTtBQUV0QixzQkFBVSxRQUFRO0FBRkksV0FBeEI7O0FBS0Esd0JBQWMsSUFBZCxDQUFtQixlQUFuQjtBQUNBO0FBQ0Q7O0FBRUQseUJBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLE9BQS9CO0FBQ0QsT0FoQkQ7O0FBa0JBO0FBQ0EsVUFBTSxtQkFBbUIsRUFBRSxJQUFGLENBQU8sYUFBUCxDQUF6QjtBQUNBLFVBQU0sNEJBQTRCLEVBQUUsT0FBRixDQUFVLGdCQUFWLEtBQStCLGlCQUFpQixRQUFsRjs7QUFFQSxVQUFJLHlCQUFKLEVBQStCO0FBQzdCLFlBQU0sdUJBQXVCO0FBQzNCLG9CQUFVLEVBRGlCO0FBRTNCLG9CQUFVLEtBRmlCO0FBRzNCLG9CQUFVLEtBQUs7QUFIWSxTQUE3Qjs7QUFNQSxzQkFBYyxJQUFkLENBQW1CLG9CQUFuQjs7QUFFQSxlQUFPLGFBQVA7QUFDRDs7QUFFRCx1QkFBaUIsUUFBakIsR0FBNEIsS0FBSyxhQUFqQzs7QUFFQSxhQUFPLGFBQVA7QUFDRDtBQW5ETztBQTNCUSxDQUFSLENBQVo7O0FBa0ZBLElBQU0sc2xCQUFOOztBQWFBLElBQU0sV0FBVyxJQUFJLEdBQUosQ0FBUTtBQUN2QixNQUFJLGFBRG1COztBQUd2QixRQUFNO0FBQ0osb0JBQWdCO0FBRFosR0FIaUI7O0FBT3ZCO0FBQ0EsME5BUnVCOztBQW1CdkIsV0FBUztBQUNQLG9CQUFnQiwwQkFBWTtBQUMxQixVQUFJLFFBQUosQ0FBYSxJQUFiLENBQWtCLEVBQUUsTUFBTSxLQUFLLGNBQWIsRUFBNkIsVUFBVSxJQUF2QyxFQUFsQjtBQUNBLFdBQUssY0FBTCxHQUFzQixFQUF0QjtBQUNEO0FBSk07QUFuQmMsQ0FBUixDQUFqQjs7a0JBMkJlO0FBQ2IsVUFEYTtBQUViO0FBRmEsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBhcHAsIGlucHV0QXBwIH0gZnJvbSAnLi92dWUuanMnXG5cbmNvbnNvbGUubG9nKGFwcClcbiIsIlZ1ZS5jb21wb25lbnQoJ21lc3NhZ2UtZ3JvdXBzLWl0ZXJhdG9yJywge1xuICBwcm9wczogW1xuICAgICdtZXNzYWdlR3JvdXBzJ1xuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8bWVzc2FnZS1ncm91cC1kaXNwYXRjaGVyXG4gICAgICAgIHYtZm9yPVwibWVzc2FnZUdyb3VwIGluIG1lc3NhZ2VHcm91cHNcIlxuICAgICAgICB2LWJpbmQ6bWVzc2FnZUdyb3VwPVwibWVzc2FnZUdyb3VwXCJcbiAgICAgID5cbiAgICAgIDwvbWVzc2FnZS1ncm91cC1kaXNwYXRjaGVyPlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCdtZXNzYWdlLWdyb3VwLWRpc3BhdGNoZXInLCB7XG4gIHByb3BzOiBbXG4gICAgJ21lc3NhZ2VHcm91cCdcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dXNlci1tZXNzYWdlcy1jb250YWluZXJcbiAgICAgIHYtaWY9XCJtZXNzYWdlR3JvdXAuZnJvbVVzZXJcIlxuICAgICAgdi1iaW5kOnVzZXJNZXNzYWdlcz1cIm1lc3NhZ2VHcm91cC5tZXNzYWdlc1wiXG4gICAgPlxuICAgIDwvdXNlci1tZXNzYWdlcy1jb250YWluZXI+XG4gICAgPHJvYm90LW1lc3NhZ2VzLWNvbnRhaW5lclxuICAgICAgdi1lbHNlXG4gICAgICB2LWJpbmQ6cm9ib3RNZXNzYWdlcz1cIm1lc3NhZ2VHcm91cC5tZXNzYWdlc1wiXG4gICAgICB2LWJpbmQ6aXNUeXBpbmc9XCJtZXNzYWdlR3JvdXAuaXNUeXBpbmdcIlxuICAgID5cbiAgICA8L3JvYm90LW1lc3NhZ2VzLWNvbnRhaW5lcj5cbiAgYFxufSlcblxuVnVlLmNvbXBvbmVudCgndXNlci1tZXNzYWdlcy1jb250YWluZXInLCB7XG4gIHByb3BzOiBbJ3VzZXJNZXNzYWdlcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJfMXRfcCBjbGVhcmZpeFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIl80MXVkXCI+XG4gICAgICAgIDxoNSBjbGFzcz1cIl9paDMgXy1uZVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiXzNvaC1cIj5NaWNrYcOrbDwvc3Bhbj5cbiAgICAgICAgPC9oNT5cbiAgICAgICAgPHVzZXItbWVzc2FnZSBcbiAgICAgICAgICB2LWZvcj1cIm1lc3NhZ2UgaW4gdXNlck1lc3NhZ2VzXCIgXG4gICAgICAgICAgdi1iaW5kOm1lc3NhZ2U9XCJtZXNzYWdlXCJcbiAgICAgICAgPlxuICAgICAgICA8L3VzZXItbWVzc2FnZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCd1c2VyLW1lc3NhZ2UnLCB7XG4gIHByb3BzOiBbJ21lc3NhZ2UnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXggX280NiBfM2VyZyBfM2lfbSBfbmRfIGRpcmVjdGlvbl9sdHIgdGV4dF9hbGlnbl9sdHJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJfMzA1OCBfdWk5IF9oaDcgX3MxLSBfNTJtciBfNDNieSBfM29oLVwiIGlkPVwianNfMXpqXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJfYW9rXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJfM29oLSBfNThua1wiPnt7IG1lc3NhZ2UudGV4dCB9fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiXzQwZnVcIj48c3BhbiBjbGFzcz1cIl8ydV9kXCI+PC9zcGFuPjwvc3Bhbj5cbiAgICAgIDxsYXN0LXNlZW4tbWVzc2FnZS1ieS1yb2JvdCB2LWlmPVwibWVzc2FnZS5sYXN0U2VlblwiPlxuICAgICAgPC9sYXN0LXNlZW4tbWVzc2FnZS1ieS1yb2JvdD5cbiAgICA8L2Rpdj5cbiAgYFxufSlcblxuVnVlLmNvbXBvbmVudCgncm9ib3QtbWVzc2FnZXMtY29udGFpbmVyJywge1xuICBwcm9wczogWydyb2JvdE1lc3NhZ2VzJywgJ2lzVHlwaW5nJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIl8xdF9wIGNsZWFyZml4XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiXzF0X3FcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIl80bGR6IF8xdF9yXCIgZGF0YS10b29sdGlwLWNvbnRlbnQ9XCJQYXRyaWNrIEJhdGVtYW4gNDozNXBtXCIgZGF0YS1ob3Zlcj1cInRvb2x0aXBcIiBkYXRhLXRvb2x0aXAtcG9zaXRpb249XCJsZWZ0XCIgc3R5bGU9XCJ3aWR0aDogMzJweDsgaGVpZ2h0OiAzMnB4O1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJfNGxkLVwiIHN0eWxlPVwid2lkdGg6IDMycHg7IGhlaWdodDogMzJweDtcIj5cbiAgICAgICAgICAgIDxpbWcgYWx0PVwiUGF0cmljayBCYXRlbWFuXCIgc3JjPVwiLi9NZXNzZW5nZXJfZmlsZXMvMTc0OTkzOTJfMTY1MTE2NTkwNDkyNDM2MV84MDY5MTM5Mzc5OTU2ODgzMDlfbi5wbmdcIiBoZWlnaHQ9XCIzMlwiIHdpZHRoPVwiMzJcIiBjbGFzcz1cImltZ1wiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJfNGxkXyBfMnBvbVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIl8ycG9uIF8ycG9vXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJfNDF1ZFwiPlxuICAgICAgICA8aDUgY2xhc3M9XCJfaWgzIF8tbmVcIj48c3BhbiBjbGFzcz1cIl8zb2gtXCI+UGF0cmljayBCYXRlbWFuPC9zcGFuPlxuICAgICAgICA8L2g1PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXggX280NiBfM2VyZyBfMjlfNyBkaXJlY3Rpb25fbHRyIHRleHRfYWxpZ25fbHRyXCI+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtZm9yPVwibWVzc2FnZSBpbiByb2JvdE1lc3NhZ2VzXCI+XG4gICAgICAgICAgICA8cm9ib3QtbWVzc2FnZSB2LWJpbmQ6bWVzc2FnZT1cIm1lc3NhZ2VcIiA+XG4gICAgICAgICAgICA8L3JvYm90LW1lc3NhZ2U+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIl80MGZ1XCI+PHNwYW4gY2xhc3M9XCJfMnVfZFwiPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8bGFzdC1zZWVuLW1lc3NhZ2UtYnktcm9ib3Qgdi1pZj1cIm1lc3NhZ2UubGFzdFNlZW5cIj5cbiAgICAgICAgICAgIDwvbGFzdC1zZWVuLW1lc3NhZ2UtYnktcm9ib3Q+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8cm9ib3QtaXMtdHlwaW5nLWluZGljYXRvciBcbiAgICAgICAgICAgIHYtaWY9XCJpc1R5cGluZ1wiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvcm9ib3QtaXMtdHlwaW5nLWluZGljYXRvcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcblxuVnVlLmNvbXBvbmVudCgncm9ib3QtbWVzc2FnZScsIHtcbiAgcHJvcHM6IFsnbWVzc2FnZSddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJfMzA1OCBfdWk5IF9oaDcgX3MxLSBfNTJtciBfM29oLVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIl9hb2tcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJfM29oLSBfNThua1wiPnt7IG1lc3NhZ2UudGV4dCB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCdyb2JvdC1pcy10eXBpbmctaW5kaWNhdG9yJywge1xuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9J2pzbS1jaGF0LW1lc3NhZ2UganNtLWxlZnQganNtLXR5cGluZy1pbmRpY2F0b3InIHN0eWxlPSdtYXJnaW4tbGVmdDogMHB4Oyc+XG4gICAgICA8c3BhbiBjbGFzcz0nbm8td3JhcC1zcGFjZSc+PC9zcGFuPjxzcGFuIGNsYXNzPSduby13cmFwLXNwYWNlJz48L3NwYW4+PHNwYW4gY2xhc3M9J25vLXdyYXAtc3BhY2UnPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcblxuVnVlLmNvbXBvbmVudCgnbGFzdC1zZWVuLW1lc3NhZ2UtYnktcm9ib3QnLCB7XG4gIHRlbXBsYXRlOiBgPHNwYW4gY2xhc3M9XCJfNGp6cSBfamY0IF9qZjVcIj48aW1nIGFsdD1cIlNlZW4gYnkgUGF0cmljayBCYXRlbWFuIGF0IDQ6MzVwbVwiIGNsYXNzPVwiX2pmMiBpbWdcIiBzcmM9XCIuL01lc3Nlbmdlcl9maWxlcy8xNzQ5OTM5Ml8xNjUxMTY1OTA0OTI0MzYxXzgwNjkxMzkzNzk5NTY4ODMwOV9uLnBuZ1wiIHRpdGxlPVwiU2VlbiBieSBQYXRyaWNrXCI+PC9zcGFuPmBcbn0pXG5cbmNvbnN0IGFwcCA9IG5ldyBWdWUoe1xuICBlbDogJyNqc18xJyxcblxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8aDQgY2xhc3M9XCJfNDk3cCBfMmxwdFwiPlxuICAgICAgICA8dGltZSBjbGFzcz1cIl8zb2gtXCI+PHNwYW4gaWQ9J3RpbWUnPnt7bm93fX08L3NwYW4+PC90aW1lPlxuICAgICAgPC9oND5cbiAgICAgIDxtZXNzYWdlLWdyb3Vwcy1pdGVyYXRvciB2LWJpbmQ6bWVzc2FnZUdyb3Vwcz1cIm1lc3NhZ2VHcm91cHNcIlxuICAgICAgICB2LWJpbmQ6cm9ib3RJc1R5cGluZz1cInJvYm90SXNUeXBpbmdcIlxuICAgICAgPlxuICAgICAgPC9tZXNzYWdlLWdyb3Vwcy1pdGVyYXRvciA+XG4gICAgPC9kaXY+XG4gIGAsXG5cbiAgZGF0YToge1xuICAgIHJvYm90SXNUeXBpbmc6IGZhbHNlLFxuXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgIHsgdGV4dDogJ3Rlc3QnLCBmcm9tVXNlcjogdHJ1ZSwgbGFzdFNlZW46IGZhbHNlIH0sXG4gICAgICB7IHRleHQ6ICd0ZXN0MicsIGZyb21Vc2VyOiBmYWxzZSwgbGFzdFNlZW46IHRydWUgfSxcbiAgICAgIHsgdGV4dDogJ3Rlc3QzJywgZnJvbVVzZXI6IGZhbHNlLCBsYXN0U2VlbjogdHJ1ZSB9LFxuICAgICAgeyB0ZXh0OiAndGVzdDQnLCBmcm9tVXNlcjogZmFsc2UsIGxhc3RTZWVuOiB0cnVlIH0sXG4gICAgICB7IHRleHQ6ICd0ZXN0NTZlZldXVycsIGZyb21Vc2VyOiBmYWxzZSwgbGFzdFNlZW46IHRydWUgfVxuICAgIF1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgICdub3cnICgpIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpICsgJzonICsgZGF0ZS5nZXRNaW51dGVzKClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR3JvdXAgbWVzc2FnZXMgaW4gYSB3YXkgd2UgY2FuIGNvbnN0cnVjdFxuICAgICAqIHRoZSBjaGF0IGludGVyZmFjZVxuICAgICAqIGFuZCBhZGQgcmVsZXZhbnQgbWV0YWRhdGFcbiAgICAgKi9cbiAgICAnbWVzc2FnZUdyb3VwcycgKCkge1xuICAgICAgY29uc3QgbWVzc2FnZUdyb3VwcyA9IFtdXG5cbiAgICAgIF8uZm9yRWFjaCh0aGlzLm1lc3NhZ2VzLCBmdW5jdGlvbiAobWVzc2FnZSwga2V5LCBtZXNzYWdlcykge1xuICAgICAgICBjb25zdCBsYXN0TWVzc2FnZUdyb3VwID0gXy5sYXN0KG1lc3NhZ2VHcm91cHMpXG4gICAgICAgIGNvbnN0IHNob3VsZENyZWF0ZU5ld0dyb3VwID0gXy5pc0VtcHR5KGxhc3RNZXNzYWdlR3JvdXApIHx8XG4gICAgICAgICAgKGxhc3RNZXNzYWdlR3JvdXAuZnJvbVVzZXIgIT09IG1lc3NhZ2UuZnJvbVVzZXIpXG5cbiAgICAgICAgaWYgKHNob3VsZENyZWF0ZU5ld0dyb3VwKSB7XG4gICAgICAgICAgY29uc3QgbmV3TWVzc2FnZUdyb3VwID0ge1xuICAgICAgICAgICAgbWVzc2FnZXM6IFttZXNzYWdlXSxcbiAgICAgICAgICAgIGZyb21Vc2VyOiBtZXNzYWdlLmZyb21Vc2VyXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWVzc2FnZUdyb3Vwcy5wdXNoKG5ld01lc3NhZ2VHcm91cClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGxhc3RNZXNzYWdlR3JvdXAubWVzc2FnZXMucHVzaChtZXNzYWdlKVxuICAgICAgfSlcblxuICAgICAgLy8gQWRkaW5nIHR5cGluZyBpbmRpY2F0b3IgaWYgbmVjZXNzYXJ5XG4gICAgICBjb25zdCBsYXN0TWVzc2FnZUdyb3VwID0gXy5sYXN0KG1lc3NhZ2VHcm91cHMpXG4gICAgICBjb25zdCBzaG91bGRDcmVhdGVOZXdSb2JvdEdyb3VwID0gXy5pc0VtcHR5KGxhc3RNZXNzYWdlR3JvdXApIHx8IGxhc3RNZXNzYWdlR3JvdXAuZnJvbVVzZXJcblxuICAgICAgaWYgKHNob3VsZENyZWF0ZU5ld1JvYm90R3JvdXApIHtcbiAgICAgICAgY29uc3QgbmV3Um9ib3RNZXNzYWdlR3JvdXAgPSB7XG4gICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgIGZyb21Vc2VyOiBmYWxzZSxcbiAgICAgICAgICBpc1R5cGluZzogdGhpcy5yb2JvdElzVHlwaW5nXG4gICAgICAgIH1cblxuICAgICAgICBtZXNzYWdlR3JvdXBzLnB1c2gobmV3Um9ib3RNZXNzYWdlR3JvdXApXG5cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VHcm91cHNcbiAgICAgIH1cblxuICAgICAgbGFzdE1lc3NhZ2VHcm91cC5pc1R5cGluZyA9IHRoaXMucm9ib3RJc1R5cGluZ1xuXG4gICAgICByZXR1cm4gbWVzc2FnZUdyb3Vwc1xuICAgIH1cbiAgfVxufSlcblxuY29uc3QgbWVzc2VuZ2VyQ29udGVudEVkaXRhYmxlSW5wdXQgPSBgXG4gIDxkaXYgY2xhc3M9XCJfNXJwNyBfNXJwOFwiPlxuICAgIDxkaXYgY2xhc3M9XCJfMXAxdFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIl8xcDF2XCIgaWQ9XCJwbGFjZWhvbGRlci05aWdkZVwiPlxuICAgICAgVHlwZSBhIG1lc3NhZ2UuLi48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiXzVycGJcIj5cbiAgICAgIDxkaXYgYXJpYS1hdXRvY29tcGxldGU9XCJsaXN0XCIgYXJpYS1kZXNjcmliZWRieT1cInBsYWNlaG9sZGVyLTlpZ2RlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1oYXNwb3B1cD1cImZhbHNlXCIgYXJpYS1sYWJlbD1cIlR5cGUgYSBtZXNzYWdlLi4uXCIgYXJpYS1vd25zPVwianNfMXl0XCIgY2xhc3M9XCJfNXJwdVwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiBkYXRhLWludGVyYWN0aW9uLXJvb3QtaWQ9XCJfYzFtXCIgcm9sZT1cImNvbWJvYm94XCIgc3BlbGxjaGVjaz1cInRydWVcIiB0YWJpbmRleD1cIjBcIiBzdHlsZT1cIm91dGxpbmU6IG5vbmU7IHdoaXRlLXNwYWNlOiBwcmUtd3JhcDsgd29yZC13cmFwOiBicmVhay13b3JkO1wiPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYFxuXG5jb25zdCBpbnB1dEFwcCA9IG5ldyBWdWUoe1xuICBlbDogJyNpbnB1dEJsb2NrJyxcblxuICBkYXRhOiB7XG4gICAgbmV3TWVzc2FnZVRleHQ6ICcnXG4gIH0sXG5cbiAgLy8gdGVtcGxhdGU6IG1lc3NlbmdlckNvbnRlbnRFZGl0YWJsZUlucHV0LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJfNXJwNyBfNXJwOFwiPlxuICAgICAgPGlucHV0XG4gICAgICAgIGF1dG9mb2N1c1xuICAgICAgICBwbGFjZWhvbGRlcj1cIlR5cGUgYSBtZXNzYWdlLi4uXCIgXG4gICAgICAgIHYtbW9kZWw9XCJuZXdNZXNzYWdlVGV4dFwiXG4gICAgICAgIEBrZXl1cC5lbnRlcj1cInNlbmROZXdNZXNzYWdlXCJcbiAgICAgID5cbiAgICA8L2Rpdj5cbiAgYCxcblxuICBtZXRob2RzOiB7XG4gICAgc2VuZE5ld01lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwcC5tZXNzYWdlcy5wdXNoKHsgdGV4dDogdGhpcy5uZXdNZXNzYWdlVGV4dCwgZnJvbVVzZXI6IHRydWUgfSlcbiAgICAgIHRoaXMubmV3TWVzc2FnZVRleHQgPSAnJ1xuICAgIH1cbiAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQge1xuICBhcHAsXG4gIGlucHV0QXBwXG59XG4iXX0=

//# sourceMappingURL=maps/index.js.map
