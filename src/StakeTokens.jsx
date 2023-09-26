import React, { useState } from 'react';
import { ethers } from 'ethers';
import Modal from './Modal';

function StakeTokens({ contract, balance }) {
  const [showSModal, setShowSModal] = useState(false);
  const [showEModal, setShowEModal] = useState(false);
  const [reason, setReason] = useState("Could not stake successfully");
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeDuration, setStakeDuration] = useState('1');

  const handleStake = async () => {
    const amountInWei = ethers.parseEther(stakeAmount);
    const duration = parseInt(stakeDuration);
    
    try {
      const tx = await contract.stake(amountInWei, duration);
      await tx.wait();
      console.log('Stake transaction hash:', tx.hash);
      setShowSModal(true)
    } catch (error) {
      setReason(error.reason)
      setShowEModal(true)
    }
  };

  return (
    <div className="wrap">
    <div className="contents">
        <div className="contentheading">
            <h3>Stake $FTD</h3>
        </div>
        <div className="stakeform">
        <div className="stakeinput">
            <input type="number" id="stakeAmount" placeholder="Amount to stake" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} />
            <select id="stakeDuration" value={stakeDuration} onChange={(e) => setStakeDuration(e.target.value)}>
                <option value="1">1 month</option>
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
            </select>
        </div>
        <div className="balance">
          <p><span className="ftdBal">{balance}</span><span className="f">FTD</span></p>
          <p onClick={() => setStakeAmount(balance)} className="point max">Max</p></div>
            <button className="point" id="stakeBtn" onClick={handleStake}>Stake</button>
        </div>
    </div>
          { showSModal && <Modal text="Staked successfully" status="success" /> }
          { showEModal && <Modal text={reason} status="error" /> }
    </div>
    
  );
}

export default StakeTokens;
