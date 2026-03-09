package com.botmakers.rbac.dto.response;

import com.botmakers.rbac.entity.Role;

public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private Role role;

    public UserResponse() {}

    private UserResponse(Builder b) {
        this.id = b.id; this.name = b.name;
        this.email = b.email; this.role = b.role;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String name, email;
        private Role role;
        public Builder id(Long i) { this.id = i; return this; }
        public Builder name(String n) { this.name = n; return this; }
        public Builder email(String e) { this.email = e; return this; }
        public Builder role(Role r) { this.role = r; return this; }
        public UserResponse build() { return new UserResponse(this); }
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setRole(Role role) { this.role = role; }
}
