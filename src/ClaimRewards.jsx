import React, { useState } from 'react';
import Modal from './Modal';

function ClaimRewards({ contract }) {
  const [showSModal, setShowSModal] = useState(false);
  const [showEModal, setShowEModal] = useState(false);
  const [reason, setReason] = useState("Could not claim rewards");

  const handleClaimRewards = async () => {
    try {
      const tx = await contract.claimRewards();
      await tx.wait();
      console.log('Claim Rewards transaction hash:', tx.hash);
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
              <h3>Claim Rewards</h3>
          </div>
          <div className="stakeform">
            
          <p style={{marginTop:"40px", marginBottom:"40px"}}></p>
              <br/>
              <button onClick={handleClaimRewards} id="claimRewardsBtn">Claim</button>
          </div>
      </div>
          { showSModal && <Modal text="Rewards claimed successfully" status="success" /> }
          { showEModal && <Modal text={reason} status="error" /> }
    </div>
  );
}

export default ClaimRewards;
