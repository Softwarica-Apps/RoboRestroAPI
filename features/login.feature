
Feature:Login 
In order to have access to the  admin dashboard
As an admin 
I want to be be able to login
So that I can view admin dashboard

Scenario: Successful login
  Given I am on the "login" page
  When I submit the login form with phone "correctPhone" and password = "correctPassword"
  Then I should see "Admin Dashboard."
  And I should be on the "Order" page