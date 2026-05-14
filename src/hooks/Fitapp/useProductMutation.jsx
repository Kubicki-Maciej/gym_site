import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fitappApi } from "api/fitappApi";

import { queryKeys } from "./queryKeys";

export const useProductMutation = () => {
  const querryClient = useQueryClient();

  const createProduct = useMutation({
    mutationFn: payload => fitappApi.createProduct(payload),
    onSuccess: () => {
      querryClient.invalidateQueries({
        queryKey: queryKeys.products,
      });
    },
  });
  return { createProduct };
};
