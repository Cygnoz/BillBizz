import{r,j as e,aA as W,_ as P,u as v,X as Z,a as ee,L as se,x as te,w as L,g as ae,ae as ne,a9 as re,B as O,e as f}from"./index-A_edQTkL.js";import{N as le}from"./NewCustomerModal-CBewSJCy.js";function oe({customerReciept:d=[],recieptState:i,setRecieptState:D,page:h}){const[b,g]=r.useState([{invoiceId:"",salesInvoice:"",salesInvoiceDate:"",dueDate:"",totalAmount:0,balanceAmount:0,paymentAmount:0,paidStatus:""}]);r.useEffect(()=>{if(h==="edit")i!=null&&i.invoice&&i.invoice.length>0&&g([...i.invoice]);else if(d&&Array.isArray(d)){const l=d==null?void 0:d.filter(a=>a.paidStatus==="Pending"||a.paidStatus==="Overdue");g(l.map(a=>({invoiceId:a._id||"",salesInvoice:a.salesInvoice||"",salesInvoiceDate:a.salesInvoiceDate||"",dueDate:a.dueDate||"",totalAmount:a.totalAmount||0,balanceAmount:a.balanceAmount||0,paymentAmount:a.paymentAmount||0,paidStatus:a.paidStatus||""})))}},[d]);const u=(l,a,n)=>{const x=[...b],p=x[l].balanceAmount;let N=typeof n=="number"?n:parseFloat(n);if(a==="paymentAmount"&&(N>p&&(P.error(`Payment cannot exceed the total amount of ${p}. Setting payment to total amount.`),N=p),x[l][a]=N),g(x),D){const y=x.reduce((w,o)=>w+(o.paymentAmount||0),0);D(w=>({...w,invoice:x,total:y,amountReceived:y,amountUsedForPayments:y}))}};return e.jsxs("div",{children:[e.jsx("div",{className:"rounded-lg border-2 border-tableBorder mt-3",children:e.jsxs("table",{className:" text-xs min-w-full bg-white rounded-lg relative pb-4 border-dropdownText text-textColor",children:[e.jsx("thead",{className:"text-[12px] text-center text-dropdownText",children:e.jsx("tr",{className:"bg-[#FDF8F0]",children:W.map((l,a)=>e.jsx("th",{className:"py-3 px-4 font-medium border-b border-tableBorder relative",children:l},a))})}),e.jsx("tbody",{className:"text-dropdownText text-center text-[13px]",children:b&&b.length>0?b.map((l,a)=>e.jsxs("tr",{className:"relative",children:[e.jsx("td",{className:"py-2.5 px-4 border-y border-tableBorder",children:e.jsx("input",{disabled:!0,type:"text",placeholder:"Date",className:"w-full focus:outline-none text-center",value:l.salesInvoiceDate?l.salesInvoiceDate:"-",onChange:n=>u(a,"salesInvoiceDate",n.target.value)})}),e.jsx("td",{className:"py-2.5 px-4 border-y border-tableBorder",children:e.jsx("input",{disabled:!0,type:"text",placeholder:"Due Date",className:"w-full focus:outline-none text-center",value:l.dueDate?l.dueDate:"-",onChange:n=>u(a,"dueDate",n.target.value)})}),e.jsx("td",{className:"py-2.5 px-4 border-y border-tableBorder",children:e.jsx("input",{disabled:!0,type:"text",placeholder:"Bill ID",className:"w-full focus:outline-none text-center",value:l.salesInvoice?l.salesInvoice:"-",onChange:n=>u(a,"salesInvoice",n.target.value)})}),e.jsx("td",{className:"py-2.5 px-4 border-y border-tableBorder",children:e.jsx("input",{disabled:!0,type:"number",className:"w-full focus:outline-none text-center",value:l.totalAmount,onChange:n=>u(a,"totalAmount",parseFloat(n.target.value)||0)})}),e.jsx("td",{className:"py-2.5 px-4 border-y border-tableBorder",children:e.jsx("input",{disabled:!0,type:"number",className:"w-full focus:outline-none text-center",value:l.balanceAmount.toFixed(2),onChange:n=>u(a,"balanceAmount",parseFloat(n.target.value)||0)})}),e.jsx("td",{className:"py-2.5 px-4 border-y border-tableBorder",children:e.jsx("input",{type:"number",className:"w-full focus:outline-none text-center",value:l.paymentAmount,onChange:n=>u(a,"paymentAmount",parseFloat(n.target.value)||0)})})]},a)):e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"py-4 text-center text-gray-500 text-[red]",children:"There are no Invoice for this Customer."})})})]})}),e.jsxs("p",{className:"text-right text-textColor text-sm mt-4",children:["Total ",e.jsx("span",{className:"ms-20 font-semibold",children:i.total?i.total:"0"})]})]})}const ce={customerId:"",customerName:"",customerDisplayName:"",receipt:"",paymentDate:"",payment:"",paymentMode:"",depositAccountId:"",reference:"",invoice:[],note:"",attachments:"",createdDate:"",total:0,amountReceived:0,amountUsedForPayments:0},ue=({page:d})=>{const[i,D]=r.useState(""),[h,b]=r.useState(""),[g,u]=r.useState([]),[l,a]=r.useState([]),[n,x]=r.useState([]),[p,N]=r.useState([]),[y,w]=r.useState(""),[o,C]=r.useState(ce);console.log(o);const{request:R}=v("get",5002),{request:$}=v("get",5007),{request:q}=v("get",5001),{request:z}=v("post",5007),{request:G}=v("put",5007),{request:V}=v("get",5007),I=async(s,t,c)=>{try{const{response:m,error:j}=await c(s);!j&&m&&t(m.data)}catch(m){console.error("Error fetching data:",m)}},X=s=>{F(s===E?null:s);const t=`${f.GET_ALL_CUSTOMER}`;I(t,u,R)};r.useEffect(()=>{const s=p==null?void 0:p.filter(t=>t.paidStatus==="Pending"||t.paidStatus==="Overdue").reduce((t,c)=>t+c.grandTotal,0);C(t=>({...t,total:s}))},[p]);const H=async()=>{try{const s=`${f.GET_ALL_SALES_INVOICE}`,{response:t,error:c}=await $(s);if(c||!t){x([]);return}x(t.data||[])}catch(s){console.error("Error fetching invoices:",s),x([])}},Y=async()=>{try{const s=`${f.GET_LAST_SALES_RECIEPT_PREFIX}`,{response:t,error:c}=await V(s);!c&&t?w(t.data):console.log(c)}catch(s){console.log("Error in fetching Purchase Order Prefix",s)}};r.useEffect(()=>{H(),Y()},[]),r.useEffect(()=>{const s=`${f.Get_ALL_Acounts}`;I(s,a,q)},[]);const U=((s,t,c)=>s.filter(m=>{var j;return(j=m[t])==null?void 0:j.toLowerCase().includes(c.toLowerCase())}))(g,"customerDisplayName",i),A=s=>{const{name:t,value:c}=s.target;C(m=>({...m,[t]:c}))},[E,F]=r.useState(null),_=r.useRef(null),B=s=>{_.current&&!_.current.contains(s.target)&&F(null)},{id:T}=Z(),{request:J}=v("get",5007);r.useEffect(()=>{(async()=>{const t=`${f.GET_ALL_CUSTOMER}`,c=`${f.GET_ONE_SALES_RECIEPT}/${T}`;await I(t,u,R),d==="edit"&&await I(c,C,J)})()},[d,T]),r.useEffect(()=>{if(o.customerId&&g){const s=g.find(t=>t._id===o.customerId);s&&b(s)}},[o]);const K=async()=>{var s,t;try{const c=d==="edit"?`${f.EDIT_SALES_RECIEPT}/${T}`:`${f.ADD_SALES_RECIEPT}`,m=d==="edit"?G:z,{response:j,error:S}=await m(c,o);if(j&&!S){const{message:k}=j.data;P.success(k||"Receipt saved successfully!"),M(-1)}else{const k=((t=(s=S==null?void 0:S.response)==null?void 0:s.data)==null?void 0:t.message)||"An error occurred while saving.";P.error(k)}}catch(c){console.error("Error during save:",c),P.error("Unexpected error occurred. Please try again.")}};r.useEffect(()=>(E!==null?document.addEventListener("mousedown",B):document.removeEventListener("mousedown",B),()=>{document.removeEventListener("mousedown",B)}),[E]);const M=ee(),Q=()=>{M(-1)};return r.useEffect(()=>{if(h){const s=n==null?void 0:n.filter(t=>t.customerId===h._id);N(s)}},[h,n]),e.jsxs("div",{className:"px-8",children:[e.jsxs("div",{className:"flex gap-5",children:[e.jsx(se,{to:"/sales/receipt",children:e.jsx("div",{className:"flex justify-center items-center h-11 w-11 bg-[#FFFFFF] rounded-full",children:e.jsx(te,{})})}),e.jsx("div",{className:"flex justify-center items-center",children:e.jsx("h4",{className:"font-bold text-xl text-textColor ",children:"Invoice Payment"})})]}),e.jsxs("div",{className:"grid grid-cols-12 gap-4 py-5 rounded-lg",children:[e.jsx("div",{className:"col-span-8",children:e.jsx("div",{className:"bg-[#FFFFFF] p-5 min-h-max rounded-xl relative ",children:e.jsxs("div",{className:" mt-5 space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-12 gap-4",children:[e.jsxs("div",{className:"col-span-5",children:[e.jsxs("label",{className:"text-sm mb-1 text-labelColor",children:["Customer Name ",e.jsx("span",{className:"text-[#bd2e2e] ",children:"*"})]}),e.jsxs("div",{className:"relative w-full",onClick:()=>X("customer"),children:[e.jsx("div",{className:`items-center flex appearance-none w-full h-9 text-zinc-400 bg-white border\r
                         border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none\r
                          focus:bg-white focus:border-gray-500 cursor-pointer`,children:e.jsx("p",{children:(h==null?void 0:h.customerDisplayName)??"Select Customer"})}),e.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700",children:e.jsx(L,{color:"gray"})})]}),E==="customer"&&e.jsxs("div",{ref:_,className:`absolute z-10 bg-white  shadow  rounded-md mt-1 p-2  \r
                       space-y-1 max-w-80  max-h-80 overflow-y-auto`,style:{width:"80%"},children:[e.jsx(ae,{searchValue:i,onSearchChange:D,placeholder:"Serach customer"}),U?U.map(s=>e.jsxs("div",{className:`grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cursor-pointer\r
                                border border-slate-400 rounded-lg bg-lightPink`,onClick:()=>{C(t=>({...t,customerId:s._id,customerName:s.firstName,customerDisplayName:s.customerDisplayName})),F(null),b(s)},children:[e.jsx("div",{className:"col-span-2 flex items-center justify-center",children:e.jsx("img",{src:"https://i.postimg.cc/MHdYrGVP/Ellipse-43.png",alt:""})}),e.jsx("div",{className:"col-span-10 flex",children:e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-sm",children:s.customerDisplayName}),e.jsxs("p",{className:"text-xs text-gray-500",children:["Phone: ",s.mobile]})]})})]})):e.jsx(e.Fragment,{}),e.jsx("div",{className:"hover:bg-gray-100 cursor-pointer border border-slate-400 rounded-lg py-4",children:e.jsx(le,{page:"purchase"})})]})]}),e.jsxs("div",{className:"col-span-7",children:[e.jsx("label",{className:"block text-sm mb-1 text-labelColor",children:"Payment #"}),e.jsxs("div",{className:" flex items-center border rounded-lg border-inputBorder",children:[e.jsx("input",{onChange:A,value:o.receipt?o.receipt:y,readOnly:!0,type:"text",className:"w-full text-sm p-1.5 pl-2 h-9 border-none outline-none rounded-l-lg"}),e.jsx("div",{className:"p-1.5",children:e.jsx(ne,{color:"#495160"})})]})]})]}),e.jsxs("div",{className:"grid grid-cols-12 gap-4",children:[e.jsxs("div",{className:"col-span-5",children:[e.jsxs("label",{className:"block text-sm mb-1 text-labelColor",children:["Payment Date ",e.jsx("span",{className:"text-[#bd2e2e] ",children:"*"})]}),e.jsx("div",{className:"relative w-full",children:e.jsx("input",{onChange:A,name:"paymentDate",type:"date",className:`block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder\r
                       text-sm pl-2 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-2`,value:o.paymentDate})})]}),e.jsxs("div",{className:"col-span-7",children:[e.jsx("label",{className:"block text-sm mb-1 text-labelColor",children:"Reference#"}),e.jsx("input",{name:"reference",placeholder:"reference",type:"text",className:"border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-9"})]})]}),e.jsxs("div",{className:"grid grid-cols-12 gap-4",children:[e.jsxs("div",{className:"col-span-5",children:[e.jsxs("label",{className:"block text-sm mb-1 text-labelColor",children:["Payment Mode  ",e.jsx("span",{className:"text-[#bd2e2e] ",children:"*"})]}),e.jsxs("div",{className:"relative w-full",children:[e.jsxs("select",{onChange:A,value:o.paymentMode,name:"paymentMode",className:`block appearance-none w-full h-9  text-zinc-400 bg-white border\r
                     border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500`,children:[e.jsx("option",{value:"",className:"text-gray",children:"Select Payment Mode"}),e.jsx("option",{value:"Bank Transfer",className:"text-gray",children:"Bank Transfer"}),e.jsx("option",{value:"Cash",className:"text-gray",children:"Cash"}),e.jsx("option",{value:"Bank Transfer",className:"text-gray",children:"Check"}),e.jsx("option",{value:"Credit",className:"text-gray",children:"Card"})]}),e.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700",children:e.jsx(L,{color:"gray"})})]})]}),e.jsxs("div",{className:"col-span-7",children:[e.jsxs("label",{className:"block text-sm mb-1 text-labelColor",children:["Deposit To  ",e.jsx("span",{className:"text-[#bd2e2e] ",children:"*"})]}),e.jsxs("div",{className:"relative w-full",children:[e.jsxs("select",{onChange:A,value:o.depositAccountId,name:"depositAccountId",className:`block appearance-none w-full h-9  text-zinc-400 bg-white border\r
                       border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500`,children:[e.jsx("option",{children:"Select Payment Through"}),l.filter(s=>s.accountSubhead==="Bank"||s.accountSubhead==="Cash").map(s=>e.jsx("option",{value:s._id,children:s.accountName},s._id))]}),e.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700",children:e.jsx(L,{color:"gray"})})]})]})]}),e.jsx("p",{className:"font-bold text-sm",children:"Unpaid Invoices"}),e.jsx(oe,{customerReciept:p,recieptState:o,setRecieptState:C,page:d}),e.jsx("div",{className:"mt-5 text-textColor",children:e.jsxs("label",{htmlFor:"note",className:"text-sm",children:["Add Note",e.jsx("input",{name:"note",onChange:A,value:o.note,id:"note",placeholder:"Note",className:"border-inputBorder w-full text-sm border rounded  p-2 h-[57px] mt-2 "})]})}),e.jsx("div",{className:"text-sm mt-3  text-textColor hidden",children:e.jsxs("label",{className:"block mb-3",children:["Attachments",e.jsxs("div",{className:`border-inputBorder border-gray-800 w-full border-dashed border p-2 rounded \r
                  flex flex-col gap-2 justify-center items-center bg-white mb-4 mt-2`,children:[e.jsxs("span",{className:"text-center inline-flex items-center gap-2",children:[e.jsx(re,{}),"Upload File"]}),e.jsx("div",{className:"text-center",children:"Maximum File Size: 1 MB"})]}),e.jsx("p",{className:"text-xs mt-1 text-gray-600"}),e.jsx("p",{className:"text-xs mt-1 text-gray-600"}),e.jsx("input",{type:"file",className:"hidden",value:"",name:"documents"})]})})]})})}),e.jsxs("div",{className:"col-span-4 ",children:[e.jsx("div",{className:"bg-secondary_main p-5 min-h-max rounded-xl relative  mt-0  overflow-y-scroll hide-scrollbar",children:e.jsxs("div",{className:" pb-4  text-dropdownText  border-slate-200 space-y-2",children:[e.jsxs("div",{className:"flex w-full",children:[e.jsxs("div",{className:"flex-grow",children:[" ",e.jsx("p",{className:"whitespace-nowrap",children:"Amount Received"})]}),e.jsxs("div",{className:"flex-shrink-0",children:[" ",e.jsx("p",{className:"text-end",children:o.amountReceived?o.amountReceived:"0.00"})]})]}),e.jsxs("div",{className:"flex w-full",children:[e.jsx("div",{className:"flex-grow",children:e.jsx("p",{className:"whitespace-nowrap",children:"Amount Used for Payments"})}),e.jsx("div",{className:"flex-shrink-0",children:e.jsx("p",{children:o.amountUsedForPayments?o.amountUsedForPayments:"0.00"})})]})]})})," ",e.jsxs("div",{className:"flex gap-4 m-5 justify-end",children:[" ",e.jsx(O,{variant:"secondary",size:"sm",onClick:Q,children:"Cancel"}),e.jsx(O,{variant:"primary",size:"sm",onClick:K,children:"Save"})," "]})]})]})]})};export{ue as default};
