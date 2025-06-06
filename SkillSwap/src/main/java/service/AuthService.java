package service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dto.AuthResponse;
import dto.LoginRequest;
import dto.RegisterRequest;
import model.User;
import repository.UserRepository;
import security.JwtTokenProvider;

@Service  // Add @Service annotation
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public String register(RegisterRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return "Email already exists!";
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(new Date()); // Set creation date

        userRepository.save(user);
        return "Registration successful!";
        //System.out.println(" Saved user: " + user.getEmail());

    }
    
    public AuthResponse login(LoginRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                // Generate JWT token
                String token = jwtTokenProvider.generateToken(user.getEmail());
                
                // Create user info map
                Map<String, Object> userInfo = new HashMap<>();
                userInfo.put("id", user.getId());
                userInfo.put("username", user.getUsername());
                userInfo.put("email", user.getEmail());
                
                return new AuthResponse(token, userInfo);
            } else {
                throw new RuntimeException("Incorrect password");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }
}