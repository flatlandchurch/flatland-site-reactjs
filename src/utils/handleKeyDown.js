export default (includeSpace, cb) => (e) => {
  if (e.nativeEvent.key === 'Enter') {
    e.preventDefault();
    cb();
  }

  if (includeSpace && e.nativeEvent.key === ' ') {
    e.preventDefault();
    cb();
  }
};
