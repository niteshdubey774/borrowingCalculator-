Feature: Search chercher tech in google

	# to check first cucumber works or not
	Scenario: Verify result for google search
		Given The browser is open
		When open the loan calculator
		And user fill all details
		Then user can see the loan amount
		Then user click the start over button clears the form
		Then user fill only $1 for Living expenses
		Then user ckick the Work out how much I could borrow button
        Then user can see the erro message