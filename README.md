# C3 Coding Challenge

## Overview

This task is not meant to take a substantial amount of time. If you spend more than an hour on it then you are probably taking it further than we intended. Please try to limit yourself to just doing your best within a one hour window. We understand that some people naturally will want to spend more time to make the solution more elegant or to over-deliver on features or deliverables, but trust us that it is not necessary. We are not looking for one correct solution, but rather are trying to learn about how you think, how you work, and more basically if you can deliver a solution that accomplishes the task.

Your solution to the task is not work that will be used after the interview process. This task is only hypothetical, and while it is related to work you could be asked to do if you join the team, the scale and details of the task would be substantially different than this much simpler task we have formulated below.

## Description

We would like some information regarding our clients. We would like you to provide a very basic reporting implementation for the data we have saved.

You will be given a CSV file that contains address information. The CSV file contents will consist of fields in this order:

* Unique identifier for each address
* Contact ID reference the contact that the address belongs to
* Street, City, State, Country, Zip Data
* Latitude and Longitude Data
* Created At Time
* Updated At Time

We want and endpoint to find how many addresses are based on a specific filter. Example: either by city, state, or country or all filters.

If there are duplicate address they should not be included in the report.

The output should be a simple report of the calculated data.

## Task

Design a simple solution to the situation described above using any programming language you wish. The input will be a CSV file. The output can be either JSON or a simple HTML file. Your submission should include your source code, and a README for your solution. In your README please describe your object model, information about the software design choices you made. Please also include a paragraph on how you would extend your solution to make it better if given more time.

Please send a tar.gz or zip file containing your code, dependencies and your README to us via email.

## Solution Notes

This solution was built in React using the base libraries included from create-react-app. The reason this specific technology was chosen is due to the familiarity 
with the technology. React by default prevents against XSS security threats, and as there is an input to query the data this protects the application. React
also have state management for its components, therefore managing all inputs does not require the use of additional libraries. 

The object model stems from the base index.js which queries the root div from the main page. Within React, the major component holding the solution to this challenge 
is within the App.js that is imported from the index.js. Within the App.js includes one major function, readFile(), used to retrieve the data from the CSV file where
the function component App references.

The following are the main steps used to solve this challenge.

- Access the information file:
	- The purpose of this step is to retrieve the file in order to search for specific filters.
	- Using a fetch API to load all the data, then parse this to a string to make it maniputable.

- Parse information received.
	- The purpose of this step is to convert the file into a more manageable container which our program 
	  can manipulate according to our requirements.
	- data.split('\n') will separate each new line into its own element, and slice() copies over this array.
	- We now have a one-dimensional array, but each line is still a single string element.
	- We can separate each individual line using the comma as a separator, using elem.split(',').
	- We shift the table to remove the initial template line from the .csv file then return the array
	  as a resolution value.

- Create display for filtering.
	- The purpose of this step is to have a display where the user can enter the value that we want to search from the data,
	  be able to search by certain categories, like city, state, country, etc, and to be able to submit the form.
	- This requires an input box, a filter type via a select dropdown list, and a submit button all held within a form.
	- We also include React state hooks to deal with the changing values and upon submission perform
 	  the calculations to filter the data.

- Filter data using Algorithm.
	- The purpose of this step is once the user submits the form to find the total addresses, this algorithm 
	  will be called to find the data.
	- We create three functions to handle the changes in the input box and drop list and the submission of
	  form. 
		- We can check if this data is in fact being by displaying to console.
	- The last function that is called when you submit the form invokes a filter function, this is the
	  primary algorithm to sort the data. The data is in a multidimensional array so the algorithm will 
	  be to iterate through the array, filtering the data based on the input value. 
		- It needs validation against XSS
		- Regular Expressions are possible solution.

- Display Reporting.
	- The purpose of this step is to display the information calculated from the algorithm stated previously 
	  in a manner that is readible to the user.
	- We then set a state variable for the total addresses, and if the total addresses is -1 (default),
	  nothing is displayed, meaning possible loading.

- Notes:
	- React by default escapes special characters so XSS is secure for this program 
	  (i.e., "<img onerror='alert(\"Hacked!\")' src='invalid-image' />"; does not work).
	  
## Improvement Notes

- Filtering:
	- The filtering feature held within the filter() function evaluates if the filter value is equal using an equality symbol (i.e. ===). An improvement
	  or the more correct solution would be to use Regex to filter based on /[\w ]/g to account for alphanumerics as there were instances of 
	  data having " quotation marks (i.e., \"701 South Victory Blvd.).
	 
- Fetch API:
	- The program pulls in the address.csv via a fetch API with a relative path. An improvement would be an option to open the file directory using 
	  a <input type="file" name="file">... to prompt for the file, rather than having it implicitly in the same directory.
	  
- Reporting Functionality:
	- The program displays the final result of how many addresses there are based on the filter arguments via a h3 tag. As the document requested, 
	  the correct solution would be to export via a JSON or an HTML file. 
	- This feature was not done part of my solution, but could also be achieved through pagination.
