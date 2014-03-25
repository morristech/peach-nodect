exports.onceOffPaymentCallback = function(req, response) {
  console.log('once off transaction feedback for transaction with id:' +req.body['IDENTIFICATION.UNIQUEID']);
  response.send(200, 'https://peach-nodecpt.ngrok.com/transactionSuccess');
};

exports.peachCallback = function(req, response) {
  console.log('feedback received from peach');
  console.log(req.body);
  if (req.body['PROCESSING.RESULT']=='ACK') {
      if (req.body['PAYMENT.CODE']=='CC.RG') {
        //TODO
      } else if (req.body['PAYMENT.CODE']=='CC.DB') {
        exports.onceOffPaymentCallback(req, response);
      }
  } else {
    response.send(200, 'https://peach-nodecpt.ngrok.com/transactionFailure');
  }
};