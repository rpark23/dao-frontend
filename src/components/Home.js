import React, { useState, useEffect } from "react";
import getBlockchain from "../ethereum.js";
import Transfer from "./Transfer";
import Delegate from "./Delegate";
import Propose from "./Propose";
import { ethers } from "ethers";

function Home() {
  const [comp, setComp] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [votes, setVotes] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { signer, comp } = await getBlockchain();
      const address = await signer.getAddress();
      const balance = ethers.utils.formatEther(await comp.balanceOf(address));
      const votes = ethers.utils.formatEther(
        await comp.getCurrentVotes(address)
      );
      setComp(comp);
      setAddress(address);
      setBalance(balance);
      setVotes(votes);
    };
    init();
  }, []);

  if (
    typeof comp === "undefined" ||
    typeof balance === "undefined" ||
    typeof votes === "undefined"
  ) {
    return "Loading...";
  }

  return (
    <div className="home">
      <h1>BOBA DAO</h1>
      <div className="info">
        <Transfer
          address={address}
          balance={balance}
          comp={comp}
          setBalance={setBalance}
        />
        <Delegate
          address={address}
          comp={comp}
          setVotes={setVotes}
          votes={votes}
        />
      </div>
      <Propose />
    </div>
  );
}

export default Home;
