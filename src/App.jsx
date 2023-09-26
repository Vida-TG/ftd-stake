import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { fromWei } from 'web3-utils';
import WithdrawTokens from './WithdrawTokens';
import ClaimRewards from './ClaimRewards';
import Recommit from './Recommit';
import ViewPendingRewards from './ViewPendingRewards';
import StakeTokens from './StakeTokens';

import blob from './img/purpleblob.png'
import DashboardDet from './DashboardDet';
import Modal from './Modal';

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [tokenBalance, setTokenBalance] = useState('0')
  const [isConnected, setIsConnected] = useState(false);
  const [isValid, setIsValid] = useState(false)

  const contractAddress = '0x0173627B52159CB065978Dc79d19124bB1861126';
  const abi = [{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"stakedAmount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"harvestAmount","type":"uint256"}],"name":"HarvestEth","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardsAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"withdrawAmount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"newToken","type":"address"}],"name":"changeStakingToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"distributeRewards","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"ethHarvestActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPendingHarvestRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvestEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"hasStake","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"recommit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardPercentages","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"tier","type":"uint256"},{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_value","type":"bool"}],"name":"toggleEthHarvesting","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"toAddr","type":"address"}],"name":"withdrawStuckEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
  

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Provider = new ethers.BrowserProvider(window.ethereum)
        setProvider(web3Provider);

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Provider.listAccounts();
        setUserAddress(accounts[0].address);
        const signer = await web3Provider.getSigner()
        const contractInstance = new ethers.Contract(contractAddress, abi, signer);
        setContract(contractInstance);
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install a compatible wallet extension or use MetaMask.');
    }
  };

  const disconnectWallet = async () => {
    if (provider) {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      if (window.ethereum.selectedAddress) {
        const initiateContract = async () => {
          const web3Provider = new ethers.BrowserProvider(window.ethereum)
          setProvider(web3Provider);
          setUserAddress(window.ethereum.selectedAddress);
          const signer = await web3Provider.getSigner()
          const contractInstance = new ethers.Contract(contractAddress, abi, signer);
          setContract(contractInstance);
          setIsConnected(true);
        }
        initiateContract()
      }

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setProvider(null);
          setUserAddress('');
          setIsConnected(false);
        } else {
          setUserAddress(accounts[0]);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (provider && userAddress && contract) {
      const tokenAddress = '0xAc7Fa7D455fdAB8390C4aB9f793520521d266597';
      const tokenABI = [{"inputs":[{"internalType":"address","name":"_teamWallet","type":"address"},{"internalType":"address","name":"_v2Router","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"ExcludeFromFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":true,"internalType":"bool","name":"value","type":"bool"}],"name":"SetAutomatedMarketMakerPair","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiquidity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"}],"name":"UpdateUniswapV2Router","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newWallet","type":"address"},{"indexed":true,"internalType":"address","name":"oldWallet","type":"address"}],"name":"operationalWalletUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newWallet","type":"address"},{"indexed":true,"internalType":"address","name":"oldWallet","type":"address"}],"name":"teamWalletUpdated","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_isExcludedMaxTransactionAmount","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_addrs","type":"address[]"}],"name":"addPresaleWallets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"automatedMarketMakerPairs","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"blacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"lpAddress","type":"address"}],"name":"blacklistLiquidityPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"blacklistRenounced","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyLiquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyOperationalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyTeamFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyTotalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deadAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"disableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"excluded","type":"bool"}],"name":"excludeFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"updAds","type":"address"},{"internalType":"bool","name":"isEx","type":"bool"}],"name":"excludeFromMaxTransaction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isPresaleWallet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"limitsInEffect","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTransactionAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operationalWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"removeLimits","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_addrs","type":"address[]"}],"name":"removePresaleWallets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceBlacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellLiquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellOperationalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellPresaleLiquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellPresaleOperationalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellPresaleTeamFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellPresaleTotalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellTeamFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellTotalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"setAutomatedMarketMakerPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapTokensAtAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"teamWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensForLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensForOperations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensForTeam","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"unblacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_buyTeamFee","type":"uint256"},{"internalType":"uint256","name":"_buyLiquidityFee","type":"uint256"},{"internalType":"uint256","name":"_buyOperationalFee","type":"uint256"}],"name":"updateBuyFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newNum","type":"uint256"}],"name":"updateMaxTxnAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newNum","type":"uint256"}],"name":"updateMaxWalletAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newWallet","type":"address"}],"name":"updateOperationalWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_sellTeamFee","type":"uint256"},{"internalType":"uint256","name":"_sellLiquidityFee","type":"uint256"},{"internalType":"uint256","name":"_sellOperationalFee","type":"uint256"}],"name":"updateSellFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"enabled","type":"bool"}],"name":"updateSwapEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newAmount","type":"uint256"}],"name":"updateSwapTokensAtAmount","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newTeamWallet","type":"address"}],"name":"updateTeamWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"toAddr","type":"address"}],"name":"withdrawStuckEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawStuckFT500","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_to","type":"address"}],"name":"withdrawStuckToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]


      const approveSpending = async (amount) => {
        const signer = await provider.getSigner();
        const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
        const balance = await tokenContract.balanceOf(userAddress);
        if (parseInt(balance) >  10) setIsValid(true)
        else setIsValid(false)
        setTokenBalance(fromWei(balance, "ether"))
        try {
          const amountInWei = ethers.parseEther(amount.toString());
          const tx = await tokenContract.approve(contractAddress, amountInWei);
          await tx.wait();
          console.log('Approval transaction hash:', tx.hash);
        } catch (error) {
          console.error('Error approving spending:', error);
        }
      };

      approveSpending('100');
    }
  }, [provider, userAddress, contract]);

  if (isConnected) {
    return (
      <div className="App">

      { isValid ?
        (
          <div className="container">
            <img className="blob1" src={blob}/>
            <>
                <div className="desktopnav">
                    <div>
                        <h1>AI-POWERED<br/>SOCIALFI<br/>TRADING</h1>
                            <button className="point" onClick={disconnectWallet}>Disconnect Wallet</button>
                            <DashboardDet contract={contract} userAddress={userAddress} />
                    </div>
                </div>
                <nav>
                    <div className="logo">
                        <h4 className="logo">$FTD - AI <br/> Trading Bot</h4>
                    </div>
                    <div className="dashboard">
                        <button className="point dashboard" onClick={disconnectWallet} id="connectBtn">Disconnect</button>
                    </div>
                </nav>
            </>
            
            <div className="wrapper">
              <StakeTokens contract={contract} balance={tokenBalance} />
              <svg className="line" xmlns="http://www.w3.org/2000/svg" width="198" height="121" viewBox="0 0 198 121" fill="none">
                <path d="M1 1L197 120" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="6.56 6.56"/>
              </svg>
              <WithdrawTokens contract={contract} />
              <svg className="line" xmlns="http://www.w3.org/2000/svg" width="198" height="121" viewBox="0 0 198 121" fill="none">
                <path d="M1 1L197 120" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="6.56 6.56"/>
              </svg>
              <ClaimRewards contract={contract} />
              <svg className="line" xmlns="http://www.w3.org/2000/svg" width="198" height="121" viewBox="0 0 198 121" fill="none">
                <path d="M1 1L197 120" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="6.56 6.56"/>
              </svg>
              <Recommit contract={contract} />
              <svg className="line" xmlns="http://www.w3.org/2000/svg" width="198" height="121" viewBox="0 0 198 121" fill="none">
                <path d="M1 1L197 120" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="6.56 6.56"/>
              </svg>
              <ViewPendingRewards contract={contract} />
              <svg className="line" xmlns="http://www.w3.org/2000/svg" width="198" height="121" viewBox="0 0 198 121" fill="none">
                <path d="M1 1L197 120" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="6.56 6.56"/>
              </svg>
            </div>
          </div>
        )
      :
      <>
        <div className="desktopnav">
            <div>
                <h1>AI-POWERED<br/>SOCIALFI<br/>TRADING</h1>
                <button className="point" onClick={disconnectWallet}>Disconnect Wallet</button>
                <DashboardDet />
                
            </div>
        </div>
        <nav>
            <div className="logo">
                <h4 className="logo">$FTD - AI <br/> Trading Bot</h4>
            </div>
            <div className="dashboard">
                <button  className="point dashboard" onClick={disconnectWallet} id="connectBtn">Disconnect</button>
            </div>
        </nav>
        <Modal text="You need to hold FTD" status="error" />
      </>
      }
    </div>
    )
  }

  else {
    return (
      <>
                <div className="desktopnav">
                    <div>
                        <h1>AI-POWERED<br/>SOCIALFI<br/>TRADING</h1>
                            <button className='point' onClick={connectWallet}>Connect Wallet</button>
                            <DashboardDet />
                    </div>
                </div>
                <nav>
                    <div className="logo">
                        <h4 className="logo">$FTD - AI <br/> Trading Bot</h4>
                    </div>
                    <div className="dashboard">
                        <button  className="point dashboard" onClick={connectWallet} id="connectBtn">Connect</button>
                    </div>
                </nav>
                  
            <Modal text="Connect your wallet to continue" status="error" position="bottom" />
      </>
            
    );
  }
}

export default App;

