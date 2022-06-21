import "./styles.css";
import pbi from "powerbi-client";

// Read embed application token from textbox
var txtAccessToken = "H4sIAAAAAAAEAC2Wtc7GinJF3";

// Read embed URL from textbox
var txtEmbedUrl =
  "https://app.powerbi.com/view?r=eyJrIjoiMmY5NzM5MzMtN2E4MC00NjEyLTk1NTEtNzY4ZjljZTEzNTE1IiwidCI6IjQ5MzkwMzQ4LTk2ZGMtNDZhZC05YTYyLWMxMDQzMDIwZmQ2MyJ9&pageName=ReportSectionbac9fe823249c7b75bcd";

// Read report Id from textbox
var txtEmbedReportId = "f6bfd646-b718-44dc-a378-b73e6b528204";

// Read embed type from radio
var tokenType = "Embed token";

// Get models. models contains enums that can be used.
var models = pbi.models;

// We give All permissions to demonstrate switching between View and Edit mode and saving report.
var permissions = models.Permissions.All;

// Embed configuration used to describe the what and how to embed.
// This object is used when calling powerbi.embed.
// This also includes settings and options such as filters.
// You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
var config = {
  type: "report",
  tokenType: tokenType === "0" ? models.TokenType.Aad : models.TokenType.Embed,
  accessToken: txtAccessToken,
  embedUrl: txtEmbedUrl,
  id: txtEmbedReportId,
  permissions: permissions,
  settings: {
    filterPaneEnabled: true,
    navContentPaneEnabled: true
  }
};

// Get a reference to the embedded report HTML element
var embedContainer = document.getElementById("app");
embedContainer.style = "height:100vh";

// Embed the report and display it within the div container.
var report = window.powerbi.embed(embedContainer, config);

// Report.off removes a given event handler if it exists.
report.off("loaded");

// Report.on will add an event handler which prints to Log window.
report.on("loaded", function () {
  console.log("Loaded");
});

// Report.off removes a given event handler if it exists.
report.off("rendered");

// Report.on will add an event handler which prints to Log window.
report.on("rendered", function () {
  console.log("Rendered");
});

report.on("error", function (event) {
  console.log(event.detail);

  report.off("error");
});

report.off("saved");
report.on("saved", function (event) {
  console.log(event.detail);
  if (event.detail.saveAs) {
    console.log(
      "In order to interact with the new report, create a new token and load the new report"
    );
  }
});
