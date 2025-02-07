import{j as e,$ as B,r as l,u as I,a as $,g as M,a1 as V,W,e as R,_ as S,E as P,T as U,f as q,a2 as z,I as G,a3 as H}from"./index-A_edQTkL.js";import{A as Y,I as F}from"./client_5895553 2-C4qiIkYs.js";import{A as J}from"./Active clients-DUxSe5SI.js";import{v as K}from"./Vector-DJK6wySd.js";import{N as Q}from"./NewCustomerModal-CBewSJCy.js";import{P as X}from"./Print-Cv7N6AYi.js";import{T as Z}from"./TableSkelton-L9YeclyQ.js";import{N as ee}from"./NoDataFoundTable-hmwFq4Ia.js";import{E as se}from"./EditCustomerModal-CLg58Xld.js";import{A as te,a as _}from"./ArrowUpIcon-BSlCnyZT.js";import{R as re}from"./RefreshIcon-3pGUrNkg.js";import"./PrinterIcon-wSfdPfNy.js";import"./NO_DATA-Bek3dUYY.js";import"./PencilEdit-YyKjeo-p.js";const oe=B("rounded-xl cursor-pointer",{variants:{active:{true:"bg-white border-cardBorder border-2",false:"bg-white border-gray-300"}},defaultVariants:{active:!1}}),le=({icon:o,title:d,description:u,number:x,active:m=!1,onClick:c})=>e.jsx("div",{className:`${oe({active:m})} w-[50%] h-[70px] pl-4 pr-4 text-textColor`,onClick:c,children:e.jsxs("div",{className:"flex items-center justify-between w-full h-full",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{src:o,alt:""}),e.jsxs("div",{className:"ml-4",children:[e.jsx("h2",{className:"text-base font-semibold",children:d}),e.jsx("p",{className:"text-xs",style:{color:m?"#495160":"#8F99A9"},children:u})]})]}),e.jsx("div",{className:"text-2xl font-bold",style:{backgroundImage:m?`url(${K})`:"none",backgroundSize:"cover",backgroundPosition:"center",width:"68px",height:"68px",display:"flex",alignItems:"center",justifyContent:"center"},children:x})]})});function ae({all:o,active:d,inactive:u,duplicate:x,onCardClick:m}){const c=[{icon:Y,title:"All Customers",description:"Total number of customers",number:o,filter:null},{icon:J,title:"Active",description:"Active customers",number:d,filter:"Active"},{icon:F,title:"Inactive",description:"Inactive customers",number:u,filter:"Inactive"},{icon:F,title:"Duplicate",description:"Duplicate customer records",number:x,filter:"Duplicate"}],[i,C]=l.useState(0),h=(n,f)=>{C(n),m(f)};return e.jsx("div",{className:"flex space-x-4 justify-center px-6 mt-2",children:c.map((n,f)=>e.jsx(le,{icon:n.icon,title:n.title,description:n.description,number:n.number,active:i===f,onClick:()=>h(f,n.filter)},f))})}const ie=[{id:"customerDisplayName",label:"Name",visible:!0},{id:"companyName",label:"Company Name",visible:!0},{id:"mobile",label:"Contact",visible:!0},{id:"customerEmail",label:"Email",visible:!0},{id:"supplierDetails",label:"Action",visible:!0},{id:"status",label:"Status",visible:!0},{id:"skypeNameNumber",label:"Receivables(BCY)",visible:!1}],ne=({customerData:o,searchValue:d,setSearchValue:u,loading:x,refreshCustomers:m})=>{const[c,i]=l.useState(ie),[C,h]=l.useState([]),{request:n}=I("get",5002),f=$(),N=t=>{f(`/customer/view/${t}`)},A=async t=>{const s=`${R.GET_ONE_CUSTOMER}/${t}`;try{const a=await n(s),{response:g,error:k}=a;!k&&g&&h(g.data)}catch{}},b=l.useMemo(()=>{const t=d.toLowerCase();return o.filter(s=>{var a,g,k,T,L,O;return((a=s==null?void 0:s.billingAttention)==null?void 0:a.toLowerCase().startsWith(t))||((g=s==null?void 0:s.customerDisplayName)==null?void 0:g.toLowerCase().startsWith(t))||((k=s==null?void 0:s.companyName)==null?void 0:k.toLowerCase().startsWith(t))||((T=s==null?void 0:s.mobile)==null?void 0:T.toLowerCase().startsWith(t))||((L=s==null?void 0:s.customerEmail)==null?void 0:L.toLowerCase().startsWith(t))||((O=s==null?void 0:s.placeOfSupply)==null?void 0:O.toLowerCase().startsWith(t))})},[o,d]),[w,j]=l.useState(!1),[y,D]=l.useState(null),{request:r}=I("delete",5002),p=t=>{D(t),j(!0)},v=async()=>{if(y)try{const t=`${R.DELETE_CUSTOMER}/${y}`,{response:s,error:a}=await r(t);!a&&s?(S.success(s.data.message),m()):S.error(a.response.data.message)}catch{S.error("Error occurred while deleting.")}finally{j(!1),D(null)}},E=(t,s)=>{if(t==="supplierDetails")return e.jsxs("div",{className:"flex justify-center items-center gap-3",children:[e.jsx("div",{onClick:()=>N(s._id),className:"cursor-pointer",children:e.jsx(P,{color:"#569FBC"})}),e.jsx("div",{onClick:()=>A(s._id),children:e.jsx(se,{customerDataPorps:C,page:"editCustomer"})}),e.jsx("div",{onClick:()=>p(s._id),children:e.jsx(U,{color:"red"})})]});if(t==="status")return e.jsx("p",{className:`py-1 text-[13px] rounded items-center ms-auto text-white h-[18px] flex justify-center ${s.status==="Active"?"bg-[#78AA86]":"bg-zinc-400"}`,children:s.status});const a=s[t];return a?e.jsx("span",{children:a}):e.jsx("span",{className:"text-gray-500 italic",children:"-"})};return e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[e.jsx("div",{className:"w-full",children:e.jsx(M,{placeholder:"Search",searchValue:d,onSearchChange:u})}),e.jsx("div",{className:"flex gap-4",children:e.jsx(X,{})})]}),e.jsx("div",{className:"mt-3 overflow-y-scroll max-h-[25rem]",children:e.jsxs("table",{className:"min-w-full bg-white mb-5",children:[e.jsx("thead",{className:"text-[12px] text-center text-dropdownText",children:e.jsxs("tr",{style:{backgroundColor:"#F9F7F0"},children:[e.jsx("th",{className:"py-3 px-4 border-b border-tableBorder",children:"Sl.No"}),c.map(t=>t.visible&&e.jsx("th",{className:"py-2 px-4 font-medium border-b border-tableBorder",children:t.label},t.id)),e.jsx("th",{children:e.jsx(V,{columns:c,setColumns:i,tableId:"customer"})})]})}),e.jsx("tbody",{className:"text-dropdownText text-center text-[13px]",children:x.skeleton?[...Array(b.length>0?b.length:5)].map((t,s)=>e.jsx(Z,{columns:[...c,"h"]},s)):b&&b.length>0?[...b].reverse().map((t,s)=>e.jsxs("tr",{className:"relative",children:[e.jsx("td",{className:"py-2.5 px-4 border-y border-tableBorder",children:s+1}),c.map(a=>a.visible&&e.jsx("td",{className:"py-2.5 px-4 border-y border-tableBorder",children:E(a.id,t)},a.id)),e.jsx("td",{className:"py-2.5 px-4 border-y border-tableBorder"})]},t._id)):e.jsx(ee,{columns:[...c,"dd"]})})]})}),e.jsx(W,{open:w,onClose:()=>j(!1),onConfirm:v,message:"Are you sure you want to delete?"})]})};function ce({}){const[o,d]=l.useState(!1),u=l.useRef(null),x=()=>{d(!o)},m=i=>{u.current&&!u.current.contains(i.target)&&d(!1)};l.useEffect(()=>(document.addEventListener("mousedown",m),()=>{document.removeEventListener("mousedown",m)}),[]);const c=[{icon:e.jsx(te,{}),text:"Import Sales Order",onClick:()=>{console.log("Import Sales Order clicked")}},{icon:e.jsx(_,{}),text:"Export Sales Order",onClick:()=>{console.log("Export Sales Order clicked")}},{icon:e.jsx(_,{}),text:"Export Current View",onClick:()=>{console.log("Export Current View clicked")}},{icon:e.jsx(re,{color:"#4B5C79"}),text:"Refresh List",onClick:()=>{console.log("Refresh List clicked")}}];return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:x,className:"cursor-pointer",children:e.jsx(q,{})}),o&&e.jsx("div",{ref:u,className:"absolute top-16 right-6 mt-2 w-52 p-1 bg-white shadow-2xl z-10",children:e.jsx("ul",{className:"py-1 text-dropdownText",children:c.map((i,C)=>e.jsxs("div",{children:[e.jsxs("li",{onClick:i.onClick,className:"px-4 py-2 flex items-center gap-2 hover:bg-orange-100 rounded-md text-sm cursor-pointer",children:[i.icon,i.text]}),i.text==="Export Current View"&&e.jsx("div",{className:"pl-2 pr-2",children:e.jsx("hr",{className:"border-dropdownBorder"})})]},C))})})]})}function ye({}){const[o,d]=l.useState([]),{customerResponse:u}=l.useContext(z),{request:x}=I("get",5002),[m,c]=l.useState(""),[i,C]=l.useState(null),{loading:h,setLoading:n}=l.useContext(G),{customerEditResponse:f}=l.useContext(H),N=async()=>{try{n({...h,skeleton:!0});const r=`${R.GET_ALL_CUSTOMER}`,{response:p,error:v}=await x(r);!v&&p?(d(p.data),console.log(p,"all customers"),n({...h,skeleton:!1})):(console.log(v,"all customers error"),n({...h,skeleton:!1,noDataFound:!0}))}catch(r){console.error("Error fetching accounts:",r),n({...h,skeleton:!1,noDataFound:!0})}};l.useEffect(()=>{N()},[u,f]);const A=o.filter(r=>r.status==="Active").length,b=o.filter(r=>r.status==="Inactive").length,w=r=>{const p=[],v=new Set,E=new Set;return r.forEach(t=>{v.has(t.customerDisplayName)?E.has(t.customerDisplayName)||(p.push(t),E.add(t.customerDisplayName)):v.add(t.customerDisplayName)}),p},j=w(o).length,y=r=>{C(r)},D=o.filter(r=>i==="Active"?r.status==="Active":i==="Inactive"?r.status==="Inactive":i==="Duplicate"?w(o).some(p=>p.customerDisplayName===r.customerDisplayName):!0);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mx-5 my-4 space-y-4 flex items-center relative",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"font-bold text-2xl text-textColor",children:"Customer"}),e.jsx("p",{className:"text-sm text-gray mt-1",children:"A customer is a compiled record of all individuals or entities who have purchased or interacted with business"})]}),e.jsxs("div",{className:"ml-auto gap-3 flex items-center",children:[e.jsx(Q,{page:""}),e.jsx("div",{children:e.jsx(ce,{})})]})]}),e.jsx("div",{children:e.jsx(ae,{all:o.length,active:A,inactive:b,duplicate:j,onCardClick:y})}),e.jsx("div",{className:"px-6 mt-3",children:e.jsx("div",{className:"bg-white p-5",children:e.jsx(ne,{loading:h,customerData:D,searchValue:m,setSearchValue:c,refreshCustomers:N})})})]})}export{ye as default};
