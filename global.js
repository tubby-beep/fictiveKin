"use strict";(()=>{document.querySelectorAll(".js-checkbox-toggle").forEach(t=>{t.addEventListener("keyup",function(i){(i.keyCode||i.which)==13&&t.click()});let e=t.getAttribute("data-html-toggle");e&&t.addEventListener("click",function(){document.documentElement.classList.toggle(e,t.checked)}),t.nextElementSibling.addEventListener("touchstart",function(){})});document.querySelectorAll("[role=button], .btn").forEach(t=>{t.addEventListener("keyup",function(e){(e.keyCode||e.which)==32&&t.click()})});document.querySelectorAll(".js-copy").forEach(t=>{t.addEventListener("click",function(e){e.preventDefault();let i=t.offsetWidth;navigator&&navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(t.innerText.toLowerCase()).then(()=>{let n=t.innerText;t.style.width=`${i}px`,t.innerText="Copied!",setTimeout(function(){t.innerText=n,t.style.width="auto"},1e3)})})});var r=t=>t?t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'):(console.warn("You need to pass a parent HTMLElement"),[]);var c=class{constructor(e,i={debug:!1}){this.nav=e,this.options=i,this.navBtns=[...this.nav.querySelectorAll('[data-ref="nav-btn"]')],this.subNavs=[...this.nav.querySelectorAll('[data-ref="main-menu-subnav"]')],this.preventFocusLeak();let n=this;this.state=new Proxy({mobileNav:"closed",initialized:!1,openNav:null,event:null},{set(o,a,s){let l=o[a];return o[a]=s,a==="openNav"&&(s===null?(n.options.debug&&console.log("all closed"),n.closeAll()):l!==s?(n.options.debug&&console.log("open new"),n.open()):l===s&&o.event==="click"&&(n.options.debug&&console.log("close current"),n.close())),a==="initialized"&&l!==s&&n.isInitialized(),a==="mobileNav"&&l!==s&&n.updateMobileNav(),o}}),this.init()}init(){this.bindFunctions(),this.bindEvents(),this.watchMedia(),this.state.initialized=!0}isInitialized(){this.nav.setAttribute("initialized",this.state.initialized?"true":"false")}setNavMq(){return`(max-width: ${getComputedStyle(document.documentElement).getPropertyValue("--nav-break")})`}watchMedia(){let e=this.setNavMq(),i=window.matchMedia(e);this.mediaChange(i),i.addEventListener("change",n=>{this.mediaChange(n)})}mediaChange(e){e.matches?(this.resetNav(),this.nav.removeEventListener("mouseover",this.onNavMouseover),this.nav.removeEventListener("mouseleave",this.onNavMouseleave)):(this.resetNav(),this.nav.addEventListener("mouseover",this.onNavMouseover),this.nav.addEventListener("mouseleave",this.onNavMouseleave))}closeAll(){this.navBtns.forEach(e=>{e.setAttribute("aria-expanded",!1)}),this.subNavs.forEach(e=>{e.hidden=!0,e.classList.remove("is-open"),e.removeEventListener("keydown",this.onKeydown)}),this.preventFocusLeak()}close(){this.state.openNav=null,this.closeAll()}open(){this.closeAll();let e=this.navBtns.filter(n=>n.getAttribute("aria-controls")===this.state.openNav),i=this.subNavs.filter(n=>n.getAttribute("id")===this.state.openNav);e[0].setAttribute("aria-expanded",!0),i[0].hidden=!1,i[0].classList.add("is-open"),this.enableFocus(i[0])}preventFocusLeak(){this.subNavs.forEach(e=>{r(e).forEach(n=>{n.setAttribute("tabindex","-1")})})}enableFocus(e){r(e).forEach(n=>n.removeAttribute("tabindex"))}resetNav(){this.state.openNav=null,this.state.event=null,this.state.mobileNav="closed",this.closeAll()}updateMobileNav(){switch(this.state.mobileNav){case"closed":this.mobileMenuBtn.setAttribute("aria-expanded","false"),this.mobileMenuBtn.setAttribute("aria-label","Open menu"),this.mobileMenuBtn.textContent="Menu",document.documentElement.classList.remove("menu-active"),document.documentElement.style.removeProperty("top"),window.scrollTo(0,this.scrollPosition),document.documentElement.style.scrollBehavior="",document.removeEventListener("keydown",this.onKeydown),this.close();break;case"open":this.mobileMenuBtn.setAttribute("aria-expanded","true"),this.mobileMenuBtn.setAttribute("aria-label","Close menu"),this.mobileMenuBtn.textContent="Close",this.scrollPosition=window.pageYOffset,document.documentElement.classList.add("menu-active"),document.documentElement.style.top=`${-this.scrollPosition}px`,document.documentElement.style.scrollBehavior="auto",document.addEventListener("keydown",this.onKeydown);break}}renderBtn(){document.querySelector('[data-ref="menu-checkbox"]').remove(),document.querySelector('[data-ref="menu-label"]').remove();let e=`<button
      class="sm-menu-btn btn"
      type="button"
      aria-controls="main-menu"
      aria-expanded="false"
      aria-label="open-menu"
      data-ref="mobile-menu-btn"
    >
      Menu
    </button>`;this.nav.insertAdjacentHTML("beforebegin",e),this.mobileMenuBtn=document.querySelector('[data-ref="mobile-menu-btn"]')}bindFunctions(){this.onNavMouseover=this.onNavMouseover.bind(this),this.onNavMouseleave=this.onNavMouseleave.bind(this),this.onNavClick=this.onNavClick.bind(this),this.onMobileMenuBtnClick=this.onMobileMenuBtnClick.bind(this),this.onKeydown=this.onKeydown.bind(this)}bindEvents(){this.nav.addEventListener("click",this.onNavClick),document.addEventListener("focusin",()=>{document.activeElement.dataset.ref==="secondary-nav"&&this.close(),document.activeElement.dataset.ref!=="mobile-menu-btn"&&!this.nav.contains(document.activeElement)&&(this.state.mobileNav="closed",this.close())})}onKeydown(e){e.key==="Escape"&&(this.state.mobileNav="closed")}onNavMouseover(e){(e.target.matches('[data-ref="secondary-nav"]')||e.target.closest('[data-ref="nav-link"]'))&&(this.state.event="mouseleave",this.state.openNav=null),e.target.closest('[data-ref="nav-btn"]')&&(this.state.event="mouseover",this.state.openNav=e.target.getAttribute("aria-controls"))}onNavMouseleave(){this.state.event="mouseleave",this.state.openNav=null}onNavClick(e){e.target.closest('[data-ref="nav-btn"]')&&(e.preventDefault(),this.state.event="click",this.state.openNav=e.target.getAttribute("aria-controls"))}onMobileMenuBtnClick(){this.state.mobileNav=this.state.mobileNav==="closed"?"open":"closed"}},u=document.querySelector('[data-ref="main-menu"]');u&&new c(u);var d=class{constructor(e){this.el=e,this.initialize()}initialize(){this.bindSetttings(),this.bindObserver()}bindSetttings(){this.observer=null,this.options={rootMargin:"0px",threshold:0}}bindObserver(){this.observer=new IntersectionObserver(this.observerCallback,this.options),this.observer.observe(this.el)}observerCallback(e){e.forEach(i=>{let n=i.target.getAttribute("animate-delay")||50;i.isIntersecting&&setTimeout(()=>{i.target.classList.add("isVisible")},n)})}},h=d;function v(t,e,i,n){if(!t||!e)return;let o=null,a=[];n?o=n.querySelectorAll(t):o=document.querySelectorAll(t);for(let s=0;s<o.length;s++)i?a.push(new e(o[s],i)):a.push(new e(o[s]));return a}window.reveal=v("[animate-up]",h);})();
//# sourceMappingURL=global.js.map
