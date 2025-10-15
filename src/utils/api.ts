// API utility functions with error handling and retry logic
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2,
};

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = {}
): Promise<Response> {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...retryOptions };
  let lastError: Error;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      // If successful, return the response
      if (response.ok) {
        return response;
      }

      // Handle specific error codes
      if (response.status === 503) {
        throw new APIError(
          'Service temporarily unavailable. Please try again later.',
          response.status,
          response.statusText
        );
      }

      if (response.status === 429) {
        throw new APIError(
          'Too many requests. Please wait before trying again.',
          response.status,
          response.statusText
        );
      }

      if (response.status >= 500) {
        throw new APIError(
          'Server error occurred. Please try again.',
          response.status,
          response.statusText
        );
      }

      if (response.status >= 400) {
        throw new APIError(
          'Request failed. Please check your input.',
          response.status,
          response.statusText
        );
      }

      throw new APIError(
        `Request failed with status ${response.status}`,
        response.status,
        response.statusText
      );
    } catch (error) {
      lastError = error as Error;

      // Don't retry on client errors (4xx) except 429
      if (error instanceof APIError && error.status >= 400 && error.status < 500 && error.status !== 429) {
        throw error;
      }

      // Don't retry on the last attempt
      if (attempt === config.maxRetries) {
        break;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        config.baseDelay * Math.pow(config.backoffFactor, attempt),
        config.maxDelay
      );

      console.warn(`Request failed (attempt ${attempt + 1}/${config.maxRetries + 1}). Retrying in ${delay}ms...`, error);

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

export async function submitForm(formData: any): Promise<any> {
  try {
    // Post JSON to the canonical submit-lead endpoint
    const response = await fetchWithRetry('/api/submit-lead', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Network error occurred', 0, 'Network Error');
  }
}