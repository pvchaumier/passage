if (self.CavalryLogger) { CavalryLogger.start_js(["fgdMN"]); }

__d('PagesMessagingMercuryChatTabActions',['PagesMessagingMercuryChatTabActionKeys','PagesMessagingMercuryChatTabDispatcher'],(function a(b,c,d,e,f,g){'use strict';var h={requestGreetingConfig:function i(j){c('PagesMessagingMercuryChatTabDispatcher').dispatch({actionType:c('PagesMessagingMercuryChatTabActionKeys').REQUEST_GREETING_CONFIG,threadID:j});},notifyGreetingConfigReceived:function i(j,k){c('PagesMessagingMercuryChatTabDispatcher').dispatch({actionType:c('PagesMessagingMercuryChatTabActionKeys').NOTIFY_GREETING_CONFIG_RECEIVED,threadID:j,payload:k});},sayHello:function i(j){c('PagesMessagingMercuryChatTabDispatcher').dispatch({actionType:c('PagesMessagingMercuryChatTabActionKeys').SAY_HELLO,threadID:j});}};f.exports=h;}),null);