<?php
ini_set ('display_errors', 1);
 
error_reporting (E_ALL);

if($_POST){
    $name = $_POST["name"];

    $from = $_POST["email"];
    
    $to = "tiago.matana@gmail.com";
    
    $subject = $_POST["subject"];
    
    $message = $_POST["message"];
} else {
    $from = "contato@acompar.org";
     
    $to = "contato@acompar.org";
     
    $subject = "EMAIL DO SITE";
     
    $message = "Não foi possível receber os dados do email! Contate o administrador da rede.";


}
 
 
 
$headers = 'From: '.$from. "\r\n" .
'X-Mailer: PHP/' . phpversion();
 
if(mail($to, $subject, $message, $headers)){
    echo "Email enviado com sucesso.";
} else {
    echo "Não foi possível enviar o email.";
}
 

 
?>