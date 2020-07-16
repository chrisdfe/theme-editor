import React, { useState } from "react";

import TextInput from "@/components/lib/forms/TextInput";
import Button from "@/components/lib/forms/Button";

import "./ProgressLogger.css";

const ProgressLogger = ({ goal, goalRecord, onProgressLogged }) => {
  // TODO - set to goalRecords
  const initialAmount = goalRecord ? goalRecord.amount : 0;
  const [internalAmount, setInternalAmount] = useState(initialAmount);

  return (
    <div className="ProgressLogger">
      {/*TODO - use NumberInput instead */}
      <TextInput
        id="progress-logger-amount"
        value={internalAmount}
        max={initialAmount}
        onChange={(e) => {
          setInternalAmount(e.target.value);
        }}
      />{" "}
      / {goal.amount}
      <Button
        onClick={() => {
          const parsedValue = parseInt(internalAmount);
          if (!isNaN(parsedValue)) {
            onProgressLogged && onProgressLogged(parsedValue);
          }
        }}
      >
        done
      </Button>
    </div>
  );
};

export default ProgressLogger;
