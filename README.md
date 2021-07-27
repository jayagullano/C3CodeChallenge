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
