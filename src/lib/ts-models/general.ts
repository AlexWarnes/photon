export type RequestStatus = "LOADING" | "ERROR" | "SUCCESS";

export interface OptionConfig {
  value: any;
  displayValue: string;
}

export type Option = OptionConfig | string;