export type SubmitLeadPayload = {
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  source: 'hero' | 'contact-form' | 'popup' | 'brochure_download';
  captchaToken?: string;
};

export async function cloudInvoke(name: string, body: any): Promise<any> {
  if (name !== 'submit-lead') {
    throw new Error(`Unknown function: ${name}`);
  }

  const res = await fetch('/api/submit-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { error: data?.error || res.statusText, status: res.status };
  }
  return data;
}
