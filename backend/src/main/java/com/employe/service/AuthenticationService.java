package com.employe.service;

import com.employe.model.Role;
import com.employe.model.User;
import com.employe.payload.AuthRequest;
import com.employe.payload.AuthResponse;
import com.employe.repository.RoleRepository;
import com.employe.repository.UserRepository;
import com.employe.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

        private final UserRepository userRepository;
        private final RoleRepository roleRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public ResponseEntity<?> register(String email, String password, String fullName,
                        String address, String phoneNumber) {
                try {
                        if (email == null || email.isEmpty()) {
                                return ResponseEntity.badRequest()
                                                .body(Collections.singletonMap("message", "L'email est obligatoire"));
                        }
                        if (password == null || password.isEmpty()) {
                                return ResponseEntity.badRequest()
                                                .body(Collections.singletonMap("message",
                                                                "Le mot de passe est obligatoire"));
                        }
                        if (fullName == null || fullName.isEmpty()) {
                                return ResponseEntity.badRequest()
                                                .body(Collections.singletonMap("message",
                                                                "Le nom complet est obligatoire"));
                        }

                        if (userRepository.findByEmail(email).isPresent()) {
                                return ResponseEntity.status(HttpStatus.CONFLICT)
                                                .body(Collections.singletonMap("message", "Email déjà utilisé"));
                        }

                        Role userRole = roleRepository.findByName("ROLE_USER")
                                        .orElseThrow(() -> new RuntimeException("Role USER non trouvé"));

                        User user = User.builder()
                                        .email(email)
                                        .password(passwordEncoder.encode(password))
                                        .fullName(fullName)
                                        .address(address)
                                        .phoneNumber(phoneNumber)
                                        .roles(Set.of(userRole))
                                        .build();

                        userRepository.save(user);

                        String jwtToken = jwtService.generateToken(user);

                        return ResponseEntity.ok().body(Map.of(
                                        "token", jwtToken,
                                        "message", "Inscription réussie",
                                        "role", "ROLE_USER"));

                } catch (Exception e) {
                        return ResponseEntity.internalServerError()
                                        .body(Collections.singletonMap("message", "Erreur serveur: " + e.getMessage()));
                }
        }

        public ResponseEntity<?> authenticate(AuthRequest request) {
                try {
                        authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(request.getEmail(),
                                                        request.getPassword()));

                        User user = userRepository.findByEmail(request.getEmail())
                                        .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

                        String jwtToken = jwtService.generateToken(user);

                        String roles = user.getRoles().stream()
                                        .map(Role::getName)
                                        .collect(Collectors.joining(","));

                        return ResponseEntity.ok().body(Map.of(
                                        "token", jwtToken,
                                        "email", user.getEmail(),
                                        "roles", roles));

                } catch (BadCredentialsException e) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                        .body(Collections.singletonMap("message", "Identifiants invalides"));
                } catch (Exception e) {
                        return ResponseEntity.internalServerError()
                                        .body(Collections.singletonMap("message", "Erreur d'authentification"));
                }
        }

        public AuthResponse authenticateWithResponse(AuthRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable"));

                String jwtToken = jwtService.generateToken(user);

                String role = user.getRoles().stream()
                                .findFirst()
                                .map(Role::getName)
                                .orElse("ROLE_USER");

                return new AuthResponse(jwtToken, role);
        }
}
