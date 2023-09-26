import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Modal from './Modal';

function ViewPendingRewards({ contract, userAddress }) {
  const [showSModal, setShowSModal] = useState(false);
  const [showEModal, setShowEModal] = useState(false);
  const [reason, setReason] = useState("Could not harvest");
  const [pendingRewards, setPendingRewards] = useState('0');

  useEffect(() => {
    if (contract && userAddress) {
      fetchPendingRewards();
    }
  }, [contract, userAddress]);

  const fetchPendingRewards = async () => {
    try {
      const result = await contract.getPendingHarvestRewards();
      setPendingRewards(ethers.formatEther(result));
      setShowSModal(true)
    } catch (error) {
      setReason(error.reason)
      setShowEModal(true)
    }
  };

  const harvestETH = async () => {
    try {
      const tx = await contract.harvestEth();
      await tx.wait();
      console.log('Harvest transaction hash:', tx.hash);
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
            <h3>Harvest</h3>
        </div>
        <div className="stakeform">
          <div className="stakeinput">
            <input type="text" id="stakeAmount" placeholder={`${pendingRewards} FTD is available to claim`} style={{borderRight: "none"}} disabled />
          </div>
            <br/>
            <button id="claimRewardsBtn" onClick={harvestETH}>Harvest</button>
        </div>
    </div>
          { showSModal && <Modal text="Harvested successfully" status="success" /> }
          { showEModal && <Modal text={reason} status="error" /> }
    </div>
  );
}

export default ViewPendingRewards;
