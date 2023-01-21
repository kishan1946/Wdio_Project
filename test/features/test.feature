@All
Feature: The Internet Guinea Pig Website

  @1
  Scenario Outline: Verify User can register, logout and login

    Given User on the home page
    When User register with new credential
    Then Verify user registered successful
    When User navigate to logout page
    Then Verify after logout user will return back to home page
    When User navigate to login page
    Then Verify after login user will navigate to account page


  @2
  Scenario Outline: Verify User can add a product to the cart, remove the item from the cart and verify cart amount
    Given User on the home page
    When User scroll to product
    When User add product to the cart
    Then Verify cart amount is updated according to product selections
    When User remove item from cart
    Then Verify cart amount is updated according to product selections

  @3
  Scenario Outline: User can navigate to all options from the top menu bar
    Given User on the home page
    When User navigate to all top menu bar
