import React from 'react';

function ClaimRewards({ contract, userAddress }) {
  const handleClaimRewards = async () => {
    try {
      // Send the claim rewards transaction
      await contract.methods.claimRewards().send({ from: userAddress });
    } catch (error) {
      console.error('Error claiming rewards:', error);
    }
  };

  return (
    <div>
      <h2>Claim Rewards</h2>
      <button onClick={handleClaimRewards}>Claim</button>
    </div>
  );
}

export default ClaimRewards;
