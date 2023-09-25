import React from 'react';

function WithdrawTokens({ contract, userAddress }) {
  const handleWithdraw = async () => {
    try {
      // Send the withdraw transaction
      await contract.methods.withdraw().send({ from: userAddress });
    } catch (error) {
      console.error('Error withdrawing tokens:', error);
    }
  };

  return (
    <div>
      <h2>Withdraw Staked Tokens and Rewards</h2>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
}

export default WithdrawTokens;
