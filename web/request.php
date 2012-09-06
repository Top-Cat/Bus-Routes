<?php
$ch = curl_init(); 
curl_setopt($ch, CURLOPT_URL, "http://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1?RegistrationNumber=" . $_GET['reg'] . "&ReturnList=LineName,DirectionID");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$data = explode("\n", curl_exec($ch));
curl_close($ch);

foreach ($data as $row) {
	$r = explode(",", trim($row, "[]"));
	if ($r[0] == 1) {
		die(trim($r[1], "\""));
	}
}
?>