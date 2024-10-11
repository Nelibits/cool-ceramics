import React from 'react';

const ThankYou = () => {
  return (
    <div className="container my-5 text-center">
      <h1>Thank You for Your Order!</h1>
      <p>Here are the instructions to pay:</p>
      <p>
        Please transfer the amount to the following bank account:<br />
        <strong>Bank Name:</strong> Your Bank<br />
        <strong>Account Number:</strong> 123456789<br />
        <strong>Account Name:</strong> Your Company Name<br />
        <strong>SWIFT/BIC:</strong> ABCDEF123<br />
      </p>
      <p>As soon as we receive the payment, we will ship your products.</p>
    </div>
  );
};

export default ThankYou;
