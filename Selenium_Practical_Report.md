---
title: "Software Testing Practical Submission"
author: "Name: ______________________ | Roll No: SY2-____ | Class: SY2"
date: "Date: ______________________"
---

# Software Testing Practical Record: Automated UI Testing with Selenium WebDriver

## 1. Problem Statement
**Module Tested:** Authentication and Diabetes Risk Prediction Module of GlucoPulse AI.
**Description:** The objective is to automate the end-to-end functionality verification of the login process and the submission of the complex predictive health data form, validating the accuracy of the workflow from user input to dynamic ML model output.

## 2. Objective
1. To understand the implementation of Selenium WebDriver for automated testing.
2. To demonstrate proficiency in form handling using various Locators (XPath/CSS/Name).
3. To test multi-page application navigation and synchronization handling using Explicit and Implicit Waits.
4. To validate final functionality via Assertion by checking dynamic result generation.

## 3. Project Overview (GlucoPulse AI)
GlucoPulse AI is an integrated full-stack clinical application composed of a React frontend, Node.js backend, and a Python-based FastAPI ML engine mapping comprehensive clinical and lifestyle data into an XGBoost model. This tested workflow ensures an authenticated doctor can submit a patient's physical profile (waist, BMI) and lifestyle (steps, dietary habits) over multiple input structures and receive a validated, explorable risk profile outcome.

## 4. Modules Tested
1. **Security & Routing:** Login Interface (`/login`)
2. **Clinical Validation:** Diabetes Predictor Form (`/prediction`)
3. **Core Elements Handled:**
    * **Text/Password Inputs** (`<input type="email">`, `<input type="password">`)
    * **Number Type Metrics** (`<input type="number">` for Age, BMI)
    * **Dropdown Fields** (`<select>` for Gender, Family History, Habits)
    * **Interactive State Displays** (Result summary components)
    * **Submit buttons** (with respective API-loading states)

## 5. Test Cases

| TC-ID | Test Scenario | Expected Outcome | Actual Outcome | Status |
|---|---|---|---|---|
| TC-01 | Enter valid credentials and Submit | User redirected successfully to the secure `/dashboard` route. | User redirected successfully to `http://localhost:5173/dashboard`. | **PASS** |
| TC-02 | Navigate to Prediction Module `/prediction` | Clinical data form successfully resolves and displays "Predict Diabetes Risk" header. | Form loaded dynamically, DOM confirmed `h1` presence inside Explicit Wait limit. | **PASS** |
| TC-03 | Populate entire set of input arrays & dropdown fields | Valid data is passed; Submit button is enabled and triggers backend XHR. | Inputs recognized and values populated utilizing `Select()` classes and `sendKeys()`. | **PASS** |
| TC-04 | Analyze post-submission Response View | ML response panel reveals Probability logic with risk percentages and categories. | Result panel displays text asserting risk levels successfully. Validated Element Presence. | **PASS** |

## 6. Code Explanation

* `driver.manage().timeouts().implicitlyWait(...)`: Globally checks for element loading occurrences without causing unnecessary breaks in DOM polling logic.
* `By.cssSelector() / By.id() / By.name()`: Uses frontend attributes attached in React TSX structure for reliable DOM location parsing.
* `new Select(...)`: Manages the `<select>` tags explicitly implemented within `PredictionPage.tsx` matching dropdown parameters efficiently.
* `WebDriverWait(driver, Duration...)`: Waits expressly for specific routing modifications (using ExpectedConditions like URL validation) or rendering transitions (Response Header visibility), allowing network API calls to finalize seamlessly.
* **Assertions Checks**: Logic asserts (`isDisplayed()`, `.getText()`) that the dynamic data structure mapped from the `predictRisk` JSON responds and populates over the DOM precisely.

## 7. Execution Outputs (Screenshots)

### 7.1 Screenshot: Navigating to App / Form Filling
*(Attach Screenshot here showing the automated browser filling up the Prediction Form details via Selenium)*
![Form Filled Placeholder]

### 7.2 Screenshot: Verification / Successful Output State
*(Attach Screenshot here showing the Prediction Result output panel after test execution completes)*
![Results Validation Placeholder]

### 7.3 Console Logs 
*(Attach Screenshot here showing standard out results of successful run with printed assertions)*
![Console output placeholder]

## 8. Conclusion
The practical implementation of Selenium WebDriver automated testing was successfully conducted over the live GlucoPulse AI React/Node architecture. The formulated Java script cleanly interfaced with different client-side input variants (dropdown wrappers, textual metrics) covering essential sync checks. Final assertions reliably observed the end-to-end traversal mapping data outputs accurately to predicted parameters, resolving test success on valid authentication tracking and form submission dynamics.
