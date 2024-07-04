const accessToken = sessionStorage.getItem("accessToken");

const headers = {
  Authorization: `Bearer ${accessToken}`,
};

$(document).ready(function () {
  // Fetch and populate data on document ready
  fetchAndPopulateData();
  $.ajax({
    type: "GET",
    url: "/getAllModules",
    headers: headers,
    success: function (response) {
      console.log(response);
      $("#moduleSelect").empty();

      // Append a default option
      var defaultOption = $("<option></option>")
        .attr("value", "")
        .attr("disabled", true)
        .attr("selected", true)
        .text("Select");
      $("#moduleSelect").append(defaultOption);
      // Iterate over the received category data and create options dynamically
      response.data.forEach(function (item) {
        // Create option element
        var option = $("<option></option>")
          .attr("value", item[0])
          .text(item[1]);
        // Append option to select element with ID "mySelect"

        $("#moduleSelect").append(option);
      });
      // Refresh the selectpicker to update the UI
      $("#moduleSelect")
        .selectpicker({
          hideDisabled: true, // Hide options that are not selected in the dropdown
        })
        .selectpicker("refresh");
    },
    error: function (xhr) {
      var errorMessage = xhr.responseJSON.error;
      console.log(errorMessage);
    },
  });

  // Event listener for when a module is selected
  $("#moduleSelect").on("change", function () {
    var selectedModule = $(this).val();

    // Make an AJAX call to the Spring Boot API with the selected module
    $.ajax({
      type: "get",
      url: "/getCharacteristics/" + selectedModule, // Update with your Spring Boot API endpoint
      headers: headers,
      success: function (response) {
        // Append a default option

        $("#characteristicSelect").empty();

        var defaultOption = $("<option></option>")
          .attr("value", "")
          .attr("disabled", true)
          .attr("selected", true)
          .text("Select");
        $("#characteristicSelect").append(defaultOption);
        // Iterate over the received category data and create options dynamically
        response.data.forEach(function (item) {
          // Create option element
          var option = $("<option></option>")
            .attr("value", item[0])
            .text(item[1]);
          // Append option to select element with ID "mySelect"

          $("#characteristicSelect").append(option);
        });
        // Refresh the selectpicker to update the UI
        $("#characteristicSelect")
          .selectpicker({
            hideDisabled: true, // Hide options that are not selected in the dropdown
          })
          .selectpicker("refresh");

        if (characteristic_id) {
          $("#characteristicSelect").val(characteristic_id);
          $("#characteristicSelect").trigger("change");
        }
      },
      error: function (xhr) {
        var errorMessage = xhr.responseJSON.error;
        console.log("Error processing module:", errorMessage);
      },
    });
  });

  // Event listener for when a module is selected
  $("#characteristicSelect").on("change", function () {
    var selectedCharacteristic = $(this).val();

    // Make an AJAX call to the Spring Boot API with the selected module
    $.ajax({
      type: "get",
      url: "/getSubcharacteristics/" + selectedCharacteristic, // Update with your Spring Boot API endpoint
      headers: headers,
      success: function (response) {
        $("#subCharacteristicSelect").empty();
        // Append a default option
        var defaultOption = $("<option></option>")
          .attr("value", "")
          .attr("disabled", true)
          .attr("selected", true)
          .text("Select");
        $("#subCharacteristicSelect").append(defaultOption);

        // Iterate over the received category data and create options dynamically
        response.data.forEach(function (item) {
          // Create option element
          var option = $("<option></option>")
            .attr("value", item[0])
            .text(item[1]);
          // Append option to select element with ID "mySelect"

          $("#subCharacteristicSelect").append(option);
        });
        // Refresh the selectpicker to update the UI
        $("#subCharacteristicSelect")
          .selectpicker({
            hideDisabled: true, // Hide options that are not selected in the dropdown
          })
          .selectpicker("refresh");

        if (subCharacteristic_id) {
          $("#subCharacteristicSelect").val(subCharacteristic_id);
          $("#subCharacteristicSelect").trigger("change");
        }
      },
      error: function (xhr) {
        var errorMessage = xhr.responseJSON.error;
        console.log("Error processing module:", errorMessage);
      },
    });
  });
  $.ajax({
    type: "GET",
    url: "/getRecurrance",
    headers: headers,
    success: function (response) {
      console.log(response);
      $("#recurrenceSelect").empty();

      // Append a default option
      var defaultOption = $("<option></option>")
        .attr("value", "")
        .attr("disabled", true)
        .attr("selected", true)
        .text("Select");
      $("#recurrenceSelect").append(defaultOption);
      // Iterate over the received category data and create options dynamically
      response.data.forEach(function (item) {
        // Create option element
        var option = $("<option></option>")
          .attr("value", item[0])
          .text(item[1]);
        // Append option to select element with ID "mySelect"

        $("#recurrenceSelect").append(option);
      });
      // Refresh the selectpicker to update the UI
      $("#recurrenceSelect")
        .selectpicker({
          hideDisabled: true, // Hide options that are not selected in the dropdown
        })
        .selectpicker("refresh");
    },
    error: function (xhr) {
      var errorMessage = xhr.responseJSON.error;
      console.log(errorMessage);
    },
  });

  $.ajax({
    type: "GET",
    url: "/getMonths",
    headers: headers,
    success: function (response) {
      console.log(response);
      $("#monthSelect").empty();

      // Append a default option
      var defaultOption = $("<option></option>")
        .attr("value", "")
        .attr("disabled", true)
        .attr("selected", true)
        .text("Select");
      $("#monthSelect").append(defaultOption);
      // Iterate over the received category data and create options dynamically
      response.data.forEach(function (item) {
        // Create option element
        var option = $("<option></option>")
          .attr("value", item[0])
          .text(item[1]);
        // Append option to select element with ID "mySelect"

        $("#monthSelect").append(option);
      });
      // Refresh the selectpicker to update the UI
      $("#monthSelect")
        .selectpicker({
          hideDisabled: true, // Hide options that are not selected in the dropdown
        })
        .selectpicker("refresh");
    },
    error: function (xhr) {
      var errorMessage = xhr.responseJSON.error;
      console.log(errorMessage);
    },
  });
  $.ajax({
    type: "GET",
    url: "/getAnswersTypes",
    headers: headers,
    success: function (response) {
      console.log(response);
      $("#answerSelect").empty();

      // Append a default option
      var defaultOption = $("<option></option>")
        .attr("value", "")
        .attr("disabled", true)
        .attr("selected", true)
        .text("Select");
      $("#answerSelect").append(defaultOption);
      // Iterate over the received category data and create options dynamically
      response.data.forEach(function (item) {
        // Create option element
        var option = $("<option></option>")
          .attr("value", item[0])
          .text(item[1]);
        // Append option to select element with ID "mySelect"

        $("#answerSelect").append(option);
      });
      // Refresh the selectpicker to update the UI
      $("#answerSelect")
        .selectpicker({
          hideDisabled: true, // Hide options that are not selected in the dropdown
        })
        .selectpicker("refresh");
    },
    error: function (xhr) {
      var errorMessage = xhr.responseJSON.error;
      console.log(errorMessage);
    },
  });

  $("#compliancePeriod").on("input", function () {
    var value = $(this).val();
    // Remove non-numeric characters
    value = value.replace(/[^0-9]/g, "");

    // Check if the value is within the range 1-12
    if (value !== "" && (parseInt(value) < 1 || parseInt(value) > 12)) {
      value = value.substring(0, value.length - 1); // Remove last character
    }

    // Update the input value
    $(this).val(value);
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
  allowOnlyLetters($("#titleText"));
  allowOnlyLetters($("#aliasName"));

  $("#addForm").on("click", function () {
    characteristic_id = null;
    subCharacteristic_id = null;
    questionUpdatetime = "createTime";
    questionsArray.length = 0;

    cleanForm();
    clearDataTable();
    $.ajax({
      type: "GET",
      url: "/getFormId",
      headers: headers,
      success: function (response) {
        // Set the form ID in the input field
        $("#formId").val(response.data.formId);
      },
      error: function (xhr) {
        console.error("Error fetching form ID:", xhr);
      },
    });
    $("#avtiveCheckBox").removeClass("displayblock").addClass("d-none");
  });

  $("#addQuestion").on("click", function () {
    question_id = null;
    cleanQuestion();
  });
});

function clearDataTable() {
  var table = $("#formquestion_datatable").DataTable();
  table.clear().draw();
}
let form_id;
let characteristic_id;
let subCharacteristic_id;
$("#saveButton").on("click", function () {
  if (form_id) {
    updateForm(form_id);
  } else {
    createForm();
  }
});

function fetchAndPopulateData() {
  $("#form_datatable").DataTable({
    destroy: true, // Ensure the table is re-initialized properly
    ajax: {
      url: "/getFormDetails", // Update this URL to your API endpoint
      method: "GET",
      headers: headers,
      dataSrc: function (response) {
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
        window.location = "/logIn";
        console.error("Error fetching data:", error);
      },
    },
    columns: [
      { data: 1 }, // Form # (from the first item in each sub-array)
      { data: 2 }, // Form Title (from the second item in each sub-array)
      {
        data: 3, // Active status (from the fourth item in each sub-array)
        render: function (data, type, row, meta) {
          return data === 1 ? "Yes" : "No";
        },
      },
      {
        data: 4,
        orderable: false,
        render: function (data, type, row, meta) {
          var id = row[0];
          return `
            <a href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" title="Edit" class="text-success fa-size client_add_btn" onclick="editForm(${id})"><i class="fa fa-pencil"></i></a> 
            <span data-toggle="modal" data-target="#all_question_preview" onclick="loadFormQuestions(${id})"><a href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" title="Preview" class="text-info fa-size"><i class="fa fa-eye"></i></a></span> 
            <span class="delete-user-alert" onclick="deletedForm(${id})"><a href="javascript:void(0)" class="text-danger fa-size" data-toggle="tooltip" data-placement="bottom" title="Delete"><i class="fa fa-trash"></i></a></span>
          `;
        },
      },
    ],
    pageLength: 10,
    scrollX: true,
    paging: true,
    bAutoWidth: true,
    bLengthChange: false,
    columnDefs: [{ targets: 3, orderable: false }],
    fixedColumns: {
      rightColumns: 1,
      leftColumns: 0,
    },
    language: {
      paginate: {
        next: '<i class="fa fa-angle-double-right">',
        previous: '<i class="fa fa-angle-double-left">',
      },
    },
    dom: '<"top"pif>rt<"clear">',
  });
}
function valiedQuestion() {
  var questionLabel = $("#questionLabel").val().trim();
  var questionName = $("#questionName").val().trim();
  var description = $("#description").val().trim();
  var answerSelect = $("#answerSelect").val().trim();

  if (questionLabel == "") {
    toastr.error("Please enter Question Label");
    return false;
  }

  if (questionName == "") {
    toastr.error("Please enter Question Name");
    return false;
  }
  if (answerSelect == "") {
    toastr.error("Please enter Answer Type");
    return false;
  }

  if ($("#validatans").is(":checked")) {
    console.log($("#validatans").is(":checked"));
    var validateId = $("#validateDropdown option:selected").val();
    console.log(validateId);
    if (validateId == "") {
      toastr.error("Please enter validated");
      return false;
    }
  }
  return true;
}

function createQuestion() {
  if (valiedQuestion()) {
    addRow();
  }
}

let questionCounter = 0;
let questionsArray = [];
function addRow() {
  let inputValues = [];
  var questionLabel = $("#questionLabel").val().trim();
  var questionName = $("#questionName").val().trim();
  var description = $("#description").val().trim();
  var answerSelect = $("#answerSelect").val().trim();
  var requireAnswer = $("#reqans").is(":checked") ? "Yes" : "No";
  var validateId;
  if (
    $("#validatans").is(":checked") &&
    (answerSelect == 4 || answerSelect == 5)
  ) {
    console.log($("#validatans").is(":checked"));
    validateId = $("#validateDropdown option:selected").val();
  } else {
    validateId = 0;
  }

  if (answerSelect == 1) {
    requireAnswer = "No"; // Ensure requireAnswer is "No" for answerSelect = 1
  }

  let firstInputValue;
  if (answerSelect == 2) {
    firstInputValue = $('.singlechoicedata input[type="text"]')
      .first()
      .val()
      .trim();
    $('.singlechoicedata input[type="text"]').each(function () {
      if ($(this).val().trim()) {
        inputValues.push($(this).val().trim());
      }
    });
  } else if (answerSelect == 3) {
    firstInputValue = $('.multichoicedata input[type="text"]')
      .first()
      .val()
      .trim();
    $('.multichoicedata input[type="text"]').each(function () {
      if ($(this).val().trim()) {
        inputValues.push($(this).val().trim());
      }
    });
  } else if (answerSelect == 6) {
    firstInputValue = $('.singleselectdata input[type="text"]')
      .first()
      .val()
      .trim();
    $('.singleselectdata input[type="text"]').each(function () {
      if ($(this).val().trim()) {
        inputValues.push($(this).val().trim());
      }
    });
  } else if (answerSelect == 7) {
    firstInputValue = $('.multiselectdata input[type="text"]')
      .first()
      .val()
      .trim();
    $('.multiselectdata input[type="text"]').each(function () {
      if ($(this).val().trim()) {
        inputValues.push($(this).val().trim());
      }
    });
  }

  if (
    (answerSelect == 2 ||
      answerSelect == 3 ||
      answerSelect == 6 ||
      answerSelect == 7) &&
    !firstInputValue
  ) {
    toastr.error("Please enter at least the first option.");
    return;
  }

  var answerTypes;
  switch (answerSelect) {
    case "1":
      answerTypes = "No Answer Required";
      break;
    case "2":
      answerTypes = "Single Choice";
      break;
    case "3":
      answerTypes = "Multiple Choice";
      break;
    case "4":
      answerTypes = "Single Textbox";
      break;
    case "5":
      answerTypes = "Multiline Textbox";
      break;
    case "6":
      answerTypes = "Single Select Dropdown";
      break;
    case "7":
      answerTypes = "Multi Select Dropdown";
      break;
    case "8":
      answerTypes = "Date";
      break;
  }

  questionCounter++;
  let questionId = questionCounter;

  // Create a question object
  const questionObject = {
    questionId: questionId,
    questionLabel: questionLabel,
    questionName: questionName,
    description: description,
    answerSelect: answerSelect,
    requireAnswer: requireAnswer,
    inputValues: inputValues,
    validateId: validateId,
  };

  // Add the question object to the questionsArray
  questionsArray.push(questionObject);

  // Create a new row
  var newRow = [
    questionId,
    questionName,
    answerTypes,
    requireAnswer,
    '<span data-toggle="modal" data-target=".addformquestion"><a href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" data-original-title="Edit" class="text-success fa-size" onclick="editQuestion(' +
      questionId +
      ')"><i class="fa fa-pencil"></i></a></span> <span class="delete-user-alert"><a href="javascript:void(0)" class="text-danger fa-size" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete" onclick="deleteQuestion(' +
      questionId +
      ')"><i class="fa fa-trash"></i></a></span>',
  ];

  // Add the new row to the DataTable
  $("#formquestion_datatable").DataTable().row.add(newRow).draw();

  // Clear the form fields after adding the row
  // $("#questionLabel").val("");
  // $("#questionName").val("");
  // $("#description").val("");
  // $("#answerSelect").val("");
  // $("#reqans").prop("checked", false);
  // $("#validatans").prop("checked", false);
  // $("#answerSelect").selectpicker("refresh");
  // $("#validateDropdown").selectpicker("refresh");
  // $(".addformquestion").modal("hide");
  // $(".multiselectdata").hide();
  // $(".multichoicedata").hide();
  // $(".singlechoicedata").hide();
  // $(".singleselectdata").hide();
  // $(".hidetextvalidation").hide();
  // $(".showanswershouldbe").hide();
  // $(".hidedatevalidation").hide();
  // $(".noansdisplaynone").show();
  // // Clear the values of the input fields
  // $('.singlechoicedata input[type="text"]').val("");
  // $('.multichoicedata input[type="text"]').val("");
  // $('.singleselectdata input[type="text"]').val("");
  // $('.multiselectdata input[type="text"]').val("");
  $(".addformquestion").modal("hide");
  cleanQuestion();
}

// Function to delete a row and remove corresponding data from questionsArray
function deleteRow(questionId) {
  // Remove the row from the DataTable
  var table = $("#formquestion_datatable").DataTable();
  table.rows().every(function () {
    var rowData = this.data();
    if (rowData[0] === questionId) {
      this.remove().draw();
    }
  });

  // Remove the corresponding question object from questionsArray
  questionsArray = questionsArray.filter(function (question) {
    return question.questionId !== questionId;
  });
}

function deleteQuestion(questionId) {
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
          deleteRow(parseInt(questionId));
        },
      },
      close: function () {},
    },
  });
}

