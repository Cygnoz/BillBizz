import{r,u as N,a as be,c as je,e as p,X as ve,j as e,L as ye,x as we,w as C,g as De,a9 as Ae,B as U,_ as y}from"./index-A_edQTkL.js";import{N as Te}from"./NewCustomerModal-CBewSJCy.js";import{V as Ce}from"./ViewMoreOrder-CD8tZ4F9.js";import{N as Ie}from"./NewSalesQuoteTable-D8MQ_3z3.js";import"./ScanEye-DNEuGJ6s.js";const V=()=>new Date().toISOString().split("T")[0],q=x=>new Date(x.getFullYear(),x.getMonth()+1,0).toISOString().split("T")[0],Se=(x,I)=>{const d=new Date(x);switch(I){case"Due on Receipt":return x;case"Due end of the month":const E=q(d),w=new Date(E);return w.setDate(w.getDate()+1),w.toISOString().split("T")[0];case"Due end of next month":const D=new Date(d.getFullYear(),d.getMonth()+2,0),S=q(D),b=new Date(S);return b.setDate(b.getDate()+1),b.toISOString().split("T")[0];case"Net 15":d.setDate(d.getDate()+15);break;case"Net 30":d.setDate(d.getDate()+30);break;case"Net 45":d.setDate(d.getDate()+45);break;case"Net 60":d.setDate(d.getDate()+60);break;default:return x}return d.toISOString().split("T")[0]},Q={customerId:"",customerName:"",placeOfSupply:"",reference:"",salesInvoice:"",salesInvoiceDate:V(),dueDate:V(),paymentMode:"Cash",paymentTerms:"Due on Receipt",deliveryMethod:"",expectedShipmentDate:"",salesOrderNumber:"",taxPreference:"Taxable",items:[{itemId:"",itemName:"",quantity:"",sellingPrice:"",taxPreference:"",taxGroup:"",cgst:"",sgst:"",igst:"",cgstAmount:"",sgstAmount:"",igstAmount:"",vatAmount:"",itemTotalTax:"",discountType:"Percentage",discountAmount:"",amount:"",itemAmount:"",salesAccountId:""}],totalItemDiscount:"",subtotalTotal:"",note:"",tc:"",otherExpenseAmount:"",otherExpenseReason:"",vehiclestring:"",freightAmount:"",roundOffAmount:"",otherExpenseAccountId:"",freightAccountId:"",paidAmount:"",depositAccountId:"",totalDiscount:"",discountTransactionType:"Percentage",discountTransactionAmount:"",transactionDiscount:"",subTotal:"",totalItem:"",cgst:"",sgst:"",igst:"",vat:"",totalTax:"",totalAmount:"",salesOrderId:""},Le=({page:x})=>{const[I,d]=r.useState(!1),[E,w]=r.useState(""),[D,S]=r.useState(null),[b,F]=r.useState([]),[o,Z]=r.useState([]),[j,P]=r.useState(""),[R,Y]=r.useState([]),[X,H]=r.useState([]),[O,B]=r.useState(!0),[J,K]=r.useState(""),[G,W]=r.useState([]),[t,h]=r.useState(Q);console.log(t,"as");const{request:k}=N("get",5002),{request:ee}=N("get",5004),{request:te}=N("get",5004),{request:se}=N("get",5007),{request:ae}=N("get",5001),{request:ne}=N("get",5007),le=be(),re=je(),oe=new URLSearchParams(re.search).get("id"),ce=async()=>{try{const s=`${p.GET_ONE_SALES_ORDER}/${oe}`,{response:a,error:n}=await ne(s);if(!n&&a){console.log(a.data,"response"),h(i=>({...i,...a.data,salesOrderNumber:a.data.salesOrder,salesOrderId:a.data._id}));const l=b.find(i=>i._id===a.data.customerId);l&&P(l)}}catch(s){console.log("Error in fetching bill",s)}};r.useEffect(()=>{const s=`${p.GET_ALL_CUSTOMER}`;T(s,F,k)},[]),r.useEffect(()=>{ce()},[j,o]);const $=()=>{le("/sales/invoice"),h(Q)},A=r.useRef({overLimit:!1,belowZero:!1}),u=s=>{const{name:a,value:n}=s.target,l=parseFloat(t==null?void 0:t.totalTax)||0,i=parseFloat(t.subtotalTotal+l)||0,g=parseFloat(t==null?void 0:t.totalAmount)||0;let c=parseFloat(t.discountTransactionAmount)||0;h(v=>{let f={...v,[a]:n};if(a==="paymentTerms")f.dueDate=Se(v.salesInvoiceDate,n);else if(a==="dueDate")f.paymentTerms="Custom";else if(a==="transactionDiscountType")if(f.discountTransactionType=n,n==="Percentage"){const m=c/i*100;m>100&&(y.error("Discount cannot exceed 100%"),c=0),f.discountTransactionAmount=m?m.toFixed(2):"0"}else{const m=c/100*i;f.discountTransactionAmount=m?m.toFixed(2):"0"}else if(a==="discountTransactionAmount")if(c=parseFloat(n)||0,v.discountTransactionType==="Percentage"){c>100&&(c=0,y.error("Discount cannot exceed 100%"));const m=c/100*i;f.discountTransactionAmount=c?c.toString():"0",f.transactionDiscount=m?m.toFixed(2):"0"}else c>i&&(c=i,y.error("Discount cannot exceed the subtotal amount")),f.discountTransactionAmount=c?c.toString():"0",f.transactionDiscount=c?c.toFixed(2):"0";else if(a==="paidAmount"){let m=parseFloat(n)||0;m>g?(A.current.overLimit||(y.error("Paid Amount cannot exceed Total Amount"),A.current.overLimit=!0),m=g):m<0?(A.current.belowZero||(y.error("Paid Amount cannot be less than 0"),A.current.belowZero=!0),m=0):(A.current.overLimit=!1,A.current.belowZero=!1),f.paidAmount=m.toString()}return f})};r.useEffect(()=>{new Date(t.dueDate)<new Date(t.salesInvoiceDate)&&h(s=>({...s,dueDate:t.salesInvoiceDate}))},[t.salesInvoiceDate]);const ie=()=>{const{totalItemDiscount:s,subtotalTotal:a,totalTax:n,roundOffAmount:l,otherExpenseAmount:i,freightAmount:g}=t;return(Number(a)+Number(i)+Number(n)+Number(g)-(Number(s)+Number(l))).toFixed(2)};r.useEffect(()=>{const s=ie(),{discountTransactionType:a,discountTransactionAmount:n="0",transactionDiscount:l="0"}=t,i=a==="Percentage"?Number(n)/100*Number(s):Number(n),g=Math.round(i*100)/100,c=Math.round((Number(s)-g)*100)/100;(Number(l)!==g||Number(t.totalAmount)!==c)&&h(v=>({...v,transactionDiscount:g.toFixed(2),totalAmount:c.toFixed(2)}))},[t.discountTransactionAmount,t.discountTransactionType,t.subtotalTotal,t.totalTax,t.totalItemDiscount,t.roundOffAmount,t.otherExpenseAmount,t.freightAmount]),r.useEffect(()=>{h(s=>({...s,totalDiscount:((parseFloat(s.totalItemDiscount)||0)+(parseFloat(s.transactionDiscount)||0)).toFixed(2)}))},[t.transactionDiscount,t.totalItemDiscount]);const de=s=>{s.taxType==="GST"?B(!0):B(!1)},ue=async()=>{try{const s=`${p.GET_COUNTRY_DATA}`,{response:a,error:n}=await te(s);!n&&a&&H(a.data[0].countries)}catch(s){console.log("Error in fetching Country",s)}},me=async()=>{try{const s=`${p.GET_INVOICE_PREFIX}`,{response:a,error:n}=await se(s);!n&&a?K(a.data):console.log(n)}catch(s){console.log("Error in fetching Purchase Order Prefix",s)}},xe=()=>{if(o.organizationCountry){const s=X.find(a=>a.name.toLowerCase()===o.organizationCountry.toLowerCase());if(o&&(t.placeOfSupply||h(a=>({...a,placeOfSupply:j.billingState}))),s){const a=s.states;Y(a)}else console.log("Country not found")}else console.log("No country selected")};r.useEffect(()=>{(t==null?void 0:t.placeOfSupply)!==o.state?d(!0):d(!1)},[t==null?void 0:t.placeOfSupply,o.state]);const T=async(s,a,n)=>{try{const{response:l,error:i}=await n(s);if(!i&&l){if(s.includes(p.GET_ONE_INVOICE)){const g=parseFloat(l.data.totalAmount)||0,c=parseFloat(l.data.discountTransactionAmount)||0;h(v=>({...v,...l.data,totalAmount:g.toFixed(2),discountTransactionAmount:c.toFixed(2)}))}else a(l.data);console.log(l.data,"Invoice fetched successfully")}else console.error("Error in response or no data received:",i)}catch(l){console.error("Error fetching data:",l)}};r.useEffect(()=>{const s=`${p.GET_ONE_ORGANIZATION}`,a=`${p.Get_ALL_Acounts}`;T(a,W,ae),T(s,Z,ee),xe(),ue(),me(),j&&de(j)},[j]);const z=((s,a,n)=>s.filter(l=>{var i;return(i=l[a])==null?void 0:i.toLowerCase().includes(n.toLowerCase())}))(b,"customerDisplayName",E),he=s=>{S(s===D?null:s);const a=`${p.GET_ALL_CUSTOMER}`;w(""),T(a,F,k)},_=r.useRef(null),M=s=>{_.current&&!_.current.contains(s.target)&&S(null)};r.useEffect(()=>(D!==null?document.addEventListener("mousedown",M):document.removeEventListener("mousedown",M),()=>{document.removeEventListener("mousedown",M)}),[D]);const{id:L}=ve(),{request:pe}=N("get",5007);r.useEffect(()=>{(async()=>{const a=`${p.GET_ALL_CUSTOMER}`,n=`${p.GET_ONE_INVOICE}/${L}`;await T(a,F,k),x==="edit"&&await T(n,h,pe)})()},[x,L]),r.useEffect(()=>{if(t.customerId&&b){const s=b.find(a=>a._id===t.customerId);s&&P(s)}},[t]);const{request:fe}=N("post",5007),{request:ge}=N("put",5007),Ne=async()=>{try{const s=x==="edit"?`${p.EDIT_SALES_INVOICE}/${L}`:`${p.ADD_SALES_INVOICE}`,a=x==="edit"?ge:fe,{response:n,error:l}=await a(s,t);!l&&n?(y.success(n.data.message),$()):y.error(l==null?void 0:l.response.data.message)}catch{}};return e.jsxs("div",{className:"px-8",children:[e.jsxs("div",{className:"flex gap-5",children:[e.jsx(ye,{to:"/sales/invoice",children:e.jsx("div",{className:"flex justify-center items-center h-11 w-11 bg-[#FFFFFF] rounded-full",children:e.jsx(we,{})})}),e.jsx("div",{className:"flex justify-center items-center",children:e.jsx("h4",{className:"font-bold text-xl text-textColor ",children:"New Invoice"})})]}),e.jsxs("div",{className:"grid grid-cols-12 gap-4 py-5 rounded-lg",children:[e.jsx("div",{className:"col-span-8",children:e.jsxs("div",{className:"bg-[#FFFFFF] p-5 min-h-max rounded-xl relative ",children:[e.jsx("p",{className:"text-textColor text-xl font-bold",children:"Enter Invoice details"}),e.jsxs("div",{className:" mt-5 space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-12 gap-4",children:[e.jsxs("div",{className:"col-span-5",children:[e.jsxs("label",{className:"text-sm mb-1 text-labelColor",children:["Select Customer ",e.jsx("span",{className:"text-[#bd2e2e] ",children:"*"})]}),e.jsxs("div",{className:"relative w-full",onClick:()=>he("customer"),children:[e.jsx("div",{className:`items-center flex appearance-none w-full h-9 text-zinc-400 bg-white border\r
                         border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer`,children:e.jsx("p",{children:(j==null?void 0:j.customerDisplayName)??"Select Customer"})}),e.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700",children:e.jsx(C,{color:"gray"})})]}),D==="customer"&&e.jsxs("div",{ref:_,className:"absolute z-10 bg-white  shadow  rounded-md mt-1 p-2   space-y-1 max-w-80 max-h-80 overflow-y-auto ",style:{width:"80%"},children:[e.jsx(De,{searchValue:E,onSearchChange:w,placeholder:"Serach customer"}),z?z.map(s=>e.jsxs("div",{className:`grid grid-cols-12 gap-1 p-2 hover:bg-gray-100\r
                                border border-slate-400 rounded-lg bg-lightPink`,onClick:()=>{h(a=>({...a,customerId:s._id,customerName:s.customerDisplayName})),S(null),P(s)},style:{cursor:"pointer"},children:[e.jsx("div",{className:"col-span-2 flex items-center justify-center",children:e.jsx("img",{src:"https://i.postimg.cc/MHdYrGVP/Ellipse-43.png",alt:""})}),e.jsx("div",{className:"col-span-10 flex",children:e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-sm",children:s.customerDisplayName}),s.mobile&&e.jsxs("p",{className:"text-xs text-gray-500",children:["Phone: ",s.mobile]})]})})]})):e.jsx(e.Fragment,{}),e.jsx("div",{className:"hover:bg-gray-100  cursor-pointer border border-slate-400 rounded-lg py-4",children:e.jsx(Te,{page:"purchase"})})]})]}),O&&e.jsxs("div",{className:"col-span-7",children:[e.jsxs("label",{className:"block text-sm mb-1 text-labelColor",children:["Place Of Supply ",e.jsx("span",{className:"text-[#bd2e2e] ",children:"*"})]}),e.jsxs("div",{className:"relative w-full",children:[e.jsxs("select",{name:"placeOfSupply",value:t.placeOfSupply,onChange:u,className:`block appearance-none w-full h-9 text-zinc-400 bg-white border\r
        border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight\r
        focus:outline-none focus:bg-white focus:border-gray-500`,children:[e.jsx("option",{value:"",disabled:!0,selected:!0,hidden:!0,children:"Select place Of Supply"}),R&&R.map((s,a)=>e.jsx("option",{value:s,className:"text-gray",children:s},a))]}),e.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700",children:e.jsx(C,{color:"gray"})})]})]}),e.jsxs("div",{className:`col-span-${O?"5":"7"} relative`,children:[e.jsx("label",{className:"block text-sm mb-1 text-labelColor",children:"Invoice#"}),e.jsx("input",{readOnly:!0,value:t.salesInvoice?t.salesInvoice:J,type:"text",className:"border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-9"})]}),e.jsx("div",{className:`col-span-${O?"7":"5"} relative`,children:e.jsxs("label",{className:"block text-sm  text-labelColor",children:["Sales Order Number",e.jsx("input",{name:"salesOrderNumber",readOnly:!0,id:"salesOrderNumber",value:t.salesOrderNumber,onChange:u,placeholder:"Enter Order Number",className:"border-inputBorder w-full text-sm border rounded text-dropdownText  mt-1 p-2 h-9 "})]})})]}),e.jsxs("div",{className:"grid grid-cols-12 gap-4",children:[e.jsxs("div",{className:"col-span-5 relative",children:[e.jsx("label",{className:"block text-sm mb-1 text-labelColor",children:"Reference#"}),e.jsx("input",{placeholder:"reference",type:"text",onChange:u,value:t==null?void 0:t.reference,name:"reference",className:"border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-9"})]}),e.jsxs("div",{className:"col-span-7",children:[e.jsx("label",{className:"block text-sm mb-1 text-labelColor",children:"Invoice Date"}),e.jsx("div",{className:"relative w-full",children:e.jsx("input",{type:"date",onChange:u,name:"salesInvoiceDate",value:t.salesInvoiceDate,className:"block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-2"})})]})]}),e.jsxs("div",{className:"grid grid-cols-12 gap-4",children:[e.jsxs("div",{className:"col-span-5",children:[e.jsx("label",{className:"block text-sm mb-1 text-labelColor",children:"Expected Shipment Date"}),e.jsx("div",{className:"relative w-full",children:e.jsx("input",{type:"date",onChange:u,name:"expectedShipmentDate",className:"block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-2",value:t==null?void 0:t.expectedShipmentDate})})]}),e.jsxs("div",{className:"col-span-7",children:[e.jsx("label",{className:"block text-sm mb-1 text-labelColor",children:"Due Date"}),e.jsx("div",{className:"relative w-full",children:e.jsx("input",{type:"date",onChange:u,name:"dueDate",value:t.dueDate,min:t.salesInvoiceDate,className:"block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-2"})})]})]}),e.jsxs("div",{className:"grid grid-cols-12 gap-4",children:[e.jsxs("div",{className:"col-span-5",children:[e.jsx("label",{className:"block text-sm mb-1 text-labelColor",children:"Payment Terms"}),e.jsxs("div",{className:"relative w-full",children:[e.jsxs("select",{value:t.paymentTerms,onChange:u,name:"paymentTerms",className:"block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500",children:[e.jsx("option",{value:"",className:"text-gray",children:"Select Payment Terms"}),e.jsx("option",{value:"Due on Receipt",selected:!0,children:"Due on Receipt"}),e.jsx("option",{value:"Due end of the month",children:"Due end of the month"}),e.jsx("option",{value:"Due end of next month",children:"Due end of next month"}),e.jsx("option",{value:"Pay Now",children:"Pay Now"}),e.jsx("option",{value:"Net 15",children:"Net 15"}),e.jsx("option",{value:"Net 30",children:"Net 30"}),e.jsx("option",{value:"Net 45",children:"Net 45"}),e.jsx("option",{value:"Net 60",children:"Net 60"}),e.jsx("option",{value:"Custom",children:"Custom"})]}),e.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700",children:e.jsx(C,{color:"gray"})})]})]}),e.jsxs("div",{className:"col-span-7",children:[e.jsx("label",{className:"block text-sm mb-1 text-labelColor",children:"Delivery Method"}),e.jsxs("div",{className:"relative w-full",children:[e.jsxs("select",{value:t.deliveryMethod,name:"deliveryMethod",onChange:u,className:"block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500",children:[e.jsx("option",{value:"",disabled:!0,hidden:!0,selected:!0,className:"text-gray",children:"Select Shipment Preference"}),e.jsx("option",{value:"Road",children:"Road"}),e.jsx("option",{value:"Rail",children:"Rail"}),e.jsx("option",{value:"Air",children:"Air"}),e.jsx("option",{value:"Sea",children:"Sea"})]}),e.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700",children:e.jsx(C,{color:"gray"})})]})]})]}),e.jsx("div",{className:"grid grid-cols-12 gap-4",children:e.jsxs("div",{className:"col-span-5",children:[e.jsx("label",{className:"block text-sm mb-1 text-labelColor",children:"Payment Mode"}),e.jsxs("div",{className:"relative w-full",children:[e.jsxs("select",{onChange:u,value:t.paymentMode,name:"paymentMode",className:`block appearance-none w-full h-9 text-zinc-400 bg-white border\r
                     border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500`,children:[e.jsx("option",{value:"Cash",className:"text-gray",children:"Cash"}),e.jsx("option",{value:"Card Transfer",className:"text-gray",children:"Card Transfer"}),e.jsx("option",{value:"UPI",className:"text-gray",children:"UPI"}),e.jsx("option",{value:"Credit",className:"text-gray",children:"Credit"})]}),e.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700",children:e.jsx(C,{color:"gray"})})]})]})}),e.jsxs("div",{className:"mt-9",children:[e.jsx("p",{className:"font-bold",children:"Add Item"}),e.jsx(Ie,{salesQuoteState:t,setSalesQuoteState:h,oneOrganization:o,isIntraState:I,isPlaceOfSupplyVisible:O})]})]}),e.jsx("div",{className:"mt-3",children:e.jsx(Ce,{page:"invoice",allAccounts:G,salesOrderState:t,setSalesOrderState:h})})]})}),e.jsx("div",{className:"col-span-4",children:e.jsxs("div",{className:"bg-secondary_main p-5 text-sm rounded-xl space-y-4 text-textColor",children:[e.jsx("div",{className:"text-sm",children:e.jsxs("label",{htmlFor:"",className:"",children:["Add Note",e.jsx("input",{onChange:u,value:t==null?void 0:t.note,name:"note",id:"",placeholder:"Note",className:"border-inputBorder w-full text-sm border rounded  p-2 h-[57px] mt-2 "})]})}),e.jsx("div",{className:"mt-4",children:e.jsxs("label",{htmlFor:"tc",className:"",children:["Terms & Conditions",e.jsx("input",{name:"tc",id:"tc",value:t.tc,onChange:u,placeholder:"Add Terms & Conditions of your business",className:"border-inputBorder w-full text-sm border rounded p-2 h-[57px] mt-2"})]})}),e.jsx("div",{className:"mt-4",children:e.jsxs("label",{className:"block mb-1",children:["Attach files to Sales Order",e.jsxs("div",{className:"border-dashed border border-neutral-300 p-2 rounded  gap-2 text-center h-[68px] mt-3",children:[e.jsxs("div",{className:"flex gap-1 justify-center items-center",children:[e.jsx(Ae,{}),e.jsx("span",{children:"Upload File"})]}),e.jsx("p",{className:"text-xs mt-1 text-gray-600",children:"Maximum File Size : 1MB"})]})]})}),e.jsxs("div",{className:" pb-4  text-dropdownText border-b-2 border-slate-200 space-y-2",children:[e.jsxs("div",{className:"flex ",children:[e.jsxs("div",{className:"w-[75%]",children:[" ",e.jsx("p",{children:"Sub Total"})]}),e.jsxs("div",{className:"w-full text-end",children:[" ",e.jsxs("p",{className:"text-end",children:["Rs"," ",t.subtotalTotal?t.subtotalTotal:"0.00"," "]})]})]}),e.jsxs("div",{className:"flex ",children:[e.jsxs("div",{className:"w-[75%]",children:[" ",e.jsx("p",{children:" Total Quantity"})]}),e.jsxs("div",{className:"w-full text-end",children:[" ",e.jsx("p",{className:"text-end",children:t.totalItem?t.totalItem:"0"})]})]}),e.jsxs("div",{className:"flex ",children:[e.jsx("div",{className:"w-[75%]",children:e.jsx("p",{children:" Total Item Discount"})}),e.jsx("div",{className:"w-full text-end",children:e.jsxs("p",{className:"text-end",children:[o.baseCurrency," ",t.totalDiscount?t.totalDiscount:"0.00"]})})]}),I?e.jsxs("div",{className:"flex ",children:[e.jsxs("div",{className:"w-[75%]",children:[" ",e.jsx("p",{children:" IGST"})]}),e.jsxs("div",{className:"w-full text-end",children:[" ",e.jsxs("p",{className:"text-end",children:[o.baseCurrency," ",t.igst?t.igst:"0.00"]})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex ",children:[e.jsxs("div",{className:"w-[75%]",children:[" ",e.jsx("p",{children:" SGST"})]}),e.jsxs("div",{className:"w-full text-end",children:[" ",e.jsxs("p",{className:"text-end",children:[o.baseCurrency," ",t.sgst?t.sgst:"0.00"]})]})]}),e.jsxs("div",{className:"flex mt-2",children:[e.jsxs("div",{className:"w-[75%]",children:[" ",e.jsx("p",{children:" CGST"})]}),e.jsxs("div",{className:"w-full text-end",children:[" ",e.jsxs("p",{className:"text-end",children:[o.baseCurrency," ",t.cgst?t.cgst:"0.00"]})]})]})]}),e.jsxs("div",{className:"flex ",children:[e.jsxs("div",{className:"w-[75%]",children:[" ",e.jsx("p",{children:" Total Tax"})]}),e.jsxs("div",{className:"w-full text-end",children:[" ",e.jsxs("p",{className:"text-end",children:[" ",o.baseCurrency," ",t==null?void 0:t.totalTax]})]})]}),e.jsxs("div",{className:"flex ",children:[e.jsxs("div",{className:"w-[75%]",children:[" ",e.jsx("p",{children:"Other Expense"})]}),e.jsxs("div",{className:"w-full text-end",children:[" ",e.jsxs("p",{className:"text-end",children:[o==null?void 0:o.baseCurrency," ",t.otherExpenseAmount?t.otherExpenseAmount:"0.00"]})]})]}),e.jsxs("div",{className:"flex ",children:[e.jsxs("div",{className:"w-[75%]",children:[" ",e.jsx("p",{children:"Fright"})]}),e.jsxs("div",{className:"w-full text-end",children:[" ",e.jsxs("p",{className:"text-end",children:[o==null?void 0:o.baseCurrency," ",t.freightAmount?t.freightAmount:"0.00"]})]})]}),e.jsxs("div",{className:"flex ",children:[e.jsxs("div",{className:"w-[75%]",children:[" ",e.jsx("p",{children:"Rount Off Amount"})]}),e.jsxs("div",{className:"w-full text-end",children:[" ",e.jsxs("p",{className:"text-end",children:[o.baseCurrency," ",t.roundOffAmount?t.roundOffAmount:"0.00"]})]})]}),e.jsxs("div",{className:"flex ",children:[e.jsxs("div",{className:"w-[150%]",children:[" ",e.jsx("p",{children:"Bill Discount"}),e.jsx("div",{className:""})]}),e.jsx("div",{className:" ",children:e.jsxs("div",{className:"border border-inputBorder rounded-lg flex items-center justify-center p-1 gap-1",children:[e.jsx("input",{onChange:u,value:t==null?void 0:t.discountTransactionAmount,name:"discountTransactionAmount",type:"number",step:"0.01",placeholder:"0",className:"w-[60px] focus:outline-none text-center"}),e.jsxs("select",{className:"text-xs text-zinc-400 bg-white relative",onChange:u,value:t==null?void 0:t.discountTransactionType,name:"transactionDiscountType",children:[e.jsx("option",{value:"Percentage",children:"%"}),e.jsx("option",{value:"Currency",children:o.baseCurrency})]})]})}),e.jsx("div",{className:"w-full text-end",children:e.jsxs("p",{className:"text-end",children:[o.baseCurrency," ",t.transactionDiscount?t.transactionDiscount:"0.00"]})})]})]}),e.jsxs("div",{className:"flex text-black my-4",children:[e.jsxs("div",{className:"w-[75%] font-bold",children:[" ",e.jsx("p",{children:"Total"})]}),e.jsxs("div",{className:"w-full text-end font-bold text-base",children:[" ",e.jsx("p",{className:"text-end",children:(t==null?void 0:t.totalAmount)&&`${o.baseCurrency} ${t.totalAmount}`})]})]}),(t==null?void 0:t.paymentMode)!=="Credit"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm mb-1 text-labelColor",children:"Deposit Account"}),e.jsxs("div",{className:"relative w-full",children:[e.jsxs("select",{onChange:u,value:t.depositAccountId,name:"depositAccountId",className:"block appearance-none w-full text-[#495160] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed",children:[e.jsx("option",{value:"",selected:!0,hidden:!0,disabled:!0,children:"Select Account"}),G.filter(s=>s.accountSubhead==="Bank"||s.accountSubhead==="Cash").map(s=>e.jsx("option",{value:s._id,children:s.accountName},s._id))]}),e.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700",children:e.jsx(C,{color:"gray"})})]})]}),e.jsx("div",{className:"text-sm",children:e.jsxs("label",{htmlFor:"vehiclestring",className:"",children:["Paid Amount",e.jsx("input",{value:t.paidAmount,name:"paidAmount",type:"number",onChange:u,placeholder:"Enter Paid Amount",className:"border-inputBorder w-full text-sm border rounded p-2 h-9 mt-2"})]})})]}),e.jsxs("div",{className:"flex gap-4 m-5 justify-end",children:[" ",e.jsx(U,{variant:"secondary",size:"sm",onClick:$,children:"Cancel"}),e.jsx(U,{variant:"primary",size:"sm",onClick:Ne,children:"Save & send"})," "]})]})})]})]})};export{Le as default};
