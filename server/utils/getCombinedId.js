
 function getCombinedId(id1,id2) {
	const combinedID =
        id1 < id2 ? id1 + id2 : id2 + id1;
}
module.exports=getCombinedId