
---
title: Documentation of the Backend part
...


## General group information
| Member n. | Role          | First name | Last Name | Matricola | Email address                     |
|-----------|---------------|------------|-----------|-----------|-----------------------------------|
| 1         | administrato  | Alessio    | Fiorentino| 940488    | alessio.fiorentino@mail.polimi.it |
| 2         | member        | Chiara     | Barbera   | 920938    | chiara.barbera@mail.polimi.it     |



## Links to other deliverables
- Deliverable D0: the web application is accessible at [this
address](https://waipoua-association.herokuapp.com/).

- Deliverable D2: the YAML or JSON file containing the specification
of the app API can be found at [this
address](https://waipoua-association.herokuapp.com//backend/spec.yaml).

- Deliverable D3: the SwaggerUI page of the same API is available at
[this address](https://waipoua-association.herokuapp.com/backend/swaggerui).

- Deliverable D4: the source code of D0 is available as a zip file at
[this address](https://waipoua-association.herokuapp.com/backend/app.zip).

- Deliverable D5: the address of the online source control repository
is available [this address](https://github.com/Alexio96/Waipoua). We hereby
declare that this is a private repository and, upon request, we will
give access to the instructors.

## Specification

### Web Architecture

Describe here, with a diagram, the components of your web application
and how they interact. Highlight which parts belong to the application
layer, data layer or presentation layer. How did you ensure that HTML is
not rendered server side?

TODO: ALESSIO

### API

#### REST compliance

Describe here to what extent did you follow REST principles and what are
the reasons for which you might have decided to diverge. Note, you must
not describe the whole API here, just the design decisions.
**TODO: chiara**



#### OpenAPI Resource models
Describe here synthetically, which models you have introduced for
resources.
**TODO: chiara**



### Data model
Describe with an ER diagram the model used in the data layer of your web
application. How these map to the OpenAPI data model?
**TODO: chiara**


## Implementation
### Tools used
First, an OpenAPI has been developed on swagger.io and a  node-js server has been generated. Secondly,
the JavaScript language has been used to implement the data layer and the server. The front-end part has been
written in HTML and CSS with a common-used framework, i.e. Bootstrap.
 
### Discussion
Describe here:
- How did you make sure your web application adheres to the provided
OpenAPI specification? Which method did you use to test all APIs
endpoints against the expected response?
**TODO: ALESSIO**

- Our application adheres to REST common practices because there is both a set of static-assets (i.e. web pages
that do not require the access to the database) and a set of pages that require data from the database. In this case, they are retrieved through the data layer and (if necessary) cached, to reduce the number of calles made
to the database. 

- Since the website does not provide any login form, there is no need to manage the session of the user.
The website only retrieves information from the database and displays them in the pages.

- We used a relational database written in SQL and PostGres as DBMS. 


## Other information

### Task assignment

To be more efficient, we decided to split the work in the following way:

- Alessio worked on the front-end (50%), Data Layer development (40% of the time) and DataBase (10% of the time)

- Chiara worked on the front-end (40%), OpenAPI specification (30% of time) and DataBase (30% of the time)

Moreover, Alessio checked the code of Chiara and viceversa, to ensure a complete understanding of the code and a higher improvement of the acquired competences.

### Analysis of existing API

We did not search for existing APIs.


### Learning outcome

- Chiara wanted to learn more about the front-end development in HTML and CSS and acquired competences in Bootstrap usage. Moreover, she learned a lot about REST APIs and how they are implemented, as she was very curious of this topic of which she often heard about.

- **TODO: ALESSIO**

















