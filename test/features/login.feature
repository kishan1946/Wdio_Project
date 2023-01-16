@All
Feature: The Internet Guinea Pig Website

  @2
  Scenario Outline: As a new user, I can register, logout and login

    Given I am on the home page
    When I register with new credential
    Then Verify I register successful
    When I navigate to logout page
    Then Verify after logout I return back to home page
    When I navigate to login page
    Then Verify after login I navigate to account page


  @1
  Scenario Outline: As a User, I can add a product to cart and verify cart amount
    Given I am on the home page
    When I scroll to product
    When I add product to the cart
    Then Verify cart amount is updated according to product selections
