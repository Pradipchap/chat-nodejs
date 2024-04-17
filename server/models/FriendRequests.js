const { Schema, models, model } =require( "mongoose")

const EachFriendSchema=new Schema({
	userID:{type:Schema.Types.ObjectId,ref:"User",required:["true"],unique: [true, "email already exists!!"],},
})

const FriendRequestsSchema = new Schema({
  userID:{
		type:Schema.Types.ObjectId,
		ref:"User"
	},
	friendRequests:[EachFriendSchema]
});

const FriendRequests = models.FriendRequests || model("FriendRequests", FriendRequestsSchema);
module.exports=FriendRequests