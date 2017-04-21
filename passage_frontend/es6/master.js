export const Master = {}

const texts = [
  {
    text: 'salut'
  },
  {
    text: '__input__1'
  },
  {
    text: 'dis moi'
  },
  {
    text: "j'ai rien a ecouter la"
  },
  {
    text: "tu m'avais parle d'un groupe"
  },
  {
    text: "c'etait quoi deja ?"
  },
  {
    text: '__input__2'
  },
  {
    text: 'Hm ha oui.'
  },
  {
    text: "C'est cool."
  },
  {
    text: 'ca va toi sinon ? depuis la derniere fois ...mes conseils ont été utiles ?'
  },
  {
    text: 'en vrai'
  },
  {
    text: "j'ai vu les photos sur facebook... t'avais l'air en forme dessus. ca m'a fait plaisir."
  },
  {
    text: ';)'
  },
  {
    text: 'enfin. je connais ces moments tsais'
  },
  {
    text: 'dur de communiquer'
  },
  {
    text: 'ds le brouillard'
  },
  {
    text: 'peurs irrationnelles'
  },
  {
    text: 'bref.'
  },
  {
    text: "d'ailleurs"
  },
  {
    text: "t'as pas 2 minutes la ? J'ai besoin de ton avis sur un truc un peu perso"
  },
  {
    text: '__input__3'
  },
  {
    text: 'cool merci. je te fais confiance pour garder ca pour toi hein.'
  },
  {
    text: "d'ailleurs"
  }
]
const waitTime = ({text, waitTime = null}) => waitTime ? waitTime * 1000 : Math.random() * 5 * 1000
const typingTime = ({text, typingTime = null}) => typingTime ? typingTime * 1000 : (text.length + 20 * Math.random()) / 8 * 1000

const slowlyApplyToTexts = ({
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

Master.run = ({
  app,
  inputApp
}) => {
  slowlyApplyToTexts({
    texts,
    onBeginWait: console.log,
    onBeginTyping: (text) => {
      app.robotIsTyping = true
    },
    onEndTyping: (text) => {
      app.robotIsTyping = false
      app.messages.push(_.extend(text,
        { fromUser: false, lastSeen: false }
      ))
    },
    onEndOfTexts: console.log
  })
  console.log('Running', app)
}
