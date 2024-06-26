package com.formManagement.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.formManagement.Entity.User;
import com.formManagement.consts.ErrorKeys;
import com.formManagement.consts.Message;
import com.formManagement.exception.InvalidCredentialsException;
import com.formManagement.exception.NotFoundException;
import com.formManagement.helper.SystemHelper;
import com.formManagement.param.SignInParam;
import com.formManagement.repository.UserRepository;
import com.formManagement.response.AuthResponse;
import com.formManagement.response.CurrentSession;
import com.formManagement.response.UserDetailsResponse;
import com.formManagement.service.AccountService;
import com.formManagement.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;



@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticateManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${imageUploadPath}")
    String UPLOAD_DIR;

    @Autowired
    private EmailService emailService;

    @Autowired
    CurrentSession currentSession;

    @Override
    public void signUp(String param, MultipartFile image , HttpServletRequest request, HttpServletResponse response) throws IOException {
        String accessToken = request.getHeader("Authorization");
        String jwtToken = accessToken.substring(7);
        getLoginUser(jwtToken);
        String imageName = image.getOriginalFilename();
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> signUp = mapper.readValue(param, Map.class);
        String email = ((String) signUp.get("email")).trim();
        Boolean exists = userRepository.existsByEmail(email);
        if (exists){
            throw new InvalidCredentialsException(Message.EMAIL_ALREADY_EXIST , ErrorKeys.EMAIL_ALREADY_EXIST);
        }

        Files.copy(image.getInputStream(), Path.of(UPLOAD_DIR + File.separator + imageName), StandardCopyOption.REPLACE_EXISTING);
        String password = SystemHelper.generatePassword();
        User user = new User()
                .setFirstName((String) signUp.get("firstName"))
                .setLastName((String) signUp.get("lastName"))
                .setEmail(email)
                .setGender((String) signUp.get("gender"))
                .setContact((String) signUp.get("contact"))
                .setRole((String) signUp.get("role"))
                .setPassword(passwordEncoder.encode(password))
                .setValidForm((String) signUp.get("validForm"))
                .setValidTo((String) signUp.get("validTo"))
                .setImageName(imageName)
                .setCreateBy(currentSession.getId());
        userRepository.save(user);

        String subject = "Welcome to Our Service";
        String text = String.format("Dear %s, %n%nYour account has been created successfully.%n%nEmail: %s%nPassword: %s%n%nRegards,%nYour Company",
                user.getFirstName(), user.getEmail(), password);
        emailService.sendEmail(user.getEmail(), subject, text);
    }

    @Override
    public AuthResponse signIn(SignInParam signInParam, HttpServletRequest request, HttpServletResponse response) {
        try{
            authenticateManager.authenticate(new UsernamePasswordAuthenticationToken(signInParam.getEmail(), signInParam.getPassword()));
        } catch (AuthenticationException ex){
            throw new InvalidCredentialsException(Message.INCORRECT_ACCOUNT_OR_PASSWORD, ErrorKeys.INVALID_EMAIL_AND_PASSWORD);
        }
        AuthResponse authResponse = new AuthResponse();
        var user = userRepository.findByEmail(signInParam.getEmail()).orElseThrow();
        var jwt = jwtUtil.generateToken(user);
//        var refreshToken = jwtUtil.generateRefreshToken(new HashMap<>(), user);
        authResponse.setAccessToken(jwt);
//        authResponse.setRefreshToken(refreshToken);
        authResponse.setEmail(user.getEmail());
        authResponse.setFirstName(user.getFirstName());
        authResponse.setLastName(user.getLastName());
        authResponse.setContact(user.getContact());
        authResponse.setGender(user.getGender());
        authResponse.setRole(user.getRole());
        return authResponse;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    @Override
    public void deleteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User existingUser = user.get();
            existingUser.setActive(9);
            userRepository.save(existingUser);
        }else {
            throw new NotFoundException(Message.USER_NOT_FOUND, ErrorKeys.USER_NOT_FOUND);
        }
    }

    @Override
    public UserDetailsResponse getUserDetailsById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User existingUser = user.get();
            return new UserDetailsResponse()
                    .setFirstName(existingUser.getFirstName())
                    .setLastName(existingUser.getLastName())
                    .setEmail(existingUser.getEmail())
                    .setContact(existingUser.getContact())
                    .setRole(String.valueOf(existingUser.getRole()))
                    .setGender(existingUser.getGender())
                    .setValidForm(existingUser.getValidForm())
                    .setValidTo(existingUser.getValidTo())
                    .setActive(existingUser.getActive());
        }else {
            throw new NotFoundException(Message.USER_NOT_FOUND, ErrorKeys.USER_NOT_FOUND);
        }
    }

    @Override
    public void updateUser(HttpServletRequest request ,Long id,String param, MultipartFile image ) throws IOException {
        String accessToken = request.getHeader("Authorization");
        String jwtToken = accessToken.substring(7);
        getLoginUser(jwtToken);
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()){
            User existingUser = user.get();
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> signUp = mapper.readValue(param, Map.class);
            String email = ((String) signUp.get("email")).trim();
            User count = userRepository.findByEmailWithActive(email);
            if (count != null) {
                if (!Objects.equals(count.getId(), id)) {
                    throw new InvalidCredentialsException(Message.EMAIL_ALREADY_EXIST, ErrorKeys.EMAIL_ALREADY_EXIST);
                }
            }
            String imageName = existingUser.getImageName();
            if (image != null && !image.isEmpty()){
                imageName = image.getOriginalFilename();
                Files.copy(image.getInputStream(), Path.of(UPLOAD_DIR + File.separator + imageName), StandardCopyOption.REPLACE_EXISTING);
            }
            existingUser.setFirstName((String) signUp.get("firstName"));
            existingUser.setLastName((String) signUp.get("lastName"));
            existingUser.setEmail(email);
            existingUser.setGender((String) signUp.get("gender"));
            existingUser.setContact((String) signUp.get("contact"));
            existingUser.setRole((String) signUp.get("role"));
            existingUser.setValidForm((String) signUp.get("validForm"));
            existingUser.setValidTo((String) signUp.get("validTo"));
            existingUser.setImageName(imageName);
            existingUser.setModifyBy(currentSession.getId());
            userRepository.save(existingUser);


        }else {
            throw new NotFoundException(Message.USER_NOT_FOUND, ErrorKeys.USER_NOT_FOUND);
        }
    }

    @Override
    public List<User> getAllUsersBySearch(String role, String searchValue) {
        if (role.isEmpty()){
            role = null;
        }
        return userRepository.findByRoleAndSearchValue(role, searchValue);
    }
    public void getLoginUser(String Token) {
        String email = jwtUtil.extractUsername(Token);
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            User existingUser = user.get();
            currentSession.setId(existingUser.getId());
            currentSession.setEmail(existingUser.getEmail());
            currentSession.setRole(existingUser.getRole());
            currentSession.setContact(existingUser.getContact());
            currentSession.setGender(existingUser.getGender());
            currentSession.setFirstName(existingUser.getFirstName());
            currentSession.setLastName(existingUser.getLastName());
        }
    }
}
