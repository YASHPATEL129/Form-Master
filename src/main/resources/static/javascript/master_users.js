const accessToken = sessionStorage.getItem("accessToken");

const headers = {
  Authorization: `Bearer ${accessToken}`,
};
$(document).ready(function () {
  getAllUsers();
});

function getUserBySerach() {
  $("#users_datatable").empty();

  var role = $("#searchRole").val().trim();

  if (role == "") {
    role = null;
  }

  var query = $("#query").val().trim();

  $("#users_datatable").DataTable({
    destroy: true,
    scrollX: true,
    autoWidth: true,
    paging: true,
    lengthChange: false,
    pageLength: 10,
    language: {
      paginate: {
        next: '<i class="fa fa-angle-double-right">',
        previous: '<i class="fa fa-angle-double-left">',
      },
    },
    dom: '<"top"pif>rt<"clear">',
    ajax: {
      url: "/v1/getAllUserBySearch", // Replace with your Spring Boot API endpoint
      method: "GET",
      headers: headers,
      data: {
        role: role,
        searchValue: query,
      },
      dataSrc: function (response) {
        console.log("AJAX response: ", response); // Debugging response
        if (
          response.message === "Data get successful" &&
          Array.isArray(response.data)
        ) {
          return response.data;
        } else {
          console.error("Invalid response format: ", response);
          return [];
        }
      },
      error: function (error) {
        console.error("Error fetching data:", error);
      },
    },
    columns: [
      {
        data: null,
        render: function (data, type, row) {
          return `<h2 class="table-avatar">
                                
                                  <a href="javascript:void(0)" data-toggle="popover" data-trigger="hover" data-html="true" data-placement="right"   data-template='<div class="popover fade bs-popover-right" role="tooltip" x-placement="right"><div class="arrow"></div><h3 class="popover-header p-0 border_radius6"></h3></div>' data-title="<img src='/image/${data.imageName}' width='150' height='150' class='border_radius6'>"     data-original-title=""
                                  title="">
                                    <img src='/image/${data.imageName}' alt='' class='img-radius avatar'/>
                                </a>
                                <span>${data.firstName} ${data.lastName}</span>
                            </h2>`;
        },
        className: "text-center",
      },
      { data: "email" },
      { data: "contact" },
      { data: "validForm" },
      { data: "validTo" },
      { data: "gender" },
      { data: "role" },
      {
        data: "active",
        render: function (data, type, row) {
          return data === 1 ? "Yes" : "No";
        },
      },
      {
        data: null,
        className: "text-center",
        orderable: false,
        render: function (data, type, row) {
          return `
                        <a href="javascript:void(0)" class="text-success fa-size client_add_btn" data-toggle="tooltip" data-placement="bottom" title="Edit" onclick="editUser(${data.id})">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <span class="delete-user-alert">
                            <a href="javascript:void(0)" class="text-danger fa-size" data-toggle="tooltip" data-placement="bottom" title="Delete" onclick="deletedUser(${data.id})">
                                <i class="fa fa-trash"></i>
                            </a>
                        </span>
                    `;
        },
      },
    ],
    drawCallback: function () {
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="popover"]').popover();
    },
  });
}

