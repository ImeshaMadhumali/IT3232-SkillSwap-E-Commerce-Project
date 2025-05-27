package service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import dto.LoginRequest;
import dto.RegisterRequest;
import model.User;
import repository.UserRepository;

public class UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	 public String register(RegisterRequest request) {
	        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
	        if (existingUser.isPresent()) {
	            return "Email already exists!";
	        }

	        User user = new User();
	        user.setUsername(request.getUsername());
	        user.setEmail(request.getEmail());
	        user.setPassword(passwordEncoder.encode(request.getPassword()));

	        userRepository.save(user);
	        return "Registration successful!";
	    }

	    public String login(LoginRequest request) {
	        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
	        if (userOptional.isPresent()) {
	            User user = userOptional.get();
	            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
	                return "Login successful!";
	            } else {
	                return "Incorrect password.";
	            }
	        } else {
	            return "User not found.";
	        }
	    }
}
