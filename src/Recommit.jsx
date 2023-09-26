import React, { useState } from 'react';
import Modal from './Modal';

function Recommit({ contract }) {
  const [showSModal, setShowSModal] = useState(false);
  const [showEModal, setShowEModal] = useState(false);
  const [reason, setReason] = useState("Could not recommit");

  const handleRecommit = async () => {
    try {
      const tx = await contract.recommit();
      await tx.wait();
      console.log('Recommit transaction hash:', tx.hash);
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
            <h3>Recommit</h3>
        </div>
        <div className="stakeform">
            
          <p style={{marginTop:"40px", marginBottom:"40px"}}></p>
            <br/>
            <button onClick={handleRecommit} id="claimRewardsBtn">Recommit</button>
        </div>
      </div>
          { showSModal && <Modal text="Recommitted successsfully" status="success" /> }
          { showEModal && <Modal text={reason} status="error" /> }
    </div>
  );
}

export default Recommit;
