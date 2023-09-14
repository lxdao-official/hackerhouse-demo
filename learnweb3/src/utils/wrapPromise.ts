export enum PromiseStatus {
  pending,
  success,
  error,
}

export type WrapPromiseType<T> = {
  read: () => T | undefined;
};

export function wrapPromise<T>(promise: Promise<T>): WrapPromiseType<T> {
  let status = PromiseStatus.pending;
  let result: T;

  let suspender = promise.then(
    (r) => {
      status = PromiseStatus.success;
      result = r;
    },
    (e) => {
      status = PromiseStatus.error;
      result = e;
    }
  );

  return {
    read() {
      if (status === PromiseStatus.pending) {
        throw suspender;
      } else if (status === PromiseStatus.error) {
        throw result;
      } else if (status === PromiseStatus.success) {
        return result;
      }
    },
  };
}
