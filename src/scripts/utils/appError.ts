export type ErrorCode = 'DEV_ERROR' | 'USER_ERROR';
export type AppErrorType = {
  message: string;
  code: ErrorCode;
};

export class AppError extends Error {
  code?: ErrorCode;

  constructor(message: string, code: ErrorCode) {
    super(message);
    this.code = code;
  }

  static dev(context: string, message: string) {
    return new AppError(`[DEV] ${context}: ${message}`, 'DEV_ERROR');
  }
}