function deleteEditTimeRow(questionId) {
  // Get the DataTable instance
  var table = $("#formquestion_datatable").DataTable();

  // Find the row index corresponding to the questionId
  var rowIndex = table
    .rows()
    .eq(0)
    .filter(function (rowIdx) {
      return table.cell(rowIdx, 0).data() === questionId;
    });

  // Ensure the row index is found
  if (rowIndex.length > 0) {
    // Remove the row from the DataTable
    table.row(rowIndex).remove().draw();
    deleteQuestionFromEditFormData(parseInt(questionId));
  } else {
    console.error("Row with questionId", questionId, "not found.");
  }
}
function deleteQuestionFromEditFormData(questionId) {
  // Find the index of the question to be deleted
  const questionIndex = editFormData.findIndex(
    (question) => question.questionId === questionId
  );

  // Ensure the question is found
  if (questionIndex !== -1) {
    // Remove the question from the global variable
    editFormData.splice(questionIndex, 1);
    console.log(`Question with ID ${questionId} deleted from editFormData.`);
  } else {
    console.error(
      "Question with questionId",
      questionId,
      "not found in editFormData."
    );
  }
}

function deleteEditQuestion(questionId) {
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
          deleteEditTimeRow(parseInt(questionId));
        },
      },
      close: function () {},
    },
  });
}

