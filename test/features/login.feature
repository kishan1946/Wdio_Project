@Regression
Feature: The Internet Guinea Pig Website

  @SI-12345
  Scenario Outline: As a user, I can log into the secure area

    Given I am on the home page
    When I login with <username> and <password>
    When User Register with new Credential
    When User navigate to logout page
    When User logout
    When User navigate to login page
    When User login with same credential
    # Then I should see a flash message saying <message>

    Examples:
      | username | password             | message                        |
      | tomsmith | SuperSecretPassword! | You logged into a secure area! |

  @SI-12346
  Scenario Outline: As a user, I can log into the secure area 2

    Given I am on the login page
    When I login with <username> and <password>
    When User Register with new Credential
    # Then I should see a flash message saying <message>

    Examples:
      | username | password             | message                        |
      | tomsmith | SuperSecretPassword! | You logged into a secure area! |
      | foobar   | barfoo               | Your username is invalid!      |
