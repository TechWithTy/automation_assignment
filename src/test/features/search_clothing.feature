Feature: User Searchability Tests

    Background:
      Given User navigates to the application
     
    
   
    Scenario: User Inputs a valid search-term
        #Getting recaptcha when loggedin
        # And User enters the username "lavoti5445@djpich.com"
        # And User enters the password "typecript123"
        # When User clicks the login Button
        # When Login is successful
        When User clicks the search form
        And User enters the search-term "red"
        When User presses enter
        Then there is atleast one result
     
     Scenario: User Inputs an invalid search-term
    
        When User clicks the search form
        And User enters the search-term "Stephen King"
        When User checks results pop up with no result

    # Examples:
    #         | username                 | password         | color        |
    #         | ------------------------ | ---------------- | ---------    |
    #         | lavoti5445@djpich.com    | typecript123     | red          |
    #         | PickleRick@hotmail.com   | invalidtype123   | Stephen King |