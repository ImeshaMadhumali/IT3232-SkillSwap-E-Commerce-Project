package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.AuthResponse;
import dto.LoginRequest;
import dto.RegisterRequest;
import service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private AuthService authService;
	@PostMapping("/register")
	 public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        try {
            String result = authService.register(request);  
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
        	//System.out.println("Email: " + request.getEmail());  // <--- Add this
            //System.out.println("Password: " + request.getPassword());  // <--- Add this
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
        	 e.printStackTrace(); // Log full error
            return ResponseEntity.badRequest().body(null);
            
        }
    }
}
