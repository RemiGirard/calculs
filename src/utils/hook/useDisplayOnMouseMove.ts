import {useEffect, useState} from "react";

type hookProps = {
  elementToWatch?: HTMLElement,
  timeout?: number,
}

export default ({
    elementToWatch = document.body,
    timeout = 2000,
  }: hookProps) => {
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