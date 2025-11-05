import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAvailableUnits = () => {
  const [unitsRemaining, setUnitsRemaining] = useState<number>(40);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch initial count
    const fetchUnits = async () => {
      const { data, error } = await supabase
        .from('available_units')
        .select('units_remaining')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setUnitsRemaining(data.units_remaining);
      }
      setIsLoading(false);
    };

    fetchUnits();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('available-units-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'available_units'
        },
        (payload) => {
          if (payload.new && 'units_remaining' in payload.new) {
            setUnitsRemaining((payload.new as any).units_remaining);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { unitsRemaining, isLoading };
};
