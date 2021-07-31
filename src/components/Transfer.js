import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function Delegate(props) {
  const { address, balance, comp, setBalance } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateBalance = async (e) => {
    e.preventDefault();
    const recipient = e.target.elements[0].value;
    const tx = await comp.delegate(recipient);
    await tx.wait();
    const newBalance = ethers.utils.formatEther(await comp.balanceOf(address));
    setBalance(newBalance);
  };
  return (
    <>
      <div>
        <h4>Wallet Balance</h4>
        <h3>{balance} BOBA</h3>
      </div>
      <button className="delegate" onClick={handleShow}>
        Send BOBA
      </button>
      {show ? (
        <>
          <div className="modal">
            <form className="delegateVotes" onSubmit={(e) => updateBalance(e)}>
              <h2>Send BOBA</h2>
              <input
                type="text"
                className="recipient"
                placeholder="Recipient Address"
              />
              <button className="close" onClick={handleClose}>
                x
              </button>
              <button type="submit" className="submit">
                <h4>Send</h4>
              </button>
            </form>
          </div>
          <div className="tint" />
        </>
      ) : null}
    </>
  );
}

export default Delegate;
