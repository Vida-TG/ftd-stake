import React, { useState } from 'react';
import { toWei } from 'web3-utils';

function StakeTokens({ contract, userAddress }) {
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeDuration, setStakeDuration] = useState('1');

  const handleStake = async () => {
    const amountInWei = toWei(stakeAmount, "ether");
    console.log(amountInWei)
    const duration = parseInt(stakeDuration);
    try {
        console.log(amountInWei, duration, userAddress)
        const tx = await contract.methods.stake(amountInWei, duration).send({ from: userAddress });
        console.log('Stake transaction hash:', tx.transactionHash);
    } catch (error) {
      console.error('Error:', error);
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
