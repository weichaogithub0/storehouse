<?php  
// 新版根据前端传值，输出数据库匹配的行 //

	require("conn.php");

	if(isset($_GET['sid'])){
	$sid=$_GET['sid'];
	$result=$conn->query("select * from goods where sid=$sid ");
	echo json_encode($result->fetch_assoc());
	}

?>