"use strict";(self.webpackChunkwood_products_shop=self.webpackChunkwood_products_shop||[]).push([[294],{9294:(n4,E,i)=>{i.r(E),i.d(E,{ProductsComponent:()=>M,routes:()=>e4});var D={};i.r(D),i.d(D,{loadFilteringDataEffect:()=>N});var x=i(1413),g=i(6977),c=i(177),h=i(1774),k=i(2722),p=i(52),_=i(4412),v=i(152),B=i(6354),y=i(7376),d=i(9795),P=i(370),l=i(5127);const F="Products filter";var s=i(9640);const C=(0,s.EQ)({source:F,events:{addDtoFilteringData:(0,s.xk)(),addFilteringDataForCategory:(0,s.xk)()}}),O=(0,s.EQ)({source:"Products filter api",events:{pageWithFilterDataOpened:(0,s.w5)()}}),$=(0,s.vy)({dtoFilteringData:{},filteringDataByCategory:{characteristics:[],ranges:[]},currentCategory:null},(0,s.on)(C.addFilteringDataForCategory,(e,{currentCategory:o})=>({...e,currentCategory:o})),(0,s.on)(C.addDtoFilteringData,(e,{dtoFilteringData:o})=>({...e,dtoFilteringData:o}))),R=(0,s.UX)(F),j=(0,s.Mz)(R,l.Ks,({currentCategory:e,dtoFilteringData:o},t)=>{let n=0,r=0;return t.forEach(a=>{a.category===e&&(n=Math.max(n,a.price),r=Math.max(r,a.rating))}),{characteristics:e&&o[e]?o[e]:[],ranges:[{title:"price",max:n},{title:"rating",max:r}]}});var u=i(3953),m=i(930),I=i(786),T=i(1626);let G=(()=>{class e{constructor(t){this.http=t}getDataForFilteringProducts(){return this.http.get("assets/products/for-filtering-products-data.json")}static#u=this.\u0275fac=function(n){return new(n||e)(u.KVO(T.Qq))};static#t=this.\u0275prov=u.jDH({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();const N=(0,m.EH)((e=(0,u.WQX)(m.En),o=(0,u.WQX)(G))=>e.pipe((0,m.gp)(O.pageWithFilterDataOpened),(0,I.p)(()=>o.getDataForFilteringProducts().pipe((0,B.T)(t=>C.addDtoFilteringData({dtoFilteringData:t}))))),{functional:!0});var L=i(9049),S=i(1293);const V=(e,o)=>({categories:e,filterData:o}),X=e=>[e];function w(e,o){if(1&e&&(u.j41(0,"button",9),u.EFF(1),u.nI1(2,"translate"),u.nI1(3,"ngrxPush"),u.k0s()),2&e){const t=o.$implicit;u.Y8G("routerLink",u.eq3(6,X,"/catalog/"+t)),u.R7$(),u.SpI(" ",u.bMT(3,4,u.bMT(2,2,t))," ")}}function U(e,o){if(1&e){const t=u.RV6();u.j41(0,"app-input-range",10),u.bIt("getCurrentRange",function(r){u.eBV(t);const a=u.XpG(2);return u.Njj(a.getRange(r))}),u.k0s()}if(2&e){const t=o.$implicit,n=u.XpG(2);u.Y8G("showNumberInput",!0)("title",t.title)("min",n.rangeMin)("max",t.max)}}function Q(e,o){if(1&e){const t=u.RV6();u.j41(0,"app-checkbox-list",11),u.bIt("getCurrentChosen",function(r){u.eBV(t);const a=u.XpG(2);return u.Njj(a.getChosen(r))}),u.k0s()}if(2&e){const t=o.$implicit;u.Y8G("choices",t.values)("title",t.name)}}function Y(e,o){if(1&e&&(u.qex(0),u.j41(1,"div",4),u.DNE(2,w,4,8,"button",5),u.k0s(),u.j41(3,"div",6),u.DNE(4,U,1,4,"app-input-range",7)(5,Q,1,2,"app-checkbox-list",8),u.k0s(),u.bVm()),2&e){const t=o.ngrxLet;u.R7$(2),u.Y8G("ngForOf",t.categories),u.R7$(2),u.Y8G("ngForOf",null==t.filterData?null:t.filterData.ranges),u.R7$(),u.Y8G("ngForOf",null==t.filterData?null:t.filterData.characteristics)}}let z=(()=>{class e{constructor(t,n){this.store=t,this.activatedRoute=n,this.outputFilterDataAfter=600,this.destroy$=new x.B,this._getFilterData$=new _.t({category:"",ranges:[],choices:[]}),this.inputRanges=null,this.checkboxLists=null,this.filteringData={category:"",ranges:[],choices:[]},this.rangesAmount=0,this.characteristicsAmount=0,this.getFilterData$=this._getFilterData$.asObservable().pipe((0,v.B)(this.outputFilterDataAfter),(0,B.T)(r=>(0,y.cloneDeep)(r)),(0,g.Q)(this.destroy$)),this.filterData$=this.store.select(j),this.categories$=this.store.select(l.Jk),this.rangeMin=0}ngOnInit(){this.store.dispatch(O.pageWithFilterDataOpened()),this.activatedRoute.paramMap.pipe((0,g.Q)(this.destroy$)).subscribe(t=>{const n=t.get("category");n&&(this.resetFilteringData(),this.filteringData.category=n,this.store.dispatch(C.addFilteringDataForCategory({currentCategory:n})),this.emitFilterData())}),this.filterData$.pipe((0,g.Q)(this.destroy$)).subscribe(t=>{this.rangesAmount=t.ranges.length,this.characteristicsAmount=t.characteristics.length})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}reset(){this.inputRanges?.forEach(t=>t.resetCurrentNumber()),this.checkboxLists?.forEach(t=>t.reset())}getChosen(t){this.filteringData.choices.length<this.characteristicsAmount?this.filteringData.choices.push(t):(this.filteringData.choices.forEach(n=>{n.title===t.title&&(n.choices=t.choices)}),this.emitFilterData())}getRange(t){this.filteringData.ranges.length<this.rangesAmount?this.filteringData.ranges.push(t):(this.filteringData.ranges.forEach(n=>{n.title===t.title&&(n.from=t.from,n.to=t.to)}),this.emitFilterData())}emitFilterData(){this._getFilterData$.next(this.filteringData)}resetFilteringData(){this.filteringData.category="",this.filteringData.ranges=[],this.filteringData.choices=[]}static#u=this.\u0275fac=function(n){return new(n||e)(u.rXU(s.il),u.rXU(p.nX))};static#t=this.\u0275cmp=u.VBU({type:e,selectors:[["app-products-filter"]],viewQuery:function(n,r){if(1&n&&(u.GBs(d.Po,5),u.GBs(d.Vn,5)),2&n){let a;u.mGM(a=u.lsd())&&(r.inputRanges=a),u.mGM(a=u.lsd())&&(r.checkboxLists=a)}},inputs:{outputFilterDataAfter:"outputFilterDataAfter"},outputs:{getFilterData$:"getFilterData$"},standalone:!0,features:[u.aNF],decls:6,vars:4,consts:[[4,"ngrxLet"],["data-jest","reset-filters-button",1,"body-L-bold","tide-font","reset-wrapper",3,"click"],[1,"empty"],[1,"reset"],[1,"categories"],["class","category button-font","routerLinkActive","selected-category",3,"routerLink",4,"ngFor","ngForOf"],[1,"characteristics"],[3,"showNumberInput","title","min","max","getCurrentRange",4,"ngFor","ngForOf"],[3,"choices","title","getCurrentChosen",4,"ngFor","ngForOf"],["routerLinkActive","selected-category",1,"category","button-font",3,"routerLink"],[3,"getCurrentRange","showNumberInput","title","min","max"],[3,"getCurrentChosen","choices","title"]],template:function(n,r){1&n&&(u.DNE(0,Y,6,3,"ng-container",0),u.j41(1,"button",1),u.bIt("click",function(){return r.reset()}),u.j41(2,"span"),u.EFF(3,"\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0444\u0438\u043b\u044c\u0442\u0440\u044b"),u.k0s(),u.nrm(4,"span",2)(5,"span",3),u.k0s()),2&n&&u.Y8G("ngrxLet",u.l_i(1,V,r.categories$,r.filterData$))},dependencies:[d.tm,c.MD,c.Sq,d._5,L.P,S.V,p.iI,p.Wk,p.wQ,P.D,h.Nj,h.L9],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column}.categories[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px}.categories[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]{display:flex;transition:color .25s,opacity .25s}.categories[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]:not(.selected-category):hover{color:#b14101;opacity:.9;transition:color .25s,opacity .25s}.categories[_ngcontent-%COMP%]   .selected-category[_ngcontent-%COMP%]{color:#b14101}.characteristics[_ngcontent-%COMP%]{display:flex;gap:50px;flex-direction:column;width:250px;margin:60px 0 52px}.characteristics[_ngcontent-%COMP%]   .checkbox-list[_ngcontent-%COMP%]{width:250px}.reset-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center}.reset-wrapper[_ngcontent-%COMP%]   .reset[_ngcontent-%COMP%]{width:22px;height:22px;background-image:url(reset.a68ce5929264f38b.svg);background-position:center;background-repeat:no-repeat}"],changeDetection:0})}return e})();var W=i(8460);function H(e,o){if(1&e){const t=u.RV6();u.j41(0,"button",1),u.bIt("click",function(){const r=u.eBV(t).index,a=u.XpG();return u.Njj(a.selectChunk(r))}),u.EFF(1),u.k0s()}if(2&e){const t=o.index,n=u.XpG();u.HbH(n.selectedChunkNumber===t?"selected-chunk white-font":""),u.R7$(),u.SpI(" ",t+1,"\n")}}let J=(()=>{class e{constructor(){this.chunkSize=null,this.paginationItems=null,this.getCurrentChunk=new u.bkB,this.selectedChunkNumber=0,this.chunks=null}ngOnChanges({paginationItems:t}){t&&this.chunkSize&&(this.chunks=(0,y.chunk)(this.paginationItems,this.chunkSize),this.selectChunk(0))}selectChunk(t){this.selectedChunkNumber=t,this.getCurrentChunk.emit(this.chunks?.[t])}static#u=this.\u0275fac=function(n){return new(n||e)};static#t=this.\u0275cmp=u.VBU({type:e,selectors:[["app-pagination"]],inputs:{chunkSize:"chunkSize",paginationItems:"paginationItems"},outputs:{getCurrentChunk:"getCurrentChunk"},standalone:!0,features:[u.OA$,u.aNF],decls:1,vars:1,consts:[["class","body-M chunk",3,"class","click",4,"ngFor","ngForOf"],[1,"body-M","chunk",3,"click"]],template:function(n,r){1&n&&u.DNE(0,H,2,3,"button",0),2&n&&u.Y8G("ngForOf",r.chunks)},dependencies:[c.MD,c.Sq],styles:["[_nghost-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;gap:20px}.chunk[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:40px;height:40px;border:1px solid #dadada}.selected-chunk[_ngcontent-%COMP%]{background-color:#3b3937;border:none}"],changeDetection:0})}return e})();var K=i(7400);const Z=(e,o)=>({products:e,chunk:o});function q(e,o){if(1&e&&u.nrm(0,"app-product-card",14),2&e){const t=o.$implicit,n=u.XpG(2);u.Y8G("name",t.name)("price",t.price)("imgs",t.photos)("category",n.category)}}function u4(e,o){if(1&e){const t=u.RV6();u.qex(0),u.j41(1,"div",11),u.DNE(2,q,1,4,"app-product-card",12),u.k0s(),u.j41(3,"app-pagination",13),u.bIt("getCurrentChunk",function(r){u.eBV(t);const a=u.XpG();return u.Njj(a.getProductsChunk(r))}),u.k0s(),u.bVm()}if(2&e){const t=o.ngrxLet;u.R7$(2),u.Y8G("ngForOf",t.chunk),u.R7$(),u.Y8G("paginationItems",t.products)("chunkSize",9)}}let M=(()=>{class e{constructor(t,n,r){this.activatedRoute=t,this.cdr=n,this.store=r,this.destroy$=new x.B,this.filteredProducts$=this.store.select(l.w4),this.productsChunk$=this.store.select(l.RR),this.category="",this.activatedRoute.paramMap.pipe((0,g.Q)(this.destroy$)).subscribe(a=>{const f=a.get("category");f&&(this.category=f)})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}onGetFilterData(t){this.store.dispatch(l.Ce.filterByOutputFilterData(t))}getProductsChunk(t){this.store.dispatch(l.Ce.setCurrentChunk({currentChunk:t})),this.cdr.detectChanges()}static#u=this.\u0275fac=function(n){return new(n||e)(u.rXU(p.nX),u.rXU(u.gRc),u.rXU(s.il))};static#t=this.\u0275cmp=u.VBU({type:e,selectors:[["app-products"]],standalone:!0,features:[u.aNF],decls:17,vars:9,consts:[[1,"h1","text-h1"],[1,"main-container"],[1,"filter"],[3,"getFilterData$"],[1,"wrapper-product-card-container"],[4,"ngrxLet"],[1,"rectangle"],[1,"text"],[1,"h3"],[1,"body-M"],[1,"contact-us-card"],[1,"product-card-container"],["class","thin",3,"name","price","imgs","category",4,"ngFor","ngForOf"],[1,"pagination",3,"getCurrentChunk","paginationItems","chunkSize"],[1,"thin",3,"name","price","imgs","category"]],template:function(n,r){1&n&&(u.nrm(0,"app-url-segments-visualizer"),u.j41(1,"h1",0),u.EFF(2),u.nI1(3,"translate"),u.nI1(4,"ngrxPush"),u.k0s(),u.j41(5,"main",1)(6,"aside",2)(7,"app-products-filter",3),u.bIt("getFilterData$",function(f){return r.onGetFilterData(f)}),u.k0s()(),u.j41(8,"div",4),u.DNE(9,u4,4,3,"ng-container",5),u.nrm(10,"hr",6),u.j41(11,"section",7)(12,"h3",8),u.EFF(13,"\u0414\u0432\u0435\u0440\u0438 \u043d\u0430 \u0437\u0430\u043a\u0430\u0437"),u.k0s(),u.j41(14,"p",9),u.EFF(15," \u0414\u0432\u0435\u0440\u0438, \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u044f\u044e\u0449\u0438\u0435 \u0438\u0437 \u0441\u0435\u0431\u044f \u0432\u0435\u0440\u0442\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u043f\u0440\u044f\u043c\u043e\u0443\u0433\u043e\u043b\u044c\u043d\u0438\u043a, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0441\u0442\u043e\u044f\u0442 \u0432 \u0431\u043e\u043b\u044c\u0448\u0438\u043d\u0441\u0442\u0432\u0435 \u043f\u043e\u0441\u0442\u0440\u043e\u0435\u043d\u043d\u044b\u0445 \u043a\u0432\u0430\u0440\u0442\u0438\u0440, \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u044f\u044e\u0442 \u0441\u043e\u0431\u043e\u0439 \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u044b\u0439 \u043e\u0431\u0440\u0430\u0437\u0435\u0446. \u041b\u044e\u0431\u044b\u0435 \u0434\u0440\u0443\u0433\u0438\u0435, \u043e\u0442\u043b\u0438\u0447\u0430\u044e\u0449\u0438\u0435\u0441\u044f \u043f\u043e \u0444\u043e\u0440\u043c\u0435 \u0438 \u0440\u0430\u0437\u043c\u0435\u0440\u0430\u043c, \u0441\u0447\u0438\u0442\u0430\u044e\u0442\u0441\u044f \u043d\u0435\u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u044b\u043c\u0438 \u0438 \u0438\u0437\u0433\u043e\u0442\u0430\u0432\u043b\u0438\u0432\u0430\u044e\u0442\u0441\u044f \u043f\u043e \u0437\u0430\u043a\u0430\u0437\u0443. \u041d\u0430\u0448\u0430 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f \u043f\u0440\u0435\u0434\u043b\u0430\u0433\u0430\u0435\u0442 \u0443\u0441\u043b\u0443\u0433\u0443 \u0438\u0437\u0433\u043e\u0442\u043e\u0432\u043b\u0435\u043d\u0438\u044f \u043c\u0435\u0436\u043a\u043e\u043c\u043d\u0430\u0442\u043d\u044b\u0445 \u0434\u0432\u0435\u0440\u0435\u0439 \u043d\u0430 \u0437\u0430\u043a\u0430\u0437 \u0441 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u043e\u0439 \u0432 \u041c\u043e\u0441\u043a\u0432\u0435 \u0438 \u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u043e\u0439 \u043e\u0431\u043b\u0430\u0441\u0442\u0438. \u0414\u043b\u044f \u0442\u043e\u0433\u043e \u0447\u0442\u043e\u0431\u044b \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f \u0441 \u0437\u0430\u043a\u0430\u0437\u043e\u043c, \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0447\u0451\u0442\u043a\u043e \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u044f\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u0438 \u0438\u0437\u0433\u043e\u0442\u043e\u0432\u043b\u0435\u043d\u0438\u044f \u0434\u0432\u0435\u0440\u0435\u0439. \u0418\u0437\u0433\u043e\u0442\u0430\u0432\u043b\u0438\u0432\u0430\u044e\u0442\u0441\u044f \u043e\u043d\u0438 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u043c \u043e\u0431\u0440\u0430\u0437\u043e\u043c: \u0441\u043e\u0437\u0434\u0430\u0451\u0442\u0441\u044f \u043a\u0430\u0440\u043a\u0430\u0441 \u0438\u0437 \u043d\u0435\u0434\u043e\u0440\u043e\u0433\u043e\u0439 \u0434\u0440\u0435\u0432\u0435\u0441\u0438\u043d\u044b, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0437\u0430\u0442\u0435\u043c \u043e\u0431\u0448\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u043f\u0430\u043d\u0435\u043b\u044f\u043c\u0438 \u041c\u0414\u0424. \u041f\u0430\u043d\u0435\u043b\u0438 \u043b\u0430\u043c\u0438\u043d\u0438\u0440\u0443\u044e\u0442\u0441\u044f \u043f\u043b\u0451\u043d\u043a\u043e\u0439 \u043b\u044e\u0431\u044b\u0445 \u043e\u0442\u0442\u0435\u043d\u043a\u043e\u0432. \u0428\u043f\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u0432\u0430\u0440\u0438\u0430\u043d\u0442\u044b \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u044f\u044e\u0442 \u0441\u043e\u0431\u043e\u0439 \u0446\u0435\u043b\u043e\u0441\u0442\u043d\u044b\u0439 \u043d\u0430\u0442\u0443\u0440\u0430\u043b\u044c\u043d\u044b\u0439 \u043c\u0430\u0441\u0441\u0438\u0432 \u0438\u0437 \u0434\u0435\u0440\u0435\u0432\u0430, \u043f\u043e\u043a\u0440\u044b\u0442\u044b\u0439 \u0448\u043f\u043e\u043d\u043e\u043c \u0438\u0437 \u041c\u0414\u0424. \u041a\u043b\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u043c\u0430\u0441\u0441\u0438\u0432\u043d\u044b\u0435 \u0438 \u0433\u043b\u0443\u0445\u0438\u0435 \u043c\u043e\u0434\u0435\u043b\u0438, \u0438 \u043b\u0451\u0433\u043a\u0438\u0435 \u043c\u043e\u0434\u0435\u043b\u0438 \u0441\u043e \u0441\u0442\u0435\u043a\u043b\u043e\u043c, \u043c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u0438\u0437\u0433\u043e\u0442\u043e\u0432\u043b\u0435\u043d\u044b \u0438\u0437 \u043d\u0430\u0442\u0443\u0440\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0434\u0435\u0440\u0435\u0432\u0430. \u0415\u0441\u043b\u0438 \u0412\u0430\u043c \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u0430 \u043c\u043e\u0434\u0435\u043b\u044c \u0441 \u044d\u043a\u0441\u043a\u043b\u044e\u0437\u0438\u0432\u043d\u044b\u043c \u0434\u0438\u0437\u0430\u0439\u043d\u043e\u043c, \u043c\u043e\u0436\u043d\u043e \u0441\u0434\u0435\u043b\u0430\u0442\u044c \u0435\u0451 \u043f\u043e \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u043c\u0443 \u043f\u0440\u043e\u0435\u043a\u0442\u0443. \u041d\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043c\u043e \u0442\u043e\u0442 \u0442\u043e\u0433\u043e, \u0432 \u043a\u0430\u043a\u043e\u0439 \u0446\u0435\u043d\u043e\u0432\u043e\u0439 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438 \u0431\u0443\u0434\u0443\u0442 \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u044c\u0441\u044f \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u044b\u0435 \u0432\u0430\u043c\u0438 \u0438\u0437\u0434\u0435\u043b\u0438\u044f, \u0432\u0441\u0435 \u043e\u043d\u0438 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u044b \u0438\u0437 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0433\u043e \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u0430, \u043d\u0430\u0434\u0451\u0436\u043d\u044b \u0438 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u044b. "),u.k0s()()()(),u.nrm(16,"app-contact-us-card",10)),2&n&&(u.R7$(2),u.JRh(u.bMT(4,4,u.bMT(3,2,r.category))),u.R7$(7),u.Y8G("ngrxLet",u.l_i(6,Z,r.filteredProducts$,r.productsChunk$)))},dependencies:[k.B,c.MD,c.Sq,z,W.V,J,K.YL,P.D,h.Nj,h.L9],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;padding:50px 160px 90px;width:100vw}.text-h1[_ngcontent-%COMP%]{margin:17px 0 40px}.main-container[_ngcontent-%COMP%]{display:flex;justify-content:flex-start;gap:80px;width:100%;margin-bottom:120px}.main-container[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%]{display:block;margin-top:18px}.main-container[_ngcontent-%COMP%]   .wrapper-product-card-container[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;align-items:center;margin:0 auto;justify-content:center}.main-container[_ngcontent-%COMP%]   .wrapper-product-card-container[_ngcontent-%COMP%]   .product-card-container[_ngcontent-%COMP%]{display:flex;justify-content:center;flex-wrap:wrap;gap:40px;height:100%;width:100%}.main-container[_ngcontent-%COMP%]   .wrapper-product-card-container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]{margin:50px 0 70px}.main-container[_ngcontent-%COMP%]   .wrapper-product-card-container[_ngcontent-%COMP%]   .rectangle[_ngcontent-%COMP%]{background-color:#dadada;width:100%;height:1px;margin-bottom:70px}.main-container[_ngcontent-%COMP%]   .wrapper-product-card-container[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{width:950px}.main-container[_ngcontent-%COMP%]   .wrapper-product-card-container[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-bottom:17px}.contact-us-card[_ngcontent-%COMP%]{align-self:center;margin:0 auto;width:1280px}"],changeDetection:0})}return e})();var t4=i(2998);const e4=[{path:":product",loadChildren:()=>i.e(511).then(i.bind(i,3511)).then(e=>e.routes)},{path:"",component:M,providers:[(0,s.vQ)({name:F,reducer:$}),(0,m.SI)([D])],pathMatch:"full",canActivate:[t4.categoryGuard]}]}}]);