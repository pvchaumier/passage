if (self.CavalryLogger) { CavalryLogger.start_js(["4B8lS"]); }

__d('MessengerGamesCustomUpdateAdminContainer.react',['fbt','MessengerGamesCustomUpdateAdmin.react','MessengerGamesCustomUpdateData','React','RelayFBEnvironment','RelayModern','MessengerGamesCustomUpdateAdminContainerQuery.graphql','RelayQL_GENERATED'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k,l=c('RelayModern').QueryRenderer,m=c('RelayModern').graphql;i=babelHelpers.inherits(n,c('React').Component);j=i&&i.prototype;n.prototype.render=function(){return c('React').createElement(l,{environment:c('RelayFBEnvironment'),query:k||(k={modern:function o(){return c('MessengerGamesCustomUpdateAdminContainerQuery.graphql');},classic:function o(){var p=c('RelayQL_GENERATED'),q=MessengerGamesCustomUpdateAdmin.getFragment('gameInfo'),r=MessengerGamesCustomUpdateAdmin.getFragment('image');return {kind:'OperationDefinition',argumentDefinitions:[{defaultValue:null,kind:'LocalArgument',name:'fetchPhoto'},{defaultValue:null,kind:'LocalArgument',name:'gameID'},{defaultValue:null,kind:'LocalArgument',name:'photoID'}],name:'MessengerGamesCustomUpdateAdminContainerQuery',operation:'query',node:function(){return {children:[{calls:[{kind:'Call',metadata:{},name:'id',value:{kind:'CallVariable',callVariableName:'gameID'}}],children:[{fieldName:'id',kind:'Field',metadata:{isGenerated:true,isRequisite:true},type:'ID'},{fieldName:'__typename',kind:'Field',metadata:{isGenerated:true,isRequisite:true},type:'String'},{children:[{alias:'gameInfo',children:[].concat.apply([],[p.__frag(q)]),fieldName:'instant_game_info',kind:'Field',metadata:{canHaveSubselections:true},type:'GamesInstantPlayStyleInfo'},{fieldName:'id',kind:'Field',metadata:{isGenerated:true,isRequisite:true},type:'ID'}],id:p.__id(),kind:'Fragment',metadata:{},name:'Application',type:'Application'}],fieldName:'node',kind:'Field',metadata:{canHaveSubselections:true,inferredRootCallName:'node',inferredPrimaryKey:'id',isAbstract:true},type:'Node'},{calls:[{kind:'Call',metadata:{},name:'id',value:{kind:'CallVariable',callVariableName:'photoID'}}],children:[{children:[].concat.apply([],[p.__frag(r)]),fieldName:'image',kind:'Field',metadata:{canHaveSubselections:true},type:'Image'},{fieldName:'id',kind:'Field',metadata:{isGenerated:true,isRequisite:true},type:'ID'}],directives:[{kind:'Directive',name:'include',args:[{name:'if',value:{kind:'CallVariable',callVariableName:'fetchPhoto'}}]}],fieldName:'photo',kind:'Field',metadata:{canHaveSubselections:true,inferredRootCallName:'node',inferredPrimaryKey:'id'},type:'Photo'}],id:p.__id(),kind:'Fragment',metadata:{},name:'MessengerGamesCustomUpdateAdminContainerQuery',type:'Query'};}()};}}),variables:{fetchPhoto:this.props.data.getImageID()!=null,gameID:this.props.gameID,photoID:this.props.data.getImageID()||undefined},render:function(o){var p=o.error,q=o.props;if(p){return c('React').createElement('div',null,h._("Failed to Load"));}else if(q)return c('React').createElement(c('MessengerGamesCustomUpdateAdmin.react'),babelHelpers['extends']({},this.props,{gameInfo:q.node.gameInfo,image:q.photo&&q.photo.image}));return this.props.renderLoading();}.bind(this)});};function n(){i.apply(this,arguments);}f.exports=n;}),null);