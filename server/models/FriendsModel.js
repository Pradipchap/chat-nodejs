const { Schema, models, model } =require( "mongoose")

const FriendsSchema = new Schema({
  userID:{
		type:Schema.Types.ObjectId,
		ref:"User"
	}
});

const Friends = models.Friends || model("Friends", FriendsSchema);
module.exports=Friends