import { AppError } from './appError.ts';

export async function fetchData<T>(url: string): Promise<T> {
  const resp = await fetch(url);
  if (resp.status === 404) throw new Error('Resource not found: ${url}');
  if (!resp.ok) throw new AppError('مشکلی در اتصال به شبکه پیش اومده!', 'USER_ERROR');
  return await resp.json();
}
