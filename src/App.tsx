import { useEffect, useState } from "react";
import "./App.css";
import { ethereum_window } from "./iEth";
import { ethers, Network } from "ethers";
import { useUsdtContract } from "./hooks/useUsdtContract";
import { formatUnits } from "ethers";

const detectProviderAndSigner = async () => {
  let signer = null;
  let provider;

  if (!ethereum_window) {
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(ethereum_window);
    signer = await provider.getSigner();
  }

  return [provider, signer];
};

function App() {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [provider, setProvider] = useState<
    ethers.BrowserProvider | ethers.AbstractProvider | null
  >(null);
  const [network, setNetwork] = useState<Network>();

  const { symbol, decimals, totalSupply } = useUsdtContract(provider);

  useEffect(() => {
    detectProviderAndSigner().then(([_provider, _signer]) => {
      setProvider(_provider);
      setSigner(_signer);
    });
  }, []);

  useEffect(() => {
    async function getNetwork() {
      if (provider) {
        const _network = await provider.getNetwork();
        return _network;
      } else {
        return undefined;
      }
    }

    getNetwork().then((_network) => setNetwork(_network));
  }, [provider]);

  return (
    <>
      <h1>Our Demo</h1>
      <p>Symbol: {symbol}</p>
      <p>decimals: {decimals}</p>
      <p>Total Supply: {formatUnits(totalSupply, decimals)}</p>
    </>
  );
}

export default App;
