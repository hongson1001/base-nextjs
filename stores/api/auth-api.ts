import { baseApi } from "./base-api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  permissions: string[];
}

export interface LoginResponse {
  user: AuthUser;
  accessToken?: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    register: builder.mutation<{ user: AuthUser }, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User", "Dashboard"],
    }),

    getMe: builder.query<AuthUser, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),

    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
    }),

    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useChangePasswordMutation,
  useRefreshTokenMutation,
} = authApi;
