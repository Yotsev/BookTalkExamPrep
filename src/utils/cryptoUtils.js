exports.generatePaymentMethod = function (currentMethod) {
    const paymentMethods = [
        { key: 'crypto-wallet', lable: 'Crypto Wallet', selected: false },
        { key: 'credit-card', lable: 'Credit Card', selected: false },
        { key: 'debit-card', lable: 'Debit Card', selected: false },
        { key: 'paypal', lable: 'PayPal', selected: false },
    ];

    const result = paymentMethods.map(x => x.key === currentMethod ? { ...x, selected: true } : x);
    
    return result;
};