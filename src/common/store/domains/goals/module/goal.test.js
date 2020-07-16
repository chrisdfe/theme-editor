const GoalModule = require("./goal");

const defaultGoal = {
  id: 1,
  type: "one-time",
  frequency: "",
  description: "",
  amount: 1,
  amountUnit: "times",
  startDate: "2020-06-25",
  endDate: "",
};

const createMockGoal = (params = {}) => ({
  ...defaultGoal,
  ...params,
});

const createMockRecurringGoal = (params = {}) =>
  createMockGoal({ ...params, type: "recurring" });

describe("GoalModule", () => {
  describe("getAmountFrequencyText", () => {
    describe("one-time goals", () => {
      it("Once", () => {
        const goal = createMockGoal();
        expect(GoalModule.getAmountFrequencyText(goal)).toEqual("Once");
      });

      it("Twice", () => {
        const goal = createMockGoal({ amount: 2 });
        expect(GoalModule.getAmountFrequencyText(goal)).toEqual("Twice");
      });

      it("3 times", () => {
        const goal = createMockGoal({ amount: 3 });
        expect(GoalModule.getAmountFrequencyText(goal)).toEqual("3 times");
      });
    });

    describe("recurring goals", () => {
      describe("Once", () => {
        it("per day", () => {
          const goal = createMockRecurringGoal({
            frequency: "daily",
            amount: 1,
          });

          expect(GoalModule.getAmountFrequencyText(goal)).toEqual(
            "Once per day"
          );
        });

        it("per week", () => {
          const goal = createMockRecurringGoal({
            frequency: "weekly",
            amount: 1,
          });
          expect(GoalModule.getAmountFrequencyText(goal)).toEqual(
            "Once per week"
          );
        });

        it("per month", () => {
          const goal = createMockRecurringGoal({
            frequency: "monthly",
            amount: 1,
          });
          expect(GoalModule.getAmountFrequencyText(goal)).toEqual(
            "Once per month"
          );
        });
      });

      describe("Twice", () => {
        it("per day", () => {
          const goal = createMockRecurringGoal({
            frequency: "daily",
            amount: 2,
            amountUnit: "times",
          });

          expect(GoalModule.getAmountFrequencyText(goal)).toEqual(
            "Twice per day"
          );
        });

        it("per week", () => {
          const goal = createMockRecurringGoal({
            frequency: "weekly",
            amount: 2,
            amountUnit: "times",
          });

          expect(GoalModule.getAmountFrequencyText(goal)).toEqual(
            "Twice per week"
          );
        });

        it("per month", () => {
          const goal = createMockRecurringGoal({
            frequency: "monthly",
            amount: 2,
            amountUnit: "times",
          });

          expect(GoalModule.getAmountFrequencyText(goal)).toEqual(
            "Twice per month"
          );
        });
      });

      describe("5 times", () => {
        it("per day", () => {
          const goal = createMockRecurringGoal({
            frequency: "daily",
            amount: 5,
            amountUnit: "times",
          });

          expect(GoalModule.getAmountFrequencyText(goal)).toEqual(
            "5 times per day"
          );
        });

        it("per week", () => {
          const goal = createMockRecurringGoal({
            frequency: "weekly",
            amount: 5,
            amountUnit: "times",
          });

          expect(GoalModule.getAmountFrequencyText(goal)).toEqual(
            "5 times per week"
          );
        });

        it("per month", () => {
          const goal = createMockRecurringGoal({
            frequency: "monthly",
            amount: 5,
            amountUnit: "times",
          });

          expect(GoalModule.getAmountFrequencyText(goal)).toEqual(
            "5 times per month"
          );
        });
      });

      it("For 1 hour per day", () => {
        const goal = createMockRecurringGoal({
          frequency: "daily",
          amount: 1,
          amountUnit: "hours",
        });

        expect(GoalModule.getAmountFrequencyText(goal)).toEqual(
          "For 1 hour per day"
        );
      });

      it("For 3 hours per week", () => {
        const goal = createMockRecurringGoal({
          frequency: "weekly",
          amount: 3,
          amountUnit: "hours",
        });

        expect(GoalModule.getAmountFrequencyText(goal)).toEqual(
          "For 3 hours per week"
        );
      });

      it("For 1 minute per day", () => {
        const goal = createMockRecurringGoal({
          frequency: "daily",
          amount: 1,
          amountUnit: "minutes",
        });

        expect(GoalModule.getAmountFrequencyText(goal)).toEqual(
          "For 1 minute per day"
        );
      });

      it("For 90 minutes per month", () => {
        const goal = createMockRecurringGoal({
          frequency: "monthly",
          amount: 90,
          amountUnit: "minutes",
        });

        expect(GoalModule.getAmountFrequencyText(goal)).toEqual(
          "For 90 minutes per month"
        );
      });
    });
  });
});
