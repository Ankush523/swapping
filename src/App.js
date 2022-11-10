import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar from "./components/Navbar";
import ConfigModal from "./components/ConfigModal";
import { BeatLoader } from "react-spinners";
import CurrencyField from "./components/CurrencyField";
import { getContract } from "@wagmi/core";

function App() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);

  const [slippageAmount, setSlippageAmount] = useState(2);
  const [deadlineMinutes, setDeadlineMinutes] = useState(10);
  const [showModal, setShowModal] = useState(undefined);

  const [inputAmount, setInputAmount] = useState(undefined);
  const [outputAmount, setOutputAmount] = useState(undefined);
  const [transaction, setTransaction] = useState(undefined);
  const [loading, setLoading] = useState(undefined);
  const [ratio, setRatio] = useState(undefined);
  const [wethContract, setWethContract] = useState(undefined);
  const [uniContract, setUniContract] = useState(undefined);
  const [wethAmount, setWethAmount] = useState(undefined);
  const [uniAmount, setUniAmount] = useState(undefined);

  useEffect(() => {
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      
      const wethContract = getWethContract()
      setWethContract(wethContract)

      const uniContract = getUniContract()
      setUniContract(uniContract)
    };
    onLoad();
  }, []);

  const getSigner = async provider => {
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer)
  }

  const isConnected = () => signer !== undefined;

  const getWalletAddress = () => {
    signer.getAddress().then((address) => {
      setSignerAddress(address);

      wethContract.balanceOf(address)
      .then(res => {
        setWethAmount(Number(ethers.utils.formatEther(res)))
      })

      uniContract .balanceOf(address)
      .then(res => {
        setUniAmount(Number(ethers.utils.formatEther(res)))
      })
    });
  };

  if (signer !== undefined) {
    getWalletAddress();
  }

  return (
    <div className="App">
      <div className="swapContainer">
        <div className="swapHeader">
          <span className="swaptext">Swap</span>
          <span className="gearContainer" onClick={() => setShowModal(true)}>GearIcon</span>
          {showModal && (
            <ConfigModal
              onClose={() => setShowModal(false)}
              setDeadlineMinutes={setDeadlineMinutes}
              deadlineMinutes={deadlineMinutes}
              setSlippageAmount={setSlippageAmount}
              slippageAmount={slippageAmount}
            />
          )}
        </div>

        <div className="swapbody">
           <CurrencyField field="input" tokenName="WETH" getSwapPrice={getSwapPrice} signer={signer} balance={wethAmount}/>
           <CurrencyField field="output" tokenName="UNI" value={outputAmount} signer={signer} balance={uniAmount} spinner={BeatLoader} loading={loading}/>
        </div>
      </div>
    </div>
  );
}

export default App;
