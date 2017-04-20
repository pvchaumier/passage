Vue.component('message-groups-iterator', {
  props: ['messageGroups'],
  template: `
    <div>
      <message-group-dispatcher
        v-for="messageGroup in messageGroups"
        v-bind:messageGroup="messageGroup"
      >
      </message-group-dispatcher>
    </div>
  `
});

Vue.component('message-group-dispatcher', {
  props: ['messageGroup'],
  template: `
    <user-messages-container
      v-if="messageGroup.fromUser"
      v-bind:userMessages="messageGroup.messages"
    >
    </user-messages-container>
    <robot-messages-container
      v-else
      v-bind:robotMessages="messageGroup.messages"
      v-bind:isTyping="messageGroup.isTyping"
    >
    </robot-messages-container>
  `
});

Vue.component('user-messages-container', {
  props: ['userMessages'],
  template: `
    <div class="_1t_p clearfix">
      <div class="_41ud">
        <h5 class="_ih3 _-ne">
          <span class="_3oh-">Mickaël</span>
        </h5>
        <user-message 
          v-for="message in userMessages" 
          v-bind:message="message"
        >
        </user-message>
      </div>
    </div>
  `
});

Vue.component('user-message', {
  props: ['message'],
  template: `
    <div class="clearfix _o46 _3erg _3i_m _nd_ direction_ltr text_align_ltr">
      <div class="_3058 _ui9 _hh7 _s1- _52mr _43by _3oh-" id="js_1zj">
        <div class="_aok">
          <span class="_3oh- _58nk">{{ message.text }}</span>
        </div>
      </div>
      <span class="_40fu"><span class="_2u_d"></span></span>
      <last-seen-message-by-robot v-if="message.lastSeen">
      </last-seen-message-by-robot>
    </div>
  `
});

Vue.component('robot-messages-container', {
  props: ['robotMessages', 'isTyping'],
  template: `
    <div class="_1t_p clearfix">
      <div class="_1t_q">
        <div class="_4ldz _1t_r" data-tooltip-content="Patrick Bateman 4:35pm" data-hover="tooltip" data-tooltip-position="left" style="width: 32px; height: 32px;">
          <div class="_4ld-" style="width: 32px; height: 32px;">
            <img alt="Patrick Bateman" src="./Messenger_files/17499392_1651165904924361_806913937995688309_n.png" height="32" width="32" class="img">
          </div>
          <div class="_4ld_ _2pom">
            <div class="_2pon _2poo">
            </div>
          </div>
        </div>
      </div>
      <div class="_41ud">
        <h5 class="_ih3 _-ne"><span class="_3oh-">Patrick Bateman</span>
        </h5>
        <div class="clearfix _o46 _3erg _29_7 direction_ltr text_align_ltr">
          <template v-for="message in robotMessages">
            <robot-message v-bind:message="message" >
            </robot-message>
            <span class="_40fu"><span class="_2u_d"></span></span>
            <last-seen-message-by-robot v-if="message.lastSeen">
            </last-seen-message-by-robot>
          </template>
          <robot-is-typing-message v-if="isTyping">
          </robot-is-typing-message>
        </div>
      </div>
    </div>
  `
});

Vue.component('robot-message', {
  props: ['message'],
  template: `
    <div class="_3058 _ui9 _hh7 _s1- _52mr _3oh-">
      <div class="_aok">
        <span class="_3oh- _58nk">{{ message.text }}</span>
      </div>
    </div>
  `
});

Vue.component('robot-is-typing-message', {
  template: `
    <div class='jsm-chat-message jsm-left jsm-typing-indicator' style='margin-left: 0px;'>
      <span class='no-wrap-space'></span><span class='no-wrap-space'></span><span class='no-wrap-space'></span>
    </div>
  `
});

Vue.component('last-seen-message-by-robot', {
  template: `<span class="_4jzq _jf4 _jf5"><img alt="Seen by Patrick Bateman at 4:35pm" class="_jf2 img" src="./Messenger_files/17499392_1651165904924361_806913937995688309_n.png" title="Seen by Patrick"></span>`
});

const app = new Vue({
  el: '#js_1',

  template: `
    <div>
      <h4 class="_497p _2lpt">
        <time class="_3oh-"><span id='time'>{{now}}</span></time>
      </h4>
      <message-groups-iterator v-bind:messageGroups="messageGroups"
        v-bind:robotIsTyping="robotIsTyping"
      >
      </message-groups-iterator >
    </div>
  `,

  data: {
    newMessageText: '',

    robotIsTyping: false,

    messages: [{ text: 'test', fromUser: true, lastSeen: false }, { text: 'test2', fromUser: false, lastSeen: true }, { text: 'test3', fromUser: false, lastSeen: true }, { text: 'test4', fromUser: false, lastSeen: true }, { text: 'test56efWWW', fromUser: false, lastSeen: true }]
  },

  computed: {
    'now'() {
      const date = new Date();
      return date.getHours() + ':' + date.getMinutes();
    },

    /**
     * Group messages in a way we can construct
     * the chat interface
     * and add relevant metadata
     */
    'messageGroups'() {
      const messageGroups = [];

      _.forEach(this.messages, function (message, key, messages) {
        const lastMessageGroup = _.last(messageGroups);
        const shouldCreateNewGroup = _.isEmpty(lastMessageGroup) || lastMessageGroup.fromUser !== message.fromUser;

        if (shouldCreateNewGroup) {
          const newMessageGroup = {
            messages: [message],
            fromUser: message.fromUser
          };

          messageGroups.push(newMessageGroup);
          return;
        }

        lastMessageGroup.messages.push(message);
      });

      // Adding typing indicator if necessary
      const lastMessageGroup = _.last(messageGroups);
      const shouldCreateNewRobotGroup = _.isEmpty(lastMessageGroup) || lastMessageGroup.fromUser;

      if (shouldCreateNewRobotGroup) {
        const newRobotMessageGroup = {
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
  },

  methods: {
    sendNewMessage: function () {
      this.messages.push({ text: this.newMessageText, fromUser: true });
      this.newMessageText = '';
    }
  }
});
//# sourceMappingURL=index.js.map
