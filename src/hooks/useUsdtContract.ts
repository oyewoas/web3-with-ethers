import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import erc20Abi from "../abi";

export const useUsdtContract = (
  provider: ethers.BrowserProvider | ethers.AbstractProvider | ethers.JsonRpcSigner | null
) => {
  const [usdtContract, setUsdtContract] = useState<Contract>();
  // symbols, decimals, totalsupply
  const [symbol, setSymbol] = useState<string>();
  const [decimals, setDecimals] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<bigint>(0n);
  const [balance, setBalance] = useState<bigint>(0n);
  const [allowance, setAllowance] = useState<bigint>(0n);
  const [name, setName] = useState<string>();
  const [owner, setOwner] = useState<string>();

  useEffect(() => {
    setUsdtContract(
      new Contract(
        "0x93d67359A0f6F117150a70fDde6BB96782497248",
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
      setName(await usdtContract.name());
      setOwner(await usdtContract.owner());
      setBalance(await usdtContract.balanceOf("0x14a7ef7e75Ca0DC57b920BC8d3A2A9Da5aa803e3"));
      setAllowance(
        await usdtContract.allowance(
          "0x83cea7468B2e9B4c2ec62818eb4d37196b256f88",
          "0xSpenderAddressHere"
        )
      );
      

    }
    run();
  }, [usdtContract]);

  return { usdtContract, symbol, decimals, totalSupply, balance, allowance, name, owner };
};
