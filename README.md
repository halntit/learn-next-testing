# Front-end testing

## Source

Code to accompany the [Testing Next.js Applications](https://www.udemy.com/course/nextjs-testing/?couponCode=TEST-NEXTJS-GITHUB) Udemy course

## Types of testing

In the front-end aspect of software development, there are various types of testing that focus specifically on the user interface, functionality, and behavior of front-end components. Here are some common types of testing in the front-end:

1. **Unit Testing**: Front-end unit testing involves testing individual front-end components such as React components, Vue components, or Angular directives in isolation. It ensures that each component functions correctly and as expected.
2. **Component Testing**: Component testing focuses on testing the interactions and behaviors of larger front-end components or UI modules, ensuring that they work as intended and integrate properly with other components.
3. **Integration Testing**: Integration testing in the front-end involves testing the integration and interactions between different front-end components or UI modules. It ensures that the components work together correctly when combined.
4. **UI Testing**: UI testing, also known as end-to-end testing or functional testing, verifies the behavior and functionality of the complete user interface. It simulates user interactions and tests the flow and functionality of the application from the user's perspective.
5. **Accessibility Testing**: Accessibility testing checks whether a front-end application adheres to accessibility guidelines and ensures that it is accessible to users with disabilities. It involves evaluating the application for keyboard navigation, screen reader compatibility, color contrast, and other accessibility considerations.
6. **Cross-Browser Testing**: Cross-browser testing ensures that a front-end application functions correctly and consistently across different web browsers. It involves testing the application's behavior and appearance on various browsers and browser versions.
7. **Responsive Testing**: Responsive testing focuses on ensuring that a front-end application is properly responsive and displays correctly across different screen sizes and devices. It involves testing the application's layout, responsiveness, and behavior on different devices and orientations.
8. **Performance Testing**: Performance testing in the front-end involves evaluating the performance characteristics of the front-end application, such as page load times, rendering speed, and resource usage. It helps identify performance bottlenecks and optimize front-end performance.
9. **Usability Testing**: Usability testing in the front-end assesses the ease of use, user-friendliness, and overall user experience of a front-end application. It involves gathering user feedback and observing user interactions to identify usability issues and improve the user interface.
10. **Regression Testing**: Regression testing ensures that recent changes or updates to the front-end application do not introduce new bugs or regressions. It involves retesting previously tested functionality to verify that it still works correctly after changes have been made.

These are some of the key types of testing in the front-end aspect of software development. The selection and implementation of testing types may vary based on project requirements, development frameworks, and the specific needs of the front-end application.

## What to test

The essential question is what is so important to the spec of the application that you want an alert if that spec changes, for example, in the base application for this course in that popular concert venue, if somebody can purchase tickets without logging in, I want to know about that because it is essential to the app that you need to be able that you need to be logged in in order to purchase tickets.

## Need to access readl database to verify data?

For unit testing, it's generally not necessary or desirable to interact with a real database. Here are some reasons:

1. **Isolation** : The goal of unit tests is to test individual components of your system in isolation. By using a real database, you introduce additional complexity and potential points of failure that are not directly related to the unit of code you're trying to test.
2. **Speed** : Interacting with a real database can significantly slow down your tests. This could be an issue when you have many tests, or if you want to run your tests frequently.
3. **Control** : When using a real database, there could be data that changes between test runs, causing inconsistent results. With mock objects, you have complete control over the data used in your tests.
4. **Environment** : Unit tests should be able to run in any environment, including a local development machine. Requiring a database to run tests could complicate the setup process.

However, this doesn't mean that you should never test your code with a real database. This type of testing (which involves testing the interaction between different parts of your system, such as your code and a database) is usually done during integration testing, not unit testing.

So, while your unit tests likely don't need to interact with a real database, your integration tests probably should. It's important to have a good balance of unit tests (for testing individual components) and integration tests (for testing how those components interact).

## Test Database

- Why need test Database?
  - Need reliable data for tests
  - Do not want to rely on dev or prod db (they are not predictable)
  - Should not alter data on dev or Prod db
- Why not mock API response?
  - Not all data comes from API (SSG / SSR / ISR)
  - Can't test mutations (updates to DB)
  - Can't update DB during test
    - for ISR / SWR refresh
- How?
  - Create a new dedicated test database (might be on cloud or local)
  - Simultaneous test runs use different DBs
  - Add test data
  - **Create DB**: Start of test run
  - Reset DB: in between tests
  - Delete DB: End of test run
