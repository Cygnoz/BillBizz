import{j as e,r as h,a0 as C,Z as T,$ as R,u as B,e as V}from"./index-A_edQTkL.js";import{A as $,a as v}from"./ArrowUpIcon-BSlCnyZT.js";import{R as E}from"./RefreshIcon-3pGUrNkg.js";import{N as O}from"./NO_DATA-Bek3dUYY.js";import{R as P,B as S,X as k,Y as A,T as b,b as I,L,C as N,P as Y,a as z}from"./PieChart-D6Hphscx.js";import{A as _}from"./ArrowIconNoUnderline-BKw788-s.js";import{t as K,a as U,p as q,b as Q}from"./Group 2518-do7Hud2z.js";import{C as H}from"./CardSkeleton-Bq-aXsKF.js";import{A as J}from"./Active clients-DUxSe5SI.js";const f=()=>e.jsxs("div",{className:"text-center mt-10",children:[e.jsx("img",{src:O,alt:"No data available",className:"mx-auto w-20 h-20"}),e.jsxs("p",{className:"text-gray-600 mt-4",children:["There is no data available yet.",e.jsx("br",{}),"Please check back later."]})]}),y=["#f2c6b8","#a72522","#fbe6c3","#eef1d6","#e3e7e5","#8fd3f4","#ffcc00"],G=({payload:a})=>a&&a.length?e.jsx(C,{content:`${a[0].value}`,textColor:"#ffffff",bgColor:"#000000",arrowColor:"#000000",width:"60px"}):null,X=({x:a=0,y:s=0,width:t=0,height:l=0,fill:n=""})=>e.jsx("g",{children:e.jsx("path",{d:`M${a},${s} 
           L${a},${s+l} 
           L${a+t-10},${s+l} 
           Q${a+t},${s+l} ${a+t},${s+l-10}
           L${a+t},${s+10} 
           Q${a+t},${s} ${a+t-10},${s} 
           Z`,fill:n})}),Z=({data:a,categories:s})=>{var i;const[t,l]=h.useState(s[0]),n=((i=a.find(r=>r.categoryName===t))==null?void 0:i.items)||[],d=Math.max(...n.map(r=>r.stock),0);return e.jsxs("div",{className:"bg-white rounded-lg w-full px-8",children:[e.jsxs("div",{className:"flex items-center mt-6 justify-between",children:[e.jsx("h3",{className:"text-lg text-textColor font-semibold",children:"Stock Levels"}),e.jsx("select",{className:"rounded-lg p-2 text-sm bg-slate-50 border border-gray-300 ",value:t,onChange:r=>l(r.target.value),children:s.map(r=>e.jsx("option",{value:r,children:r},r))})]}),n.length>0?e.jsx(P,{width:"100%",height:400,children:e.jsxs(S,{layout:"vertical",data:n,margin:{left:0,right:30,bottom:0},children:[e.jsx(k,{type:"number",stroke:"#4A5568",fontSize:10,axisLine:!1,tickLine:!1,domain:[0,d],tick:!1}),e.jsx(A,{type:"category",dataKey:"itemName",stroke:"#4A5568",axisLine:!1,tickLine:!1,fontSize:10,width:100,interval:0}),e.jsx(b,{content:G,cursor:{fill:"transparent"}}),e.jsxs(I,{shape:e.jsx(X,{}),barSize:30,dataKey:"stock",fill:"#8884d8",children:[e.jsx(L,{dataKey:"stock",position:"right",fontSize:10}),n.map((r,o)=>e.jsx(N,{fill:y[o%y.length]},`cell-${o}`))]})]})}):e.jsx("div",{className:"text-center text-gray-500 text-sm py-8",children:e.jsx(f,{})})]})},g=["#eddada","#2c353b","#f7e7cd","#d1f0f0"],W=({cx:a,cy:s,midAngle:t,innerRadius:l,outerRadius:n,percent:d})=>{const i=Math.PI/180,r=l+(n-l)*.5,o=a+r*Math.cos(-t*i),u=s+r*Math.sin(-t*i);return e.jsx("text",{x:o,y:u,fill:"white",textAnchor:o>a?"start":"end",dominantBaseline:"central",children:`${(d*100).toFixed(0)}%`})},ee=({active:a,payload:s})=>a&&s&&s.length?e.jsx("div",{className:"custom-tooltip",children:e.jsxs("p",{className:"label",children:[s[0].name,": $",s[0].value]})}):null,te=({data:a})=>{const s=a.map(t=>({name:t.itemName,value:t.saleVolume}));return e.jsxs("div",{className:"bg-white rounded-lg w-full p-8",children:[e.jsx("p",{className:"font-semibold",children:"Most Frequently Added Items"}),e.jsx("div",{children:s&&s.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex flex-wrap mb-4",children:s.map((t,l)=>e.jsxs("div",{className:"flex items-center mr-4 my-2",children:[e.jsx("div",{className:"w-2 h-2 mr-2",style:{backgroundColor:g[l%g.length]}}),e.jsx("p",{className:"text-sm",children:t.name})]},`item-${l}`))}),e.jsx("div",{className:"overflow-hidden",children:e.jsx("div",{className:"inline-block min-w-full",children:e.jsxs(Y,{width:600,height:300,children:[e.jsx(z,{data:s,dataKey:"value",label:W,labelLine:!1,innerRadius:40,outerRadius:120,paddingAngle:5,cornerRadius:10,children:s.map((t,l)=>e.jsx(N,{fill:g[l%g.length]},`cell-${l}`))}),e.jsx(b,{content:e.jsx(ee,{})})]})})})]}):e.jsx("div",{className:"text-center text-gray-500 text-sm py-8",children:e.jsx(f,{})})})]})};function se(){return e.jsxs("div",{className:"animate-pulse",children:[e.jsx("div",{className:"h-4 bg-gray-300 rounded w-1/3 mb-4"}),e.jsx("div",{className:"h-4 bg-gray-300 rounded w-full mb-2"}),e.jsx("div",{className:"h-4 bg-gray-300 rounded w-full mb-2"}),e.jsx("div",{className:"h-4 bg-gray-300 rounded w-full mb-2"}),e.jsx("div",{className:"h-4 bg-gray-300 rounded w-full mb-2"})]})}function ae({data:a}){const{organization:s}=T();return e.jsxs("div",{className:"bg-white p-6 rounded-lg w-[100%]",children:[e.jsx("h3",{className:"text-base text-textColor font-semibold mb-5",children:"Top Selling Products"}),a?a.length>0?e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"min-w-full table-auto text-left",children:[e.jsx("thead",{className:"border-b border-tableBorder bg-[#FDF8F0] p-4",children:e.jsxs("tr",{className:"bg-gray-50",children:[e.jsx("th",{className:"px-4 py-4 text-xs font-semibold text-[#495160]",children:"Product name"}),e.jsx("th",{className:"px-4 py-4 text-xs font-semibold text-[#495160]",children:"Image"}),e.jsx("th",{className:"px-4 py-4 text-xs font-semibold text-[#495160]",children:"Sales Volume"}),e.jsx("th",{className:"px-4 py-4 text-xs font-semibold text-[#495160]",children:"Units Sold"}),e.jsx("th",{className:"px-4 py-4 text-xs font-semibold text-[#495160]",children:"Status"})]})}),e.jsx("tbody",{children:a.map(t=>{var l;return e.jsxs("tr",{className:"border-b border-tableBorder",children:[e.jsx("td",{className:"px-4 py-2 text-xs text-dropdownText",children:t==null?void 0:t.itemName}),e.jsx("td",{className:"px-4 py-2",children:e.jsx("img",{src:t==null?void 0:t.itemImage,alt:t==null?void 0:t.itemName,className:"w-12 h-12 object-cover rounded"})}),e.jsxs("td",{className:"px-4 py-2 text-xs text-gray-700",children:[s==null?void 0:s.baseCurrency," ",(l=t==null?void 0:t.saleVolume)==null?void 0:l.toLocaleString()]}),e.jsxs("td",{className:"px-4 py-2 text-xs text-gray-700",children:[t==null?void 0:t.unitBought," Units"]}),e.jsx("td",{className:"px-4 py-2",children:e.jsx("span",{className:`inline-block px-2 py-1.5 text-xs font-semibold rounded-[4px] ${(t==null?void 0:t.status)==="In Stock"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`,children:t==null?void 0:t.status})})]},t==null?void 0:t.itemId)})})]})}):e.jsx("div",{className:"text-center text-gray-500 text-sm py-8",children:e.jsx(f,{})}):e.jsx(se,{})]})}const ne=R("rounded-xl px-4 cursor-pointer",{variants:{active:{true:"bg-cardBg border-cardBorder border-2",false:"bg-white border-gray-300"}},defaultVariants:{active:!1}}),le=({icon:a,title:s,count:t,rating:l,active:n=!1,onClick:d})=>{const i=l<0,r=i?"bg-red-300":"bg-[#D8F2EE]",o=i?e.jsx($,{size:16,color:"#FF0000"}):e.jsx(_,{size:16,color:"#32A38E"});return e.jsxs("div",{className:`${ne({active:n})} py-4 px-5 w-full`,onClick:d,children:[e.jsx("div",{className:"rounded-full w-14 mb-2",children:e.jsx("img",{src:a,alt:`${s} icon`})}),e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"text-[14px] font-bold text-[#303F58]",children:s}),e.jsx("p",{className:"text-[#303F58] font-extrabold text-2xl",style:{color:n?"#820000":""},children:t}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{className:`text-[12px] p-[4px] font-bold flex items-center ${r} rounded-md`,children:[l,"%",o]}),e.jsx("div",{className:"flex items-center px-2 w-full",children:e.jsx("p",{className:"text-xs text-end",children:"Compared to last month"})})]})]})]})},re="/assets/Group%202516-B9MjwL19.png",oe=({data:a})=>{var d,i,r,o,u;const[s,t]=h.useState(null),l=x=>{t(x)},n=a?[{icon:K,title:"Total Inventory Value",count:((d=a.totalInventoryValue)==null?void 0:d.toString())||"N/A",rating:a.inventoryValueChange??0},{icon:U,title:"Total Sales Value",count:((i=a.totalSalesValue)==null?void 0:i.toString())||"N/A",rating:a.salesValueChange??0},{icon:re,title:"Total Sold Value",count:((r=a.underStockItemsCount)==null?void 0:r.toString())||"N/A",rating:10},{icon:q,title:"Recently Added",count:((o=a.recentlyAddedItemsCount)==null?void 0:o.toString())||"N/A",rating:18},{icon:Q,title:"Under Stock",count:((u=a.underStockItemsCount)==null?void 0:u.toString())||"N/A",rating:10}]:[];return e.jsx("div",{children:e.jsx("div",{className:"flex justify-between w-full space-x-4",children:n.length>0?n.map((x,c)=>e.jsx(le,{icon:x.icon,title:x.title,count:x.count,rating:x.rating,active:s===c,onClick:()=>l(c)},c)):Array.from({length:4}).map((x,c)=>e.jsx(H,{},c))})})},ie=["January","February","March","April","May","June","July","August","September","October","November","December"],ce=({onDateChange:a})=>{const[s,t]=h.useState(new Date().getMonth()),[l,n]=h.useState(new Date().getFullYear()),d=r=>{const o=Number(r.target.value);t(o),a(o,l)},i=r=>{const o=Number(r.target.value);n(o),a(s,o)};return e.jsxs("div",{className:"flex gap-3",children:[e.jsx("select",{value:s,onChange:d,className:"mr-2 p-2 border rounded",children:ie.map((r,o)=>e.jsx("option",{value:o,children:r},o))}),e.jsx("select",{value:l,onChange:i,className:"p-2 border rounded",children:Array.from({length:10},(r,o)=>new Date().getFullYear()-o).map(r=>e.jsx("option",{value:r,children:r},r))})]})},w=["#f2c6b8","#a72522","#fbe6c3","#eef1d6","#e3e7e5"],de=({payload:a})=>a&&a.length?e.jsx(C,{content:`$${a[0].value}`,textColor:"#ffffff",bgColor:"#000000",arrowColor:"#000000",width:"60px"}):null,xe=a=>{const{x:s,y:t,width:l}=a,n=10;return e.jsxs("g",{transform:`translate(${s+l/2}, ${t+-10})`,children:[e.jsx("circle",{cx:0,cy:-n,r:n,fill:"none",strokeWidth:0}),e.jsx("image",{href:J,x:-n,y:-n*2,width:n*2,height:n*2})]})},me=a=>{const{x:s,y:t,width:l,height:n,fill:d}=a,i=10;return e.jsx("g",{children:e.jsx("path",{d:`M${s},${t+i} 
             L${s},${t+n} 
             L${s+l},${t+n} 
             L${s+l},${t+i} 
             Q${s+l},${t} ${s+l-i},${t} 
             L${s+i},${t} 
             Q${s},${t} ${s},${t+i}`,fill:d})})},he=({data:a})=>{const s=a.map(({categoryName:t,salesValue:l})=>({name:t,value:l}));return e.jsxs("div",{className:"bg-white rounded-lg w-full py-8",children:[e.jsx("h3",{className:"ms-10 text-base font-semibold text-textColor",children:"Top Selling Products Categories"}),e.jsx("h4",{className:"ms-10 mb-3 py-4 text-[10px] text-[#4A5568]",children:"Sales Volume"}),s&&s.length>0?e.jsxs(S,{width:420,height:280,data:s,children:[e.jsx(k,{stroke:"#4A5568",fontSize:10,axisLine:!1,tickLine:!1,dataKey:"name"}),e.jsx(A,{stroke:"#4A5568",axisLine:!1,tickLine:!1,fontSize:10}),e.jsx(b,{content:de,cursor:{fill:"transparent"}}),e.jsxs(I,{shape:e.jsx(me,{}),barSize:40,dataKey:"value",fill:"#8884d8",children:[e.jsx(L,{dataKey:"name",content:xe}),s.map((t,l)=>e.jsx(N,{fill:w[l%w.length]},`cell-${l}`))]})]}):e.jsx("div",{className:"text-center text-gray-500 text-sm py-8",children:e.jsx(f,{})}),e.jsx("div",{className:"flex justify-center",children:e.jsx("h3",{className:"text-center text-[10px] text-[#4A5568] pt-3",children:"Product Category"})})]})};function ue({}){const[a,s]=h.useState(!1),t=h.useRef(null),{request:l}=B("get",5003),[n,d]=h.useState(null),i=async(c,m)=>{const D=(c+1).toString().padStart(2,"0"),F=`${V.GET_INVENTORY_DASHBOARD}/${m}-${D}-01`;try{const j=await l(F),{response:p,error:M}=j;!M&&p&&(d(p.data),console.log(p.data,"get status"))}catch(j){console.error("Failed to fetch dashboard data",j)}},r=()=>{s(!a)},o=c=>{t.current&&!t.current.contains(c.target)&&s(!1)},u=(c,m)=>{i(c,m)};h.useEffect(()=>(document.addEventListener("mousedown",o),()=>{document.removeEventListener("mousedown",o)}),[]),h.useEffect(()=>{const c=new Date().getMonth(),m=new Date().getFullYear();i(c,m)},[]);const x=[{icon:e.jsx($,{}),text:"Import Items",onClick:()=>{console.log("Import Sales Order clicked")}},{icon:e.jsx(v,{}),text:"Export Items",onClick:()=>{console.log("Export Sales Order clicked")}},{icon:e.jsx(v,{}),text:"Export Current View",onClick:()=>{console.log("Export Current View clicked")}},{icon:e.jsx(E,{color:"#4B5C79"}),text:"Refresh List",onClick:()=>{console.log("Refresh List clicked");const c=new Date().getMonth(),m=new Date().getFullYear();i(c,m)}}];return e.jsxs("div",{className:"mx-5  space-y-8 text-[#303F58]",children:[e.jsxs("div",{className:"flex items-center relative",children:[e.jsx("div",{children:e.jsx("h3",{className:"font-bold text-2xl text-textColor",children:"Inventory Overview"})}),e.jsxs("div",{className:"ml-auto gap-3 flex items-center",children:[e.jsx(ce,{onDateChange:u}),e.jsx("div",{onClick:r,className:"cursor-pointer"}),a&&e.jsx("div",{ref:t,className:"absolute top-16 right-4 mt-2 w-48 bg-white shadow-xl z-10",children:e.jsx("ul",{className:"py-1 text-dropdownText",children:x.map((c,m)=>e.jsxs("li",{onClick:c.onClick,className:"px-4 py-2 flex items-center gap-2 hover:bg-orange-100 rounded-md text-sm cursor-pointer",children:[c.icon,c.text]},m))})})]})]}),e.jsx(oe,{data:n}),e.jsxs("div",{className:"grid grid-cols-3 gap-5",children:[e.jsx("div",{className:"flex justify-center col-span-2",children:n&&n.topSellingProducts&&e.jsx(ae,{data:n.topSellingProducts})}),e.jsx("div",{className:"flex justify-center",children:n&&n.topSellingProductCategories&&e.jsx(he,{data:n.topSellingProductCategories})}),e.jsx("div",{className:"col-span-2 flex justify-center",children:n&&n.stockLevels&&e.jsx(Z,{data:n.stockLevels,categories:n.stockLevels.map(c=>c.categoryName)})}),e.jsx("div",{className:"flex justify-center",children:n&&n.frequentlyOrderedItems&&e.jsx(te,{data:n.frequentlyOrderedItems})})]})]})}const Ce=({})=>e.jsx(e.Fragment,{children:e.jsx(ue,{})});export{Ce as default};
