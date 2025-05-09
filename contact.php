<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nume = htmlspecialchars(trim($_POST["nume"]));
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $telefon = htmlspecialchars(trim($_POST["telefon"]));
  $mesaj = htmlspecialchars(trim($_POST["mesaj"]));

  $to = "razvan.barta@gmail.com"; // Adresa ta de email
  $subject = "Mesaj de pe site de la $nume";
  $body = "Ai primit un mesaj nou de la formularul de contact:\n\n"
        . "Nume: $nume\n"
        . "Email: $email\n"
        . "Telefon: $telefon\n"
        . "Mesaj:\n$mesaj";

  $headers = "From: $email\r\n";
  $headers .= "Reply-To: $email\r\n";

  if (mail($to, $subject, $body, $headers)) {
    echo "<script>alert('Mesaj trimis cu succes!'); window.history.back();</script>";
  } else {
    echo "<script>alert('Eroare la trimiterea mesajului.'); window.history.back();</script>";
  }
} else {
  http_response_code(403);
  echo "Acces interzis.";
}
?>
