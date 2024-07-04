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
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;


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

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> signUp = mapper.readValue(param, Map.class);
        String email = ((String) signUp.get("email")).trim();
        Boolean exists = userRepository.existsByEmail(email);
        if (exists){
            throw new InvalidCredentialsException(Message.EMAIL_ALREADY_EXIST , ErrorKeys.EMAIL_ALREADY_EXIST);
        }
        String imageName;
        if (image != null && !image.isEmpty()){
            imageName = image.getOriginalFilename();
            Files.copy(image.getInputStream(), Path.of(UPLOAD_DIR + File.separator + imageName), StandardCopyOption.REPLACE_EXISTING);
        }else {
            imageName = "default_user.png";
        }

        String password = SystemHelper.generatePassword();
        User user = new User()
                .setFirstName((String) signUp.get("firstName"))
                .setLastName((String) signUp.get("lastName"))
                .setEmail(email)
                .setGender((String) signUp.get("gender"))
                .setContact((String) signUp.get("contact"))
                .setRole((String) signUp.get("role"))
                .setPassword(passwordEncoder.encode(password))
                .setValidForm((LocalDateTime) signUp.get("validForm"))
                .setValidTo((LocalDateTime) signUp.get("validTo"))
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
    public List<Object> getAllUsers() {
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
                    .setActive(existingUser.getActive())
                    .setImageName(existingUser.getImageName());
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
            String imageState = (String) signUp.get("imageState");
            String imageName;
            if (Objects.equals(imageState, "removed")){
                imageName = "default_user.png";
            }else if(Objects.equals(imageState, "uploaded")){
                imageName = image.getOriginalFilename();
                Files.copy(image.getInputStream(), Path.of(UPLOAD_DIR + File.separator + imageName), StandardCopyOption.REPLACE_EXISTING);
            } else {
                imageName = existingUser.getImageName();
            }


            existingUser.setFirstName((String) signUp.get("firstName"));
            existingUser.setLastName((String) signUp.get("lastName"));
            existingUser.setEmail(email);
            existingUser.setGender((String) signUp.get("gender"));
            existingUser.setContact((String) signUp.get("contact"));
            existingUser.setRole((String) signUp.get("role"));
            existingUser.setValidForm((LocalDateTime) signUp.get("validForm"));
            existingUser.setValidTo((LocalDateTime) signUp.get("validTo"));
            existingUser.setImageName(imageName);
            existingUser.setActive((Integer) signUp.get("isAction"));
            existingUser.setModifyBy(currentSession.getId());
            userRepository.save(existingUser);


        }else {
            throw new NotFoundException(Message.USER_NOT_FOUND, ErrorKeys.USER_NOT_FOUND);
        }
    }

    @Override
    public List<Object> getAllUsersBySearch(String role, String searchValue) {
        if (role.isEmpty()){
            role = null;
        }
        return userRepository.findByRoleAndSearchValue(role, searchValue);
    }

    @Override
    public void createUserByCSV(HttpServletRequest request, MultipartFile file) throws IOException {
        List<User> users = parseXLSX(request, file);
        validateUsers(users);
        userRepository.saveAll(users);
    }

    private List<User> parseXLSX(HttpServletRequest request, MultipartFile file) throws IOException {
        String accessToken = request.getHeader("Authorization");
        String jwtToken = accessToken.substring(7);
        getLoginUser(jwtToken);
        List<User> users = new ArrayList<>();
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            int firstRowNum = sheet.getFirstRowNum();
            int lastRowNum = sheet.getLastRowNum();

            for (int i = firstRowNum + 1; i <= lastRowNum; i++) {
                Row row = sheet.getRow(i);
                if (row == null) {
                    continue;
                }
                User user = new User();
                user.setFirstName(getCellValue(row.getCell(0)));
                user.setLastName(getCellValue(row.getCell(1)));
                user.setEmail(getCellValue(row.getCell(2)));
                user.setContact(getCellValue(row.getCell(3)));
                user.setGender(getCellValue(row.getCell(4)).toUpperCase());
                user.setValidForm(parseToLocalDateTime(getCellValue(row.getCell(5))));
                user.setValidTo(parseToLocalDateTime(getCellValue(row.getCell(6))));
                user.setRole(getCellValue(row.getCell(7)).toUpperCase());
                user.setCreateBy(currentSession.getId());
                user.setImageName("default_user.png");
                users.add(user);
            }
        }
        return users;
    }

    private String getCellValue(Cell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    LocalDateTime localDateTime = cell.getLocalDateTimeCellValue();
                    return localDateTime.format(DATE_FORMATTER);
                } else {
                    return BigDecimal.valueOf(cell.getNumericCellValue()).toPlainString();
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return "";
        }
    }

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
    private LocalDateTime parseToLocalDateTime(String dateString) {
        if (dateString == null || dateString.isEmpty()) {
            return null;
        }
        try {
            return LocalDateTime.parse(dateString, DATE_FORMATTER);
        } catch (DateTimeParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    private void validateUsers(List<User> users) {
        int row = 2;
        for (User user : users) {

            // FirstName
            if (user.getFirstName().isEmpty()) {
                throw new InvalidCredentialsException(Message.FIRSTNAME_NULL, ErrorKeys.FIRSTNAME_NULL, new Object[]{row});
            }
            if (!user.getFirstName().matches("[a-zA-Z]+")) {
                throw new InvalidCredentialsException(Message.FIRSTNAME_FORMAT, ErrorKeys.FIRSTNAME_FORMAT, new Object[]{row, user.getFirstName()});
            }
            if (user.getFirstName().length() > 15) {
                throw new InvalidCredentialsException(Message.FIRSTNAME_LENGTH, ErrorKeys.FIRSTNAME_LENGTH, new Object[]{row, user.getFirstName()});
            }

            // LastName
            if (user.getLastName().isEmpty()) {
                throw new InvalidCredentialsException(Message.LASTNAME_NULL, ErrorKeys.LASTNAME_NULL, new Object[]{row});
            }
            if (!user.getLastName().matches("[a-zA-Z]+")) {
                throw new InvalidCredentialsException(Message.LASTNAME_FORMAT, ErrorKeys.LASTNAME_FORMAT, new Object[]{row, user.getLastName()});
            }
            if (user.getLastName().length() > 15) {
                throw new InvalidCredentialsException(Message.LASTNAME_LENGTH, ErrorKeys.LASTNAME_LENGTH, new Object[]{row, user.getLastName()});
            }

            // Email
            if (user.getEmail().isEmpty()) {
                throw new InvalidCredentialsException(Message.EMAIL_NULL, ErrorKeys.EMAIL_NULL, new Object[]{row});
            }
            if (!user.getEmail().matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$")) {
                throw new InvalidCredentialsException(Message.EMAIL_FORMAT, ErrorKeys.EMAIL_FORMAT, new Object[]{row, user.getEmail()});
            }
            Boolean exists = userRepository.existsByEmail(user.getEmail());
            if (exists){
                throw new InvalidCredentialsException(Message.EMAIL_ALREADY_EXIST_BULK , ErrorKeys.EMAIL_ALREADY_EXIST_BULK, new Object[]{row, user.getEmail()});
            }

            // Contact
            if (user.getContact() != null && !user.getContact().isEmpty()) {
                if (!user.getContact().matches("\\d+")) {
                    throw new InvalidCredentialsException(Message.CONTACT_FORMAT , ErrorKeys.CONTACT_FORMAT , new Object[]{row, user.getContact()});
                }
                if (user.getContact().length() != 10) {
                    throw new InvalidCredentialsException(Message.CONTACT_LENGTH , ErrorKeys.CONTACT_LENGTH , new Object[]{row});
                }
            }

            // Gender
            if (user.getGender().isEmpty()) {
                throw new InvalidCredentialsException(Message.GENDER_NULL , ErrorKeys.GENDER_NULL, new Object[]{row});
            }
            if (!user.getGender().equalsIgnoreCase("male") && !user.getGender().equalsIgnoreCase("female")) {
                throw new InvalidCredentialsException(Message.GENDER_FORMAT, ErrorKeys.GENDER_FORMAT, new Object[]{row, user.getGender()});
            }

            // Role
            if (user.getRole().isEmpty()) {
                throw new InvalidCredentialsException(Message.ROLE_NULL, ErrorKeys.ROLE_NULL, new Object[]{row});
            }
            if (!user.getRole().equalsIgnoreCase("admin") && !user.getRole().equalsIgnoreCase("user")) {
                throw new InvalidCredentialsException(Message.ROLE_FORMAT, ErrorKeys.ROLE_FORMAT,new Object[]{row, user.getRole()});
            }


            if (user.getValidForm() != null && user.getValidTo() != null){
                if (user.getValidForm().isAfter(user.getValidTo())) {
                     throw new InvalidCredentialsException(Message.DATE_VALIDATE , ErrorKeys.DATE_VALIDATE, new  Object[]{row, user.getEmail()});
                }
            }
            row++;
        }
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
