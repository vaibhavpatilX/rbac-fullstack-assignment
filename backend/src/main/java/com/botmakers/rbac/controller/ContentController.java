package com.botmakers.rbac.controller;

import com.botmakers.rbac.dto.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Tag(name = "Content", description = "Role-based content endpoints")
public class ContentController {

    // ─── Public ────────────────────────────────────────────────────────────
    @GetMapping("/api/public")
    @Operation(summary = "Public content", description = "Accessible by anyone, no authentication required")
    public ResponseEntity<ApiResponse<Map<String, String>>> publicContent() {
        return ResponseEntity.ok(ApiResponse.success("Public content fetched", Map.of(
                "message", "Welcome! This content is available to everyone.",
                "access", "PUBLIC"
        )));
    }

    // ─── User ──────────────────────────────────────────────────────────────
    @GetMapping("/api/user")
    @Operation(
            summary = "User content",
            description = "Accessible by USER and ADMIN roles",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<ApiResponse<Map<String, String>>> userContent(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.success("User content fetched", Map.of(
                "message", "Hello " + userDetails.getUsername() + "! This is user-level content.",
                "access", "USER / ADMIN"
        )));
    }

    // ─── Admin ─────────────────────────────────────────────────────────────
    @GetMapping("/api/admin")
    @Operation(
            summary = "Admin content",
            description = "Accessible by ADMIN role only",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<ApiResponse<Map<String, String>>> adminContent(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.success("Admin content fetched", Map.of(
                "message", "Hello Admin " + userDetails.getUsername() + "! This is admin-only content.",
                "access", "ADMIN ONLY",
                "secret", "You have full system access."
        )));
    }
}
