if (self.CavalryLogger) { CavalryLogger.start_js(["53VOH"]); }

__d('ChatSidebarPageAdminPopoverMenu.react',['ix','cx','fbt','ContextualDialogArrow','Image.react','PopoverMenu.react','React','ReactXUIMenu','XPagesProfileHomeController','XPagesManagerNotificationsController','XPagesManagerInsightsController','XPagesManagerPublishingToolsController','XPagesManagerSettingsController','XPagesManagerMessagesController','XUIMenuSeparator.react','fbglyph'],(function a(b,c,d,e,f,g,h,i,j){'use strict';var k,l,m=c('ReactXUIMenu').Item;k=babelHelpers.inherits(n,c('React').Component);l=k&&k.prototype;n.prototype.render=function(){var o=c('XPagesProfileHomeController').getURIBuilder().setString('page_token',this.props.pageID.toString()).setString('ref',this.props.ref).getURI(),p=c('XPagesManagerNotificationsController').getURIBuilder().setString('page_token',this.props.pageID.toString()).setString('ref',this.props.ref).getURI(),q=c('XPagesManagerInsightsController').getURIBuilder().setString('page_token',this.props.pageID.toString()).setString('referrer',this.props.ref).getURI(),r=c('XPagesManagerPublishingToolsController').getURIBuilder().setString('page_token',this.props.pageID.toString()).setEnum('refSource',this.props.ref).getURI(),s=c('XPagesManagerSettingsController').getURIBuilder().setString('page_token',this.props.pageID.toString()).setString('ref',this.props.ref).getURI(),t=c('XPagesManagerMessagesController').getURIBuilder().setString('page_token',this.props.pageID.toString()).setString('ref',this.props.ref).getURI(),u=this.props.messageEligible?c('React').createElement(m,{href:t},j._("Messages")):null,v=c('React').createElement(c('ReactXUIMenu'),null,c('React').createElement(m,{href:o},j._("View Page")),u,c('React').createElement(m,{href:p},j._("Notifications")),c('React').createElement(m,{href:q},j._("Insights")),c('React').createElement(m,{href:r},j._("Publishing Tools")),c('React').createElement(c('XUIMenuSeparator.react'),null),c('React').createElement(m,{href:s},j._("Settings")));return c('React').createElement(c('PopoverMenu.react'),{alignh:'right',alignv:'baseline',className:"_w_x",layerBehaviors:[c('ContextualDialogArrow')],menu:v},c('React').createElement(c('Image.react'),{src:h("123797")}));};function n(){k.apply(this,arguments);}f.exports=n;}),null);