function getAllUsers() {
  $("#users_datatable").DataTable({
    destroy: true,
    scrollX: true,
    autoWidth: true,
    paging: true,
    lengthChange: false,
    pageLength: 10,
    language: {
      paginate: {
        next: '<i class="fa fa-angle-double-right">',
        previous: '<i class="fa fa-angle-double-left">',
      },
    },
    dom: '<"top"pif>rt<"clear">',
    ajax: {
      url: "/v1/getAllUsers", // Replace with your Spring Boot API endpoint
      method: "GET",
      headers: headers,
      dataSrc: function (response) {
        console.log("AJAX response: ", response); // Debugging response
        if (
          response.message === "Data get successful" &&
          Array.isArray(response.data)
        ) {
          return response.data;
        } else {
          console.error("Invalid response format: ", response);
          return [];
        }
      },
      error: function (error) {
        console.error("Error fetching data:", error);
      },
    },
    columns: [
      {
        data: null,
        render: function (data, type, row) {
          return `<h2 class="table-avatar">
                                
                                  <a href="javascript:void(0)" data-toggle="popover" data-trigger="hover" data-html="true" data-placement="right"   data-template='<div class="popover fade bs-popover-right" role="tooltip" x-placement="right"><div class="arrow"></div><h3 class="popover-header p-0 border_radius6"></h3></div>' data-title="<img src='/image/${data.imageName}' width='150' height='150' class='border_radius6'>"     data-original-title=""
                                  title="">
                                    <img src='/image/${data.imageName}' alt='' class='img-radius avatar'/>
                                </a>
                                <span>${data.firstName} ${data.lastName}</span>
                            </h2>`;
        },
        className: "text-center",
      },
      { data: "email" },
      { data: "contact" },
      { data: "validForm" },
      { data: "validTo" },
      { data: "gender" },
      { data: "role" },
      {
        data: "active",
        render: function (data, type, row) {
          return data === 1 ? "Yes" : "No";
        },
      },
      {
        data: null,
        className: "text-center",
        orderable: false,
        render: function (data, type, row) {
          return `
                        <a href="javascript:void(0)" class="text-success fa-size client_add_btn" data-toggle="tooltip" data-placement="bottom" title="Edit" onclick="editUser(${data.id})">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <span class="delete-user-alert">
                            <a href="javascript:void(0)" class="text-danger fa-size" data-toggle="tooltip" data-placement="bottom" title="Delete" onclick="deletedUser(${data.id})">
                                <i class="fa fa-trash"></i>
                            </a>
                        </span>
                    `;
        },
      },
    ],
    drawCallback: function () {
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="popover"]').popover();
    },
  });
}

$("#addUser").on("click", function () {
  cleanUserForm();
  $("#avtiveCheckBox").removeClass("displayblock").addClass("d-none");
});
let user_id;
$("#saveButton").on("click", function () {
  if (user_id) {
    updateUser(user_id);
  } else {
    createUser();
  }
});
function valiedAddUser() {
  var firstName = $("#firstName").val().trim();
  var lastName = $("#lastName").val().trim();
  var email = $("#email").val().trim();
  var contact = $("#contact").val().trim();
  var gender = $("#gender").val().trim();
  var valiedForm = $("#valid_from").val().trim();
  var validTo = $("#valid_to").val().trim();
  var role = $("#role").val().trim();

  if (firstName == "") {
    toastr.error("Please enter First Name");
    return false;
  }

  if (lastName == "") {
    toastr.error("Please enter Last Name");
    return false;
  }
  if (email == "") {
    toastr.error("Please enter Email");
    return false;
  }

  if (contact == "") {
    toastr.error("Please enter Contact");
    return false;
  }

  if (gender == "") {
    toastr.error("Please enter Gender");
    return false;
  }
  if (valiedForm == "") {
    toastr.error("Please enter Valid Form");
    return false;
  }
  if (validTo == "") {
    toastr.error("Please enter Valid To");
    return false;
  }
  if (role == "") {
    toastr.error("Please enter Role");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    toastr.error("Please enter a valid email address.");
    return false;
  }
  return true;
}

function createUser() {
  if (valiedAddUser()) {
    var image = $("#inputImage").val().trim();
    if (image == "") {
      toastr.error("Please select Image");
      return false;
    }
    var formData = new FormData();
    var userData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      contact: document.getElementById("contact").value,
      gender: document.getElementById("gender").value,
      validForm: document.getElementById("valid_from").value,
      validTo: document.getElementById("valid_to").value,
      role: document.getElementById("role").value,
    };

    // Convert product data to JSON string
    var jsonData = JSON.stringify(userData);
    formData.append("data", jsonData);

    // Append image file
    var fileInput = document.getElementById("inputImage");
    if (fileInput.files.length > 0) {
      formData.append("Image", fileInput.files[0]);
    }

    $.ajax({
      url: "/v1/signup",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      headers: headers,
      success: function (response) {
        toastr.success(response.message);
        $("#portfolio_details").show();
        $("#portfolio_add_detail").hide();
        cleanUserForm();
        getAllUsers();
      },
      error: function (xhr) {
        console.log(xhr);
        var errorMessage = xhr.responseJSON.error;
        toastr.error(errorMessage);
      },
    });
  }
}

