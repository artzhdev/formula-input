import { useQuery } from "react-query";
import { fetchAutocompleteSuggestions } from "../api/formulaApi";

export const useAutocomplete = () => {
  const { data, error, isLoading } = useQuery(
    "autocomplete",
    fetchAutocompleteSuggestions,
  );

  return { suggestions: data || [], error, isLoading };
};
