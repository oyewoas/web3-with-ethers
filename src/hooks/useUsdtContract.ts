import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import erc20Abi from "../abi";

export const useUsdtContract = (
  provider: ethers.BrowserProvider | ethers.AbstractProvider | null
) => {
  const [usdtContract, setUsdtContract] = useState<Contract>();
  // symbols, decimals, totalsupply
  const [symbol, setSymbol] = useState<string>();
  const [decimals, setDecimals] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<bigint>(0n);

  useEffect(() => {
    setUsdtContract(
      new Contract(
        "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        erc20Abi,
        provider
      )
    );
  }, [provider]);

  useEffect(() => {
    async function run() {
      if (usdtContract === undefined) return;
      const decimals = Number(await usdtContract.decimals());
      setSymbol(await usdtContract.symbol());
      setDecimals(decimals);
      setTotalSupply(await usdtContract.totalSupply());
    }
    run();
  }, [usdtContract]);

  return { usdtContract, symbol, decimals, totalSupply };
};
