# Backend Routes

## HTML

* ``` GET / StaticPagesController#root```

## API Endpoints

* ```users```
  * ```GET api/users```
    * Delivers payload of user, watchlist items, private txn notes, likes
  * ```POST api/users```
    * Sign up a new user

* ```session```
  * ```POST api/session```
    * login
  * ```DELETE api/session```
    * logout

* ```address_watchlist_item```
  * ```POST api/address_watchlist_item```
    * Create address watch list item
  * ```PATCH api/address_watchlist_item/:id```
    * Edit address watch list item
  * ```DELETE api/address_watchlist_item/:id```
    * Delete address watch list item



**As time permits I will add routes for likes, tags, & private tx notes**


