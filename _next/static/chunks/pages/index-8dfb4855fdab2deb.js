(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{3104:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(5832)}])},5832:function(e,t,r){"use strict";r.r(t),r.d(t,{Index:function(){return Ce},default:function(){return Me}});var n=r(4637),a=r(9496),i=r(8253),o=new Worker(new URL(r.p+r.u(931),r.b));(0,i.vI)();var s=r(7634),l=(0,s.k)(void 0),c=(0,a.createContext)(void 0),u=l.Provider,d=function(e){return(0,s.S)(l,e)},f=c.Provider,p=function(){return(0,a.useContext)(c)},m=r(1626);function h(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function y(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var v=a.memo((function(e){var t=e.active,r=e.children,a=e.className,i=e.disabled,o=e.onClick,s=e.variant,l=void 0===s?"secondary":s,c=y(e,["active","children","className","disabled","onClick","variant"]);return(0,n.jsx)("button",function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){h(e,t,r[t])}))}return e}({disabled:i,onClick:function(e){i||null===o||void 0===o||o(e)},className:(0,m.Z)("border border-gray-700 border-solid cursor-pointer px-2",t&&"bg-blue-700 text-white","primary"===l&&"bg-blue-700 text-white","danger"===l&&"bg-red-900 text-white",i&&"opacity-50",a)},c,{children:null!==r&&void 0!==r?r:"\xa0"}))})),g=function(e){var t=e.progress,r=e.variant,a=void 0===r?"secondary":r;return(0,n.jsx)("div",{className:(0,m.Z)("w-full h-1 origin-left","secondary"===a?"bg-blue-700":"bg-yellow-400"),style:{transform:"scaleX(".concat(t,"%)")}})};function x(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){x(e,t,r[t])}))}return e}function b(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var k=a.memo((function(e){var t=e.children,r=e.className,a=b(e,["children","className"]);return(0,n.jsx)("div",w({className:(0,m.Z)(r)},a,{children:t}))})),j=a.memo((function(e){var t=e.children,r=e.className,a=e.active,i=e.onClick,o=b(e,["children","className","active","onClick"]);return(0,n.jsx)("button",w({onClick:function(e){a||null===i||void 0===i||i(e)},className:(0,m.Z)("cursor-pointer px-3 py-1 border-b-2 border-opacity-0 border-blue-600",a&&"border-opacity-100",r)},o,{children:t}))})),E=r(6696),N=r(6955),T=r.n(N),I=[{key:"letsy",name:"Letsy",resource:"money"},{key:"crafts",name:"Crafts",resource:"money"},{key:"well",name:"Well Water",resource:"water"},{key:"stream",name:"Filtered Water",resource:"water"},{key:"rainfall",name:"Rainfall",resource:"water"},{key:"preserves",name:"Preserves",resource:"food"},{key:"plants",name:"Plants",resource:"food"}],S=[{key:"food",name:"Rations",format:function(e){return T()(e).format({thousandSeparated:!0})}},{key:"water",name:"Water",format:function(e){return"".concat(T()(e).format({thousandSeparated:!0})," gal")}},{key:"money",name:"Money",format:function(e){return"$".concat(T()(e).format({thousandSeparated:!0}))}},{key:"junk",name:"Junk",format:function(e){return"".concat(T()(e).format({thousandSeparated:!0})," lb")}},{key:"savedTime",name:"Saved Time",format:function(e){return T()(e).format({thousandSeparated:!0})}}],P=function(e){var t=S.find((function(t){return t.key===e}));if(!t)throw new Error("Could not find a resource with key: ".concat(e));return t},A=[{name:"Perception",key:"perception"},{name:"Endurance",key:"endurance"},{name:"Patience",key:"patience"},{name:"Tech",key:"tech"},{name:"Strength",key:"strength"}],O=function(e){var t=A.find((function(t){return t.key===e}));if(!t)throw new Error("Could not find a skill with key: ".concat(e));return t},C=r(1882),M=((0,C.Z)(360),(0,C.Z)(504),(0,C.Z)(264),[{key:"E1",name:"Explore the area",description:"My home hasn't changed, but everything past 500 feet is shrouded in dust.",message:"Something is really messed up with the area around here. Space is warped.",drain:{food:1,water:2},train:{perception:1,endurance:2},time:4e5,requirements:{}},{key:"T1",name:"Watch warped spaces",description:"These warped spaces seem random, but maybe if I watch them for long enough, they'll start to make sense.",message:'I\'m calling these "time holes" until I think of a better name.',drain:{food:1,water:1},train:{perception:2,patience:2},time:4e5,requirements:{action:"E1"}},{key:"T2",name:"Watch smaller time holes",description:"I'm not ready to jump into a time hole, but watching from a distance couldn't hurt, right?",message:'Hey! I saw another Barry in one of the holes and called out, and he seemed to notice. It looks like I could influence the past, at least with very short messages. Maybe I\'ll start with "more water."',drain:{food:1,water:1},train:{patience:2},time:4e5,requirements:{action:"T1"}},{key:"E2",name:"Explore something",description:"[something something go out further?]",message:"",drain:{food:2,water:2},train:{endurance:2},time:1e6,requirements:{action:"T2"}},{key:"T3",name:"Figure out lost time",description:"Time passes more slowly when I'm closer to a time hole, which makes the rest of the world move faster. I could find out how close I can get, and tell Past Barry about this.",message:"For now, I could safely get time to pass about twice as fast. That'll be better than watching radishes grow.",drain:{food:2,water:2},train:{perception:2},time:1e6,requirements:{action:"E2"}},{key:"E3",name:"Explore outside home",description:"Guess it's time to head into what's left of town.",message:"",drain:{food:2,water:2},train:{endurance:2},time:1e6,requirements:{action:"T3"}},{key:"E4",name:"Explore school ruins",description:"There's a school nearby, though there isn't much left of it. This might get me some good info for Past Barry.",message:"Hey, there's an old #7291 generator here! I can't believe they still use these. It's not working, but I could fix it if I had the parts.",drain:{food:2,water:2},train:{perception:2,endurance:2},time:1e6,requirements:{action:"E3"}},{key:"F1",name:"Look for parts",description:"Someone took this thing apart. I'm going to need some M8 bolts and a socket to match.",message:"",drain:{food:2,water:2},train:{perception:2,tech:2},time:1e6,requirements:{action:"E4"}},{key:"F2",name:"Look for instructions",description:"",message:"",drain:{food:2,water:2},train:{strength:2,tech:2},time:1e6,requirements:{action:"F1"}},{key:"F3",name:"Fix the generator",description:"",message:"",drain:{food:2,water:2},train:{perception:2,endurance:2},time:1e6,requirements:{action:"F2"}},{key:"E5",name:"Explore machine shop",description:"I found the ruins of what looks like an old machine shop. Maybe I can find something to help out Past Barry.",message:"",drain:{food:2,water:2},train:{perception:2,endurance:2},time:1e6,requirements:{action:"E3"}},{key:"E6",name:"Explore big time holes",description:"There are a bunch of bigger time holes near a fasion district. I might be able to send larger items through these - maybe even travel?",message:"",drain:{food:2,water:2},train:{perception:2,endurance:2},time:1e6,requirements:{action:"E3"}},{key:"S1",name:"Move wreckage",description:"There's a really interesting time hole up the stairs, but I'll have to move some wreckage out of the way to get to it.",message:"",drain:{food:2,water:2},train:{strength:2},time:1e6,requirements:{action:"E6"}},{key:"T4",name:"Convince yourself",description:"Hey! I saw myself from just a day a ago! This time hole seems to fight me a lot less. Maybe I could just jump through?",message:"After a lot of arguing with Past Barry, we agreed to swap places when the time comes. I have no idea what'll happen to him, but that sounds like Future Barry problems, not mine.",drain:{food:2,water:2},train:{patience:2},time:1e6,requirements:{action:"S1"}}]);function D(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(l){a=!0,i=l}finally{try{n||null==s.return||s.return()}finally{if(a)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var U=[{phase:"preEvent",key:"PF1",type:"purchased",name:"Canning supplies",description:"I could preserve food if I got some basic canning supplies.",max:5,costs:{money:function(e){return 10*e}},effect:{type:"add",food:function(e){return e}},effectDescription:"+1 preserved food per level",flavorTexts:{},requirements:{},source:"preserves"},{phase:"preEvent",key:"PF2",type:"purchased",name:"Gas burner",description:"Buy a big old propane gas burner to boil water much faster.",max:5,costs:{money:function(e){return 10*e}},effect:{type:"multiply",food:function(e){return 2*e}},effectDescription:"x2 preserved food per level",flavorTexts:{},requirements:{upgrade:{key:"PF1",level:3}},source:"preserves"},{phase:"preEvent",key:"PF6",type:"purchased",name:"Pressure canner",description:"A pressure canner would let me preserve more stuff without getting botulism.",max:5,costs:{money:function(e){return 10*e}},effect:{type:"time",food:function(e){return Math.pow(.8,e)}},effectDescription:"x0.8 time required for preserved food per level",flavorTexts:{},requirements:{upgrade:{key:"PF1",level:5}},source:"preserves"},{phase:"preEvent",key:"PF3",type:"purchased",name:"Plant some fast-growing crops",description:"Looks like I'll be eating a lot of radishes and green onions.",max:5,costs:{money:function(e){return 10*e}},effect:{type:"add",food:function(e){return e}},effectDescription:"+1 plant food per level",flavorTexts:{},requirements:{},source:"plants"},{phase:"preEvent",key:"PF4",type:"purchased",name:"Set up hydroponics",description:"I can get some plants to grow faster, and more variety would be nice.",max:5,costs:{money:function(e){return 10*e}},effect:{type:"time",food:function(e){return Math.pow(.8,e)}},effectDescription:"x0.8 plant growing time per level",flavorTexts:{},requirements:{upgrade:{key:"PF3",level:3}},source:"plants"},{phase:"preEvent",key:"PW1",type:"purchased",name:"Set up rainwater collection",description:"Buy and set up barrels and tarps for rainwater collection.",max:5,costs:{money:function(e){return 10*e}},effect:{type:"add",water:function(e){return e}},effectDescription:"+1 rainwater per level",flavorTexts:{},requirements:{},source:"rainfall"},{phase:"preEvent",key:"PW2",type:"purchased",name:"Buy a cistern",description:"Getting a big water container should make collection easier.",max:5,costs:{money:function(e){return 10*e}},effect:{type:"time",water:function(e){return Math.pow(.8,e)}},effectDescription:"x0.8 rainwater time per level",flavorTexts:{},requirements:{upgrade:{key:"PW1",level:3}},source:"rainfall"},{phase:"preEvent",key:"PW3",type:"purchased",name:"Buy a water filter",description:"I can filter some water from the stream nearby.",max:5,costs:{money:function(e){return 10*e}},effect:{type:"add",water:function(e){return e}},effectDescription:"+1 filtered water per level",flavorTexts:{},requirements:{},source:"stream"},{phase:"preEvent",key:"PW4",type:"purchased",name:"Switch to an electric filter",description:"Manually cranking this filter is way too much work when I have electricity.",max:5,costs:{money:function(e){return 10*e}},effect:{type:"time",water:function(e){return Math.pow(.8,e)}},effectDescription:"*0.8 filtered water time per level",flavorTexts:{},requirements:{upgrade:{key:"PW4",level:3}},source:"stream"},{phase:"preEvent",key:"PW5",type:"purchased",name:"Drill a deeper well",description:"My well's not going to collect enough water right now. I should get someone to drill deeper.",max:5,costs:{money:function(e){return 10*e}},effect:{type:"add",water:function(e){return e+1}},effectDescription:"+1 well water per level",flavorTexts:{},requirements:{},source:"well"},{phase:"preEvent",key:"PW6",type:"purchased",name:"Overcharge well",description:"",max:5,costs:{money:function(e){return 10*e}},effect:{type:"add",water:function(e){return e+2}},effectDescription:"x2 well water per level",flavorTexts:{},requirements:{upgrade:{key:"PW5",level:3}},source:"well"},{phase:"preEvent",key:"PM1",type:"purchased",name:"Sell your stuff",description:"I should set up a Letsy account and pawn off some of my junk.",max:5,costs:{junk:function(e){return 10*e}},effect:{type:"add",money:function(e){return e+1}},effectDescription:"+$1 per level",flavorTexts:{},requirements:{},source:"letsy"},{phase:"preEvent",key:"PM2",type:"purchased",name:"Advertise your Letsy store",description:"Maybe I can get rid of these vintage Neil Breen DVDs.",max:5,costs:{money:function(e){return 10*e}},effect:{type:"time",money:function(e){return Math.pow(.8,e)}},effectDescription:"x0.8 sale time per level",flavorTexts:{},requirements:{upgrade:{key:"PM1",level:3}},source:"letsy"},{phase:"preEvent",key:"PM3",type:"purchased",name:"Sell some scrap art",description:"I've got a shed full of scrap metal I could weld together into art.",max:5,costs:{junk:function(e){return 10*e}},effect:{type:"add",money:function(e){return e+1}},effectDescription:"+1 crafts sale per level",flavorTexts:{},requirements:{},source:"crafts"},{phase:"preEvent",key:"PM4",type:"purchased",name:"Sell some scrap art",description:"There's a market for industrial furniture. Might as well make some, for people who believe the world's just fine.",max:5,costs:{junk:function(e){return 10*e}},effect:{type:"multiply",money:function(e){return e+2}},effectDescription:"x2 sale value per level",flavorTexts:{},requirements:{upgrade:{key:"PM3",level:3}},source:"crafts"},{phase:"postEvent",key:"TW1",type:"purchased",name:"Condensate Capture",description:"Pluck water out of the air instead of relying on rainfall.",max:5,costs:{savedTime:function(e,t){return 100*e+10*t}},effect:{type:"multiply",water:function(e){return e+1}},effectDescription:"x2 rainwater, can collect without rainfall",flavorTexts:{},requirements:{exploration:"E3"},source:"rainfall"},{phase:"preEvent",key:"EW1",type:"event",name:"Rainfall stops",description:"The rain has stopped, so I'm not getting any water that way. I hope it starts up again soon.",max:2,costs:{},effect:{type:"multiply",water:function(e){return e-1}},effectDescription:"",flavorTexts:{1:"The rain has stopped, so I'm not getting any water that way. I hope it starts up again soon.",2:"The rain has stopped. Luckily, not a problem for the condensate collector. Thanks, Future Barry!"},requirements:{},source:"rainfall"},{phase:"preEvent",key:"EW2",type:"event",name:"Stream contaminated",description:"The stream's started to smell like paint. I'm not sure what happened, but I'm not going to trust it now.",max:2,costs:{},effect:{type:"multiply",water:function(e){return e-1}},effectDescription:"",flavorTexts:{1:"The stream's started to smell like paint. I'm not sure what happened, but I'm not going to trust it now.",2:"The stream's started to smell like paint, but that's not a problem for this filter. Nice thinking, Future Barry!"},requirements:{},source:"stream"},{phase:"preEvent",key:"EM1",type:"event",name:"Letsy downtime",description:"Letsy just had an outage, and it's been flaky ever since. My income there has dropped in half.",max:2,costs:{},effect:{type:"multiply",money:function(e){return 1===e?.5:1}},effectDescription:"",flavorTexts:{1:"Letsy just had an outage, and it's been flaky ever since. My income there has dropped in half.",2:""},requirements:{},source:"letsy"}],q=function(e){var t=U.find((function(t){return t.key===e}));if(!t)throw new Error("Could not find an upgrade with key: ".concat(e));return t},Z=function(e){var t,r,n,a=e.phase,i=e.upgrade,o=e.resources,s=e.distance,l=e.purchasedUpgrades,c=e.timedUpgrades,u=e.playerExplorations,d=null!==(n=null===(t=l[i.key])||void 0===t?void 0:t.level)&&void 0!==n?n:null===(r=c[i.key])||void 0===r?void 0:r.level;if(!B({phase:a,upgrade:i,purchasedUpgrades:l,timedUpgrades:c,playerExplorations:u}))return!1;var f=(null!==d&&void 0!==d?d:0)+1,p=!0,m=!1,h=void 0;try{for(var y,v=Object.keys(i.costs)[Symbol.iterator]();!(p=(y=v.next()).done);p=!0){var g=y.value,x=i.costs[g];if(x&&x(f,s)>o[g])return!1}}catch(w){m=!0,h=w}finally{try{p||null==v.return||v.return()}finally{if(m)throw h}}return f<=i.max},B=function(e){var t,r,n,a=e.phase,i=e.upgrade,o=e.purchasedUpgrades,s=e.timedUpgrades,l=e.playerExplorations;if("event"===i.type||i.phase!==a&&("postEvent"!==i.phase||"traveling"!==a))return!1;if(i.requirements.exploration&&100!==(null===(t=l[i.requirements.exploration])||void 0===t?void 0:t.progress))return!1;var c,u,d=i.requirements.upgrade;return!d||((null!==(c=null===(r=o[d.key])||void 0===r?void 0:r.level)&&void 0!==c?c:0)>=d.level||(null!==(u=null===(n=s[d.key])||void 0===n?void 0:n.level)&&void 0!==u?u:0)>=d.level)},_=function(e){var t=e.upgrade,r=e.currentLevel,n=e.distance,a=(null!==r&&void 0!==r?r:0)+1;return Object.entries(t.costs).map((function(e){var t=D(e,2),r=t[0],i=t[1];return i?{key:r,cost:i(a,n)}:{key:r,cost:0}}))},F=function(e){return null!==e&&void 0!==e};function R(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(l){a=!0,i=l}finally{try{n||null==s.return||s.return()}finally{if(a)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function L(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(l){a=!0,i=l}finally{try{n||null==s.return||s.return()}finally{if(a)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var W=function(){var e=d((function(e){return e.exploration})),t=d((function(e){return e.phase})),r=d((function(e){return e.explorations})),a=p(),i=M.filter((function(e){var t,n;return 100!==(null===(t=r[e.key])||void 0===t?void 0:t.progress)&&(!e.requirements.action||100===(null===(n=r[e.requirements.action])||void 0===n?void 0:n.progress))}));return(0,n.jsx)("div",{children:(0,n.jsx)("ul",{children:i.map((function(i){var o,s,l=null!==(s=null===(o=r[i.key])||void 0===o?void 0:o.progress)&&void 0!==s?s:0;return(0,n.jsxs)("li",{className:"flex flex-col gap-2 p-2 mb-2 border rounded-md",children:[(0,n.jsxs)("div",{className:"flex flex-row gap-2",children:[(0,n.jsx)(v,{disabled:"traveling"===t,onClick:function(){a({type:"EXPLORE",payload:{location:i.key}})},children:i.key===e?"Stop":"Go"}),i.name]}),(0,n.jsx)("p",{children:i.description}),(0,n.jsxs)("div",{children:[(0,n.jsx)("p",{children:G(i.train)}),X(i.drain)&&(0,n.jsx)("p",{children:X(i.drain)})]}),(0,n.jsx)(g,{progress:l})]},i.key)}))})})},G=function(e){var t=Object.entries(e).map((function(e){var t=L(e,2),r=t[0];return t[1]?O(r).name:null})).filter(F).join(", ");return"Skills: ".concat(t)},X=function(e){var t=Object.entries(e).map((function(e){var t=L(e,2),r=t[0],n=t[1];if(!n)return null;var a=P(r);return"".concat(a.name," ").concat(n,"x")})).filter(F).join(", ");return t?"Drains: ".concat(t):""},H=function(){var e=d((function(e){return e.messages})).slice().reverse();return(0,n.jsx)("div",{className:"w-full space-y-2",children:e.map((function(e,t){return(0,n.jsxs)("p",{className:(0,m.Z)("relative",V(e.priority,t)),children:[(0,n.jsx)("span",{className:(0,m.Z)("absolute top-[0] bottom-[0] left-[0] w-1","alert"===e.priority?"bg-red-500":" bg-gray-300 dark:bg-gray-600")}),(0,n.jsx)("span",{className:"block pl-3",children:e.text})]},t)}))})},V=function(e,t){return"info"===e?t>0&&"text-gray-700 dark:text-gray-400":t>0?"text-red-700":"text-red-500"},Y=r(3683);function K(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(l){a=!0,i=l}finally{try{n||null==s.return||s.return()}finally{if(a)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var z=function(e){var t=e.className,r=p(),a=K((0,Y.Z)()({initial:"inactive",states:{inactive:{on:{RESET:"requiresConfirmation"}},requiresConfirmation:{on:{CONFIRM:"reset",CANCEL:"inactive"}},reset:{on:{INACTIVE:"inactive"},effect:function(e){r({type:"RESET_GAME"}),e("INACTIVE")}}}}),2),i=a[0],o=a[1];return(0,n.jsxs)("div",{className:t,children:["inactive"===i.value&&(0,n.jsx)(v,{variant:"danger",onClick:function(){o("RESET")},children:"Reset"}),"requiresConfirmation"===i.value&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(v,{variant:"danger",onClick:function(){o("CONFIRM")},children:"Confirm Reset"}),(0,n.jsx)(v,{onClick:function(){o("CANCEL")},children:"Cancel"})]})]})},$=r(567),J=r(2863),Q=r(1344),ee=r(2699);function te(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(l){a=!0,i=l}finally{try{n||null==s.return||s.return()}finally{if(a)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var re=new Date(1997,7,29,2,14,0).valueOf(),ne=(0,$.Z)(re,{days:30}).valueOf(),ae=new Date(2978,1,23,1,14,0),ie=function(e){var t=e.className,r=d((function(e){return e.time})),a=d((function(e){return e.resources})),i=d((function(e){return e.phase})),o=d((function(e){return e.loops})),s=d((function(e){return e.skills})),l=d((function(e){return e.upgrades})),c=d((function(e){return e.timedUpgrades})),u=d((function(e){return e.unlocks})),f=function(e){var t=e.upgrades,r=e.time,n=e.timedUpgrades;return Object.entries(t).map((function(e){var t=R(e,2),r=t[0],n=t[1];return n?{key:r,level:n.level,upgrade:q(r)}:null})).concat(Object.entries(n).map((function(e){var t=R(e,2),n=t[0],a=t[1];return!a||a.time>r?null:{key:n,level:a.level,upgrade:q(n)}}))).filter(F).sort((function(e,t){var r=e.upgrade.effect.type,n=t.upgrade.effect.type;return r===n?0:"add"===r&&"multiply"===n?-1:1}))}({upgrades:l,time:r,timedUpgrades:c}),p=(0,ee.groupBy)(f,(function(e){return e.upgrade.source})),m="postEvent"===i||"traveling"===i?ae:ne,h=(0,J.Z)((0,Q.Z)(m,1e3*r),"MMMM d, yyyy hh:mm bb");return(0,n.jsxs)("div",{className:t,children:[(0,n.jsxs)("div",{className:"mb-2",children:[(0,n.jsxs)("div",{className:"mb-2",children:["It is ",h,"."]}),(0,n.jsx)("h2",{className:"font-bold",children:"Inventory"}),(0,n.jsx)("ul",{children:["food","water","money","junk","savedTime"].map((function(e){var t=P(e);return(0,n.jsxs)("li",{children:[(0,n.jsxs)("div",{className:"flex justify-between",children:[(0,n.jsx)("span",{children:t.name}),(0,n.jsx)("span",{children:t.format(a[e])})]}),"preEvent"===i&&(0,n.jsx)("ul",{className:"ml-2",children:I.filter((function(t){return t.resource===e})).map((function(e){var r=(0,C.Z)(24);if(!p[e.key])return null;var a=function(e,t){return e.reduce((function(e,r){var n=r.upgrade,a=n.effect[t.resource];return a&&"add"===n.effect.type?e+a(r.level):a&&"multiply"===n.effect.type?e*a(r.level):e}),0)}(p[e.key],e)*(r/function(e,t){return e.reduce((function(e,r){var n=r.upgrade.effect[t.resource];return n&&"time"===r.upgrade.effect.type?Math.floor(e*n(r.level)):e}),2e4)}(p[e.key],e));return(0,n.jsx)("li",{children:(0,n.jsxs)("div",{className:"flex justify-between",children:[(0,n.jsx)("span",{children:e.name}),(0,n.jsxs)("span",{children:[t.format(Math.floor(a)),"/day"]})]})},e.key)}))})]},e)}))})]}),!!("postEvent"===i||"traveling"===i||o>0)&&(0,n.jsxs)("div",{children:[(0,n.jsx)("h2",{className:"font-bold",children:"Skills"}),(0,n.jsx)("ul",{children:Object.entries(s).map((function(e){var t,r,a=te(e,2),i=a[0],o=a[1];return(0,n.jsxs)("li",{children:[(0,n.jsxs)("div",{className:"flex justify-between",children:[(0,n.jsx)("span",{children:O(i).name}),(0,n.jsx)("span",{children:Math.floor(o.current)})]}),(0,n.jsx)(g,{progress:100*(null!==(t=o.current)&&void 0!==t?t:0)%100}),u.loop&&(0,n.jsx)(g,{variant:"primary",progress:100*(null!==(r=o.permanent)&&void 0!==r?r:0)%100})]},i)}))})]})]})},oe=r(8462);function se(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(l){a=!0,i=l}finally{try{n||null==s.return||s.return()}finally{if(a)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function le(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var ce=(0,E.Z)(24)/1e3,ue=new Date(1997,7,29,2,14,0),de=(0,$.Z)(ue,{days:30}),fe=function(e){var t=e.selectedUpgradeKey,r=e.setSelectedUpgrade,i=d((function(e){return e.timeline})),o=d((function(e){return e.timedUpgrades})),s=d((function(e){return e.upgrades})),l=d((function(e){return e.explorations})),c=d((function(e){return e.phase})),u=d((function(e){return e.resources})),f=d((function(e){return Math.floor(e.time/(0,C.Z)(24))})),p=(0,a.useState)(void 0),h=p[0],y=p[1],v=t?q(t):void 0,g=Object.entries(o).filter((function(e){return F(e[1])})).map((function(e){var t=se(e,2),r=t[0],n=t[1],a=q(r);return{type:"purchased"===a.type?"permanent":"event",time:n.time,text:"".concat("purchased"===a.type?"Timed upgrade":"Event",": ").concat(a.name)}})),x=i.map((function(e){return{type:"upgrade",time:e.time,text:me(e.action)}})),w=le(g).concat(le(x)),b=(0,ee.groupBy)(w,(function(e){return Math.floor(e.time/ce)}));return(0,n.jsxs)("div",{children:[(0,n.jsx)("h2",{children:"Timeline"}),(0,n.jsx)("ul",{className:"flex flex-nowrap",children:(0,ee.range)(0,30).map((function(e){var t,r,a,i=!!(null===(t=b[e])||void 0===t?void 0:t.find((function(e){return"upgrade"===e.type}))),d=!!(null===(r=b[e])||void 0===r?void 0:r.find((function(e){return"permanent"===e.type}))),p=!!(null===(a=b[e])||void 0===a?void 0:a.find((function(e){return"event"===e.type}))),g=v&&!Z({phase:c,upgrade:v,resources:u,distance:29-e,purchasedUpgrades:s,timedUpgrades:o,playerExplorations:l})||"traveling"===c&&void 0!==h&&h<=e||"preEvent"===c&&e<f;return(0,n.jsxs)("button",{className:(0,m.Z)("inline-grid relative border-2 border-gray-800 dark:border-gray-300 w-[32px] h-[32px] grid-cols-2 grid-rows-2 -ml-[2px]",g&&"border-opacity-20 dark:border-opacity-20",e===h&&"shadow-[0_0_0_3px_red] z-10"),style:{gridTemplateAreas:'\n                "upgrade permanent"\n                "event ."\n              '},onClick:function(){y(h!==e?e:void 0)},children:[i&&(0,n.jsx)("div",{className:(0,m.Z)("[grid-area:upgrade] aspect-[1/1] bg-blue-700","traveling"===c&&void 0!==h&&h<=e&&"opacity-20")}),d&&(0,n.jsx)("div",{className:"[grid-area:permanent] aspect-[1/1] bg-green-500"}),p&&(0,n.jsx)("div",{className:"[grid-area:event] aspect-[1/1] bg-red-500"})]},e)}))}),void 0!==h&&(0,n.jsx)(pe,{selectedDay:h,setSelectedDay:y,timeline:b,selectedUpgrade:v,setSelectedUpgrade:r})]})},pe=function(e){var t,r=e.selectedDay,a=e.setSelectedDay,i=e.timeline,o=e.selectedUpgrade,s=e.setSelectedUpgrade,l=i[r],c=d((function(e){return e.phase})),u=d((function(e){return e.timedUpgrades})),f=d((function(e){return e.resources})),h=p();return(0,n.jsxs)("div",{className:"relative grid grid-cols-[1fr_50px]",style:{gridTemplateAreas:'\n      "restart close"\n      "events events"\n    '},children:[(0,n.jsx)(v,{className:"[grid-area:close]",onClick:function(){a(void 0)},children:"X"}),o&&(0,n.jsx)("div",{className:"[grid-area:restart]",children:(0,n.jsxs)(v,{onClick:function(){h({type:"BUY_TIMED_UPGRADE",payload:{key:o.key,day:r}}),s(void 0)},children:["Send Upgrade (",_({upgrade:o,resources:f,currentLevel:null===(t=u[o.key])||void 0===t?void 0:t.level,distance:29-r}).map((function(e){return"".concat(e.cost," ").concat(e.key)})).join(","),")"]})}),void 0!==r&&"preEvent"!==c&&!o&&(0,n.jsx)("div",{className:"[grid-area:restart]",children:(0,n.jsx)(v,{variant:"danger",onClick:function(){a(void 0),h({type:"TRAVEL",payload:{day:r}})},children:"Restart Here"})}),void 0!==l&&(0,n.jsx)("ul",{className:"[grid-area:events]",children:l.map((function(e){return(0,n.jsxs)("li",{className:"flex items-center",children:[(0,n.jsx)("div",{className:(0,m.Z)("w-[14px] h-[14px] inline-block mr-1","upgrade"===e.type?"bg-blue-700":"event"===e.type?"bg-red-500":"bg-green-500")}),(0,n.jsxs)("span",{className:(0,m.Z)("traveling"===c&&"upgrade"===e.type&&"text-gray-500"),children:[(0,J.Z)((0,oe.Z)(de,{seconds:1e3*e.time}),"hh:mm bb")," ",e.text]})]},e.time)}))})]})},me=function(e){switch(e.type){case"BUY_UPGRADE":return"Buy upgrade: ".concat(q(e.payload.key).name);case"BUY_TIMED_UPGRADE":var t=q(e.payload.key);return"purchased"===t.type?"Timed upgrade: ".concat(t.name):"Event: ".concat(t.name);default:throw new Error("No text found for action: ".concat(e.type))}};function he(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(l){a=!0,i=l}finally{try{n||null==s.return||s.return()}finally{if(a)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var ye=function(e){var t=e.className,r=e.selectedUpgrade,i=e.setSelectedUpgrade,o=d((function(e){return e.resources})),s=d((function(e){return e.phase})),l=d((function(e){return e.upgrades})),c=d((function(e){return e.timedUpgrades})),u=d((function(e){return e.explorations})),f=p(),h=(0,a.useMemo)((function(){return U.filter((function(e){return!!B({upgrade:e,phase:s,playerExplorations:u,purchasedUpgrades:l,timedUpgrades:c})}))}),[s,u,l,c]);return(0,n.jsx)("ul",{className:(0,m.Z)("flex flex-col gap-2",t),children:h.map((function(e){var t,a,d=null!==(a=null===(t=l[e.key])||void 0===t?void 0:t.level)&&void 0!==a?a:0,p=e.flavorTexts[d],h=Object.entries(e.costs).map((function(e){var t=he(e,2),r=t[0],n=t[1];return n?P(r).format(n(d+1,0)):null})).filter(Boolean).join(", ");return(0,n.jsxs)("li",{className:(0,m.Z)("flex flex-col p-2 border rounded-sm gap-x-2",e.requirements.upgrade&&"ml-2"),children:[(0,n.jsxs)("div",{className:"flex flex-row gap-2",children:[(0,n.jsxs)(v,{disabled:!Z({upgrade:e,phase:s,playerExplorations:u,purchasedUpgrades:l,timedUpgrades:c,distance:0,resources:o}),"aria-label":"Buy ".concat(e.name),active:r===e.key,onClick:function(){"postEvent"!==e.phase?f({type:"BUY_UPGRADE",payload:{key:e.key}}):i((function(t){return t===e.key?void 0:e.key}))},children:["Buy ",d>0&&"(".concat(d!==e.max?d:"MAX",")")]}),(0,n.jsxs)("div",{children:[e.name," ",d!==e.max&&"(".concat(h,")")]})]}),d!==e.max&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{children:e.effectDescription}),(0,n.jsx)("p",{children:e.description})]}),p&&(0,n.jsx)("p",{className:"col-start-2",children:p})]},e.key)}))})},ve=r(7189),ge=r.n(ve);function xe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(l){a=!0,i=l}finally{try{n||null==s.return||s.return()}finally{if(a)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var we=function(e){var t=e.className;return(0,n.jsxs)("div",{className:(0,m.Z)("w-[80px] relative h-full overflow-hidden rounded-md",t),children:[(0,n.jsx)(ke,{className:"absolute top-0 left-0 w-full h-full"}),(0,n.jsx)(be,{className:"absolute top-0 left-0 w-full h-full"})]})},be=function(e){var t=e.className,r=-(120*((d((function(e){return e.time}))%(0,C.Z)(24)/(0,C.Z)(1)-6)/6)-60);return(0,n.jsx)("div",{className:(0,m.Z)("flex items-center justify-center",t),style:{transform:"translate(25%, ".concat(r,"%)")},children:(0,n.jsx)("div",{className:"w-8 h-8 bg-yellow-300 rounded-full filter blur-md"})})},ke=function(e){var t=e.children,r=e.className,a=d((function(e){return e.time})),i=xe(je(a),2),o=i[0],s=i[1];return(0,n.jsx)("div",{className:(0,m.Z)("flex items-center justify-center",r),style:{background:"linear-gradient(".concat(s,", ").concat(o,")")},children:t})},je=function(e){var t,r=e%(0,C.Z)(24)/(0,C.Z)(1),n=Ee.findIndex((function(e){return e.time>r})),a=Math.max(n-1,0),i=Math.min(a+1,Ee.length-1),o=Ee[a],s=Ee[i];if(s.time===o.time)t=0;else{var l=s.time-o.time;t=(r-o.time)/l}return[ge()(o.low,s.low,t),ge()(o.high,s.high,t)]},Ee=[{time:0,low:"#111827",high:"#111827"},{time:5,low:"#111827",high:"#111827"},{time:6,low:"#E67B09",high:"#112044"},{time:7,low:"#E79617",high:"#536875"},{time:8,low:"#FADA77",high:"#343E56"},{time:9,low:"#E2D7A9",high:"#343E61"},{time:10,low:"#ABC3BF",high:"#314C87"},{time:12,low:"#8DBACD",high:"#3A6DAE"},{time:18,low:"#6FACC7",high:"#085997"},{time:19,low:"#B59A6D",high:"#6C778A"},{time:20,low:"#42677B",high:"#3372A1"},{time:21,low:"#13203C",high:"#111827"},{time:22,low:"#111827",high:"#111827"},{time:24,low:"#111827",high:"#111827"}],Ne=function(){var e=d((function(e){return e.timers.event}));return(0,n.jsxs)("div",{className:"absolute z-50 flex items-center justify-center min-w-full min-h-screen text-6xl bg-gray-900 text-gray-50",children:["TIMESKIP (",e,")"]})},Te=function(){return(0,n.jsxs)("div",{children:[(0,n.jsx)("h2",{children:"Barry's Time Adventures"}),(0,n.jsx)("p",{children:"[A]ll out of Barrys"})]})},Ie=function(){var e=d((function(e){return e.time})),t=d((function(e){return e.phase})),r=(0,a.useState)("explorations"),i=r[0],o=r[1],s=(0,a.useState)(),l=s[0],c=s[1],u=d((function(e){return e.unlocks})),f=(0,a.useMemo)((function(){return(0,n.jsxs)("div",{className:(0,m.Z)("relative min-h-screen",Se(t)),children:["event"===t&&(0,n.jsx)(Ne,{}),"done"===t&&(0,n.jsx)(Te,{}),(0,n.jsxs)("div",{className:(0,m.Z)("px-4 grid py-2 mx-auto min-w-[1080px] max-w-[1680px] gap-3","grid-rows-[1fr_auto]","grid-cols-[400px_1fr_240px_auto]","lg:grid-cols-[400px_1fr_240px_auto]"),style:{gridTemplateAreas:'\n            "timeline timeline timeline timeline"\n            "messages main status window"\n          '},children:[(0,n.jsxs)("aside",{className:"[grid-area:status]",children:[!1,(0,n.jsx)(ie,{className:"mb-3"}),(0,n.jsx)(z,{})]}),(0,n.jsxs)("main",{className:"[grid-area:main]",children:["preEvent"===t&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("h2",{className:"mb-2",children:"Upgrades"}),(0,n.jsx)(ye,{selectedUpgrade:l,setSelectedUpgrade:c})]}),"preEvent"!==t&&(0,n.jsxs)("div",{children:[(0,n.jsxs)(k,{className:"mb-2",children:[(0,n.jsx)(j,{active:"explorations"===i,onClick:function(){o("explorations")},children:"Exploration"}),(0,n.jsx)(j,{active:"upgrades"===i,onClick:function(){o("upgrades")},children:"Send Upgrades"})]}),"upgrades"===i&&(0,n.jsx)(ye,{selectedUpgrade:l,setSelectedUpgrade:c}),"explorations"===i&&(0,n.jsx)(W,{})]})]}),(0,n.jsx)(we,{className:"[grid-area:window] "}),(0,n.jsx)("div",{className:"[grid-area:messages] p-4 text-gray-300 border rounded-md",children:(0,n.jsx)(H,{})}),u.pastRestart&&(0,n.jsx)("div",{className:"[grid-area:timeline]",children:(0,n.jsx)(fe,{selectedUpgradeKey:l,setSelectedUpgrade:c})})]})]})}),[i,t,l,u.pastRestart]);return(0,n.jsx)("div",{className:e%(0,E.Z)(24)>(0,E.Z)(8)?"light":"dark",children:f})},Se=function(e){return"preEvent"===e?"bg-gray-50 dark:bg-gray-900 dark:text-gray-100":"bg-stone-50 dark:bg-stone-900 dark:text-stone-100"},Pe=r(3139),Ae=(0,n.jsx)(Ie,{}),Oe=function(){var e=function(){var e=(0,a.useState)(void 0),t=e[0],r=e[1];o.onmessage=function(e){var n=e.data;"INITIAL"!==n.type?r((0,i.QE)(t,n.payload)):r(n.payload)};var n=(0,a.useCallback)((function(e){null===o||void 0===o||o.postMessage(e)}),[]);return(0,a.useMemo)((function(){return{dispatch:n,state:t}}),[n,t])}(),t=e.state,r=e.dispatch;(0,Pe.useRouter)();return t?(0,n.jsxs)(u,{value:t,children:[(0,n.jsx)(f,{value:r,children:Ae}),!1]}):(0,n.jsx)("div",{className:"flex items-center justify-center min-w-full min-h-screen",children:"Loading..."})},Ce=function(){var e=(0,a.useState)(!1),t=e[0],r=e[1];return(0,a.useEffect)((function(){r(!0)}),[]),t?(0,n.jsx)(Oe,{}):(0,n.jsx)("div",{className:"flex items-center justify-center min-w-full min-h-screen",children:"Loading..."})},Me=Ce}},function(e){e.O(0,[201,457,10,774,888,179],(function(){return t=3104,e(e.s=t);var t}));var t=e.O();_N_E=t}]);