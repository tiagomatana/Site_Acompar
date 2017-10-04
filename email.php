<?php
 
ini_set ('display_errors', 1);
 
error_reporting (E_ALL);
 
$from = "contato@tiagomatana.com";
 
$to = "tiago.matana@gmail.com";
 
$subject = "Verificando o correio do PHP";
 
$message = "O correio do PHP funciona bem";
 
$headers = 'From: administrativo@acompar.org' . "\r\n" .
'Reply-To: contato@tiagomatana.com' . "\r\n" .
'X-Mailer: PHP/' . phpversion();
 
mail($to, $subject, $message, $headers);
 
echo "A mensagem de e-mail foi enviada.";
 
?>