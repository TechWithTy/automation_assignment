Feature: User Authentication Tests

    Background:
      Given User navigates to the application
      Given User Clicks on the Login Button
    
   
    Scenario: User can login with valid credentials
      And User enters the username "Cucumber"
      And User enters the username "typescript123"
      When User clicks the login Button
      Then Login should be successful 

    Scenario: User cannot login with invalid credentials
      And User enters the username "PickleRick"
      And User enters the username "invalidtype123"
      When User clicks the login Button
      Then But Login is unsuccessful 