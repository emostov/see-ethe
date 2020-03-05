
# Database Schema

## ```users```

| **column name** | **data type** |        **details**        |
| :-------------: | :-----------: | :-----------------------: |
|       id        |    integer    |   not null, primary key   |
|    username     |    string     | not null, indexed, unique |
|      email      |    string     | not null, indexed, unique |
| password_digest |    string     |         not null          |
|  session_token  |    string     | not null, indexed, unique |
|   created_at    |   datetime    |         not null          |
|   updated_at    |   datetime    |         not null          |

* index on username, unique: true
* index on email, unique: true
* index on session_token, unique: true

## ```tx_private_notes```

| **column name** | **data type** |           **details**          |
|:---------------:|:-------------:|:------------------------------:|
|        id       |    integer    |      not null, primary key     |
|       body      |     string    |            not null            |
|    author_id    |    integer    | not null, indexed, foreign key |
| notable_address |    integer    | not null, indexed, foreign key |
|    created_at   |    datetime   |            not null            |
|    updated_at   |    datetime   |            not null            |

* ```author_id``` references ```users```
* index on ```author_id``` 
* index on ```notable_address```
* ```notable_address``` represents addresses that exist on the blockchain

## ```comments```

|   **column name**   | **data type** |           **details**          |
|:-------------------:|:-------------:|:------------------------------:|
|          id         |    integer    |      not null, primary key     |
|         body        |     string    |            not null            |
|      author_id      |    integer    | not null, indexed, foreign key |
| commentable_address |    integer    |        not null, indexed       |
|      created_at     |    datetime   |            not null            |
|      updated_at     |    datetime   |            not null            |

* ```author_id``` references ```users```
* index on ```author_id``` 
* index on ```commentable_address```
* ```commentable_address``` represents addresses that exist on the blockchain

## ```likes```

|   **column name**   | **data type** |           **details**          |
|:-------------------:|:-------------:|:------------------------------:|
|          id         |    integer    |      not null, primary key     |
|         body        |     string    |            not null            |
|      author_id      |    integer    | not null, indexed, foreign key |
|  likeable_address   |    integer    |            not null            |
|      created_at     |    datetime   |            not null            |
|      updated_at     |    datetime   |            not null            |

* ```author_id``` references ```users```
* index on ```author_id``` 
* index on ```likeable_address```
* ```likeable_address``` represents addresses that exist on the blockchain

## ```address_name_tags```

| **column name** | **data type** |           **details**          |
|:---------------:|:-------------:|:------------------------------:|
|        id       |    integer    |      not null, primary key     |
|     user_id     |    integer    | not null, indexed, foreign key |
| tagable_address |    integer    |            not null            |
|    name_tag     |     string    |            not null            |
|       note      |     string    |            not null            |
|    created_at   |    datetime   |            not null            |
|    updated_at   |    datetime   |            not null            |

* index on ```author_id``` 
* index on ```taggable_address```
* private indicates if just the corresponding user can see tag
* ```taggable_address``` represents addresses that exist on the blockchain

## ```private_address_watchlist```

| **column name** | **data type** |           **details**          |
|-----------------|:-------------:|:------------------------------:|
|        id       |    integer    |      not null, primary key     |
|    author_id    |    integer    | not null, indexed, foreign key |
|     address     |     string    |        not null, indexed       |
|   description   |     string    |                                |
|     name_tag    |     string    |            not null            |
|  email_setting  |     string    |            not null            |
|    created_at   |    datetime   |            not null            |
|    updated_at   |    datetime   |            not null            |

* index on ```author_id```
* ```author_id``` references ```users```

