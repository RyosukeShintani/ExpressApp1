var express = require('express');
var app = express();
var router = express.Router();

//必要なパラメータ:
	//userId: ユーザーID
	//latitude: 位置情報の緯度
	//longitude: 位置情報の経度
router.post('/', function (req, res) {
	//if(!req.body.userId) { res("error: ","userId is required")}
	//TODO:上みたいなエラー処理を書く

	const userId = req.body.userId;
	const latitude = req.body.latitude;
	const longitude = req.body.longitude;

	const date = new Date();
	let osmData

	const osm_api_req = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
	console.log(osm_api_req)
	fetch(osm_api_req)
		.then((response)=>response.json())
		.then((data)=>{
			osmData = data
			res.send({"userId":userId, "latitude":latitude, "longitude":latitude, "locationName":osmData.name, "date":date})
		})

	

});

module.exports = router;
