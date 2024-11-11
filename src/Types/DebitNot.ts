export interface DebitNoteBody {
    organizationId: string;
    supplierId: string;
    supplierDisplayName: string;
  
    sourceOfSupply: string;
    destinationOfSupply: string;
    taxMode: string;
  
    billId: string;
    billNumber: number | string;
    billDate: string; 
    billType: string;
    debitNote: string;
    orderNumber: string;
    supplierDebitDate: string; 
    subject: string;
  
    itemTable: {
      itemId: string;
      itemName: string;
      itemQuantity: number | string;
      itemCostPrice: number | string;
      itemTax: number | string;
      itemDiscount: number | string;
      itemDiscountType: string;
      itemAmount: number | string;
      itemSgst: number | string;
      itemCgst: number | string;
      itemIgst: number | string;
      itemSgstAmount: number | string;
      itemCgstAmount: number | string;
    }[];
  
    addNotes: string;
    attachFiles: string;
  
    subTotal: number | string;
    totalItem: number | string;
    sgst: number | string;
    cgst: number | string;
    transactionDiscount: number | string;
    transactionDiscountType: string;
    transactionDiscountAmount: number | string;
    totalTaxAmount: number | string;
    itemTotalDiscount: number | string;
    grandTotal: number | string;
  }
  