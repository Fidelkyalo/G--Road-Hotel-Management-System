HOTEL MANAGEMENT SYSTEM - TEST PLAN DOCUMENT

1.0 Introduction
This section provides an overview of the entire test document. This document describes both the test plan and the test procedure.

1.1 Goals and objectives
The primary goal of the testing process is to ensure the reliability, security, and performance of the Hotel Management System. Objectives include:
- Verifying all core functionalities (User Auth, Room Management, Bookings, Payments, Reviews).
- Ensuring the system architecture (Next.js, Sanity, Stripe) is robust.
- Validating the user interface responsiveness and experience.
- Confirming secure and accurate payment integrations.

1.2 Statement of scope
Functionality/features/behavior to be tested:
- User Authentication: Login, Sign up, Logout, and Session persistence using NextAuth.
- Room Management: Viewing all rooms, room details (descriptions, images, price, amenities), and filtering.
- Booking Management: Date selection, availability checks, price calculation, and booking history.
- Payment Integration: Stripe Checkout and M-Pesa STK push integration.
- User Reviews: Submitting reviews, rating rooms, and viewing ratings.
- Dashboard & Profile: Updating profiles and viewing personal booking data.

Functionality/features/behavior not to be tested:
- Sanity Studio UI dashboard internals.
- Third-party network/API reliability (Stripe/M-Pesa/Sanity uptime).
- External email delivery reliability (if applicable).

1.3 Major constraints
- Technical: Next.js 13 Server Components and App Router logic.
- Integration: Requirement for active Stripe and Sanity test keys.
- Schedule: Must be completed within the semester project lifecycle.
- Privacy: Adherence to data handling best practices.

2.0 Test Plan
This section describes the overall testing strategy and project management issues.

2.1 Software (SCIs) to be tested
- Next.js Web Application Frontend/Backend.
- API Routes (src/app/api).
- Sanity Data Models (Schemas).
- State Management (Context & SWR hooks).
Exclusions: Standard library dependencies (React, Next.js core, etc.).

2.2 Testing strategy

2.2.1 Unit testing
Strategy: Isolated testing of functions and components in src/libs and src/components. Target components: utility helpers, data models, and stateless UI components.

2.2.2 Integration testing
Strategy: Order of integration:
1. Auth & API: Verifying user session logic.
2. Sanity & API: Validating data flow between backend and CMS.
3. Payment & Booking: Linking booking logic with payment responses.

2.2.3 Validation testing
Strategy: End-to-end (E2E) verification of user journeys:
1. Search to Booking flow.
2. Review and Rating cycle.

2.2.4 High-order testing
Strategy: Security auditing, performance benchmarking, and recovery testing. Responsibility lies with the development team.

2.3 Testing resources and staffing
- Human: Project Developers.
- Software: Jest, React Testing Library, Stripe Dashboard, Sanity Vision.
- Hardware: Standard PCs and mobile devices for testing.

2.4 Test work products
- Test Plan and Procedure Document (this file).
- Test Logs and Defect reports.

2.5 Test record keeping
Results stored in version control (Git) and dedicated logs.

2.6 Test metrics
- Bug Density (bugs per feature).
- Test Coverage (percentage of requirements/lines).
- Pass/Fail Ratio.

2.7 Testing tools and environment
- Environment: Local development and Vercel Staging.
- Tools: Chrome DevTools, Postman, Stripe CLI.

2.8 Test schedule
| Phase | Start Date | End Date | Goals |
| Unit Testing | March 1, 2026 | March 7, 2026 | Test core logic and UI components in isolation. |
| Integration Testing | March 8, 2026 | March 15, 2026 | Verify API, Sanity CMS, and payment connectivity. |
| Validation Testing | March 16, 2026 | March 24, 2026 | End-to-end user journeys and requirement validation. |
| High-order Testing | March 25, 2026 | March 31, 2026 | Security, stress, performance audits, and final review. |

3.0 Test Procedure
Detailed tactics and test cases.

3.1 Software (SCIs) to be tested
Same as defined in Section 2.1.

3.2 Testing procedure

3.2.1 Unit test cases
Component: Auth Logic (src/libs/auth.ts)
- Purpose: Verify session creation.
- Test case: Input valid credentials.
- Expected results: Returns valid JWT session.

Component: Price Calculator
- Purpose: Ensure total calculation accuracy.
- Test case: Calculate 3 nights at $100/night.
- Expected results: $300 total.

3.2.2 Integration testing
- Procedure: API to Sanity connection.
- Stubs/Drivers: Mock Stripe API response.
- Test cases: Create booking via API endpoint.
- Expected results: Booking document appears correctly in Sanity.

3.2.3 Validation testing
- Procedure: Complete checkout journey.
- Test cases: User selects room -> selects dates -> completes Stripe test payment.
- Expected results: Redirect to success page, booking shows in dashboard.
- Pass/fail criterion: Payment event correctly triggers data persistence.

3.2.4 High-order testing (System Testing)
3.2.4.1 Recovery testing: Database disconnect simulation during booking; verify rollback.
3.2.4.2 Security testing: Restrict unauthorized access to /users routes.
3.2.4.3 Stress testing: Concurrent search requests (load handle).
3.2.4.4 Performance testing: "All Rooms" page load time < 2s.
3.2.4.5 Alpha/beta testing: Review by 3 external testers for UX feedback.
3.2.4.6 Pass/fail criterion: 100% pass for Security/Payment integrity tests.

3.3 Testing resources and staffing
Same as defined in Section 2.3.

3.4 Test work products
Same as defined in Section 2.4.

3.5 Test record keeping and test log
A master test log will be maintained for chronological results.
