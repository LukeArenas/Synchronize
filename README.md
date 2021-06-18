# Synchronize

## Date: 6/18/2021

### By: Luke Arenas

#### [Website]([https://www.lukearenas.com](https://github.com/LukeArenas)) | [GitHub](https://github.com/LukeArenas) | [LinkedIn](https://www.linkedin.com/in/lukearenas/)

---

### ***Description***

Synchronize is a great way to discover and sign up for events. Users are able to create their own events as well as book events created by others. Once a event is booked, it will add it to your personal calendar.

### **Check out my deployed project** [HERE](https://powerful-caverns-31078.herokuapp.com/)

***

### ***Project Planning***

 #### [Workflow](https://trello.com/b/ldtpez9P/project-4) | [Dataflow](https://lucid.app/lucidchart/18b52644-5d9d-4760-a673-2eb4bf27469e/edit?beaconFlowId=7F0AFF8788B16EF9&page=0_0#) | [Entity-Relationship Diagram](https://app.diagrams.net/#G1h1Z65FbjTUahLoOKMMqkQ1Orr1iqi9WQ)

***

### ***Technologies***

* React
* GraphQL
* MongoDB

***

### ***Back-end Decisions***

I decided to use Postgres and Express for the back-end because I find they have a good balance between structure and flexibility. Geocodio is used in the back-end to store coordinates in the db. Additionally, I was able to implement AWS to store and retrieve user's uploaded images. To minimize queries and requests to the db, I decided to send back User model information along with the posts and comments when they were being called. 

### ***Front-end Decisions***

React and Node suit my front-end needs through their component hierarchy. The redux functionality paired with React will help keep my project organized and scalable. The Mapbox API is the front-end of my geolocation functionality. The initial plan was to have three pages - the map, the create post form, and the post details. As the project evolved, I realized I needed to find a way to handle multiple posts at one location. This led me to design a feed page, which allows the user to see all the posts at that location from newest to oldest. With the addition of AWS, and the ability to upload a new profile picture, the app also required a profile page that would not only allow the user to upload their new photo, but also see all their own posts in chronological order.

### ***Screenshots***

![GeoCode](client/src/assets/GeoSnap.JPG)

***

### ***Future Updates***

- [ ] 

***

### ***Credits***