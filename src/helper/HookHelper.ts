import { useEffect, useRef } from 'react';
import _ from 'lodash';

const useDeepEffect = (fn, deps) => {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isSame = prevDeps.current.every((obj, index) => _.isEqual(obj, deps[index]));

    if (isFirst.current || !isSame) {
      fn();
    }

    isFirst.current = false;
    prevDeps.current = deps;
  }, deps);
};

const useScroll = (
  fn: ((x: number, y:number, heightContent: number) => void),
  element: any,
  deps: any[],
) => {
  useEffect(() => {
    const listener = () => {
      fn(
        element.getBoundingClientRect().left,
        element.getBoundingClientRect().top,
        element?.scrollHeight,
      );
    };
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [deps]);

  return scroll;
};

const HookHelper = {
  useDeepEffect,
  useScroll,
};

export default HookHelper;
