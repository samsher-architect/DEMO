import { useState, useEffect } from 'react';
import { supabase, hasSupabaseConfig } from '../lib/supabase';
import { CompanyDetails } from '../types';
import { MOCK_COMPANY_DETAILS } from '../lib/mockData';

export function useCompanyDetails() {
  const [company, setCompany] = useState<CompanyDetails>(MOCK_COMPANY_DETAILS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanyDetails() {
      if (hasSupabaseConfig) {
        try {
          const { data, error } = await supabase
            .from('company_details')
            .select('*')
            .limit(1)
            .single();

          if (error) throw error;
          if (data) {
            setCompany(data);
          }
        } catch (err) {
          console.error("Error fetching company details:", err);
          // Fallback to mock data is already set in initial state
        }
      }
      setLoading(false);
    }

    fetchCompanyDetails();
  }, []);

  return { company, loading };
}
