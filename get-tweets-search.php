<?php
session_start();
require_once("twitteroauth/twitteroauth/twitteroauth.php"); //Path to twitteroauth library
$search = $_REQUEST['q'] ;
if (empty($search) )
	$search = "aiww OR ai weiwei OR aiweiwei OR aiww OR freeaiweiwei OR aiwwenglish"; 
$notweets = 50;
$consumerkey = "aoy86XITF9XvQgvSR3e4w";
$accesstoken = "53736497-VNGihpx8lrj24li1Srr73YkKqMswBTt6cKrIalKPH";
include_once('twitter-secret-keys.php');
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
   
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
  
$tweets = $connection->get("https://api.twitter.com/1.1/search/tweets.json?q=".$search."&count=".$notweets);
echo json_encode($tweets);
?>

