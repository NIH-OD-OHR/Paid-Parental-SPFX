# Paid Parental Leave (PPL) Eligibility Tool – SharePoint WebPart

## Summary

This web-based tool helps NIH employees determine their eligibility for Paid Parental Leave (PPL) under federal guidelines. Built as a SharePoint Framework (SPFx) WebPart using TypeScript and HTML, this form dynamically guides users through eligibility requirements and presents a clear result.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.20.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| PPET        | Shishir Sharma                                          |



## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | September 25, 2025 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Purpose
The purpose of this tool is to:
-	Guide NIH employees through a structured Q&A to determine Paid Parental Leave (PPL) eligibility.
-	Educate Fellows and Contractors on alternative resources or contacts if they are not directly eligible.
-	Provide instant, understandable feedback with links to official resources.


## Features

-	Four-step dynamic eligibility questionnaire
-	Real-time conditional logic
-	Customizable messages with success, warning, and error styles
-	Informational links to NIH resources
-	Easy integration in SharePoint Online pages using SPFx


## How It Works
1.	Employee Type Selection:
-	Determines the path forward. Federal employees continue to detailed questions; Fellows and Contractors receive conditional messages.
2.	Work Schedule:
-	Only full-time and part-time employees proceed. Intermittent schedules are ineligible.
3.	12 Months of Service:
-	A "Yes" moves the user forward; "No" results in ineligibility.
4.	Long-term Appointment:
-	Determines final eligibility. If "Yes," the user is eligible. If "No," they're not.
5.	Message Box:
-	Displays result using appropriate icons, colors, and helpful links.

## Technical Documentation
render()
-	Initializes the HTML structure and binds event listeners to all form inputs.
showElement(id)
-	Unhides an HTML element by setting display: block.
hideElement(id)
-	Hides an HTML element by setting display: none.
showMessage(message, type)
-	Displays a result message box with contextual color and icon styling:
-	success: Green background ✅
-	warning: Yellow background ⚠️
-	error: Red background ❗
resetForm()
-	Hides all form sections (except question 1) and clears the result box.
handleEmployeeTypeChange(value)
-	Controls the flow based on Federal, Fellow, or Contractor status.
handleWorkScheduleChange(value)
-	Checks if the schedule is eligible. Shows or hides next question accordingly.
handleHas12MonthsChange(value)
-	Advances or terminates the eligibility path based on service length.
handleIsLongTermChange(value)
-	Final decision step: marks user as eligible or not.


# How to Modify link and Messages

All static messages and URLs are embedded in the PprWebPart.ts file.
 Update Resource Links
Search and replace the following hardcoded URLs:
Use Case	Location in Code	Current Link
PPL Main Info	notEligibleMessage and others	https://hr.nih.gov/benefits/leave/paid-parental-leave-ppl
Leave Bank Info	notEligibleMessage	https://hr.nih.gov/benefits/leave/leave-bank
Requesting PPL	Inside showMessage('success')	https://hr.nih.gov/benefits/leave/paid-parental-leave-ppl/requesting-process


To update:
const notEligibleMessage = `
  You are not eligible for Paid Parental Leave.<br/><br/>
  Please visit the <a href="https://your-new-link.com">Your New Link</a> ...
`;



## For Future Developer
Tech Stack:
-	Framework: SPFx (SharePoint Framework)
-	Language: TypeScript
-	Styling: SCSS Modules
File Structure Overview:
css
CopyEdit
src/
├── webparts/
│   └── ppr/
│       ├── PprWebPart.ts    # Main logic
│       └── PprWebPart.module.scss
Setup
bash
CopyEdit
# Install dependencies
npm install

# Run the webpart locally
gulp serve


## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
