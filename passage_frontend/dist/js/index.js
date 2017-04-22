(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _vue = require('./vue.js');

var _master = require('./master.js');

var _patrickTexts = require('./patrick-texts.js');

_master.Master.slowlyApplyToTexts({
  texts: _patrickTexts.texts,
  onBeginWait: console.log,
  onBeginTyping: function onBeginTyping(text) {
    _vue.app.setRobotIsTyping(true);
  },
  onEndTyping: function onEndTyping(text) {
    _vue.app.setRobotIsTyping(false);
    _vue.app.addMessage(_.extend(text, { fromUser: false, lastSeen: false }));
  },
  onEndOfTexts: console.log
});

},{"./master.js":2,"./patrick-texts.js":3,"./vue.js":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Master = exports.Master = {};
// text Model
// text = {
//  text : ''
// }

var waitTime = function waitTime(_ref) {
  var text = _ref.text,
      _ref$waitTime = _ref.waitTime,
      waitTime = _ref$waitTime === undefined ? null : _ref$waitTime;
  return waitTime ? waitTime * 1000 : Math.random() * 5 * 1000;
};
var typingTime = function typingTime(_ref2) {
  var text = _ref2.text,
      _ref2$typingTime = _ref2.typingTime,
      typingTime = _ref2$typingTime === undefined ? null : _ref2$typingTime;
  return typingTime ? typingTime * 1000 : (text.length + 20 * Math.random()) / 8 * 1000;
};

Master.slowlyApplyToTexts = function (_ref3) {
  var texts = _ref3.texts,
      onBeginWait = _ref3.onBeginWait,
      onBeginTyping = _ref3.onBeginTyping,
      onEndTyping = _ref3.onEndTyping,
      onEndOfTexts = _ref3.onEndOfTexts;

  function processNextText() {
    if (!_.isEmpty(texts)) return processText(texts.shift());
    onEndOfTexts();
  }

  function processText(text) {
    var endOfProcessing = function endOfProcessing() {
      onEndTyping(text);
      processNextText();
    };

    var startTyping = function startTyping() {
      onBeginTyping(text);
      setTimeout(endOfProcessing, typingTime(text));
    };

    var startWaiting = function startWaiting() {
      onBeginWait(text);
      setTimeout(startTyping, waitTime(text));
    };

    startWaiting();
  }

  processNextText();
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
  text: '__input__2'
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

var app = exports.app = new Vue({
  el: '#js_1',

  template: '\n    <div>\n      <h4 class="_497p _2lpt">\n        <time class="_3oh-"><span id=\'time\'>{{now}}</span></time>\n      </h4>\n      <message-groups-iterator v-bind:messageGroups="messageGroups"\n        v-bind:robotIsTyping="robotIsTyping"\n      >\n      </message-groups-iterator >\n    </div>\n  ',

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

// For info
var messengerContentEditableInput = '\n  <div class="_5rp7 _5rp8">\n    <div class="_1p1t">\n      <div class="_1p1v" id="placeholder-9igde">\n      Type a message...</div>\n    </div>\n    <div class="_5rpb">\n      <div aria-autocomplete="list" aria-describedby="placeholder-9igde" aria-expanded="false" aria-haspopup="false" aria-label="Type a message..." aria-owns="js_1yt" class="_5rpu" contenteditable="true" data-interaction-root-id="_c1m" role="combobox" spellcheck="true" tabindex="0" style="outline: none; white-space: pre-wrap; word-wrap: break-word;">\n      </div>\n    </div>\n  </div>\n';

var inputApp = exports.inputApp = new Vue({
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvaW5kZXguanMiLCJlczYvbWFzdGVyLmpzIiwiZXM2L3BhdHJpY2stdGV4dHMuanMiLCJlczYvdnVlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFDQTs7QUFDQTs7QUFFQSxlQUFPLGtCQUFQLENBQTBCO0FBQ3hCLDRCQUR3QjtBQUV4QixlQUFhLFFBQVEsR0FGRztBQUd4QixpQkFBZSx1QkFBQyxJQUFELEVBQVU7QUFDdkIsYUFBSSxnQkFBSixDQUFxQixJQUFyQjtBQUNELEdBTHVCO0FBTXhCLGVBQWEscUJBQUMsSUFBRCxFQUFVO0FBQ3JCLGFBQUksZ0JBQUosQ0FBcUIsS0FBckI7QUFDQSxhQUFJLFVBQUosQ0FBZSxFQUFFLE1BQUYsQ0FBUyxJQUFULEVBQ2IsRUFBRSxVQUFVLEtBQVosRUFBbUIsVUFBVSxLQUE3QixFQURhLENBQWY7QUFHRCxHQVh1QjtBQVl4QixnQkFBYyxRQUFRO0FBWkUsQ0FBMUI7Ozs7Ozs7O0FDSk8sSUFBTSwwQkFBUyxFQUFmO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTSxXQUFXO0FBQUEsTUFBRSxJQUFGLFFBQUUsSUFBRjtBQUFBLDJCQUFRLFFBQVI7QUFBQSxNQUFRLFFBQVIsaUNBQW1CLElBQW5CO0FBQUEsU0FBNkIsV0FBVyxXQUFXLElBQXRCLEdBQTZCLEtBQUssTUFBTCxLQUFnQixDQUFoQixHQUFvQixJQUE5RTtBQUFBLENBQWpCO0FBQ0EsSUFBTSxhQUFhO0FBQUEsTUFBRSxJQUFGLFNBQUUsSUFBRjtBQUFBLCtCQUFRLFVBQVI7QUFBQSxNQUFRLFVBQVIsb0NBQXFCLElBQXJCO0FBQUEsU0FBK0IsYUFBYSxhQUFhLElBQTFCLEdBQWlDLENBQUMsS0FBSyxNQUFMLEdBQWMsS0FBSyxLQUFLLE1BQUwsRUFBcEIsSUFBcUMsQ0FBckMsR0FBeUMsSUFBekc7QUFBQSxDQUFuQjs7QUFFQSxPQUFP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LFFBQWpCLENBQTBCLElBQTFCLENBQStCLE9BQS9CO0FBQ0QsT0FoQkQ7O0FBa0JBO0FBQ0EsVUFBTSxtQkFBbUIsRUFBRSxJQUFGLENBQU8sYUFBUCxDQUF6QjtBQUNBLFVBQU0sNEJBQTRCLEVBQUUsT0FBRixDQUFVLGdCQUFWLEtBQStCLGlCQUFpQixRQUFsRjs7QUFFQSxVQUFJLHlCQUFKLEVBQStCO0FBQzdCLFlBQU0sdUJBQXVCO0FBQzNCLG9CQUFVLEVBRGlCO0FBRTNCLG9CQUFVLEtBRmlCO0FBRzNCLG9CQUFVLEtBQUs7QUFIWSxTQUE3Qjs7QUFNQSxzQkFBYyxJQUFkLENBQW1CLG9CQUFuQjs7QUFFQSxlQUFPLGFBQVA7QUFDRDs7QUFFRCx1QkFBaUIsUUFBakIsR0FBNEIsS0FBSyxhQUFqQzs7QUFFQSxhQUFPLGFBQVA7QUFDRDtBQW5ETztBQWhDZSxDQUFSLENBQVo7O0FBdUZQO0FBQ0EsSUFBTSxzbEJBQU47O0FBYU8sSUFBTSw4QkFBVyxJQUFJLEdBQUosQ0FBUTtBQUM5QixNQUFJLGFBRDBCOztBQUc5QixRQUFNO0FBQ0osb0JBQWdCO0FBRFosR0FId0I7O0FBTzlCO0FBQ0EsME5BUjhCOztBQW1COUIsV0FBUztBQUNQLG9CQUFnQiwwQkFBWTtBQUMxQixVQUFJLFFBQUosQ0FBYSxJQUFiLENBQWtCLEVBQUUsTUFBTSxLQUFLLGNBQWIsRUFBNkIsVUFBVSxJQUF2QyxFQUFsQjtBQUNBLFdBQUssY0FBTCxHQUFzQixFQUF0QjtBQUNEO0FBSk07QUFuQnFCLENBQVIsQ0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgYXBwLCBpbnB1dEFwcCB9IGZyb20gJy4vdnVlLmpzJ1xuaW1wb3J0IHsgTWFzdGVyIH0gZnJvbSAnLi9tYXN0ZXIuanMnXG5pbXBvcnQgeyB0ZXh0cyB9IGZyb20gJy4vcGF0cmljay10ZXh0cy5qcydcblxuTWFzdGVyLnNsb3dseUFwcGx5VG9UZXh0cyh7XG4gIHRleHRzLFxuICBvbkJlZ2luV2FpdDogY29uc29sZS5sb2csXG4gIG9uQmVnaW5UeXBpbmc6ICh0ZXh0KSA9PiB7XG4gICAgYXBwLnNldFJvYm90SXNUeXBpbmcodHJ1ZSlcbiAgfSxcbiAgb25FbmRUeXBpbmc6ICh0ZXh0KSA9PiB7XG4gICAgYXBwLnNldFJvYm90SXNUeXBpbmcoZmFsc2UpXG4gICAgYXBwLmFkZE1lc3NhZ2UoXy5leHRlbmQodGV4dCxcbiAgICAgIHsgZnJvbVVzZXI6IGZhbHNlLCBsYXN0U2VlbjogZmFsc2UgfVxuICAgICkpXG4gIH0sXG4gIG9uRW5kT2ZUZXh0czogY29uc29sZS5sb2dcbn0pXG4iLCJleHBvcnQgY29uc3QgTWFzdGVyID0ge31cbi8vIHRleHQgTW9kZWxcbi8vIHRleHQgPSB7XG4vLyAgdGV4dCA6ICcnXG4vLyB9XG5cbmNvbnN0IHdhaXRUaW1lID0gKHt0ZXh0LCB3YWl0VGltZSA9IG51bGx9KSA9PiB3YWl0VGltZSA/IHdhaXRUaW1lICogMTAwMCA6IE1hdGgucmFuZG9tKCkgKiA1ICogMTAwMFxuY29uc3QgdHlwaW5nVGltZSA9ICh7dGV4dCwgdHlwaW5nVGltZSA9IG51bGx9KSA9PiB0eXBpbmdUaW1lID8gdHlwaW5nVGltZSAqIDEwMDAgOiAodGV4dC5sZW5ndGggKyAyMCAqIE1hdGgucmFuZG9tKCkpIC8gOCAqIDEwMDBcblxuTWFzdGVyLnNsb3dseUFwcGx5VG9UZXh0cyA9ICh7XG4gIHRleHRzLFxuICBvbkJlZ2luV2FpdCxcbiAgb25CZWdpblR5cGluZyxcbiAgb25FbmRUeXBpbmcsXG4gIG9uRW5kT2ZUZXh0c1xufSkgPT4ge1xuICBmdW5jdGlvbiBwcm9jZXNzTmV4dFRleHQgKCkge1xuICAgIGlmICghXy5pc0VtcHR5KHRleHRzKSkgcmV0dXJuIHByb2Nlc3NUZXh0KHRleHRzLnNoaWZ0KCkpXG4gICAgb25FbmRPZlRleHRzKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NUZXh0ICh0ZXh0KSB7XG4gICAgY29uc3QgZW5kT2ZQcm9jZXNzaW5nID0gKCkgPT4ge1xuICAgICAgb25FbmRUeXBpbmcodGV4dClcbiAgICAgIHByb2Nlc3NOZXh0VGV4dCgpXG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnRUeXBpbmcgPSAoKSA9PiB7XG4gICAgICBvbkJlZ2luVHlwaW5nKHRleHQpXG4gICAgICBzZXRUaW1lb3V0KGVuZE9mUHJvY2Vzc2luZywgdHlwaW5nVGltZSh0ZXh0KSlcbiAgICB9XG5cbiAgICBjb25zdCBzdGFydFdhaXRpbmcgPSAoKSA9PiB7XG4gICAgICBvbkJlZ2luV2FpdCh0ZXh0KVxuICAgICAgc2V0VGltZW91dChzdGFydFR5cGluZywgd2FpdFRpbWUodGV4dCkpXG4gICAgfVxuXG4gICAgc3RhcnRXYWl0aW5nKClcbiAgfVxuXG4gIHByb2Nlc3NOZXh0VGV4dCgpXG59XG4iLCJleHBvcnQgY29uc3QgdGV4dHMgPSBbXG4gIHtcbiAgICB0ZXh0OiAnc2FsdXQnXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnX19pbnB1dF9fMSdcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdkaXMgbW9pJ1xuICB9LFxuICB7XG4gICAgdGV4dDogXCJqJ2FpIHJpZW4gYSBlY291dGVyIGxhXCJcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwidHUgbSdhdmFpcyBwYXJsZSBkJ3VuIGdyb3VwZVwiXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcImMnZXRhaXQgcXVvaSBkZWphID9cIlxuICB9LFxuICB7XG4gICAgdGV4dDogJ19faW5wdXRfXzInXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnSG0gaGEgb3VpLidcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiQydlc3QgY29vbC5cIlxuICB9LFxuICB7XG4gICAgdGV4dDogJ2NhIHZhIHRvaSBzaW5vbiA/IGRlcHVpcyBsYSBkZXJuaWVyZSBmb2lzIC4uLm1lcyBjb25zZWlscyBvbnQgw6l0w6kgdXRpbGVzID8nXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnZW4gdnJhaSdcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiaidhaSB2dSBsZXMgcGhvdG9zIHN1ciBmYWNlYm9vay4uLiB0J2F2YWlzIGwnYWlyIGVuIGZvcm1lIGRlc3N1cy4gY2EgbSdhIGZhaXQgcGxhaXNpci5cIlxuICB9LFxuICB7XG4gICAgdGV4dDogJzspJ1xuICB9LFxuICB7XG4gICAgdGV4dDogJ2VuZmluLiBqZSBjb25uYWlzIGNlcyBtb21lbnRzIHRzYWlzJ1xuICB9LFxuICB7XG4gICAgdGV4dDogJ2R1ciBkZSBjb21tdW5pcXVlcidcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdkcyBsZSBicm91aWxsYXJkJ1xuICB9LFxuICB7XG4gICAgdGV4dDogJ3BldXJzIGlycmF0aW9ubmVsbGVzJ1xuICB9LFxuICB7XG4gICAgdGV4dDogJ2JyZWYuJ1xuICB9LFxuICB7XG4gICAgdGV4dDogXCJkJ2FpbGxldXJzXCJcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwidCdhcyBwYXMgMiBtaW51dGVzIGxhID8gSidhaSBiZXNvaW4gZGUgdG9uIGF2aXMgc3VyIHVuIHRydWMgdW4gcGV1IHBlcnNvXCJcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdfX2lucHV0X18zJ1xuICB9LFxuICB7XG4gICAgdGV4dDogJ2Nvb2wgbWVyY2kuIGplIHRlIGZhaXMgY29uZmlhbmNlIHBvdXIgZ2FyZGVyIGNhIHBvdXIgdG9pIGhlaW4uJ1xuICB9LFxuICB7XG4gICAgdGV4dDogXCJkJ2FpbGxldXJzXCJcbiAgfVxuXVxuIiwiVnVlLmNvbXBvbmVudCgnbWVzc2FnZS1ncm91cHMtaXRlcmF0b3InLCB7XG4gIHByb3BzOiBbXG4gICAgJ21lc3NhZ2VHcm91cHMnXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5cbiAgICAgIDxtZXNzYWdlLWdyb3VwLWRpc3BhdGNoZXJcbiAgICAgICAgdi1mb3I9XCJtZXNzYWdlR3JvdXAgaW4gbWVzc2FnZUdyb3Vwc1wiXG4gICAgICAgIHYtYmluZDptZXNzYWdlR3JvdXA9XCJtZXNzYWdlR3JvdXBcIlxuICAgICAgPlxuICAgICAgPC9tZXNzYWdlLWdyb3VwLWRpc3BhdGNoZXI+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5cblZ1ZS5jb21wb25lbnQoJ21lc3NhZ2UtZ3JvdXAtZGlzcGF0Y2hlcicsIHtcbiAgcHJvcHM6IFtcbiAgICAnbWVzc2FnZUdyb3VwJ1xuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx1c2VyLW1lc3NhZ2VzLWNvbnRhaW5lclxuICAgICAgdi1pZj1cIm1lc3NhZ2VHcm91cC5mcm9tVXNlclwiXG4gICAgICB2LWJpbmQ6dXNlck1lc3NhZ2VzPVwibWVzc2FnZUdyb3VwLm1lc3NhZ2VzXCJcbiAgICA+XG4gICAgPC91c2VyLW1lc3NhZ2VzLWNvbnRhaW5lcj5cbiAgICA8cm9ib3QtbWVzc2FnZXMtY29udGFpbmVyXG4gICAgICB2LWVsc2VcbiAgICAgIHYtYmluZDpyb2JvdE1lc3NhZ2VzPVwibWVzc2FnZUdyb3VwLm1lc3NhZ2VzXCJcbiAgICAgIHYtYmluZDppc1R5cGluZz1cIm1lc3NhZ2VHcm91cC5pc1R5cGluZ1wiXG4gICAgPlxuICAgIDwvcm9ib3QtbWVzc2FnZXMtY29udGFpbmVyPlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCd1c2VyLW1lc3NhZ2VzLWNvbnRhaW5lcicsIHtcbiAgcHJvcHM6IFsndXNlck1lc3NhZ2VzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIl8xdF9wIGNsZWFyZml4XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiXzQxdWRcIj5cbiAgICAgICAgPGg1IGNsYXNzPVwiX2loMyBfLW5lXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJfM29oLVwiPk1pY2thw6tsPC9zcGFuPlxuICAgICAgICA8L2g1PlxuICAgICAgICA8dXNlci1tZXNzYWdlIFxuICAgICAgICAgIHYtZm9yPVwibWVzc2FnZSBpbiB1c2VyTWVzc2FnZXNcIiBcbiAgICAgICAgICB2LWJpbmQ6bWVzc2FnZT1cIm1lc3NhZ2VcIlxuICAgICAgICA+XG4gICAgICAgIDwvdXNlci1tZXNzYWdlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5cblZ1ZS5jb21wb25lbnQoJ3VzZXItbWVzc2FnZScsIHtcbiAgcHJvcHM6IFsnbWVzc2FnZSddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjbGVhcmZpeCBfbzQ2IF8zZXJnIF8zaV9tIF9uZF8gZGlyZWN0aW9uX2x0ciB0ZXh0X2FsaWduX2x0clwiPlxuICAgICAgPGRpdiBjbGFzcz1cIl8zMDU4IF91aTkgX2hoNyBfczEtIF81Mm1yIF80M2J5IF8zb2gtXCIgaWQ9XCJqc18xempcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIl9hb2tcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIl8zb2gtIF81OG5rXCI+e3sgbWVzc2FnZS50ZXh0IH19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHNwYW4gY2xhc3M9XCJfNDBmdVwiPjxzcGFuIGNsYXNzPVwiXzJ1X2RcIj48L3NwYW4+PC9zcGFuPlxuICAgICAgPGxhc3Qtc2Vlbi1tZXNzYWdlLWJ5LXJvYm90IHYtaWY9XCJtZXNzYWdlLmxhc3RTZWVuXCI+XG4gICAgICA8L2xhc3Qtc2Vlbi1tZXNzYWdlLWJ5LXJvYm90PlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCdyb2JvdC1tZXNzYWdlcy1jb250YWluZXInLCB7XG4gIHByb3BzOiBbJ3JvYm90TWVzc2FnZXMnLCAnaXNUeXBpbmcnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiXzF0X3AgY2xlYXJmaXhcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJfMXRfcVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiXzRsZHogXzF0X3JcIiBkYXRhLXRvb2x0aXAtY29udGVudD1cIlBhdHJpY2sgQmF0ZW1hbiA0OjM1cG1cIiBkYXRhLWhvdmVyPVwidG9vbHRpcFwiIGRhdGEtdG9vbHRpcC1wb3NpdGlvbj1cImxlZnRcIiBzdHlsZT1cIndpZHRoOiAzMnB4OyBoZWlnaHQ6IDMycHg7XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIl80bGQtXCIgc3R5bGU9XCJ3aWR0aDogMzJweDsgaGVpZ2h0OiAzMnB4O1wiPlxuICAgICAgICAgICAgPGltZyBhbHQ9XCJQYXRyaWNrIEJhdGVtYW5cIiBzcmM9XCIuL01lc3Nlbmdlcl9maWxlcy8xNzQ5OTM5Ml8xNjUxMTY1OTA0OTI0MzYxXzgwNjkxMzkzNzk5NTY4ODMwOV9uLnBuZ1wiIGhlaWdodD1cIjMyXCIgd2lkdGg9XCIzMlwiIGNsYXNzPVwiaW1nXCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIl80bGRfIF8ycG9tXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiXzJwb24gXzJwb29cIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIl80MXVkXCI+XG4gICAgICAgIDxoNSBjbGFzcz1cIl9paDMgXy1uZVwiPjxzcGFuIGNsYXNzPVwiXzNvaC1cIj5QYXRyaWNrIEJhdGVtYW48L3NwYW4+XG4gICAgICAgIDwvaDU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGVhcmZpeCBfbzQ2IF8zZXJnIF8yOV83IGRpcmVjdGlvbl9sdHIgdGV4dF9hbGlnbl9sdHJcIj5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1mb3I9XCJtZXNzYWdlIGluIHJvYm90TWVzc2FnZXNcIj5cbiAgICAgICAgICAgIDxyb2JvdC1tZXNzYWdlIHYtYmluZDptZXNzYWdlPVwibWVzc2FnZVwiID5cbiAgICAgICAgICAgIDwvcm9ib3QtbWVzc2FnZT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiXzQwZnVcIj48c3BhbiBjbGFzcz1cIl8ydV9kXCI+PC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgIDxsYXN0LXNlZW4tbWVzc2FnZS1ieS1yb2JvdCB2LWlmPVwibWVzc2FnZS5sYXN0U2VlblwiPlxuICAgICAgICAgICAgPC9sYXN0LXNlZW4tbWVzc2FnZS1ieS1yb2JvdD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDxyb2JvdC1pcy10eXBpbmctaW5kaWNhdG9yIFxuICAgICAgICAgICAgdi1pZj1cImlzVHlwaW5nXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgPC9yb2JvdC1pcy10eXBpbmctaW5kaWNhdG9yPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCdyb2JvdC1tZXNzYWdlJywge1xuICBwcm9wczogWydtZXNzYWdlJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIl8zMDU4IF91aTkgX2hoNyBfczEtIF81Mm1yIF8zb2gtXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiX2Fva1wiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIl8zb2gtIF81OG5rXCI+e3sgbWVzc2FnZS50ZXh0IH19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5cblZ1ZS5jb21wb25lbnQoJ3JvYm90LWlzLXR5cGluZy1pbmRpY2F0b3InLCB7XG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz0nanNtLWNoYXQtbWVzc2FnZSBqc20tbGVmdCBqc20tdHlwaW5nLWluZGljYXRvcicgc3R5bGU9J21hcmdpbi1sZWZ0OiAwcHg7Jz5cbiAgICAgIDxzcGFuIGNsYXNzPSduby13cmFwLXNwYWNlJz48L3NwYW4+PHNwYW4gY2xhc3M9J25vLXdyYXAtc3BhY2UnPjwvc3Bhbj48c3BhbiBjbGFzcz0nbm8td3JhcC1zcGFjZSc+PC9zcGFuPlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCdsYXN0LXNlZW4tbWVzc2FnZS1ieS1yb2JvdCcsIHtcbiAgdGVtcGxhdGU6IGA8c3BhbiBjbGFzcz1cIl80anpxIF9qZjQgX2pmNVwiPjxpbWcgYWx0PVwiU2VlbiBieSBQYXRyaWNrIEJhdGVtYW4gYXQgNDozNXBtXCIgY2xhc3M9XCJfamYyIGltZ1wiIHNyYz1cIi4vTWVzc2VuZ2VyX2ZpbGVzLzE3NDk5MzkyXzE2NTExNjU5MDQ5MjQzNjFfODA2OTEzOTM3OTk1Njg4MzA5X24ucG5nXCIgdGl0bGU9XCJTZWVuIGJ5IFBhdHJpY2tcIj48L3NwYW4+YFxufSlcblxuZXhwb3J0IGNvbnN0IGFwcCA9IG5ldyBWdWUoe1xuICBlbDogJyNqc18xJyxcblxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8aDQgY2xhc3M9XCJfNDk3cCBfMmxwdFwiPlxuICAgICAgICA8dGltZSBjbGFzcz1cIl8zb2gtXCI+PHNwYW4gaWQ9J3RpbWUnPnt7bm93fX08L3NwYW4+PC90aW1lPlxuICAgICAgPC9oND5cbiAgICAgIDxtZXNzYWdlLWdyb3Vwcy1pdGVyYXRvciB2LWJpbmQ6bWVzc2FnZUdyb3Vwcz1cIm1lc3NhZ2VHcm91cHNcIlxuICAgICAgICB2LWJpbmQ6cm9ib3RJc1R5cGluZz1cInJvYm90SXNUeXBpbmdcIlxuICAgICAgPlxuICAgICAgPC9tZXNzYWdlLWdyb3Vwcy1pdGVyYXRvciA+XG4gICAgPC9kaXY+XG4gIGAsXG5cbiAgZGF0YToge1xuICAgIHJvYm90SXNUeXBpbmc6IGZhbHNlLFxuXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgIHsgdGV4dDogJ2NvdWNvdSA/JywgZnJvbVVzZXI6IHRydWUsIGxhc3RTZWVuOiB0cnVlIH1cbiAgICBdXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGFkZE1lc3NhZ2UgKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMucHVzaChtZXNzYWdlKVxuICAgIH0sXG4gICAgc2V0Um9ib3RJc1R5cGluZyAocm9ib3RJc1R5cGluZykge1xuICAgICAgdGhpcy5yb2JvdElzVHlwaW5nID0gcm9ib3RJc1R5cGluZ1xuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgICdub3cnICgpIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpICsgJzonICsgZGF0ZS5nZXRNaW51dGVzKClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR3JvdXAgbWVzc2FnZXMgaW4gYSB3YXkgd2UgY2FuIGNvbnN0cnVjdFxuICAgICAqIHRoZSBjaGF0IGludGVyZmFjZVxuICAgICAqIGFuZCBhZGQgcmVsZXZhbnQgbWV0YWRhdGFcbiAgICAgKi9cbiAgICAnbWVzc2FnZUdyb3VwcycgKCkge1xuICAgICAgY29uc3QgbWVzc2FnZUdyb3VwcyA9IFtdXG5cbiAgICAgIF8uZm9yRWFjaCh0aGlzLm1lc3NhZ2VzLCBmdW5jdGlvbiAobWVzc2FnZSwga2V5LCBtZXNzYWdlcykge1xuICAgICAgICBjb25zdCBsYXN0TWVzc2FnZUdyb3VwID0gXy5sYXN0KG1lc3NhZ2VHcm91cHMpXG4gICAgICAgIGNvbnN0IHNob3VsZENyZWF0ZU5ld0dyb3VwID0gXy5pc0VtcHR5KGxhc3RNZXNzYWdlR3JvdXApIHx8XG4gICAgICAgICAgKGxhc3RNZXNzYWdlR3JvdXAuZnJvbVVzZXIgIT09IG1lc3NhZ2UuZnJvbVVzZXIpXG5cbiAgICAgICAgaWYgKHNob3VsZENyZWF0ZU5ld0dyb3VwKSB7XG4gICAgICAgICAgY29uc3QgbmV3TWVzc2FnZUdyb3VwID0ge1xuICAgICAgICAgICAgbWVzc2FnZXM6IFttZXNzYWdlXSxcbiAgICAgICAgICAgIGZyb21Vc2VyOiBtZXNzYWdlLmZyb21Vc2VyXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWVzc2FnZUdyb3Vwcy5wdXNoKG5ld01lc3NhZ2VHcm91cClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGxhc3RNZXNzYWdlR3JvdXAubWVzc2FnZXMucHVzaChtZXNzYWdlKVxuICAgICAgfSlcblxuICAgICAgLy8gQWRkaW5nIHR5cGluZyBpbmRpY2F0b3IgaWYgbmVjZXNzYXJ5XG4gICAgICBjb25zdCBsYXN0TWVzc2FnZUdyb3VwID0gXy5sYXN0KG1lc3NhZ2VHcm91cHMpXG4gICAgICBjb25zdCBzaG91bGRDcmVhdGVOZXdSb2JvdEdyb3VwID0gXy5pc0VtcHR5KGxhc3RNZXNzYWdlR3JvdXApIHx8IGxhc3RNZXNzYWdlR3JvdXAuZnJvbVVzZXJcblxuICAgICAgaWYgKHNob3VsZENyZWF0ZU5ld1JvYm90R3JvdXApIHtcbiAgICAgICAgY29uc3QgbmV3Um9ib3RNZXNzYWdlR3JvdXAgPSB7XG4gICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgIGZyb21Vc2VyOiBmYWxzZSxcbiAgICAgICAgICBpc1R5cGluZzogdGhpcy5yb2JvdElzVHlwaW5nXG4gICAgICAgIH1cblxuICAgICAgICBtZXNzYWdlR3JvdXBzLnB1c2gobmV3Um9ib3RNZXNzYWdlR3JvdXApXG5cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VHcm91cHNcbiAgICAgIH1cblxuICAgICAgbGFzdE1lc3NhZ2VHcm91cC5pc1R5cGluZyA9IHRoaXMucm9ib3RJc1R5cGluZ1xuXG4gICAgICByZXR1cm4gbWVzc2FnZUdyb3Vwc1xuICAgIH1cbiAgfVxufSlcblxuLy8gRm9yIGluZm9cbmNvbnN0IG1lc3NlbmdlckNvbnRlbnRFZGl0YWJsZUlucHV0ID0gYFxuICA8ZGl2IGNsYXNzPVwiXzVycDcgXzVycDhcIj5cbiAgICA8ZGl2IGNsYXNzPVwiXzFwMXRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJfMXAxdlwiIGlkPVwicGxhY2Vob2xkZXItOWlnZGVcIj5cbiAgICAgIFR5cGUgYSBtZXNzYWdlLi4uPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIl81cnBiXCI+XG4gICAgICA8ZGl2IGFyaWEtYXV0b2NvbXBsZXRlPVwibGlzdFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJwbGFjZWhvbGRlci05aWdkZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGFyaWEtaGFzcG9wdXA9XCJmYWxzZVwiIGFyaWEtbGFiZWw9XCJUeXBlIGEgbWVzc2FnZS4uLlwiIGFyaWEtb3ducz1cImpzXzF5dFwiIGNsYXNzPVwiXzVycHVcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIgZGF0YS1pbnRlcmFjdGlvbi1yb290LWlkPVwiX2MxbVwiIHJvbGU9XCJjb21ib2JveFwiIHNwZWxsY2hlY2s9XCJ0cnVlXCIgdGFiaW5kZXg9XCIwXCIgc3R5bGU9XCJvdXRsaW5lOiBub25lOyB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7IHdvcmQtd3JhcDogYnJlYWstd29yZDtcIj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbmBcblxuZXhwb3J0IGNvbnN0IGlucHV0QXBwID0gbmV3IFZ1ZSh7XG4gIGVsOiAnI2lucHV0QmxvY2snLFxuXG4gIGRhdGE6IHtcbiAgICBuZXdNZXNzYWdlVGV4dDogJydcbiAgfSxcblxuICAvLyB0ZW1wbGF0ZTogbWVzc2VuZ2VyQ29udGVudEVkaXRhYmxlSW5wdXQsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIl81cnA3IF81cnA4XCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiVHlwZSBhIG1lc3NhZ2UuLi5cIiBcbiAgICAgICAgdi1tb2RlbD1cIm5ld01lc3NhZ2VUZXh0XCJcbiAgICAgICAgQGtleXVwLmVudGVyPVwic2VuZE5ld01lc3NhZ2VcIlxuICAgICAgPlxuICAgIDwvZGl2PlxuICBgLFxuXG4gIG1ldGhvZHM6IHtcbiAgICBzZW5kTmV3TWVzc2FnZTogZnVuY3Rpb24gKCkge1xuICAgICAgYXBwLm1lc3NhZ2VzLnB1c2goeyB0ZXh0OiB0aGlzLm5ld01lc3NhZ2VUZXh0LCBmcm9tVXNlcjogdHJ1ZSB9KVxuICAgICAgdGhpcy5uZXdNZXNzYWdlVGV4dCA9ICcnXG4gICAgfVxuICB9XG59KVxuIl19

//# sourceMappingURL=maps/index.js.map
