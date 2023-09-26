import React from 'react';

function Recommit({ contract }) {
  const handleRecommit = async () => {
    try {
      const tx = await contract.recommit();
      await tx.wait();
      console.log('Recommit transaction hash:', tx.hash);
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
