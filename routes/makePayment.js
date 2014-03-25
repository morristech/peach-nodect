var request = require('request');

exports.makePayment = function(req, res){

  exports.getPaymentUrl(function(err, result) {
    res.render('makePayment', { peachFrameUrl: result });
  })

};

exports.getPaymentUrl = function(callback) {

  var transactionId = (new Date).getTime();

//You will need to supply values for these first four values
  var params = {
    'SECURITY.SENDER': process.env.securitySender,
    'USER.LOGIN': process.env.userLogin,
    'USER.PWD': process.env.userPwd,
    'TRANSACTION.CHANNEL': process.env.transactionChannel,
    'TRANSACTION.MODE': "INTEGRATOR_TEST",
    'REQUEST.VERSION': "1.0",
    'IDENTIFICATION.TRANSACTIONID': transactionId,
    'FRONTEND.ENABLED': "true",
    'FRONTEND.POPUP': "false",
    'FRONTEND.MODE': "DEFAULT",
    'FRONTEND.LANGUAGE': "en",
    'PAYMENT.CODE': "CC.DB",
    'FRONTEND.RESPONSE_URL': "http://peach-nodecpt.ngrok.com/peachCallback",
    'NAME.GIVEN': "Ian",
    'NAME.FAMILY': "Petzer",
    'ADDRESS.STREET': "My address",
    'ADDRESS.ZIP': "8001",
    'ADDRESS.CITY': "Cape Town",
    'ADDRESS.COUNTRY': "South Africa",
    'CONTACT.EMAIL': "peach@spam4.me",
    'PRESENTATION.AMOUNT': "99.00",
    'PRESENTATION.CURRENCY': "ZAR"
  }

  request.post('https://test.ctpe.net/frontend/payment.prc', {form: params}, function (err, res, body) {
    if (err) callback(err);

    var payload = {};
    body.split("&").forEach(function (responseParts) {
      var keyValues = responseParts.split('=');
      payload[keyValues[0]] = decodeURIComponent(keyValues[1]);
    });

    callback(null, payload['FRONTEND.REDIRECT_URL']);
  })

}