# Rick-and-Morty

## Stack used
### Back-end:
- PHP | Developed with PHP 7.1.16
- Guzzle - PhP Http Client & Promises  | version: ^6.3
- Laravel/Lumen-framework | version: 5.8.*
- Composer | vesion: 1.8.5

### Front-end:
- React | version: 16.8.6
- npm | version: 5.6.0
- node: | version: 6.9.4
- lodash - for array and object operations | version: 4.17.11
- Skeleton css - as a css bootstrap


# Project installation guide:
## For mac
### PHP:
curl -s http://php-osx.liip.ch/install.sh | bash -s 7.1
### composer:
1. `php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"`
2. `php -r "if (hash_file('sha384', 'composer-setup.php') === '48e3236262b34d30969dca3c37281b3b4bbe3221bda826ac6a9a62d6444cdb0dcd0615698a5cbe587c3f0fe57a54d8f5') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"`
3. `mv composer.phar /usr/local/bin/composer` - Move to bin to run globally.
### node:
- `https://blog.teamtreehouse.com/install-node-js-npm-mac` Refer to this or just use `brew install node` and `brew install npm`
### Application:
1. Clone the repo or downloand the repo.
2. cd into the project folder.
#### For backend :
1. You can check the lumen dependencies in `composer.json`.
2. Install the dependencies using `composer install`.
3. This will install the dependencies for the php backend server.
#### For front end:
1. You can check the node dependencies in `public\js\package.json`.
2. cd into `public\js`.
3. Install the dependencies using `npm install`.

- For the app to render web pages, we need to build the js files from react components. 
- The build file is included in this for convenience but to install the dependency - `npm run build` from `public\js` folder.
- Now the dependencies are ready. We will run the app using php server. Run `php -S localhost:8000 -t public` to run the app. 
- Access the page on `http://localhost:8000/`.



# App details
1. As an user there are different ways to interact with the application.
2. The main objective of the app is to show the characters through different filters.
3. Filters provided:
- Browser by character:
  - See all characters.
  - Search character by name or Id.
- Browse through locations/dimensions/type of locations:
  - Browse through the locations and click on the location cards to see the characters from those locations.
  - Use the location name, dimension name and/or location type to filter the locations.
- Browse through episodes:
  - Browse through the episode cards and click on the episode cards to see the characters from the episode.
  - Also, fill the episode name or the episode code(Format: S01E10) and filter the episodes.
  
 4. The page has the following important components:
 - ### Question menu to start the filter process.
![alt text](https://user-images.githubusercontent.com/14356682/58775260-415b6300-858a-11e9-9742-1c6d54ec8628.png)
 
 - ### Filters for locations, episodes and characters.
 ![alt text](https://user-images.githubusercontent.com/14356682/58775349-a2833680-858a-11e9-93cd-6164549cf342.png)
 - ### Pagination for each of them.
![alt text](https://user-images.githubusercontent.com/14356682/58775260-415b6300-858a-11e9-9742-1c6d54ec8628.png)
 - ### Card views for episodes and locations. They have horizontal scrolling.

 - ### Card view for characters. They have vertical scrolling and occupy the rest of the page. They are given more importance as they are the main idea of the app.
![alt text](https://user-images.githubusercontent.com/14356682/58775270-48827100-858a-11e9-921c-6065195370c9.png)

 - Each view has 20 cards in a page. Use the pagination to switch between results.
    
    
    
 # Future Scope 
 - Additional filter features based on existing character cards on a page like sorting characters by name and other criteria.
 - Unit tests for both back-end and front-end stack. 
 - An API wrapper for the react components when the scale gets bigger.
 - Separating the frontend and backend into separate apps when the scale grows should be fairly simple because of react and lumen. React can be separated out into its own app and the lumen server can run on its own.
 - CSS & UX can be refined.
