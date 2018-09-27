import {
  Template
} from 'meteor/templating';
import {
  ReactiveVar
} from 'meteor/reactive-var';
import {
  Accounts
} from 'meteor/accounts-base'

import Notes from "../collections/notes.js"



import './main.html';


Meteor.subscribe("userNotes");
Meteor.subscribe("userList");




Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
})

//console.log(Accounts.findUserByUsername("qazz"))

Template.userTasks.helpers({

  tasks: function() {
    console.log(Meteor.user())
    return Notes.find({}, {
      sort: {
        createdAt: -1
      }
    })
  }

});

Template.userTasks.events({
  "submit": function(event) {
    event.preventDefault();

    var title = event.target.name.value.trim();
    title && Meteor.call("addTasks", title)
  }
})


Template.adminDashbord.helpers({
  users: function() {
    ///console.log(Meteor.users.find().username)
    return Meteor.users.find();
  },
  userData: function() {
    return Session.get("adminGetUserData")
  }
})

Template.adminDashbord.events({
  "click .followUser": function(event) {
    var userName = $(event.target.parentNode).find("span").text()

    Meteor.subscribe("adminLaw", userName, function() {
console.log([...Notes.find()])
      Session.set("adminGetUserData", [...Notes.find()])
    });
  },



  "click .unFollowUser": function(event) {

    Object.keys(Session.keys).forEach(function(key){ Session.set(key, undefined); })
Session.keys = {}
console.log(Session.keys)
//  Session.set("adminGetUserData", [{title:"sddddddđddfffff"}])
    //Session.keys = []
  //  delete Session.keys['adminGetUserData']

  }


})
