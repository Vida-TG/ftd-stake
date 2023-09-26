import React, { useEffect, useState } from 'react'
import uniswap from './img/uniswap.png'
import Modal from './Modal';

const DashboardDet = ({contract, userAddress}) => {
  const [reason, setReason] = useState('');
  const [stakeDate, setStakeDate] = useState('');
  const [stakeDuration, setStakeDuration] = useState('');
  const [stakeCompletionDate, setStakeCompletionDate] = useState('');
  const [showEModal, setShowEModal] = useState(false);

  useEffect(() => {
    if (contract && userAddress) {
      fetchStakeDetails(contract, userAddress);
    }
  }, [contract, userAddress]);

  const fetchStakeDetails = async (contract, userAddress) => {
    try {
      const userStake = await contract.stakes(userAddress);
      let durationInSec = userStake.duration;
      let startTime = userStake.startTime;

      durationInSec = Number(durationInSec);
      startTime = Number(startTime);

      const duration = durationInSec / (24 * 60 * 60 * 30);

      const elapsedTime = (new Date().getTime() / 1000) - startTime;

      const startDate = new Date(startTime * 1000);
      const completionDate = new Date(startTime * 1000 + durationInSec * 1000);

      setStakeDate(startDate.toDateString());
      setStakeDuration(duration);
      setStakeCompletionDate(completionDate.toDateString());

    } catch (error) {
      setReason("Error getting active stakes")
      setShowEModal(true)
    }
  };
  return (
    <>
        <p>Welcome to the future of social trading with $FTD, an AI-powered trading dashboard & bot designed to optimize your interactions and investments on the FriendTech platform. Tokenomics & Trading algo 
          *designed and battle-tested using GPT*</p>
        <div className="leftIcons">
            <div><a href="https://x.com/friendtech500"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15.1708 1.875H17.9275L11.905 8.75833L18.99 18.125H13.4416L9.09662 12.4442L4.12495 18.125H1.36662L7.80828 10.7625L1.01245 1.875H6.69995L10.6275 7.0675L15.1691 1.875H15.1708ZM14.2033 16.475H15.7308L5.87078 3.43833H4.23162L14.2033 16.475Z" fill="#F8F8F8"/>
                </svg></a>
            </div>
            <div><a href="https://t.me/friendtech500"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10.0001 1.66669C5.40008 1.66669 1.66675 5.40002 1.66675 10C1.66675 14.6 5.40008 18.3334 10.0001 18.3334C14.6001 18.3334 18.3334 14.6 18.3334 10C18.3334 5.40002 14.6001 1.66669 10.0001 1.66669ZM13.8667 7.33335C13.7417 8.65002 13.2001 11.85 12.9251 13.325C12.8084 13.95 12.5751 14.1584 12.3584 14.1834C11.8751 14.225 11.5084 13.8667 11.0417 13.5584C10.3084 13.075 9.89175 12.775 9.18341 12.3084C8.35842 11.7667 8.89175 11.4667 9.36675 10.9834C9.49175 10.8584 11.6251 8.91669 11.6667 8.74169C11.6725 8.71518 11.6718 8.68766 11.6645 8.66152C11.6572 8.63538 11.6437 8.61141 11.6251 8.59169C11.5751 8.55002 11.5084 8.56669 11.4501 8.57502C11.3751 8.59169 10.2084 9.36669 7.93341 10.9C7.60008 11.125 7.30008 11.2417 7.03341 11.2334C6.73341 11.225 6.16675 11.0667 5.74175 10.925C5.21675 10.7584 4.80841 10.6667 4.84175 10.375C4.85841 10.225 5.06675 10.075 5.45841 9.91669C7.89175 8.85835 9.50841 8.15835 10.3167 7.82502C12.6334 6.85835 13.1084 6.69169 13.4251 6.69169C13.4917 6.69169 13.6501 6.70835 13.7501 6.79169C13.8334 6.85835 13.8584 6.95002 13.8667 7.01669C13.8584 7.06669 13.8751 7.21669 13.8667 7.33335Z" fill="#F8F8F8"/>
                </svg></a>
            </div>
            <div>
                <a href="https://app.uniswap.org/swap?&chain=mainnet&use=v2&outputCurrency=0xac7fa7d455fdab8390c4ab9f793520521d266597"><img src={uniswap} /></a>
            </div>
        </div>
          { showEModal && <Modal text={reason} status="error" /> }
          <div>
            <h2>Stake Information</h2>
            <p>Stake date: {stakeDate}</p>
            <p>Stake duration: {stakeDuration} months</p>
            <p>Expected completion date: {stakeCompletionDate}</p>
          </div>
    </>
  )
}

export default DashboardDet