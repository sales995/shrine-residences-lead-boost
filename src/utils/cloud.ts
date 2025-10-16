export async function cloudInvoke(functionName: string, body: any): Promise<any> {
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase.functions.invoke(functionName, {
      body,
    });

    if (error) {
      console.error(`Edge function ${functionName} error:`, error);
      throw new Error(error.message || 'Submission failed');
    }

    return data;
  } catch (error) {
    console.error(`Failed to invoke ${functionName}:`, error);
    throw error;
  }
}
