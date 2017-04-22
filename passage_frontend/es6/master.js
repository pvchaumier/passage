export const Master = {}
// text Model
// text = {
//  text : ''
// }

const waitTime = ({text, waitTime = null}) => waitTime ? waitTime * 1000 : Math.random() * 5 * 1000
const typingTime = ({text, typingTime = null}) => typingTime ? typingTime * 1000 : (text.length + 20 * Math.random()) / 8 * 1000

Master.slowlyApplyToTexts = ({
  texts,
  onBeginWait,
  onBeginTyping,
  onEndTyping,
  onEndOfTexts
}) => {
  function processNextText () {
    if (!_.isEmpty(texts)) return processText(texts.shift())
    onEndOfTexts()
  }

  function processText (text) {
    const endOfProcessing = () => {
      onEndTyping(text)
      processNextText()
    }

    const startTyping = () => {
      onBeginTyping(text)
      setTimeout(endOfProcessing, typingTime(text))
    }

    const startWaiting = () => {
      onBeginWait(text)
      setTimeout(startTyping, waitTime(text))
    }

    startWaiting()
  }

  processNextText()
}
