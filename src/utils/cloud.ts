export async function cloudInvoke(functionName: string, body: any): Promise<any> {
  const response = await fetch(`/api/${functionName}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
}
