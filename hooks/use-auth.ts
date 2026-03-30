"use client";

import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setCredentials, clearCredentials } from "@/stores/auth-slice";
import {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  type LoginRequest,
} from "@/stores/api/auth-api";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const { isLoading: isMeLoading } = useGetMeQuery(undefined, {
    // Only fetch if we don't already have the user
    skip: isAuthenticated,
  });

  const login = useCallback(
    async (credentials: LoginRequest) => {
      const result = await loginMutation(credentials).unwrap();

      dispatch(setCredentials(result.user));

      return result;
    },
    [loginMutation, dispatch],
  );

  const logout = useCallback(async () => {
    await logoutMutation().unwrap();
    dispatch(clearCredentials());
  }, [logoutMutation, dispatch]);

  return {
    user,
    isAuthenticated,
    login,
    logout,
    isLoading: isLoginLoading || isLogoutLoading || isMeLoading,
  };
}
