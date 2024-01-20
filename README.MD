Introduction

This is a collaborative project to develop a full-stack data visualization web application, using Python Flask-powered API, HTML/CSS, JavaScript, and SQLite database, which will allow users to interactively explore a dataset.

The result is a tool that allows users to analysize maths grades of high school students from two different schools. User can view comparison between two schools based on demographic information of the students and overall habits of the students.

Purpose
This project will explore whether there is any correlation between student demographics and final grade. 
First visualization will compare compare impact of individual student habits on the final grade.
Second visualization will determine whether there is any correlation between student demographic information and the choice of school. 

Data set
This project is based on following data set.
https://www.kaggle.com/datasets/dillonmyrick/high-school-student-performance-and-demographics

1. school - student's school (binary: "GP" - Gabriel Pereira or "MS" - Mousinho da Silveira)
2. sex - student's sex (binary: "F" - female or "M" - male)
3. age - student's age (numeric: from 15 to 22)
4. address_type - student's home address type (binary: "Urban" or "Rural")
5. family_size - family size (binary: "Less or equal to 3" or "Greater than 3")
6. parent_status - parent's cohabitation status (binary: "Living together" or "Apart")
7. mother_education - mother's education (ordinal: "none", "primary education (4th grade)", "5th to 9th grade", "secondary education" or "higher education")
8. father_education - father's education (ordinal: "none", "primary education (4th grade)", "5th to 9th grade", "secondary education" or "higher education")
9. mother_job - mother's job (nominal: "teacher", "health" care related, civil "services" (e.g. administrative or police), "at_home" or "other")
10. father_job - father's job (nominal: "teacher", "health" care related, civil "services" (e.g. administrative or police), "at_home" or "other")
11. reason - reason to choose this school (nominal: close to "home", school "reputation", "course" preference or "other")
12. guardian - student's guardian (nominal: "mother", "father" or "other")
13. travel_time - home to school travel time (ordinal: "<15 min.", "15 to 30 min.", "30 min. to 1 hour", or 4 - ">1 hour")
14. study_time - weekly study time (ordinal: 1 - "<2 hours", "2 to 5 hours", "5 to 10 hours", or ">10 hours")
15. class_failures - number of past class failures (numeric: n if 1<=n<3, else 4)
16. school_support - extra educational support (binary: yes or no)
17. family_support - family educational support (binary: yes or no)
18. extra_paid_classes - extra paid classes within the course subject (Math or Portuguese) (binary: yes or no)
19. activities - extra-curricular activities (binary: yes or no)
20. nursery - attended nursery school (binary: yes or no)
21. higher_ed - wants to take higher education (binary: yes or no)
22. internet - Internet access at home (binary: yes or no)
23. romantic_relationship - with a romantic relationship (binary: yes or no)
24. family_relationship - quality of family relationships (numeric: from 1 - very bad to 5 - excellent)
25. free_time - free time after school (numeric: from 1 - very low to 5 - very high)
26. social - going out with friends (numeric: from 1 - very low to 5 - very high)
27. weekday_alcohol - workday alcohol consumption (numeric: from 1 - very low to 5 - very high)
28. weekend_alcohol - weekend alcohol consumption (numeric: from 1 - very low to 5 - very high)
29. health - current health status (numeric: from 1 - very bad to 5 - very good)
30. absences - number of school absences (numeric: from 0 to 93)
31. grade_1 - first period grade (numeric: from 0 to 20)
32. grade_2 - second period grade (numeric: from 0 to 20)
33. final_grade - final grade (numeric: from 0 to 20, output target)

Data processing
This data has been converted to SQLite (?)

App

Home Page
data set columns - static page to display columns in the data set
visualization 1
visualization 2
glossary - if we need to add any statis information about the visualizations, or this can be added just below visualization

Screen shots

Future enhancements
This can be further developed to advice on how to improve final grade based on student information.

