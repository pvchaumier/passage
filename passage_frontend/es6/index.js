import { MessengerVue } from './messenger-vue.js'
import { isWaitForInput, TextsWaiter } from './texts-waiter.js'
import { texts } from './patrick-texts.js'

const patrickMessengerVue = new MessengerVue()

const textsWaiter = new TextsWaiter({
  texts
})

patrickMessengerVue.onMessageInput.push(() => {
  textsWaiter.setCanResume(true)
})

textsWaiter.slowlyApplyToTexts({
  onBeginWait: console.log,
  onBeginTyping: (text) => {
    patrickMessengerVue.mainVue.setRobotIsTyping(true)
  },
  onEndTyping: (text) => {
    if (!isWaitForInput(text)) {
      patrickMessengerVue.mainVue.addMessage(_.extend(text,
        { fromUser: false, lastSeen: false }
      ))
    }
    patrickMessengerVue.mainVue.setRobotIsTyping(false)
  },
  onEndOfTexts: console.log
})
