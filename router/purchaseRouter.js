const express = require("express")

const router = new express.Router()

const purchaseOrderController = require('../controller/purchaseOrderController');
const debitNoteController = require('../controller/debitNoteController'); 
const PaymentMadeController = require('../controller/paymentMadeController');
const purchaseSettingsController = require('../controller/purchaseSettingsController')
const billsCont = require('../controller/billsCont')

const checkPermission = require('../controller/permission')
const { verifyToken } = require('../controller/middleware');
// router.post('/add-purchaseOrder',verifyToken,checkPermission('Created a New Supplier'), purchaseOrderController.addPurchaseOrder);

//Purchase Order

router.post('/add-purchaseOrder', purchaseOrderController.addPurchaseOrder);
router.get('/get-last-purchase-order-prefix',purchaseOrderController.getLastPurchaseOrderPrefix)

// router.put('/get-all-purchaseOrders', purchaseOrderController.getAllPurchaseOrders);
// router.get('/get-purchaseOrder/:id', purchaseOrderController.getPurchaseOrder);
// router.put('/update-purchaseOrder/:id', purchaseOrderController.updatePurchaseOrder);
// router.delete('/delete-purchaseOrder/:id', purchaseOrderController.deletePurchaseOrder);

//Bills
router.post('/add-Bills',billsCont.addBill);
// router.put('/get-all-Bills',billsController.getAllPurchaseBills);
// router.get('/get-a-Bill/:id',billsController.getPurchaseBill)
// router.put('/update-Bill/:id',billsController.updatePurchaseBill)
// router.delete('/delete-Bill/:id',billsController.deletePurchaseBill)


//paymentmade
router.post('/addPayment', PaymentMadeController.addPurchasePayment);
router.get('/getAllPayments/:id', PaymentMadeController.getAllPurchasePayments );
router.get('/getPayment/:id', PaymentMadeController.getPurchasePayment);
router.put('/updatePayment/:id', PaymentMadeController.updatePurchasePayment);
router.delete('/deletePayment/:id', PaymentMadeController.deletePurchasePayment);

//Debit Note
router.post('/addDebitNote', debitNoteController.addDebitNote);
router.get('/getAllDebitNotes/:id', debitNoteController.getAllDebitNotes);
router.get('/getDebitNote/:id', debitNoteController.getDebitNoteById);
router.put('/updateDebitNote/:id', debitNoteController.updateDebitNote);
router.delete('/deleteDebitNote/:id', debitNoteController.deleteDebitNote);

// purchase settings
router.put('/add-purchase-settings',purchaseSettingsController.updatePurchaseSettings)

module.exports = router