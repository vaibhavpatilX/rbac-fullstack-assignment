package com.botmakers.rbac.service;

import com.botmakers.rbac.dto.request.LoginRequest;
import com.botmakers.rbac.dto.request.RegisterRequest;
import com.botmakers.rbac.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
