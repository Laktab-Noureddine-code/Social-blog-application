<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'storage/*'], // Ensure 'storage/*' is included
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'], // Your React app's URL
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,


];
