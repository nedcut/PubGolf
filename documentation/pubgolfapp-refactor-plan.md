# PubGolfApp Refactoring and Improvement Plan

This document outlines a structured plan to refactor the PubGolfApp codebase. The goal is to improve state management, reduce code duplication, enhance UI/UX, and increase test coverage to create a more robust and maintainable application.

---

## Phase 1: Core Logic and State Management

This phase focuses on centralizing business logic and creating a more scalable data structure.

### Task 1.1: Centralize State Logic in `PubGolfContext`
-   **Goal:** Move all state manipulation logic out of UI components and into the context provider.
-   **Actions:**
    1.  In `components/PubGolfContext.tsx`, create the following functions:
        -   `createCourse(courseData)`: Adds a new course to the `courses` state.
        -   `startGame(course: Course)`: Sets the `activeGame`.
        -   `recordScore(holeIndex, scores)`: Updates the scores for the current game.
        -   `endGame()`: Clears the `activeGame` and calculates final results.
    2.  Refactor `app/manual-course.tsx` to call `createCourse` instead of `setCourses`.
    3.  Refactor `app/auto-course.tsx` and `components/CourseCard.tsx` to call `startGame`.
    4.  Refactor `app/game.tsx` to use `recordScore` and `endGame`.

### Task 1.2: Abstract Data Source
-   **Goal:** Decouple the application from hardcoded sample data, preparing for a future API.
-   **Actions:**
    1.  Create a new file: `services/api.ts`.
    2.  Move the `samplePubs` and `sampleCourses` arrays from `PubGolfContext.tsx` into `services/api.ts`.
    3.  Export functions from `api.ts` like `fetchSamplePubs()` and `fetchSampleCourses()`.
    4.  Update `PubGolfContext.tsx` to fetch its initial data from these new service functions.

### Task 1.3: Refine Game State Structure
-   **Goal:** Consolidate all in-game state into a single, more manageable object.
-   **Actions:**
    1.  In `PubGolfContext.tsx`, modify the `activeGame` state to be an object that includes:
        -   `course: Course`
        -   `players: Player[]`
        -   `scores: { [holeIndex: number]: { [playerId: number]: number } }`
        -   `currentHole: number`
    2.  Update `app/game.tsx` to read all its data from this new, unified `activeGame` object.

---

## Phase 2: Code Quality and Reusability

This phase focuses on cleaning up the codebase, removing duplication, and improving type safety.

### Task 2.1: Create Reusable `ScreenLayout` Component
-   **Goal:** Eliminate the repeated header structure in multiple screens.
-   **Actions:**
    1.  Create a new component: `components/ScreenLayout.tsx`.
    2.  This component should accept `title`, `children`, and an optional `onBack` prop. It will render the common header style with a back button.
    3.  Refactor `app/auto-course.tsx`, `app/manual-course.tsx`, and `app/game.tsx` to use `<ScreenLayout>`.

### Task 2.2: Centralize Styles
-   **Goal:** Reduce `StyleSheet` duplication and enforce a consistent design language.
-   **Actions:**
    1.  Create a new file: `styles/common.ts`.
    2.  Identify and move common styles (e.g., `container`, `section`, `headerTitle`, `button`) into `styles/common.ts`.
    3.  Import and reuse these common styles in the screen and component stylesheets.

### Task 2.3: Enforce Stricter Typing
-   **Goal:** Remove all instances of the `any` type to improve type safety.
-   **Actions:**
    1.  In `app/auto-course.tsx`, replace `generatedCourse: any` with `generatedCourse: Course | null`.
    2.  In `app/manual-course.tsx`, replace `selectedPubs: any[]` with `selectedPubs: Pub[]`.
    3.  Search the project for any other instances of `any` and replace them with appropriate types.

### Task 2.4: Configure and Run Linter
-   **Goal:** Automatically enforce code style and catch potential errors.
-   **Actions:**
    1.  Ensure ESLint is configured in `package.json` with a strict ruleset (e.g., `eslint-config-expo`).
    2.  Run the lint command (`npm run lint` or similar) and fix all reported issues.

---

## Phase 3: UI/UX Enhancements

This phase focuses on improving the user experience and adding key features.

### Task 3.1: Implement Full Player Management
-   **Goal:** Allow users to add, name, and remove multiple players for a game.
-   **Actions:**
    1.  Create a new modal or screen for managing players before a game starts.
    2.  Update `PubGolfContext` to handle a list of players.
    3.  Modify `app/game.tsx` to allow inputting scores for each player at each hole.
    4.  Update the final leaderboard in `app/game.tsx` to display the scores and rankings for all players.

### Task 3.2: Implement Slider for Distance Selection
-   **Goal:** Improve the usability of the distance filter in the auto-course generator.
-   **Actions:**
    1.  Add the `@react-native-community/slider` dependency.
    2.  In `app/auto-course.tsx`, replace the row of distance buttons with the `<Slider>` component.

### Task 3.3: Add User Feedback and Empty States
-   **Goal:** Make the app feel more responsive and informative.
-   **Actions:**
    1.  Integrate a toast notification library (e.g., `react-native-toast-message`).
    2.  Show a toast when a course is successfully saved in `app/manual-course.tsx`.
    3.  In `app/index.tsx`, display a message like "No popular courses found. Create one!" if the `courses` array is empty.
    4.  In `app/manual-course.tsx`, show a "No pubs found" message if the search term yields no results.

---

## Phase 4: Testing

This phase focuses on building a test suite to ensure the application's logic is reliable.

### Task 4.1: Write Unit Tests for Core Logic
-   **Goal:** Verify that the business logic in the context provider works as expected.
-   **Actions:**
    1.  Create a new test file: `components/PubGolfContext.test.tsx`.
    2.  Write tests for the `createCourse`, `startGame`, `recordScore`, and `endGame` functions. Mock the `api.ts` service for these tests.

### Task 4.2: Write Component Tests
-   **Goal:** Ensure reusable components render correctly.
-   **Actions:**
    1.  Create a test file for `components/ScreenLayout.tsx`.
    2.  Write a test to verify that it renders its title and children correctly.