function cleanUserForm() {
  $("#firstName").val("");
  $("#lastName").val("");
  $("#email").val("");
  $("#date_from").val("");
  $("#contact").val("");
  $("#gender").val("");
  $("#valid_from").val("");
  $("#valid_to").val("");
  $("#role").val("");
  $("#gender, #role").selectpicker("refresh");
  document.getElementById("userImage").src =
    "assets/images/users/default_user.png";
  document.getElementById("inputImage").value = "";
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#userImage").attr("src", e.target.result).width(155).height(155);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

document.getElementById("clean").addEventListener("click", function () {
  document.getElementById("userImage").src =
    "assets/images/users/default_user.png";
  document.getElementById("fileInput").value = ""; // Clear the file input
});

function allowOnlyLetters(input) {
  input.on("input", function () {
    var value = $(this).val();
    // Remove non-letter characters
    value = value.replace(/[^a-zA-Z\s]/g, "");
    // Update the input value
    $(this).val(value);
  });
}

// Apply the function to the input fields
allowOnlyLetters($("#firstName"));
allowOnlyLetters($("#lastName"));

function allowOnlyNumber(input) {
  input.on("input", function () {
    var value = $(this).val();
    // Remove non-letter characters
    value = value.replace(/[^0-9]/g, "");
    // Update the input value
    $(this).val(value);
  });
}

allowOnlyNumber($("#contact"));

function deletedUser(userId) {
  $.confirm({
    title: "Delete Record..!",
    content: "Please be sure before deleting record",
    theme: "material",
    icon: "fa fa-warning",
    type: "red",
    buttons: {
      omg: {
        text: "Delete",
        btnClass: "btn-red",
        action: function () {
          $.ajax({
            type: "DELETE",
            url: "/v1/deleteUser/" + userId, // Adjust the URL according to your API endpoint
            headers: headers,
            success: function (response) {
              toastr.success(response.message);
              getAllUsers();
            },
            error: function (xhr) {
              console.log(xhr);
              var errorMessage = xhr.responseJSON.error;
              toastr.error(errorMessage);
            },
          });
        },
      },
      close: function () {},
    },
  });
}

function editUser(userId) {
  $("#avtiveCheckBox").addClass("displayblock").removeClass("d-none");
  $.ajax({
    type: "GET",
    url: "/v1/getUserDetails/" + userId,
    headers: headers,
    success: function (response) {
      // Assuming the response contains category data like categoryName and description
      var firstName = response.data.firstName;
      var lastName = response.data.lastName;
      var email = response.data.email;
      var contact = response.data.contact;
      var gender = response.data.gender;
      var role = response.data.role;
      var validForm = response.data.validForm;
      var validTo = response.data.validTo;
      var active = response.data.active;

      // Set the data to the modal inputs
      $("#firstName").val(firstName);
      $("#lastName").val(lastName);
      $("#email").val(email);
      $("#gender").val(gender);
      $("#gender").trigger("change");
      $("#contact").val(contact);
      $("#valid_from").val(validForm);
      $("#valid_to").val(validTo);
      $("#role").val(role);
      $("#role").trigger("change");

      if (active == 1) {
        $("#active").prop("checked", true);
      } else {
        $("#active").prop("checked", false);
      }
      user_id = userId;
    },
    error: function (xhr) {
      console.error("Error fetching category data:", xhr);
    },
  });
}

function updateUser(userId) {
  if (valiedAddUser()) {
    var formData = new FormData();
    var userData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      contact: document.getElementById("contact").value,
      gender: document.getElementById("gender").value,
      validForm: document.getElementById("valid_from").value,
      validTo: document.getElementById("valid_to").value,
      role: document.getElementById("role").value,
    };

    // Convert product data to JSON string
    var jsonData = JSON.stringify(userData);
    formData.append("data", jsonData);

    // Append image file
    var fileInput = document.getElementById("inputImage");
    if (fileInput.files.length > 0) {
      formData.append("Image", fileInput.files[0]);
    }

    $.ajax({
      url: "/v1/updateUserDetails/" + userId,
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      headers: headers,
      success: function (response) {
        toastr.success(response.message);
        $("#portfolio_details").show();
        $("#portfolio_add_detail").hide();
        cleanUserForm();
        getAllUsers();
      },
      error: function (xhr) {
        console.log(xhr);
        var errorMessage = xhr.responseJSON.error;
        toastr.error(errorMessage);
      },
    });
  }
}
