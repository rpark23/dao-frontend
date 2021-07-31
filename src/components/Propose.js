import React, { useState, useEffect } from "react";
import getBlockchain from "../ethereum.js";
import Proposal from "./Proposal";

function Propose() {
  const [delegate, setDelegate] = useState(undefined);
  const [actions, setActions] = useState(["select"]);
  const [contracts, setContracts] = useState(["select"]);
  const [values, setValues] = useState([0]);

  useEffect(() => {
    const init = async () => {
      const { delegate } = await getBlockchain();
      setDelegate(delegate);
    };
    init();
  }, []);

  let actionsMarkup = actions.map((action, i) => (
    <Proposal
      i={i}
      actions={actions}
      contracts={contracts}
      setActions={setActions}
      setContracts={setContracts}
    />
  ));

  const addAction = (e) => {
    e.preventDefault();
    setActions((actions) => [...actions, "select"]);
    setContracts((contracts) => [...contracts, "select"]);
    setValues((values) => [...values, 0]);
  };

  const submitProposal = async (e) => {
    e.preventDefault();
    console.log(actions);
    console.log(contracts);
    console.log(values);
  };

  return (
    <form className="proposalForm" onSubmit={(e) => submitProposal(e)}>
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
  );
}

export default Propose;
