const { Schema, models, model } =require( "mongoose")

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exists!!"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
  },
  password:{
    type:String,
    required: [true, "password is required"]
  },
  // image: {
  //   type: String,
  //   requied:[true, "image is required"],
  // },
  phone: {
    type: String,
  },
  dateofbirth: {
    type: Date,
  },
});

const User = models.User || model("User", UserSchema);
module.exports=User
