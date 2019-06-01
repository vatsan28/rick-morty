<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Rick&Morty</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <!--Styles-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://kit.fontawesome.com/33086f80d4.js"></script>
    </head>
    <body>
        <div id="main"></div>
        <script>
            var API_URL = '{{url('/')}}';
        </script>
        <script src="{{ url('js/build/build.js') }}"></script>
    </body>
</html> 