<?php
ini_set ('display_errors', 1);

error_reporting (E_ALL);

$data = file_get_contents("php://input");
$dataJsonDecode = json_decode($data);

$name = $dataJsonDecode->name;
$from = $dataJsonDecode->email;
$subject = "[SITE]";
// $subject = $dataJsonDecode->subject;
$message = $dataJsonDecode->message;

// $to = "tiago.matana@gmail.com";
$to = "contato@acompar.org";

if(!empty($name) && !empty($from) && !empty($subject) && !empty($message)){
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
