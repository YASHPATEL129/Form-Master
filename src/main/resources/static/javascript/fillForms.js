const accessToken = sessionStorage.getItem("accessToken");

const headers = {
  Authorization: `Bearer ${accessToken}`,
};

$(document).ready(function () {
  getFormName();
});
function getFormName() {
  $.ajax({
    type: "GET",
    url: "/getNotFillForm",
    headers: headers,
    contentType: "application/json",
    success: function (response) {
      console.log(response);
      $("#NotFillForms").empty();
      var defaultOption = $("<option></option>")
        .attr("value", "")
        .attr("disabled", true)
        .attr("selected", true)
        .text("Select");
      $("#NotFillForms").append(defaultOption);
      // Iterate over the received category data and create options dynamically
      response.data.forEach(function (item) {
        // Create option element
        var option = $("<option></option>")
          .attr("value", item[0])
          .text(item[1]);
        // Append option to select element with ID "mySelect"

        $("#NotFillForms").append(option);
      });
      // Refresh the selectpicker to update the UI
      $("#NotFillForms")
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
}
$("#resetButton").on("click", function () {
  $(".showformfill").hide();
  $("#NotFillForms").val("");
  $("#NotFillForms").selectpicker("refresh");
});

$("#searchbtn").on("click", function () {
  var form_Id = $("#NotFillForms").val();

  if (form_Id) {
    $("#dynamicFormContainer").empty();

    // Show the form container
    $(".showformfill").slideDown();

    // Redraw form table if needed
    formtable.draw();

    // Load new form questions
    loadFormQuestions(form_Id);
  }
});

function loadFormQuestions(form_id) {
  $.ajax({
    url: "/getFormWithQuestion/" + form_id, // Replace with your actual API endpoint
    method: "GET",
    headers: headers,
    success: function (response) {
      if (response.message === "Data get successful") {
        const formData = response.data;

        // Generate and append form elements
        let formHtml = generateForm(formData);
        $("#dynamicFormContainer").append(formHtml);
        $(".dataPatten").closest("div").datepicker({
          autoclose: true,
          todayHighlight: true,
          format: "dd/mm/yyyy",
          clearBtn: true,
        });
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

// Function to generate form elements based on question type
function generateQuestionElement(question, questionNumber) {
  let questionHtml = ` <div class="card mb-2 queshadow" data-questionId="${
    question.questionId
  }" answertype="${question.answerSelect}">
                              <div class="card-body">
                                <div class="row pl-2 pr-2">
                                  <div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
                                    <span class="question">Q : ${questionNumber}</span>
                                  </div>
                                  <div class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
                                    <div class="form-group mb-0" data-question-id="${
                                      question.questionId
                                    }" data-require-answer="${
    question.requireAnswer
  }">
                                      <p class="font-weight-700 mb-1 text-justify">
                                         ${
                                           question.requireAnswer === "Yes"
                                             ? '<span class="text-danger">*</span>'
                                             : ""
                                         } ${question.questionLabel}
                                      </p>
                                      <p class="mb-1 text-justify">${
                                        question.questionName
                                      }</p>
                                    </div>`;
  console.log(question.questionId);
  switch (question.answerSelect) {
    case 2: // Single Choice
      questionHtml += generateSingleChoiceHtml(
        question.answers,
        question.questionId
      );
      break;
    case 3: // Multiple Choice
      questionHtml += generateMultipleChoiceHtml(
        question.answers,
        question.questionId
      );
      break;
    case 4: // Single Textbox
      questionHtml += generateTextInput(question.questionId);
      break;
    case 5: // Multiline Textbox
      questionHtml += generateTextareaInput(question.questionId);
      break;
    case 6: // Single Select Dropdown
      questionHtml += generateDropdownHtml(
        question.answers,
        question.questionId
      );
      break;
    case 7: // Multi Select Dropdown
      questionHtml += generateMultiSelectDropdownHtml(
        question.answers,
        question.questionId
      );
      break;
    case 8: // Date
      questionHtml += generateDateInput(question.questionId);
      break;
  }

  questionHtml += `   </div>
                          </div>
                        </div>
                      </div>`;

  return questionHtml;
}

function generateForm(formData) {
  let formHtml = `<div class="card-body" style="background-color: #f3f3f3">
                  <div class="row">
                    <div class="col-xl-12 col-lg-12 col-sm-12">
                      <div class="detailsbg">
                        <div class="row pr-2 pl-2">
                          <div class="col-xl-12 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                            <p class="mb-1 font-weight-600">
                              <span class="font-weight-700">Form Title:</span>
                              <span id="formTitle">${formData.title}</span>
                            </p>
                            <p class="mb-0 font-weight-600">
                              <span class="font-weight-700">Description:</span>
                              <span id="formDescription">${formData.text}</span>
                            </p>
                          </div>
                        </div>
                      </div>`;

  // Generate questions
  for (let i = 0; i < formData.questions.length; i++) {
    formHtml += generateQuestionElement(formData.questions[i], i + 1);
  }

  // Append buttons
  formHtml += ` <div class="card mb-0 queshadow">
                        <div class="card-body">
                            <div class="row pl-2 pr-2 text-center">
                                 <div class="col-xl-12 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                                    <a class="btn btn-success btn-padding mr-2" onclick="submitForm(${formData.id})"><i class="fa fa-floppy-o mr-2"></i>Submit</a>
                                    <a class="btn btn-success btn-padding mr-2"><i class="fa fa-print mr-2"></i>Print</a>
                                    <a class="btn btn-success btn-padding"><i class="fa fa-times mr-2"></i>Cancel</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                  </div>
                </div>`;

  return formHtml;
}

function generateSingleChoiceHtml(answers, questionId) {
  let html = `<div class="form-group mb-0"><div class="row pl-2 pr-2">`;
  answers.forEach((answer, i) => {
    let inputId = `single-choice-${questionId}-${i}`;
    html += `<div class="col-xl-3 col-lg-3 col-sm-3 col-xs-12 colmspadding">
                  <div class="custom-control custom-radio">
                    <input type="radio" id="${inputId}" name="single-choice-${questionId}" class="custom-control-input" data-question-id="${questionId}" value="${answer.answerId}" />
                    <label class="custom-control-label font-weight-300 m-t-5" for="${inputId}">${answer.optionText}</label>
                  </div>
                </div>`;
  });
  html += "</div></div>";
  return html;
}

function generateMultipleChoiceHtml(answers, questionId) {
  let html = `<div class="form-group mb-0"><div class="row pl-2 pr-2">`;
  answers.forEach((answer, i) => {
    let inputId = `multiple-choice-${questionId}-${i}`;
    html += `<div class="col-xl-3 col-lg-3 col-sm-3 col-xs-12 colmspadding">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="${inputId}" data-question-id="${questionId}" value="${answer.answerId}" />
                    <label class="custom-control-label font-weight-300 m-t-5" for="${inputId}">${answer.optionText}</label>
                  </div>
                </div>`;
  });
  html += "</div></div>";
  return html;
}

function generateTextInput(questionId) {
  let inputId = `text-input-${questionId}`;
  return `<div class="form-group mb-0">
                <div class="row pl-2 pr-2">
                  <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                    <input type="text" class="form-control" placeholder="Enter Your Answer" id="${inputId}" data-question-id="${questionId}">
                  </div>
                </div>
              </div>`;
}

function generateTextareaInput(questionId) {
  let inputId = `textarea-input-${questionId}`;
  return `<div class="form-group mb-0">
                <div class="row pl-2 pr-2">
                  <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                    <textarea class="form-control textareasize" placeholder="Enter Your Answer" id="${inputId}" data-question-id="${questionId}"></textarea>
                  </div>
                </div>
              </div>`;
}

function generateDropdownHtml(answers, questionId) {
  let inputId = `dropdown-${questionId}`;
  let html = `<div class="form-group mb-0">
                    <div class="row pl-2 pr-2">
                      <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                        <select id="${inputId}" class="selectpicker" data-style="lineheight12 bg-transfer" data-live-search="true" data-question-id="${questionId}">
                          <option value="" selected>Select</option>`;
  answers.forEach((answer) => {
    html += `<option value="${answer.answerId}">${answer.optionText}</option>`;
  });
  html += `</select>
                      </div>
                    </div>
                  </div>`;
  return html;
}

function generateMultiSelectDropdownHtml(answers, questionId) {
  let inputId = `multi-select-dropdown-${questionId}`;
  let html = `<div class="form-group mb-0">
                    <div class="row pl-2 pr-2">
                      <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                        <select id="${inputId}" class="selectpicker" multiple data-selected-text-format="count" data-style="btn-light bg-transfer" data-actions-box="true" data-question-id="${questionId}">`;
  answers.forEach((answer) => {
    html += `<option value="${answer.answerId}">${answer.optionText}</option>`;
  });
  html += `</select>
                      </div>
                    </div>
                  </div>`;
  return html;
}

function generateDateInput(questionId) {
  let inputId = `date-input-${questionId}`;
  return `<div class="form-group mb-0">
                <div class="row pl-2 pr-2">
                  <div class="col-xl-2 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                    <div class="input-group date">
                      <input type="text" class="form-control datepicker dataPatten" placeholder="dd/mm/yyyy" id="${inputId}" data-question-id="${questionId}">
                      <span class="input-group-addon inputgroups">
                        <i class="mdi mdi-calendar"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>`;
}

// function submitForm(form_id) {
//   const formId = form_id;
//   const answers = [];
//   let allValid = true;

//   document
//     .querySelectorAll(".form-group[data-question-id]")
//     .forEach((group) => {
//       const questionId = group.dataset.questionId;
//       const requireAnswer = group.dataset.requireAnswer === "Yes";
//       const answer = { questionId };
//       let hasAnswer = false;

//       // Check for single choice (radio buttons)
//       if (group.querySelector('input[type="radio"]:checked')) {
//         const selectedRadio = group.querySelector(
//           'input[type="radio"]:checked'
//         );
//         answer.optionId = selectedRadio.id;
//         hasAnswer = true;
//       }
//       // Check for multiple choice (checkboxes)
//       else if (
//         group.querySelectorAll('input[type="checkbox"]:checked').length > 0
//       ) {
//         const selectedCheckboxes = Array.from(
//           group.querySelectorAll('input[type="checkbox"]:checked')
//         );
//         answer.optionIds = selectedCheckboxes.map((el) => el.id);
//         hasAnswer = true;
//       }
//       // Check for single line text input
//       else if (group.querySelector('input[type="text"]')) {
//         const value = group.querySelector('input[type="text"]').value.trim();
//         if (value !== "") {
//           answer.value = value;
//           hasAnswer = true;
//         }
//       }
//       // Check for multi-line text input (textarea)
//       else if (group.querySelector("textarea")) {
//         const value = group.querySelector("textarea").value.trim();
//         if (value !== "") {
//           answer.value = value;
//           hasAnswer = true;
//         }
//       }
//       // Check for single select dropdown
//       else if (
//         group.querySelector("select") &&
//         group.querySelector("select").multiple === false
//       ) {
//         const value = group.querySelector("select").value;
//         if (value !== "") {
//           answer.optionId = value;
//           hasAnswer = true;
//         }
//       }
//       // Check for multi select dropdown
//       else if (
//         group.querySelector("select") &&
//         group.querySelector("select").multiple === true
//       ) {
//         const selectedOptions = Array.from(
//           group.querySelectorAll("select option:checked")
//         );
//         if (selectedOptions.length > 0) {
//           answer.optionIds = selectedOptions.map((option) => option.value);
//           hasAnswer = true;
//         }
//       }
//       // Check for date input
//       else if (group.querySelector(".datepicker")) {
//         const value = group.querySelector(".datepicker").value.trim();
//         if (value !== "") {
//           answer.value = value;
//           hasAnswer = true;
//         }
//       }

//       // If the question requires an answer and no answer is provided, mark the form as invalid
//       if (requireAnswer && !hasAnswer) {
//         allValid = false;
//         alert("Please answer the required question: ${questionId}");
//       }

//       // Add the answer to the answers array if an answer was provided
//       if (hasAnswer) {
//         answers.push(answer);
//       }
//     });

//   // If the form is not valid, do not proceed with submission
//   if (!allValid) {
//     return;
//   }

//   // Prepare the form data to be sent to the server
//   const formData = {
//     formId: formId,
//     answers: answers,
//   };

//   console.log(formData);

//   // Send the form data to the server using an AJAX request
//   $.ajax({
//     url: "/saveFormData", // Replace with your actual API endpoint
//     method: "POST",
//     contentType: "application/json",
//     data: JSON.stringify(formData),
//     success: function (response) {
//       alert("Form submitted successfully");
//     },
//     error: function (error) {
//       console.error("Error submitting form data:", error);
//     },
//   });
// }

function getFormData() {
  const formData = [];
  let allRequiredQuestionsAnswered = true;

  // Iterate over each question card
  document.querySelectorAll(".card[data-questionid]").forEach((card) => {
    const questionId = card.getAttribute("data-questionid");
    const answerType = card.getAttribute("answertype");
    const formGroup = card.querySelector(".form-group[data-require-answer]");
    const requireAnswer =
      formGroup && formGroup.getAttribute("data-require-answer") === "Yes";
    let answerValue = null;
    let value = null;
    let isValid = true;

    switch (answerType) {
      case "1": // Simple text (non-input) answer
        // This case is now ignored as per requirement.
        break;

      case "2": // Single-choice radio button
        const selectedRadio = card.querySelector('input[type="radio"]:checked');
        if (selectedRadio) {
          answerValue = selectedRadio.value;
          formData.push({
            questionId: questionId,
            answerId: answerValue,
            value: null,
          });
        } else if (requireAnswer) {
          isValid = false;
        }
        break;

      case "3": // Multiple-choice checkbox
        const selectedCheckboxes = card.querySelectorAll(
          'input[type="checkbox"]:checked'
        );
        if (selectedCheckboxes.length > 0) {
          Array.from(selectedCheckboxes).forEach((cb) => {
            formData.push({
              questionId: questionId,
              answerId: cb.value,
              value: null,
            });
          });
        } else if (requireAnswer) {
          isValid = false;
        }
        break;

      case "4": // Single-line text input
        const textInput = card.querySelector('input[type="text"]');
        if (textInput) {
          value = textInput.value.trim();
          if (value) {
            formData.push({
              questionId: questionId,
              answerId: null,
              value: value,
            });
          }
        }
        if (requireAnswer && !value) {
          isValid = false;
        }
        break;

      case "5": // Multi-line textarea input
        const textarea = card.querySelector("textarea");
        if (textarea) {
          value = textarea.value.trim();
          if (value) {
            formData.push({
              questionId: questionId,
              answerId: null,
              value: value,
            });
          }
        }
        if (requireAnswer && !value) {
          isValid = false;
        }
        break;

      case "6": // Dropdown select (single)
        const dropdownSelect = card.querySelector("select");
        if (dropdownSelect && dropdownSelect.selectedIndex > 0) {
          answerValue = dropdownSelect.value;
          formData.push({
            questionId: questionId,
            answerId: answerValue,
            value: null,
          });
        } else if (requireAnswer) {
          isValid = false;
        }
        break;

      case "7": // Multi-select dropdown
        const multiSelect = card.querySelector("select");
        if (multiSelect) {
          const selectedOptions = Array.from(multiSelect.selectedOptions);
          if (selectedOptions.length > 0) {
            selectedOptions.forEach((option) => {
              formData.push({
                questionId: questionId,
                answerId: option.value,
                value: null,
              });
            });
          } else if (requireAnswer) {
            isValid = false;
          }
        }
        break;

      case "8": // Date input
        const dateInput = card.querySelector('input[type="text"].datepicker');
        if (dateInput) {
          value = dateInput.value.trim();
          if (value) {
            formData.push({
              questionId: questionId,
              answerId: null,
              value: value,
            });
          }
        }
        if (requireAnswer && !value) {
          isValid = false;
        }
        break;

      default:
        break;
    }

    if (requireAnswer && !answerValue && !value) {
      isValid = false;
      allRequiredQuestionsAnswered = false;
    }
  });

  if (!allRequiredQuestionsAnswered) {
    toastr.error("Please fill out all required questions.");
    return null;
  }

  return formData;
}

// Function to send data via AJAX
function submitForm(form_id) {
  const data = getFormData();

  if (data === null) {
    return;
  }
  console.log(data);
  // Transform formData into the required structure
  const transformedData = {
    formId: form_id,
    answers: data,
  };

  console.log("Transformed data:", transformedData);

  // Send the form data to the server using an AJAX request
  $.ajax({
    url: "/saveFormData", // Replace with your actual API endpoint
    method: "POST",
    headers: headers,
    contentType: "application/json",
    data: JSON.stringify(transformedData),
    success: function (response) {
      toastr.success("Form submitted successfully");
      $(".showformfill").hide();
      getFormName();
      $("#NotFillForms").val("");
      $("#NotFillForms").selectpicker("refresh");
    },
    error: function (error) {
      console.error("Error submitting form data:", error);
    },
  });
}
