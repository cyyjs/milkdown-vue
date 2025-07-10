import{p as B}from"./chunk-353BL4L5-BcXiA82m.js";import{af as x,aa as z,b0 as U,_ as u,u as j,r as Q,v as Z,w as q,Q as H,P as J,z as F,x as K,a1 as X,a5 as Y,ap as tt,A as et,V as at,a3 as rt}from"./index-C_woXTXb.js";import{p as nt}from"./treemap-6Y5VK53G-Cq2s9zXo.js";import{d as O}from"./arc-Brlxi9HE.js";import{o as it}from"./ordinal-Cboi1Yqb.js";import"./lodash-es-CoBT7cQw.js";import"./init-Gi6I4Gst.js";function st(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function ot(t){return t}function lt(){var t=ot,a=st,h=null,s=x(0),p=x(z),y=x(0);function i(e){var r,l=(e=U(e)).length,d,A,m=0,c=new Array(l),n=new Array(l),v=+s.apply(this,arguments),w=Math.min(z,Math.max(-z,p.apply(this,arguments)-v)),f,T=Math.min(Math.abs(w)/l,y.apply(this,arguments)),$=T*(w<0?-1:1),g;for(r=0;r<l;++r)(g=n[c[r]=r]=+t(e[r],r,e))>0&&(m+=g);for(a!=null?c.sort(function(S,C){return a(n[S],n[C])}):h!=null&&c.sort(function(S,C){return h(e[S],e[C])}),r=0,A=m?(w-l*$)/m:0;r<l;++r,v=f)d=c[r],g=n[d],f=v+(g>0?g*A:0)+$,n[d]={data:e[d],index:r,value:g,startAngle:v,endAngle:f,padAngle:T};return n}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:x(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,h=null,i):a},i.sort=function(e){return arguments.length?(h=e,a=null,i):h},i.startAngle=function(e){return arguments.length?(s=typeof e=="function"?e:x(+e),i):s},i.endAngle=function(e){return arguments.length?(p=typeof e=="function"?e:x(+e),i):p},i.padAngle=function(e){return arguments.length?(y=typeof e=="function"?e:x(+e),i):y},i}var ct=rt.pie,G={sections:new Map,showData:!1},b=G.sections,P=G.showData,ut=structuredClone(ct),pt=u(()=>structuredClone(ut),"getConfig"),dt=u(()=>{b=new Map,P=G.showData,at()},"clear"),gt=u(({label:t,value:a})=>{b.has(t)||(b.set(t,a),F.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ft=u(()=>b,"getSections"),ht=u(t=>{P=t},"setShowData"),mt=u(()=>P,"getShowData"),R={getConfig:pt,clear:dt,setDiagramTitle:J,getDiagramTitle:H,setAccTitle:q,getAccTitle:Z,setAccDescription:Q,getAccDescription:j,addSection:gt,getSections:ft,setShowData:ht,getShowData:mt},vt=u((t,a)=>{B(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),St={parse:u(async t=>{const a=await nt("pie",t);F.debug(a),vt(a,R)},"parse")},xt=u(t=>`
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
`,"getStyles"),yt=xt,At=u(t=>{const a=[...t.entries()].map(s=>({label:s[0],value:s[1]})).sort((s,p)=>p.value-s.value);return lt().value(s=>s.value)(a)},"createPieArcs"),wt=u((t,a,h,s)=>{F.debug(`rendering pie chart
`+t);const p=s.db,y=K(),i=X(p.getConfig(),y.pie),e=40,r=18,l=4,d=450,A=d,m=Y(a),c=m.append("g");c.attr("transform","translate("+A/2+","+d/2+")");const{themeVariables:n}=y;let[v]=tt(n.pieOuterStrokeWidth);v??=2;const w=i.textPosition,f=Math.min(A,d)/2-e,T=O().innerRadius(0).outerRadius(f),$=O().innerRadius(f*w).outerRadius(f*w);c.append("circle").attr("cx",0).attr("cy",0).attr("r",f+v/2).attr("class","pieOuterCircle");const g=p.getSections(),S=At(g),C=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12],D=it(C);c.selectAll("mySlices").data(S).enter().append("path").attr("d",T).attr("fill",o=>D(o.data.label)).attr("class","pieCircle");let W=0;g.forEach(o=>{W+=o}),c.selectAll("mySlices").data(S).enter().append("text").text(o=>(o.data.value/W*100).toFixed(0)+"%").attr("transform",o=>"translate("+$.centroid(o)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(p.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const M=c.selectAll(".legend").data(D.domain()).enter().append("g").attr("class","legend").attr("transform",(o,k)=>{const E=r+l,L=E*D.domain().length/2,_=12*r,V=k*E-L;return"translate("+_+","+V+")"});M.append("rect").attr("width",r).attr("height",r).style("fill",D).style("stroke",D),M.data(S).append("text").attr("x",r+l).attr("y",r-l).text(o=>{const{label:k,value:E}=o.data;return p.getShowData()?`${k} [${E}]`:k});const I=Math.max(...M.selectAll("text").nodes().map(o=>o?.getBoundingClientRect().width??0)),N=A+e+r+l+I;m.attr("viewBox",`0 0 ${N} ${d}`),et(m,d,N,i.useMaxWidth)},"draw"),Ct={draw:wt},zt={parser:St,db:R,renderer:Ct,styles:yt};export{zt as diagram};
