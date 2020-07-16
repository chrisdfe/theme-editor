const frequencyLabelMap = {
  daily: "day",
  weekly: "week",
  monthly: "month",
};

const amountUnitLabelMap = {
  times: (amount) => {
    if (amount === 1) {
      return "Once";
    }
    if (amount === 2) {
      return "Twice";
    }
    return `${amount} times`;
  },
  minutes: (amount) => {
    if (amount === 1) {
      return "For 1 minute";
    }
    return `For ${amount} minutes`;
  },
  hours: (amount) => {
    if (amount === 1) {
      return "For 1 hour";
    }
    return `For ${amount} hours`;
  },
};

const getGoalAmountLabel = (goal) => {
  const getAmountUnitLabel = amountUnitLabelMap[goal.amountUnit];
  return getAmountUnitLabel(goal.amount);
};

export const getAmountFrequencyText = (goal) => {
  if (goal.type === "one-time") {
    return getGoalAmountLabel(goal);
  }

  // recurring
  const amountLabel = getGoalAmountLabel(goal);
  const frequencyLabel = frequencyLabelMap[goal.frequency];

  return `${amountLabel} per ${frequencyLabel}`;
};
