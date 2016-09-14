# Firebase Image Upload Sample (Modified for Android/iOS)

This repo contains a samples image upload library that shows a working sample on how to upload image to firebase [Firebase](https://www.firebase.com/) using the firebase image upload API.

The firebase API can be tricky at times given that for the image upload to work user may need to be logged in, have permissions set in firebase storage rules, 

## Todo

## Add Firebase sdk to your app  

Add this inbetween the <head> </head> tags if you have not already done so.

```
<script src="https://www.gstatic.com/firebasejs/3.3.0/firebase.js"></script>
<script>
  // Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
  };
  firebase.initializeApp(config);
</script>
```

## What's included
```
firebase-image-upload/
├── upload.js
├── upload.html
```

## Add user components

* Be sure your user is logged in. Here is a [firebase tutorial on that](https://firebase.google.com/docs/auth/web/manage-users)

* Insert your logged in User's Id
Retrieve the userId , Find this line in upload.js 
`var uploadTask = storageRef.child(localStorage.myFirebase_user_id+"/"+timeStamp+"/"+ fileName).put(fileObject);`
.
And replace ```localStorage.myFirebase_user_id``` with your logged in `userID` variable
.
Eg. 
`var uploadTask = storageRef.child(localStorage.myFirebase_user_id+"/"+timeStamp+"/"+ fileName).put(fileObject);`


## Tutorials
* I have made Youtube Tutorials for Ratchet, don't forget to subscribe: [Youtube.com/c/braintemorg](https://www.youtube.com/playlist?list=PLnBvgoOXZNCMDvqp6mjPM09Kt57VB__mg)
*If you have any questions or discussions, you can leave them under each youtube video, I'll be there to help.

* You can get tutorials from the official Firebase' website https://firebase.google.com

## Contributing

Please file a GitHub issue to [report a bug](https://github.com/daveozoalor/firebase-image-upload/issues).


## How to thank me
Follow me on my social media handles
* Subscribe on [Youtube](http://youtube.com/c/braintemorg)
* Follow on [Twitter](http://twitter.com/braintem)
* Follow on [Instagram](http://instagram.com/daveozoalor)
* Like on [Facebook](http://fb.com/braintem)

## How to contact me
Yes I can join your team, or help out in one way or the other: 
* Just buzz me up on [facebook](http://facebook.com/daveozoalor)
