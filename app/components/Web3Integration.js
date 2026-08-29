"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";

// Contract addresses
const CONTRACT_ADDRESS = "0x46D1Dc0753F202b70851E195c1d14CEA4a7D78b3";
const STAKING_CONTRACT_ADDRESS = "0x23eDd2D201D647870f2eC6fe7D1505Ccc95df8aF";
const SEPOLIA_CHAIN_ID = "0xaa36a7";

// Original token contract ABI - unchanged
const CONTRACT_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function presalePhases(uint256) view returns (string name, uint256 allocation, uint256 price, uint256 minPurchase, uint256 maxPurchase, uint256 soldAmount, bool active, uint256 bonusPercentage)",
  "function currentPresalePhase() view returns (uint256)",
  "function whitelist(address) view returns (bool)",
  "function stakes(address, uint256) view returns (uint256 amount, uint256 startTime, uint256 lockDuration, uint256 rewardMultiplier, bool claimed, uint256 uncertaintyGenerated)",
  "function totalStaked(address) view returns (uint256)",
  "function communityPoints(address) view returns (uint256)",
  "function getContractStats() view returns (uint256, uint256, uint256, uint256, uint256)",
  "function getUserStakes(address) view returns (tuple(uint256 amount, uint256 startTime, uint256 lockDuration, uint256 rewardMultiplier, bool claimed, uint256 uncertaintyGenerated)[])",
  "function calculatePendingReward(address, uint256) view returns (uint256)",
  "function getEntanglementInfo(address) view returns (uint256, uint256)",
  "function buyPresale() payable",
  "function stakeTokens(uint256 amount, uint256 lockDuration)",
  "function unstakeTokens(uint256 stakeIndex)",
  "function claimCommunityRewards()",
  "function claimTeamTokens()",
  "function createQuantumEntanglement(uint256 qtmAmount)",
  "function claimEntangledRewards()",
  "function breakQuantumEntanglement()",
  "event PresalePurchase(address indexed buyer, uint256 phase, uint256 amount, uint256 tokens, uint256 bonus)",
  "event TokensStaked(address indexed staker, uint256 amount, uint256 duration, uint256 stakeIndex)",
  "event TokensUnstaked(address indexed staker, uint256 amount, uint256 reward, uint256 stakeIndex)",
];

// New staking contract ABI v2.0
const STAKING_ABI = [
  "function quantumToken() view returns (address)",
  "function totalStaked() view returns (uint256)",
  "function totalStakers() view returns (uint256)",
  "function getUserStakeCount(address user) view returns (uint256)",
  "function getUserStake(address user, uint256 stakeIndex) view returns (uint256 amount, uint256 startTime, uint256 tier, uint256 quantumState, bool active)",
  "function previewRewards(address user, uint256 stakeIndex) view returns (uint256)",
  "function approvedAdmins(address) view returns (bool)",
  "function stake(uint256 amount, uint256 tier)",
  "function requestWithdrawal(uint256 stakeIndex)",
  "function executeWithdrawal(uint256 stakeIndex)",
  "event Staked(address indexed user, uint256 amount, uint256 tier, uint256 stakeIndex)",
  "event WithdrawalRequested(address indexed user, uint256 stakeIndex, uint256 amount, uint256 unlockTime)",
  "event Withdrawn(address indexed user, uint256 stakeIndex, uint256 amount, uint256 rewards)",
];

// Token approval ABI needed for new staking contract
const APPROVE_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
];

/**
 * Returns short, human-friendly messages for wallet, RPC, ethers, and Solidity errors.
 * The helper is fully client-side, so it is compatible with Next.js and Vercel.
 */
const getFriendlyErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  const code = error?.code ?? error?.info?.error?.code;
  const rawMessage = [
    error?.shortMessage,
    error?.reason,
    error?.message,
    error?.info?.error?.message,
    error?.data?.message,
  ]
    .filter(Boolean)
    .join(" ");
  const msg = rawMessage.toLowerCase();

  // Wallet interaction
  if (
    code === 4001 ||
    code === "ACTION_REJECTED" ||
    msg.includes("user rejected") ||
    msg.includes("user denied") ||
    msg.includes("rejected the request")
  ) {
    return "No worries! You cancelled the transaction. Try again whenever you're ready. 🙂";
  }

  // Wallet/network setup
  if (code === 4902 || msg.includes("unrecognized chain") || msg.includes("chain has not been added")) {
    return "Sepolia Testnet is not in your wallet yet. Add it, then try again. 🌐";
  }

  if (
    msg.includes("wrong network") ||
    msg.includes("unsupported chain") ||
    msg.includes("network mismatch") ||
    msg.includes("chain id")
  ) {
    return "Please switch MetaMask to Sepolia Testnet, then try again. 🌐";
  }

  if (msg.includes("metamask is not installed") || msg.includes("ethereum provider") || msg.includes("no provider")) {
    return "MetaMask was not found. Install or unlock MetaMask, then refresh this page. 🦊";
  }

  if (msg.includes("already processing eth_requestaccounts") || msg.includes("request already pending")) {
    return "Your wallet already has a request open. Please check MetaMask. 🦊";
  }

  // Balance, gas, and transaction cost
  if (
    msg.includes("insufficient funds") ||
    msg.includes("insufficient_funds") ||
    msg.includes("insufficient balance") ||
    msg.includes("gas * price + value") ||
    msg.includes("gas price + value")
  ) {
    return "You don't have enough Sepolia ETH to cover this purchase and gas fee. Get free test ETH, then try again! ⛽";
  }

  if (msg.includes("intrinsic gas too low") || msg.includes("gas required exceeds allowance")) {
    return "The network could not estimate enough gas for this transaction. Please try again in a moment. ⛽";
  }

  if (msg.includes("nonce too low") || msg.includes("replacement transaction underpriced") || msg.includes("already known")) {
    return "A wallet transaction is still pending. Wait for it to finish, then try again. ⏳";
  }

  if (msg.includes("transaction underpriced") || msg.includes("fee cap too low") || msg.includes("max fee per gas less than block base fee")) {
    return "The Sepolia network fee changed. Please try the transaction again. ⛽";
  }

  if (msg.includes("transaction expired") || msg.includes("expired")) {
    return "This transaction request expired. Please start it again. ⏳";
  }

  // Contract/business-rule errors
  if (msg.includes("not whitelisted") || msg.includes("not allowlisted")) {
    return "Your wallet isn't whitelisted for this presale phase yet. Ask in Telegram and we'll get you sorted! 💬 t.me/QuantumTokenChat";
  }

  if (msg.includes("presale is not active") || msg.includes("presale not active") || msg.includes("phase is not active")) {
    return "This presale phase is not active right now. Please check back shortly. 🔒";
  }

  if (msg.includes("presale has ended") || msg.includes("presale ended") || msg.includes("sale ended")) {
    return "This presale phase has ended. Please check the current phase and try again. 🔒";
  }

  if (msg.includes("minimum purchase") || msg.includes("below minimum") || msg.includes("amount too small")) {
    return "That amount is below the minimum purchase for this phase. Please increase it and try again. 📈";
  }

  if (msg.includes("maximum purchase") || msg.includes("above maximum") || msg.includes("amount too large")) {
    return "That amount is above the maximum purchase for this phase. Please enter a smaller amount. 📉";
  }

  if (msg.includes("allocation exceeded") || msg.includes("sold out") || msg.includes("not enough tokens available")) {
    return "This phase does not have enough QTM left for that purchase amount. Please try a smaller amount. ✨";
  }

  if (msg.includes("insufficient token balance") || msg.includes("transfer amount exceeds balance") || msg.includes("erc20: transfer amount exceeds balance")) {
    return "You don't have enough QTM available for that action. Please check your wallet balance. ✨";
  }

  if (
    msg.includes("insufficient allowance") ||
    msg.includes("transfer amount exceeds allowance") ||
    msg.includes("erc20insufficientallowance")
  ) {
    return "Please approve QTM for Quantum Staking V2 first, then try staking again. ✅";
  }

  if (msg.includes("stake still locked") || msg.includes("staking period has not ended") || msg.includes("stake is locked")) {
    return "Your stake is still locked. You can withdraw after its staking period ends. 🔒";
  }

  if (msg.includes("time-lock not expired") || msg.includes("timelock not expired") || msg.includes("withdrawal timelock")) {
    return "Your 2-hour security delay is still active. Please wait, then execute the withdrawal. ⏳";
  }

  if (msg.includes("no withdrawal request")) {
    return "Request your withdrawal first, then wait for the 2-hour security delay. ⏳";
  }

  if (msg.includes("already executed") || msg.includes("withdrawal already processed")) {
    return "This withdrawal was already completed. Check your wallet balance. ✅";
  }

  if (msg.includes("nothing to claim") || msg.includes("no rewards")) {
    return "There are no rewards available to claim yet. Please check back later. ✨";
  }

  if (msg.includes("execution reverted") || msg.includes("call exception") || code === "CALL_EXCEPTION") {
    return "This action is not available for your wallet right now. Please check the requirements and try again. ⚠️";
  }

  if (msg.includes("network error") || msg.includes("failed to fetch") || msg.includes("timeout") || msg.includes("503") || msg.includes("429")) {
    return "The Sepolia network is busy right now. Please wait a moment and try again. 🌐";
  }

  return fallback;
};