// Function to handle the edit action
function editQuestion(questionId) {
  // Find the question object in questionsArray based on questionId
  const questionObject = questionsArray.find(
    (question) => question.questionId === questionId
  );

  // Populate the modal with the values from the question object
  $("#questionLabel").val(questionObject.questionLabel);
  $("#questionName").val(questionObject.questionName);
  $("#description").val(questionObject.description);
  $("#answerSelect").val(questionObject.answerSelect); // Set the answer type select element
  $("#answerSelect").selectpicker("refresh"); // Refresh the selectpicker to update the selected option
  $("#reqans").prop("checked", questionObject.requireAnswer === "Yes");
  var validated = questionObject.validateId;
  if (validated != 0) {
    $("#validatans").prop("checked", true);
    $(".showanswershouldbe").show();
    $("#validateDropdown").val(validated);
    $("#validateDropdown").selectpicker("refresh");
  }

  var addNewRow =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singlechoiceadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singlechoiceremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";
  var addNewRowForMultiChoice =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multichoiceadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multichoiceremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";
  var addNewRowForSingleSelect =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singleselectadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singleselectremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";

  var addNewRowForMultiSelect =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multiselectadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multiselectremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";

  // Show only the relevant input field group based on answerSelect
  switch (questionObject.answerSelect) {
    case "1": // No Answer
      $(".noansdisplaynone").hide();
      break;
    case "2": // Single Choice
      var singleChoiceInputs = $('.singlechoicedata input[type="text"]');
      var container = $(".singlechoicedata tbody"); // Assuming tbody is used to contain rows

      // Remove existing rows if necessary
      container.empty();

      for (var i = 0; i < questionObject.inputValues.length; i++) {
        container.append(addNewRow); // Add new row
      }

      // Populate input fields
      singleChoiceInputs = container.find('input[type="text"]'); // Re-select after adding rows
      for (var j = 0; j < questionObject.inputValues.length; j++) {
        $(singleChoiceInputs[j]).val(questionObject.inputValues[j] || "");
      }

      $(".singlechoicedata").show();
      break;
    case "3": // Multiple Choice
      var multiChoiceContainer = $(".multichoicedata tbody"); // Assuming tbody is used to contain rows
      multiChoiceContainer.empty(); // Remove existing rows if necessary

      for (var i = 0; i < questionObject.inputValues.length; i++) {
        multiChoiceContainer.append(addNewRowForMultiChoice); // Add new row
      }

      var multiChoiceInputs = multiChoiceContainer.find('input[type="text"]'); // Re-select after adding rows
      for (var j = 0; j < questionObject.inputValues.length; j++) {
        $(multiChoiceInputs[j]).val(questionObject.inputValues[j] || "");
      }

      $(".multichoicedata").show();
      break;
    case "4": // No Answer
      $(".hidetextvalidation").show();
      break;
    case "5": // No Answer
      $(".hidetextvalidation").show();
      break;
    case "6": // Single Select Dropdown
      var singleSelectContainer = $(".singleselectdata tbody"); // Assuming tbody is used to contain rows
      singleSelectContainer.empty(); // Remove existing rows if necessary

      for (var i = 0; i < questionObject.inputValues.length; i++) {
        singleSelectContainer.append(addNewRowForSingleSelect); // Add new row
      }

      var singleSelectInputs = singleSelectContainer.find('input[type="text"]'); // Re-select after adding rows
      for (var j = 0; j < questionObject.inputValues.length; j++) {
        $(singleSelectInputs[j]).val(questionObject.inputValues[j] || "");
      }

      $(".singleselectdata").show();
      break;

    case "7": // Multi Select Dropdown
      var multiSelectContainer = $(".multiselectdata tbody"); // Assuming tbody is used to contain rows
      multiSelectContainer.empty(); // Remove existing rows if necessary

      for (var i = 0; i < questionObject.inputValues.length; i++) {
        multiSelectContainer.append(addNewRowForMultiSelect); // Add new row
      }

      var multiSelectInputs = multiSelectContainer.find('input[type="text"]'); // Re-select after adding rows
      for (var j = 0; j < questionObject.inputValues.length; j++) {
        $(multiSelectInputs[j]).val(questionObject.inputValues[j] || "");
      }

      $(".multiselectdata").show();
      break;
  }

  // Refresh the selectpicker for multi select dropdown
  if (questionObject.answerSelect === "7") {
    $(".multiselectdata select").selectpicker("refresh");
  }
  // Show the modal
  $(".addformquestion").modal("show");

  question_id = questionId;
}

// Helper function to get the answer type string
function getAnswerType(answerSelect) {
  switch (answerSelect) {
    case "1":
      return "No Answer Required";
    case "2":
      return "Single Choice";
    case "3":
      return "Multiple Choice";
    case "4":
      return "Single Textbox";
    case "5":
      return "Multiline Textbox";
    case "6":
      return "Single Select Dropdown";
    case "7":
      return "Multi Select Dropdown";
    case "8":
      return "Date";
    default:
      return "";
  }
}

function valiedForm() {
  var titleText = $("#titleText").val().trim();
  var aliasName = $("#aliasName").val().trim();
  var moduleId = document.getElementById("moduleSelect").value;
  var characteristicsId = document.getElementById("characteristicSelect").value;
  var subCharacteristicsId = document.getElementById(
    "subCharacteristicSelect"
  ).value;
  var recurrenceId = document.getElementById("recurrenceSelect").value;
  var monthId = document.getElementById("monthSelect").value;
  var compliancePeriod = $("#compliancePeriod").val().trim();
  var dateFrom = $("#date_from").val().trim();
  var textEnglish = $("#textEnglish").val().trim();

  if (titleText == "") {
    toastr.error("Please enter Title Text");
    return false;
  }

  if (aliasName == "") {
    toastr.error("Please enter Alias Name");
    return false;
  }
  if (moduleId == "") {
    toastr.error("Please enter Module");
    return false;
  }
  if (characteristicsId == "") {
    toastr.error("Please enter Characteristic");
    return false;
  }

  if (subCharacteristicsId == "") {
    toastr.error("Please enter Sub-Characteristic");
    return false;
  }
  if (recurrenceId == "") {
    toastr.error("Please enter Recurrence");
    return false;
  }
  if (monthId == "") {
    toastr.error("Please enter Start Month");
    return false;
  }

  if (compliancePeriod == "") {
    toastr.error("Please enter Compliance Period");
    return false;
  }
  if (dateFrom == "") {
    toastr.error("Please enter Effective Date");
    return false;
  }
  if (textEnglish == "") {
    toastr.error("Please enter Text (English) ");
    return false;
  }
  if (questionsArray.length == 0) {
    toastr.error("Please Enter Question");
    return false;
  }
  return true;
}

function saveQuestions() {
  // Collect the form details
  const formDetails = {
    formId: $("#formId").val().trim(),
    titleText: $("#titleText").val().trim(),
    aliasName: $("#aliasName").val().trim(),
    moduleId: $("#moduleSelect").val(),
    characteristicsId: $("#characteristicSelect").val(),
    subCharacteristicsId: $("#subCharacteristicSelect").val(),
    recurrenceId: $("#recurrenceSelect").val(),
    monthId: $("#monthSelect").val(),
    compliancePeriod: $("#compliancePeriod").val().trim(),
    dateFrom: $("#date_from").val().trim(),
    textEnglish: $("#textEnglish").val().trim(),
  };
  // Combine form details and questions array into one object
  const dataToSend = {
    formDetails: formDetails,
    questions: questionsArray,
  };
  console.log(JSON.stringify(dataToSend));

  console.log(dataToSend);
  // Send the combined data to the Spring Boot API
  $.ajax({
    url: "http://localhost:8080/createQuestion", // Ensure the correct API endpoint
    type: "POST",
    contentType: "application/json",
    headers: headers,
    data: JSON.stringify(dataToSend),
    success: function (response) {
      alert("Questions and form details saved successfully!");
      // Optionally, clear the questionsArray if needed
      questionsArray = [];
      // Optionally, clear the table
      $("#formquestion_datatable tbody").empty();
      $("#portfolio_add_detail").hide();
      $("#portfolio_details").show();
      cleanForm();
      fetchAndPopulateData();
    },
    error: function (xhr, status, error) {
      console.error("Error saving questions and form details:", error);
      alert("Error saving questions and form details. Please try again.");
    },
  });
}

function createForm() {
  if (valiedForm()) {
    saveQuestions();
  }
}

