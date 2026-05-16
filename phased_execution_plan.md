# Phased Execution Plan: Indian Income Tax Calculator FY 2025-26

This plan breaks down the development of the TaxClarity application into 7 manageable phases. Each phase is designed to be completed in a single session and results in a fully runnable, testable application state.

---

## Phase 1: Project Setup & Foundation
**Goal:** Establish the project environment, configuration, and global state management.

*   **Initialize Project:** Create the Vite + React application.
*   **Configure Styling:** Install Tailwind CSS, PostCSS, and Autoprefixer. Apply the exact configurations specified in `tailwind.config.js` and `postcss.config.js`.
*   **Global CSS:** Add the base styles, typography settings, and custom animations (`cardEnter`, `reveal`) to `src/index.css`.
*   **Core Logic Stubs:** Create `constants.js`, `utils.js`, and `taxEngine.js` with exported stubs.
*   **Global State:** Implement `App.jsx` with the `INITIAL_STATE` object, state variables (`step`, `data`, `results`), and navigation functions (`update`, `goNext`, `goBack`, `skipTo`, `reset`).
*   **Runnable Check:** The app boots up (`npm run dev`) and displays a basic "Hello World" or step indicator from `App.jsx` without crashing.

## Phase 2: Shared UI Architecture
**Goal:** Build the reusable layout wrappers and form components.

*   **Layout Components:** Build `ProgressBar.jsx` and the complex `StepWrapper.jsx` layout shell (sticky nav, logo, two-column grid).
*   **Input Components:** Develop `NumberInput.jsx` (with formatting and validation) and `FrequencyInput.jsx` (with the monthly/annual toggle).
*   **Helper Components:** Create `CommonQuestions.jsx` (accordion) and `ConfusedLink.jsx`.
*   **Runnable Check:** You can render `StepWrapper` in `App.jsx` populated with dummy input components, verifying that the layout, navigation bar, and input interactions (like green checkmarks) work perfectly.

## Phase 3: Tax Engine & Live Preview
**Goal:** Implement the complex tax math and the sticky right-hand live preview panel.

*   **Tax Constants:** Populate `constants.js` with all slab rates and deduction limits.
*   **Tax Utilities:** Implement formatting functions in `utils.js`.
*   **Engine Implementation:** Complete `taxEngine.js`, including `applySlabs`, `computeTax`, and regime comparison logic.
*   **Preview Panel:** Build `TaxPreviewPanel.jsx` to ingest global state and display the real-time breakdown, including the regime toggle and dynamic slabs.
*   **Runnable Check:** Integrate `TaxPreviewPanel` into the right column of `StepWrapper`. Changing dummy state in `App.jsx` should instantly recalculate and update the live preview panel.

## Phase 4: Landing & Basic Flow (Steps 1–4)
**Goal:** Build the initial user journey from landing page to salary input.

*   **Step 1:** Build `S01_Landing.jsx` (hero section, feature cards, mock preview).
*   **Step 2:** Build `S02_FinancialYear.jsx`.
*   **Step 3:** Build `S03_AgeGroup.jsx` (implementing the custom radio button styles).
*   **Step 4:** Build `S04_SalaryDetails.jsx` (handling basic vs take-home logic and bonus frequency).
*   **Integration:** Connect S01–S04 in `App.jsx` to render conditionally based on the `step` integer.
*   **Runnable Check:** You can start at the landing page, click through to the salary step, enter your salary, and see the `TaxPreviewPanel` spring to life with actual computed taxes.

## Phase 5: Income & Allowances (Steps 5–8)
**Goal:** Handle salary components, other income sources, and rent details.

*   **Step 5:** Build `S05_SalaryComponents.jsx` (HRA, Professional Tax, Employer NPS checkboxes).
*   **Step 6:** Build `S06_OtherIncome.jsx` (FD and Savings interest).
*   **Step 7:** Build `S07_PaysRent.jsx` (Yes/No routing logic).
*   **Step 8:** Build `S08_RentDetails.jsx` (Rent amount, Metro status).
*   **Integration:** Connect S05–S08 in `App.jsx`, ensuring `S07` correctly routes to `S09` if the user doesn't pay rent.
*   **Runnable Check:** The flow continues from salary through rent. Modifying allowances and rent should correctly influence the Old Regime deductions in the live preview.

## Phase 6: Investments & Deductions (Steps 9–12)
**Goal:** Complete the data gathering phase with complex investments and TDS.

*   **Step 9:** Build `S09_TaxSavingInvestments.jsx` (80C items with complex per-item frequency toggles, progress bar, and NPS).
*   **Step 10:** Build `S10_HealthInsurance.jsx` (80D logic with the custom `InsuranceCard` component and parent age sub-questions).
*   **Step 11:** Build `S11_HomeLoan.jsx` (Section 24b).
*   **Step 12:** Build `S12_TDS.jsx` (Employer & conditional Bank TDS), culminating in the final green "Calculate" button.
*   **Integration:** Connect S09–S12 in `App.jsx`.
*   **Runnable Check:** The entire 12-step data gathering journey is functional. All validations, interactions, and real-time calculations operate smoothly.

## Phase 7: Calculation & Results (Steps 13–14)
**Goal:** Create the loading transition and the comprehensive final results dashboard.

*   **Step 13:** Build `S13_Calculating.jsx` to display the timed, sequential loading animation before computing final results.
*   **Results Sections:** Build the sub-components for the results page (`SectionA_Verdict`, `SectionB_TaxSummary`, `SectionC_DetailedBreakdown` with slab tables, `SectionD_Education`, `SectionE_NextSteps`).
*   **Step 14:** Assemble `S14_Results.jsx` using the built sections and layout.
*   **Integration:** Wire S13 to call the final `computeTax` function, update the `results` state, and transition to S14. Ensure "Start Over" and "Edit" buttons work.
*   **Runnable Check:** The complete application is finished. You can run end-to-end scenarios (from Landing to Results) and manually verify against the verification test cases outlined in the PRD.
