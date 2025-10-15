export async function cloudInvoke(functionName: string, body: any): Promise<any> {
  try {
    const response = await fetch(`/api/${functionName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    // Always read as text first to avoid JSON parse crashes when HTML is returned (e.g., 200 index.html)
    const raw = await response.text();

    try {
      const data = raw ? JSON.parse(raw) : {};
      // If server responded with non-OK status but JSON body, surface as error consistently
      if (!response.ok && (data as any)?.error === undefined) {
        return { error: "Request failed", status: response.status };
      }
      return data;
    } catch {
      // Not JSON (likely HTML fallback or empty). Return a normalized error instead of throwing.
      return {
        error: "Unexpected non-JSON response from server",
        status: response.status,
      };
    }
  } catch (err) {
    return { error: (err as Error)?.message || "Network error" };
  }
}
