import React, { useState } from 'react';
import { ethers } from 'ethers';

function StakeTokens({ contract }) {
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeDuration, setStakeDuration] = useState('1');

  const handleStake = async () => {
    const amountInWei = ethers.parseEther(stakeAmount);
    const duration = parseInt(stakeDuration);
    
    try {
      const tx = await contract.stake(amountInWei, duration);
      await tx.wait();
      console.log('Stake transaction hash:', tx.hash);
    } catch (error) {
      console.error('Error staking tokens:', error);
    }
  };

  return (
    <div>
      <h2>Stake Tokens</h2>
      <input
        type="text"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(e.target.value)}
        placeholder="Amount to stake"
      />
      <select
        value={stakeDuration}
        onChange={(e) => setStakeDuration(e.target.value)}
        id="stakeDuration"
      >
        <option value="1">1 month</option>
        <option value="3">3 months</option>
        <option value="6">6 months</option>
        <option value="12">12 months</option>
      </select>
      <button id="stakeBtn" onClick={handleStake}>
        Stake
      </button>
    </div>
  );
}

export default StakeTokens;
