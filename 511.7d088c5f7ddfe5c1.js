"use strict";(self.webpackChunkwood_products_shop=self.webpackChunkwood_products_shop||[]).push([[511],{3511:(B,m,i)=>{i.r(m),i.d(m,{ProductComponent:()=>h,productGuard:()=>_,routes:()=>R});var p=i(52),l=i(177),a=i(4341),C=i(1774),x=i(2722),b=i(7376),t=i(3953);function P(e,u){if(1&e){const n=t.RV6();t.j41(0,"div",7),t.bIt("click",function(){const o=t.eBV(n).index,c=t.XpG();return t.Njj(c.setCurrentImg(o))}),t.nrm(1,"img",8),t.k0s()}if(2&e){const n=u.$implicit,r=u.index,o=t.XpG();t.HbH(o.currentImgNumber===r?"current-img":""),t.R7$(),t.Y8G("src",n,t.B4B)("alt",o.alt)}}let O=(()=>{class e{constructor(){this.alt="image",this.chunkSize=5,this.chunks=null,this.currentChunkNumber=0,this.currentImgNumber=0}ngOnInit(){this.chunks=(0,b.chunk)(this.images,this.chunkSize)}setCurrentImg(n){this.currentImgNumber=n}seeNextImg(){return this.currentChunkNumber===Number(this.chunks?.length)-1&&this.currentImgNumber===Number(this.chunks?.[this.currentChunkNumber]?.length)-1?(this.currentChunkNumber=0,void(this.currentImgNumber=0)):this.currentImgNumber===this.chunkSize-1?(this.currentChunkNumber+=1,void(this.currentImgNumber=0)):void(this.currentImgNumber+=1)}seePreviosImg(){return 0===this.currentImgNumber&&0===this.currentChunkNumber?(this.currentChunkNumber=Number(this.chunks?.length)-1,void(this.currentImgNumber=Number(this.chunks?.[this.currentChunkNumber]?.length)-1)):0===this.currentImgNumber?(this.currentImgNumber=this.chunkSize-1,void(this.currentChunkNumber-=1)):void(this.currentImgNumber-=1)}static#t=this.\u0275fac=function(r){return new(r||e)};static#n=this.\u0275cmp=t.VBU({type:e,selectors:[["app-image-gallery"]],inputs:{images:"images",alt:"alt",chunkSize:"chunkSize"},standalone:!0,features:[t.aNF],decls:8,vars:3,consts:[[1,"main-img-container"],[1,"main-img",3,"src","alt"],[1,"all-imgs"],["class","img-container",3,"class","click",4,"ngFor","ngForOf"],[1,"left-button",3,"click"],[1,"mask"],[1,"right-button",3,"click"],[1,"img-container",3,"click"],["loading","lazy",3,"src","alt"]],template:function(r,o){1&r&&(t.j41(0,"div",0),t.nrm(1,"img",1),t.k0s(),t.j41(2,"div",2),t.DNE(3,P,2,4,"div",3),t.j41(4,"button",4),t.bIt("click",function(){return o.seePreviosImg()}),t.nrm(5,"div",5),t.k0s(),t.j41(6,"button",6),t.bIt("click",function(){return o.seeNextImg()}),t.nrm(7,"div",5),t.k0s()()),2&r&&(t.R7$(),t.Y8G("src",null==o.chunks||null==o.chunks[o.currentChunkNumber]?null:o.chunks[o.currentChunkNumber][o.currentImgNumber],t.B4B)("alt",o.alt),t.R7$(2),t.Y8G("ngForOf",null==o.chunks?null:o.chunks[o.currentChunkNumber]))},dependencies:[l.MD,l.Sq],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;gap:15px;width:510px;height:100%;margin:0 14px}.main-img-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;border:1px solid #dadada;width:100%;height:540px}.main-img-container[_ngcontent-%COMP%]   .main-img[_ngcontent-%COMP%]{max-width:100%;max-height:100%;object-fit:contain}.all-imgs[_ngcontent-%COMP%]{position:relative;display:flex;gap:15px;width:100%;height:110px}.all-imgs[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;border:1px solid #dadada;transition:border-color .25s;width:90px;height:100%}.all-imgs[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;max-height:100%;object-fit:contain}.all-imgs[_ngcontent-%COMP%]   .current-img[_ngcontent-%COMP%]{border:2px solid #3b3937;transition:border-color .25s}.all-imgs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{position:absolute;display:flex;justify-content:center;align-items:center;top:43px;width:24px;height:24px;border:1.5px solid #dadada;border-radius:50%;z-index:10;background-color:#fff}.all-imgs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   .mask[_ngcontent-%COMP%]{position:relative;top:1px;width:10px;height:6px;-webkit-mask-size:100%;mask-size:100%;-webkit-mask-repeat:no-repeat;-webkit-mask-image:url(tick-for-list.5d1c37ab0dc29d9f.svg);mask-image:url(tick-for-list.5d1c37ab0dc29d9f.svg);mask-repeat:no-repeat;background-color:#3b3937}.all-imgs[_ngcontent-%COMP%]   .left-button[_ngcontent-%COMP%]{transform:rotate(90deg);left:-14px}.all-imgs[_ngcontent-%COMP%]   .right-button[_ngcontent-%COMP%]{transform:rotate(-90deg);right:-14px}"],changeDetection:0})}return e})();var s=i(9795),g=i(7400);function M(e,u){if(1&e&&(t.j41(0,"div",2)(1,"p"),t.EFF(2),t.nI1(3,"uppercase"),t.k0s(),t.j41(4,"p"),t.EFF(5),t.k0s()()),2&e){const n=u.$implicit;t.R7$(2),t.SpI(" ",t.bMT(3,2,n.description)," "),t.R7$(3),t.SpI(" ",n.value," ")}}let y=(()=>{class e{constructor(){this.title=null}static#t=this.\u0275fac=function(r){return new(r||e)};static#n=this.\u0275cmp=t.VBU({type:e,selectors:[["app-characteristics"]],inputs:{title:"title",characteristics:"characteristics"},standalone:!0,features:[t.aNF],decls:4,vars:2,consts:[[1,"h4","title"],["class","characteristic body-L",4,"ngFor","ngForOf"],[1,"characteristic","body-L"]],template:function(r,o){1&r&&(t.j41(0,"fieldset")(1,"legend",0),t.EFF(2),t.k0s(),t.DNE(3,M,6,4,"div",1),t.k0s()),2&r&&(t.R7$(2),t.JRh(o.title),t.R7$(),t.Y8G("ngForOf",o.characteristics))},dependencies:[l.MD,l.Sq,l.Pc],styles:["[_nghost-%COMP%]{display:flex}.title[_ngcontent-%COMP%]{margin-bottom:15px}.characteristic[_ngcontent-%COMP%]{display:flex;gap:20px;padding:15px 0;border-bottom:1px solid #dadada}.characteristic[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{width:100%}.body-L[_ngcontent-%COMP%]{line-height:120%}"],changeDetection:0})}return e})();var f=i(5127),k=i(1413),d=i(9640),F=i(569);function v(e,u){1&e&&(t.j41(0,"span"),t.EFF(1,"*"),t.k0s())}function w(e,u){if(1&e&&(t.j41(0,"small",38),t.EFF(1),t.DNE(2,v,2,0,"span",39),t.k0s()),2&e){const n=t.XpG().$implicit;t.R7$(),t.SpI("",n.needData," "),t.R7$(),t.Y8G("ngIf",null==n.formControl?null:n.formControl.hasError("required"))}}function G(e,u){1&e&&t.nrm(0,"app-alert-triangle-icon",40)}function I(e,u){if(1&e&&(t.j41(0,"div",34),t.DNE(1,w,3,2,"small",35),t.nrm(2,"input",36),t.DNE(3,G,1,0,"app-alert-triangle-icon",37),t.k0s()),2&e){const n=u.$implicit;t.HbH(null!=n.formControl&&n.formControl.invalid&&null!=n.formControl&&n.formControl.touched?"form-input-wrapper-invalid":""),t.R7$(),t.Y8G("ngIf",(null==n.formControl?null:n.formControl.dirty)||(null==n.formControl?null:n.formControl.touched)),t.R7$(),t.Y8G("name",n.name)("formControlName",n.name)("placeholder",null!=n.formControl&&n.formControl.invalid&&null!=n.formControl&&n.formControl.untouched?n.needData:"\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0444\u043e\u0440\u043c\u0443"),t.R7$(),t.Y8G("ngIf",(null==n.formControl?null:n.formControl.invalid)&&(null==n.formControl?null:n.formControl.touched))}}function N(e,u){if(1&e){const n=t.RV6();t.j41(0,"div",23)(1,"h2",24),t.EFF(2,"\u0417\u0430\u043a\u0430\u0437 \u0442\u043e\u0432\u0430\u0440\u0430"),t.k0s(),t.j41(3,"div",25)(4,"div",26),t.nrm(5,"img",27),t.k0s(),t.j41(6,"div",28)(7,"span"),t.EFF(8),t.k0s(),t.j41(9,"span"),t.EFF(10),t.k0s(),t.j41(11,"span"),t.EFF(12),t.nI1(13,"currency"),t.k0s()()(),t.j41(14,"form",29),t.bIt("ngSubmit",function(){t.eBV(n);const o=t.XpG(2);return o.onSubmit(o.formGroup),t.Njj(o.isOrderFormPopup=!1)}),t.j41(15,"h6",30),t.EFF(16," \u041e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0441\u0432\u043e\u0439 \u043d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430! \u041c\u044b \u0441\u0432\u044f\u0436\u0435\u043c\u0441\u044f \u0441 \u0412\u0430\u043c\u0438 \u043f\u043e \u043f\u043e\u0432\u043e\u0434\u0443 \u0442\u043e\u0432\u0430\u0440\u0430 \u0432 \u0442\u0435\u0447\u0435\u043d\u0438\u0435 15 \u043c\u0438\u043d\u0443\u0442. "),t.k0s(),t.j41(17,"div",31),t.DNE(18,I,4,7,"div",32),t.k0s(),t.j41(19,"app-button",33),t.EFF(20,"\u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c \u0442\u043e\u0432\u0430\u0440"),t.k0s()()()}if(2&e){const n=t.XpG().ngrxLet,r=t.XpG();t.R7$(5),t.Y8G("src",null==n||null==n.photos?null:n.photos[0],t.B4B)("alt",null==n?null:n.name),t.R7$(3),t.JRh(null==n?null:n.name),t.R7$(2),t.SpI("x",r.productsCount,""),t.R7$(2),t.SpI(" ",t.ii3(13,10,null!=n&&n.price?n.price*r.productsCount:void 0,"RUB","symbol-narrow","1.0-0"),""),t.R7$(2),t.Y8G("formGroup",r.formGroup),t.R7$(4),t.Y8G("ngForOf",r.dataForms),t.R7$(),t.Y8G("size","XXL")("haveBackground",!0)("isDisabled",r.formGroup.invalid)}}function j(e,u){1&e&&(t.j41(0,"div",41),t.nrm(1,"img",42),t.j41(2,"div",43)(3,"h2",24),t.EFF(4,"\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u0437\u0430\u044f\u0432\u043a\u0443!"),t.k0s(),t.j41(5,"h6",44),t.EFF(6," \u041d\u0430\u0448\u0438 \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0441\u0442\u044b \u0441\u0432\u044f\u0436\u0443\u0442\u0441\u044f \u0441 \u0412\u0430\u043c\u0438 \u0432 \u0442\u0435\u0447\u0435\u043d\u0438\u0438 30 \u043c\u0438\u043d\u0443\u0442. "),t.k0s(),t.j41(7,"app-button",45),t.EFF(8,"\u043d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e"),t.k0s()()()),2&e&&(t.R7$(7),t.Y8G("haveBackground",!0)("size","M"))}function E(e,u){if(1&e){const n=t.RV6();t.qex(0),t.j41(1,"main",4)(2,"div"),t.nrm(3,"app-url-segments-visualizer",5)(4,"app-image-gallery",6),t.k0s(),t.j41(5,"div",7)(6,"p",8),t.EFF(7," \u0410\u0440\u0442\u0438\u043a\u0443\u043b"),t.j41(8,"span"),t.EFF(9),t.k0s()(),t.j41(10,"h3",9),t.EFF(11),t.k0s(),t.j41(12,"div",10)(13,"h1",11),t.EFF(14),t.nI1(15,"currency"),t.k0s(),t.j41(16,"div",12)(17,"app-counter",13),t.bIt("getNumber",function(o){t.eBV(n);const c=t.XpG();return t.Njj(c.setProductNumber(o))}),t.k0s(),t.j41(18,"app-button",14),t.bIt("click",function(){t.eBV(n);const o=t.sdS(30);return t.Njj(o.hide(!1))}),t.EFF(19,"\u043a\u0443\u043f\u0438\u0442\u044c"),t.k0s()()(),t.nrm(20,"hr",15),t.j41(21,"section",16)(22,"h4",17),t.EFF(23,"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"),t.k0s(),t.j41(24,"p",18),t.EFF(25),t.k0s()(),t.nrm(26,"hr",19)(27,"app-characteristics",20),t.k0s()(),t.nrm(28,"app-contact-us-card"),t.j41(29,"app-dialog",21,0),t.bIt("getHiddenState",function(o){t.eBV(n);const c=t.XpG();return t.Njj(c.getPopupHiddenState(o))}),t.eu8(31,22),t.k0s(),t.DNE(32,N,21,15,"ng-template",null,1,t.C5r)(34,j,9,2,"ng-template",null,2,t.C5r),t.bVm()}if(2&e){const n=u.ngrxLet,r=t.sdS(33),o=t.sdS(35),c=t.XpG();t.R7$(4),t.Y8G("images",null==n?null:n.photos)("alt",null==n?null:n.name),t.R7$(5),t.JRh(null==n?null:n.vendor_code),t.R7$(2),t.JRh(null==n?null:n.name),t.R7$(3),t.SpI(" ",t.ii3(15,14,null!=n&&n.price?n.price*c.productsCount:void 0,"RUB","symbol-narrow","1.0-0")," "),t.R7$(3),t.Y8G("min",1)("max",9999),t.R7$(),t.Y8G("haveBackground",!0)("size","M"),t.R7$(7),t.SpI(" ",null==n?null:n.description," "),t.R7$(2),t.Y8G("title","\u0425\u0430\u0440\u0430\u043a\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043a\u0438")("characteristics",null==n?null:n.characteristics),t.R7$(2),t.Y8G("hidden",!0),t.R7$(2),t.Y8G("ngTemplateOutlet",c.isOrderFormPopup?r:o)}}let h=(()=>{class e extends g.YL{constructor(n,r){super(n),this.fb=n,this.store=r,this.destroy$=new k.B,this.product$=this.store.select(f.jN),this.productsCount=1,this.isOrderFormPopup=!0}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}setProductNumber(n){this.productsCount=n}getPopupHiddenState(n){this.isOrderFormPopup=!(!this.isOrderFormPopup&&n)}static#t=this.\u0275fac=function(r){return new(r||e)(t.rXU(a.ok),t.rXU(d.il))};static#n=this.\u0275cmp=t.VBU({type:e,selectors:[["app-product"]],standalone:!0,features:[t.Vt3,t.aNF],decls:1,vars:1,consts:[["dialog",""],["orderFormPopup",""],["afterOrderProductPopup",""],[4,"ngrxLet"],[1,"main-container"],[1,"url-segments-visualizer"],[3,"images","alt"],[1,"info-container"],[1,"body-XS","tide-font","vendor-code"],[1,"h3"],[1,"price-control"],[1,"price","h1"],[1,"controls"],[3,"getNumber","min","max"],[3,"click","haveBackground","size"],[1,"hr-1"],[1,"descrition-container"],[1,"h4"],[1,"body-M"],[1,"hr-2"],[3,"title","characteristics"],[3,"getHiddenState","hidden"],[3,"ngTemplateOutlet"],[1,"product-order-popup"],[1,"h2"],[1,"product-info","body-M-bold"],[1,"img-wrapper"],[3,"src","alt"],[1,"product-text-info-wrapper"],[1,"form",3,"ngSubmit","formGroup"],[1,"h6"],[1,"form-inputs-wrapper"],["class","form-input-wrapper",3,"class",4,"ngFor","ngForOf"],["role","button","type","submit",3,"size","haveBackground","isDisabled"],[1,"form-input-wrapper"],["class","body-S small",4,"ngIf"],["type","text","autocomplete","off",1,"form-input","body-L",3,"name","formControlName","placeholder"],["class","tooltip",4,"ngIf"],[1,"body-S","small"],[4,"ngIf"],[1,"tooltip"],[1,"after-order-product-popup"],["src","assets/img/for-popup-after-order-product.png","alt","for-popup-after-order-product"],[1,"text-container"],[1,"h6","content"],["routerLink","/",3,"haveBackground","size"]],template:function(r,o){1&r&&t.DNE(0,E,36,19,"ng-container",3),2&r&&t.Y8G("ngrxLet",o.product$)},dependencies:[l.MD,l.Sq,l.bT,l.T3,l.oe,x.B,O,s.tm,F.Q,s.s0,g.YL,y,s.mq,a.X1,a.qT,a.me,a.BC,a.cb,a.j4,a.JD,s.T2,p.iI,p.Wk,C.Nj],styles:['.form-input-wrapper[_ngcontent-%COMP%]{position:relative;flex-grow:1;display:flex;flex-direction:column;justify-content:center;height:60px;background-color:#fff;padding-left:23px}.form-input-wrapper-invalid[_ngcontent-%COMP%]{border:1px solid #b14101}.form-input-wrapper-invalid[_ngcontent-%COMP%]   .small[_ngcontent-%COMP%]{color:#b14101;background-color:#fff}.form-input-wrapper-invalid[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]::placeholder{color:#b14101;font-size:15px;font-weight:700;line-height:140%}.form-input[_ngcontent-%COMP%]{border:none;width:calc(100% - 60px)}.form-input[_ngcontent-%COMP%]::placeholder{color:#b1b0af;font-size:18px;font-weight:500;line-height:100%;letter-spacing:.2px}.tooltip[_ngcontent-%COMP%]{position:absolute;top:calc(50% - 10px);right:20px}.button[_ngcontent-%COMP%]{display:block;margin-top:20px}@font-face{font-family:Permian-Serif;src:url(PermianSerifTypeface-Bold.1fdd7e1458b6ee1c.woff2) format("woff2"),url(PermianSerifTypeface-Bold.e2d8c3afb9f57841.woff) format("woff");font-weight:700;font-style:normal}@font-face{font-family:Gilroy;src:url(Gilroy-Regular.bf665241b4173fab.woff2) format("woff2"),url(Gilroy-Regular.3fe0f5ed7f356b57.woff) format("woff"),url(Gilroy-Regular.1d2eb293e525c352.ttf) format("ttf");font-weight:400;font-style:normal}@font-face{font-family:Gilroy;src:url(Gilroy-Medium.325b7de6f5e44b46.woff2) format("woff2"),url(Gilroy-Medium.f2851256231ce183.woff) format("woff"),url(Gilroy-Medium.6e3bb5ed373e306d.ttf) format("ttf");font-weight:500;font-style:normal}@font-face{font-family:Gilroy;src:url(Gilroy-Bold.da918b9437bbe4e3.woff2) format("woff2"),url(Gilroy-Bold.72ac7da49b1697ed.woff) format("woff"),url(Gilroy-Bold.4a9ebf9ff0d4e103.ttf) format("ttf");font-weight:700;font-style:normal}.h1[_ngcontent-%COMP%]{color:#3b3937;font-family:Permian-Serif;font-size:64px;font-weight:700;line-height:100%;letter-spacing:0px}.h2[_ngcontent-%COMP%]{color:#3b3937;font-family:Permian-Serif;font-size:50px;font-weight:700;line-height:100%;letter-spacing:0px}.h3[_ngcontent-%COMP%]{color:#3b3937;font-family:Permian-Serif;font-size:36px;font-weight:700;line-height:120%;letter-spacing:0px}.h4[_ngcontent-%COMP%]{color:#3b3937;font-family:Permian-Serif;font-size:25px;font-weight:700;line-height:100%;letter-spacing:0px}.h5[_ngcontent-%COMP%]{color:#3b3937;font-family:Permian-Serif;font-size:21px;font-weight:700;line-height:110%;letter-spacing:.2px}.h6[_ngcontent-%COMP%]{color:#3b3937;font-family:Gilroy;font-size:22px;font-weight:500;line-height:140%;letter-spacing:0px}.body-L[_ngcontent-%COMP%]{color:#3b3937;font-family:Gilroy;font-size:18px;font-weight:500;line-height:100%;letter-spacing:.2px}.body-L-bold[_ngcontent-%COMP%]{color:#3b3937;font-family:Gilroy;font-size:18px;font-weight:700;line-height:120%;letter-spacing:.2px}.body-M[_ngcontent-%COMP%]{color:#3b3937;font-family:Gilroy;font-size:16px;font-weight:400;line-height:130%;letter-spacing:0px}.body-M-bold[_ngcontent-%COMP%]{color:#3b3937;font-family:Gilroy;font-size:16px;font-weight:700;line-height:130%;letter-spacing:0px}.body-S[_ngcontent-%COMP%]{color:#3b3937;font-family:Gilroy;font-size:13px;font-weight:400;line-height:130%;letter-spacing:0px}.body-XS[_ngcontent-%COMP%]{color:#3b3937;font-family:Gilroy;font-size:12px;font-weight:400;line-height:140%;letter-spacing:0px}.body-XS-bold[_ngcontent-%COMP%]{color:#3b3937;font-family:Gilroy;font-size:12px;font-weight:700;line-height:140%;letter-spacing:0px}.button-font[_ngcontent-%COMP%]{color:#3b3937;font-family:Gilroy;font-size:15px;font-weight:700;line-height:140%;letter-spacing:1px;text-transform:uppercase}.white-font[_ngcontent-%COMP%]{color:#fff}.frangipani-font[_ngcontent-%COMP%]{color:#ffd6a8}.rust-font[_ngcontent-%COMP%]{color:#b14101}.tide-font[_ngcontent-%COMP%]{color:#b1b0af}[_nghost-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:50px 0 90px}.url-segments-visualizer[_ngcontent-%COMP%]{width:540px;padding:0 0 23px 14px}.main-container[_ngcontent-%COMP%]{display:flex;gap:70px;margin-bottom:120px}.main-container[_ngcontent-%COMP%]   .info-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:700px}.main-container[_ngcontent-%COMP%]   .info-container[_ngcontent-%COMP%]   .vendor-code[_ngcontent-%COMP%]{display:flex;gap:15px;margin-bottom:26px}.main-container[_ngcontent-%COMP%]   .info-container[_ngcontent-%COMP%]   .price-control[_ngcontent-%COMP%]{display:flex;margin-top:70px}.main-container[_ngcontent-%COMP%]   .info-container[_ngcontent-%COMP%]   .price-control[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{font-family:Gilroy;font-size:64px;font-weight:500;line-height:100%;letter-spacing:0}.main-container[_ngcontent-%COMP%]   .info-container[_ngcontent-%COMP%]   .price-control[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]{align-self:flex-end;display:flex;gap:10px;margin-left:auto}.main-container[_ngcontent-%COMP%]   .info-container[_ngcontent-%COMP%]   .descrition-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:9px;width:100%}hr[_ngcontent-%COMP%]{background-color:#dadada}.hr-1[_ngcontent-%COMP%]{margin:33px 0 50px}.hr-2[_ngcontent-%COMP%]{margin:50px 0}.product-order-popup[_ngcontent-%COMP%]{width:620px;padding:70px}.product-order-popup[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]{display:flex;align-items:center;gap:20px;width:100%;padding:10px 30px 10px 10px;margin:14px 0 34px;background-color:#ffd6a8}.product-order-popup[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]{min-width:70px;min-height:70px;max-width:70px;max-height:70px;background-color:#fff}.product-order-popup[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:70px;object-fit:contain}.product-order-popup[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-text-info-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;gap:45px}.product-order-popup[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:40px}.product-order-popup[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .form-inputs-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px}.after-order-product-popup[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;width:620px}.after-order-product-popup[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:240px}.after-order-product-popup[_ngcontent-%COMP%]   .text-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:50px 70px 64px}.after-order-product-popup[_ngcontent-%COMP%]   .text-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{text-align:center;padding:20px 45px 50px}'],changeDetection:0})}return e})();var S=i(6697);const _=e=>{const u=e.paramMap.get("product"),n=(0,t.WQX)(p.Ix),r=(0,t.WQX)(d.il);let o=!1;return r.select(f.Sd).pipe((0,S.s)(1)).subscribe(c=>{o=!(!c||!u),!o&&n.navigateByUrl("/not-found")}),o},R=[{path:"",component:h,pathMatch:"full",canActivate:[_]}]}}]);