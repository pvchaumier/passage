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
var messengerContentEditableInput = '\n  <div class="_5rp7 _5rp8">\n    <div class="_1p1t">\n      <div class="_1p1v" id="placeholder-9igde">\n      Type a message...</div>\n    </div>\n    <div class="_5rpb">\n      <div aria-autocomplete="list" aria-describedby="placeholder-9igde" aria-expanded="false" aria-haspopup="false" aria-label="Type a message..." aria-owns="js_1yt" class="_5rpu" contenteditable="true" data-interaction-root-id="_c1m" role="combobox" spellcheck="true" tabindex="0" style="outline: none; white-space: pre-wrap; word-wrap: break-word;">\n      </div>\n    </div>\n  </div>\n';

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
    template: '\n        <div class="_5rp7 _5rp8">\n          <input\n            autofocus\n            placeholder="Type a message..." \n            v-model="newMessageText"\n            @keyup.enter="onNewMessageInput"\n          >\n        </div>\n      ',

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvaW5kZXguanMiLCJlczYvbWVzc2VuZ2VyLXZ1ZS5qcyIsImVzNi9wYXRyaWNrLXRleHRzLmpzIiwiZXM2L3RleHRzLXdhaXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBTSxzQkFBc0IsZ0NBQTVCOztBQUVBLElBQU0sY0FBYyw2QkFBZ0I7QUFDbEM7QUFEa0MsQ0FBaEIsQ0FBcEI7O0FBSUEsb0JBQW9CLGNBQXBCLENBQW1DLElBQW5DLENBQXdDLFlBQU07QUFDNUMsY0FBWSxZQUFaLENBQXlCLElBQXpCO0FBQ0QsQ0FGRDs7QUFJQSxZQUFZLGtCQUFaLENBQStCO0FBQzdCLGVBQWEsUUFBUSxHQURRO0FBRTdCLGlCQUFlLHVCQUFDLElBQUQsRUFBVTtBQUN2Qix3QkFBb0IsT0FBcEIsQ0FBNEIsZ0JBQTVCLENBQTZDLElBQTdDO0FBQ0QsR0FKNEI7QUFLN0IsZUFBYSxxQkFBQyxJQUFELEVBQVU7QUFDckIsUUFBSSxDQUFDLGlDQUFlLElBQWYsQ0FBTCxFQUEyQjtBQUN6QiwwQkFBb0IsT0FBcEIsQ0FBNEIsVUFBNUIsQ0FBdUMsRUFBRSxNQUFGLENBQVMsSUFBVCxFQUNyQyxFQUFFLFVBQVUsS0FBWixFQUFtQixVQUFVLEtBQTdCLEVBRHFDLENBQXZDO0FBR0Q7QUFDRCx3QkFBb0IsT0FBcEIsQ0FBNEIsZ0JBQTVCLENBQTZDLEtBQTdDO0FBQ0QsR0FaNEI7QUFhN0IsZ0JBQWMsUUFBUTtBQWJPLENBQS9COzs7Ozs7Ozs7OztBQ2RBLElBQUksU0FBSixDQUFjLHlCQUFkLEVBQXlDO0FBQ3ZDLFNBQU8sQ0FDTCxlQURLLENBRGdDO0FBSXZDO0FBSnVDLENBQXpDOztBQWVBLElBQUksU0FBSixDQUFjLDBCQUFkLEVBQTBDO0FBQ3hDLFNBQU8sQ0FDTCxjQURLLENBRGlDO0FBSXhDO0FBSndDLENBQTFDOztB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c0JBQWpCLENBQVA7O0FBRUEsZ0JBQUssU0FBTCxHQUFpQixLQUFqQjs7QUFFQSxpQkFBTyxhQUFhLElBQWIsQ0FBUDtBQUNEOztBQUVELGVBQU8sY0FBUDtBQUNELE9BaENEOztBQWtDQTtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IE1lc3NlbmdlclZ1ZSB9IGZyb20gJy4vbWVzc2VuZ2VyLXZ1ZS5qcydcbmltcG9ydCB7IGlzV2FpdEZvcklucHV0LCBUZXh0c1dhaXRlciB9IGZyb20gJy4vdGV4dHMtd2FpdGVyLmpzJ1xuaW1wb3J0IHsgdGV4dHMgfSBmcm9tICcuL3BhdHJpY2stdGV4dHMuanMnXG5cbmNvbnN0IHBhdHJpY2tNZXNzZW5nZXJWdWUgPSBuZXcgTWVzc2VuZ2VyVnVlKClcblxuY29uc3QgdGV4dHNXYWl0ZXIgPSBuZXcgVGV4dHNXYWl0ZXIoe1xuICB0ZXh0c1xufSlcblxucGF0cmlja01lc3NlbmdlclZ1ZS5vbk1lc3NhZ2VJbnB1dC5wdXNoKCgpID0+IHtcbiAgdGV4dHNXYWl0ZXIuc2V0Q2FuUmVzdW1lKHRydWUpXG59KVxuXG50ZXh0c1dhaXRlci5zbG93bHlBcHBseVRvVGV4dHMoe1xuICBvbkJlZ2luV2FpdDogY29uc29sZS5sb2csXG4gIG9uQmVnaW5UeXBpbmc6ICh0ZXh0KSA9PiB7XG4gICAgcGF0cmlja01lc3NlbmdlclZ1ZS5tYWluVnVlLnNldFJvYm90SXNUeXBpbmcodHJ1ZSlcbiAgfSxcbiAgb25FbmRUeXBpbmc6ICh0ZXh0KSA9PiB7XG4gICAgaWYgKCFpc1dhaXRGb3JJbnB1dCh0ZXh0KSkge1xuICAgICAgcGF0cmlja01lc3NlbmdlclZ1ZS5tYWluVnVlLmFkZE1lc3NhZ2UoXy5leHRlbmQodGV4dCxcbiAgICAgICAgeyBmcm9tVXNlcjogZmFsc2UsIGxhc3RTZWVuOiBmYWxzZSB9XG4gICAgICApKVxuICAgIH1cbiAgICBwYXRyaWNrTWVzc2VuZ2VyVnVlLm1haW5WdWUuc2V0Um9ib3RJc1R5cGluZyhmYWxzZSlcbiAgfSxcbiAgb25FbmRPZlRleHRzOiBjb25zb2xlLmxvZ1xufSlcbiIsIlZ1ZS5jb21wb25lbnQoJ21lc3NhZ2UtZ3JvdXBzLWl0ZXJhdG9yJywge1xuICBwcm9wczogW1xuICAgICdtZXNzYWdlR3JvdXBzJ1xuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8bWVzc2FnZS1ncm91cC1kaXNwYXRjaGVyXG4gICAgICAgIHYtZm9yPVwibWVzc2FnZUdyb3VwIGluIG1lc3NhZ2VHcm91cHNcIlxuICAgICAgICB2LWJpbmQ6bWVzc2FnZUdyb3VwPVwibWVzc2FnZUdyb3VwXCJcbiAgICAgID5cbiAgICAgIDwvbWVzc2FnZS1ncm91cC1kaXNwYXRjaGVyPlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCdtZXNzYWdlLWdyb3VwLWRpc3BhdGNoZXInLCB7XG4gIHByb3BzOiBbXG4gICAgJ21lc3NhZ2VHcm91cCdcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dXNlci1tZXNzYWdlcy1jb250YWluZXJcbiAgICAgIHYtaWY9XCJtZXNzYWdlR3JvdXAuZnJvbVVzZXJcIlxuICAgICAgdi1iaW5kOnVzZXJNZXNzYWdlcz1cIm1lc3NhZ2VHcm91cC5tZXNzYWdlc1wiXG4gICAgPlxuICAgIDwvdXNlci1tZXNzYWdlcy1jb250YWluZXI+XG4gICAgPHJvYm90LW1lc3NhZ2VzLWNvbnRhaW5lclxuICAgICAgdi1lbHNlXG4gICAgICB2LWJpbmQ6cm9ib3RNZXNzYWdlcz1cIm1lc3NhZ2VHcm91cC5tZXNzYWdlc1wiXG4gICAgICB2LWJpbmQ6aXNUeXBpbmc9XCJtZXNzYWdlR3JvdXAuaXNUeXBpbmdcIlxuICAgID5cbiAgICA8L3JvYm90LW1lc3NhZ2VzLWNvbnRhaW5lcj5cbiAgYFxufSlcblxuVnVlLmNvbXBvbmVudCgndXNlci1tZXNzYWdlcy1jb250YWluZXInLCB7XG4gIHByb3BzOiBbJ3VzZXJNZXNzYWdlcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJfMXRfcCBjbGVhcmZpeFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIl80MXVkXCI+XG4gICAgICAgIDxoNSBjbGFzcz1cIl9paDMgXy1uZVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiXzNvaC1cIj5NaWNrYcOrbDwvc3Bhbj5cbiAgICAgICAgPC9oNT5cbiAgICAgICAgPHVzZXItbWVzc2FnZSBcbiAgICAgICAgICB2LWZvcj1cIm1lc3NhZ2UgaW4gdXNlck1lc3NhZ2VzXCIgXG4gICAgICAgICAgdi1iaW5kOm1lc3NhZ2U9XCJtZXNzYWdlXCJcbiAgICAgICAgPlxuICAgICAgICA8L3VzZXItbWVzc2FnZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCd1c2VyLW1lc3NhZ2UnLCB7XG4gIHByb3BzOiBbJ21lc3NhZ2UnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXggX280NiBfM2VyZyBfM2lfbSBfbmRfIGRpcmVjdGlvbl9sdHIgdGV4dF9hbGlnbl9sdHJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJfMzA1OCBfdWk5IF9oaDcgX3MxLSBfNTJtciBfNDNieSBfM29oLVwiIGlkPVwianNfMXpqXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJfYW9rXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJfM29oLSBfNThua1wiPnt7IG1lc3NhZ2UudGV4dCB9fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiXzQwZnVcIj48c3BhbiBjbGFzcz1cIl8ydV9kXCI+PC9zcGFuPjwvc3Bhbj5cbiAgICAgIDxsYXN0LXNlZW4tbWVzc2FnZS1ieS1yb2JvdCB2LWlmPVwibWVzc2FnZS5sYXN0U2VlblwiPlxuICAgICAgPC9sYXN0LXNlZW4tbWVzc2FnZS1ieS1yb2JvdD5cbiAgICA8L2Rpdj5cbiAgYFxufSlcblxuVnVlLmNvbXBvbmVudCgncm9ib3QtbWVzc2FnZXMtY29udGFpbmVyJywge1xuICBwcm9wczogWydyb2JvdE1lc3NhZ2VzJywgJ2lzVHlwaW5nJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIl8xdF9wIGNsZWFyZml4XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiXzF0X3FcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIl80bGR6IF8xdF9yXCIgZGF0YS10b29sdGlwLWNvbnRlbnQ9XCJQYXRyaWNrIEJhdGVtYW4gNDozNXBtXCIgZGF0YS1ob3Zlcj1cInRvb2x0aXBcIiBkYXRhLXRvb2x0aXAtcG9zaXRpb249XCJsZWZ0XCIgc3R5bGU9XCJ3aWR0aDogMzJweDsgaGVpZ2h0OiAzMnB4O1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJfNGxkLVwiIHN0eWxlPVwid2lkdGg6IDMycHg7IGhlaWdodDogMzJweDtcIj5cbiAgICAgICAgICAgIDxpbWcgYWx0PVwiUGF0cmljayBCYXRlbWFuXCIgc3JjPVwiLi9NZXNzZW5nZXJfZmlsZXMvMTc0OTkzOTJfMTY1MTE2NTkwNDkyNDM2MV84MDY5MTM5Mzc5OTU2ODgzMDlfbi5wbmdcIiBoZWlnaHQ9XCIzMlwiIHdpZHRoPVwiMzJcIiBjbGFzcz1cImltZ1wiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJfNGxkXyBfMnBvbVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIl8ycG9uIF8ycG9vXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJfNDF1ZFwiPlxuICAgICAgICA8aDUgY2xhc3M9XCJfaWgzIF8tbmVcIj48c3BhbiBjbGFzcz1cIl8zb2gtXCI+UGF0cmljayBCYXRlbWFuPC9zcGFuPlxuICAgICAgICA8L2g1PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXggX280NiBfM2VyZyBfMjlfNyBkaXJlY3Rpb25fbHRyIHRleHRfYWxpZ25fbHRyXCI+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtZm9yPVwibWVzc2FnZSBpbiByb2JvdE1lc3NhZ2VzXCI+XG4gICAgICAgICAgICA8cm9ib3QtbWVzc2FnZSB2LWJpbmQ6bWVzc2FnZT1cIm1lc3NhZ2VcIiA+XG4gICAgICAgICAgICA8L3JvYm90LW1lc3NhZ2U+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIl80MGZ1XCI+PHNwYW4gY2xhc3M9XCJfMnVfZFwiPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8bGFzdC1zZWVuLW1lc3NhZ2UtYnktcm9ib3Qgdi1pZj1cIm1lc3NhZ2UubGFzdFNlZW5cIj5cbiAgICAgICAgICAgIDwvbGFzdC1zZWVuLW1lc3NhZ2UtYnktcm9ib3Q+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8cm9ib3QtaXMtdHlwaW5nLWluZGljYXRvciBcbiAgICAgICAgICAgIHYtaWY9XCJpc1R5cGluZ1wiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvcm9ib3QtaXMtdHlwaW5nLWluZGljYXRvcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcblxuVnVlLmNvbXBvbmVudCgncm9ib3QtbWVzc2FnZScsIHtcbiAgcHJvcHM6IFsnbWVzc2FnZSddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJfMzA1OCBfdWk5IF9oaDcgX3MxLSBfNTJtciBfM29oLVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIl9hb2tcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJfM29oLSBfNThua1wiPnt7IG1lc3NhZ2UudGV4dCB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCdyb2JvdC1pcy10eXBpbmctaW5kaWNhdG9yJywge1xuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9J2pzbS1jaGF0LW1lc3NhZ2UganNtLWxlZnQganNtLXR5cGluZy1pbmRpY2F0b3InIHN0eWxlPSdtYXJnaW4tbGVmdDogMHB4Oyc+XG4gICAgICA8c3BhbiBjbGFzcz0nbm8td3JhcC1zcGFjZSc+PC9zcGFuPjxzcGFuIGNsYXNzPSduby13cmFwLXNwYWNlJz48L3NwYW4+PHNwYW4gY2xhc3M9J25vLXdyYXAtc3BhY2UnPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcblxuVnVlLmNvbXBvbmVudCgnbGFzdC1zZWVuLW1lc3NhZ2UtYnktcm9ib3QnLCB7XG4gIHRlbXBsYXRlOiBgPHNwYW4gY2xhc3M9XCJfNGp6cSBfamY0IF9qZjVcIj48aW1nIGFsdD1cIlNlZW4gYnkgUGF0cmljayBCYXRlbWFuIGF0IDQ6MzVwbVwiIGNsYXNzPVwiX2pmMiBpbWdcIiBzcmM9XCIuL01lc3Nlbmdlcl9maWxlcy8xNzQ5OTM5Ml8xNjUxMTY1OTA0OTI0MzYxXzgwNjkxMzkzNzk5NTY4ODMwOV9uLnBuZ1wiIHRpdGxlPVwiU2VlbiBieSBQYXRyaWNrXCI+PC9zcGFuPmBcbn0pXG5cbi8vIEZvciBpbmZvIHJlZ3VsYXIgaW5wdXQgc3R5bGluZ1xuY29uc3QgbWVzc2VuZ2VyQ29udGVudEVkaXRhYmxlSW5wdXQgPSBgXG4gIDxkaXYgY2xhc3M9XCJfNXJwNyBfNXJwOFwiPlxuICAgIDxkaXYgY2xhc3M9XCJfMXAxdFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIl8xcDF2XCIgaWQ9XCJwbGFjZWhvbGRlci05aWdkZVwiPlxuICAgICAgVHlwZSBhIG1lc3NhZ2UuLi48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiXzVycGJcIj5cbiAgICAgIDxkaXYgYXJpYS1hdXRvY29tcGxldGU9XCJsaXN0XCIgYXJpYS1kZXNjcmliZWRieT1cInBsYWNlaG9sZGVyLTlpZ2RlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1oYXNwb3B1cD1cImZhbHNlXCIgYXJpYS1sYWJlbD1cIlR5cGUgYSBtZXNzYWdlLi4uXCIgYXJpYS1vd25zPVwianNfMXl0XCIgY2xhc3M9XCJfNXJwdVwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiBkYXRhLWludGVyYWN0aW9uLXJvb3QtaWQ9XCJfYzFtXCIgcm9sZT1cImNvbWJvYm94XCIgc3BlbGxjaGVjaz1cInRydWVcIiB0YWJpbmRleD1cIjBcIiBzdHlsZT1cIm91dGxpbmU6IG5vbmU7IHdoaXRlLXNwYWNlOiBwcmUtd3JhcDsgd29yZC13cmFwOiBicmVhay13b3JkO1wiPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYFxuXG5cbmV4cG9ydCBjbGFzcyBNZXNzZW5nZXJWdWUge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICB0aGlzLm9uTWVzc2FnZUlucHV0ID0gW11cblxuICAgIHRoaXMubWFpblZ1ZSA9IG5ldyBWdWUoe1xuICAgICAgZWw6ICcjanNfMScsXG5cbiAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGg0IGNsYXNzPVwiXzQ5N3AgXzJscHRcIj5cbiAgICAgICAgICAgIDx0aW1lIGNsYXNzPVwiXzNvaC1cIj48c3BhbiBpZD0ndGltZSc+e3tub3d9fTwvc3Bhbj48L3RpbWU+XG4gICAgICAgICAgPC9oND5cbiAgICAgICAgICA8bWVzc2FnZS1ncm91cHMtaXRlcmF0b3Igdi1iaW5kOm1lc3NhZ2VHcm91cHM9XCJtZXNzYWdlR3JvdXBzXCJcbiAgICAgICAgICAgIHYtYmluZDpyb2JvdElzVHlwaW5nPVwicm9ib3RJc1R5cGluZ1wiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvbWVzc2FnZS1ncm91cHMtaXRlcmF0b3IgPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIGAsXG5cbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcm9ib3RJc1R5cGluZzogZmFsc2UsXG5cbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdjb3Vjb3UgPycsIGZyb21Vc2VyOiB0cnVlLCBsYXN0U2VlbjogdHJ1ZSB9XG4gICAgICAgIF1cbiAgICAgIH0sXG5cbiAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgYWRkTWVzc2FnZSAobWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMubWVzc2FnZXMucHVzaChtZXNzYWdlKVxuICAgICAgICB9LFxuICAgICAgICBzZXRSb2JvdElzVHlwaW5nIChyb2JvdElzVHlwaW5nKSB7XG4gICAgICAgICAgdGhpcy5yb2JvdElzVHlwaW5nID0gcm9ib3RJc1R5cGluZ1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBjb21wdXRlZDoge1xuICAgICAgICAnbm93JyAoKSB7XG4gICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpICsgJzonICsgZGF0ZS5nZXRNaW51dGVzKClcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogR3JvdXAgbWVzc2FnZXMgaW4gYSB3YXkgd2UgY2FuIGNvbnN0cnVjdFxuICAgICAgICAgKiB0aGUgY2hhdCBpbnRlcmZhY2VcbiAgICAgICAgICogYW5kIGFkZCByZWxldmFudCBtZXRhZGF0YVxuICAgICAgICAgKi9cbiAgICAgICAgJ21lc3NhZ2VHcm91cHMnICgpIHtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlR3JvdXBzID0gW11cblxuICAgICAgICAgIF8uZm9yRWFjaCh0aGlzLm1lc3NhZ2VzLCBmdW5jdGlvbiAobWVzc2FnZSwga2V5LCBtZXNzYWdlcykge1xuICAgICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2VHcm91cCA9IF8ubGFzdChtZXNzYWdlR3JvdXBzKVxuICAgICAgICAgICAgY29uc3Qgc2hvdWxkQ3JlYXRlTmV3R3JvdXAgPSBfLmlzRW1wdHkobGFzdE1lc3NhZ2VHcm91cCkgfHxcbiAgICAgICAgICAgICAgKGxhc3RNZXNzYWdlR3JvdXAuZnJvbVVzZXIgIT09IG1lc3NhZ2UuZnJvbVVzZXIpXG5cbiAgICAgICAgICAgIGlmIChzaG91bGRDcmVhdGVOZXdHcm91cCkge1xuICAgICAgICAgICAgICBjb25zdCBuZXdNZXNzYWdlR3JvdXAgPSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFttZXNzYWdlXSxcbiAgICAgICAgICAgICAgICBmcm9tVXNlcjogbWVzc2FnZS5mcm9tVXNlclxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbWVzc2FnZUdyb3Vwcy5wdXNoKG5ld01lc3NhZ2VHcm91cClcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxhc3RNZXNzYWdlR3JvdXAubWVzc2FnZXMucHVzaChtZXNzYWdlKVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICAvLyBBZGRpbmcgdHlwaW5nIGluZGljYXRvciBpZiBuZWNlc3NhcnlcbiAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZUdyb3VwID0gXy5sYXN0KG1lc3NhZ2VHcm91cHMpXG4gICAgICAgICAgY29uc3Qgc2hvdWxkQ3JlYXRlTmV3Um9ib3RHcm91cCA9IF8uaXNFbXB0eShsYXN0TWVzc2FnZUdyb3VwKSB8fCBsYXN0TWVzc2FnZUdyb3VwLmZyb21Vc2VyXG5cbiAgICAgICAgICBpZiAoc2hvdWxkQ3JlYXRlTmV3Um9ib3RHcm91cCkge1xuICAgICAgICAgICAgY29uc3QgbmV3Um9ib3RNZXNzYWdlR3JvdXAgPSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICAgICAgZnJvbVVzZXI6IGZhbHNlLFxuICAgICAgICAgICAgICBpc1R5cGluZzogdGhpcy5yb2JvdElzVHlwaW5nXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lc3NhZ2VHcm91cHMucHVzaChuZXdSb2JvdE1lc3NhZ2VHcm91cClcblxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2VHcm91cHNcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsYXN0TWVzc2FnZUdyb3VwLmlzVHlwaW5nID0gdGhpcy5yb2JvdElzVHlwaW5nXG5cbiAgICAgICAgICByZXR1cm4gbWVzc2FnZUdyb3Vwc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHRoaXMub25NZXNzYWdlSW5wdXQucHVzaCh0aGlzLm1haW5WdWUuYWRkTWVzc2FnZSlcblxuICAgIHRoaXMuaW5wdXRWdWUgPSBuZXcgVnVlKHtcbiAgICAgIGVsOiAnI2lucHV0QmxvY2snLFxuXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG5ld01lc3NhZ2VUZXh0OiAnJ1xuICAgICAgfSxcblxuICAgICAgLy8gdGVtcGxhdGU6IG1lc3NlbmdlckNvbnRlbnRFZGl0YWJsZUlucHV0LFxuICAgICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIl81cnA3IF81cnA4XCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVHlwZSBhIG1lc3NhZ2UuLi5cIiBcbiAgICAgICAgICAgIHYtbW9kZWw9XCJuZXdNZXNzYWdlVGV4dFwiXG4gICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJvbk5ld01lc3NhZ2VJbnB1dFwiXG4gICAgICAgICAgPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIGAsXG5cbiAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgLy8gc2VuZE5ld01lc3NhZ2UgKHRleHQpIHtcbiAgICAgICAgLy8gICBzZWxmLm1haW5WdWUuYWRkTWVzc2FnZSh7IHRleHQ6IHRleHQsIGZyb21Vc2VyOiB0cnVlIH0pXG4gICAgICAgIC8vIH0sXG4gICAgICAgIG9uTmV3TWVzc2FnZUlucHV0ICgpIHtcbiAgICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5uZXdNZXNzYWdlVGV4dFxuICAgICAgICAgIF8uZWFjaChzZWxmLm9uTWVzc2FnZUlucHV0LCBmdW5jID0+IGZ1bmMoeyB0ZXh0OiB0ZXh0LCBmcm9tVXNlcjogdHJ1ZSB9KSlcbiAgICAgICAgICB0aGlzLm5ld01lc3NhZ2VUZXh0ID0gJydcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCB0ZXh0cyA9IFtcbiAge1xuICAgIHRleHQ6ICdzYWx1dCdcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdfX2lucHV0X18xJ1xuICB9LFxuICB7XG4gICAgdGV4dDogJ2RpcyBtb2knXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcImonYWkgcmllbiBhIGVjb3V0ZXIgbGFcIlxuICB9LFxuICB7XG4gICAgdGV4dDogXCJ0dSBtJ2F2YWlzIHBhcmxlIGQndW4gZ3JvdXBlXCJcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiYydldGFpdCBxdW9pIGRlamEgP1wiXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnX19pbnB1dF9fMicsXG4gICAgd2FpdFRpbWU6IDAuMVxuICB9LFxuICB7XG4gICAgdGV4dDogJ0htIGhhIG91aS4nXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcIkMnZXN0IGNvb2wuXCJcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdjYSB2YSB0b2kgc2lub24gPyBkZXB1aXMgbGEgZGVybmllcmUgZm9pcyAuLi5tZXMgY29uc2VpbHMgb250IMOpdMOpIHV0aWxlcyA/J1xuICB9LFxuICB7XG4gICAgdGV4dDogJ2VuIHZyYWknXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcImonYWkgdnUgbGVzIHBob3RvcyBzdXIgZmFjZWJvb2suLi4gdCdhdmFpcyBsJ2FpciBlbiBmb3JtZSBkZXNzdXMuIGNhIG0nYSBmYWl0IHBsYWlzaXIuXCJcbiAgfSxcbiAge1xuICAgIHRleHQ6ICc7KSdcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdlbmZpbi4gamUgY29ubmFpcyBjZXMgbW9tZW50cyB0c2FpcydcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdkdXIgZGUgY29tbXVuaXF1ZXInXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnZHMgbGUgYnJvdWlsbGFyZCdcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdwZXVycyBpcnJhdGlvbm5lbGxlcydcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdicmVmLidcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiZCdhaWxsZXVyc1wiXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcInQnYXMgcGFzIDIgbWludXRlcyBsYSA/IEonYWkgYmVzb2luIGRlIHRvbiBhdmlzIHN1ciB1biB0cnVjIHVuIHBldSBwZXJzb1wiXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnX19pbnB1dF9fMydcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdjb29sIG1lcmNpLiBqZSB0ZSBmYWlzIGNvbmZpYW5jZSBwb3VyIGdhcmRlciBjYSBwb3VyIHRvaSBoZWluLidcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiZCdhaWxsZXVyc1wiXG4gIH1cbl1cbiIsIi8vIHRleHQgTW9kZWxcbi8vIHRleHQgPSB7XG4vLyAgdGV4dCA6ICcnXG4vLyAgd2FpdFRpbWUsXG4vLyAgdHlwaW5nVGltZVxuLy8gfVxuXG5jb25zdCB3YWl0VGltZSA9ICh7dGV4dCwgd2FpdFRpbWUgPSBudWxsfSkgPT4gIV8uaXNOdWxsKHdhaXRUaW1lKSA/IHdhaXRUaW1lICogMTAwMCA6IE1hdGgucmFuZG9tKCkgKiA1ICogMTAwMFxuY29uc3QgdHlwaW5nVGltZSA9ICh7dGV4dCwgdHlwaW5nVGltZSA9IG51bGx9KSA9PiAhXy5pc051bGwodHlwaW5nVGltZSkgPyB0eXBpbmdUaW1lICogMTAwMCA6ICh0ZXh0Lmxlbmd0aCArIDIwICogTWF0aC5yYW5kb20oKSkgLyA4ICogMTAwMFxuZXhwb3J0IGNvbnN0IGlzV2FpdEZvcklucHV0ID0gKHt0ZXh0fSkgPT4gXy5pbmNsdWRlcyh0ZXh0LCAnX19pbnB1dF9fJylcblxuZXhwb3J0IGNsYXNzIFRleHRzV2FpdGVyIHtcbiAgY29uc3RydWN0b3IgKHtcbiAgICB0ZXh0c1xuICB9KSB7XG4gICAgdGhpcy50ZXh0cyA9IHRleHRzXG4gICAgdGhpcy5jYW5SZXN1bWUgPSBmYWxzZVxuICB9XG5cbiAgc2V0Q2FuUmVzdW1lIChjYW5SZXN1bWUpIHtcbiAgICB0aGlzLmNhblJlc3VtZSA9IGNhblJlc3VtZVxuICB9XG5cbiAgc2xvd2x5QXBwbHlUb1RleHRzICh7XG4gICAgb25CZWdpbldhaXQsXG4gICAgb25CZWdpblR5cGluZyxcbiAgICBvbkVuZFR5cGluZyxcbiAgICBvbkJlZ2luV2FpdEZvcklucHV0LFxuICAgIG9uSW5wdXRSZWNlaXZlZCxcbiAgICBvbkVuZE9mVGV4dHNcbiAgfSkge1xuICAgIGNvbnN0IHByb2Nlc3NOZXh0VGV4dCA9ICgpID0+IHtcbiAgICAgIGlmICghXy5pc0VtcHR5KHRoaXMudGV4dHMpKSByZXR1cm4gcHJvY2Vzc1RleHQodGhpcy50ZXh0cy5zaGlmdCgpKVxuICAgICAgb25FbmRPZlRleHRzKClcbiAgICB9XG5cbiAgICBjb25zdCBwcm9jZXNzVGV4dCA9ICh0ZXh0KSA9PiB7XG4gICAgICBjb25zdCBlbmRPZlByb2Nlc3NpbmcgPSAoKSA9PiB7XG4gICAgICAgIG9uRW5kVHlwaW5nKHRleHQpXG4gICAgICAgIHByb2Nlc3NOZXh0VGV4dCgpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN0YXJ0VHlwaW5nID0gKCkgPT4ge1xuICAgICAgICBvbkJlZ2luVHlwaW5nKHRleHQpXG4gICAgICAgIHNldFRpbWVvdXQoZW5kT2ZQcm9jZXNzaW5nLCB0eXBpbmdUaW1lKHRleHQpKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzdGFydFdhaXRpbmcgPSAoY29udGludWVXYWl0aW5nID0gZmFsc2UpID0+IHtcbiAgICAgICAgb25CZWdpbldhaXQodGV4dClcblxuICAgICAgICBpZiAoY29udGludWVXYWl0aW5nICYmICF0aGlzLmNhblJlc3VtZSkgcmV0dXJuIHNldFRpbWVvdXQoXy5wYXJ0aWFsKHN0YXJ0V2FpdGluZywgY29udGludWVXYWl0aW5nKSwgd2FpdFRpbWUodGV4dCkpXG5cbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoc3RhcnRUeXBpbmcsIHdhaXRUaW1lKHRleHQpKVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNXYWl0Rm9ySW5wdXQodGV4dCkpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdElucHV0VGV4dFBhcmFtcyA9IHtcbiAgICAgICAgICB3YWl0VGltZTogMC4xLFxuICAgICAgICAgIHR5cGluZ1RpbWU6IDBcbiAgICAgICAgfVxuICAgICAgICB0ZXh0ID0gXy5kZWZhdWx0cyh0ZXh0LCBkZWZhdWx0SW5wdXRUZXh0UGFyYW1zKVxuXG4gICAgICAgIHRoaXMuY2FuUmVzdW1lID0gZmFsc2VcblxuICAgICAgICByZXR1cm4gc3RhcnRXYWl0aW5nKHRydWUpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdGFydFdhaXRpbmcoKVxuICAgIH1cblxuICAgIHByb2Nlc3NOZXh0VGV4dCgpXG4gIH1cbn1cbiJdfQ==

//# sourceMappingURL=maps/index.js.map
