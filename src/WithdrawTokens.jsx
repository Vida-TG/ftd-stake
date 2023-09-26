import React, { useState } from 'react';
import Modal from './Modal';

function WithdrawTokens({ contract }) {
  const [showSModal, setShowSModal] = useState(false);
  const [showEModal, setShowEModal] = useState(false);
  const [reason, setReason] = useState("Could not withdraw");
  
  const handleWithdraw = async () => {
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      console.log('Withdraw transaction hash:', tx.hash);
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
              <h3>Withdraw Staked Tokens and Rewards</h3>
          </div>
          <div className="stakeform">
              <p style={{marginTop:"40px", marginBottom:"40px"}}></p>
              <br/>
              <button onClick={handleWithdraw} id="claimRewardsBtn">Withdraw</button>
          </div>
      </div>
          { showSModal && <Modal text="Withdrawn successfully" status="success" /> }
          { showEModal && <Modal text={reason} status="error" /> }
    </div>
  );
}

export default WithdrawTokens;
