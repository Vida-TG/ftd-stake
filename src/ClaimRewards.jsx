import React from 'react';

function ClaimRewards({ contract }) {
  const handleClaimRewards = async () => {
    try {
      const tx = await contract.claimRewards();
      await tx.wait();
      console.log('Claim Rewards transaction hash:', tx.hash);
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
