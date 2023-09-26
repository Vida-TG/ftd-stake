import React from 'react';

function WithdrawTokens({ contract }) {
  const handleWithdraw = async () => {
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      console.log('Withdraw transaction hash:', tx.hash);
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
