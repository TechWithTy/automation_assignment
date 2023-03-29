Feature: User Searchability Tests

    Background:
      Given User is logged in to the application
      And User Clicks on the search bar and inputs the search term
    
   
    Scenario: User Inputs a valid search-term
      And User enters the search-term "red"
      When User clicks the search icon 
      When there is at least one result
      Then click on the first option
     
     Scenario: User Inputs an invalid search-term
      And User enters the search-term "Stephen Kind"
      When User clicks the search icon 
      But there are no results