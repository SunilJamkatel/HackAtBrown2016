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
        pricing: [{price: 50, action: "Final Logo"}],
        skills: ["Figma", "Graphic Design"]
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

  Template.addAdvertForm.events({
    'click .submitbutton' : function(event, template) {
        var type = template.find('input:radio[name=toggle]:checked');
        // Session.set("submissiontype", $(type).val());
        // console.log("submissiontype set to " + Session.get("submissiontype"));
        // Router.go("/");
    },
    'submit form': function() {
        event.preventDefault();

        var formName = event.target.form_name.value;
        var formEmail = event.target.form_email.value;
        var formTitle = event.target.form_title.value;
        var formDescription = event.target.form_description.value;
        var formBusinessPix = event.target.form_businessPix.value;
        var formInspirationPix = event.target.form_inspirationPix.value;
        var formSkills = event.target.form_skills.value;

        var myAdvert = {
          title: formTitle
          description: formDescription,
          businessPix: [formBusinessPix],
          inspirationPix: [formInspirationPix],
          pricing: [{price: 50, action: "Final Logo"}],
          skills: ["Figma", "Graphic Design", formSkills]
        }

        var myRequest = {userName : formName,
                        userEmail : formEmail,
                        advert : myAdvert,
                        id : "abc"};

        Requests.insert(myRequest);
        console.log("Added advert");
        console.log(myRequest);

        // if (event.target.content_text.value) { // grab the input
        //   var input = event.target.content_text.value;
        // } else {
        //   var input = "";
        // }
            
        // var content_type = Session.get("submissiontype"); // REPLACE
        // if (content_type) {                       // set the content type
        //   var type = content_type;
        // } else {
        //   var type = "text"; // default to text submission type
        // }

        // var raw_content_tags = $('input:checkbox:checked');
        //     var content_tags = [];
        //     raw_content_tags.map(function () {
        //     content_tags.push(this.value);
        //     });
        // console.log("tags selected: " + content_tags);

        // if (content_tags) {                       // set the feeling tags
        //   var tags = content_tags;
        // } else {
        //   var tags = ""; // default to no feeling tag
        // }

        // console.log(Feelings.findOne({feeling : content_tags[0]})); // sanity check

            
        //     content_tags.forEach( function (tag) { // add content to all selected tags
        //         if (Feelings.findOne({feeling : tag})) {
        //             console.log(tag + " in database, pushing new element to " + tag);
        //             Feelings.update(
        //                 Feelings.findOne({feeling : tag})['_id'],
        //                 { $push: { content: 
        //                     { element : input,
        //                         type : content_type,
        //                         sentiment_score : 0,
        //                     }
        //                 }},
        //                 {
        //                     upsert: false,
        //                 }
        //             );
        //         } else {
        //             console.log(tag + " not in database, adding " + tag);
        //             Feelings.insert({feeling : tag, content: [        
        //                 { element : input,
        //                     type : content_type,
        //                     sentiment_score : 0,
        //                 }]})
        //         }
        //     });
    }
  });

}




// ~*~*~*~*~*~ SERVER CODE ~*~*~*~*~*~
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
