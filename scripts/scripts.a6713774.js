"use strict";!function(){angular.module("marcelinhaApp.config.consts",[]).constant("CONSTS",{appTitle:"AT!TUDE SOUZA CRUZ",apiUrl:"https://chepitanode.azurewebsites.net",idkey:"11",formulario:"http://casepress.azurewebsites.net/wp-json/wp/v2/formulario/925",temGrupos:!1,temAcompanhante:!1,loginPorSenha:!1,telefone:"+55 (11) 3957-6513",email:"rsvpsouzacruz@voqin.com",grupos:{}})}(),angular.module("marcelinhaApp",["ngCookies","ngResource","ngSanitize","ngTouch","ui.router","ui.router.state.events","marcelinhaApp.config.consts","ngStorage","ui.mask","angularFileUpload","pascalprecht.translate","tmh.dynamicLocale","angular.filter","ui.bootstrap.modal","ui.bootstrap.tpls"]).config(["$urlRouterProvider","$stateProvider","$httpProvider","CONSTS","$translateProvider","tmhDynamicLocaleProvider",function(a,b,c,d,e,f){e.useStaticFilesLoader({prefix:"resources/i18n/locale-",suffix:".json"}),e.preferredLanguage("pt-BR"),e.useLocalStorage(),f.localeLocationPattern("bower_components/angular-i18n/angular-locale_{{locale}}.js"),e.useMissingTranslationHandlerLog(),a.otherwise("/");var g=null,h=null;d.temGrupos===!0?(g="/",h="/?grupo"):(g=null,h="/"),b.state("loggedin",{templateUrl:"views/loggedin.html","abstract":!0,controller:"LoggedinCtrl",controllerAs:"loggedIn",resolve:{buscaPerfilUsuario:["chepita","$rootScope","$state",function(a,b,c){return b.stateIsLoading=!0,a.profileGet().then(function(a){return console.log(a.data[0]),b.rootScopeUsuario=a.data[0],a.data[0]},function(a){console.log(a),("não está logado"===a.data[0]||-1===a.status)&&c.go("login")})}]}}).state("loggedout",{templateUrl:"views/loggedout.html","abstract":!0,controller:"LoggedoutCtrl",controllerAs:"loggedOut"}).state("groups",{url:g,templateUrl:"views/groups.html",parent:"loggedout",controller:"GroupsCtrl",controllerAs:"groups"}).state("login",{url:h,templateUrl:"views/main.html",parent:"loggedout",controller:"MainCtrl",controllerAs:"main",params:{grupo:null,lang:null}}).state("profile",{url:"/profile",parent:"loggedin",templateUrl:"views/profile.html",controller:"ProfileCtrl",controllerAs:"profile"}).state("sucesso",{url:"/sucesso",parent:"loggedin",templateUrl:"views/successregister.html"}).state("upload",{url:"/upload",parent:"loggedin",templateUrl:"views/upload.html",controller:"UploadCtrl",controllerAs:"upload"}).state("conteudo",{url:"/conteudo",parent:"loggedin",templateUrl:"views/conteudodefault.html",controller:"ConteudodefaultCtrl",controllerAs:"conteudodefault",resolve:{buscaConteudo:["$http","$rootScope",function(a,b){return b.stateIsLoading=!0,a({method:"GET",url:"https://casepress.azurewebsites.net/wp-json/wp/v2/pages/915"}).then(function(a){return b.stateIsLoading=!0,a.data.content.rendered},function(a){console.log(a)})}]}}).state("teste",{url:"/teste",parent:"loggedin",templateUrl:"views/teste.html",controller:"TesteCtrl",controllerAs:"teste"}),c.defaults.headers.common={},c.defaults.headers.post={},c.defaults.headers.put={},c.defaults.headers.patch={},c.defaults.withCredentials=!0}]).run(["$rootScope","CONSTS","$http","$timeout","uiMaskConfig",function(a,b,c,d,e){e.clearOnBlur=!1,e.addDefaultPlaceholder=!1,e.uiMaskPlaceholderChar="space",e.uiMaskPlaceholder=!1,console.log(e),a.formulario={lists:{"Campos definidos":""}},a.stateIsLoading=!0,c({method:"GET",url:b.formulario}).then(function(b){a.stateIsLoading=!1,a.formulario=JSON.parse(b.data.acf.json),console.log(a.formulario),d(function(){$.material.init()},100)},function(a){console.log(a)}),a.$on("$stateChangeStart",function(){a.stateIsLoading=!0}),a.$on("$stateChangeSuccess",function(){a.stateIsLoading=!1}),a.appTitle=b.appTitle,a.$on("$viewContentLoaded",function(a){function b(a,b,c){var d;return function(){var e=this,f=arguments;clearTimeout(d),d=setTimeout(function(){d=null,c||a.apply(e,f)},b),c&&!d&&a.apply(e,f)}}var c=!0,d={misc:{navbar_menu_visible:0},checkScrollForTransparentNavbar:b(function(){$(document).scrollTop()>260?c&&(c=!1,$(".navbar-color-on-scroll").removeClass("navbar-transparent")):c||(c=!0,$(".navbar-color-on-scroll").addClass("navbar-transparent"))},17),initSliders:function(){$("#sliderRegular").noUiSlider({start:40,connect:"lower",range:{min:0,max:100}}),$("#sliderDouble").noUiSlider({start:[20,60],connect:!0,range:{min:0,max:100}})}};$(document).ready(function(){if($(window).on("load",function(){$.material.init()}),$.material.init(),$(".parallax").length>0){new Rellax(".parallax")}$('[data-toggle="tooltip"], [rel="tooltip"]').tooltip(),0!=$(".navbar-color-on-scroll").length&&$(window).on("scroll",d.checkScrollForTransparentNavbar),$('[data-toggle="popover"]').popover(),$(".carousel").carousel({interval:4e5}),$(".navbar-collapse").collapse("hide")}),$(document).on("click",function(){$(".collapse").collapse("hide")})})}]),angular.module("marcelinhaApp").controller("MainCtrl",["chepita","$scope","$state","$rootScope","$localStorage","CONSTS","$location","LocaleService","LOCALES","tmhDynamicLocale","$timeout","sha256",function(a,b,c,d,e,f,g,h,i,j,k,l){f.temGrupos&&!f.grupos[g.$$search.grupo]&&(delete e.grupo,console.log("grupo nao esta definido"),c.go("groups")),b.grupo=f,setTimeout(function(){g.$$search.lang&&(h.setLocaleByIsoCode(g.$$search.lang),j.set(g.$$search.lang),k(function(){d.currentLocaleDisplayName=h.getLocaleDisplayName()},1e3)),e.grupo=g.$$search.grupo},100),b.submitForm=function(e,f,g){g&&(g=l.convert(g)),e&&(d.stateIsLoading=!0,console.log(g),a.login(f,g).then(function(a){console.log(a),c.go("profile")})["catch"](function(a){d.stateIsLoading=!1,console.log(a),b.hasError=!0,b.errorMsg=a.data[0],(500===a.status||null===a.data)&&(b.errorMsg="Erro no servidor"),setTimeout(function(){b.hasError=!1},3e3)}))}}]),angular.module("marcelinhaApp").service("chepita",["$http","CONSTS","$localStorage","$state",function(a,b,c,d){var e=this,f="",g=function(){return b.temGrupos?(c.grupo||d.go("groups"),b.grupos[c.grupo].idKey):b.idkey};e.login=function(c,d){return f=g(),a({method:"POST",url:b.apiUrl+"/login",headers:{"Content-Type":"application/json",idkey:f},data:[c,d]}).then(function(a){return a})},e.logout=function(){return f=g(),a({method:"GET",url:b.apiUrl+"/logout",headers:{"Content-Type":"application/json",idkey:f}}).then(function(a){return a})},e.profileGet=function(c,d){return f=g(),a({method:"POST",url:b.apiUrl+"/profile",headers:{"Content-Type":"application/json",idkey:f}}).then(function(a){return a})},e.profileEdit=function(c){return f=g(),a({method:"PUT",url:b.apiUrl+"/profile",headers:{"Content-Type":"application/json",idkey:f},data:c}).then(function(a){return a})},e.acompanhanteGet=function(){return f=g(),a({method:"GET",url:b.apiUrl+"/acompanhante",headers:{"Content-Type":"application/json",idkey:f}}).then(function(a){return a})},e.acompanhantePost=function(c){return f=g(),a({method:"POST",url:b.apiUrl+"/acompanhante",headers:{"Content-Type":"application/json",idkey:f},data:c}).then(function(a){return a})},e.acompanhanteEdit=function(c){return f=g(),a({method:"PUT",url:b.apiUrl+"/acompanhante",headers:{"Content-Type":"application/json",idkey:f},data:c}).then(function(a){return a})},e.sasTokenGenerate=function(c,d){var e={idkey:b.idkey,blobname:c};if(d){var d=d.toString();e={idkey:b.idkey,blobname:c,acompid:d}}return console.log(e),a({method:"POST",url:b.apiUrl+"/sas-token",headers:e}).then(function(a){return a})},e.sasTokenXcasePost=function(c){return a({method:"POST",url:b.apiUrl+"/insert-file",headers:{idkey:b.idkey,"Content-Type":"application/json"},data:c}).then(function(a){return a})}}]),angular.module("marcelinhaApp").service("brazilStatesService",["$http",function(a){var b=this;b.getList=function(){return a({method:"GET",url:"../resources/brazilStates.json"})}}]),angular.module("marcelinhaApp").controller("ProfileCtrl",["$http","chepita","$state","$scope","brazilStatesService","$localStorage","CONSTS","$rootScope","aspDate","$timeout",function(a,b,c,d,e,f,g,h,i,j){d.grupo=g.grupos[f.grupo],void 0===d.grupo&&(d.grupo={},d.grupo.deadlineInscricao="31/01"),d.titular=i.tratamentoDeDatasAoReceber(angular.copy(h.rootScopeUsuario)),d.$watch("titular.Wave",function(){j(function(){$.material.init()},100)}),d.acompanhante={Alergias:null,AlteracaoEfetuada:null,Apelido:null,Calcado:null,CalcadoOrigem:"1",Cargo:null,CartaoFidelidade:null,Celular:null,Chave:null,CidadeEmbarque:null,ConcenteColetaDados:!1,ContatarSMS:!1,ContatarTelefone:!1,ContatoEmergencia:{Celular:null,Nome:null,Telefone:null},ContatoParceiro:!1,Cpf:null,DataInscricao:new Date,Email:null,"Emissão Case":null,Empresa:null,Endereco:{Bairro:null,Cep:null,Cidade:null,Complemento:null,Logradouro:null,Numero:null,Pais:null,Uf:null,UfInternacional:null,tipo:0},Fax:null,Fumante:!1,Id:0,IdAlterando:0,Idioma:1,Impresso:!1,InformacoesMedicas:null,Manequim:null,Nacionalidade:{Cidade:null,EstadoCivil:null,Pais:null,Uf:null,UfInternacional:null},Nascimento:null,Nome:null,Observacoes:[],Order:null,Origem:null,PacoteVooId:0,Passaporte:{Emissao:null,Emissor:null,Numero:null,Validade:null},PerfilViajante:null,Pne:!1,PreferenciaDeAssento:null,Presente:!1,RestricoesAlimentares:null,Rg:{Emissao:null,Emissor:null,Numero:null,Validade:null},Sexo:null,Sobrenome:null,Status:0,Telefone:null,Titular:d.titular.Id,TransferIn:!0,TransferInTerrestre:!0,TransferOut:!0,TransferOutTerrestre:!0,Visivel:!1,Visto:{Emissao:null,Emissor:null,Numero:null,Validade:null},Wave:0,GrauParentesco:null},d.titular.objAcompanhante[0]&&(d.acompanhante=i.tratamentoDeDatasAoReceber(d.titular.objAcompanhante[0]));e.getList().then(function(a){d.estados=a.data.estados}),d.submitting=!1,d.canSubmit=function(){return 0==d.titular.Status||"0"===d.titular.Status||-2==d.titular.Status||"-2"===d.titular.Status?!0:!1},d.checaSeCampoEstaInvalido=function(a){return console.log(a),a},d.disableFields=function(){return!d.canSubmit()},d.debugForm=function(a){console.log(a)},d.submitForm=function(a){d.titular,d.acompanhante;angular.forEach(h.formulario.lists["Campos definidos"],function(a,b){if(1===d.titular.Wave)if(a.key.indexOf(".")>-1){var c=a.key.split(".");d[a.atribuicao.toLowerCase().toString()][c[0]][c[1]]=a.value}else d[a.atribuicao.toLowerCase().toString()][a.key]=a.value;else if("Titular"===a.atribuicao)if(a.key.indexOf(".")>-1){var c=a.key.split(".");d.titular[c[0]][c[1]]=a.value}else d.titular[a.key]=a.value}),a&&(d.titular.DataInscricao=new Date,d.titular=i.tratamentoDeDatasAoEnviar(d.titular),d.titular.Status=-2,d.submitting=!0,d.loading=!0,h.stateIsLoading=!0,b.profileEdit(d.titular).then(function(a){h.rootScopeUsuario=d.titular,0!==d.acompanhante.Id?(d.acompanhante=i.tratamentoDeDatasAoEnviar(d.acompanhante),b.acompanhanteEdit(d.acompanhante).then(function(a){c.go("upload")})["catch"](function(a){console.log(a)})):d.acompanhante.Nome&&0===d.acompanhante.Id?(d.acompanhante=i.tratamentoDeDatasAoEnviar(d.acompanhante),d.acompanhante.Titular=d.titular.Id,b.acompanhantePost(d.acompanhante).then(function(a){c.go("upload")})["catch"](function(a){console.log(a)})):c.go("upload")})["catch"](function(a){console.log(a)}))},d.teste=function(a){console.log(a)},d.syncForm=function(){console.log("syncForm"),angular.forEach(h.formulario.lists["Campos definidos"],function(a,b){if(d.titular.objAcompanhante[0]||1===d.titular.Wave)if(a.key.indexOf(".")>-1){var c=a.key.split(".");a.value=d[a.atribuicao.toLowerCase().toString()][c[0]][c[1]]}else a.value=d[a.atribuicao.toLowerCase().toString()][a.key];else if("Titular"===a.atribuicao)if(a.key.indexOf(".")>-1){var c=a.key.split(".");a.value=d.titular[c[0]][c[1]]}else a.value=d.titular[a.key]})},d.$watchGroup([h.formulario.lists["Campos definidos"],h.rootScopeUsuario,h.stateIsLoading],function(a,b,c){j(function(){d.syncForm()},100)})}]),angular.module("marcelinhaApp").filter("dateFilter",function(){return function(a){return null!=a?new Date(parseInt(a.substr(6))):""}}),angular.module("marcelinhaApp").filter("cmdate",function(){return function(a){return"cmdate filter: "+a}}),angular.module("marcelinhaApp").controller("LoggedinCtrl",["$scope","chepita","$state","$localStorage","CONSTS","buscaPerfilUsuario","$rootScope",function(a,b,c,d,e,f,g){var h=null;d.grupo&&d.grupo.length>0?(a.grupo=e.grupos[d.grupo],h={grupo:d.grupo}):a.grupo=e,a.logout=function(){b.logout().then(function(a){c.go("login",h)},function(a){console.log(a)})}}]),angular.module("marcelinhaApp").controller("LoggedoutCtrl",["$scope","CONSTS",function(a,b){a.grupo=b}]),angular.module("marcelinhaApp").controller("GroupsCtrl",["CONSTS","$localStorage","$state",function(a,b,c){var d=this;d.defineSite=function(a){b.grupo=a,c.go("login",{grupo:a})},delete b.grupo,console.log(b.grupo),d.grupos=a.grupos}]),angular.module("marcelinhaApp").controller("UploadCtrl",["$scope","chepita","FileUploader","$rootScope","aspDate","$state","CONSTS","$uibModal",function(a,b,c,d,e,f,g,h){a.tiposArquivo=[{name:"Passaporte",id:1},{name:"Visto",id:2},{name:"Outros",id:3}],g.temAcompanhante&&(a.referenciaArquivo=[{name:"Titular",insertAcompId:!1},{name:"Acompanhante",insertAcompId:!0}]);var i=a.uploader=new c({disableMultipart:!0,method:"put",headers:{"x-ms-blob-type":"BlockBlob"}});a.errorModal=function(){var b=h.open({animation:!0,keyboard:!0,bindings:{resolve:"<",close:"&",dismiss:"&"},backdropClick:!0,templateUrl:"sasTokenGenerateError.html",scope:a});return a.alterandoUrl=!1,a.modalInstance=b,b.result},a.closeModal=function(){a.modalInstance.close()},a.definindoReferenciaArquivo=function(c){var e=null;c.insertAcompId===!0&&(e=d.rootScopeUsuario.objAcompanhante[0].Id),c.url="/foo",a.alterandoUrl=!0,b.sasTokenGenerate(c.file.name,e).then(function(b){c.url=b.data,a.alterandoUrl=!1},function(b){i.removeFromQueue(c),a.errorModal(),console.log(b)})},a.checaSeTemSasToken=function(a){var b=!0;return angular.forEach(a,function(a,c){("/"===a.url||"/foo"===a.url)&&(b=!1)}),b},a.titularFoiDefinido=function(a){var b=!1;return angular.forEach(a,function(a,c){a.insertAcompId===!1&&(b=!0)}),b},a.acompanhanteFoiDefinido=function(a){var b=!1;return angular.forEach(a,function(a,c){a.insertAcompId===!0&&(b=!0)}),b},a.liberaUploadComAcompanhante=function(b){var c=!1;if(a.checaSeTemSasToken(b)&&a.titularFoiDefinido(b)&&a.acompanhanteFoiDefinido(b))var c=!0;return c},i.onAfterAddingFile=function(b){a.allUploadsComplete=!1,b.tipoArquivo=1,a.definindoReferenciaArquivo(b)},i.onBeforeUploadItem=function(a){},i.onSuccessItem=function(a,c,e,f){console.log(c);var g={Alteracao:null,Conteudo:[0,0,0,0],Criacao:null,Id:0,IdCategoria:a.tipoArquivo,IdParticipante:null,Nome:a.file.name,OnOff:0,TipoConteudo:a.file.type,URI:a.url.split("?")[0]};a.insertAcompId===!0&&(g.IdParticipante=d.rootScopeUsuario.objAcompanhante[0].Id),b.sasTokenXcasePost(g).then(function(a){console.log(a)},function(a){console.log(a)})},i.onCompleteAll=function(){console.log("oncompleteall"),a.allUploadsComplete=!0},i.onErrorItem=function(){i.clearQueue(),i.cancelAll(),i.destroy(),a.errorModal(),a.allUploadsComplete=!1},a.usuario=e.tratamentoDeDatasAoReceber(angular.copy(d.rootScopeUsuario)),a.submitForm=function(){a.usuario=e.tratamentoDeDatasAoEnviar(a.usuario),a.usuario.Status=-4,a.submitting=!0,a.loading=!0,d.stateIsLoading=!0,b.profileEdit(a.usuario).then(function(b){d.rootScopeUsuario=a.usuario,f.go("sucesso")})["catch"](function(a){d.stateIsLoading=!1,console.log(a)})}}]),angular.module("marcelinhaApp").service("LocaleService",["$translate","LOCALES","$rootScope","tmhDynamicLocale",function(a,b,c,d){var e=b.locales,f=Object.keys(e);f&&0!==f.length||console.error("There are no _LOCALES provided");var g=[];f.forEach(function(a){g.push(e[a])});var h=a.proposedLanguage(),i=function(a){return-1!==f.indexOf(a)},j=function(b){return i(b)?(h=b,void a.use(b)):void console.error('Locale name "'+b+'" is invalid')};return c.$on("$translateChangeSuccess",function(a,b){document.documentElement.setAttribute("lang",b.language),d.set(b.language.toLowerCase().replace(/_/g,"-"))}),{getLocaleDisplayName:function(){return window.localStorage.getItem("NG_TRANSLATE_LANG_KEY")},setLocaleByDisplayName:function(a){j(f[g.indexOf(a)])},setLocaleByIsoCode:function(a){j(a)},getLocalesDisplayNames:function(){return g}}}]),angular.module("marcelinhaApp").directive("ngTranslateLanguageSelect",["LocaleService",function(a){return{restrict:"AE",scope:{name:"@"},template:"aaaaa"}}]),angular.module("marcelinhaApp").constant("LOCALES",{locales:{"pt-BR":"Português do Brasil"},preferredLocale:"pt-BR"}),angular.module("marcelinhaApp").controller("LanguageselectCtrl",["LocaleService","$scope","LOCALES","tmhDynamicLocale","$rootScope","$timeout",function(a,b,c,d,e,f){e.currentLocaleDisplayName=a.getLocaleDisplayName(),b.localesDisplayNames=a.getLocalesDisplayNames(),b.visible=b.localesDisplayNames&&b.localesDisplayNames.length>1,b.localesNamesWithKeys=c.locales,b.changeLanguage=function(b){a.setLocaleByIsoCode(b),d.set(b),f(function(){e.currentLocaleDisplayName=a.getLocaleDisplayName()},1e3)}}]),angular.module("marcelinhaApp").directive("loading",function(){return{restrict:"E",replace:!0,template:'<div style="padding: 10% 0 10%;" class="sk-three-bounce"><div class="sk-child sk-bounce1"></div><div class="sk-child sk-bounce2"></div><div class="sk-child sk-bounce3"></div></div>'}}),angular.module("marcelinhaApp").service("aspDate",function(){function a(a){var b=a.split("/");return new Date(b[2],b[1]-1,b[0])}var b=this,c=function(a){var b=null;return"31/12/1899"===a?(console.log("undefine!"),b=void 0):b=a,b};b.tratamentoDeDatasAoReceber=function(a){return angular.forEach(a,function(b,d){var e=/(.)(Date)(.).*?(\d+).*?(\d+)(.)(.)/i;b&&e.test(b)&&(a[d]=new Date(parseInt(a[d].substr(6))),a[d]=moment(a[d]).format("DD/MM/YYYY"),a[d]=c(a[d])),angular.forEach(a[d],function(b,e){var f=/(.)(Date)(.).*?(\d+).*?(\d+)(.)(.)/i;b&&f.test(b)&&(a[d][e]=new Date(parseInt(a[d][e].substr(6))),a[d][e]=moment(a[d][e]).format("DD/MM/YYYY"),a[d][e]=c(a[d][e]))})}),a},b.tratamentoDeDatasAoEnviar=function(b){return angular.forEach(b,function(c,d){var e=/((?:(?:[0-2]?\d{1})|(?:[3][01]{1}))[-:\/.](?:[0]?[1-9]|[1][012])[-:\/.](?:(?:[1]{1}\d{1}\d{1}\d{1})|(?:[2]{1}\d{3})))(?![\d])/i;if(c instanceof Date||c&&e.test(c)){e.test(c)&&(b[d]=a(b[d]));var f=moment(b[d]).valueOf(),g=moment(b[d]).format("ZZ");b[d]="/Date("+f+g+")/"}angular.forEach(b[d],function(c,f){if(c instanceof Date||c&&e.test(c)){e.test(c)&&(b[d][f]=a(b[d][f]));var g=moment(b[d][f]).valueOf(),h=moment(b[d][f]).format("ZZ");b[d][f]="/Date("+g+h+")/"}})}),b}}),angular.module("marcelinhaApp").controller("TesteCtrl",function(){}),angular.module("marcelinhaApp").filter("iif",function(){return function(a,b,c){return a?b:c}}),angular.module("marcelinhaApp").service("caseFormDataBind",function(){}),angular.module("marcelinhaApp").controller("ConteudodefaultCtrl",["buscaConteudo","$scope","$sce","$timeout",function(a,b,c,d){b.conteudo=c.trustAsHtml(a),d(function(){$("[data-carrossel]").lightSlider({gallery:!0,item:1,loop:!0,slideMargin:0,thumbItem:9})},0)}]),angular.module("marcelinhaApp").filter("safeHtml",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),angular.module("marcelinhaApp").service("sha256",function(){var a=this;a.convert=function(a){function b(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function c(a,b){return a>>>b|a<<32-b}function d(a,b){return a>>>b}function e(a,b,c){return a&b^~a&c}function f(a,b,c){return a&b^a&c^b&c}function g(a){return c(a,2)^c(a,13)^c(a,22)}function h(a){return c(a,6)^c(a,11)^c(a,25)}function i(a){return c(a,7)^c(a,18)^d(a,3)}function j(a){return c(a,17)^c(a,19)^d(a,10)}function k(a,c){var d,k,l,m,n,o,p,q,r,s,t,u,v=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),w=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),x=new Array(64);a[c>>5]|=128<<24-c%32,a[(c+64>>9<<4)+15]=c;for(var r=0;r<a.length;r+=16){d=w[0],k=w[1],l=w[2],m=w[3],n=w[4],o=w[5],p=w[6],q=w[7];for(var s=0;64>s;s++)16>s?x[s]=a[s+r]:x[s]=b(b(b(j(x[s-2]),x[s-7]),i(x[s-15])),x[s-16]),t=b(b(b(b(q,h(n)),e(n,o,p)),v[s]),x[s]),u=b(g(d),f(d,k,l)),q=p,p=o,o=n,n=b(m,t),m=l,l=k,k=d,d=b(t,u);w[0]=b(d,w[0]),w[1]=b(k,w[1]),w[2]=b(l,w[2]),w[3]=b(m,w[3]),w[4]=b(n,w[4]),w[5]=b(o,w[5]),w[6]=b(p,w[6]),w[7]=b(q,w[7])}return w}function l(a){for(var b=Array(),c=(1<<o)-1,d=0;d<a.length*o;d+=o)b[d>>5]|=(a.charCodeAt(d/o)&c)<<24-d%32;return b}function m(a){a=a.replace(/\r\n/g,"\n");for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):d>127&&2048>d?(b+=String.fromCharCode(d>>6|192),b+=String.fromCharCode(63&d|128)):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128),b+=String.fromCharCode(63&d|128))}return b}function n(a){for(var b=p?"0123456789ABCDEF":"0123456789abcdef",c="",d=0;d<4*a.length;d++)c+=b.charAt(a[d>>2]>>8*(3-d%4)+4&15)+b.charAt(a[d>>2]>>8*(3-d%4)&15);return c}var o=8,p=0;return a=m(a),n(k(l(a),a.length*o))}}),angular.module("marcelinhaApp").run(["$templateCache",function(a){a.put("views/conteudodefault.html",'<ng-bind-html ng-bind-html="conteudo"> </ng-bind-html>'),a.put("views/footer.html",'<p><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <span translate="Em caso de dúvidas entre em contato com" translate-value-footeremail="{{grupo.email}}" translate-value-footertelefone="{{grupo.telefone}}"></span>.</p>'),a.put("views/groups.html",'<div class="v-container"> <div class="v-container-inner"> <div class="wrapper"> <div class="header"> <div class="container"> <div class="row"> <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3"> <div class="card card-signup"> <form name="userForm" ng-submit="submitForm(userForm.$valid, email)" novalidate> <div class="header text-center"> <h1 class="text-center"> <img class="img-responsive" style="display: inline-block" src="images/logo-colorido.bb634ee9.svg" alt="{{appTitle}}"> </h1> <br> <h4>Selecione seu grupo</h4> </div> <div class="content content-grupos"> <a ng-repeat="grupo in groups.grupos" href="#!/?grupo={{grupo.slug}}" ng-click="groups.defineSite(grupo.slug)" class="btn btn-default btn-block">{{grupo.nome}}</a> </div> <div class="footer text-center"> <div class="row"> <div class="col-xs-12"> <hr> </div> <div class="col-xs-10 col-xs-offset-1"> <div ng-include="\'/views/footer.html\'"></div> </div> </div> </div> </form> </div> </div> </div> </div> </div> </div> </div> </div>'),a.put("views/loggedin.html",'<nav class="navbar navbar-transparent navbar-fixed-top navbar-color-on-scroll"> <div class="container"> <!-- Brand and toggle get grouped for better mobile display --> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#menuprincipal" aria-expanded="false"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#!/profile"> <img class="img-responsive" src="images/logo-top.14a83828.svg" alt="{{appTitle}}"> </a> </div> <div class="collapse navbar-collapse" id="menuprincipal"> <ul class="nav navbar-nav navbar-right"> <li> <a href="#!/conteudo">{{\'Menu.Conteudo\' | translate}}</a> </li> <li> <a href="#!/profile">{{\'Menu.Inscricao\' | translate}}</a> </li> <li> <a href="" ng-click="logout()"> <span class="glyphicon glyphicon-log-out"></span>{{\'Menu.Sair\' | translate}}</a> </li> </ul> </div> </div> </nav> <div class="page-header clear-filter purple-filter" style="position: relative; overflow: hidden"> <div class="" style="background-size: cover;\n            background-position: center top; background-color: #fb8a00"> <div class="container"> <div class="row"> <div class="col-sm-4 col-sm-offset-4"> <img class="img-responsive page-header-logo" src="images/logo-campanha.a489e3bb.png" alt="{{appTitle}}"> </div> </div> </div> </div> </div> <div class="container"> <div class="main main-raised"> <div class="section section-basic"> <div class="row" style="position: relative"> <div class="col-xs-12"> <loading ng-if="stateIsLoading"></loading> </div> <div ui-view ng-if="!stateIsLoading" class="col-xs-12 col-md-8 col-md-offset-2"></div> </div> </div> </div> </div> <br> <div class="footer"> <div class="container"> <div class="alert alert-primary text-center" role="alert"> <div ng-include="\'/views/footer.html\'"></div> </div> <!-- <div class="language-select text-center" ng-controller="LanguageselectCtrl">\n\n            <ul class="list-inline" style="margin-bottom: 0;">\n                <li><span class="glyphicon glyphicon-globe" aria-hidden="true"></span></li>\n                <li ng-repeat="(key, value) in localesNamesWithKeys">\n                    <small>\n                        <a href="" ng-click="changeLanguage(key)" ng-class="key === currentLocaleDisplayName ? \'text-underline\' : \'\'">\n                            <span></span> {{value}}</a>\n                    </small>\n                </li>\n            </ul>\n        \n        </div> --> <br> </div> </div>'),a.put("views/loggedout.html",'<div ui-view class="anim-in-out anim-fade" data-anim-speed="1000" data-anim-sync="false"></div>'),a.put("views/main.html",'<div class="v-container"> <div class="v-container-inner"> <div class="wrapper"> <div class="header"> <div class="container"> <div class="row"> <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3"> <div class="card card-signup"> <form name="userForm" ng-submit="submitForm(userForm.$valid, main.email, main.senha)" novalidate> <div class="header header-primary text-center"> <h1 class="text-center"> <img class="img-responsive" style="display: inline-block" src="images/logo-campanha.a489e3bb.png" alt="{{appTitle}}"> </h1> <br> <h4>Login</h4> </div> <!-- <div class="language-select text-center bg-primary" ng-controller="LanguageselectCtrl" style="padding-top: 20px; padding-bottom: 20px; color: white;">\n\n                      <ul class="list-inline" style="margin-bottom: 0;">\n                        <li>\n                          <span class="glyphicon glyphicon-globe" aria-hidden="true"></span>\n                        </li>\n                        <li ng-repeat="(key, value) in localesNamesWithKeys">\n                          <small>\n                            <a href="" style="color: white;" ng-click="changeLanguage(key)" ng-class="key === currentLocaleDisplayName ? \'text-underline\' : \'\'">\n                              <span></span> {{value}}</a>\n                          </small>\n                        </li>\n                      </ul>\n\n                    </div> --> <div class="content"> <div class="input-group"> <span class="input-group-addon"> <i class="material-icons">email</i> </span> <input type="email" name="email" class="form-control" ng-model="main.email" placeholder="{{ \'Insira seu e-mail\' | translate }}" required> <p ng-show="userForm.email.$invalid && !userForm.email.$pristine" class="help-block">{{\'Insira um e-mail válido\' | translate}}</p> </div> <!-- inicializando o scope para senha --> <div class="hidden">{{main.senha}}</div> <div class="input-group" ng-if="grupo.loginPorSenha"> <span class="input-group-addon"> <i class="material-icons">lock_outline</i> </span> <input type="password" name="password" class="form-control" ng-model="main.senha" placeholder="{{\'Digite sua senha\' | translate}}" required> </div> </div> <div class="footer text-center"> <div class="row"> <div class="col-xs-12"> <button type="submit" href="#" class="btn btn-primary" ng-disabled="userForm.email.$invalid || !userForm.email.$viewValue"> <i class="material-icons fa-spin" ng-if="stateIsLoading">autorenew</i> Login</button> <div class="alert alert-danger" ng-show="hasError"> <span translate>{{errorMsg}}</span> </div> <br> <br> <a href="#" ng-show="grupo.loginPorSenha"> <small>Esqueci minha senha</small> </a> <hr> </div> <div class="col-xs-10 col-xs-offset-1"> <div ng-include="\'/views/footer.html\'"></div> <br> </div> </div> </div> </form> </div> </div> </div> </div> </div> </div> </div> </div>'),a.put("views/profile.html",'<h2>Perfil</h2> <p>{{titular.Nome}} <span translate>seja bem-vindo(a)!</span> </p> <p><span translate="Profile.DeadlineMessage"></span> {{grupo.deadlineInscricao}}.</p> <p><span translate="Profile.MandatoryFields"></span></p> <form name="userForm" ng-submit="submitForm(userForm.$valid)"> <fieldset ng-repeat="atribuido in formulario.lists[\'Campos definidos\'] | groupBy:\'atribuicao\'" ng-disabled="disableFields()"> <h3> {{atribuido[0].atribuicao | translate}} <div class="togglebutton" ng-if="atribuido[0].atribuicao === \'Acompanhante\'"> <label> <span translate>Irá levar acompanhante</span>? <input type="checkbox" checked ng-model="titular.Wave" ng-false-value="0" ng-true-value="1"> </label> </div> </h3> <div class="form-group" ng-repeat="campo in atribuido" ng-if="(atribuido[0].atribuicao === \'Titular\') || (titular.Wave === 0 && atribuido[0].atribuicao !== \'Acompanhante\') || (titular.Wave === 1 && atribuido[0].atribuicao === \'Acompanhante\')" ng-class="{ \'has-error\': userForm[atribuido[0].atribuicao + campo.key].$invalid }"> <!-- label padrao para todos os campos --> <label for="{{atribuido[0].atribuicao + campo.key}}"> <span ng-hide="campo.customLabel">{{campo.label}}</span> <span>{{campo.customLabel}}</span> <span ng-show="campo.obrigatorio">*</span> </label> <!-- campos de texto / email / tel --> <input ng-if="(campo.type === \'text\') || (campo.type === \'email\') || (campo.type === \'tel\') || (campo.type === \'number\')" type="{{campo.type}}" id="{{atribuido[0].atribuicao + campo.key}}" name="{{atribuido[0].atribuicao + campo.key}}" class="form-control" maxlength="{{campo.tamanhoMaximo}}" minlength="{{campo.tamanhoMinimo}}" ui-mask-placeholder="{{campo.custom-placeholder | iif : campo.custom-placeholder : campo.placeholder}}" ui-mask="{{campo.mascara}}" ng-required="campo.obrigatorio" ng-model="campo.value"> <!-- campos de select --> <select ng-if="(campo.type === \'select\')" class="form-control" name="{{atribuido[0].atribuicao + campo.key}}" id="{{atribuido[0].atribuicao + campo.key}}" ng-model="campo.value" ng-options="option.value as option.name for option in campo.options" ng-required="campo.obrigatorio"> </select> <!-- campos de radio --> <!-- campos de radio inline --> <div class="radio" ng-if="(campo.type === \'radio\') || (campo.type === \'radio-inline\') " ng-repeat="option in campo.options"> <label> <input type="radio" id="{{atribuido[0].atribuicao + campo.key}}" name="{{atribuido[0].atribuicao + campo.key}}" ng-model="campo.value" ng-value="option.value" ng-required="campo.obrigatorio"> {{option.name}}</label> </div> <!-- campos de booleano --> <div class="radio" ng-if="(campo.type === \'boolean\')"> <label> <input type="radio" id="{{atribuido[0].atribuicao + campo.key}}" name="{{atribuido[0].atribuicao + campo.key}}" ng-model="campo.value" ng-value="false" ng-required="campo.obrigatorio"> {{\'Não\' | translate}} </label> </div> <div class="radio" ng-if="(campo.type === \'boolean\')"> <label> <input type="radio" id="{{atribuido[0].atribuicao + campo.key}}" name="{{atribuido[0].atribuicao + campo.key}}" ng-model="campo.value" ng-value="true" ng-required="campo.obrigatorio"> {{\'Sim\' | translate}} </label> </div> <!-- campo de data em uma string --> <input ng-if="(campo.type === \'date-string\')" type="text" name="{{atribuido[0].atribuicao + campo.key}}" id="{{atribuido[0].atribuicao + campo.key}}" ui-mask-placeholder="{{campo.custom-placeholder | iif : campo.custom-placeholder : campo.placeholder}}" class="form-control" ng-model="campo.value" ui-mask="99/99/9999" ng-required="campo.obrigatorio" model-view-value="true"> <span class="material-icons form-control-feedback">clear</span> </div> </fieldset> <button type="submit" class="btn btn-primary" ng-disabled="submitting || userForm.$invalid" ng-show="canSubmit()"><span translate>Enviar</span></button> </form> <br>'),
a.put("views/successregister.html","<h1 translate>Sucesso.Obrigado</h1> <p translate>Sucesso.DadosSucesso</p>"),a.put("views/teste.html",""),a.put("views/upload.html",'<h3 translate>Upload.Title</h3> <p translate>Upload.Descricao</p> <br> <!-- componente de upload titular --> <div class="well"> <h4 class="text-center">{{\'Titular\'| translate}}</h4> <br> <div ng-show="uploader.isHTML5"> <!-- Example: nv-file-drop="" uploader="{Object}" options="{Object}" filters="{String}" --> <div nv-file-drop="" uploader="uploader" options="{ url: \'/foo\', insertAcompId: false }"> <div nv-file-over="" uploader="uploader" options="{ url: \'/foo\', insertAcompId: false }" over-class="nv-file-over" class="well my-drop-zone text-center"> {{\'Upload.SelecioneArraste\' | translate}} </div> </div> </div> <!-- Example: nv-file-select="" uploader="{Object}" options="{Object}" filters="{String}" --> <p class="text-center"> {{\'Upload.Ou\' | translate}} <br> <span class="btn btn-default btn-file text-center"> {{\'Upload.Selecione\' | translate}} <input type="file" nv-file-select="" uploader="uploader" options="{ url: \'/foo\', insertAcompId: false }" multiple> </span> </p> <br> <form name="uploadFormAcompanhante" class="row" ng-show="uploader.queue.length > 0"> <div class="col-xs-12 col-sm-4" ng-repeat="item in uploader.queue" ng-if="!item.insertAcompId"> <div class="thumbnail"> <p style="overflow: hidden;  white-space: nowrap; text-overflow: ellipsis"> <strong> <span class="" ng-show="item.isSuccess"> <i class="glyphicon glyphicon-ok"></i> </span> <span class="" ng-show="item.isCancel"> <i class="glyphicon glyphicon-ban-circle"></i> </span> <span class="" ng-show="item.isError"> <i class="glyphicon glyphicon-remove"></i> </span> {{ item.file.name }} </strong> <br> <small class="text-muted">{{\'Upload.Tamanho\' | translate}}: {{ item.file.size/1024/1024|number:2 }} MB</small> </p> <!-- <td>\n                            <select ng-model="item.tipoArquivo" ng-options="tipo.id as tipo.name for tipo in tiposArquivo"></select>\n                        </td> --> <div class="progress" style="margin-bottom: 0" ng-if="item.progress"> <div class="progress-bar" role="progressbar" ng-style="{ \'width\': item.progress + \'%\' }"></div> </div> </div> </div> </form> </div> <!-- componente upload acompanhante --> <div ng-if="usuario.Wave === 1" class="well"> <h4 class="text-center">{{\'Acompanhante\'| translate}}</h4> <br> <div ng-show="uploader.isHTML5"> <!-- Example: nv-file-drop="" uploader="{Object}" options="{Object}" filters="{String}" --> <div nv-file-drop="" uploader="uploader" options="{ url: \'/foo\', insertAcompId: true }"> <div nv-file-over="" uploader="uploader" options="{ url: \'/foo\', insertAcompId: true }" over-class="nv-file-over" class="well my-drop-zone text-center"> {{\'Upload.SelecioneArraste\' | translate}} </div> </div> </div> <!-- Example: nv-file-select="" uploader="{Object}" options="{Object}" filters="{String}" --> <p class="text-center"> {{\'Upload.Ou\' | translate}} <br> <span class="btn btn-default btn-file text-center"> {{\'Upload.Selecione\' | translate}} <input type="file" nv-file-select="" uploader="uploader" options="{ url: \'/foo\', insertAcompId: true }" multiple> </span> </p> <br> <form name="uploadFormAcompanhante" class="row" ng-show="uploader.queue.length > 0"> <div class="col-xs-12 col-sm-4" ng-repeat="item in uploader.queue" ng-if="item.insertAcompId"> <div class="thumbnail"> <p style="overflow: hidden;  white-space: nowrap; text-overflow: ellipsis"> <strong> <span class="" ng-show="item.isSuccess"> <i class="glyphicon glyphicon-ok"></i> </span> <span class="" ng-show="item.isCancel"> <i class="glyphicon glyphicon-ban-circle"></i> </span> <span class="" ng-show="item.isError"> <i class="glyphicon glyphicon-remove"></i> </span> {{ item.file.name }} </strong> <br> <small class="text-muted">{{\'Upload.Tamanho\' | translate}}: {{ item.file.size/1024/1024|number:2 }} MB</small> </p> <!-- <td>\n                                <select ng-model="item.tipoArquivo" ng-options="tipo.id as tipo.name for tipo in tiposArquivo"></select>\n                            </td> --> <div class="progress" style="margin-bottom: 0" ng-if="item.progress"> <div class="progress-bar" role="progressbar" ng-style="{ \'width\': item.progress + \'%\' }"></div> </div> </div> </div> </form> </div> <br> <div ng-show="uploader.queue.length > 0"> <div> <p translate>Upload.Progresso</p> <div class="progress" style=""> <div class="progress-bar" role="progressbar" ng-style="{ \'width\': uploader.progress + \'%\' }"></div> </div> </div> <div class="alert alert-warning" ng-if="alterandoUrl"> <strong><i class="material-icons fa-spin" style="line-height: 0;  top: 7px; position: relative">autorenew</i> {{\'Upload.Aguarde\' | translate}}!</strong> {{\'Upload.GerandoLinkUpload\' | translate}}. </div> <div ng-if="usuario.Wave === 1"> <div class="alert alert-danger" ng-if="!alterandoUrl" ng-show="!checaSeTemSasToken(uploader.queue)"> <strong>{{\'Upload.Atencao\' | translate}}!</strong> {{\'Upload.ErroDefinirParticipante\' | translate}}. </div> <div class="alert alert-danger" ng-hide="titularFoiDefinido(uploader.queue) && acompanhanteFoiDefinido(uploader.queue)"> <strong>{{\'Upload.Atencao\' | translate}}!</strong> <span translate="{{\'Upload.ErroHaArquivosNaoAtribuidos\'}}"></span>. </div> </div> <button type="button" class="btn btn-primary btn-s" ng-click="submitForm()" ng-if="allUploadsComplete"> <span class="glyphicon glyphicon-ok"></span> {{\'Upload.Finalizar\' | translate}} </button> <button type="button" class="btn btn-success btn-s" ng-click="uploader.uploadAll()" ng-if="!allUploadsComplete && usuario.Wave === 0" ng-disabled="!checaSeTemSasToken(uploader.queue) "> <span class="glyphicon glyphicon-upload"></span> {{\'Upload.Send\' | translate}} </button> <button type="button" class="btn btn-success btn-s" ng-click="uploader.uploadAll()" ng-if="!allUploadsComplete && usuario.Wave === 1" ng-disabled="!liberaUploadComAcompanhante(uploader.queue)"> <span class="glyphicon glyphicon-upload"></span> {{\'Upload.Send\' | translate}} </button> <button type="button" class="btn btn-warning btn-s" ng-click="uploader.cancelAll()" ng-if="!allUploadsComplete" ng-disabled="!uploader.isUploading"> <span class="glyphicon glyphicon-ban-circle"></span> {{\'Upload.CancelarTodos\' | translate}} </button> <button type="button" class="btn btn-danger btn-s" ng-click="uploader.clearQueue()" ng-if="!allUploadsComplete" ng-disabled="!uploader.queue.length"> <span class="glyphicon glyphicon-trash"></span> {{\'Upload.RemoverTodos\' | translate}} </button> </div> <script type="text/ng-template" id="sasTokenGenerateError.html"><div class="modal-header">\n            <button type="button" class="close" data-dismiss="modal" ng-click="closeModal()">&times;</button>\n        <h3 class="modal-title" id="modal-title"><span translate>Erro</span>!</h3>\n    </div>\n    <div class="modal-body" id="modal-body">\n        <p translate>Houve um erro com o upload. Tente novamente. Caso o problema persista, entre em contato.</p>\n    </div></script>')}]);