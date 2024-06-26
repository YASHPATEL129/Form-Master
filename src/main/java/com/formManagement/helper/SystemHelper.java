package com.formManagement.helper;

import com.formManagement.Entity.User;
import com.formManagement.repository.UserRepository;
import com.formManagement.response.CurrentSession;
import com.formManagement.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

public class SystemHelper {

    @Autowired
    static JwtUtil jwtUtil;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CurrentSession currentSession;

    private static final String UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
    private static final String SPECIAL_CHARACTERS = "!@#$%^&*()-_+=<>?";
    private static final String NUMBERS = "0123456789";
    private static final String ALL_CHARACTERS = UPPERCASE_LETTERS + LOWERCASE_LETTERS + SPECIAL_CHARACTERS + NUMBERS;
    private static final int PASSWORD_LENGTH = 8;

    private static final SecureRandom random = new SecureRandom();

    public static String generatePassword() {
        List<Character> passwordChars = new ArrayList<>();

        passwordChars.add(UPPERCASE_LETTERS.charAt(random.nextInt(UPPERCASE_LETTERS.length())));
        passwordChars.add(LOWERCASE_LETTERS.charAt(random.nextInt(LOWERCASE_LETTERS.length())));
        passwordChars.add(SPECIAL_CHARACTERS.charAt(random.nextInt(SPECIAL_CHARACTERS.length())));
        passwordChars.add(NUMBERS.charAt(random.nextInt(NUMBERS.length())));

        // Fill the remaining length with random characters from the combined pool
        for (int i = 4; i < PASSWORD_LENGTH; i++) {
            passwordChars.add(ALL_CHARACTERS.charAt(random.nextInt(ALL_CHARACTERS.length())));
        }

        // Shuffle the characters to ensure randomness
        Collections.shuffle(passwordChars);

        // Convert list of characters to a string
        StringBuilder password = new StringBuilder();
        for (char c : passwordChars) {
            password.append(c);
        }
        return password.toString();
    }



}
