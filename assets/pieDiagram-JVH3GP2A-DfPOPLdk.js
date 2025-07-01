import{p as U}from"./chunk-44GW5IO5-DwBPyfTL.js";import{aj as y,ae as z,b8 as V,_ as u,w as j,v as Z,x as q,y as H,U as J,S as K,B as F,z as Q,a5 as X,a9 as Y,at as tt,D as et,Z as at,a7 as rt}from"./index-CfDobxyH.js";import{p as nt}from"./radar-VG2SY3DT-CAeEpkcd.js";import{d as P}from"./arc-Dr8uIHYX.js";import{o as it}from"./ordinal-Cboi1Yqb.js";import"./_baseUniq-bRb2KPZd.js";import"./_basePickBy-LDmW-sn6.js";import"./clone-BsMHf_Sn.js";import"./init-Gi6I4Gst.js";function st(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function ot(t){return t}function lt(){var t=ot,a=st,m=null,s=y(0),p=y(z),x=y(0);function i(e){var r,l=(e=V(e)).length,d,w,h=0,c=new Array(l),n=new Array(l),v=+s.apply(this,arguments),A=Math.min(z,Math.max(-z,p.apply(this,arguments)-v)),f,T=Math.min(Math.abs(A)/l,x.apply(this,arguments)),$=T*(A<0?-1:1),g;for(r=0;r<l;++r)(g=n[c[r]=r]=+t(e[r],r,e))>0&&(h+=g);for(a!=null?c.sort(function(S,D){return a(n[S],n[D])}):m!=null&&c.sort(function(S,D){return m(e[S],e[D])}),r=0,w=h?(A-l*$)/h:0;r<l;++r,v=f)d=c[r],g=n[d],f=v+(g>0?g*w:0)+$,n[d]={data:e[d],index:r,value:g,startAngle:v,endAngle:f,padAngle:T};return n}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:y(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,m=null,i):a},i.sort=function(e){return arguments.length?(m=e,a=null,i):m},i.startAngle=function(e){return arguments.length?(s=typeof e=="function"?e:y(+e),i):s},i.endAngle=function(e){return arguments.length?(p=typeof e=="function"?e:y(+e),i):p},i.padAngle=function(e){return arguments.length?(x=typeof e=="function"?e:y(+e),i):x},i}var ct=rt.pie,G={sections:new Map,showData:!1},b=G.sections,W=G.showData,ut=structuredClone(ct),pt=u(()=>structuredClone(ut),"getConfig"),dt=u(()=>{b=new Map,W=G.showData,at()},"clear"),gt=u(({label:t,value:a})=>{b.has(t)||(b.set(t,a),F.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ft=u(()=>b,"getSections"),mt=u(t=>{W=t},"setShowData"),ht=u(()=>W,"getShowData"),R={getConfig:pt,clear:dt,setDiagramTitle:K,getDiagramTitle:J,setAccTitle:H,getAccTitle:q,setAccDescription:Z,getAccDescription:j,addSection:gt,getSections:ft,setShowData:mt,getShowData:ht},vt=u((t,a)=>{U(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),St={parse:u(async t=>{const a=await nt("pie",t);F.debug(a),vt(a,R)},"parse")},yt=u(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),xt=yt,wt=u(t=>{const a=[...t.entries()].map(s=>({label:s[0],value:s[1]})).sort((s,p)=>p.value-s.value);return lt().value(s=>s.value)(a)},"createPieArcs"),At=u((t,a,m,s)=>{F.debug(`rendering pie chart
`+t);const p=s.db,x=Q(),i=X(p.getConfig(),x.pie),e=40,r=18,l=4,d=450,w=d,h=Y(a),c=h.append("g");c.attr("transform","translate("+w/2+","+d/2+")");const{themeVariables:n}=x;let[v]=tt(n.pieOuterStrokeWidth);v??=2;const A=i.textPosition,f=Math.min(w,d)/2-e,T=P().innerRadius(0).outerRadius(f),$=P().innerRadius(f*A).outerRadius(f*A);c.append("circle").attr("cx",0).attr("cy",0).attr("r",f+v/2).attr("class","pieOuterCircle");const g=p.getSections(),S=wt(g),D=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12],C=it(D);c.selectAll("mySlices").data(S).enter().append("path").attr("d",T).attr("fill",o=>C(o.data.label)).attr("class","pieCircle");let N=0;g.forEach(o=>{N+=o}),c.selectAll("mySlices").data(S).enter().append("text").text(o=>(o.data.value/N*100).toFixed(0)+"%").attr("transform",o=>"translate("+$.centroid(o)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(p.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const M=c.selectAll(".legend").data(C.domain()).enter().append("g").attr("class","legend").attr("transform",(o,k)=>{const E=r+l,L=E*C.domain().length/2,_=12*r,B=k*E-L;return"translate("+_+","+B+")"});M.append("rect").attr("width",r).attr("height",r).style("fill",C).style("stroke",C),M.data(S).append("text").attr("x",r+l).attr("y",r-l).text(o=>{const{label:k,value:E}=o.data;return p.getShowData()?`${k} [${E}]`:k});const I=Math.max(...M.selectAll("text").nodes().map(o=>o?.getBoundingClientRect().width??0)),O=w+e+r+l+I;h.attr("viewBox",`0 0 ${O} ${d}`),et(h,d,O,i.useMaxWidth)},"draw"),Dt={draw:At},Gt={parser:St,db:R,renderer:Dt,styles:xt};export{Gt as diagram};
