let typingTimer; // timer identifier
const doneTypingInterval = 1500;
const handleStopTyping = (fn: () => void) => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(fn, doneTypingInterval);
};

const handleInfitiScroll = (y, height = 0, itemLength = 0, fn: () => void) => {
  height -= 70;
  if (itemLength >= 5) {
    const itemHeight = height / itemLength;
    height -= itemHeight * 2;
    if (Math.abs(y) >= height) {
      if (typeof fn === 'function') fn();
    }
  }
};

const FormBusiness = {
  handleInfitiScroll,
  handleStopTyping,
};

export default FormBusiness;
