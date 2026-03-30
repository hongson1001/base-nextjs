import { baseApi } from "./base-api";

export interface UploadedFile {
  key: string;
  url: string;
  thumbnailKey?: string;
  thumbnailUrl?: string;
}

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingle: builder.mutation<
      UploadedFile,
      { folder: string; entityId: string; file: File }
    >({
      query: ({ folder, entityId, file }) => {
        const formData = new FormData();

        formData.append("file", file);

        return {
          url: `/upload/${folder}/${entityId}`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),

    uploadMultiple: builder.mutation<
      UploadedFile[],
      { folder: string; entityId: string; files: File[] }
    >({
      query: ({ folder, entityId, files }) => {
        const formData = new FormData();

        files.forEach((f) => formData.append("files", f));

        return {
          url: `/upload/${folder}/${entityId}/multiple`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),

    deleteFile: builder.mutation<void, string>({
      query: (key) => ({
        url: `/upload/file/${key}`,
        method: "DELETE",
      }),
    }),

    deleteAllFiles: builder.mutation<
      void,
      { folder: string; entityId: string }
    >({
      query: ({ folder, entityId }) => ({
        url: `/upload/${folder}/${entityId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useUploadSingleMutation,
  useUploadMultipleMutation,
  useDeleteFileMutation,
  useDeleteAllFilesMutation,
} = uploadApi;
