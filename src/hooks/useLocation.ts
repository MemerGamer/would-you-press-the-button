import { useQuery } from "@tanstack/react-query";
import type { LocationResult } from "../types";
import { getLocation } from "../lib/browser";

export function useLocation() {
  return useQuery<LocationResult>({
    queryKey: ["location-on-demand"],
    queryFn: getLocation,
    enabled: false,
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });
}
