class PayloadError extends Error {}
Object.defineProperty(PayloadError.prototype, "name", {
  value: "PayloadError",
});

export const validateActionPayload = (payload = {}, options = {}) => {
  // Required - array of required keys on payload
  const { required = [] } = options;
  required.forEach((key) => {
    if (!payload[key]) {
      throw new PayloadError(`"${key}" is required`);
    }
  });
};

export default PayloadError;
