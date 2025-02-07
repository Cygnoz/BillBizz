import{j as e,$ as A,r as i,a0 as c,f as k}from"./index-A_edQTkL.js";import{A as y,a as f}from"./ArrowUpIcon-BSlCnyZT.js";import{P as L,a as E,C as d,R as b,X as x,Y as m,T as u,B as C,b as $,L as w}from"./PieChart-D6Hphscx.js";import{A as S}from"./ArrowIconNoUnderline-BKw788-s.js";import{L as R,C as F,a as z}from"./LineChart-C1FZF_i_.js";import{A as O}from"./Active clients-DUxSe5SI.js";const h=[{name:"Value",value:280,color:"#2C353B"},{name:"Remaining",value:220,color:"#E6E9EE"}],T=200,B=280,D=80,K=160,P=280,V=()=>e.jsxs("div",{className:"bg-white rounded-lg w-full px-8",children:[e.jsxs("div",{className:"flex justify-between mt-5 items-center",children:[e.jsx("h3",{className:" text-[16px] font-bold ",children:"Avarage Purchase Value"}),e.jsxs("select",{className:"border border-[#565148] h-8 pl-3 pr-4 rounded-md bg-[#FEFDFA]  text-xs font-semibold text-gray-800",style:{color:"#585953"},children:[e.jsx("option",{children:"Month"}),e.jsx("option",{children:"Other"}),e.jsx("option",{children:"Other"}),e.jsx("option",{children:"Other"})]})]}),e.jsxs(L,{width:400,height:400,children:[e.jsx(E,{dataKey:"value",startAngle:180,endAngle:0,data:h,cx:T,cy:B,innerRadius:D,outerRadius:K,fill:"#8884d8",stroke:"none",children:h.map((t,s)=>e.jsx(d,{fill:t.color},`cell-${s}`))}),e.jsxs("text",{x:200,y:250,textAnchor:"middle",dominantBaseline:"central",fontSize:"35",fill:"#303F58",fontWeight:"bold",children:["$",P]}),e.jsx("text",{x:80,y:300,textAnchor:"middle",dominantBaseline:"central",fontSize:"16",fontWeight:"bold",fill:"#303F58",children:"$0"}),e.jsx("text",{x:330,y:300,textAnchor:"middle",dominantBaseline:"central",fontSize:"16",fontWeight:"bold",fill:"#303F58",children:"$500"})]})]}),I=A(" rounded-xl px-4  cursor-pointer",{variants:{active:{true:"bg-cardBg border-cardBorder border-2",false:"bg-white border-gray-300"}},defaultVariants:{active:!1}}),M=({icon:t,title:s,count:a,rating:r,active:n=!1,onClick:l})=>e.jsxs("div",{className:`${I({active:n})} py-2  w-[100%]`,onClick:l,children:[e.jsx("div",{className:"rounded-full w-[40px] h-[40px]  ",children:t}),e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"text-[14px] font-bold text-[#303F58]",children:s}),e.jsx("p",{className:"text-[#303F58] font-extrabold text-2xl",style:{color:n?"#820000":""},children:a}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{className:"text-[12px] p-[4px] font-bold  flex items-center   text-[#32A38E] rounded-md bg-[#D8F2EE]",children:[r,"%",e.jsx(S,{size:16,color:"#32A38E"})]}),e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("p",{className:"text-[12.5px]",children:"Compared to last month"})})]})]})]}),W=({})=>{const[t,s]=i.useState(0),a=n=>{s(n)},r=[{icon:e.jsx("i",{className:"fa-solid fa-cart-shopping text-xl text-black"}),title:"Total Customers",count:"1500",rating:"12,95"},{icon:e.jsx("i",{className:"fa-solid fa-cogs text-xl text-black"}),title:"New Customers",count:"120",rating:"18,95"},{icon:e.jsx("i",{className:"fa-solid fa-cogs text-xl text-black"}),title:"Active Customers",count:"800",rating:"12,95"},{icon:e.jsx("i",{className:"fa-solid fa-cogs text-xl text-black"}),title:"Customer Rentation Rate",count:"85%",rating:"18"},{icon:e.jsx("i",{className:"fa-solid fa-cogs text-xl text-black"}),title:"Customers Churn Rate",count:"15%",rating:"10"}];return e.jsx("div",{children:e.jsx("div",{className:"flex justify-between  w-full space-x-4",children:r.map((n,l)=>e.jsx(M,{icon:n.icon,title:n.title,count:n.count,rating:n.rating,active:t===l,onClick:()=>a(l)},l))})})},Q=[{name:"Jan",value:40},{name:"Feb",value:20},{name:"Mar",value:45},{name:"Apr",value:35},{name:"May",value:50},{name:"Jun",value:65},{name:"Jul",value:60},{name:"Aug",value:78},{name:"Sep",value:72},{name:"Oct",value:68},{name:"Nov",value:80},{name:"Dec",value:85}],J=({payload:t})=>t&&t.length?e.jsx(c,{content:`${t[0].value}%`,textColor:"#ffffff",bgColor:"#4A5568",arrowColor:"#4A5568",width:"50px"}):null,G=()=>e.jsxs("div",{className:"bg-white  rounded-lg w-full py-8",children:[e.jsx("h3",{className:"ms-10 mb-6 text-[16px] font-bold",children:"Customers Retention Rate Over Time"}),e.jsx(b,{width:"100%",height:340,children:e.jsxs(R,{width:300,data:Q,children:[e.jsx(x,{dataKey:"name",stroke:"#4A5568",fontSize:10,axisLine:!1,tickLine:!1,padding:{left:30,right:30}}),e.jsx(m,{stroke:"#4A5568",fontSize:10,axisLine:!1,tickLine:!1,tick:{fontSize:12},interval:0}),e.jsx(F,{vertical:!1,stroke:"#E2E8F0"})," ",e.jsx(u,{content:J,cursor:!1})," ",e.jsx(z,{type:"monotone",dataKey:"value",stroke:"#4A5568",strokeWidth:2,dot:{r:4}})]})})]}),j=["#f2c6b8","#a72522","#fbe6c3","#eef1d6","#e3e7e5","#8fd3f4","#ffcc00"],p=[{name:"Phones",value:100},{name:"Laptops",value:80},{name:"Headphones",value:60},{name:"Tablets",value:50},{name:"Cameras",value:40},{name:"Smartwatches",value:30}],H=({payload:t})=>t&&t.length?e.jsx(c,{content:`${t[0].value}%`,textColor:"#ffffff",bgColor:"#000000",arrowColor:"#000000",width:"60px"}):null,U=({x:t=0,y:s=0,width:a=0,height:r=0,fill:n=""})=>e.jsx("g",{children:e.jsx("path",{d:`M${t},${s} 
           L${t},${s+r} 
           L${t+a-10},${s+r} 
           Q${t+a},${s+r} ${t+a},${s+r-10}
           L${t+a},${s+10} 
           Q${t+a},${s} ${t+a-10},${s} 
           Z`,fill:n})}),X=()=>e.jsxs("div",{className:"bg-white rounded-lg w-full px-8",children:[e.jsx("h3",{className:"text-[16px] mt-6 font-bold",children:"Repeat Purchase Rate"}),e.jsx(b,{width:"100%",height:400,children:e.jsxs(C,{layout:"vertical",data:p,margin:{left:-70,right:100,bottom:-25},children:[e.jsx(x,{type:"number",stroke:"#4A5568",fontSize:10,axisLine:!1,tickLine:!1,domain:[0,100],tick:!1}),e.jsx(m,{type:"category",dataKey:"value",stroke:"#4A5568",axisLine:!1,tickLine:!1,fontSize:10,width:100,interval:0}),e.jsx(u,{content:H,cursor:{fill:"transparent"}}),e.jsxs($,{shape:e.jsx(U,{}),barSize:30,dataKey:"value",fill:"#8884d8",children:[e.jsx(w,{dataKey:"name",position:"right",fontSize:10}),p.map((t,s)=>e.jsx(d,{fill:j[s%j.length]},`cell-${s}`))]})]})})]}),g=["#f2c6b8","#a72522","#fbe6c3","#eef1d6","#e3e7e5"],v=[{name:"Electronics",value:250},{name:"Apparel",value:200},{name:"Home Goods",value:434},{name:"Toys",value:300},{name:"Sports",value:420}],Y=({payload:t})=>t&&t.length?e.jsx(c,{content:`$${t[0].value}`,textColor:"#ffffff",bgColor:"#000000",arrowColor:"#000000",width:"60px"}):null,_=t=>{const{x:s,y:a,width:r}=t,n=10;return e.jsxs("g",{transform:`translate(${s+r/2}, ${a+-10})`,children:[e.jsx("circle",{cx:0,cy:-n,r:n,fill:"none",strokeWidth:0}),e.jsx("image",{href:O,x:-n,y:-n*2,width:n*2,height:n*2})]})},Z=t=>{const{x:s,y:a,width:r,height:n,fill:l}=t,o=10;return e.jsx("g",{children:e.jsx("path",{d:`M${s},${a+o} 
           L${s},${a+n} 
           L${s+r},${a+n} 
           L${s+r},${a+o} 
           Q${s+r},${a} ${s+r-o},${a} 
           L${s+o},${a} 
           Q${s},${a} ${s},${a+o}`,fill:l})})},q=()=>e.jsxs("div",{className:"bg-white rounded-lg w-full py-8",children:[e.jsx("h3",{className:"ms-10 text-[16px] font-bold",children:"Top Customers by Sales Volume"}),e.jsx("h4",{className:"ms-10 py-4 text-[10px] text-[#4A5568]",children:"Sales Volume"}),e.jsxs(C,{width:450,height:280,data:v,children:[e.jsx(x,{stroke:"#4A5568",fontSize:10,axisLine:!1,tickLine:!1,dataKey:"name"}),e.jsx(m,{stroke:"#4A5568",axisLine:!1,tickLine:!1,fontSize:10}),e.jsx(u,{content:Y,cursor:{fill:"transparent"}}),e.jsxs($,{shape:e.jsx(Z,{}),barSize:40,dataKey:"value",fill:"#8884d8",children:[e.jsx(w,{dataKey:"name",content:_}),v.map((t,s)=>e.jsx(d,{fill:g[s%g.length]},`cell-${s}`))]})]}),e.jsx("div",{className:"flex justify-center",children:e.jsx("h3",{className:"text-center text-[10px] text-[#4A5568] pt-3",children:"Customers"})})]});function ee({}){const[t,s]=i.useState(!1),a=i.useRef(null),r=()=>{s(!t)},n=o=>{a.current&&!a.current.contains(o.target)&&s(!1)};i.useEffect(()=>(document.addEventListener("mousedown",n),()=>{document.removeEventListener("mousedown",n)}),[]);const l=[{icon:e.jsx(y,{}),text:"Import Chart of accounts",onClick:()=>{console.log("Import Sales Order clicked")}},{icon:e.jsx(f,{}),text:"Export Chart of accounts",onClick:()=>{console.log("Export Sales Order clicked")}},{icon:e.jsx(f,{}),text:"Export Current View",onClick:()=>{console.log("Export Current View clicked")}}];return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"mx-5 space-y-8 text-[#303F58]",children:[e.jsxs("div",{className:" flex  items-center relative",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"font-bold text-2xl text-textColor",children:"Customer Overview"}),e.jsx("p",{className:"text-sm text-gray mt-1",children:"Lorem ipsum dolor sit amet consectetur. Commodo enim odio fringilla egestas consectetur amet."})]}),e.jsxs("div",{className:"ml-auto gap-3 flex items-center",children:[e.jsxs("select",{className:"border border-[#565148] h-[35px] pl-3 pr-4  rounded-md bg-[#FEFDFA]  text-sm font-semibold text-gray-800 ",style:{color:"#585953"},children:[e.jsx("option",{children:"Select Month"}),e.jsx("option",{children:"Other"}),e.jsx("option",{children:"Other"}),e.jsx("option",{children:"Other"})]}),e.jsx("div",{onClick:r,className:"cursor-pointer",children:e.jsx(k,{})}),t&&e.jsx("div",{ref:a,className:"absolute top-16 right-4 mt-2 w-60 bg-white shadow-xl z-10",children:e.jsx("ul",{className:"py-1 text-dropdownText",children:l.map((o,N)=>e.jsxs("li",{onClick:o.onClick,className:"px-4 py-2 flex items-center gap-2 hover:bg-orange-100 rounded-md text-sm cursor-pointer",children:[o.icon,o.text]},N))})})]})]}),e.jsx(W,{}),e.jsxs("div",{className:"grid grid-cols-3 gap-5",children:[e.jsx("div",{className:"flex justify-center ",children:e.jsx(q,{})}),e.jsx("div",{className:"col-span-2 flex justify-center",children:e.jsx(G,{})}),e.jsx("div",{className:"col-span-2 flex justify-center ",children:e.jsx(X,{})}),e.jsx("div",{className:" flex justify-center",children:e.jsx(V,{})})]})]})})}const oe=({})=>e.jsx(e.Fragment,{children:e.jsx(ee,{})});export{oe as default};
