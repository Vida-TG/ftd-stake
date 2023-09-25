import React, { useState, useEffect } from 'react';
import { fromWei } from 'web3-utils';

function ViewPendingRewards({ contract, userAddress }) {
  const [pendingRewards, setPendingRewards] = useState('0');

  useEffect(() => {
    if (contract && userAddress) {
      fetchPendingRewards();
    }
  }, [contract, userAddress]);

  const fetchPendingRewards = async () => {
    try {
      const result = await contract.methods.getPendingHarvestRewards().call({ from: userAddress });
      setPendingRewards(fromWei(result, 'ether'));
    } catch (error) {
      console.error('Error fetching pending rewards:', error);
    }
  };

  return (
    <div>
      <h2>View Pending Rewards</h2>
      <p>Pending Rewards: {pendingRewards} ETH</p>
    </div>
  );
}

export default ViewPendingRewards;