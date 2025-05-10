<?php
return [
    'paths' => ['*'],

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'storage/*'],  // add 'storage/*'

    'allowed_origins' => ['http://localhost:5173'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];