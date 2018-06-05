<?php
//transformar um array de emails em uma string com virgulas
$dados = implode(',',$arrayEmails);
//ou recebe a string montada... por exemplo= 'tiago@gmail.com,william@gmail.com'
$emails = $_POST['emails'];
// assunto
$subject = 'Busca no site';

// message
$message = '
<html>
<head>
 <title>Testar emails</title>
</head>
<body>
<p>Sua empresa foi resultado de uma busca no site!</p>

</body>
</html>
';

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
$headers .= 'To: ACOMPAR <contato@acompar.org>' . "\r\n";
$headers .= 'From: SITE <site@imake.com.br>' . "\r\n"; // email do remetente
//$headers .= 'Cc: email@example.com' . "\r\n"; aqui pode colocar com copia
$headers .= 'Bcc: '.$emails . "\r\n";

// Mail it
mail($to, $subject, $message, $headers);
?>