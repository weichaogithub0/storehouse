<?php
// 新版根据前端传值，查找数据库有无匹配 //

	require 'conn.php';

	if(isset($_POST['username'])){
		$name=$_POST['username'];
		$result=$conn->query("select * from user where username='$name'");
		if($result->fetch_assoc()){
			echo true;
		}else{
			echo false;	
		}
	}
