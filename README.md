# borrowingCalculator-
ANZ loan calculator
How to run the Project 
npm test 

How to generate the report 
npm run report  
This will generate the awesome report for the test execution



1.	What other tests would you suggest could be written? You do not need to write them out in detail or code them.
Ans: 1> validate all mendatory validation for all input fiels 
2>do the some negative testing 

3.	If this test was part of a much larger test set, how would you speed it up?
Ans: This Project is prepared in short time so in future we can make it more genreric with zero maintenance. We can work on below points 
1> Create the separate Util.js to keep data sapartae the steps.js file
2> We can mainten all the elements in separate file and so In future if any element locator will change we can directly modify that.

5.	Sometimes UI tests can fail unpredictably. For example, the page may not have fully loaded before test automation attempts to click a button on a webpage. How would you improve reliability of these tests?
Ans : We can use any node modules to check server using HTTP methhods vaerify the server is responding properly and UI is loding . If there is any issue it will give meaning full message 500 server error or Application is not loaded before Automation begins.
