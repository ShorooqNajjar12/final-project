import React from 'react';

const TransactionForm = ({
  recipient,
  amount,
  onRecipientChange,
  onAmountChange,
  onSubmit,
  transactionStatus,
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    onSubmit(); 
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Recipient:</label>
        <input
          type="text"
          value={recipient}
          onChange={onRecipientChange}
          required
        />
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={onAmountChange}
          required
        />
        <button type="submit">Send Money</button>
      </form>
      {transactionStatus && <p>{transactionStatus}</p>}
    </div>
  );
};

export default TransactionForm;
