(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _messengerVue = require('./messenger-vue.js');

var _textsWaiter = require('./texts-waiter.js');

var _patrickTexts = require('./patrick-texts.js');

var patrickMessengerVue = new _messengerVue.MessengerVue();

var textsWaiter = new _textsWaiter.TextsWaiter({
  texts: _patrickTexts.texts
});

patrickMessengerVue.onMessageInput.push(function () {
  textsWaiter.setCanResume(true);
});

textsWaiter.slowlyApplyToTexts({
  onBeginWait: console.log,
  onBeginTyping: function onBeginTyping(text) {
    patrickMessengerVue.mainVue.setRobotIsTyping(true);
  },
  onEndTyping: function onEndTyping(text) {
    if (!(0, _textsWaiter.isWaitForInput)(text)) {
      patrickMessengerVue.mainVue.addMessage(_.extend(text, { fromUser: false, lastSeen: false }));
    }
    patrickMessengerVue.mainVue.setRobotIsTyping(false);
  },
  onEndOfTexts: console.log
});

},{"./messenger-vue.js":2,"./patrick-texts.js":3,"./texts-waiter.js":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

// For info regular input styling
var messengerContentEditableInput = '\n  <div class="_5rp7 _5rp8">\n    <div class="_1p1t">\n      <div class="_1p1v" id="placeholder-9igde" style="width: 100%;margin-left: -47px;padding: 20px 10px;">\n      Type a message...</div>\n    </div>\n    <div class="_5rpb">\n      <div aria-autocomplete="list" aria-describedby="placeholder-9igde" aria-expanded="false" aria-haspopup="false" aria-label="Type a message..." aria-owns="js_1yt" class="_5rpu" contenteditable="true" data-interaction-root-id="_c1m" role="combobox" spellcheck="true" tabindex="0" style="outline: none; white-space: pre-wrap; word-wrap: break-word;">\n      </div>\n    </div>\n  </div>\n';

var MessengerVue = exports.MessengerVue = function MessengerVue() {
  _classCallCheck(this, MessengerVue);

  var self = this;
  this.onMessageInput = [];

  this.mainVue = new Vue({
    el: '#js_1',

    template: '\n        <div>\n          <h4 class="_497p _2lpt">\n            <time class="_3oh-"><span id=\'time\'>{{now}}</span></time>\n          </h4>\n          <message-groups-iterator v-bind:messageGroups="messageGroups"\n            v-bind:robotIsTyping="robotIsTyping"\n          >\n          </message-groups-iterator >\n        </div>\n      ',

    data: {
      robotIsTyping: false,

      messages: [{ text: 'coucou ?', fromUser: true, lastSeen: true }]
    },

    methods: {
      addMessage: function addMessage(message) {
        this.messages.push(message);
      },
      setRobotIsTyping: function setRobotIsTyping(robotIsTyping) {
        this.robotIsTyping = robotIsTyping;
      }
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

  this.onMessageInput.push(this.mainVue.addMessage);

  this.inputVue = new Vue({
    el: '#inputBlock',

    data: {
      newMessageText: ''
    },

    // template: messengerContentEditableInput,
    template: '\n        <div class="_5rp7 _5rp8">\n          <input\n            autofocus\n            placeholder="Type a message..." \n            style="width: 100%;margin-left: -47px; padding: 20px 10px;"\n            v-model="newMessageText"\n            @keyup.enter="onNewMessageInput"\n          >\n        </div>\n      ',

    methods: {
      // sendNewMessage (text) {
      //   self.mainVue.addMessage({ text: text, fromUser: true })
      // },
      onNewMessageInput: function onNewMessageInput() {
        var text = this.newMessageText;
        _.each(self.onMessageInput, function (func) {
          return func({ text: text, fromUser: true });
        });
        this.newMessageText = '';
      }
    }
  });
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var texts = exports.texts = [{
  text: 'salut'
}, {
  text: '__input__1'
}, {
  text: 'dis moi'
}, {
  text: "j'ai rien a ecouter la"
}, {
  text: "tu m'avais parle d'un groupe"
}, {
  text: "c'etait quoi deja ?"
}, {
  text: '__input__2',
  waitTime: 0.1
}, {
  text: 'Hm ha oui.'
}, {
  text: "C'est cool."
}, {
  text: 'ca va toi sinon ? depuis la derniere fois ...mes conseils ont été utiles ?'
}, {
  text: 'en vrai'
}, {
  text: "j'ai vu les photos sur facebook... t'avais l'air en forme dessus. ca m'a fait plaisir."
}, {
  text: ';)'
}, {
  text: 'enfin. je connais ces moments tsais'
}, {
  text: 'dur de communiquer'
}, {
  text: 'ds le brouillard'
}, {
  text: 'peurs irrationnelles'
}, {
  text: 'bref.'
}, {
  text: "d'ailleurs"
}, {
  text: "t'as pas 2 minutes la ? J'ai besoin de ton avis sur un truc un peu perso"
}, {
  text: '__input__3'
}, {
  text: 'cool merci. je te fais confiance pour garder ca pour toi hein.'
}, {
  text: "d'ailleurs"
}];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// text Model
// text = {
//  text : ''
//  waitTime,
//  typingTime
// }

var waitTime = function waitTime(_ref) {
  var text = _ref.text,
      _ref$waitTime = _ref.waitTime,
      waitTime = _ref$waitTime === undefined ? null : _ref$waitTime;
  return !_.isNull(waitTime) ? waitTime * 1000 : Math.random() * 5 * 1000;
};
var typingTime = function typingTime(_ref2) {
  var text = _ref2.text,
      _ref2$typingTime = _ref2.typingTime,
      typingTime = _ref2$typingTime === undefined ? null : _ref2$typingTime;
  return !_.isNull(typingTime) ? typingTime * 1000 : (text.length + 20 * Math.random()) / 8 * 1000;
};
var isWaitForInput = exports.isWaitForInput = function isWaitForInput(_ref3) {
  var text = _ref3.text;
  return _.includes(text, '__input__');
};

var TextsWaiter = exports.TextsWaiter = function () {
  function TextsWaiter(_ref4) {
    var texts = _ref4.texts;

    _classCallCheck(this, TextsWaiter);

    this.texts = texts;
    this.canResume = false;
  }

  _createClass(TextsWaiter, [{
    key: 'setCanResume',
    value: function setCanResume(canResume) {
      this.canResume = canResume;
    }
  }, {
    key: 'slowlyApplyToTexts',
    value: function slowlyApplyToTexts(_ref5) {
      var _this = this;

      var onBeginWait = _ref5.onBeginWait,
          onBeginTyping = _ref5.onBeginTyping,
          onEndTyping = _ref5.onEndTyping,
          onBeginWaitForInput = _ref5.onBeginWaitForInput,
          onInputReceived = _ref5.onInputReceived,
          onEndOfTexts = _ref5.onEndOfTexts;

      var processNextText = function processNextText() {
        if (!_.isEmpty(_this.texts)) return processText(_this.texts.shift());
        onEndOfTexts();
      };

      var processText = function processText(text) {
        var endOfProcessing = function endOfProcessing() {
          onEndTyping(text);
          processNextText();
        };

        var startTyping = function startTyping() {
          onBeginTyping(text);
          setTimeout(endOfProcessing, typingTime(text));
        };

        var startWaiting = function startWaiting() {
          var continueWaiting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

          onBeginWait(text);

          if (continueWaiting && !_this.canResume) return setTimeout(_.partial(startWaiting, continueWaiting), waitTime(text));

          return setTimeout(startTyping, waitTime(text));
        };

        if (isWaitForInput(text)) {
          var defaultInputTextParams = {
            waitTime: 0.1,
            typingTime: 0
          };
          text = _.defaults(text, defaultInputTextParams);

          _this.canResume = false;

          return startWaiting(true);
        }

        return startWaiting();
      };

      processNextText();
    }
  }]);

  return TextsWaiter;
}();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvaW5kZXguanMiLCJlczYvbWVzc2VuZ2VyLXZ1ZS5qcyIsImVzNi9wYXRyaWNrLXRleHRzLmpzIiwiZXM2L3RleHRzLXdhaXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBTSxzQkFBc0IsZ0NBQTVCOztBQUVBLElBQU0sY0FBYyw2QkFBZ0I7QUFDbEM7QUFEa0MsQ0FBaEIsQ0FBcEI7O0FBSUEsb0JBQW9CLGNBQXBCLENBQW1DLElBQW5DLENBQXdDLFlBQU07QUFDNUMsY0FBWSxZQUFaLENBQXlCLElBQXpCO0FBQ0QsQ0FGRDs7QUFJQSxZQUFZLGtCQUFaLENBQStCO0FBQzdCLGVBQWEsUUFBUSxHQURRO0FBRTdCLGlCQUFlLHVCQUFDLElBQUQsRUFBVTtBQUN2Qix3QkFBb0IsT0FBcEIsQ0FBNEIsZ0JBQTVCLENBQTZDLElBQTdDO0FBQ0QsR0FKNEI7QUFLN0IsZUFBYSxxQkFBQyxJQUFELEVBQVU7QUFDckIsUUFBSSxDQUFDLGlDQUFlLElBQWYsQ0FBTCxFQUEyQjtBQUN6QiwwQkFBb0IsT0FBcEIsQ0FBNEIsVUFBNUIsQ0FBdUMsRUFBRSxNQUFGLENBQVMsSUFBVCxFQUNyQyxFQUFFLFVBQVUsS0FBWixFQUFtQixVQUFVLEtBQTdCLEVBRHFDLENBQXZDO0FBR0Q7QUFDRCx3QkFBb0IsT0FBcEIsQ0FBNEIsZ0JBQTVCLENBQTZDLEtBQTdDO0FBQ0QsR0FaNEI7QUFhN0IsZ0JBQWMsUUFBUTtBQWJPLENBQS9COzs7Ozs7Ozs7OztBQ2RBLElBQUksU0FBSixDQUFjLHlCQUFkLEVBQXlDO0FBQ3ZDLFNBQU8sQ0FDTCxlQURLLENBRGdDO0FBSXZDO0FBSnVDLENBQXpDOztBQWVBLElBQUksU0FBSixDQUFjLDBCQUFkLEVBQTBDO0FBQ3hDLFNBQU8sQ0FDTCxjQURLLENB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QUUsUUFBRixDQUFXLElBQVgsRUFBaUIsc0JBQWpCLENBQVA7O0FBRUEsZ0JBQUssU0FBTCxHQUFpQixLQUFqQjs7QUFFQSxpQkFBTyxhQUFhLElBQWIsQ0FBUDtBQUNEOztBQUVELGVBQU8sY0FBUDtBQUNELE9BaENEOztBQWtDQTtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IE1lc3NlbmdlclZ1ZSB9IGZyb20gJy4vbWVzc2VuZ2VyLXZ1ZS5qcydcbmltcG9ydCB7IGlzV2FpdEZvcklucHV0LCBUZXh0c1dhaXRlciB9IGZyb20gJy4vdGV4dHMtd2FpdGVyLmpzJ1xuaW1wb3J0IHsgdGV4dHMgfSBmcm9tICcuL3BhdHJpY2stdGV4dHMuanMnXG5cbmNvbnN0IHBhdHJpY2tNZXNzZW5nZXJWdWUgPSBuZXcgTWVzc2VuZ2VyVnVlKClcblxuY29uc3QgdGV4dHNXYWl0ZXIgPSBuZXcgVGV4dHNXYWl0ZXIoe1xuICB0ZXh0c1xufSlcblxucGF0cmlja01lc3NlbmdlclZ1ZS5vbk1lc3NhZ2VJbnB1dC5wdXNoKCgpID0+IHtcbiAgdGV4dHNXYWl0ZXIuc2V0Q2FuUmVzdW1lKHRydWUpXG59KVxuXG50ZXh0c1dhaXRlci5zbG93bHlBcHBseVRvVGV4dHMoe1xuICBvbkJlZ2luV2FpdDogY29uc29sZS5sb2csXG4gIG9uQmVnaW5UeXBpbmc6ICh0ZXh0KSA9PiB7XG4gICAgcGF0cmlja01lc3NlbmdlclZ1ZS5tYWluVnVlLnNldFJvYm90SXNUeXBpbmcodHJ1ZSlcbiAgfSxcbiAgb25FbmRUeXBpbmc6ICh0ZXh0KSA9PiB7XG4gICAgaWYgKCFpc1dhaXRGb3JJbnB1dCh0ZXh0KSkge1xuICAgICAgcGF0cmlja01lc3NlbmdlclZ1ZS5tYWluVnVlLmFkZE1lc3NhZ2UoXy5leHRlbmQodGV4dCxcbiAgICAgICAgeyBmcm9tVXNlcjogZmFsc2UsIGxhc3RTZWVuOiBmYWxzZSB9XG4gICAgICApKVxuICAgIH1cbiAgICBwYXRyaWNrTWVzc2VuZ2VyVnVlLm1haW5WdWUuc2V0Um9ib3RJc1R5cGluZyhmYWxzZSlcbiAgfSxcbiAgb25FbmRPZlRleHRzOiBjb25zb2xlLmxvZ1xufSlcbiIsIlZ1ZS5jb21wb25lbnQoJ21lc3NhZ2UtZ3JvdXBzLWl0ZXJhdG9yJywge1xuICBwcm9wczogW1xuICAgICdtZXNzYWdlR3JvdXBzJ1xuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8bWVzc2FnZS1ncm91cC1kaXNwYXRjaGVyXG4gICAgICAgIHYtZm9yPVwibWVzc2FnZUdyb3VwIGluIG1lc3NhZ2VHcm91cHNcIlxuICAgICAgICB2LWJpbmQ6bWVzc2FnZUdyb3VwPVwibWVzc2FnZUdyb3VwXCJcbiAgICAgID5cbiAgICAgIDwvbWVzc2FnZS1ncm91cC1kaXNwYXRjaGVyPlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCdtZXNzYWdlLWdyb3VwLWRpc3BhdGNoZXInLCB7XG4gIHByb3BzOiBbXG4gICAgJ21lc3NhZ2VHcm91cCdcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dXNlci1tZXNzYWdlcy1jb250YWluZXJcbiAgICAgIHYtaWY9XCJtZXNzYWdlR3JvdXAuZnJvbVVzZXJcIlxuICAgICAgdi1iaW5kOnVzZXJNZXNzYWdlcz1cIm1lc3NhZ2VHcm91cC5tZXNzYWdlc1wiXG4gICAgPlxuICAgIDwvdXNlci1tZXNzYWdlcy1jb250YWluZXI+XG4gICAgPHJvYm90LW1lc3NhZ2VzLWNvbnRhaW5lclxuICAgICAgdi1lbHNlXG4gICAgICB2LWJpbmQ6cm9ib3RNZXNzYWdlcz1cIm1lc3NhZ2VHcm91cC5tZXNzYWdlc1wiXG4gICAgICB2LWJpbmQ6aXNUeXBpbmc9XCJtZXNzYWdlR3JvdXAuaXNUeXBpbmdcIlxuICAgID5cbiAgICA8L3JvYm90LW1lc3NhZ2VzLWNvbnRhaW5lcj5cbiAgYFxufSlcblxuVnVlLmNvbXBvbmVudCgndXNlci1tZXNzYWdlcy1jb250YWluZXInLCB7XG4gIHByb3BzOiBbJ3VzZXJNZXNzYWdlcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJfMXRfcCBjbGVhcmZpeFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIl80MXVkXCI+XG4gICAgICAgIDxoNSBjbGFzcz1cIl9paDMgXy1uZVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiXzNvaC1cIj5NaWNrYcOrbDwvc3Bhbj5cbiAgICAgICAgPC9oNT5cbiAgICAgICAgPHVzZXItbWVzc2FnZSBcbiAgICAgICAgICB2LWZvcj1cIm1lc3NhZ2UgaW4gdXNlck1lc3NhZ2VzXCIgXG4gICAgICAgICAgdi1iaW5kOm1lc3NhZ2U9XCJtZXNzYWdlXCJcbiAgICAgICAgPlxuICAgICAgICA8L3VzZXItbWVzc2FnZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCd1c2VyLW1lc3NhZ2UnLCB7XG4gIHByb3BzOiBbJ21lc3NhZ2UnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXggX280NiBfM2VyZyBfM2lfbSBfbmRfIGRpcmVjdGlvbl9sdHIgdGV4dF9hbGlnbl9sdHJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJfMzA1OCBfdWk5IF9oaDcgX3MxLSBfNTJtciBfNDNieSBfM29oLVwiIGlkPVwianNfMXpqXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJfYW9rXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJfM29oLSBfNThua1wiPnt7IG1lc3NhZ2UudGV4dCB9fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiXzQwZnVcIj48c3BhbiBjbGFzcz1cIl8ydV9kXCI+PC9zcGFuPjwvc3Bhbj5cbiAgICAgIDxsYXN0LXNlZW4tbWVzc2FnZS1ieS1yb2JvdCB2LWlmPVwibWVzc2FnZS5sYXN0U2VlblwiPlxuICAgICAgPC9sYXN0LXNlZW4tbWVzc2FnZS1ieS1yb2JvdD5cbiAgICA8L2Rpdj5cbiAgYFxufSlcblxuVnVlLmNvbXBvbmVudCgncm9ib3QtbWVzc2FnZXMtY29udGFpbmVyJywge1xuICBwcm9wczogWydyb2JvdE1lc3NhZ2VzJywgJ2lzVHlwaW5nJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIl8xdF9wIGNsZWFyZml4XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiXzF0X3FcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIl80bGR6IF8xdF9yXCIgZGF0YS10b29sdGlwLWNvbnRlbnQ9XCJQYXRyaWNrIEJhdGVtYW4gNDozNXBtXCIgZGF0YS1ob3Zlcj1cInRvb2x0aXBcIiBkYXRhLXRvb2x0aXAtcG9zaXRpb249XCJsZWZ0XCIgc3R5bGU9XCJ3aWR0aDogMzJweDsgaGVpZ2h0OiAzMnB4O1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJfNGxkLVwiIHN0eWxlPVwid2lkdGg6IDMycHg7IGhlaWdodDogMzJweDtcIj5cbiAgICAgICAgICAgIDxpbWcgYWx0PVwiUGF0cmljayBCYXRlbWFuXCIgc3JjPVwiLi9NZXNzZW5nZXJfZmlsZXMvMTc0OTkzOTJfMTY1MTE2NTkwNDkyNDM2MV84MDY5MTM5Mzc5OTU2ODgzMDlfbi5wbmdcIiBoZWlnaHQ9XCIzMlwiIHdpZHRoPVwiMzJcIiBjbGFzcz1cImltZ1wiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJfNGxkXyBfMnBvbVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIl8ycG9uIF8ycG9vXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJfNDF1ZFwiPlxuICAgICAgICA8aDUgY2xhc3M9XCJfaWgzIF8tbmVcIj48c3BhbiBjbGFzcz1cIl8zb2gtXCI+UGF0cmljayBCYXRlbWFuPC9zcGFuPlxuICAgICAgICA8L2g1PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXggX280NiBfM2VyZyBfMjlfNyBkaXJlY3Rpb25fbHRyIHRleHRfYWxpZ25fbHRyXCI+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtZm9yPVwibWVzc2FnZSBpbiByb2JvdE1lc3NhZ2VzXCI+XG4gICAgICAgICAgICA8cm9ib3QtbWVzc2FnZSB2LWJpbmQ6bWVzc2FnZT1cIm1lc3NhZ2VcIiA+XG4gICAgICAgICAgICA8L3JvYm90LW1lc3NhZ2U+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIl80MGZ1XCI+PHNwYW4gY2xhc3M9XCJfMnVfZFwiPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8bGFzdC1zZWVuLW1lc3NhZ2UtYnktcm9ib3Qgdi1pZj1cIm1lc3NhZ2UubGFzdFNlZW5cIj5cbiAgICAgICAgICAgIDwvbGFzdC1zZWVuLW1lc3NhZ2UtYnktcm9ib3Q+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8cm9ib3QtaXMtdHlwaW5nLWluZGljYXRvciBcbiAgICAgICAgICAgIHYtaWY9XCJpc1R5cGluZ1wiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvcm9ib3QtaXMtdHlwaW5nLWluZGljYXRvcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcblxuVnVlLmNvbXBvbmVudCgncm9ib3QtbWVzc2FnZScsIHtcbiAgcHJvcHM6IFsnbWVzc2FnZSddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJfMzA1OCBfdWk5IF9oaDcgX3MxLSBfNTJtciBfM29oLVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIl9hb2tcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJfM29oLSBfNThua1wiPnt7IG1lc3NhZ2UudGV4dCB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCdyb2JvdC1pcy10eXBpbmctaW5kaWNhdG9yJywge1xuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9J2pzbS1jaGF0LW1lc3NhZ2UganNtLWxlZnQganNtLXR5cGluZy1pbmRpY2F0b3InIHN0eWxlPSdtYXJnaW4tbGVmdDogMHB4Oyc+XG4gICAgICA8c3BhbiBjbGFzcz0nbm8td3JhcC1zcGFjZSc+PC9zcGFuPjxzcGFuIGNsYXNzPSduby13cmFwLXNwYWNlJz48L3NwYW4+PHNwYW4gY2xhc3M9J25vLXdyYXAtc3BhY2UnPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcblxuVnVlLmNvbXBvbmVudCgnbGFzdC1zZWVuLW1lc3NhZ2UtYnktcm9ib3QnLCB7XG4gIHRlbXBsYXRlOiBgPHNwYW4gY2xhc3M9XCJfNGp6cSBfamY0IF9qZjVcIj48aW1nIGFsdD1cIlNlZW4gYnkgUGF0cmljayBCYXRlbWFuIGF0IDQ6MzVwbVwiIGNsYXNzPVwiX2pmMiBpbWdcIiBzcmM9XCIuL01lc3Nlbmdlcl9maWxlcy8xNzQ5OTM5Ml8xNjUxMTY1OTA0OTI0MzYxXzgwNjkxMzkzNzk5NTY4ODMwOV9uLnBuZ1wiIHRpdGxlPVwiU2VlbiBieSBQYXRyaWNrXCI+PC9zcGFuPmBcbn0pXG5cbi8vIEZvciBpbmZvIHJlZ3VsYXIgaW5wdXQgc3R5bGluZ1xuY29uc3QgbWVzc2VuZ2VyQ29udGVudEVkaXRhYmxlSW5wdXQgPSBgXG4gIDxkaXYgY2xhc3M9XCJfNXJwNyBfNXJwOFwiPlxuICAgIDxkaXYgY2xhc3M9XCJfMXAxdFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIl8xcDF2XCIgaWQ9XCJwbGFjZWhvbGRlci05aWdkZVwiIHN0eWxlPVwid2lkdGg6IDEwMCU7bWFyZ2luLWxlZnQ6IC00N3B4O3BhZGRpbmc6IDIwcHggMTBweDtcIj5cbiAgICAgIFR5cGUgYSBtZXNzYWdlLi4uPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIl81cnBiXCI+XG4gICAgICA8ZGl2IGFyaWEtYXV0b2NvbXBsZXRlPVwibGlzdFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJwbGFjZWhvbGRlci05aWdkZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGFyaWEtaGFzcG9wdXA9XCJmYWxzZVwiIGFyaWEtbGFiZWw9XCJUeXBlIGEgbWVzc2FnZS4uLlwiIGFyaWEtb3ducz1cImpzXzF5dFwiIGNsYXNzPVwiXzVycHVcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIgZGF0YS1pbnRlcmFjdGlvbi1yb290LWlkPVwiX2MxbVwiIHJvbGU9XCJjb21ib2JveFwiIHNwZWxsY2hlY2s9XCJ0cnVlXCIgdGFiaW5kZXg9XCIwXCIgc3R5bGU9XCJvdXRsaW5lOiBub25lOyB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7IHdvcmQtd3JhcDogYnJlYWstd29yZDtcIj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbmBcblxuXG5leHBvcnQgY2xhc3MgTWVzc2VuZ2VyVnVlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgdGhpcy5vbk1lc3NhZ2VJbnB1dCA9IFtdXG5cbiAgICB0aGlzLm1haW5WdWUgPSBuZXcgVnVlKHtcbiAgICAgIGVsOiAnI2pzXzEnLFxuXG4gICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoNCBjbGFzcz1cIl80OTdwIF8ybHB0XCI+XG4gICAgICAgICAgICA8dGltZSBjbGFzcz1cIl8zb2gtXCI+PHNwYW4gaWQ9J3RpbWUnPnt7bm93fX08L3NwYW4+PC90aW1lPlxuICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgPG1lc3NhZ2UtZ3JvdXBzLWl0ZXJhdG9yIHYtYmluZDptZXNzYWdlR3JvdXBzPVwibWVzc2FnZUdyb3Vwc1wiXG4gICAgICAgICAgICB2LWJpbmQ6cm9ib3RJc1R5cGluZz1cInJvYm90SXNUeXBpbmdcIlxuICAgICAgICAgID5cbiAgICAgICAgICA8L21lc3NhZ2UtZ3JvdXBzLWl0ZXJhdG9yID5cbiAgICAgICAgPC9kaXY+XG4gICAgICBgLFxuXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHJvYm90SXNUeXBpbmc6IGZhbHNlLFxuXG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnY291Y291ID8nLCBmcm9tVXNlcjogdHJ1ZSwgbGFzdFNlZW46IHRydWUgfVxuICAgICAgICBdXG4gICAgICB9LFxuXG4gICAgICBtZXRob2RzOiB7XG4gICAgICAgIGFkZE1lc3NhZ2UgKG1lc3NhZ2UpIHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Um9ib3RJc1R5cGluZyAocm9ib3RJc1R5cGluZykge1xuICAgICAgICAgIHRoaXMucm9ib3RJc1R5cGluZyA9IHJvYm90SXNUeXBpbmdcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgJ25vdycgKCkge1xuICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKSArICc6JyArIGRhdGUuZ2V0TWludXRlcygpXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdyb3VwIG1lc3NhZ2VzIGluIGEgd2F5IHdlIGNhbiBjb25zdHJ1Y3RcbiAgICAgICAgICogdGhlIGNoYXQgaW50ZXJmYWNlXG4gICAgICAgICAqIGFuZCBhZGQgcmVsZXZhbnQgbWV0YWRhdGFcbiAgICAgICAgICovXG4gICAgICAgICdtZXNzYWdlR3JvdXBzJyAoKSB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZUdyb3VwcyA9IFtdXG5cbiAgICAgICAgICBfLmZvckVhY2godGhpcy5tZXNzYWdlcywgZnVuY3Rpb24gKG1lc3NhZ2UsIGtleSwgbWVzc2FnZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RNZXNzYWdlR3JvdXAgPSBfLmxhc3QobWVzc2FnZUdyb3VwcylcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZENyZWF0ZU5ld0dyb3VwID0gXy5pc0VtcHR5KGxhc3RNZXNzYWdlR3JvdXApIHx8XG4gICAgICAgICAgICAgIChsYXN0TWVzc2FnZUdyb3VwLmZyb21Vc2VyICE9PSBtZXNzYWdlLmZyb21Vc2VyKVxuXG4gICAgICAgICAgICBpZiAoc2hvdWxkQ3JlYXRlTmV3R3JvdXApIHtcbiAgICAgICAgICAgICAgY29uc3QgbmV3TWVzc2FnZUdyb3VwID0ge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbbWVzc2FnZV0sXG4gICAgICAgICAgICAgICAgZnJvbVVzZXI6IG1lc3NhZ2UuZnJvbVVzZXJcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG1lc3NhZ2VHcm91cHMucHVzaChuZXdNZXNzYWdlR3JvdXApXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsYXN0TWVzc2FnZUdyb3VwLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSlcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgLy8gQWRkaW5nIHR5cGluZyBpbmRpY2F0b3IgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2VHcm91cCA9IF8ubGFzdChtZXNzYWdlR3JvdXBzKVxuICAgICAgICAgIGNvbnN0IHNob3VsZENyZWF0ZU5ld1JvYm90R3JvdXAgPSBfLmlzRW1wdHkobGFzdE1lc3NhZ2VHcm91cCkgfHwgbGFzdE1lc3NhZ2VHcm91cC5mcm9tVXNlclxuXG4gICAgICAgICAgaWYgKHNob3VsZENyZWF0ZU5ld1JvYm90R3JvdXApIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1JvYm90TWVzc2FnZUdyb3VwID0ge1xuICAgICAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgICAgIGZyb21Vc2VyOiBmYWxzZSxcbiAgICAgICAgICAgICAgaXNUeXBpbmc6IHRoaXMucm9ib3RJc1R5cGluZ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZXNzYWdlR3JvdXBzLnB1c2gobmV3Um9ib3RNZXNzYWdlR3JvdXApXG5cbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlR3JvdXBzXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGFzdE1lc3NhZ2VHcm91cC5pc1R5cGluZyA9IHRoaXMucm9ib3RJc1R5cGluZ1xuXG4gICAgICAgICAgcmV0dXJuIG1lc3NhZ2VHcm91cHNcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLm9uTWVzc2FnZUlucHV0LnB1c2godGhpcy5tYWluVnVlLmFkZE1lc3NhZ2UpXG5cbiAgICB0aGlzLmlucHV0VnVlID0gbmV3IFZ1ZSh7XG4gICAgICBlbDogJyNpbnB1dEJsb2NrJyxcblxuICAgICAgZGF0YToge1xuICAgICAgICBuZXdNZXNzYWdlVGV4dDogJydcbiAgICAgIH0sXG5cbiAgICAgIC8vIHRlbXBsYXRlOiBtZXNzZW5nZXJDb250ZW50RWRpdGFibGVJbnB1dCxcbiAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJfNXJwNyBfNXJwOFwiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlR5cGUgYSBtZXNzYWdlLi4uXCIgXG4gICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDAlO21hcmdpbi1sZWZ0OiAtNDdweDsgcGFkZGluZzogMjBweCAxMHB4O1wiXG4gICAgICAgICAgICB2LW1vZGVsPVwibmV3TWVzc2FnZVRleHRcIlxuICAgICAgICAgICAgQGtleXVwLmVudGVyPVwib25OZXdNZXNzYWdlSW5wdXRcIlxuICAgICAgICAgID5cbiAgICAgICAgPC9kaXY+XG4gICAgICBgLFxuXG4gICAgICBtZXRob2RzOiB7XG4gICAgICAgIC8vIHNlbmROZXdNZXNzYWdlICh0ZXh0KSB7XG4gICAgICAgIC8vICAgc2VsZi5tYWluVnVlLmFkZE1lc3NhZ2UoeyB0ZXh0OiB0ZXh0LCBmcm9tVXNlcjogdHJ1ZSB9KVxuICAgICAgICAvLyB9LFxuICAgICAgICBvbk5ld01lc3NhZ2VJbnB1dCAoKSB7XG4gICAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMubmV3TWVzc2FnZVRleHRcbiAgICAgICAgICBfLmVhY2goc2VsZi5vbk1lc3NhZ2VJbnB1dCwgZnVuYyA9PiBmdW5jKHsgdGV4dDogdGV4dCwgZnJvbVVzZXI6IHRydWUgfSkpXG4gICAgICAgICAgdGhpcy5uZXdNZXNzYWdlVGV4dCA9ICcnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgdGV4dHMgPSBbXG4gIHtcbiAgICB0ZXh0OiAnc2FsdXQnXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnX19pbnB1dF9fMSdcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdkaXMgbW9pJ1xuICB9LFxuICB7XG4gICAgdGV4dDogXCJqJ2FpIHJpZW4gYSBlY291dGVyIGxhXCJcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwidHUgbSdhdmFpcyBwYXJsZSBkJ3VuIGdyb3VwZVwiXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcImMnZXRhaXQgcXVvaSBkZWphID9cIlxuICB9LFxuICB7XG4gICAgdGV4dDogJ19faW5wdXRfXzInLFxuICAgIHdhaXRUaW1lOiAwLjFcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdIbSBoYSBvdWkuJ1xuICB9LFxuICB7XG4gICAgdGV4dDogXCJDJ2VzdCBjb29sLlwiXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnY2EgdmEgdG9pIHNpbm9uID8gZGVwdWlzIGxhIGRlcm5pZXJlIGZvaXMgLi4ubWVzIGNvbnNlaWxzIG9udCDDqXTDqSB1dGlsZXMgPydcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdlbiB2cmFpJ1xuICB9LFxuICB7XG4gICAgdGV4dDogXCJqJ2FpIHZ1IGxlcyBwaG90b3Mgc3VyIGZhY2Vib29rLi4uIHQnYXZhaXMgbCdhaXIgZW4gZm9ybWUgZGVzc3VzLiBjYSBtJ2EgZmFpdCBwbGFpc2lyLlwiXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnOyknXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnZW5maW4uIGplIGNvbm5haXMgY2VzIG1vbWVudHMgdHNhaXMnXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnZHVyIGRlIGNvbW11bmlxdWVyJ1xuICB9LFxuICB7XG4gICAgdGV4dDogJ2RzIGxlIGJyb3VpbGxhcmQnXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAncGV1cnMgaXJyYXRpb25uZWxsZXMnXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnYnJlZi4nXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcImQnYWlsbGV1cnNcIlxuICB9LFxuICB7XG4gICAgdGV4dDogXCJ0J2FzIHBhcyAyIG1pbnV0ZXMgbGEgPyBKJ2FpIGJlc29pbiBkZSB0b24gYXZpcyBzdXIgdW4gdHJ1YyB1biBwZXUgcGVyc29cIlxuICB9LFxuICB7XG4gICAgdGV4dDogJ19faW5wdXRfXzMnXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnY29vbCBtZXJjaS4gamUgdGUgZmFpcyBjb25maWFuY2UgcG91ciBnYXJkZXIgY2EgcG91ciB0b2kgaGVpbi4nXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcImQnYWlsbGV1cnNcIlxuICB9XG5dXG4iLCIvLyB0ZXh0IE1vZGVsXG4vLyB0ZXh0ID0ge1xuLy8gIHRleHQgOiAnJ1xuLy8gIHdhaXRUaW1lLFxuLy8gIHR5cGluZ1RpbWVcbi8vIH1cblxuY29uc3Qgd2FpdFRpbWUgPSAoe3RleHQsIHdhaXRUaW1lID0gbnVsbH0pID0+ICFfLmlzTnVsbCh3YWl0VGltZSkgPyB3YWl0VGltZSAqIDEwMDAgOiBNYXRoLnJhbmRvbSgpICogNSAqIDEwMDBcbmNvbnN0IHR5cGluZ1RpbWUgPSAoe3RleHQsIHR5cGluZ1RpbWUgPSBudWxsfSkgPT4gIV8uaXNOdWxsKHR5cGluZ1RpbWUpID8gdHlwaW5nVGltZSAqIDEwMDAgOiAodGV4dC5sZW5ndGggKyAyMCAqIE1hdGgucmFuZG9tKCkpIC8gOCAqIDEwMDBcbmV4cG9ydCBjb25zdCBpc1dhaXRGb3JJbnB1dCA9ICh7dGV4dH0pID0+IF8uaW5jbHVkZXModGV4dCwgJ19faW5wdXRfXycpXG5cbmV4cG9ydCBjbGFzcyBUZXh0c1dhaXRlciB7XG4gIGNvbnN0cnVjdG9yICh7XG4gICAgdGV4dHNcbiAgfSkge1xuICAgIHRoaXMudGV4dHMgPSB0ZXh0c1xuICAgIHRoaXMuY2FuUmVzdW1lID0gZmFsc2VcbiAgfVxuXG4gIHNldENhblJlc3VtZSAoY2FuUmVzdW1lKSB7XG4gICAgdGhpcy5jYW5SZXN1bWUgPSBjYW5SZXN1bWVcbiAgfVxuXG4gIHNsb3dseUFwcGx5VG9UZXh0cyAoe1xuICAgIG9uQmVnaW5XYWl0LFxuICAgIG9uQmVnaW5UeXBpbmcsXG4gICAgb25FbmRUeXBpbmcsXG4gICAgb25CZWdpbldhaXRGb3JJbnB1dCxcbiAgICBvbklucHV0UmVjZWl2ZWQsXG4gICAgb25FbmRPZlRleHRzXG4gIH0pIHtcbiAgICBjb25zdCBwcm9jZXNzTmV4dFRleHQgPSAoKSA9PiB7XG4gICAgICBpZiAoIV8uaXNFbXB0eSh0aGlzLnRleHRzKSkgcmV0dXJuIHByb2Nlc3NUZXh0KHRoaXMudGV4dHMuc2hpZnQoKSlcbiAgICAgIG9uRW5kT2ZUZXh0cygpXG4gICAgfVxuXG4gICAgY29uc3QgcHJvY2Vzc1RleHQgPSAodGV4dCkgPT4ge1xuICAgICAgY29uc3QgZW5kT2ZQcm9jZXNzaW5nID0gKCkgPT4ge1xuICAgICAgICBvbkVuZFR5cGluZyh0ZXh0KVxuICAgICAgICBwcm9jZXNzTmV4dFRleHQoKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzdGFydFR5cGluZyA9ICgpID0+IHtcbiAgICAgICAgb25CZWdpblR5cGluZyh0ZXh0KVxuICAgICAgICBzZXRUaW1lb3V0KGVuZE9mUHJvY2Vzc2luZywgdHlwaW5nVGltZSh0ZXh0KSlcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RhcnRXYWl0aW5nID0gKGNvbnRpbnVlV2FpdGluZyA9IGZhbHNlKSA9PiB7XG4gICAgICAgIG9uQmVnaW5XYWl0KHRleHQpXG5cbiAgICAgICAgaWYgKGNvbnRpbnVlV2FpdGluZyAmJiAhdGhpcy5jYW5SZXN1bWUpIHJldHVybiBzZXRUaW1lb3V0KF8ucGFydGlhbChzdGFydFdhaXRpbmcsIGNvbnRpbnVlV2FpdGluZyksIHdhaXRUaW1lKHRleHQpKVxuXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KHN0YXJ0VHlwaW5nLCB3YWl0VGltZSh0ZXh0KSlcbiAgICAgIH1cblxuICAgICAgaWYgKGlzV2FpdEZvcklucHV0KHRleHQpKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRJbnB1dFRleHRQYXJhbXMgPSB7XG4gICAgICAgICAgd2FpdFRpbWU6IDAuMSxcbiAgICAgICAgICB0eXBpbmdUaW1lOiAwXG4gICAgICAgIH1cbiAgICAgICAgdGV4dCA9IF8uZGVmYXVsdHModGV4dCwgZGVmYXVsdElucHV0VGV4dFBhcmFtcylcblxuICAgICAgICB0aGlzLmNhblJlc3VtZSA9IGZhbHNlXG5cbiAgICAgICAgcmV0dXJuIHN0YXJ0V2FpdGluZyh0cnVlKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RhcnRXYWl0aW5nKClcbiAgICB9XG5cbiAgICBwcm9jZXNzTmV4dFRleHQoKVxuICB9XG59XG4iXX0=

//# sourceMappingURL=maps/index.js.map
