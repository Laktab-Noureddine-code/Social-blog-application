<!DOCTYPE html>
<html>

<head>
    <title>Réinitialisation du mot de passe</title>
    <style>
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #3b82f6;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 10px 0;
        }

        .button:hover {
            background-color: #2563eb;
        }
    </style>
</head>
<body>
    <p>Bonjour, {{ucwords($name)}}</p>
    <p>Vous avez demandé une réinitialisation de votre mot de passe.</p>

    <a href="{{ $resetUrl }}" class="button">
        Réinitialiser mon mot de passe
    </a>

    <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
    <p>Ce lien expirera dans 60 minutes.</p>
</body>

</html>
