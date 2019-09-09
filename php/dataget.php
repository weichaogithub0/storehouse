<?php
// 新版接受前端传值，存入数据库，默认传输type为GET //

require "conn.php";

//声明变量储存前端传递的值（如果值不为空的话）   
if(isset($_POST['username'])){
    $username=$_POST['username'];
    $password=$_POST['password'];
//然后把变量一把insert到数据库的表格里    
    $conn->query("insert user values(null,'$username','$password')");
};
echo(1);




