/*you can have two buttons:
one to call getPictureFromGallery();
the other one to call getPictureFromCamera();

Depnding on which the user clicks, the appropriate action will take place.

Note that getPicturefromCamera() may crash the app in some phones due to memory issues.
This code does not fix that issue, do well to send a pull request.
*/

	function getPictureFromGallery(){

		navigator.camera.getPicture(onSuccess, onFail, { 
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
			saveToPhotoAlbum: true,
			allowEdit: true,
			quality: 100,
			correctOrientation: true,

		});


	}

	function getPictureFromCamera(){

		navigator.camera.getPicture(onSuccess, onFail, { 
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.CAMERA,
			saveToPhotoAlbum: true,
			allowEdit: true,
			quality: 100,
			correctOrientation: true,

		});


	}




			function onSuccess(imageData) {
				var image = document.getElementById('myImage');
				image.src=  imageData;


var file = imageData; //useless idiot like me :) 

alert("File content: "+ file);
// Create the file metadata
var metadata = {
	contentType: 'image/jpeg'
};


var fileName = file.substring(file.lastIndexOf('/')+1); //get name of file from file path


var storageRef = firebase.storage().ref();





var getFileBlob = function (url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });
        xhr.send();
};

var blobToFile = function (blob, name) {
        blob.lastModifiedDate = new Date();
        blob.name = name;
        return blob;
};

var getFileObject = function(filePathOrUrl, cb) {
       getFileBlob(filePathOrUrl, function (blob) {
       	
          cb(blobToFile(blob, fileName));
       });
};

getFileObject(imageData, function (fileObject) {
  

var timeStamp = Math.floor(Date.now() / 1000);
// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child(localStorage.myFirebase_user_id+"/"+timeStamp+"/"+ fileName).put(fileObject);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
	function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
	switch (error.code) {
		case 'storage/unauthorized':
      // User doesn't have permission to access the object
      alert("Storage unauthorized");
      break;

      case 'storage/canceled':
      // User canceled the upload
      alert("Error: storage/canceled");
      break;

      case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      alert("Error: storage/unknown");
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  var downloadURL = uploadTask.snapshot.downloadURL;
  console.log("The download URL: "+downloadURL);
  
  //this is where you have to enter the code to update any desired firebase table with the image url
  //eg this below code will add a 'profilePhoto' field and record to 'users' table for the user with the id of userId
  //read more about saving data in firebase here: https://firebase.google.com/docs/database/web/save-data
  
  firebase.database().ref('users/' + userId).update({
    profilePhoto: downloadURL
  });

});


}); 

}
function onFail(message) {
//alert('Failed because: ' + message);
setTimeout(function(){
	navigator.notification.alert(message); //show a pop up message if something failed in the process eg.image upload canceled 
}, 0);
}





