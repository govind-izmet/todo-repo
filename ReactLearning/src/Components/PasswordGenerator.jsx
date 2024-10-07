import React, { useState, useCallback, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [useSymbols, setUseSymbols] = useState(false);
  const [useLowerCase, setUseLowerCase] = useState(false);
  const [useUpperCase, setUseUpperCase] = useState(false);
  const [customSymbols, setCustomSymbols] = useState("!@#$%^&*()");
  const [customNumbers, setCustomNumbers] = useState("0123456789");
  const [numNumerals, setNumNumerals] = useState(2);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const commonSymbolSets = [
    "!@#$%^&*()",
    "~`|}{[]:;?><,./-=",
    "+-_=[]{}^&%$#@!",
    "#$%^&*@!?"
  ];

  const generatePassword = useCallback(() => {
    if (useSymbols && !customSymbols) {
      setErrorMessage("Custom symbols cannot be empty.");
      return;
    }
    if (numNumerals > passwordLength) {
      setErrorMessage("Number of numerals cannot exceed password length.");
      return;
    }

    let charset = "";
    let newPassword = "";
    let numerals = "";

    if (useSymbols) charset += customSymbols;
    if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < numNumerals; i++) {
      numerals += customNumbers.charAt(
        Math.floor(Math.random() * customNumbers.length)
      );
    }

    for (let i = 0; i < passwordLength - numNumerals; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    const finalPassword = (newPassword + numerals).split("").sort(() => Math.random() - 0.5).join("");
    
    setPassword(finalPassword);
    setErrorMessage("");
    setSuccessMessage(""); 
    setShowModal(true); // Show modal with the password
  }, [passwordLength, useSymbols, customSymbols, customNumbers, numNumerals, useLowerCase, useUpperCase]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(password).then(() => {
      setSuccessMessage("Password copied to clipboard!");
      setTimeout(() => setSuccessMessage(""), 2000); 
    }).catch(() => {
      setErrorMessage("Failed to copy password.");
    });
  }, [password]);

  const handlePasswordLengthChange = (e) => {
    const value = e.target.value;
    if (value >= 8 && value <= 32) {
      setPasswordLength(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Password length must be between 8 and 32 characters.");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg p-4 mx-auto"
        style={{
          maxWidth: "400px",
          borderRadius: "15px",
          backgroundColor: "linear-gradient(115deg, rgba(151,151,151,1) 0%, rgba(205,205,205,1) 47%, rgba(63,63,63,1) 100%);",
        }}
      >
        <h3 className="text-center mb-4 text-primary">Password Generator</h3>

        <div className="mb-3">
          <label htmlFor="passwordLength" className="form-label">
            Password Length
          </label>
          <input
            type="number"
            min="8"
            max="32"
            value={passwordLength}
            onChange={handlePasswordLengthChange}
            id="passwordLength"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={() => setUseSymbols(!useSymbols)}
              id="useSymbols"
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="useSymbols">
              Use Symbols
            </label>
          </div>
          {useSymbols && (
            <div className="mt-2">
              <label htmlFor="customSymbols" className="form-label">
                Select Symbol Set
              </label>
              <select
                value={customSymbols}
                onChange={(e) => setCustomSymbols(e.target.value)}
                id="customSymbols"
                className="form-control"
              >
                {commonSymbolSets.map((set, index) => (
                  <option key={index} value={set}>
                    {set}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-3">
            <label htmlFor="numNumerals" className="form-label">
              How many numerals?
            </label>
            <input
              type="number"
              min="0"
              max={passwordLength}
              value={numNumerals}
              onChange={(e) => setNumNumerals(Number(e.target.value))}
              id="numNumerals"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            checked={useLowerCase}
            onChange={() => setUseLowerCase(!useLowerCase)}
            id="useLowerCase"
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="useLowerCase">
            Lowercase Letters
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            checked={useUpperCase}
            onChange={() => setUseUpperCase(!useUpperCase)}
            id="useUpperCase"
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="useUpperCase">
            Uppercase Letters
          </label>
        </div>

        {errorMessage && (
          <div className="alert alert-danger mt-3">{errorMessage}</div>
        )}

        <button
          className="btn btn-primary w-100 mt-3"
          onClick={generatePassword}
          disabled={
            !!errorMessage ||
            (!useSymbols && numNumerals === 0 && !useLowerCase && !useUpperCase)
          }
        >
          Generate Password
        </button>

        {successMessage && (
          <div className="alert alert-success mt-3">{successMessage}</div>
        )}
      </div>

      {/* Modal to show the generated password */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Generated Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group">
            <input
              type="text"
              value={password}
              readOnly
              className="form-control"
            />
            <Button variant="success" onClick={copyToClipboard}>
              Copy
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
