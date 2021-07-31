import detectEthereumProvider from "@metamask/detect-provider";
import { ethers, Contract } from "ethers";
import Comp from "./contracts/Comp.json";
import GovernorBravoDelegate from "./contracts/GovernorBravoDelegate.json";
import GovernorBravoDelegator from "./contracts/GovernorBravoDelegator.json";
import SafeMath from "./contracts/SafeMath.json";
import Timelock from "./contracts/Timelock.json";

const getBlockchain = () =>
  new Promise(async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if (provider) {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const networkId = window.ethereum.networkVersion;
      const comp = new Contract(
        Comp.networks[networkId].address,
        Comp.abi,
        signer
      );
      const delegate = new Contract(
        GovernorBravoDelegate.networks[networkId].address,
        GovernorBravoDelegate.abi,
        signer
      );
      const delegator = new Contract(
        GovernorBravoDelegator.networks[networkId].address,
        GovernorBravoDelegator.abi,
        signer
      );
      const safeMath = new Contract(
        SafeMath.networks[networkId].address,
        SafeMath.abi,
        signer
      );
      const timelock = new Contract(
        Timelock.networks[networkId].address,
        Timelock.abi,
        signer
      );

      resolve({
        signer,
        comp,
        delegate,
        delegator,
        safeMath,
        timelock,
      });
      return;
    }
    reject("Install Metamask");
  });

export default getBlockchain;
