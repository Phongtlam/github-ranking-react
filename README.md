Website deployed on github page at https://phongtlam.github.io/github-ranking-react/
- By default, the service will grab 30 most recently updated repos, sorted by stars count in 1 page.
- On clicking next page, it will find another max 30 repos, again within those repos, initial ranked by stars count

## Step to start
1. npm install
2. npm run dev - start FE app on development at localhost:3001

## Available Scripts
1. npm run dev - start dev server
2. npm run start - start FE app on development at localhost:3001 with server pointing to heroku server at https://github-viewer-server.herokuapp.com
3. npm run test - run unit tests
4. npm run deploy - deploy on github pages

## Functionality
1. Search for repos in an organization
2. We query repos by recently updated stat by Github, at 30 repos/page. We will need to implement a DB if we want the data to be sorted by stars globally rather than from each page call.
3. Page call is limited by `created, updated, pushed, full_name` due to API limitation. We will need to save the data ourselves as batch run to get correct global values if we want data on other values rather than most recently updated.
4. On client side it is sorted initially by stars count per PAGE, clicking on headers will sort ascending/descending depending on col values
5. Clicking forward and backward on main table footer will change to different pages.
6. Clicking on a row will open up more info on that repo, as well as a secondary table showing most recent 30 commits on that repo.
7. Clicking on a row on the right table, will open up more info associated with that commit.
