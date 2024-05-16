import type { Response } from 'express';
import StatusCodes from '../constants/httpCodes';

export enum ErrorStatusCode {
  BadRequest = StatusCodes.BAD_REQUEST,
  Unauthorized = StatusCodes.UNAUTHORIZED,
  Forbidden = StatusCodes.FORBIDDEN,
  NotFound = StatusCodes.NOT_FOUND,
  InternalServerError = StatusCodes.SERVER_ERROR,
}

export interface ErrorMessages {
  [ErrorStatusCode.BadRequest]: string;
  [ErrorStatusCode.Unauthorized]: string;
  [ErrorStatusCode.Forbidden]: string;
  [ErrorStatusCode.NotFound]: string;
  [ErrorStatusCode.InternalServerError]: string;
}

// Error messages for error status codes
export const defaultErrorMessages: ErrorMessages = {
  [ErrorStatusCode.BadRequest]: 'Invalid request. Please try again.',
  [ErrorStatusCode.Unauthorized]: 'Access denied. Please sign in to continue.',
  [ErrorStatusCode.Forbidden]: 'Access denied. Unauthorized.',
  [ErrorStatusCode.NotFound]: 'Resource not found.',
  [ErrorStatusCode.InternalServerError]:
    'Something went wrong. Please try again later.',
};

class HttpError extends Error {
  readonly name: string;
  readonly statusCode: number;
  readonly details?: any; // Additional details about the error, such as validation errors or error payloads

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    // Capture the stack trace, excluding the constructor call
    Error.captureStackTrace(this, this.constructor);
  }

  // Serialize the error to JSON for easy logging and transmission
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}

/**
 * Throws an HTTP error with the specified status code and optional custom message and details.
 * @param {ErrorStatusCode} statusCode - The HTTP status code for the error.
 * @param {string} [customMessage] - Optional custom message for the error. If not provided, a default message based on the status code will be used.
 * @param {any} [details] - Optional additional details about the error.
 * @throws {HttpError} - Throws an HTTP error with the specified status code and message.
 * @returns {never} - This function never returns, as it always throws an error.
 */
export function throwError(
  statusCode: ErrorStatusCode,
  customMessage?: string,
  details?: any
): never {
  const message = customMessage || defaultErrorMessages[statusCode];
  const error = new HttpError(message, statusCode, details);
  throw error;
}

/**
 * Handles API errors and sends an appropriate response.
 * @param {Response} res - The response object.
 * @param {Error} error - The error object to handle.
 * @returns {void}
 */
export function handleApiError(res: Response, error: HttpError | any): void {
  const statusCode = error.statusCode || ErrorStatusCode.InternalServerError;

  const errorMessage =
    error instanceof HttpError && error.statusCode
      ? error.message
      : defaultErrorMessages[ErrorStatusCode.InternalServerError];

  res.status(statusCode).json({ error: errorMessage });
}
