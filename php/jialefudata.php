<?php  
// 新版以json格式输出数据库所有数据 //

require 'conn.php';

$result=$conn->query('select * from goods');

$arr=array();

for($i=0;$i<$result->num_rows;$i++){
   $arr[$i]=$result->fetch_assoc();
}

echo json_encode($arr);

?>