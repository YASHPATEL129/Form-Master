<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Log In</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      http-equiv="Cache-Control"
      content="no-cache, no-store, must-revalidate"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Pragma" content="no-cache" />

    <link rel="shortcut icon" href="assets/images/favicon.png" />
    <link href="assets/css/icons.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/style.css" rel="stylesheet" type="text/css" />
    <script src="assets/custom/plugins/theme/mytheme.js"></script>
    <link
      href="assets/custom/plugins/theme/mytheme.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="assets/css/bootstrap.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <!-- <link href="assets/plugins/bootstrap-select/css/bootstrap-select.min.css" rel="stylesheet" type="text/css" /> -->
    <link rel="stylesheet" type="text/css" href="assets/login/login.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"
    />
  </head>
  <body>
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <div id="myRole"></div>

        <div class="fadeIn first">
          <img src="assets/images/e5logo.png" id="icon" alt="User Icon" />
        </div>
        <form name="loginForm" class="loginforms">
          <input
            type="text"
            id="login"
            class="fadeIn second"
            name="username"
            placeholder="Your Username"
          />
          <input
            type="password"
            id="password"
            class="fadeIn third"
            name="login"
            placeholder="Password"
            style="margin-left: 6%"
          />

          <i class="fa fa-eye field-icon"></i>

          <!-- <div class="row">
                    <div class="col-md-12">
                        <select class="selectpicker" data-style="lineheight12 bg-transfer" style="width: 100%; margin: 5px; margin-left: 3%;">
                            <option selected="selected" value="">Select Module</option>
                            <option value="1">ENcheck</option>
                            <option value="2">GreenCheck</option>
                            <option value="3">HAScheck</option>
                            <option value="4">INDcheck</option>
                            <option value="5">REScheck</option>
                        </select>
                    </div>
                </div> -->

          <!-- <div class="checkbox checkbox-custom pull-left chkbox">
                    <input id="remember" type="checkbox">
                    <label for="remember">
                        Remember me
                    </label>
                </div> -->
          <div class="text-right">
            <a href="forgotpassword.html" class="text-dark forpw"
              >Forgot your password ?</a
            >
          </div>

          <div id="msg" class="errormsg mt-0">
            <span class="errors">Incorrect Login details!</span>
          </div>
          <a class="submit-form-button fadeIn fourth" href="javascript:login();"
            >Login</a
          >
        </form>
      </div>
    </div>

    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/popper.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <!-- <script src="assets/plugins/bootstrap-select/js/bootstrap-select.js"></script> -->
    <script src="assets/custom/plugins/showpassword/hideShowPassword.min.js"></script>
    <script src="assets/login/main.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script>
      function login() {
        var email = $("#login").val().trim();
        var password = $("#password").val().trim();
        if (email === "") {
          toastr.error("Please enter email");
          return;
        }

        if (password === "") {
          toastr.error("Please enter password");
          return;
        }

        var userData = {
          email: email,
          password: password,
        };

        $.ajax({
          url: "/v1/signIn",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(userData),
          success: function (response) {
            var role = response.data.role;
            var token = response.data.accessToken;
            sessionStorage.setItem("accessToken", token);
            sessionStorage.setItem("role", role);

            if (role === "ADMIN") {
              // redirectWithTokenTOAdmin();
              window.location = "/masterForm";
            } else {
              // redirectWithToken();
              window.location = "/fillForms";
            }
          },
          error: function (xhr) {
            console.log(xhr);
            var errorMessage = xhr.responseJSON.error;
            toastr.error(errorMessage);
          },
        });
      }
      $("#password + .fa").on("click", function () {
        $(this).toggleClass("fa-eye-slash").toggleClass("fa-eye"); // toggle our classes for the eye icon
        $("#password").togglePassword(); // activate the hideShowPassword plugin
      });
    </script>
  </body>
</html>
