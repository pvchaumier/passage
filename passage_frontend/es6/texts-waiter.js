// text Model
// text = {
//  text : ''
//  waitTime,
//  typingTime
// }

const waitTime = ({text, waitTime = null}) => !_.isNull(waitTime) ? waitTime * 1000 : Math.random() * 5 * 1000
const typingTime = ({text, typingTime = null}) => !_.isNull(typingTime) ? typingTime * 1000 : (text.length + 20 * Math.random()) / 8 * 1000
export const isWaitForInput = ({text}) => _.includes(text, '__input__')

export class TextsWaiter {
  constructor ({
    texts
  }) {
    this.texts = texts
    this.canResume = false
  }

  setCanResume (canResume) {
    this.canResume = canResume
  }

  slowlyApplyToTexts ({
    onBeginWait,
    onBeginTyping,
    onEndTyping,
    onBeginWaitForInput,
    onInputReceived,
    onEndOfTexts
  }) {
    const processNextText = () => {
      if (!_.isEmpty(this.texts)) return processText(this.texts.shift())
      onEndOfTexts()
    }

    const processText = (text) => {
      const endOfProcessing = () => {
        onEndTyping(text)
        processNextText()
      }

      const startTyping = () => {
        onBeginTyping(text)
        setTimeout(endOfProcessing, typingTime(text))
      }

      const startWaiting = (continueWaiting = false) => {
        onBeginWait(text)

        if (continueWaiting && !this.canResume) return setTimeout(_.partial(startWaiting, continueWaiting), waitTime(text))

        return setTimeout(startTyping, waitTime(text))
      }

      if (isWaitForInput(text)) {
        const defaultInputTextParams = {
          waitTime: 0.1,
          typingTime: 0
        }
        text = _.defaults(text, defaultInputTextParams)

        this.canResume = false

        return startWaiting(true)
      }

      return startWaiting()
    }

    processNextText()
  }
}
