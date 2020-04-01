import { useState, useEffect } from 'react';
// import EventEmitter from "./eventEmitter";
import noop from './noop';
//@ts-ignore
// const { EventEmitter } = window;

import EventEmitter from 'events';

const PromiseAllPass = (promises: Promise<any>[]) => {
  if (!promises.length) {
    return Promise.reject('not a valid array.');
  }
  return Promise.all(promises).then(
    values => values.filter(Boolean).length === values.length
  );
};

const useValidation = (
  validator: (val: string) => void
): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  boolean,
  string,
  () => Promise<any>
] => {
  const [value, setvalue] = useState('');
  const [errMsg, seterrMsg] = useState('');
  const [validate, setvalidate] = useState(false);
  const [err, seterr] = useState(false);
  const [emitter, setemitter] = useState(null);

  useEffect(() => {
    setemitter(new EventEmitter());
  }, []);

  useEffect(() => {
    if (validate) {
      console.log('validating!!!');
      try {
        validator(value);
        seterr(false);
        seterrMsg('');
        emitter.emit('finish', true);
      } catch (e) {
        seterrMsg(e.message);
        seterr(true);
        emitter.emit('finish', false);
      }
      setvalidate(false);
    }
  }, [validate]);

  const validateTrigger = () => {
    return new Promise((resolve, reject) => {
      emitter.once('finish', resolve);
      setvalidate(true);
    });
    // .catch(console.log);
  };

  return [value, setvalue, err, errMsg, validateTrigger];
};

export { PromiseAllPass };

export default useValidation;
