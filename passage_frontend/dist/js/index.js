(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _vue = require('./vue.js');

var _master = require('./master.js');

_master.Master.run({
  app: _vue.Vues.app,
  inputApp: _vue.Vues.inputApp
});

},{"./master.js":2,"./vue.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Master = exports.Master = {};

var texts = [{
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

var slowlyApplyToTexts = function slowlyApplyToTexts(_ref3) {
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

Master.run = function (_ref4) {
  var app = _ref4.app,
      inputApp = _ref4.inputApp;

  slowlyApplyToTexts({
    texts: texts,
    onBeginWait: console.log,
    onBeginTyping: function onBeginTyping(text) {
      app.robotIsTyping = true;
    },
    onEndTyping: function onEndTyping(text) {
      app.robotIsTyping = false;
      app.messages.push(_.extend(text, { fromUser: false, lastSeen: false }));
    },
    onEndOfTexts: console.log
  });
  console.log('Running', app);
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Vues = exports.Vues = {};

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

Vues.app = new Vue({
  el: '#js_1',

  template: '\n    <div>\n      <h4 class="_497p _2lpt">\n        <time class="_3oh-"><span id=\'time\'>{{now}}</span></time>\n      </h4>\n      <message-groups-iterator v-bind:messageGroups="messageGroups"\n        v-bind:robotIsTyping="robotIsTyping"\n      >\n      </message-groups-iterator >\n    </div>\n  ',

  data: {
    robotIsTyping: false,

    messages: [{ text: 'coucou ?', fromUser: true, lastSeen: true }]
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

Vues.messengerContentEditableInput = '\n  <div class="_5rp7 _5rp8">\n    <div class="_1p1t">\n      <div class="_1p1v" id="placeholder-9igde">\n      Type a message...</div>\n    </div>\n    <div class="_5rpb">\n      <div aria-autocomplete="list" aria-describedby="placeholder-9igde" aria-expanded="false" aria-haspopup="false" aria-label="Type a message..." aria-owns="js_1yt" class="_5rpu" contenteditable="true" data-interaction-root-id="_c1m" role="combobox" spellcheck="true" tabindex="0" style="outline: none; white-space: pre-wrap; word-wrap: break-word;">\n      </div>\n    </div>\n  </div>\n';

Vues.inputApp = new Vue({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvaW5kZXguanMiLCJlczYvbWFzdGVyLmpzIiwiZXM2L3Z1ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBRUEsZUFBTyxHQUFQLENBQVc7QUFDVCxPQUFLLFVBQUssR0FERDtBQUVULFlBQVUsVUFBSztBQUZOLENBQVg7Ozs7Ozs7O0FDSE8sSUFBTSwwQkFBUyxFQUFmOztBQUVQLElBQU0sUUFBUSxDQUNaO0FBQ0UsUUFBTTtBQURSLENBRFksRUFJWjtBQUNFLFFBQU07QUFEUixDQUpZLEVBT1o7QUFDRSxRQUFNO0FBRFIsQ0FQWSxFQVVaO0FBQ0UsUUFBTTtBQURSLENBVlksRUFhWjtBQUNFLFFBQU07QUFEUixDQWJZLEVBZ0JaO0FBQ0UsUUFBTTtBQURSLENBaEJZLEVBbUJaO0FBQ0UsUUFBTTtBQURSLENBbkJZLEVBc0JaO0FBQ0UsUUFBTTtBQURSLENBdEJZLEVBeUJaO0FBQ0UsUUFBTTtBQURSLENBekJZLEVBNEJaO0FBQ0UsUUFBTTtBQURSLENBNUJZLEVBK0JaO0FBQ0UsUUFBTTtBQURSLENBL0JZLEVBa0NaO0FBQ0UsUUFBTTtBQURSLENBbENZLEVBcUNaO0FBQ0UsUUFBTTtBQURSLENBckNZLEVBd0NaO0FBQ0UsUUFBTTtBQURSLENBeENZLEVBMkNaO0FBQ0UsUUFBTTtBQURSLENBM0NZLEVBOENaO0FBQ0UsUUFBTTtBQURSLENBOUNZLEVBaURaO0FBQ0UsUUFBTTtBQURSLENBakRZLEVBb0RaO0FBQ0UsUUFBTTtBQURSLENBcERZLEVBdURaO0FBQ0UsUUFBTTtBQURSLENBdkRZLEVBMERaO0FBQ0UsUUFBTTtBQURSLENBMURZLEVBNkRaO0FBQ0UsUUFBTTtBQURSLENBN0RZLEVBZ0VaO0FBQ0UsUUFBTTtBQURSLENBaEVZLEVBbUVaO0FBQ0UsUUFBTTtBQURSLENBbkVZLENBQWQ7QUF1RUEsSUFBTSxXQUFXO0FBQUEsTUFB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RCxPQWhCRDs7QUFrQkE7QUFDQSxVQUFNLG1CQUFtQixFQUFFLElBQUYsQ0FBTyxhQUFQLENBQXpCO0FBQ0EsVUFBTSw0QkFBNEIsRUFBRSxPQUFGLENBQVUsZ0JBQVYsS0FBK0IsaUJBQWlCLFFBQWxGOztBQUVBLFVBQUkseUJBQUosRUFBK0I7QUFDN0IsWUFBTSx1QkFBdUI7QUFDM0Isb0JBQVUsRUFEaUI7QUFFM0Isb0JBQVUsS0FGaUI7QUFHM0Isb0JBQVUsS0FBSztBQUhZLFNBQTdCOztBQU1BLHNCQUFjLElBQWQsQ0FBbUIsb0JBQW5COztBQUVBLGVBQU8sYUFBUDtBQUNEOztBQUVELHVCQUFpQixRQUFqQixHQUE0QixLQUFLLGFBQWpDOztBQUVBLGFBQU8sYUFBUDtBQUNEO0FBbkRPO0FBdkJPLENBQVIsQ0FBWDs7QUE4RUEsS0FBSyw2QkFBTDs7QUFhQSxLQUFLLFFBQUwsR0FBZ0IsSUFBSSxHQUFKLENBQVE7QUFDdEIsTUFBSSxhQURrQjs7QUFHdEIsUUFBTTtBQUNKLG9CQUFnQjtBQURaLEdBSGdCOztBQU90QjtBQUNBLDBOQVJzQjs7QUFtQnRCLFdBQVM7QUFDUCxvQkFBZ0IsMEJBQVk7QUFDMUIsVUFBSSxRQUFKLENBQWEsSUFBYixDQUFrQixFQUFFLE1BQU0sS0FBSyxjQUFiLEVBQTZCLFVBQVUsSUFBdkMsRUFBbEI7QUFDQSxXQUFLLGNBQUwsR0FBc0IsRUFBdEI7QUFDRDtBQUpNO0FBbkJhLENBQVIsQ0FBaEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgVnVlcyB9IGZyb20gJy4vdnVlLmpzJ1xuaW1wb3J0IHsgTWFzdGVyIH0gZnJvbSAnLi9tYXN0ZXIuanMnXG5cbk1hc3Rlci5ydW4oe1xuICBhcHA6IFZ1ZXMuYXBwLFxuICBpbnB1dEFwcDogVnVlcy5pbnB1dEFwcFxufSlcbiIsImV4cG9ydCBjb25zdCBNYXN0ZXIgPSB7fVxuXG5jb25zdCB0ZXh0cyA9IFtcbiAge1xuICAgIHRleHQ6ICdzYWx1dCdcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdfX2lucHV0X18xJ1xuICB9LFxuICB7XG4gICAgdGV4dDogJ2RpcyBtb2knXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcImonYWkgcmllbiBhIGVjb3V0ZXIgbGFcIlxuICB9LFxuICB7XG4gICAgdGV4dDogXCJ0dSBtJ2F2YWlzIHBhcmxlIGQndW4gZ3JvdXBlXCJcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiYydldGFpdCBxdW9pIGRlamEgP1wiXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnX19pbnB1dF9fMidcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdIbSBoYSBvdWkuJ1xuICB9LFxuICB7XG4gICAgdGV4dDogXCJDJ2VzdCBjb29sLlwiXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnY2EgdmEgdG9pIHNpbm9uID8gZGVwdWlzIGxhIGRlcm5pZXJlIGZvaXMgLi4ubWVzIGNvbnNlaWxzIG9udCDDqXTDqSB1dGlsZXMgPydcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdlbiB2cmFpJ1xuICB9LFxuICB7XG4gICAgdGV4dDogXCJqJ2FpIHZ1IGxlcyBwaG90b3Mgc3VyIGZhY2Vib29rLi4uIHQnYXZhaXMgbCdhaXIgZW4gZm9ybWUgZGVzc3VzLiBjYSBtJ2EgZmFpdCBwbGFpc2lyLlwiXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnOyknXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnZW5maW4uIGplIGNvbm5haXMgY2VzIG1vbWVudHMgdHNhaXMnXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnZHVyIGRlIGNvbW11bmlxdWVyJ1xuICB9LFxuICB7XG4gICAgdGV4dDogJ2RzIGxlIGJyb3VpbGxhcmQnXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAncGV1cnMgaXJyYXRpb25uZWxsZXMnXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnYnJlZi4nXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcImQnYWlsbGV1cnNcIlxuICB9LFxuICB7XG4gICAgdGV4dDogXCJ0J2FzIHBhcyAyIG1pbnV0ZXMgbGEgPyBKJ2FpIGJlc29pbiBkZSB0b24gYXZpcyBzdXIgdW4gdHJ1YyB1biBwZXUgcGVyc29cIlxuICB9LFxuICB7XG4gICAgdGV4dDogJ19faW5wdXRfXzMnXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnY29vbCBtZXJjaS4gamUgdGUgZmFpcyBjb25maWFuY2UgcG91ciBnYXJkZXIgY2EgcG91ciB0b2kgaGVpbi4nXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcImQnYWlsbGV1cnNcIlxuICB9XG5dXG5jb25zdCB3YWl0VGltZSA9ICh7dGV4dCwgd2FpdFRpbWUgPSBudWxsfSkgPT4gd2FpdFRpbWUgPyB3YWl0VGltZSAqIDEwMDAgOiBNYXRoLnJhbmRvbSgpICogNSAqIDEwMDBcbmNvbnN0IHR5cGluZ1RpbWUgPSAoe3RleHQsIHR5cGluZ1RpbWUgPSBudWxsfSkgPT4gdHlwaW5nVGltZSA/IHR5cGluZ1RpbWUgKiAxMDAwIDogKHRleHQubGVuZ3RoICsgMjAgKiBNYXRoLnJhbmRvbSgpKSAvIDggKiAxMDAwXG5cbmNvbnN0IHNsb3dseUFwcGx5VG9UZXh0cyA9ICh7XG4gIHRleHRzLFxuICBvbkJlZ2luV2FpdCxcbiAgb25CZWdpblR5cGluZyxcbiAgb25FbmRUeXBpbmcsXG4gIG9uRW5kT2ZUZXh0c1xufSkgPT4ge1xuICBmdW5jdGlvbiBwcm9jZXNzTmV4dFRleHQgKCkge1xuICAgIGlmICghXy5pc0VtcHR5KHRleHRzKSkgcmV0dXJuIHByb2Nlc3NUZXh0KHRleHRzLnNoaWZ0KCkpXG4gICAgb25FbmRPZlRleHRzKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NUZXh0ICh0ZXh0KSB7XG4gICAgY29uc3QgZW5kT2ZQcm9jZXNzaW5nID0gKCkgPT4ge1xuICAgICAgb25FbmRUeXBpbmcodGV4dClcbiAgICAgIHByb2Nlc3NOZXh0VGV4dCgpXG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnRUeXBpbmcgPSAoKSA9PiB7XG4gICAgICBvbkJlZ2luVHlwaW5nKHRleHQpXG4gICAgICBzZXRUaW1lb3V0KGVuZE9mUHJvY2Vzc2luZywgdHlwaW5nVGltZSh0ZXh0KSlcbiAgICB9XG5cbiAgICBjb25zdCBzdGFydFdhaXRpbmcgPSAoKSA9PiB7XG4gICAgICBvbkJlZ2luV2FpdCh0ZXh0KVxuICAgICAgc2V0VGltZW91dChzdGFydFR5cGluZywgd2FpdFRpbWUodGV4dCkpXG4gICAgfVxuXG4gICAgc3RhcnRXYWl0aW5nKClcbiAgfVxuXG4gIHByb2Nlc3NOZXh0VGV4dCgpXG59XG5cbk1hc3Rlci5ydW4gPSAoe1xuICBhcHAsXG4gIGlucHV0QXBwXG59KSA9PiB7XG4gIHNsb3dseUFwcGx5VG9UZXh0cyh7XG4gICAgdGV4dHMsXG4gICAgb25CZWdpbldhaXQ6IGNvbnNvbGUubG9nLFxuICAgIG9uQmVnaW5UeXBpbmc6ICh0ZXh0KSA9PiB7XG4gICAgICBhcHAucm9ib3RJc1R5cGluZyA9IHRydWVcbiAgICB9LFxuICAgIG9uRW5kVHlwaW5nOiAodGV4dCkgPT4ge1xuICAgICAgYXBwLnJvYm90SXNUeXBpbmcgPSBmYWxzZVxuICAgICAgYXBwLm1lc3NhZ2VzLnB1c2goXy5leHRlbmQodGV4dCxcbiAgICAgICAgeyBmcm9tVXNlcjogZmFsc2UsIGxhc3RTZWVuOiBmYWxzZSB9XG4gICAgICApKVxuICAgIH0sXG4gICAgb25FbmRPZlRleHRzOiBjb25zb2xlLmxvZ1xuICB9KVxuICBjb25zb2xlLmxvZygnUnVubmluZycsIGFwcClcbn1cbiIsImV4cG9ydCBjb25zdCBWdWVzID0ge31cblxuVnVlLmNvbXBvbmVudCgnbWVzc2FnZS1ncm91cHMtaXRlcmF0b3InLCB7XG4gIHByb3BzOiBbXG4gICAgJ21lc3NhZ2VHcm91cHMnXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5cbiAgICAgIDxtZXNzYWdlLWdyb3VwLWRpc3BhdGNoZXJcbiAgICAgICAgdi1mb3I9XCJtZXNzYWdlR3JvdXAgaW4gbWVzc2FnZUdyb3Vwc1wiXG4gICAgICAgIHYtYmluZDptZXNzYWdlR3JvdXA9XCJtZXNzYWdlR3JvdXBcIlxuICAgICAgPlxuICAgICAgPC9tZXNzYWdlLWdyb3VwLWRpc3BhdGNoZXI+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5cblZ1ZS5jb21wb25lbnQoJ21lc3NhZ2UtZ3JvdXAtZGlzcGF0Y2hlcicsIHtcbiAgcHJvcHM6IFtcbiAgICAnbWVzc2FnZUdyb3VwJ1xuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx1c2VyLW1lc3NhZ2VzLWNvbnRhaW5lclxuICAgICAgdi1pZj1cIm1lc3NhZ2VHcm91cC5mcm9tVXNlclwiXG4gICAgICB2LWJpbmQ6dXNlck1lc3NhZ2VzPVwibWVzc2FnZUdyb3VwLm1lc3NhZ2VzXCJcbiAgICA+XG4gICAgPC91c2VyLW1lc3NhZ2VzLWNvbnRhaW5lcj5cbiAgICA8cm9ib3QtbWVzc2FnZXMtY29udGFpbmVyXG4gICAgICB2LWVsc2VcbiAgICAgIHYtYmluZDpyb2JvdE1lc3NhZ2VzPVwibWVzc2FnZUdyb3VwLm1lc3NhZ2VzXCJcbiAgICAgIHYtYmluZDppc1R5cGluZz1cIm1lc3NhZ2VHcm91cC5pc1R5cGluZ1wiXG4gICAgPlxuICAgIDwvcm9ib3QtbWVzc2FnZXMtY29udGFpbmVyPlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCd1c2VyLW1lc3NhZ2VzLWNvbnRhaW5lcicsIHtcbiAgcHJvcHM6IFsndXNlck1lc3NhZ2VzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIl8xdF9wIGNsZWFyZml4XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiXzQxdWRcIj5cbiAgICAgICAgPGg1IGNsYXNzPVwiX2loMyBfLW5lXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJfM29oLVwiPk1pY2thw6tsPC9zcGFuPlxuICAgICAgICA8L2g1PlxuICAgICAgICA8dXNlci1tZXNzYWdlIFxuICAgICAgICAgIHYtZm9yPVwibWVzc2FnZSBpbiB1c2VyTWVzc2FnZXNcIiBcbiAgICAgICAgICB2LWJpbmQ6bWVzc2FnZT1cIm1lc3NhZ2VcIlxuICAgICAgICA+XG4gICAgICAgIDwvdXNlci1tZXNzYWdlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5cblZ1ZS5jb21wb25lbnQoJ3VzZXItbWVzc2FnZScsIHtcbiAgcHJvcHM6IFsnbWVzc2FnZSddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjbGVhcmZpeCBfbzQ2IF8zZXJnIF8zaV9tIF9uZF8gZGlyZWN0aW9uX2x0ciB0ZXh0X2FsaWduX2x0clwiPlxuICAgICAgPGRpdiBjbGFzcz1cIl8zMDU4IF91aTkgX2hoNyBfczEtIF81Mm1yIF80M2J5IF8zb2gtXCIgaWQ9XCJqc18xempcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIl9hb2tcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIl8zb2gtIF81OG5rXCI+e3sgbWVzc2FnZS50ZXh0IH19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHNwYW4gY2xhc3M9XCJfNDBmdVwiPjxzcGFuIGNsYXNzPVwiXzJ1X2RcIj48L3NwYW4+PC9zcGFuPlxuICAgICAgPGxhc3Qtc2Vlbi1tZXNzYWdlLWJ5LXJvYm90IHYtaWY9XCJtZXNzYWdlLmxhc3RTZWVuXCI+XG4gICAgICA8L2xhc3Qtc2Vlbi1tZXNzYWdlLWJ5LXJvYm90PlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCdyb2JvdC1tZXNzYWdlcy1jb250YWluZXInLCB7XG4gIHByb3BzOiBbJ3JvYm90TWVzc2FnZXMnLCAnaXNUeXBpbmcnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiXzF0X3AgY2xlYXJmaXhcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJfMXRfcVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiXzRsZHogXzF0X3JcIiBkYXRhLXRvb2x0aXAtY29udGVudD1cIlBhdHJpY2sgQmF0ZW1hbiA0OjM1cG1cIiBkYXRhLWhvdmVyPVwidG9vbHRpcFwiIGRhdGEtdG9vbHRpcC1wb3NpdGlvbj1cImxlZnRcIiBzdHlsZT1cIndpZHRoOiAzMnB4OyBoZWlnaHQ6IDMycHg7XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIl80bGQtXCIgc3R5bGU9XCJ3aWR0aDogMzJweDsgaGVpZ2h0OiAzMnB4O1wiPlxuICAgICAgICAgICAgPGltZyBhbHQ9XCJQYXRyaWNrIEJhdGVtYW5cIiBzcmM9XCIuL01lc3Nlbmdlcl9maWxlcy8xNzQ5OTM5Ml8xNjUxMTY1OTA0OTI0MzYxXzgwNjkxMzkzNzk5NTY4ODMwOV9uLnBuZ1wiIGhlaWdodD1cIjMyXCIgd2lkdGg9XCIzMlwiIGNsYXNzPVwiaW1nXCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIl80bGRfIF8ycG9tXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiXzJwb24gXzJwb29cIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIl80MXVkXCI+XG4gICAgICAgIDxoNSBjbGFzcz1cIl9paDMgXy1uZVwiPjxzcGFuIGNsYXNzPVwiXzNvaC1cIj5QYXRyaWNrIEJhdGVtYW48L3NwYW4+XG4gICAgICAgIDwvaDU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGVhcmZpeCBfbzQ2IF8zZXJnIF8yOV83IGRpcmVjdGlvbl9sdHIgdGV4dF9hbGlnbl9sdHJcIj5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1mb3I9XCJtZXNzYWdlIGluIHJvYm90TWVzc2FnZXNcIj5cbiAgICAgICAgICAgIDxyb2JvdC1tZXNzYWdlIHYtYmluZDptZXNzYWdlPVwibWVzc2FnZVwiID5cbiAgICAgICAgICAgIDwvcm9ib3QtbWVzc2FnZT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiXzQwZnVcIj48c3BhbiBjbGFzcz1cIl8ydV9kXCI+PC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgIDxsYXN0LXNlZW4tbWVzc2FnZS1ieS1yb2JvdCB2LWlmPVwibWVzc2FnZS5sYXN0U2VlblwiPlxuICAgICAgICAgICAgPC9sYXN0LXNlZW4tbWVzc2FnZS1ieS1yb2JvdD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDxyb2JvdC1pcy10eXBpbmctaW5kaWNhdG9yIFxuICAgICAgICAgICAgdi1pZj1cImlzVHlwaW5nXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgPC9yb2JvdC1pcy10eXBpbmctaW5kaWNhdG9yPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCdyb2JvdC1tZXNzYWdlJywge1xuICBwcm9wczogWydtZXNzYWdlJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIl8zMDU4IF91aTkgX2hoNyBfczEtIF81Mm1yIF8zb2gtXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiX2Fva1wiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIl8zb2gtIF81OG5rXCI+e3sgbWVzc2FnZS50ZXh0IH19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5cblZ1ZS5jb21wb25lbnQoJ3JvYm90LWlzLXR5cGluZy1pbmRpY2F0b3InLCB7XG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz0nanNtLWNoYXQtbWVzc2FnZSBqc20tbGVmdCBqc20tdHlwaW5nLWluZGljYXRvcicgc3R5bGU9J21hcmdpbi1sZWZ0OiAwcHg7Jz5cbiAgICAgIDxzcGFuIGNsYXNzPSduby13cmFwLXNwYWNlJz48L3NwYW4+PHNwYW4gY2xhc3M9J25vLXdyYXAtc3BhY2UnPjwvc3Bhbj48c3BhbiBjbGFzcz0nbm8td3JhcC1zcGFjZSc+PC9zcGFuPlxuICAgIDwvZGl2PlxuICBgXG59KVxuXG5WdWUuY29tcG9uZW50KCdsYXN0LXNlZW4tbWVzc2FnZS1ieS1yb2JvdCcsIHtcbiAgdGVtcGxhdGU6IGA8c3BhbiBjbGFzcz1cIl80anpxIF9qZjQgX2pmNVwiPjxpbWcgYWx0PVwiU2VlbiBieSBQYXRyaWNrIEJhdGVtYW4gYXQgNDozNXBtXCIgY2xhc3M9XCJfamYyIGltZ1wiIHNyYz1cIi4vTWVzc2VuZ2VyX2ZpbGVzLzE3NDk5MzkyXzE2NTExNjU5MDQ5MjQzNjFfODA2OTEzOTM3OTk1Njg4MzA5X24ucG5nXCIgdGl0bGU9XCJTZWVuIGJ5IFBhdHJpY2tcIj48L3NwYW4+YFxufSlcblxuVnVlcy5hcHAgPSBuZXcgVnVlKHtcbiAgZWw6ICcjanNfMScsXG5cbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2PlxuICAgICAgPGg0IGNsYXNzPVwiXzQ5N3AgXzJscHRcIj5cbiAgICAgICAgPHRpbWUgY2xhc3M9XCJfM29oLVwiPjxzcGFuIGlkPSd0aW1lJz57e25vd319PC9zcGFuPjwvdGltZT5cbiAgICAgIDwvaDQ+XG4gICAgICA8bWVzc2FnZS1ncm91cHMtaXRlcmF0b3Igdi1iaW5kOm1lc3NhZ2VHcm91cHM9XCJtZXNzYWdlR3JvdXBzXCJcbiAgICAgICAgdi1iaW5kOnJvYm90SXNUeXBpbmc9XCJyb2JvdElzVHlwaW5nXCJcbiAgICAgID5cbiAgICAgIDwvbWVzc2FnZS1ncm91cHMtaXRlcmF0b3IgPlxuICAgIDwvZGl2PlxuICBgLFxuXG4gIGRhdGE6IHtcbiAgICByb2JvdElzVHlwaW5nOiBmYWxzZSxcblxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICB7IHRleHQ6ICdjb3Vjb3UgPycsIGZyb21Vc2VyOiB0cnVlLCBsYXN0U2VlbjogdHJ1ZSB9XG4gICAgXVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgJ25vdycgKCkge1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCkgKyAnOicgKyBkYXRlLmdldE1pbnV0ZXMoKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHcm91cCBtZXNzYWdlcyBpbiBhIHdheSB3ZSBjYW4gY29uc3RydWN0XG4gICAgICogdGhlIGNoYXQgaW50ZXJmYWNlXG4gICAgICogYW5kIGFkZCByZWxldmFudCBtZXRhZGF0YVxuICAgICAqL1xuICAgICdtZXNzYWdlR3JvdXBzJyAoKSB7XG4gICAgICBjb25zdCBtZXNzYWdlR3JvdXBzID0gW11cblxuICAgICAgXy5mb3JFYWNoKHRoaXMubWVzc2FnZXMsIGZ1bmN0aW9uIChtZXNzYWdlLCBrZXksIG1lc3NhZ2VzKSB7XG4gICAgICAgIGNvbnN0IGxhc3RNZXNzYWdlR3JvdXAgPSBfLmxhc3QobWVzc2FnZUdyb3VwcylcbiAgICAgICAgY29uc3Qgc2hvdWxkQ3JlYXRlTmV3R3JvdXAgPSBfLmlzRW1wdHkobGFzdE1lc3NhZ2VHcm91cCkgfHxcbiAgICAgICAgICAobGFzdE1lc3NhZ2VHcm91cC5mcm9tVXNlciAhPT0gbWVzc2FnZS5mcm9tVXNlcilcblxuICAgICAgICBpZiAoc2hvdWxkQ3JlYXRlTmV3R3JvdXApIHtcbiAgICAgICAgICBjb25zdCBuZXdNZXNzYWdlR3JvdXAgPSB7XG4gICAgICAgICAgICBtZXNzYWdlczogW21lc3NhZ2VdLFxuICAgICAgICAgICAgZnJvbVVzZXI6IG1lc3NhZ2UuZnJvbVVzZXJcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtZXNzYWdlR3JvdXBzLnB1c2gobmV3TWVzc2FnZUdyb3VwKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgbGFzdE1lc3NhZ2VHcm91cC5tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpXG4gICAgICB9KVxuXG4gICAgICAvLyBBZGRpbmcgdHlwaW5nIGluZGljYXRvciBpZiBuZWNlc3NhcnlcbiAgICAgIGNvbnN0IGxhc3RNZXNzYWdlR3JvdXAgPSBfLmxhc3QobWVzc2FnZUdyb3VwcylcbiAgICAgIGNvbnN0IHNob3VsZENyZWF0ZU5ld1JvYm90R3JvdXAgPSBfLmlzRW1wdHkobGFzdE1lc3NhZ2VHcm91cCkgfHwgbGFzdE1lc3NhZ2VHcm91cC5mcm9tVXNlclxuXG4gICAgICBpZiAoc2hvdWxkQ3JlYXRlTmV3Um9ib3RHcm91cCkge1xuICAgICAgICBjb25zdCBuZXdSb2JvdE1lc3NhZ2VHcm91cCA9IHtcbiAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgZnJvbVVzZXI6IGZhbHNlLFxuICAgICAgICAgIGlzVHlwaW5nOiB0aGlzLnJvYm90SXNUeXBpbmdcbiAgICAgICAgfVxuXG4gICAgICAgIG1lc3NhZ2VHcm91cHMucHVzaChuZXdSb2JvdE1lc3NhZ2VHcm91cClcblxuICAgICAgICByZXR1cm4gbWVzc2FnZUdyb3Vwc1xuICAgICAgfVxuXG4gICAgICBsYXN0TWVzc2FnZUdyb3VwLmlzVHlwaW5nID0gdGhpcy5yb2JvdElzVHlwaW5nXG5cbiAgICAgIHJldHVybiBtZXNzYWdlR3JvdXBzXG4gICAgfVxuICB9XG59KVxuXG5WdWVzLm1lc3NlbmdlckNvbnRlbnRFZGl0YWJsZUlucHV0ID0gYFxuICA8ZGl2IGNsYXNzPVwiXzVycDcgXzVycDhcIj5cbiAgICA8ZGl2IGNsYXNzPVwiXzFwMXRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJfMXAxdlwiIGlkPVwicGxhY2Vob2xkZXItOWlnZGVcIj5cbiAgICAgIFR5cGUgYSBtZXNzYWdlLi4uPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIl81cnBiXCI+XG4gICAgICA8ZGl2IGFyaWEtYXV0b2NvbXBsZXRlPVwibGlzdFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJwbGFjZWhvbGRlci05aWdkZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGFyaWEtaGFzcG9wdXA9XCJmYWxzZVwiIGFyaWEtbGFiZWw9XCJUeXBlIGEgbWVzc2FnZS4uLlwiIGFyaWEtb3ducz1cImpzXzF5dFwiIGNsYXNzPVwiXzVycHVcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIgZGF0YS1pbnRlcmFjdGlvbi1yb290LWlkPVwiX2MxbVwiIHJvbGU9XCJjb21ib2JveFwiIHNwZWxsY2hlY2s9XCJ0cnVlXCIgdGFiaW5kZXg9XCIwXCIgc3R5bGU9XCJvdXRsaW5lOiBub25lOyB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7IHdvcmQtd3JhcDogYnJlYWstd29yZDtcIj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbmBcblxuVnVlcy5pbnB1dEFwcCA9IG5ldyBWdWUoe1xuICBlbDogJyNpbnB1dEJsb2NrJyxcblxuICBkYXRhOiB7XG4gICAgbmV3TWVzc2FnZVRleHQ6ICcnXG4gIH0sXG5cbiAgLy8gdGVtcGxhdGU6IG1lc3NlbmdlckNvbnRlbnRFZGl0YWJsZUlucHV0LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJfNXJwNyBfNXJwOFwiPlxuICAgICAgPGlucHV0XG4gICAgICAgIGF1dG9mb2N1c1xuICAgICAgICBwbGFjZWhvbGRlcj1cIlR5cGUgYSBtZXNzYWdlLi4uXCIgXG4gICAgICAgIHYtbW9kZWw9XCJuZXdNZXNzYWdlVGV4dFwiXG4gICAgICAgIEBrZXl1cC5lbnRlcj1cInNlbmROZXdNZXNzYWdlXCJcbiAgICAgID5cbiAgICA8L2Rpdj5cbiAgYCxcblxuICBtZXRob2RzOiB7XG4gICAgc2VuZE5ld01lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwcC5tZXNzYWdlcy5wdXNoKHsgdGV4dDogdGhpcy5uZXdNZXNzYWdlVGV4dCwgZnJvbVVzZXI6IHRydWUgfSlcbiAgICAgIHRoaXMubmV3TWVzc2FnZVRleHQgPSAnJ1xuICAgIH1cbiAgfVxufSlcbiJdfQ==

//# sourceMappingURL=maps/index.js.map
