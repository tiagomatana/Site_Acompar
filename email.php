<?php
ini_set ('display_errors', 1);
 
error_reporting (E_ALL);

$name = $_POST["name"];

$from = $_POST["email"];

$to = "tiago.matana@gmail.com";

$subject = $_POST["subject"];

$message = $_POST["message"];
if(isset($name) && isset($from) && isset($subject) && isset($message)){
    $headers = 'From: '.$from. "\r\n" .
    'X-Mailer: PHP/' . phpversion();
     
    if(mail($to, $subject, $message, $headers)){
        echo "Email enviado com sucesso.";
    } else {
        echo "Não foi possível enviar o email.";
    }

} else {
    echo "Não foi possível enviar o email! Dados incompletos.";


}
 
 
 
 

 
?>