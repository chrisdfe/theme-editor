// TODO - make this better
const isHex = (str) =>
  /^#[0-9A-Fa-f]{3}$/.test(str) ||
  /^#[0-9A-Fa-f]{6}$/.test(str) ||
  /^#[0-9A-Fa-f]{8}$/.test(str);

export default isHex;