export default function Web3Integration() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [stakingContract, setStakingContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Original contract states - unchanged
  const [balance, setBalance] = useState("0");
  const [contractStats, setContractStats] = useState(null);
  const [userStakes, setUserStakes] = useState([]);
  const [presalePhase, setPresalePhase] = useState(null);
  const [entanglementInfo, setEntanglementInfo] = useState(null);

  // New staking v2 states
  const [v2Stakes, setV2Stakes] = useState([]);
  const [v2TotalStaked, setV2TotalStaked] = useState("0");
  const [v2TotalStakers, setV2TotalStakers] = useState("0");
  const [allowance, setAllowance] = useState("0");

  // Form states - 3 tiers only, removed 365
  const [stake30Amount, setStake30Amount] = useState("");
  const [stake90Amount, setStake90Amount] = useState("");
  const [stake180Amount, setStake180Amount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [entangleAmount, setEntangleAmount] = useState("");

  // Active tab for staking section
  const [activeStakingTab, setActiveStakingTab] = useState("v1");

  const checkConnection = useCallback(async () => {
    if (typeof window === "undefined") return;

    const provider = window?.ethereum;
    if (!provider || !provider.isMetaMask) return;

    try {
      const accounts = await provider.request({ method: "eth_accounts" });
      if (accounts && accounts.length > 0) {
        await connectWallet();
      }
    } catch (connectionError) {
      console.error("Error checking connection:", connectionError);
    }
  }, []);

  const loadContractData = useCallback(async () => {
    if (!contract || !account) return;

    try {
      setLoading(true);

      const userBalance = await contract.balanceOf(account);
      setBalance(ethers.formatEther(userBalance));

      const stats = await contract.getContractStats();
      setContractStats({
        totalSupply: ethers.formatEther(stats[0]),
        totalStaked: ethers.formatEther(stats[1]),
        totalPresaleSold: ethers.formatEther(stats[2]),
        totalCommunityRewards: ethers.formatEther(stats[3]),
        currentPhase: stats[4].toString(),
      });

      const currentPhase = await contract.currentPresalePhase();
      const phaseData = await contract.presalePhases(currentPhase);
      setPresalePhase({
        name: phaseData.name,
        price: ethers.formatEther(phaseData.price),
        minPurchase: ethers.formatEther(phaseData.minPurchase),
        maxPurchase: ethers.formatEther(phaseData.maxPurchase),
        active: phaseData.active,
      });

      const stakes = await contract.getUserStakes(account);
      setUserStakes(
        stakes
          .filter((stake) => Number(stake[0]) > 0)
          .map((stake, index) => ({
            index,
            amount: ethers.formatEther(stake[0]),
            startTime: new Date(Number(stake[1]) * 1000),
            lockDuration: Math.round(Number(stake[2]) / (24 * 3600)),
            rewardMultiplier: Number(stake[3]),
            claimed: stake[4],
            uncertaintyGenerated: ethers.formatEther(stake[5]),
          }))
      );

      try {
        const entanglementData = await contract.getEntanglementInfo(account);
        setEntanglementInfo({
          entangledAmount: ethers.formatEther(entanglementData[0]),
          pendingRewards: ethers.formatEther(entanglementData[1]),
        });
      } catch (entanglementError) {
        console.log("No entanglement data or cross-chain not enabled:", entanglementError);
        setEntanglementInfo(null);
      }
    } catch (loadError) {
      setError(getFriendlyErrorMessage(loadError, "We couldn't load your contract data. Please refresh and try again. 🔄"));
    } finally {
      setLoading(false);
    }
  }, [contract, account]);

  const loadV2StakingData = useCallback(async () => {
    if (!stakingContract || !account || !contract) return;

    try {
      const totalStaked = await stakingContract.totalStaked();
      const totalStakers = await stakingContract.totalStakers();
      setV2TotalStaked(ethers.formatEther(totalStaked));
      setV2TotalStakers(totalStakers.toString());

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tokenWithApprove = new ethers.Contract(CONTRACT_ADDRESS, APPROVE_ABI, signer);
      const userAllowance = await tokenWithApprove.allowance(account, STAKING_CONTRACT_ADDRESS);
      setAllowance(ethers.formatEther(userAllowance));

      const stakeCount = await stakingContract.getUserStakeCount(account);
      const stakes = [];
      for (let i = 0; i < Number(stakeCount); i += 1) {
        const stakeData = await stakingContract.getUserStake(account, i);
        const pendingRewards = await stakingContract.previewRewards(account, i);
        stakes.push({
          index: i,
          amount: ethers.formatEther(stakeData[0]),
          startTime: new Date(Number(stakeData[1]) * 1000),
          tier: Number(stakeData[2]),
          quantumState: Number(stakeData[3]),
          active: stakeData[4],
          pendingRewards: ethers.formatEther(pendingRewards),
        });
      }
      setV2Stakes(stakes);
    } catch (v2Error) {
      console.error("Failed to load v2 staking data:", v2Error);
    }
  }, [stakingContract, account, contract]);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  useEffect(() => {
    if (account && contract) loadContractData();
  }, [account, contract, loadContractData]);

  useEffect(() => {
    if (account && stakingContract && contract) loadV2StakingData();
  }, [account, stakingContract, contract, loadV2StakingData]);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      setError("MetaMask is not installed. Please install MetaMask to continue. 🦊");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: SEPOLIA_CHAIN_ID }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: SEPOLIA_CHAIN_ID,
                chainName: "Sepolia Testnet",
                nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
                rpcUrls: ["https://sepolia.infura.io/v3/"],
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          });
        } else {
          throw switchError;
        }
      }

      setAccount(accounts[0]);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setContract(new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
      setStakingContract(new ethers.Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, signer));
      setSuccess("Wallet connected successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (walletError) {
      setError(getFriendlyErrorMessage(walletError, "We couldn't connect your wallet. Please try again. 🦊"));
    } finally {
      setLoading(false);
    }
  };

  // ORIGINAL FUNCTIONS - logic preserved; only error presentation is human-friendly.
  const buyPresale = async () => {
    if (!contract || !buyAmount) return;

    try {
      setLoading(true);
      setError("");
      const tx = await contract.buyPresale({ value: ethers.parseEther(buyAmount) });
      setSuccess(`Presale purchase initiated! Transaction hash: ${tx.hash}`);
      await tx.wait();
      setSuccess("Presale purchase confirmed!");
      await loadContractData();
      setBuyAmount("");
    } catch (buyError) {
      setError(getFriendlyErrorMessage(buyError, "We couldn't complete your presale purchase. Please try again. ✨"));
    } finally {
      setLoading(false);
    }
  };

  const stakeTokens = async (amount, duration) => {
    if (!contract || !amount) return;

    try {
      setLoading(true);
      setError("");
      const amountWei = ethers.parseEther(amount);
      const durationSeconds = duration * 24 * 3600;
      const tx = await contract.stakeTokens(amountWei, durationSeconds);
      setSuccess(`Staking initiated! Transaction hash: ${tx.hash}`);
      await tx.wait();
      setSuccess(`Tokens staked successfully for ${duration} days!`);
      await loadContractData();
      if (duration === 30) setStake30Amount("");
      if (duration === 90) setStake90Amount("");
      if (duration === 180) setStake180Amount("");
    } catch (stakeError) {
      setError(getFriendlyErrorMessage(stakeError, "We couldn't stake your QTM. Please check your balance and try again. ✨"));
    } finally {
      setLoading(false);
    }
  };

  const unstakeTokens = async (stakeIndex) => {
    if (!contract) return;

    try {
      setLoading(true);
      setError("");
      const tx = await contract.unstakeTokens(stakeIndex);
      setSuccess(`Unstaking initiated! Transaction hash: ${tx.hash}`);
      await tx.wait();
      setSuccess("Tokens unstaked successfully!");
      await loadContractData();
    } catch (unstakeError) {
      setError(getFriendlyErrorMessage(unstakeError, "We couldn't complete your unstake request. Please try again. ✨"));
    } finally {
      setLoading(false);
    }
  };

  const createEntanglement = async () => {
    if (!contract || !entangleAmount) return;

    try {
      setLoading(true);
      setError("");
      const amount = ethers.parseEther(entangleAmount);
      const tx = await contract.createQuantumEntanglement(amount);
      setSuccess(`Quantum entanglement initiated! Transaction hash: ${tx.hash}`);
      await tx.wait();
      setSuccess("Quantum entanglement created successfully!");
      await loadContractData();
      setEntangleAmount("");
    } catch (entanglementError) {
      setError(getFriendlyErrorMessage(entanglementError, "We couldn't create the entanglement. Please try again. ✨"));
    } finally {
      setLoading(false);
    }
  };

  const claimEntangledRewards = async () => {
    if (!contract) return;

    try {
      setLoading(true);
      setError("");
      const tx = await contract.claimEntangledRewards();
      setSuccess(`Claiming entangled rewards! Transaction hash: ${tx.hash}`);
      await tx.wait();
      setSuccess("Entangled rewards claimed successfully!");
      await loadContractData();
    } catch (claimError) {
      setError(getFriendlyErrorMessage(claimError, "We couldn't claim your rewards. Please try again. ✨"));
    } finally {
      setLoading(false);
    }
  };

  const breakEntanglement = async () => {
    if (!contract) return;

    try {
      setLoading(true);
      setError("");
      const tx = await contract.breakQuantumEntanglement();
      setSuccess(`Breaking quantum entanglement! Transaction hash: ${tx.hash}`);
      await tx.wait();
      setSuccess("Quantum entanglement broken successfully!");
      await loadContractData();
    } catch (breakError) {
      setError(getFriendlyErrorMessage(breakError, "We couldn't break the entanglement. Please try again. ✨"));
    } finally {
      setLoading(false);
    }
  };

  // NEW STAKING V2 FUNCTIONS
  const approveV2Staking = async () => {
    if (!contract) return;

    try {
      setLoading(true);
      setError("");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tokenWithApprove = new ethers.Contract(CONTRACT_ADDRESS, APPROVE_ABI, signer);
      const tx = await tokenWithApprove.approve(STAKING_CONTRACT_ADDRESS, ethers.MaxUint256);
      setSuccess(`Approval initiated! Transaction hash: ${tx.hash}`);
      await tx.wait();
      setSuccess("Staking V2 contract approved!");
      await loadV2StakingData();
      setTimeout(() => setSuccess(""), 5000);
    } catch (approveError) {
      setError(getFriendlyErrorMessage(approveError, "We couldn't approve Quantum Staking V2. Please try again. ✅"));
    } finally {
      setLoading(false);
    }
  };

  const stakeV2 = async (amount, tier) => {
    if (!stakingContract || !amount) return;

    try {
      setLoading(true);
      setError("");
      const amountWei = ethers.parseEther(amount);
      const tx = await stakingContract.stake(amountWei, tier);
      setSuccess(`Staking V2 initiated! Transaction hash: ${tx.hash}`);
      await tx.wait();
      setSuccess(`Tokens staked in Quantum Staking V2 - Tier ${tier + 1}!`);
      await loadV2StakingData();
      if (tier === 0) setStake30Amount("");
      if (tier === 1) setStake90Amount("");
      if (tier === 2) setStake180Amount("");
      setTimeout(() => setSuccess(""), 5000);
    } catch (stakeError) {
      setError(getFriendlyErrorMessage(stakeError, "We couldn't stake your QTM in V2. Please try again. ✨"));
    } finally {
      setLoading(false);
    }
  };

  const requestV2Withdrawal = async (stakeIndex) => {
    if (!stakingContract) return;

    try {
      setLoading(true);
      setError("");
      const tx = await stakingContract.requestWithdrawal(stakeIndex);
      setSuccess(`Withdrawal requested! Transaction hash: ${tx.hash}`);
      await tx.wait();
      setSuccess("Withdrawal request submitted! Your 2-hour time-lock starts now.");
      await loadV2StakingData();
      setTimeout(() => setSuccess(""), 5000);
    } catch (requestError) {
      setError(getFriendlyErrorMessage(requestError, "We couldn't request your withdrawal. Please try again. ✨"));
    } finally {
      setLoading(false);
    }
  };

  const executeV2Withdrawal = async (stakeIndex) => {
    if (!stakingContract) return;

    try {
      setLoading(true);
      setError("");
      const tx = await stakingContract.executeWithdrawal(stakeIndex);
      setSuccess(`Withdrawal executing! Transaction hash: ${tx.hash}`);
      await tx.wait();
      setSuccess("Tokens withdrawn successfully with quantum rewards!");
      await loadV2StakingData();
      setTimeout(() => setSuccess(""), 5000);
    } catch (executeError) {
      setError(getFriendlyErrorMessage(executeError, "We couldn't execute your withdrawal. Please try again. ✨"));
    } finally {
      setLoading(false);
    }
  };

  // HELPER FUNCTIONS - unchanged
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getAPYForDuration = (days) => {
    if (days === 180) return "18%";
    if (days === 90) return "15%";
    return "12%";
  };

  const getMultiplierText = (days) => {
    if (days === 180) return "1.5x";
    if (days === 90) return "1.25x";
    return "1.0x";
  };

  const getTierLabel = (tier) => {
    if (tier === 0) return "30 days";
    if (tier === 1) return "90 days";
    return "180 days";
  };

  const PendingRewards = ({ rewardContract, rewardAccount, stakeIndex, stake }) => {
    const [pendingReward, setPendingReward] = useState("0");

    useEffect(() => {
      const fetchPendingReward = async () => {
        if (!rewardContract || !rewardAccount || stake.claimed) {
          setPendingReward("0");
          return;
        }

        try {
          const reward = await rewardContract.calculatePendingReward(rewardAccount, stakeIndex);
          setPendingReward(ethers.formatEther(reward));
        } catch (rewardError) {
          console.log("Failed to fetch pending reward:", rewardError);
          setPendingReward("0");
        }
      };

      fetchPendingReward();
      const interval = setInterval(fetchPendingReward, 30000);
      return () => clearInterval(interval);
    }, [rewardContract, rewardAccount, stakeIndex, stake.claimed]);

    return <span className="text-yellow-400">{parseFloat(pendingReward).toFixed(4)} QTM</span>;
  };

  return (
    <section className="quantum-section bg-gray-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 quantum-title">
            <span className="quantum-text-gradient">Web3 Interface</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Connect your MetaMask wallet and interact with the QTM smart contracts
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="quantum-card mb-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Wallet Connection</h3>
                {account ? (
                  <div className="space-y-2">
                    <p className="text-green-400">Connected: {formatAddress(account)}</p>
                    <p className="text-gray-300">Balance: {balance} QTM</p>
                  </div>
                ) : (
                  <p className="text-red-400">Not connected</p>
                )}
              </div>
              {!account && (
                <motion.button
                  onClick={connectWallet}
                  disabled={loading}
                  className="quantum-button mt-4 md:mt-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? "Connecting..." : "Connect MetaMask"}
                </motion.button>
              )}
            </div>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 text-red-300"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6 text-green-300"
            >
              {success}
            </motion.div>
          )}

          {account && contract && (
            <>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="quantum-card"
                >
                  <h3 className="text-xl font-semibold mb-4 quantum-text-gradient">Contract Statistics</h3>
                  {contractStats && (
                    <div className="space-y-3">
                      <div className="flex justify-between"><span>Total Supply:</span><span>{parseFloat(contractStats.totalSupply).toLocaleString()} QTM</span></div>
                      <div className="flex justify-between"><span>Total Staked:</span><span>{parseFloat(contractStats.totalStaked).toLocaleString()} QTM</span></div>
                      <div className="flex justify-between"><span>Presale Sold:</span><span>{parseFloat(contractStats.totalPresaleSold).toLocaleString()} QTM</span></div>
                      <div className="flex justify-between"><span>Current Phase:</span><span>{contractStats.currentPhase}</span></div>
                      <div className="border-t border-blue-500/20 pt-3 mt-3">
                        <div className="flex justify-between"><span className="text-cyan-400">V2 Staking Total:</span><span className="text-cyan-400">{parseFloat(v2TotalStaked).toLocaleString()} QTM</span></div>
                        <div className="flex justify-between"><span className="text-cyan-400">V2 Stakers:</span><span className="text-cyan-400">{v2TotalStakers}</span></div>
                      </div>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="quantum-card"
                >
                  <h3 className="text-xl font-semibold mb-4 quantum-text-gradient">Buy Presale</h3>
                  {presalePhase && (
                    <div className="space-y-4">
                      <div className="text-sm text-gray-400">
                        <p>Phase: {presalePhase.name}</p>
                        <p>Price: {presalePhase.price} ETH per token</p>
                        <p>Min: {presalePhase.minPurchase} ETH | Max: {presalePhase.maxPurchase} ETH</p>
                      </div>
                      <input type="number" placeholder="Amount in ETH" value={buyAmount} onChange={(e) => setBuyAmount(e.target.value)} className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-full text-white" step="0.01" />
                      <motion.button onClick={buyPresale} disabled={loading || !buyAmount || !presalePhase.active} className="w-full quantum-button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        {loading ? "Processing..." : "Buy QTM"}
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
                <div className="flex gap-4 mb-6">
                  <button onClick={() => setActiveStakingTab("v1")} className={`px-6 py-2 rounded-full transition-all ${activeStakingTab === "v1" ? "quantum-gradient text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}>Staking V1</button>
                  <button onClick={() => setActiveStakingTab("v2")} className={`px-6 py-2 rounded-full transition-all ${activeStakingTab === "v2" ? "quantum-gradient text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}>Quantum Staking V2</button>
                </div>

                {activeStakingTab === "v1" && (
                  <div className="grid md:grid-cols-3 gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="quantum-card">
                      <h4 className="text-lg font-semibold mb-2 text-blue-400">30 Days</h4>
                      <div className="text-sm text-gray-400 mb-4"><p>APY: 12%</p><p>Multiplier: 1.0x</p></div>
                      <input type="number" placeholder="Amount" value={stake30Amount} onChange={(e) => setStake30Amount(e.target.value)} className="w-full p-2 mb-3 bg-gray-800/50 border border-blue-500/30 rounded-full text-white text-sm" />
                      <motion.button onClick={() => stakeTokens(stake30Amount, 30)} disabled={loading || !stake30Amount} className="w-full quantum-button text-sm" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{loading ? "Processing..." : "Stake 30D"}</motion.button>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="quantum-card">
                      <h4 className="text-lg font-semibold mb-2 text-green-400">90 Days</h4>
                      <div className="text-sm text-gray-400 mb-4"><p>APY: 15%</p><p>Multiplier: 1.25x</p></div>
                      <input type="number" placeholder="Amount" value={stake90Amount} onChange={(e) => setStake90Amount(e.target.value)} className="w-full p-2 mb-3 bg-gray-800/50 border border-green-500/30 rounded-full text-white text-sm" />
                      <motion.button onClick={() => stakeTokens(stake90Amount, 90)} disabled={loading || !stake90Amount} className="w-full quantum-button text-sm" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{loading ? "Processing..." : "Stake 90D"}</motion.button>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="quantum-card">
                      <h4 className="text-lg font-semibold mb-2 text-purple-400">180 Days</h4>
                      <div className="text-sm text-gray-400 mb-4"><p>APY: 18%</p><p>Multiplier: 1.5x</p></div>
                      <input type="number" placeholder="Amount" value={stake180Amount} onChange={(e) => setStake180Amount(e.target.value)} className="w-full p-2 mb-3 bg-gray-800/50 border border-purple-500/30 rounded-full text-white text-sm" />
                      <motion.button onClick={() => stakeTokens(stake180Amount, 180)} disabled={loading || !stake180Amount} className="w-full quantum-button text-sm" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{loading ? "Processing..." : "Stake 180D"}</motion.button>
                    </motion.div>
                  </div>
                )}

                {activeStakingTab === "v2" && (
                  <div>
                    {parseFloat(allowance) === 0 && (
                      <div className="quantum-card bg-yellow-500/10 border-yellow-500/30 mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-yellow-400">Approval Required</h4>
                        <p className="text-sm text-gray-300 mb-4">Approve the Quantum Staking V2 contract before staking.</p>
                        <motion.button onClick={approveV2Staking} disabled={loading} className="quantum-button" whileHover={{ scale: 1.02 }}>{loading ? "Approving..." : "Approve Staking V2"}</motion.button>
                      </div>
                    )}
                    <div className="grid md:grid-cols-3 gap-6">
                      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="quantum-card">
                        <h4 className="text-lg font-semibold mb-2 text-blue-400">30 Days Tier 1</h4>
                        <div className="text-sm text-gray-400 mb-4"><p className="text-cyan-400 font-bold">12-24% APY</p><p>Quantum probabilistic rewards</p></div>
                        <input type="number" placeholder="Amount" value={stake30Amount} onChange={(e) => setStake30Amount(e.target.value)} className="w-full p-2 mb-3 bg-gray-800/50 border border-blue-500/30 rounded-full text-white text-sm" />
                        <motion.button onClick={() => stakeV2(stake30Amount, 0)} disabled={loading || !stake30Amount || parseFloat(allowance) === 0} className="w-full quantum-button text-sm" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{loading ? "Processing..." : "Stake V2 30D"}</motion.button>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="quantum-card">
                        <h4 className="text-lg font-semibold mb-2 text-green-400">90 Days Tier 2</h4>
                        <div className="text-sm text-gray-400 mb-4"><p className="text-green-400 font-bold">12-24% APY</p><p>Better probability of max APY</p></div>
                        <input type="number" placeholder="Amount" value={stake90Amount} onChange={(e) => setStake90Amount(e.target.value)} className="w-full p-2 mb-3 bg-gray-800/50 border border-green-500/30 rounded-full text-white text-sm" />
                        <motion.button onClick={() => stakeV2(stake90Amount, 1)} disabled={loading || !stake90Amount || parseFloat(allowance) === 0} className="w-full quantum-button text-sm" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{loading ? "Processing..." : "Stake V2 90D"}</motion.button>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="quantum-card">
                        <h4 className="text-lg font-semibold mb-2 text-purple-400">180 Days Tier 3</h4>
                        <div className="text-sm text-gray-400 mb-4"><p className="text-purple-400 font-bold">12-24% APY</p><p>Highest chance of 24% APY</p></div>
                        <input type="number" placeholder="Amount" value={stake180Amount} onChange={(e) => setStake180Amount(e.target.value)} className="w-full p-2 mb-3 bg-gray-800/50 border border-purple-500/30 rounded-full text-white text-sm" />
                        <motion.button onClick={() => stakeV2(stake180Amount, 2)} disabled={loading || !stake180Amount || parseFloat(allowance) === 0} className="w-full quantum-button text-sm" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{loading ? "Processing..." : "Stake V2 180D"}</motion.button>
                      </motion.div>
                    </div>

                    {v2Stakes.length > 0 && (
                      <div className="quantum-card mt-6">
                        <h3 className="text-xl font-semibold mb-4 quantum-text-gradient">Your V2 Stakes</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead><tr className="border-b border-blue-500/30"><th className="text-left p-2">Amount</th><th className="text-left p-2">Tier</th><th className="text-left p-2">Quantum State</th><th className="text-left p-2">Est. Rewards</th><th className="text-left p-2">Start Date</th><th className="text-left p-2">Status</th><th className="text-left p-2">Action</th></tr></thead>
                            <tbody>
                              {v2Stakes.map((stake) => (
                                <tr key={stake.index} className="border-b border-gray-700/30">
                                  <td className="p-2">{parseFloat(stake.amount).toFixed(2)} QTM</td><td className="p-2">{getTierLabel(stake.tier)}</td><td className="p-2 text-purple-400">{stake.quantumState}</td><td className="p-2 text-yellow-400">{parseFloat(stake.pendingRewards).toFixed(4)} QTM</td><td className="p-2">{stake.startTime.toLocaleDateString()}</td><td className="p-2">{stake.active ? <span className="text-green-400">Active</span> : <span className="text-gray-400">Withdrawn</span>}</td>
                                  <td className="p-2">{stake.active && <button onClick={() => requestV2Withdrawal(stake.index)} disabled={loading} className="text-blue-400 hover:text-blue-300 text-xs">Request Withdrawal</button>}{stake.active && <button onClick={() => executeV2Withdrawal(stake.index)} disabled={loading} className="block text-green-400 hover:text-green-300 text-xs">Execute Withdrawal</button>}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">Higher Quantum State = better probability of max APY. 2-hour time-lock after withdrawal request.</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="quantum-card mb-8">
                <h3 className="text-xl font-semibold mb-4 quantum-text-gradient">Quantum Entanglement</h3>
                <p className="text-sm text-gray-400 mb-4">Lock QTM tokens for PARADOX integration 150% rewards</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">Create Entanglement</h4>
                    <div className="flex gap-3"><input type="number" placeholder="Amount to entangle" value={entangleAmount} onChange={(e) => setEntangleAmount(e.target.value)} className="flex-1 p-3 bg-gray-800/50 border border-blue-500/30 rounded-full text-white" /><motion.button onClick={createEntanglement} disabled={loading || !entangleAmount} className="quantum-button w-40" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{loading ? "Processing..." : "Entangle"}</motion.button></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">Your Entanglements</h4>
                    {entanglementInfo ? (
                      <div className="space-y-3"><div className="bg-gray-800/30 p-3 rounded-lg"><div className="flex justify-between text-sm"><span>Entangled Amount</span><span className="text-purple-400">{entanglementInfo.entangledAmount} QTM</span></div><div className="flex justify-between text-sm"><span>Pending Rewards</span><span className="text-green-400">{entanglementInfo.pendingRewards} QTM</span></div></div><div className="flex gap-2"><motion.button onClick={claimEntangledRewards} disabled={loading || entanglementInfo.pendingRewards === "0"} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-full text-sm transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Claim Rewards</motion.button><motion.button onClick={breakEntanglement} disabled={loading || entanglementInfo.entangledAmount === "0"} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-full text-sm transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Break Entanglement</motion.button></div></div>
                    ) : <div className="text-gray-500 text-sm">No active entanglements</div>}
                  </div>
                </div>
              </motion.div>

              {userStakes.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="quantum-card">
                  <h3 className="text-xl font-semibold mb-4 quantum-text-gradient">Your V1 Stakes</h3>
                  <div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b border-blue-500/30"><th className="text-left p-2">Amount</th><th className="text-left p-2">Duration</th><th className="text-left p-2">APY</th><th className="text-left p-2">Pending Rewards</th><th className="text-left p-2">Start Date</th><th className="text-left p-2">Status</th><th className="text-left p-2">Action</th></tr></thead><tbody>{userStakes.map((stake, index) => <tr key={index} className="border-b border-gray-700/30"><td className="p-2">{parseFloat(stake.amount).toFixed(2)} QTM</td><td className="p-2">{stake.lockDuration} days</td><td className="p-2">{getAPYForDuration(stake.lockDuration)} ({getMultiplierText(stake.lockDuration)})</td><td className="p-2"><PendingRewards rewardContract={contract} rewardAccount={account} stakeIndex={index} stake={stake} /></td><td className="p-2">{stake.startTime.toLocaleDateString()}</td><td className="p-2">{stake.claimed ? <span className="text-gray-400">Claimed</span> : <span className="text-green-400">Active</span>}</td><td className="p-2">{!stake.claimed && <button onClick={() => unstakeTokens(index)} disabled={loading} className="text-blue-400 hover:text-blue-300 text-sm">Unstake</button>}</td></tr>)}</tbody></table></div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
