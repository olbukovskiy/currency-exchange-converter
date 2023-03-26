export type CustomSelectChangeEventType<T = string> =
  | (Event & { target: { value: T; name: string } })
  | React.ChangeEvent<HTMLInputElement>;

export type ErrorWithMessage = {
  message: string;
};

export type CurrenciesObj = {
  [prop: string]: number;
};
