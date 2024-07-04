const accessToken = sessionStorage.getItem("accessToken");
const role = sessionStorage.getItem("role");
const headers = {
  Authorization: `Bearer ${accessToken}`,
};

$(document).ready(function () {
  if (role == "ADMIN") {
    getCompleteFormAdmin();
  } else {
    getCompleteForm();
  }
});

function getCompleteForm() {
  $("#form_datatable").empty();

  $("#form_datatable").DataTable({
    destroy: true,
    scrollX: true,
    bAutoWidth: true,
    paging: true,
    bLengthChange: false,
    columnDefs: [
      {
        targets: 2,
        orderable: false,
      },
    ],
    pageLength: 10,
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
    ajax: {
      url: "/getCompleteForm", // Replace with your Spring Boot API endpoint
      method: "GET",
      headers: headers, // Define your headers if needed
      dataSrc: function (response) {
        console.log("AJAX response: ", response); // Debugging response
        if (
          response.message === "Data get successful" &&
          Array.isArray(response.data)
        ) {
          // Format data to match the table columns
          return response.data.map((item) => ({
            completedDate: item[0],
            formNumber: item[1],
            formName: item[2],
            createdBy: item[3] + " " + item[4], // Combining first and last name
            formID: item[5],
            preview: `<span data-toggle="modal" data-target="#all_question_preview" onclick = "previewComletedFormUser(${item[5]})">
                        <a href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" title="Preview" class="text-info fa-size">
                          <i class="fa fa-eye"></i>
                        </a>
                      </span>`,
          }));
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
      { data: "completedDate" },
      { data: "formNumber" },
      { data: "formName" },
      { data: "createdBy" },
      { data: "preview", className: "text-center" },
    ],
    drawCallback: function () {
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="popover"]').popover();
    },
  });
}

function getCompleteFormAdmin() {
  $("#form_datatable").empty();

  $("#form_datatable").DataTable({
    destroy: true,
    scrollX: true,
    bAutoWidth: true,
    paging: true,
    bLengthChange: false,
    columnDefs: [
      {
        targets: 2,
        orderable: false,
      },
    ],
    pageLength: 10,
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
    ajax: {
      url: "/getCompleteFormAdmin", // Replace with your Spring Boot API endpoint
      method: "GET",
      headers: headers, // Define your headers if needed
      dataSrc: function (response) {
        console.log("AJAX response: ", response); // Debugging response
        if (
          response.message === "Data get successful" &&
          Array.isArray(response.data)
        ) {
          // Format data to match the table columns
          return response.data.map((item) => ({
            completedDate: item[1],
            formNumber: item[2],
            formName: item[3],
            createdBy: item[4] + " " + item[5], // Combining first and last name
            formID: item[6],
            userID: item[0],
            preview: `<span data-toggle="modal" data-target="#all_question_preview" onclick = "previewComletedFormAdmin(${item[6]}, ${item[0]})">
                        <a href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" title="Preview" class="text-info fa-size">
                          <i class="fa fa-eye"></i>
                        </a>
                      </span>`,
          }));
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
      { data: "completedDate" },
      { data: "formNumber" },
      { data: "formName" },
      { data: "createdBy" },
      { data: "preview", className: "text-center" },
    ],
    drawCallback: function () {
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="popover"]').popover();
    },
  });
}

function previewComletedFormUser(form_Id) {
  $.ajax({
    url: `/completeFormPreview/` + form_Id, // Update with your actual API endpoint
    type: "GET",
    headers: headers,
    success: function (response) {
      $("#question-container").html(""); // Clear previous content

      if (response.data) {
        // Completed Date
        $("#question-container").append(`
                <div class="card mb-2 queshadow">
                    <div class="card-body">
                        <div class="row pr-3 pl-3">
                            <div class="col-xl-4 col-lg-4 col-sm-4 colmspadding">
                                <p class="compact mb-1">
                                    <span class="font-weight-700">Completed Date</span>
                                    <span class="displayblock font-medium-2">${response.data.completedDate}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        // Form title and description
        $("#question-container").append(`
                <div class="detailsbg">
                    <div class="row pr-2 pl-2">
                        <div class="col-xl-12 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                            <p class="mb-1 font-weight-600">
                                <span class="font-weight-700">Form Title:</span>
                                <span>${response.data.title}</span>
                            </p>
                            <p class="mb-0 font-weight-600">
                                <span class="font-weight-700">Description:</span>
                                <span>${response.data.text}</span>
                            </p>
                        </div>
                    </div>
                </div>
            `);

        // Questions and answers
        response.data.questions.forEach((question, index) => {
          let answersHtml = question.answers.join(", ");
          answersHtml = `<p class="mb-1 text-justify">${answersHtml}</p>`;

          $("#question-container").append(`
                    <div class="card mb-2 queshadow">
                        <div class="card-body">
                            <div class="row pl-2 pr-2">
                                <div class="col-xl-1 col-lg-1 col-sm-2 colmspadding">
                                    <span class="question">Q : ${
                                      index + 1
                                    }</span>
                                </div>
                                <div class="col-xl-11 col-lg-11 col-sm-10 colmspadding">
                                    <div class="form-group mb-0 text-justify">
                                        <p class="font-weight-700 mb-1 text-justify">
                                            ${
                                              question.requireAnswer === "Yes"
                                                ? '<span class="text-danger">*</span>'
                                                : ""
                                            }
                                            ${question.questionLabel}
                                        </p>
                                        <p class="mb-1">${
                                          question.questionName
                                        }</p>
                                    </div>
                                    <div class="form-group mb-0">
                                        <div class="row pl-2 pr-2">
                                            <div class="col-xl-12 col-lg-12 col-sm-12 colmspadding">
                                                <p class="font-weight-700 mb-1 text-justify">Answer</p>
                                                ${answersHtml}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
        });
      }
    },
    error: function (error) {
      console.error("Error fetching form preview:", error);
    },
  });
}

function previewComletedFormAdmin(form_Id, user_id) {
  const idData = {
    formId: form_Id,
    userId: user_id,
  };

  console.log(JSON.stringify(idData));
  $.ajax({
    url: "/formPreviewAdmin", // Update with your actual API endpoint
    type: "GET",
    headers: headers,
    contentType: "application/json",
    data: {
      formId: form_Id,
      userId: user_id,
    },
    success: function (response) {
      $("#question-container").html(""); // Clear previous content

      if (response.data) {
        // Completed Date
        $("#question-container").append(`
                <div class="card mb-2 queshadow">
                    <div class="card-body">
                        <div class="row pr-3 pl-3">
                            <div class="col-xl-4 col-lg-4 col-sm-4 colmspadding">
                                <p class="compact mb-1">
                                    <span class="font-weight-700">Completed Date</span>
                                    <span class="displayblock font-medium-2">${response.data.completedDate}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        // Form title and description
        $("#question-container").append(`
                <div class="detailsbg">
                    <div class="row pr-2 pl-2">
                        <div class="col-xl-12 col-lg-12 col-sm-12 col-xs-12 colmspadding">
                            <p class="mb-1 font-weight-600">
                                <span class="font-weight-700">Form Title:</span>
                                <span>${response.data.title}</span>
                            </p>
                            <p class="mb-0 font-weight-600">
                                <span class="font-weight-700">Description:</span>
                                <span>${response.data.text}</span>
                            </p>
                        </div>
                    </div>
                </div>
            `);

        // Questions and answers
        response.data.questions.forEach((question, index) => {
          // let answersHtml = "";
          // question.answers.forEach((answer) => {
          //   answersHtml += `<p class="mb-1 text-justify">${answer}</p>`;
          // });

          let answersHtml = question.answers.join(", ");
          answersHtml = `<p class="mb-1 text-justify">${answersHtml}</p>`;

          $("#question-container").append(`
                    <div class="card mb-2 queshadow">
                        <div class="card-body">
                            <div class="row pl-2 pr-2">
                                <div class="col-xl-1 col-lg-1 col-sm-2 colmspadding">
                                    <span class="question">Q : ${
                                      index + 1
                                    }</span>
                                </div>
                                <div class="col-xl-11 col-lg-11 col-sm-10 colmspadding">
                                    <div class="form-group mb-0 text-justify">
                                        <p class="font-weight-700 mb-1 text-justify">
                                            ${
                                              question.requireAnswer === "Yes"
                                                ? '<span class="text-danger">*</span>'
                                                : ""
                                            }
                                            ${question.questionLabel}
                                        </p>
                                        <p class="mb-1">${
                                          question.questionName
                                        }</p>
                                    </div>
                                    <div class="form-group mb-0">
                                        <div class="row pl-2 pr-2">
                                            <div class="col-xl-12 col-lg-12 col-sm-12 colmspadding">
                                                <p class="font-weight-700 mb-1 text-justify">Answer</p>
                                                ${answersHtml}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
        });
      }
    },
    error: function (error) {
      console.error("Error fetching form preview:", error);
    },
  });
}
