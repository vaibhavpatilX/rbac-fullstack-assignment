package com.botmakers.rbac.dto.response;

import com.botmakers.rbac.entity.Role;

public class AuthResponse {
    private String token;
    private String name;
    private String email;
    private Role role;

    public AuthResponse() {}

    private AuthResponse(Builder b) {
        this.token = b.token; this.name = b.name;
        this.email = b.email; this.role = b.role;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String token, name, email;
        private Role role;
        public Builder token(String t) { this.token = t; return this; }
        public Builder name(String n) { this.name = n; return this; }
        public Builder email(String e) { this.email = e; return this; }
        public Builder role(Role r) { this.role = r; return this; }
        public AuthResponse build() { return new AuthResponse(this); }
    }

    public String getToken() { return token; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
    public void setToken(String token) { this.token = token; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setRole(Role role) { this.role = role; }
}
