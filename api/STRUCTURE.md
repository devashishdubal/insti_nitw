# Structure/Outline of the NITW Nexus Backend code
The backend is entirely written in Node.js and utilizes the Express.js backend framework. <br>
This document outlines what each module contains in the backend code of NITW Nexus. <br>
This will make it easier for contributers to navigate the code base and make swift changes. Please refer to this <br> document to find specific functions and features. If a contributer is working on a new feature, he/she 
<br> have to make sure they add it to this file appropriately.

## Index.js
1. Consists of API Endpoints relating to authentication of Students and clubs. Utilises various
    functions present in ./passport-club-setup.js and ./passport-setup.js. Also consists of the /schedule-reminder
    endpoint for scheduling events on Google Calendar. Utilises helper functions from ./calendar_api_setup.js
2. For student authentication backend, refer to ./index.js endpoints and ./passport-setup.js. For club     
    authentication, refer to ./index.js endpoints and ./passport-club-setup.js.
3. For google calendar API, refer to ./index.js endpoints and ./calendar_api_setup.js

Multiple helper functions relating to authentication of Students and clubs are written in <br>
1. ./passport-setup.js
2. ./passport-club-setup.js
respectively. <br>

Helper functions for google calendar functionalities are written in: <br>
1. ./calendar_api_setup.js

# Routes (./routes/)
**There are multiple routes in this app. We have organised them into different files to ensure readability**

## Clubs.js
The endpoints in this module provide the following functionalities: <br>
1. Create clubs
2. Retrieve all clubs
3. Get individual club details
4. Add admins
5. Add members
6. Remove admins
7. Remove members
8. Handle subscriptions for clubs

## Events.js
The endpoints in this module provide the following functionalities: <br>
1. Create events
2. Delete events
3. Retrieving club details
4. Update event details
5. Retrieve recent events
6. Retrieve upcoming events
7. Retrieve custom events

## Feed.js
The endpoints in this module provide the following functionalities: <br>
1. Retrieves feed of events/posts for a particular user based on subscriptions

## Forum.js
The endpoints in this module provide the following functionalities: <br>
1. Post questions
2. Retrieve all questions (with filters)
3. Retrieve question details by Id
4. Update likes of questions
5. Update dislikes of questions
6. Update likes of replies
7. Update dislikes of replies
8. Reply to questions

## Users.js
The endpoints in this module provide the following functionalities: <br>
1. Checks for existance of a user
2. Retrieves user details
3. Get profile details
4. Update visibility of profile (Private/Public profiles)
5. Update profile details

# Models (./models/)
**Contains mongodb schemas of all tables**
1. Club schema: To store club details
2. User schema: To store user details
3. Forum schema: To store forum questions and replies
4. Event schema: To store events conducted by clubs
5. CustomEvent schema: To store custom events made by individual students
6. Reminders schema: To store reminders set by students