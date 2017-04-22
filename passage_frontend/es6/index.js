import { app, inputApp } from './vue.js'
import { Master } from './master.js'
import { texts } from './patrick-texts.js'

Master.slowlyApplyToTexts({
  texts,
  onBeginWait: console.log,
  onBeginTyping: (text) => {
    app.setRobotIsTyping(true)
  },
  onEndTyping: (text) => {
    app.setRobotIsTyping(false)
    app.addMessage(_.extend(text,
      { fromUser: false, lastSeen: false }
    ))
  },
  onEndOfTexts: console.log
})
