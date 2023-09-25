import React from 'react';

function Recommit({ contract, userAddress }) {
  const handleRecommit = async () => {
    try {
      // Send the recommit transaction
      await contract.methods.recommit().send({ from: userAddress });
    } catch (error) {
      console.error('Error recommitting:', error);
    }
  };

  return (
    <div>
      <h2>Recommit</h2>
      <button onClick={handleRecommit}>Recommit</button>
    </div>
  );
}

export default Recommit;
