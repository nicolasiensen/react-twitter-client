const afterPromises = (done, fn) => {
  setTimeout(() => {
    try {
      fn();
      done();
    } catch(e) {
      done.fail(e);
    }
  }, 0);
}

export default afterPromises;
