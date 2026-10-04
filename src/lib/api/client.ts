export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const isFormData = options.body instanceof FormData;
  
  // Only set application/json if it's not FormData and no Content-Type is provided
  const headers = new Headers(options.headers || {});
  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Automatically attach JWT token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access');
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  // Use no-store by default to prevent Next.js from caching API errors or stale data
  const fetchOptions: RequestInit = {
    cache: 'no-store',
    ...options,
    headers,
  };

  let res = await fetch(`${API_URL}${endpoint}`, fetchOptions);

  // If unauthorized due to an invalid token on a public route, try clearing it and retrying
  if (res.status === 401 && headers.has('Authorization')) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
    
    // Retry without the token
    headers.delete('Authorization');
    res = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      cache: 'no-store' // Ensure we bypass any cached 401 response
    });
  }

  if (!res.ok) {
    console.error(`API Error: ${res.status} ${res.statusText}`);
    const errorData = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(errorData) || 'API request failed');
  }

  // Handle 204 No Content
  if (res.status === 204) {
    return null;
  }

  return res.json();
}
