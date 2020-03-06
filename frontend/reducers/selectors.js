export const selectNMostRecentBlocksArray = ({ blocks, blockHashes }, n) => {
  const sliceStart = n <= blockHashes.length ? blockHashes.length - n : 0;
  const recentBlockhHashes = blockHashes.slice(sliceStart);
  // reverse so most recent are at beginning
  return recentBlockhHashes.map((hash) => blocks[hash]).reverse();
};
