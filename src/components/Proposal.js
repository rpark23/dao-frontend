import React, { useState, useEffect } from "react";
import getBlockchain from "../ethereum.js";

function Proposal(props) {
  const { actions, contracts, i, setActions, setContracts } = props;
  const [action, setAction] = useState(actions[i]);
  const [contract, setContract] = useState(contracts[i]);
  const [delegateAddress, setDelegateAddress] = useState(undefined);
  const [timelockAddress, setTimelockAddress] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { delegate, timelock } = await getBlockchain();
      setDelegateAddress(delegate.address);
      setTimelockAddress(timelock.address);
    };
    init();
  }, []);

  const updateContracts = (e) => {
    e.preventDefault();
    let newContracts = contracts;
    newContracts[i] = e.target.value;
    setContract(e.target.value);
    setContracts(newContracts);
  };

  const updateActions = (e) => {
    e.preventDefault();
    let newActions = actions;
    newActions[i] = "_set" + e.target.value;
    console.log(newActions[i]);
    setAction(e.target.value);
    setActions(newActions);
  };

  return (
    <div className="proposal">
      <h3>{i + 1}.</h3>
      <div className="column">
        <select value={contract} onChange={(e) => updateContracts(e)}>
          <option value="select">Select a Contract</option>
          <option value="boba">Boba Fees</option>
          <option value={delegateAddress}>Governor Bravo Delegate</option>
          <option value={timelockAddress}>Timelock</option>
        </select>
        {contract === "select" ? null : contract === delegateAddress ? (
          <>
            <select value={action} onChange={(e) => updateActions(e)}>
              <option value="select">Select an Action</option>
              <option value="ProposalThreshold">_setProposalThreshold</option>
              <option value="VotingDelay">_setVotingDelay</option>
              <option value="VotingPeriod">_setVotingPeriod</option>
              <option value="grant">Grant BOBA</option>
            </select>
            {action === "select" ? null : action === "grant" ? (
              <>
                <input type="text" placeholder="Recipient Address"></input>
                <input type="text" placeholder="Grant Amount"></input>
              </>
            ) : (
              <input type="text" placeholder={`new${action} (uint)`}></input>
            )}
          </>
        ) : (
          <input type="text" placeholder={`New ${action}`}></input>
        )}
      </div>
    </div>
  );
}

export default Proposal;