function cleanForm() {
  $("#titleText").val("");
  $("#formId").val("");
  $("#aliasName").val("");
  $("#date_from").val("");
  $("#compliancePeriod").val("");
  $("#textEnglish").val("");
  $("#moduleSelect").val("");
  $("#characteristicSelect").val("");
  $("#subCharacteristicSelect").val("");
  $("#recurrenceSelect").val("");
  $("#monthSelect").val("");
  $(
    "#moduleSelect, #characteristicSelect, #subCharacteristicSelect,#recurrenceSelect,#monthSelect"
  ).selectpicker("refresh");
}
function cleanQuestion() {
  // Clear the form fields after adding the row
  $("#questionLabel").val("");
  $("#questionName").val("");
  $("#description").val("");
  $("#answerSelect").val("");
  $("#reqans").prop("checked", false);
  $("#validatans").prop("checked", false);
  $("#answerSelect").selectpicker("refresh");
  $("#validateDropdown").val("");
  $("#validateDropdown").selectpicker("refresh");
  // $(".addformquestion").modal("hide");
  $(".multiselectdata").hide();
  $(".multichoicedata").hide();
  $(".singlechoicedata").hide();
  $(".singleselectdata").hide();
  $(".hidetextvalidation").hide();
  $(".showanswershouldbe").hide();
  $(".hidedatevalidation").hide();
  $(".noansdisplaynone").show();
  // Remove all rows from the respective data containers
  $(".singlechoicedata table tbody").empty();
  $(".multichoicedata table tbody").empty();
  $(".singleselectdata table tbody").empty();
  $(".multiselectdata table tbody").empty();

  // Create a new row with a blank input field and append it
  var addNewRow =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singlechoiceadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singlechoiceremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";

  // Append new row to singlechoicedata table body
  $(".singlechoicedata table tbody").append(addNewRow);

  // Repeat for other data containers if necessary
  var addNewRowForMultiChoice =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multichoiceadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multichoiceremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";
  $(".multichoicedata table tbody").append(addNewRowForMultiChoice);

  var addNewRowForSingleSelect =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singleselectadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singleselectremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";
  $(".singleselectdata table tbody").append(addNewRowForSingleSelect);

  var addNewRowForMultiSelect =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multiselectadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multiselectremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";
  $(".multiselectdata table tbody").append(addNewRowForMultiSelect);
}
function loadFormQuestions(form_id) {
  $.ajax({
    url: "/getFormWithQuestion/" + form_id, // Replace with your actual API endpoint
    method: "GET",
    headers: headers,
    success: function (response) {
      if (response.message === "Data get successful") {
        const form = response.data;
        let modalContent = "";

        // Form Title and Description
        modalContent += `
          <div class="detailsbg">
            <div class="row pr-2 pl-2">
              <div class="col-xl-12 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                <p class="mb-1 font-weight-600">
                  <span class="font-weight-700">Form Title:</span> <span>${form.title}</span>
                </p>
                <p class="mb-0 font-weight-600">
                  <span class="font-weight-700">Description:</span> <span>${form.text}</span>
                </p>
              </div>
            </div>
          </div>
        `;

        // Questions and Answers
        form.questions.forEach((question, index) => {
          let answersHTML = "";
          if (question.answerSelect == 2) {
            answersHTML = generateRadioOptions(question.answers, question.id);
          } else if (question.answerSelect == 3) {
            answersHTML = generateCheckboxOptions(
              question.answers,
              question.id
            );
          } else if (question.answerSelect == 4) {
            answersHTML = generateTextInput(question.validateId);
          } else if (question.answerSelect == 5) {
            answersHTML = generateTextareaInput(question.validateId);
          } else if (question.answerSelect == 6) {
            answersHTML = generateSelectOptions(question.answers);
          } else if (question.answerSelect == 7) {
            answersHTML = generateMultipleSelectOptions(question.answers);
          } else if (question.answerSelect == 8) {
            answersHTML = generateDateInput();
          }

          modalContent += `
            <div class="card mb-2 queshadow">
              <div class="card-body">
                <div class="row pl-2 pr-2">
                  <div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
                    <span class="question">Q : ${index + 1}</span>
                  </div>
                  <div class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
                    <div class="form-group mb-0 text-justify">
                      <p class="font-weight-700 mb-1 text-justify">
                        ${
                          question.requireAnswer == "Yes"
                            ? '<span class="text-danger">*</span>'
                            : ""
                        }
                        ${question.questionLabel}
                      </p>
                      <p class="mb-1">${question.questionName}</p>
                    </div>
                    <div class="form-group mb-0">
                      <div class="row pl-2 pr-2">
                        ${answersHTML}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        });

        // Insert the content into the modal
        $(".modalBody").html(modalContent);
        applyValidation();

        // Initialize Bootstrap Select
        $(".selectpicker").selectpicker();
      } else {
        alert("Failed to load data");
      }
    },
    error: function (error) {
      console.error("Error fetching form data:", error);
    },
  });
}

function generateRadioOptions(answers, questionId) {
  return answers
    .map(
      (answer, i) => `
        <div class="col-xl-3 col-lg-3 col-sm-3 col-xs-12 colmspadding">
          <div class="custom-control custom-radio">
            <input type="radio" id="radio${questionId}_${i}" name="radio${questionId}" class="custom-control-input">
            <label class="custom-control-label font-weight-300 m-t-5" for="radio${questionId}_${i}">${answer.optionText}</label>
          </div>
        </div>
      `
    )
    .join("");
}

function generateCheckboxOptions(answers, questionId) {
  return answers
    .map(
      (answer, i) => `
        <div class="col-xl-3 col-lg-3 col-sm-3 col-xs-12 colmspadding">
          <div class="custom-control custom-checkbox">
            <input type="checkbox" id="checkbox${questionId}_${i}" name="checkbox${questionId}[]" class="custom-control-input">
            <label class="custom-control-label font-weight-300 m-t-5" for="checkbox${questionId}_${i}">${answer.optionText}</label>
          </div>
        </div>
      `
    )
    .join("");
}

// Event handling to update the check status
// $(document).on(
//   "change",
//   "input[type=radio], input[type=checkbox]",
//   function () {
//     if ($(this).is(":checked")) {
//       $(this).attr("checked", "checked");
//     } else {
//       $(this).removeAttr("checked");
//     }
//   }
// );

function generateTextInput(validated) {
  let validationClass = "";
  switch (validated) {
    case 1:
      validationClass = "all-allowed";
      break;
    case 2:
      validationClass = "only-numbers";
      break;
    case 3:
      validationClass = "only-alphabets";
      break;
    case 4:
      validationClass = "alphabets-numbers";
      break;
  }
  return `
    <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
      <input type="text" class="form-control ${validationClass}" placeholder="Enter Your Answer">
    </div>
  `;
}

function generateTextareaInput(validated) {
  let validationClass = "";
  switch (validated) {
    case 1:
      validationClass = "all-allowed";
      break;
    case 2:
      validationClass = "only-numbers";
      break;
    case 3:
      validationClass = "only-alphabets";
      break;
    case 4:
      validationClass = "alphabets-numbers";
      break;
  }
  return `
    <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
      <textarea class="form-control textareasize ${validationClass}" placeholder="Enter Your Answer"></textarea>
    </div>
  `;
}
function applyValidation() {
  $("input.form-control, textarea.form-control").on("input", function () {
    let value = $(this).val();
    const validationClass = $(this).attr("class");

    if (validationClass.includes("only-numbers")) {
      value = value.replace(/[^0-9]/g, "");
    } else if (validationClass.includes("only-alphabets")) {
      value = value.replace(/[^a-zA-Z]/g, "");
    } else if (validationClass.includes("alphabets-numbers")) {
      value = value.replace(/[^a-zA-Z0-9]/g, "");
    }

    $(this).val(value);
  });
}

function generateSelectOptions(answers) {
  return `
    <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
      <select class="selectpicker" data-style="lineheight12 bg-transfer" data-live-search="true">
        <option value="" selected>Select</option>
        ${answers
          .map(
            (answer) => `
            <option value="${answer.id}">${answer.optionText}</option>
          `
          )
          .join("")}
      </select>
    </div>
  `;
}

function generateMultipleSelectOptions(answers) {
  return `
    <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
      <select class="selectpicker" multiple data-selected-text-format="count" data-style="btn-light bg-transfer" data-actions-box="true">
        ${answers
          .map(
            (answer) => `
            <option value="${answer.id}">${answer.optionText}</option>
          `
          )
          .join("")}
      </select>
    </div>
  `;
}

function generateDateInput() {
  return `
    <div class="col-xl-3 col-lg-12 col-sm-12 col-xs-12 colmspadding">
      <div class="input-group date">
        <input type="text" class="form-control" placeholder="dd/mm/yyyy" id="allpreview_date">
        <span class="input-group-addon inputgroups">
          <i class="mdi mdi-calendar"></i>
        </span>
      </div>
    </div>
  `;
}

// function loadFormQuestions(form_id) {
//   $.ajax({
//     url: "/getFormWithQuestion/" + form_id, // Replace with your actual API endpoint
//     method: "GET",
//     headers: headers,
//     success: function (response) {
//       if (response.message === "Data get successful") {
//         const form = response.data;
//         let modalContent = "";

//         // Form Title and Description
//         modalContent += `
//           <div class="detailsbg">
//             <div class="row pr-2 pl-2">
//               <div class="col-xl-12 col-lg-12 col-sm-12 col-xs-12 colmspadding">
//                 <p class="mb-1 font-weight-600">
//                   <span class="font-weight-700">Form Title:</span> <span>${form.title}</span>
//                 </p>
//                 <p class="mb-0 font-weight-600">
//                   <span class="font-weight-700">Description:</span> <span>${form.text}</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         `;

//         // Questions and Answers
//         form.questions.forEach((question, index) => {
//           let answersHTML = "";
//           if (question.answerSelect == 2) {
//             answersHTML = generateRadioOptions(question.answers, question.id);
//           } else if (question.answerSelect == 3) {
//             answersHTML = generateCheckboxOptions(
//               question.answers,
//               question.id
//             );
//           } else if (question.answerSelect == 4) {
//             answersHTML = generateTextInput();
//           } else if (question.answerSelect == 5) {
//             answersHTML = generateTextareaInput();
//           } else if (question.answerSelect == 6) {
//             answersHTML = generateSelectOptions(question.answers);
//           } else if (question.answerSelect == 7) {
//             answersHTML = generateMultipleSelectOptions(question.answers);
//           } else if (question.answerSelect == 8) {
//             answersHTML = generateDateInput();
//           }

//           modalContent += `
//             <div class="card mb-2 queshadow">
//               <div class="card-body">
//                 <div class="row pl-2 pr-2">
//                   <div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
//                     <span class="question">Q : ${index + 1}</span>
//                   </div>
//                   <div class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
//                     <div class="form-group mb-0 text-justify">
//                       <p class="font-weight-700 mb-1 text-justify">
//                         ${
//                           question.requireAnswer
//                             ? '<span class="text-danger">*</span>'
//                             : ""
//                         }
//                         ${question.questionLabel}
//                       </p>
//                       <p class="mb-1">${question.questionName}</p>
//                     </div>
//                     <div class="form-group mb-0">
//                       <div class="row pl-2 pr-2">
//                         ${answersHTML}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           `;
//         });

//         // Insert the content into the modal
//         $(".modalBody").html(modalContent);

//         // Initialize Bootstrap Select
//         $(".selectpicker").selectpicker();
//       } else {
//         alert("Failed to load data");
//       }
//     },
//     error: function (error) {
//       console.error("Error fetching form data:", error);
//     },
//   });
// }

// function generateRadioOptions(answers, questionId) {
//   return answers
//     .map(
//       (answer, i) => `
//         <div class="col-xl-3 col-lg-3 col-sm-3 col-xs-12 colmspadding">
//           <div class="custom-control custom-radio">
//             <input type="radio" id="choice${questionId}_${i}" name="choice${questionId}" class="custom-control-input">
//             <label class="custom-control-label font-weight-300 m-t-5" for="choice${questionId}_${i}">${answer.optionText}</label>
//           </div>
//         </div>
//       `
//     )
//     .join("");
// }

// function generateCheckboxOptions(answers, questionId) {
//   return answers
//     .map(
//       (answer, i) => `
//         <div class="col-xl-3 col-lg-3 col-sm-3 col-xs-12 colmspadding">
//           <div class="custom-control custom-checkbox">
//             <input type="checkbox" id="choice${questionId}_${i}" name="choice${questionId}" class="custom-control-input">
//             <label class="custom-control-label font-weight-300 m-t-5" for="choice${questionId}_${i}">${answer.optionText}</label>
//           </div>
//         </div>
//       `
//     )
//     .join("");
// }

// function generateTextInput() {
//   return `
//     <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
//       <input type="text" class="form-control" placeholder="Enter Your Answer">
//     </div>
//   `;
// }

// function generateTextareaInput() {
//   return `
//     <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
//       <textarea class="form-control textareasize" placeholder="Enter Your Answer"></textarea>
//     </div>
//   `;
// }

// function generateSelectOptions(answers) {
//   return `
//     <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
//       <select class="selectpicker" data-style="lineheight12 bg-transfer" data-live-search="true">
//       <option value="" selected>Select</option>
//         ${answers
//           .map(
//             (answer) =>
//               `<option value="${answer.id}">${answer.optionText}</option>`
//           )
//           .join("")}
//       </select>
//     </div>
//   `;
// }

// function generateMultipleSelectOptions(answers) {
//   return `
//     <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
//       <select class="selectpicker" multiple data-selected-text-format="count" data-style="btn-light bg-transfer" data-actions-box="true">
//         ${answers
//           .map(
//             (answer) =>
//               `<option value="${answer.id}">${answer.optionText}</option>`
//           )
//           .join("")}
//       </select>
//     </div>
//   `;
// }

// function generateDateInput() {
//   return `
//     <div class="col-xl-3 col-lg-12 col-sm-12 col-xs-12 colmspadding">
//       <div class="input-group date">
//         <input type="text" class="form-control" placeholder="dd/mm/yyyy" id="allpreview_date">
//         <span class="input-group-addon inputgroups">
//           <i class="mdi mdi-calendar"></i>
//         </span>
//       </div>
//     </div>
//   `;
// }

function deletedForm(form_id) {
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
            url: "/deleteForm/" + form_id, // Adjust the URL according to your API endpoint
            headers: headers,
            success: function (response) {
              toastr.success(response.message);
              fetchAndPopulateData();
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

let questionUpdatetime;
let question_id;
let temp_id;
$("#saveQuestionButton").on("click", function () {
  if (questionUpdatetime == "createTime" || null) {
    if (question_id) {
      updateRow(question_id);
    } else {
      createQuestion();
    }
  }
  if (questionUpdatetime == "formUpdateTime") {
    if (question_id) {
      updateQuestionFormTime(question_id);
    } else if (temp_id) {
      updateQuestionRow(temp_id);
    } else {
      createQuestionUpdateTime();
    }
  }
});

function updateRow(questionId) {
  // Validate the input fields before proceeding
  if (!valiedQuestion()) {
    return;
  }
  // Extract values from the modal
  var questionLabel = $("#questionLabel").val();
  var questionName = $("#questionName").val();
  var description = $("#description").val();
  var answerSelect = $("#answerSelect").val();
  var requireAnswer = $("#reqans").prop("checked") ? "Yes" : "No";
  var validateId;
  if (
    $("#validatans").is(":checked") &&
    (questionObject.answerSelect == 4 || questionObject.answerSelect == 5)
  ) {
    console.log($("#validatans").is(":checked"));
    validateId = $("#validateDropdown option:selected").val();
  } else {
    validateId = 0;
  }
  // Get the input values for the selected answer type
  var inputValues = [];
  let firstInputValue;
  switch (answerSelect) {
    case "2": // Single Choice
      firstInputValue = $(".singlechoicedata input[type='text']")
        .first()
        .val()
        .trim();
      $(".singlechoicedata input[type='text']").each(function () {
        if ($(this).val().trim()) {
          inputValues.push($(this).val().trim());
        }
      });
      break;
    case "3": // Multiple Choice
      firstInputValue = $(".multichoicedata input[type='text']")
        .first()
        .val()
        .trim();
      $(".multichoicedata input[type='text']").each(function () {
        if ($(this).val().trim()) {
          inputValues.push($(this).val().trim());
        }
      });
      break;
    case "6": // Single Select Dropdown
      firstInputValue = $(".singleselectdata input[type='text']")
        .first()
        .val()
        .trim();
      $(".singleselectdata input[type='text']").each(function () {
        if ($(this).val().trim()) {
          inputValues.push($(this).val().trim());
        }
      });
      break;
    case "7": // Multi Select Dropdown
      firstInputValue = $(".multiselectdata input[type='text']")
        .first()
        .val()
        .trim();
      $(".multiselectdata input[type='text']").each(function () {
        if ($(this).val().trim()) {
          inputValues.push($(this).val().trim());
        }
      });
      break;
  }

  // Validate the first input value
  if (
    (answerSelect == 2 ||
      answerSelect == 3 ||
      answerSelect == 6 ||
      answerSelect == 7) &&
    !firstInputValue
  ) {
    toastr.error("Please enter at least the first option.");
    return;
  }

  // Find the question object in questionsArray based on questionId
  const questionObject = questionsArray.find(
    (question) => question.questionId === questionId
  );

  // Update the question object with new values
  questionObject.questionLabel = questionLabel;
  questionObject.questionName = questionName;
  questionObject.description = description;
  questionObject.answerSelect = answerSelect;
  questionObject.requireAnswer = requireAnswer;
  questionObject.validateId = validateId;
  questionObject.inputValues = inputValues;

  // Update the corresponding row in the DataTable
  var table = $("#formquestion_datatable").DataTable();

  var answerTypes = getAnswerType(answerSelect);
  // Iterate over each row to find the matching questionId
  table.rows().every(function (rowIdx, tableLoop, rowLoop) {
    var data = this.data();
    // Assuming the questionId is stored in the first column of the table (index 0)
    if (data[0] == questionId) {
      // Update the row data
      data[1] = questionName;
      data[2] = answerTypes;
      data[3] = requireAnswer;
      this.invalidate(); // Invalidate the row so DataTables knows it has been updated
    }
  });
  // Redraw the table to show the updated data
  table.draw();
  console.log(questionsArray);

  questionUpdatetime = "createTime";
  // Hide the modal
  $(".addformquestion").modal("hide");
  cleanQuestion();
}
let editFormData;
function editForm(form_Id) {
  clearDataTable();
  $("#avtiveCheckBox").addClass("displayblock").removeClass("d-none");

  $.ajax({
    type: "GET",
    url: "/getFormWithQuestion/" + form_Id,
    headers: headers,
    success: function (response) {
      editFormData = response.data.questions;
      // Assuming the response contains category data like categoryName and description
      var formId = response.data.formId;
      var title = response.data.title;
      var text = response.data.text;
      var aliasName = response.data.aliasName;
      var moduleId = response.data.moduleId;
      var characteristicId = response.data.characteristicId;
      var subCharacteristicId = response.data.subCharacteristicId;
      var recurrenceId = response.data.recurrenceId;
      var monthId = response.data.monthId;
      var compliancePeriod = response.data.compliancePeriod;
      var effectiveDate = response.data.effectiveDate;
      var active = response.data.active;
      var question = response.data.questions;
      question.forEach((item) => {
        console.log(item);
        var newRow = [
          item.questionId,
          item.questionName,
          item.answerTypes,
          item.requireAnswer,
          '<span data-toggle="modal" data-target=".addformquestion"><a href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" data-original-title="Edit" class="text-success fa-size" onclick="editQuestionWithForm(' +
            item.questionId +
            ')"><i class="fa fa-pencil"></i></a></span> <span class="delete-user-alert"><a href="javascript:void(0)" class="text-danger fa-size" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete" onclick="deleteEditQuestion(' +
            item.questionId +
            ')"><i class="fa fa-trash"></i></a></span>',
        ];

        // Add the new row to the DataTable
        $("#formquestion_datatable").DataTable().row.add(newRow).draw();
      });

      $("#titleText").val(title);
      $("#formId").val(formId);
      $("#aliasName").val(aliasName);
      $("#date_from").val(effectiveDate);
      $("#compliancePeriod").val(compliancePeriod);
      $("#textEnglish").val(text);
      $("#moduleSelect").val(moduleId);
      $("#moduleSelect").trigger("change");
      $("#characteristicSelect").val(characteristicId);
      $("#subCharacteristicSelect").val(subCharacteristicId);
      $("#recurrenceSelect").val(recurrenceId);
      $("#monthSelect").val(monthId);
      $(
        "#moduleSelect, #characteristicSelect, #subCharacteristicSelect,#recurrenceSelect,#monthSelect"
      ).selectpicker("refresh");
      if (active == 1) {
        $("#active").prop("checked", true);
      } else {
        $("#active").prop("checked", false);
      }
      form_id = form_Id;
      characteristic_id = characteristicId;
      subCharacteristic_id = subCharacteristicId;
      questionUpdatetime = "formUpdateTime";
    },
    error: function (xhr) {
      console.error("Error fetching category data:", xhr);
    },
  });
}

function editQuestionWithForm(questionId) {
  // Find the question object in editFormData based on either tempId or questionId

  temp_id = null;
  const questionObject = editFormData.find(
    (question) =>
      question.tempId === questionId || question.questionId === questionId
  );

  if (!questionObject) {
    console.error(`Question with ID ${questionId} not found`);
    return;
  }

  // Log the found questionObject
  console.log("Found questionObject:", questionObject);

  // Populate the modal with the values from the question object
  $("#questionLabel").val(questionObject.questionLabel);
  $("#questionName").val(questionObject.questionName);
  $("#description").val(questionObject.description);
  $("#answerSelect").val(questionObject.answerSelect); // Set the answer type select element
  $("#answerSelect").selectpicker("refresh"); // Refresh the selectpicker to update the selected option
  $("#reqans").prop("checked", questionObject.requireAnswer === "Yes");
  var validated = questionObject.validateId;
  if (validated != 0) {
    $("#validatans").prop("checked", true);
    $(".showanswershouldbe").show();
    $("#validateDropdown").val(validated);
    $("#validateDropdown").selectpicker("refresh");
  }
  var addNewRow =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singlechoiceadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singlechoiceremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";
  var addNewRowForMultiChoice =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multichoiceadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multichoiceremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";
  var addNewRowForSingleSelect =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singleselectadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singleselectremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";
  var addNewRowForMultiSelect =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multiselectadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multiselectremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";

  // Hide all input field groups initially
  $(
    ".singlechoicedata, .multichoicedata, .singleselectdata, .multiselectdata"
  ).hide();

  // Show only the relevant input field group based on answerSelect
  switch (parseInt(questionObject.answerSelect)) {
    case 1: // No Answer
      $(".noansdisplaynone").hide();
      break;
    case 2: // Single Choice
      var singleChoiceContainer = $(".singlechoicedata tbody");
      singleChoiceContainer.empty();

      for (var i = 0; i < questionObject.answers.length; i++) {
        singleChoiceContainer.append(addNewRow);
      }

      var singleChoiceInputs = singleChoiceContainer.find('input[type="text"]');
      for (var j = 0; j < questionObject.answers.length; j++) {
        $(singleChoiceInputs[j]).val(
          questionObject.answers[j].optionText || ""
        );
        $(singleChoiceInputs[j]).attr(
          "data-answer-id",
          questionObject.answers[j].answerId
        );
      }

      $(".singlechoicedata").show();
      break;
    case 3: // Multiple Choice
      var multiChoiceContainer = $(".multichoicedata tbody");
      multiChoiceContainer.empty();

      for (var i = 0; i < questionObject.answers.length; i++) {
        multiChoiceContainer.append(addNewRowForMultiChoice);
      }

      var multiChoiceInputs = multiChoiceContainer.find('input[type="text"]');
      for (var j = 0; j < questionObject.answers.length; j++) {
        $(multiChoiceInputs[j]).val(questionObject.answers[j].optionText || "");
        $(multiChoiceInputs[j]).attr(
          "data-answer-id",
          questionObject.answers[j].answerId
        );
      }

      $(".multichoicedata").show();
      break;
    case 4: // No Answer
      $(".hidetextvalidation").show();
      break;
    case 5: // No Answer
      $(".hidetextvalidation").show();
      break;
    case 6: // Single Select Dropdown
      var singleSelectContainer = $(".singleselectdata tbody");
      singleSelectContainer.empty();

      for (var i = 0; i < questionObject.answers.length; i++) {
        singleSelectContainer.append(addNewRowForSingleSelect);
      }

      var singleSelectInputs = singleSelectContainer.find('input[type="text"]');
      for (var j = 0; j < questionObject.answers.length; j++) {
        $(singleSelectInputs[j]).val(
          questionObject.answers[j].optionText || ""
        );
        $(singleSelectInputs[j]).attr(
          "data-answer-id",
          questionObject.answers[j].answerId
        );
      }

      $(".singleselectdata").show();
      break;
    case 7: // Multi Select Dropdown
      var multiSelectContainer = $(".multiselectdata tbody");
      multiSelectContainer.empty();

      for (var i = 0; i < questionObject.answers.length; i++) {
        multiSelectContainer.append(addNewRowForMultiSelect);
      }

      var multiSelectInputs = multiSelectContainer.find('input[type="text"]');
      for (var j = 0; j < questionObject.answers.length; j++) {
        $(multiSelectInputs[j]).val(questionObject.answers[j].optionText || "");
        $(multiSelectInputs[j]).attr(
          "data-answer-id",
          questionObject.answers[j].answerId
        );
      }

      $(".multiselectdata").show();
      break;
  }

  // Update the global variables to indicate that the form is being updated
  // questionUpdatetime = "formUpdateTime";
  question_id = questionId;

  // Show the modal
  $(".addformquestion").modal("show");
}

function updateQuestionFormTime(questionId) {
  // Find the question object in editFormData based on questionId
  const questionObject = editFormData.find(
    (question) => question.questionId === questionId
  );

  if (!questionObject) {
    console.error(`Question with ID ${questionId} not found`);
    return;
  }
  // Validate the input fields before proceeding
  if (!valiedQuestion()) {
    return;
  }
  // Update the question object with the values from the modal
  questionObject.questionLabel = $("#questionLabel").val();
  questionObject.questionName = $("#questionName").val();
  questionObject.description = $("#description").val();
  questionObject.answerSelect = $("#answerSelect").val();
  // Ensure requireAnswer is "No" for answerSelect = 1
  if (questionObject.answerSelect == 1) {
    questionObject.requireAnswer = "No";
  } else {
    questionObject.requireAnswer = $("#reqans").is(":checked") ? "Yes" : "No";
  }
  var validateId;
  if (
    $("#validatans").is(":checked") &&
    (questionObject.answerSelect == 4 || questionObject.answerSelect == 5)
  ) {
    console.log($("#validatans").is(":checked"));
    validateId = $("#validateDropdown option:selected").val();
  } else {
    validateId = 0;
  }
  questionObject.validateId = validateId;
  // Update the answers
  let newAnswers = [];
  let firstInputValue;

  switch (parseInt(questionObject.answerSelect)) {
    case 2: // Single Choice
      firstInputValue = $(".singlechoicedata tbody tr")
        .first()
        .find('input[type="text"]')
        .val()
        .trim();

      if (!firstInputValue) {
        toastr.error("Please enter at least the first option.");
        return;
      }

      $(".singlechoicedata tbody tr").each(function () {
        const answerText = $(this).find('input[type="text"]').val().trim();
        const answerId = $(this)
          .find('input[type="text"]')
          .attr("data-answer-id");

        if (answerText) {
          newAnswers.push({
            optionText: answerText,
            answerId: answerId ? parseInt(answerId) : null,
          });
        }
      });
      break;

    case 3: // Multiple Choice
      firstInputValue = $(".multichoicedata tbody tr")
        .first()
        .find('input[type="text"]')
        .val()
        .trim();

      if (!firstInputValue) {
        toastr.error("Please enter at least the first option.");
        return;
      }

      $(".multichoicedata tbody tr").each(function () {
        const answerText = $(this).find('input[type="text"]').val().trim();
        const answerId = $(this)
          .find('input[type="text"]')
          .attr("data-answer-id");

        if (answerText) {
          newAnswers.push({
            optionText: answerText,
            answerId: answerId ? parseInt(answerId) : null,
          });
        }
      });
      break;

    case 6: // Single Select Dropdown
      firstInputValue = $(".singleselectdata tbody tr")
        .first()
        .find('input[type="text"]')
        .val()
        .trim();

      if (!firstInputValue) {
        toastr.error("Please enter at least the first option.");
        return;
      }

      $(".singleselectdata tbody tr").each(function () {
        const answerText = $(this).find('input[type="text"]').val().trim();
        const answerId = $(this)
          .find('input[type="text"]')
          .attr("data-answer-id");

        if (answerText) {
          newAnswers.push({
            optionText: answerText,
            answerId: answerId ? parseInt(answerId) : null,
          });
        }
      });
      break;

    case 7: // Multi Select Dropdown
      firstInputValue = $(".multiselectdata tbody tr")
        .first()
        .find('input[type="text"]')
        .val()
        .trim();

      if (!firstInputValue) {
        toastr.error("Please enter at least the first option.");
        return;
      }

      $(".multiselectdata tbody tr").each(function () {
        const answerText = $(this).find('input[type="text"]').val().trim();
        const answerId = $(this)
          .find('input[type="text"]')
          .attr("data-answer-id");

        if (answerText) {
          newAnswers.push({
            optionText: answerText,
            answerId: answerId ? parseInt(answerId) : null,
          });
        }
      });
      break;
  }

  // Determine added, updated, and removed answers
  const existingAnswerIds = questionObject.answers.map(
    (answer) => answer.answerId
  );
  const newAnswerIds = newAnswers
    .filter((answer) => answer.answerId !== null)
    .map((answer) => answer.answerId);

  const answersToAdd = newAnswers.filter((answer) => answer.answerId === null);
  const answersToUpdate = newAnswers.filter((answer) =>
    existingAnswerIds.includes(answer.answerId)
  );
  const answersToRemove = questionObject.answers.filter(
    (answer) => !newAnswerIds.includes(answer.answerId)
  );

  // Update the question object with the new answers
  questionObject.answers = newAnswers;

  // Hide the modal
  $(".addformquestion").modal("hide");
  // Update the corresponding row in the DataTable
  var table = $("#formquestion_datatable").DataTable();

  var answerTypes = getAnswerType(questionObject.answerSelect);
  // Iterate over each row to find the matching questionId
  table.rows().every(function (rowIdx, tableLoop, rowLoop) {
    var data = this.data();
    // Assuming the questionId is stored in the first column of the table (index 0)
    if (data[0] == questionId) {
      // Update the row data
      data[1] = questionObject.questionName;
      data[2] = answerTypes;
      data[3] = questionObject.requireAnswer;
      this.invalidate(); // Invalidate the row so DataTables knows it has been updated
    }
  });
  // Redraw the table to show the updated data
  table.draw();

  // Hide the modal
  // $(".addformquestion").modal("hide");

  // Clean the modal inputs
  cleanQuestion();

  console.log(`Question with ID ${questionId} updated successfully`);
}

function getNextQuestionId() {
  questionCounter++;
  return "100000" + questionCounter;
}

function getDataFromModel() {
  if (!valiedQuestion()) {
    return undefined;
  }

  var questionLabel = $("#questionLabel").val().trim();
  var questionName = $("#questionName").val().trim();
  var description = $("#description").val().trim();
  var answerSelect = $("#answerSelect").val().trim();
  var requireAnswer = $("#reqans").is(":checked") ? "Yes" : "No";
  var validateId;
  if (
    $("#validatans").is(":checked") &&
    (answerSelect == 4 || answerSelect == 5)
  ) {
    console.log($("#validatans").is(":checked"));
    validateId = $("#validateDropdown option:selected").val();
  } else {
    validateId = 0;
  }
  if (answerSelect == 1) {
    requireAnswer = "No"; // Ensure requireAnswer is "No" for answerSelect = 1
  }
  let inputValues = [];

  // Depending on the answerSelect value, gather input values
  switch (answerSelect) {
    case "2": // Single Choice
      let firstSingleChoiceInput = $('.singlechoicedata input[type="text"]')
        .first()
        .val()
        .trim();
      if (!firstSingleChoiceInput) {
        toastr.error(
          "Please enter at least the first option for Single Choice."
        );
        return undefined;
      }
      $('.singlechoicedata input[type="text"]').each(function () {
        if ($(this).val().trim()) {
          inputValues.push({ optionText: $(this).val().trim() });
        }
      });
      break;
    case "3": // Multiple Choice
      let firstMultipleChoiceInput = $('.multichoicedata input[type="text"]')
        .first()
        .val()
        .trim();
      if (!firstMultipleChoiceInput) {
        toastr.error(
          "Please enter at least the first option for Multiple Choice."
        );
        return undefined;
      }
      $('.multichoicedata input[type="text"]').each(function () {
        if ($(this).val().trim()) {
          inputValues.push({ optionText: $(this).val().trim() });
        }
      });
      break;
    case "6": // Single Select Dropdown
      let firstSingleSelectInput = $('.singleselectdata input[type="text"]')
        .first()
        .val()
        .trim();
      if (!firstSingleSelectInput) {
        toastr.error(
          "Please enter at least the first option for Single Select Dropdown."
        );
        return undefined;
      }
      $('.singleselectdata input[type="text"]').each(function () {
        if ($(this).val().trim()) {
          inputValues.push({ optionText: $(this).val().trim() });
        }
      });
      break;
    case "7": // Multi Select Dropdown
      let firstMultiSelectInput = $('.multiselectdata input[type="text"]')
        .first()
        .val()
        .trim();
      if (!firstMultiSelectInput) {
        toastr.error(
          "Please enter at least the first option for Multi Select Dropdown."
        );
        return undefined;
      }
      $('.multiselectdata input[type="text"]').each(function () {
        if ($(this).val().trim()) {
          inputValues.push({ optionText: $(this).val().trim() });
        }
      });
      break;
    // Handle other cases as needed
    default:
      // Handle default case or leave inputValues empty
      break;
  }

  // Map answerSelect to answerTypes
  var answerTypes;
  switch (answerSelect) {
    case "1":
      answerTypes = "No Answer Required";
      break;
    case "2":
      answerTypes = "Single Choice";
      break;
    case "3":
      answerTypes = "Multiple Choice";
      break;
    case "4":
      answerTypes = "Single Textbox";
      break;
    case "5":
      answerTypes = "Multiline Textbox";
      break;
    case "6":
      answerTypes = "Single Select Dropdown";
      break;
    case "7":
      answerTypes = "Multi Select Dropdown";
      break;
    case "8":
      answerTypes = "Date";
      break;
  }

  // Construct the data object
  const formData = {
    tempId: getNextQuestionId(),
    questionId: null,
    questionLabel: questionLabel,
    questionName: questionName,
    description: description,
    answerSelect: answerSelect,
    requireAnswer: answerSelect === "1" ? "No" : requireAnswer,
    answers: inputValues, // Update this line
    answerTypes: answerTypes,
    validateId: validateId,
  };

  return formData;
}

// Function to add form data to editFormData array and display in the table
function createQuestionUpdateTime() {
  const formData = getDataFromModel();
  if (!formData) {
    return; // Stop if validation failed
  }
  editFormData.push(formData);

  // Log editFormData to the console for verification
  console.log(editFormData);

  // Construct the new row data
  var newRow = [
    formData.tempId, // Use the generated questionId
    formData.questionName,
    formData.answerTypes, // You need to map answerSelect to answerTypes
    formData.requireAnswer,
    '<span data-toggle="modal" data-target=".addformquestion"><a href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" data-original-title="Edit" class="text-success fa-size" onclick="createQuestionUpdate(' +
      formData.tempId +
      ')"><i class="fa fa-pencil"></i></a></span> <span class="delete-user-alert"><a href="javascript:void(0)" class="text-danger fa-size" data-toggle="tooltip" data-placement="bottom" data-original-title="Delete" onclick="deleteEditQuestion(' +
      formData.tempId +
      ')"><i class="fa fa-trash"></i></a></span>',
  ];

  // Add the new row to the DataTable
  $("#formquestion_datatable").DataTable().row.add(newRow).draw();
  // Hide the modal
  $(".addformquestion").modal("hide");
  cleanQuestion();
}

function createQuestionUpdate(tempId) {
  // Log the entire editFormData array and the provided ID for debugging
  console.log("editFormData:", editFormData);
  console.log("Provided tempId:", tempId);

  // Convert tempId to string if it's not already
  if (typeof tempId !== "string") {
    tempId = String(tempId);
  }

  // Trim whitespace from tempId if necessary
  tempId = tempId.trim();

  // Find the question object in editFormData based on tempId
  const questionObject = editFormData.find((obj) => obj.tempId === tempId);

  console.log(questionObject);

  if (!questionObject) {
    console.error(`Question with ID ${tempId} not found`);
    return;
  }

  // Log the found questionObject
  console.log("Found questionObject:", questionObject);

  // Populate the modal with the values from the question object
  $("#questionLabel").val(questionObject.questionLabel);
  $("#questionName").val(questionObject.questionName);
  $("#description").val(questionObject.description);
  $("#answerSelect").val(questionObject.answerSelect); // Set the answer type select element
  $("#answerSelect").selectpicker("refresh"); // Refresh the selectpicker to update the selected option
  $("#reqans").prop("checked", questionObject.requireAnswer === "Yes");
  var validated = questionObject.validateId;
  if (validated != 0) {
    $("#validatans").prop("checked", true);
    $(".showanswershouldbe").show();
    $("#validateDropdown").val(validated);
    $("#validateDropdown").selectpicker("refresh");
  }
  var addNewRow =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singlechoiceadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singlechoiceremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";
  var addNewRowForMultiChoice =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multichoiceadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multichoiceremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";
  var addNewRowForSingleSelect =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singleselectadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='singleselectremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";
  var addNewRowForMultiSelect =
    "<tr><td class='text-center border-0' width='5%'><i class='fa fa-arrow-right' aria-hidden='true'></i></td><td class='border-0 p-1'><div class='form-group mb-0'><input type='text' class='form-control' placeholder='Enter an answer choice in English'></div></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multiselectadd'><i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td><td class='text-center border-0 p-0' width='3%'><a href='javascript:void(0)' class='multiselectremove'><i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i></a></td></tr>";

  // Hide all input field groups initially
  $(
    ".singlechoicedata, .multichoicedata, .singleselectdata, .multiselectdata"
  ).hide();

  // Show only the relevant input field group based on answerSelect
  switch (questionObject.answerSelect) {
    case "2": // Single Choice
      var singleChoiceInputs = $('.singlechoicedata input[type="text"]');
      var container = $(".singlechoicedata tbody"); // Assuming tbody is used to contain rows

      // Remove existing rows if necessary
      container.empty();

      for (var i = 0; i < questionObject.answers.length; i++) {
        container.append(addNewRow); // Add new row
      }

      // Populate input fields
      singleChoiceInputs = container.find('input[type="text"]'); // Re-select after adding rows
      for (var j = 0; j < questionObject.answers.length; j++) {
        $(singleChoiceInputs[j]).val(
          questionObject.answers[j].optionText || ""
        );
      }

      $(".singlechoicedata").show();
      break;
    case "3": // Multiple Choice
      var multiChoiceContainer = $(".multichoicedata tbody"); // Assuming tbody is used to contain rows
      multiChoiceContainer.empty(); // Remove existing rows if necessary

      for (var i = 0; i < questionObject.answers.length; i++) {
        multiChoiceContainer.append(addNewRowForMultiChoice); // Add new row
      }

      var multiChoiceInputs = multiChoiceContainer.find('input[type="text"]'); // Re-select after adding rows
      for (var j = 0; j < questionObject.answers.length; j++) {
        $(multiChoiceInputs[j]).val(questionObject.answers[j].optionText || "");
      }

      $(".multichoicedata").show();
      break;
    case "4": // No Answer
      $(".hidetextvalidation").show();
      break;
    case "5": // No Answer
      $(".hidetextvalidation").show();
      break;
    case "6": // Single Select Dropdown
      var singleSelectContainer = $(".singleselectdata tbody"); // Assuming tbody is used to contain rows
      singleSelectContainer.empty(); // Remove existing rows if necessary

      for (var i = 0; i < questionObject.answers.length; i++) {
        singleSelectContainer.append(addNewRowForSingleSelect); // Add new row
      }

      var singleSelectInputs = singleSelectContainer.find('input[type="text"]'); // Re-select after adding rows
      for (var j = 0; j < questionObject.answers.length; j++) {
        $(singleSelectInputs[j]).val(
          questionObject.answers[j].optionText || ""
        );
      }

      $(".singleselectdata").show();
      break;

    case "7": // Multi Select Dropdown
      var multiSelectContainer = $(".multiselectdata tbody"); // Assuming tbody is used to contain rows
      multiSelectContainer.empty(); // Remove existing rows if necessary

      for (var i = 0; i < questionObject.answers.length; i++) {
        multiSelectContainer.append(addNewRowForMultiSelect); // Add new row
      }

      var multiSelectInputs = multiSelectContainer.find('input[type="text"]'); // Re-select after adding rows
      for (var j = 0; j < questionObject.answers.length; j++) {
        $(multiSelectInputs[j]).val(questionObject.answers[j].optionText || "");
      }

      $(".multiselectdata").show();
      break;
  }

  temp_id = tempId;

  // Show the modal
  $(".addformquestion").modal("show");
}

function updateQuestionRow(tempId) {
  // Validate the input fields before proceeding
  if (!valiedQuestion()) {
    return;
  }
  // Extract values from the modal
  var questionLabel = $("#questionLabel").val();
  var questionName = $("#questionName").val();
  var description = $("#description").val();
  var answerSelect = $("#answerSelect").val();
  var requireAnswer = $("#reqans").prop("checked") ? "Yes" : "No";
  // Log the entire editFormData array and the provided ID for debugging
  console.log("editFormData before update:", editFormData);
  console.log("Provided tempId:", tempId);

  if (answerSelect == 1) {
    requireAnswer = "No"; // Ensure requireAnswer is "No" for answerSelect = 1
  }

  // Convert tempId to string if it's not already
  if (typeof tempId !== "string") {
    tempId = String(tempId);
  }

  // Trim whitespace from tempId if necessary
  tempId = tempId.trim();

  // Find the question object in editFormData based on tempId
  const questionObject = editFormData.find((obj) => obj.tempId === tempId);

  console.log(questionObject);

  if (!questionObject) {
    console.error(`Question with ID ${tempId} not found`);
    return;
  }

  // Gather values from the form fields
  questionObject.questionLabel = $("#questionLabel").val();
  questionObject.questionName = $("#questionName").val();
  questionObject.description = $("#description").val();
  questionObject.answerSelect = $("#answerSelect").val();
  questionObject.requireAnswer = $("#reqans").prop("checked") ? "Yes" : "No";

  // Get the answer values for the selected answer type
  let answers = [];
  let firstInputValue;

  switch (answerSelect) {
    case "2": // Single Choice
      firstInputValue = $(".singlechoicedata input[type='text']")
        .first()
        .val()
        .trim();
      $(".singlechoicedata input[type='text']").each(function () {
        if ($(this).val().trim()) {
          answers.push({ optionText: $(this).val().trim() });
        }
      });
      break;
    case "3": // Multiple Choice
      firstInputValue = $(".multichoicedata input[type='text']")
        .first()
        .val()
        .trim();
      $(".multichoicedata input[type='text']").each(function () {
        if ($(this).val().trim()) {
          answers.push({ optionText: $(this).val().trim() });
        }
      });
      break;
    case "6": // Single Select Dropdown
      firstInputValue = $(".singleselectdata input[type='text']")
        .first()
        .val()
        .trim();
      $(".singleselectdata input[type='text']").each(function () {
        if ($(this).val().trim()) {
          answers.push({ optionText: $(this).val().trim() });
        }
      });
      break;
    case "7": // Multi Select Dropdown
      firstInputValue = $(".multiselectdata input[type='text']")
        .first()
        .val()
        .trim();
      $(".multiselectdata input[type='text']").each(function () {
        if ($(this).val().trim()) {
          answers.push({ optionText: $(this).val().trim() });
        }
      });
      break;
  }

  // Validate the first input value
  if (
    (answerSelect == "2" ||
      answerSelect == "3" ||
      answerSelect == "6" ||
      answerSelect == "7") &&
    !firstInputValue
  ) {
    toastr.error("Please enter at least the first option.");
    return;
  }

  // Set the updated answers array
  questionObject.answer = answers;

  // Update the answer type description
  let answerTypes;
  switch (answerSelect) {
    case "1":
      answerTypes = "No Answer Required";
      break;
    case "2":
      answerTypes = "Single Choice";
      break;
    case "3":
      answerTypes = "Multiple Choice";
      break;
    case "4":
      answerTypes = "Single Textbox";
      break;
    case "5":
      answerTypes = "Multiline Textbox";
      break;
    case "6":
      answerTypes = "Single Select Dropdown";
      break;
    case "7":
      answerTypes = "Multi Select Dropdown";
      break;
    case "8":
      answerTypes = "Date";
      break;
  }
  questionObject.answerTypes = answerTypes;

  // Update the corresponding row in the DataTable
  var table = $("#formquestion_datatable").DataTable();

  // Iterate over each row to find the matching tempId
  table.rows().every(function (rowIdx, tableLoop, rowLoop) {
    var data = this.data();
    // Assuming the tempId is stored in the first column of the table (index 0)
    if (data[0] == tempId) {
      // Update the row data
      data[1] = questionName;
      data[2] = answerTypes;
      data[3] = requireAnswer;
      this.invalidate(); // Invalidate the row so DataTables knows it has been updated
    }
  });

  // Redraw the table to show the updated data
  table.draw();
  console.log(editFormData);

  // Hide the modal
  $(".addformquestion").modal("hide");
  cleanQuestion();
}

function updateForm(form_id) {
  const formDetails = {
    formId: $("#formId").val().trim(),
    titleText: $("#titleText").val().trim(),
    aliasName: $("#aliasName").val().trim(),
    moduleId: $("#moduleSelect").val(),
    characteristicsId: $("#characteristicSelect").val(),
    subCharacteristicsId: $("#subCharacteristicSelect").val(),
    recurrenceId: $("#recurrenceSelect").val(),
    monthId: $("#monthSelect").val(),
    compliancePeriod: $("#compliancePeriod").val().trim(),
    dateFrom: $("#date_from").val().trim(),
    textEnglish: $("#textEnglish").val().trim(),
    active: $("#active").prop("checked") ? 1 : 0,
  };

  if (
    !formDetails.titleText ||
    !formDetails.aliasName ||
    !formDetails.moduleId ||
    !formDetails.characteristicsId ||
    !formDetails.subCharacteristicsId ||
    !formDetails.recurrenceId ||
    !formDetails.monthId ||
    !formDetails.compliancePeriod ||
    !formDetails.dateFrom ||
    !formDetails.textEnglish
  ) {
    toastr.error("Please fill all the required fields.");
    return;
  }

  // Check if editFormData is empty
  if (editFormData.length === 0) {
    toastr.error("Please add at least one question.");
    return;
  }

  // Combine form details and questions array into one object
  const dataToSend = {
    formDetails: formDetails,
    questions: editFormData,
  };
  console.log(JSON.stringify(dataToSend));

  // Make an AJAX call to update the form (assuming you have an endpoint to handle this)
  $.ajax({
    url: "/updateForm/" + form_id, // Adjust the URL as necessary
    type: "PUT",
    contentType: "application/json",
    headers: headers,
    data: JSON.stringify(dataToSend),
    success: function (response) {
      toastr.success("Form updated successfully.");
      $("#formquestion_datatable tbody").empty();
      $("#portfolio_add_detail").hide();
      $("#portfolio_details").show();
      cleanForm();
      fetchAndPopulateData();
    },
    error: function (xhr, status, error) {
      toastr.error("Failed to update the form. Please try again.");
      // Handle error actions
    },
  });
}
