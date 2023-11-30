const validateObjectKeys = (validObjectKeys, comparedObjectKeys) => {
  let isValid = true;
  comparedObjectLoop: for (let i = 0; i < comparedObjectKeys.length; i++) {
    const keyName = comparedObjectKeys[i];
    for (let j = 0; j < validObjectKeys.length; j++) {
      const lastIndex = j === validObjectKeys.length - 1;
      const hasSameKey = keyName === validObjectKeys[j];

      if (lastIndex && !hasSameKey) {
        isValid = false;
        break comparedObjectLoop;
      }

      continue comparedObjectLoop;
    }
  }

  return isValid;
};

export { validateObjectKeys };
