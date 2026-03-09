package com.botmakers.rbac.dto.response;

public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    public ApiResponse() {}

    private ApiResponse(Builder<T> b) {
        this.success = b.success; this.message = b.message; this.data = b.data;
    }

    public static <T> Builder<T> builder() { return new Builder<>(); }

    public static class Builder<T> {
        private boolean success;
        private String message;
        private T data;
        public Builder<T> success(boolean s) { this.success = s; return this; }
        public Builder<T> message(String m) { this.message = m; return this; }
        public Builder<T> data(T d) { this.data = d; return this; }
        public ApiResponse<T> build() { return new ApiResponse<>(this); }
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder().success(true).message(message).data(data).build();
    }

    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder().success(false).message(message).build();
    }

    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
    public T getData() { return data; }
    public void setSuccess(boolean success) { this.success = success; }
    public void setMessage(String message) { this.message = message; }
    public void setData(T data) { this.data = data; }
}
