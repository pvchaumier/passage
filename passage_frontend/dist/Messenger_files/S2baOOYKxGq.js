if (self.CavalryLogger) { CavalryLogger.start_js(["N+Xda"]); }

__d('MercuryLWARenderer',['MercuryConfig','MessengerTextWithEntities.react','MessengerLightweightActionUtils','React','TextWithEntities.react'],(function a(b,c,d,e,f,g){'use strict';var h={renderCollapsedText:function i(j){var k=null;if(c('MercuryConfig').MessengerNewEmojiGK){k=c('React').createElement(c('MessengerTextWithEntities.react'),{renderEmoji:true,renderEmoticons:true,text:c('MessengerLightweightActionUtils').getCollapsedLWAText(j)});}else k=c('React').createElement(c('TextWithEntities.react'),{renderEmoji:true,renderEmoticons:true,text:c('MessengerLightweightActionUtils').getCollapsedLWAText(j)});return c('React').createElement('span',null,k);}};f.exports=h;}),null);