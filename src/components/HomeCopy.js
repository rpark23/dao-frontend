import React, { useState, useEffect } from "react";
import getBlockchain from "../ethereum.js";
import Transfer from "./Transfer";
import Delegate from "./Delegate";
import Propose from "./Propose";
import Proposal from "./Proposal";
import { ethers } from "ethers";

function Home() {
  const [comp, setComp] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [votes, setVotes] = useState(undefined);

  const [actions, setActions] = useState(["select"]);

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

  const addAction = (e) => {
    e.preventDefault();
    console.log(actions);
    setActions((actions) => [...actions, "select"]);
  };

  let actionsMarkup = actions.map((action, index) => (
    <Proposal
      index={index}
      action={action}
      actions={actions}
      setActions={setActions}
    />
  ));

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
      <form className="proposalForm">
        <h2>Create a proposal</h2>
        <div className="createProposal">
          <div className="chooseActions">
            <h3>Choose Actions</h3>
            {actionsMarkup}
            <button className="addAction" onClick={(e) => addAction(e)}>
              + Add an Action
            </button>
          </div>
          <div className="typeDescription">
            <h3>Proposal Description</h3>
            <textarea className="description"></textarea>
          </div>
        </div>
        <button type="submit" className="submit">
          Submit Proposal
        </button>
      </form>
    </div>
  );
}

export default Home;
