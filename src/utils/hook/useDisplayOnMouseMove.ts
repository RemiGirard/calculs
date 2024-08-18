import {useEffect, useState} from "react";

type hookProps = {
  elementToWatch?: HTMLElement,
  timeout?: number,
}

const defaultProps: hookProps = {
  elementToWatch: document.body,
  timeout: 1000,
};

export default (passedProps: hookProps) => {
  const {
    elementToWatch = document.body,
    timeout = 1000,
  } = {...defaultProps, ...passedProps};
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    let hideButtonsTimeout: number;

    const showButtons = () => {
      setDisplay(true);
      clearTimeout(hideButtonsTimeout);
      hideButtonsTimeout = window.setTimeout(() => setDisplay(false), timeout);
    }

    elementToWatch.addEventListener('mousemove', showButtons);

    return () => {
      elementToWatch.removeEventListener('mousemove', showButtons);
      clearTimeout(hideButtonsTimeout);
    }

  }, []);
  return {display, setDisplay};
}