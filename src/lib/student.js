const validateObjectKeys = (requiredKeys, comparedObjectKeys) => {
  const result = {
    isValid: true,
    message: null,
  };

  if (requiredKeys.length !== comparedObjectKeys.length) {
    result.isValid = false;
    result.message =
      "Insufficient body request: Please refer to the api docs about the required properties";
    return result;
  }

  comparedObjectLoop: for (let i = 0; i < comparedObjectKeys.length; i++) {
    const keyName = comparedObjectKeys[i];
    for (let j = 0; j < requiredKeys.length; j++) {
      const lastIndex = j === requiredKeys.length - 1;
      const hasSameKey = keyName === requiredKeys[j];

      if (lastIndex && !hasSameKey) {
        result.isValid = false;
        result.message =
          "Invalid body request: Please refer to the api docs about the allowed property names";
        break comparedObjectLoop;
      }

      continue comparedObjectLoop;
    }
  }

  return result;
};

export { validateObjectKeys };
