
export enum ToastType {
  Success = 'success',
  Error = 'error'
}

export interface Toast {
  type: ToastType;
  message: string;
}
