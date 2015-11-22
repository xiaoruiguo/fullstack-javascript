//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){var t,e=this,i=e.Backbone,n=[],s=n.push,r=n.slice,a=n.splice;t="undefined"!=typeof exports?exports:e.Backbone={},t.VERSION="0.9.10";var o=e._;o||"undefined"==typeof require||(o=require("underscore")),t.$=e.jQuery||e.Zepto||e.ender,t.noConflict=function(){return e.Backbone=i,this},t.emulateHTTP=!1,t.emulateJSON=!1;var h=/\s+/,l=function(t,e,i,n){if(!i)return!0;if("object"==typeof i)for(var s in i)t[e].apply(t,[s,i[s]].concat(n));else{if(!h.test(i))return!0;for(var r=i.split(h),a=0,o=r.length;o>a;a++)t[e].apply(t,[r[a]].concat(n))}},c=function(t,e){var i,n=-1,s=t.length;switch(e.length){case 0:for(;s>++n;)(i=t[n]).callback.call(i.ctx);return;case 1:for(;s>++n;)(i=t[n]).callback.call(i.ctx,e[0]);return;case 2:for(;s>++n;)(i=t[n]).callback.call(i.ctx,e[0],e[1]);return;case 3:for(;s>++n;)(i=t[n]).callback.call(i.ctx,e[0],e[1],e[2]);return;default:for(;s>++n;)(i=t[n]).callback.apply(i.ctx,e)}},u=t.Events={on:function(t,e,i){if(!l(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var n=this._events[t]||(this._events[t]=[]);return n.push({callback:e,context:i,ctx:i||this}),this},once:function(t,e,i){if(!l(this,"once",t,[e,i])||!e)return this;var n=this,s=o.once(function(){n.off(t,s),e.apply(this,arguments)});return s._callback=e,this.on(t,s,i),this},off:function(t,e,i){var n,s,r,a,h,c,u,d;if(!this._events||!l(this,"off",t,[e,i]))return this;if(!t&&!e&&!i)return this._events={},this;for(a=t?[t]:o.keys(this._events),h=0,c=a.length;c>h;h++)if(t=a[h],n=this._events[t]){if(r=[],e||i)for(u=0,d=n.length;d>u;u++)s=n[u],(e&&e!==s.callback&&e!==s.callback._callback||i&&i!==s.context)&&r.push(s);this._events[t]=r}return this},trigger:function(t){if(!this._events)return this;var e=r.call(arguments,1);if(!l(this,"trigger",t,e))return this;var i=this._events[t],n=this._events.all;return i&&c(i,e),n&&c(n,arguments),this},listenTo:function(t,e,i){var n=this._listeners||(this._listeners={}),s=t._listenerId||(t._listenerId=o.uniqueId("l"));return n[s]=t,t.on(e,"object"==typeof e?this:i,this),this},stopListening:function(t,e,i){var n=this._listeners;if(n){if(t)t.off(e,"object"==typeof e?this:i,this),e||i||delete n[t._listenerId];else{"object"==typeof e&&(i=this);for(var s in n)n[s].off(e,i,this);this._listeners={}}return this}}};u.bind=u.on,u.unbind=u.off,o.extend(t,u);var d=t.Model=function(t,e){var i,n=t||{};this.cid=o.uniqueId("c"),this.attributes={},e&&e.collection&&(this.collection=e.collection),e&&e.parse&&(n=this.parse(n,e)||{}),(i=o.result(this,"defaults"))&&(n=o.defaults({},n,i)),this.set(n,e),this.changed={},this.initialize.apply(this,arguments)};o.extend(d.prototype,u,{changed:null,idAttribute:"id",initialize:function(){},toJSON:function(){return o.clone(this.attributes)},sync:function(){return t.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return o.escape(this.get(t))},has:function(t){return null!=this.get(t)},set:function(t,e,i){var n,s,r,a,h,l,c,u;if(null==t)return this;if("object"==typeof t?(s=t,i=e):(s={})[t]=e,i||(i={}),!this._validate(s,i))return!1;r=i.unset,h=i.silent,a=[],l=this._changing,this._changing=!0,l||(this._previousAttributes=o.clone(this.attributes),this.changed={}),u=this.attributes,c=this._previousAttributes,this.idAttribute in s&&(this.id=s[this.idAttribute]);for(n in s)e=s[n],o.isEqual(u[n],e)||a.push(n),o.isEqual(c[n],e)?delete this.changed[n]:this.changed[n]=e,r?delete u[n]:u[n]=e;if(!h){a.length&&(this._pending=!0);for(var d=0,p=a.length;p>d;d++)this.trigger("change:"+a[d],this,u[a[d]],i)}if(l)return this;if(!h)for(;this._pending;)this._pending=!1,this.trigger("change",this,i);return this._pending=!1,this._changing=!1,this},unset:function(t,e){return this.set(t,void 0,o.extend({},e,{unset:!0}))},clear:function(t){var e={};for(var i in this.attributes)e[i]=void 0;return this.set(e,o.extend({},t,{unset:!0}))},hasChanged:function(t){return null==t?!o.isEmpty(this.changed):o.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?o.clone(this.changed):!1;var e,i=!1,n=this._changing?this._previousAttributes:this.attributes;for(var s in t)o.isEqual(n[s],e=t[s])||((i||(i={}))[s]=e);return i},previous:function(t){return null!=t&&this._previousAttributes?this._previousAttributes[t]:null},previousAttributes:function(){return o.clone(this._previousAttributes)},fetch:function(t){t=t?o.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=t.success;return t.success=function(t,i,n){return t.set(t.parse(i,n),n)?(e&&e(t,i,n),void 0):!1},this.sync("read",this,t)},save:function(t,e,i){var n,s,r,a,h=this.attributes;return null==t||"object"==typeof t?(n=t,i=e):(n={})[t]=e,!n||i&&i.wait||this.set(n,i)?(i=o.extend({validate:!0},i),this._validate(n,i)?(n&&i.wait&&(this.attributes=o.extend({},h,n)),void 0===i.parse&&(i.parse=!0),s=i.success,i.success=function(t,e,i){t.attributes=h;var r=t.parse(e,i);return i.wait&&(r=o.extend(n||{},r)),o.isObject(r)&&!t.set(r,i)?!1:(s&&s(t,e,i),void 0)},r=this.isNew()?"create":i.patch?"patch":"update","patch"===r&&(i.attrs=n),a=this.sync(r,this,i),n&&i.wait&&(this.attributes=h),a):!1):!1},destroy:function(t){t=t?o.clone(t):{};var e=this,i=t.success,n=function(){e.trigger("destroy",e,e.collection,t)};if(t.success=function(t,e,s){(s.wait||t.isNew())&&n(),i&&i(t,e,s)},this.isNew())return t.success(this,null,t),!1;var s=this.sync("delete",this,t);return t.wait||n(),s},url:function(){var t=o.result(this,"urlRoot")||o.result(this.collection,"url")||H();return this.isNew()?t:t+("/"===t.charAt(t.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(t){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},isValid:function(t){return!this.validate||!this.validate(this.attributes,t)},_validate:function(t,e){if(!e.validate||!this.validate)return!0;t=o.extend({},this.attributes,t);var i=this.validationError=this.validate(t,e)||null;return i?(this.trigger("invalid",this,i,e||{}),!1):!0}});var p=t.Collection=function(t,e){e||(e={}),e.model&&(this.model=e.model),void 0!==e.comparator&&(this.comparator=e.comparator),this.models=[],this._reset(),this.initialize.apply(this,arguments),t&&this.reset(t,o.extend({silent:!0},e))};o.extend(p.prototype,u,{model:d,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return t.sync.apply(this,arguments)},add:function(t,e){t=o.isArray(t)?t.slice():[t],e||(e={});var i,n,r,h,l,c,u,d,p,f;for(u=[],d=e.at,p=this.comparator&&null==d&&0!=e.sort,f=o.isString(this.comparator)?this.comparator:null,i=0,n=t.length;n>i;i++)(r=this._prepareModel(h=t[i],e))?(l=this.get(r))?e.merge&&(l.set(h===r?r.attributes:h,e),p&&!c&&l.hasChanged(f)&&(c=!0)):(u.push(r),r.on("all",this._onModelEvent,this),this._byId[r.cid]=r,null!=r.id&&(this._byId[r.id]=r)):this.trigger("invalid",this,h,e);if(u.length&&(p&&(c=!0),this.length+=u.length,null!=d?a.apply(this.models,[d,0].concat(u)):s.apply(this.models,u)),c&&this.sort({silent:!0}),e.silent)return this;for(i=0,n=u.length;n>i;i++)(r=u[i]).trigger("add",r,this,e);return c&&this.trigger("sort",this,e),this},remove:function(t,e){t=o.isArray(t)?t.slice():[t],e||(e={});var i,n,s,r;for(i=0,n=t.length;n>i;i++)r=this.get(t[i]),r&&(delete this._byId[r.id],delete this._byId[r.cid],s=this.indexOf(r),this.models.splice(s,1),this.length--,e.silent||(e.index=s,r.trigger("remove",r,this,e)),this._removeReference(r));return this},push:function(t,e){return t=this._prepareModel(t,e),this.add(t,o.extend({at:this.length},e)),t},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t),e},unshift:function(t,e){return t=this._prepareModel(t,e),this.add(t,o.extend({at:0},e)),t},shift:function(t){var e=this.at(0);return this.remove(e,t),e},slice:function(t,e){return this.models.slice(t,e)},get:function(t){return null==t?void 0:(this._idAttr||(this._idAttr=this.model.prototype.idAttribute),this._byId[t.id||t.cid||t[this._idAttr]||t])},at:function(t){return this.models[t]},where:function(t){return o.isEmpty(t)?[]:this.filter(function(e){for(var i in t)if(t[i]!==e.get(i))return!1;return!0})},sort:function(t){if(!this.comparator)throw Error("Cannot sort a set without a comparator");return t||(t={}),o.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(o.bind(this.comparator,this)),t.silent||this.trigger("sort",this,t),this},pluck:function(t){return o.invoke(this.models,"get",t)},update:function(t,e){e=o.extend({add:!0,merge:!0,remove:!0},e),e.parse&&(t=this.parse(t,e));var i,n,s,r,a=[],h=[],l={};if(o.isArray(t)||(t=t?[t]:[]),e.add&&!e.remove)return this.add(t,e);for(n=0,s=t.length;s>n;n++)i=t[n],r=this.get(i),e.remove&&r&&(l[r.cid]=!0),(e.add&&!r||e.merge&&r)&&a.push(i);if(e.remove)for(n=0,s=this.models.length;s>n;n++)i=this.models[n],l[i.cid]||h.push(i);return h.length&&this.remove(h,e),a.length&&this.add(a,e),this},reset:function(t,e){e||(e={}),e.parse&&(t=this.parse(t,e));for(var i=0,n=this.models.length;n>i;i++)this._removeReference(this.models[i]);return e.previousModels=this.models.slice(),this._reset(),t&&this.add(t,o.extend({silent:!0},e)),e.silent||this.trigger("reset",this,e),this},fetch:function(t){t=t?o.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=t.success;return t.success=function(t,i,n){var s=n.update?"update":"reset";t[s](i,n),e&&e(t,i,n)},this.sync("read",this,t)},create:function(t,e){if(e=e?o.clone(e):{},!(t=this._prepareModel(t,e)))return!1;e.wait||this.add(t,e);var i=this,n=e.success;return e.success=function(t,e,s){s.wait&&i.add(t,s),n&&n(t,e,s)},t.save(null,e),t},parse:function(t){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0,this.models.length=0,this._byId={}},_prepareModel:function(t,e){if(t instanceof d)return t.collection||(t.collection=this),t;e||(e={}),e.collection=this;var i=new this.model(t,e);return i._validate(t,e)?i:!1},_removeReference:function(t){this===t.collection&&delete t.collection,t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,n){("add"!==t&&"remove"!==t||i===this)&&("destroy"===t&&this.remove(e,n),e&&t==="change:"+e.idAttribute&&(delete this._byId[e.previous(e.idAttribute)],null!=e.id&&(this._byId[e.id]=e)),this.trigger.apply(this,arguments))},sortedIndex:function(t,e,i){e||(e=this.comparator);var n=o.isFunction(e)?e:function(t){return t.get(e)};return o.sortedIndex(this.models,t,n,i)}});var f=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","indexOf","shuffle","lastIndexOf","isEmpty","chain"];o.each(f,function(t){p.prototype[t]=function(){var e=r.call(arguments);return e.unshift(this.models),o[t].apply(o,e)}});var g=["groupBy","countBy","sortBy"];o.each(g,function(t){p.prototype[t]=function(e,i){var n=o.isFunction(e)?e:function(t){return t.get(e)};return o[t](this.models,n,i)}});var m=t.Router=function(t){t||(t={}),t.routes&&(this.routes=t.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},v=/\((.*?)\)/g,b=/(\(\?)?:\w+/g,y=/\*\w+/g,_=/[\-{}\[\]+?.,\\\^$|#\s]/g;o.extend(m.prototype,u,{initialize:function(){},route:function(e,i,n){return o.isRegExp(e)||(e=this._routeToRegExp(e)),n||(n=this[i]),t.history.route(e,o.bind(function(s){var r=this._extractParameters(e,s);n&&n.apply(this,r),this.trigger.apply(this,["route:"+i].concat(r)),this.trigger("route",i,r),t.history.trigger("route",this,i,r)},this)),this},navigate:function(e,i){return t.history.navigate(e,i),this},_bindRoutes:function(){if(this.routes)for(var t,e=o.keys(this.routes);null!=(t=e.pop());)this.route(t,this.routes[t])},_routeToRegExp:function(t){return t=t.replace(_,"\\$&").replace(v,"(?:$1)?").replace(b,function(t,e){return e?t:"([^/]+)"}).replace(y,"(.*?)"),RegExp("^"+t+"$")},_extractParameters:function(t,e){return t.exec(e).slice(1)}});var w=t.History=function(){this.handlers=[],o.bindAll(this,"checkUrl"),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},x=/^[#\/]|\s+$/g,E=/^\/+|\/+$/g,k=/msie [\w.]+/,$=/\/$/;w.started=!1,o.extend(w.prototype,u,{interval:50,getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(null==t)if(this._hasPushState||!this._wantsHashChange||e){t=this.location.pathname;var i=this.root.replace($,"");t.indexOf(i)||(t=t.substr(i.length))}else t=this.getHash();return t.replace(x,"")},start:function(e){if(w.started)throw Error("Backbone.history has already been started");w.started=!0,this.options=o.extend({},{root:"/"},this.options,e),this.root=this.options.root,this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var i=this.getFragment(),n=document.documentMode,s=k.exec(navigator.userAgent.toLowerCase())&&(!n||7>=n);this.root=("/"+this.root+"/").replace(E,"/"),s&&this._wantsHashChange&&(this.iframe=t.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(i)),this._hasPushState?t.$(window).on("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!s?t.$(window).on("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=i;var r=this.location,a=r.pathname.replace(/[^\/]$/,"$&/")===this.root;return this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!a?(this.fragment=this.getFragment(null,!0),this.location.replace(this.root+this.location.search+"#"+this.fragment),!0):(this._wantsPushState&&this._hasPushState&&a&&r.hash&&(this.fragment=this.getHash().replace(x,""),this.history.replaceState({},document.title,this.root+this.fragment+r.search)),this.options.silent?void 0:this.loadUrl())},stop:function(){t.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),w.started=!1},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(){var t=this.getFragment();return t===this.fragment&&this.iframe&&(t=this.getFragment(this.getHash(this.iframe))),t===this.fragment?!1:(this.iframe&&this.navigate(t),this.loadUrl()||this.loadUrl(this.getHash()),void 0)},loadUrl:function(t){var e=this.fragment=this.getFragment(t),i=o.any(this.handlers,function(t){return t.route.test(e)?(t.callback(e),!0):void 0});return i},navigate:function(t,e){if(!w.started)return!1;if(e&&e!==!0||(e={trigger:e}),t=this.getFragment(t||""),this.fragment!==t){this.fragment=t;var i=this.root+t;if(this._hasPushState)this.history[e.replace?"replaceState":"pushState"]({},document.title,i);else{if(!this._wantsHashChange)return this.location.assign(i);this._updateHash(this.location,t,e.replace),this.iframe&&t!==this.getFragment(this.getHash(this.iframe))&&(e.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,t,e.replace))}e.trigger&&this.loadUrl(t)}},_updateHash:function(t,e,i){if(i){var n=t.href.replace(/(javascript:|#).*$/,"");t.replace(n+"#"+e)}else t.hash="#"+e}}),t.history=new w;var S=t.View=function(t){this.cid=o.uniqueId("view"),this._configure(t||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},T=/^(\S+)\s*(.*)$/,A=["model","collection","el","id","attributes","className","tagName","events"];o.extend(S.prototype,u,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this.stopListening(),this},setElement:function(e,i){return this.$el&&this.undelegateEvents(),this.$el=e instanceof t.$?e:t.$(e),this.el=this.$el[0],i!==!1&&this.delegateEvents(),this},delegateEvents:function(t){if(t||(t=o.result(this,"events"))){this.undelegateEvents();for(var e in t){var i=t[e];if(o.isFunction(i)||(i=this[t[e]]),!i)throw Error('Method "'+t[e]+'" does not exist');var n=e.match(T),s=n[1],r=n[2];i=o.bind(i,this),s+=".delegateEvents"+this.cid,""===r?this.$el.on(s,i):this.$el.on(s,r,i)}}},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid)},_configure:function(t){this.options&&(t=o.extend({},o.result(this,"options"),t)),o.extend(this,o.pick(t,A)),this.options=t},_ensureElement:function(){if(this.el)this.setElement(o.result(this,"el"),!1);else{var e=o.extend({},o.result(this,"attributes"));this.id&&(e.id=o.result(this,"id")),this.className&&(e["class"]=o.result(this,"className"));var i=t.$("<"+o.result(this,"tagName")+">").attr(e);this.setElement(i,!1)}}});var C={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};t.sync=function(e,i,n){var s=C[e];o.defaults(n||(n={}),{emulateHTTP:t.emulateHTTP,emulateJSON:t.emulateJSON});var r={type:s,dataType:"json"};if(n.url||(r.url=o.result(i,"url")||H()),null!=n.data||!i||"create"!==e&&"update"!==e&&"patch"!==e||(r.contentType="application/json",r.data=JSON.stringify(n.attrs||i.toJSON(n))),n.emulateJSON&&(r.contentType="application/x-www-form-urlencoded",r.data=r.data?{model:r.data}:{}),n.emulateHTTP&&("PUT"===s||"DELETE"===s||"PATCH"===s)){r.type="POST",n.emulateJSON&&(r.data._method=s);var a=n.beforeSend;n.beforeSend=function(t){return t.setRequestHeader("X-HTTP-Method-Override",s),a?a.apply(this,arguments):void 0}}"GET"===r.type||n.emulateJSON||(r.processData=!1);var h=n.success;n.success=function(t){h&&h(i,t,n),i.trigger("sync",i,t,n)};var l=n.error;n.error=function(t){l&&l(i,t,n),i.trigger("error",i,t,n)};var c=n.xhr=t.ajax(o.extend(r,n));return i.trigger("request",i,c,n),c},t.ajax=function(){return t.$.ajax.apply(t.$,arguments)};var N=function(t,e){var i,n=this;i=t&&o.has(t,"constructor")?t.constructor:function(){return n.apply(this,arguments)},o.extend(i,n,e);var s=function(){this.constructor=i};return s.prototype=n.prototype,i.prototype=new s,t&&o.extend(i.prototype,t),i.__super__=n.prototype,i};d.extend=p.extend=m.extend=S.extend=w.extend=N;var H=function(){throw Error('A "url" property or function must be specified')}}).call(this);