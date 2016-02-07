Requests = new Mongo.Collection("requests");

// Schema for our database

var priceSchema = new SimpleSchema({
    price: {
      type: Number,
      label: "Price"
    },
    action: {
      type: String,
      label: "Action"
    }
})

var advertSchema = new SimpleSchema({
    title: {
      type: String,
      label: "Title"
    },
    description: {
      type: String,
      label: "Description"
    },
    businessPix: {
      type: [String],
      label: "Business Pictures"
    },
    inspirationPix: {
      type: [String],
      label: "Inspiration Pictures"
    },
    pricing: {
      type: [priceSchema],
      label: "Pricing"
    },
    skills: {
      type: [String],
      label: "Skills Needed"
    }
})
var requestSchema = new SimpleSchema({
    userName: {
       type: String,
       label: "Name"
    },
    userEmail: {
       type: String,
       label: "Email"
    },
    advert: { // "text", "video", "image"
        type: advertSchema,
        label: "Idea"
    },
    id: {
       type: String,
       label: "Id"
    }
});

Requests.attachSchema(requestSchema);





if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);


  // ~*~*~*~*~ HELPER FUNCTIONS ~*~*~*~*~*~
  Template.home.helpers({

    counter: function () {
      return Session.get('counter');
    },

    requests: function () {
      console.log("Printing data:");

      var data = Requests.find().fetch();
      var printData = function (obj) {console.log(obj.userName + " "
                                              + obj.userEmail + " "
                                              + obj.advert)};
      data.forEach(printData);
      console.log(data);
      return data;
    },

    addData: function () {
      var myAdvert = {
        title: "Recipe app for dogs",
        description: "Helps me find good recipes for my dogs. Yay!",
        businessPix: ["https://i.ytimg.com/vi/8M7Qie4Aowk/hqdefault.jpg"],
        inspirationPix: ["http://www.healthwisepetfood.com/system/images/BAhbBlsHOgZmIlgyMDEyLzA5LzEyLzIwXzMwXzAyXzY4NV9IZWFsdGhXaXNlX0xhbWJfTWVhbF9PYXRtZWFsX0Zvcm11bGFfQWR1bHRfRHJ5X0RvZ19Gb29kLmpwZw/HealthWise_Lamb_Meal_Oatmeal_Formula_Adult_Dry_Dog_Food.jpg"],
        pricing: [{price: 50, action: "For the goodz"}],
        skills: ["Figma", "Loves Dogs"]
      }

      var myRequest = {userName : "Emma",
                      userEmail : "emma@cs.brown.edu",
                      advert : myAdvert,
                      id : "abc"};

      Requests.insert(myRequest);
      }




  });



  // ~*~*~*~*~*~ EVENT HANDLING ~*~*~*~*~*~*~*~*~
  Template.home.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}


// ~*~*~*~*~*~ SERVER CODE ~*~*~*~*~*~
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
