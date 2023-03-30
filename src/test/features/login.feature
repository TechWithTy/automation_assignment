Feature: User Authentication Tests

    Background:
      Given User navigates to the application
      Given User Clicks on the Login Button
    
   
    Scenario: User can login with valid credentials
      And User enters the username "lavoti5445@djpich.com"
      And User enters the password "typescript123"
      When User clicks the login Button
      Then Login should be successful 

    Scenario: User cannot login with invalid credentials
      And User enters the username "PickleRick@hotmail.com"
      And User enters the password "invalidtype123"
      When User clicks the login Button
      Then But Login is unsuccessful 