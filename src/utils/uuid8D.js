export function uuid8D() {
  function id4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return id4() + id4();
}
