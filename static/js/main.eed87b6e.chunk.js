(this["webpackJsonpgithub-viewer-react"]=this["webpackJsonpgithub-viewer-react"]||[]).push([[0],{11:function(e,t,a){e.exports=a(19)},16:function(e,t,a){},18:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),s=a.n(i),o=(a(16),a(17),a(6)),l=a(1),c=a(2),m=a(3),u=a(5),d=a(4),h=(a(18),a(7)),p=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];for(var n=[],r=function(e){"string"===typeof t[e]&&n.push(t[e]),"object"===typeof t[e]&&Object.keys(t[e]).forEach((function(a){t[e][a]&&n.push(a)}))},i=0;i<t.length;i++)r(i);return n.join(" ")},f=a(10),g=function(e){var t=e.className,a=e.children,n=e.onClick,i=Object(f.a)(e,["className","children","onClick"]);return r.a.createElement("button",Object.assign({className:p("button",t)},i,{onClick:n}),a)};g.defaultProps={className:"",onClick:function(){}};var v,b=g,E="name",N="forks_count",k="stargazers_count",_="updated_at_integer",C=[E,N,k,_],R=(v={},Object(h.a)(v,N,"Forks"),Object(h.a)(v,k,"Stars"),Object(h.a)(v,_,"Updated At"),Object(h.a)(v,E,"Name"),v),w=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={currentRowSelected:null},n}return Object(c.a)(a,[{key:"_onRowClick",value:function(e){this.setState({currentRowSelected:e})}},{key:"_renderCurrentRowData",value:function(e){return r.a.createElement("div",{className:"list-content-row-data list-content-info"},r.a.createElement("div",{className:"list-content-row-data-child"},r.a.createElement("span",{className:"list-content-row-data-child-span"},r.a.createElement("b",null,"Full Name:")," ",e.full_name),r.a.createElement("span",{className:"list-content-row-data-child-span"},r.a.createElement("b",null,"License:")," ",e.license),r.a.createElement("span",{className:"list-content-row-data-child-span"},r.a.createElement("b",null,"Created:")," ",e.created_at_readable),r.a.createElement("span",{className:"list-content-row-data-child-span"},r.a.createElement("b",null,"Updated:")," ",e.updated_at_readable)),r.a.createElement("div",{className:"list-content-row-data-child"},r.a.createElement("span",null,r.a.createElement("b",null,"Language:")," ",e.language),r.a.createElement("span",null,r.a.createElement("b",null,"Open Issues:")," ",e.open_issues_count)),r.a.createElement("div",{className:"list-content-row-data-child repositories-list-content-row-data-child-description"},r.a.createElement("b",null,"Description:")," ",e.description))}},{key:"render",value:function(){var e=this,t=this.state.currentRowSelected,a=this.props,n=a.items,i=a.onRepoClick,s=a.orgName,o=a.className,l=a.organization,c=a.reposSortedDesc,m=a.sortedBy,u=a.onTableHeaderClick,d=a.currentReposPage,h=a.totalReposPage,f=a.onPaginationClick,g=a.isMobile;return r.a.createElement("ul",{className:p(o,"repositories-list-container")},r.a.createElement("header",{className:"repositories-list repositories-list-header"},C.map((function(e){return r.a.createElement(b,{key:e,className:p("list-content repositories-list-content-button",{active:m===e}),onClick:function(){return u(e)}},R[e],m===e&&!c&&r.a.createElement("i",{className:"fa fa-chevron-up","aria-hidden":"true"}),m===e&&c&&r.a.createElement("i",{className:"fa fa-chevron-down","aria-hidden":"true"}))}))),r.a.createElement("div",{className:"list-body"},n.map((function(a,n){return r.a.createElement("li",{onClick:function(){i(s,a.name,{full_name:a.full_name,html_url:a.html_url}),e._onRowClick(a.id)},className:p("list-li",{active:t===a.id}),key:a.id},r.a.createElement("div",{className:"list-content-main"},r.a.createElement("span",{className:"list-content"},r.a.createElement("span",{className:"list-content-counter"},n+1,"."),r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:a.html_url},a.name)),r.a.createElement("span",{className:"list-content"},r.a.createElement("i",{className:"fa fa-code-fork"})," ",a.forks_count),r.a.createElement("span",{className:"list-content"},"\u2605 ",a.stargazers_count),r.a.createElement("span",null,r.a.createElement("i",{className:"fa fa-calendar","aria-hidden":"true"})," ",a.updated_at_readable)),t===a.id&&e._renderCurrentRowData(a))}))),r.a.createElement("footer",{className:"repositories-list list-footer"},r.a.createElement("div",{className:p("list-footer-pagination",{"full-width":g})},d>1?r.a.createElement(b,{className:"list-footer-pagination-button",onClick:function(){return f(l,d-1)}},r.a.createElement("span",null,r.a.createElement("i",{className:"fa fa-chevron-left"})," Last")):r.a.createElement("div",{className:"list-footer-pagination-button"}),r.a.createElement("span",{className:"list-footer-pagination-page"},"Page ",d," / ",h),h>d?r.a.createElement(b,{className:"list-footer-pagination-button",onClick:function(){return f(l,d+1)}},r.a.createElement("span",null,"Next ",r.a.createElement("i",{className:"fa fa-chevron-right"}))):r.a.createElement("div",{className:"list-footer-pagination-button"})),r.a.createElement("span",{className:"list-footer-pagination-page organization-name"},r.a.createElement("b",null,"ORG: ",l.toUpperCase())),!g&&r.a.createElement("span",{className:"list-footer-pagination-page"},r.a.createElement("b",null,n.length)," Repositories per Page (Scroll to see more)")))}}]),a}(r.a.Component);w.defaultProps={items:[],onRepoClick:function(){},onPaginationClick:function(){},organization:"",className:"",reposSortedDesc:!0,sortBy:_,onTableHeaderClick:function(){},currentReposPage:1,totalReposPage:1,isMobile:!1};var y=w,S=function(e){var t=encodeURIComponent;return Object.keys(e).map((function(a){return t(a)+"="+t(e[a])})).join("&")},O=new(function(){function e(){Object(l.a)(this,e),this.serverUrl="https://github-viewer-server.herokuapp.com","development"===Object({NODE_ENV:"production",PUBLIC_URL:"/github-ranking-react",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_ENVIRONMENT&&(this.serverUrl="http://localhost:3000")}return Object(c.a)(e,[{key:"get",value:function(e){var t=e.type,a=e.query,n=void 0===a?{}:a,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r=Object(o.a)({method:"GET"},r),fetch("".concat(this.serverUrl,"/get/").concat(t,"?").concat(S(n)),r).then((function(e){return e.json()})).then((function(e){if(200===e.status)return e;throw new Error(e.status)})).catch((function(e){console.log(e)}))}}]),e}()),j="all-repos",P="view-commits",D=function(e){return new Date(e).toLocaleDateString("en-US",{day:"2-digit",month:"2-digit",year:"numeric"})},T=["Author","Commit URL","Verified","Commit Date"],z=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={currentRowSelected:null},n}return Object(c.a)(a,[{key:"_onRowClick",value:function(e){this.setState({currentRowSelected:e})}},{key:"_renderCurrentRowData",value:function(e){var t=e.author,a=e.commit;return r.a.createElement("div",{className:"list-content-row-data list-content-info"},r.a.createElement("div",{className:"list-content-row-data-child"},r.a.createElement("span",{className:"list-content-row-data-child-span"},r.a.createElement("b",null,"Author:")," ",t.name),r.a.createElement("span",{className:"list-content-row-data-child-span"},r.a.createElement("b",null,"Login Id:")," ",t.login),r.a.createElement("span",{className:"list-content-row-data-child-span"},r.a.createElement("b",null,"Profile Url:")," ",r.a.createElement("a",{href:t.profileUrl,target:"_blank",rel:"noopener noreferrer"},t.profileUrl)),r.a.createElement("span",{className:"list-content-row-data-child-span"},r.a.createElement("b",null,"Date:")," ",a.date)),r.a.createElement("div",{className:"list-content-row-data-child"},r.a.createElement("span",null,r.a.createElement("b",null,"Parents:")),a.parents.map((function(e){return r.a.createElement("a",{href:e.html_url,target:"_blank",rel:"noopener noreferrer",title:e.sha},e.sha.substring(0,7))}))),r.a.createElement("div",{className:"list-content-row-data-child repositories-list-content-row-data-child-description"},r.a.createElement("b",null,"Commit Message:")," ",a.message))}},{key:"render",value:function(){var e=this,t=this.state.currentRowSelected,a=this.props,n=a.items,i=a.className,s=a.currentCommitRepoSelected,o=a.isMobile;return r.a.createElement("ul",{className:p(i,"commitsList-container")},r.a.createElement("header",{className:"commitsList-header"},T.map((function(e){return r.a.createElement("span",{className:"list-content",key:e},e)}))),r.a.createElement("div",{className:"list-body"},n.map((function(a){var n=function(e){var t=e&&e.author||{},a=e&&e.commit||{},n=a.author&&a.author.date;return{author:{id:t.id,login:t.login,profileUrl:t.html_url,type:t.type,email:a.author&&a.author.email,name:a.author&&a.author.name},commit:{message:a.message,commitUrl:e.html_url,parents:e.parents||[],sha:e.sha,verified:!!(e.commit&&e.commit.verification&&e.commit.verification.verified),date:n&&D(n)}}}(a),i=n.author,s=n.commit;return r.a.createElement("li",{className:p("list-li commitList-li",{active:t===s.sha}),key:s.sha,onClick:function(){return e._onRowClick(s.sha)}},r.a.createElement("div",{className:"list-content-main"},r.a.createElement("div",{className:"list-content"},i.profileUrl?r.a.createElement("a",{href:i.profileUrl,target:"_blank",rel:"noopener noreferrer"},i.name):r.a.createElement("span",null,i.name)),r.a.createElement("div",{className:"list-content"},r.a.createElement(b,{title:s.sha,className:"sha-link"},r.a.createElement("a",{href:s.commitUrl,target:"_blank",rel:"noopener noreferrer",className:"no-underline"},r.a.createElement("i",{className:"fa fa-github","aria-hidden":"true"})," ",s.sha&&s.sha.substring(0,7)))),r.a.createElement("span",{className:p("list-content",{"text-center":o})},s.verified&&r.a.createElement("i",{className:p("fa fa-check green-check"),"aria-hidden":"true"})),r.a.createElement("span",{className:"list-content"},r.a.createElement("i",{className:"fa fa-calendar","aria-hidden":"true"})," ",s.date)),t===s.sha&&e._renderCurrentRowData(n))}))),r.a.createElement("footer",{className:"list-footer commitsList-footer"},r.a.createElement("a",{href:s.html_url,target:"_blank",rel:"noopener noreferrer",className:"no-underline"},r.a.createElement(b,{className:"list-footer-pagination-button list-footer-pagination-button-github-link"},r.a.createElement("i",{className:"fa fa-github","aria-hidden":"true"})," ",s.full_name)),r.a.createElement("span",null,"Most recent ",r.a.createElement("b",null,n.length)," Commits on this Repo (Scroll to see more)")))}}]),a}(r.a.Component);z.defaultProps={items:[],className:"",currentCommitRepoSelected:{},isMobile:!1};var L=z;function x(e,t){this.val=t,this.key=e,this.next=this.prev=null}var H=function(){function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;Object(l.a)(this,e),this.invalidationTimer=a,this.initialCapacity=t,this.capacity=t,this.hash={},this.head=new x,this.tail=new x,this.head.next=this.tail,this.tail.prev=this.head,this.invalidateCache()}return Object(c.a)(e,[{key:"invalidateCache",value:function(){var e=this;this.invalidationTimer&&setInterval((function(){e.capacity=e.initialCapacity,e.hash={},e.head=new x,e.tail=new x,e.head.next=e.tail,e.tail.prev=e.head}),this.invalidationTimer)}},{key:"size",value:function(){return this.initialCapacity-this.capacity}},{key:"get",value:function(e){var t=this.hash[e];return t?(this.pushToTail(t),t.val):null}},{key:"put",value:function(e,t){var a=this.hash[e];a?a.val=t:(this.hash[e]=new x(e,t),this.capacity--),this.pushToTail(this.hash[e]),this.capacity<0&&(this.removeHead(),this.capacity++)}},{key:"removeHead",value:function(){var e=this.head.next;delete this.hash[e.key],this.head.next=this.head.next.next,this.head.next.prev=this.head}},{key:"pushToTail",value:function(e){if(this.tail.prev!==e){e.next&&e.prev&&(e.next.prev=e.prev,e.prev.next=e.next);var t=this.tail.prev;e.next=this.tail,this.tail.prev=e,t.next=e,e.prev=t}}}]),e}(),U=function(e){return{id:e.id,name:e.name,forks_count:e.forks_count,stargazers_count:e.stargazers_count,html_url:e.html_url,description:e.description,updated_at:e.updated_at,full_name:e.full_name,updated_at_integer:new Date(e.updated_at).getTime(),updated_at_readable:D(e.updated_at),created_at_readable:D(e.created_at),pushed_at_readable:D(e.pushed_at),language:e.language,open_issues_count:e.open_issues_count,license:e.license&&e.license.name}},A=function(e,t){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return e.sort((function(e,n){var r=e,i=n;return a&&(r=n,i=e),r[t]>i[t]?1:r[t]<i[t]?-1:0}))},M=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={input:""},n._onChangeHandler=n._onChangeHandler.bind(Object(m.a)(n)),n._onHandleSubmit=n._onHandleSubmit.bind(Object(m.a)(n)),n}return Object(c.a)(a,[{key:"_onChangeHandler",value:function(e){this.setState({input:e.target.value})}},{key:"_onHandleSubmit",value:function(e){console.log(this.state.input),e.preventDefault(),this.props.onSubmit(this.state.input)}},{key:"render",value:function(){return r.a.createElement("form",{className:"search-form",onSubmit:this._onHandleSubmit},r.a.createElement("label",{className:"search-label"},"github.com/",r.a.createElement("input",{className:"search-input",type:"text",value:this.state.input,onChange:this._onChangeHandler})),r.a.createElement("input",{className:"search-submit",type:"submit",value:"Submit"}))}}]),a}(r.a.Component),I={isMobile:!1,organization:"",totalReposPage:1,currentReposPage:1,totalCommitsPage:1,currentCommitsPage:1,reposSortedDesc:!0,repositories:[],currentCommitsList:[],currentCommitRepoSelected:{},radioGroup:[_,N,k],currentRadioSelected:k},B=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state=Object(o.a)({},I),n.commits=new H(10,9e5),n.reposPages=new H(10,9e5),n.onRadioClick=n.onRadioClick.bind(Object(m.a)(n)),n.getRepoCommits=n.getRepoCommits.bind(Object(m.a)(n)),n.onTableHeaderClick=n.onTableHeaderClick.bind(Object(m.a)(n)),n.getOrgRepos=n.getOrgRepos.bind(Object(m.a)(n)),n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this.state,t=e.organization,a=e.currentReposPage;window.addEventListener("resize",this.resize.bind(this)),this.resize((function(){console.log("start")})),this.getOrgRepos(t||"netflix",a)}},{key:"resize",value:function(){var e=window.innerWidth<=920;e!==this.state.isMobile&&this.setState({isMobile:e})}},{key:"getOrgRepos",value:function(e){var t=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=this.state,r=n.organization,i=n.reposSortedDesc,s=n.currentRadioSelected,l=this.reposPages.get(a),c=e.toLowerCase().split(" ")[0];r===c&&l?this.setState({repositories:A(l,s,i),currentReposPage:a},(function(){t.reposPages.put(a,l)})):O.get({type:j,query:{orgName:c,page:a,sort:"updated"}}).then((function(n){if(n){var l=n.data,m=n.totalPage;if(Array.isArray(l)){var u=l.map((function(e){return U(e)})),d={};r!==e&&(t.commits=new H(10,9e5),t.reposPages=new H(10,9e5),d=Object(o.a)(Object(o.a)({},I),{},{totalReposPage:m})),d=Object(o.a)(Object(o.a)({},d),{},{repositories:A(u,s,i),organization:c,currentReposPage:a,reposSortedDesc:i,currentRadioSelected:s}),t.setState(d,(function(){t.reposPages.put(a,u),t.resize()}))}}}))}},{key:"onRadioClick",value:function(e){var t=this.state,a=t.repositories,n=t.currentRadioSelected,r=e&&e.target&&e.target.value;if(r){var i=a;r!==n&&(i=a.sort((function(e,t){return t[r]-e[r]}))),this.setState({currentRadioSelected:r,repositories:i})}}},{key:"getRepoCommits",value:function(e,t,a){var n=this,r=this.state.organization,i=this.commits.get(t);i&&e===r?this.setState({currentCommitsList:i,currentCommitRepoSelected:a}):O.get({type:P,query:{orgName:this.state.organization,repoName:t}}).then((function(e){if(e){var r=e.data;n.setState({currentCommitsList:r,currentCommitRepoSelected:a},(function(){n.commits.put(t,r)}))}}))}},{key:"onTableHeaderClick",value:function(e){var t=this,a=this.state,n=a.repositories,r=a.currentRadioSelected,i=a.reposSortedDesc;this.setState({reposSortedDesc:e!==r||!i},(function(){var a=A(n,e,t.state.reposSortedDesc);t.setState({currentRadioSelected:e,repositories:a})}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.repositories,n=t.currentRadioSelected,i=t.currentReposPage,s=t.totalReposPage,o=t.currentCommitsList,l=t.organization,c=t.reposSortedDesc,m=t.currentCommitRepoSelected,u=t.isMobile;return r.a.createElement("div",{className:"App",id:"App"},r.a.createElement(M,{onSubmit:this.getOrgRepos}),r.a.createElement("div",{className:p("App-tables-container",{isMobile:u})},r.a.createElement(y,{className:p({"App-table":u||!o.length,"App-table-collapse":!u&&o.length}),isMobile:u,sortedBy:n,reposSortedDesc:c,items:a,onTableHeaderClick:this.onTableHeaderClick,orgName:l,onRepoClick:this.getRepoCommits,currentReposPage:i,totalReposPage:s,onPaginationClick:this.getOrgRepos,organization:l}),r.a.createElement("div",{className:p({"App-table":u||!o.length,"App-table-collapse":!u&&o.length,hidden:!o.length})},o.length&&!u?r.a.createElement(b,{onClick:function(){e.setState({currentCommitsList:[]})},className:"close-commits-list"},r.a.createElement("i",{className:"fa fa-times","aria-hidden":"true"})):null,r.a.createElement(L,{isMobile:u,className:"commitsList-table",currentCommitRepoSelected:m,items:o}))))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[11,1,2]]]);
//# sourceMappingURL=main.eed87b6e.chunk.js.map