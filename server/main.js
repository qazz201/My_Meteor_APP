import { Meteor } from 'meteor/meteor';
import Notes from "../collections/notes.js"


Meteor.startup(() => {
  // code to run on server at startup
});
Roles.addUsersToRoles("YgYobrsvzk6jtaRep", 'admin')


Meteor.publish({
  userNotes:function(){
  //  console.log(this,"THIS")
    return Notes.find({userId:this.userId});
  }
})

Meteor.publish('userList', function (){
  return Meteor.users.find({});
});

Meteor.publish({
  adminLaw:function(user){

    return Notes.find({username:user})
  }
})


Meteor.methods({
  "addTasks": function(title) {
    if (!Meteor.userId()) alert("Log in please!!");

    Notes.insert({
      title,
      username: Meteor.user().username,
      userId: Meteor.userId(),
      createdAt: new Date(),

    })
  }
})
