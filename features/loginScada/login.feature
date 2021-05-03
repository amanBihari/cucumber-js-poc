Feature: Login to Iron IQ scada

  Scenario Outline: As a user, I can log into the scada

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a map and table

    Examples:
      | username | password             |
      | iiqtest  | dNpVCP7tSFTy         |


  Scenario Outline: As a user, If username incorrect, I can not log into the scada

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a flash message saying <message>

    Examples:
      | username | password             | message                        |
      | aman     | dNpVCP7tSFTy         | Invalid username or password.  |

