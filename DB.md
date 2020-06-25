```
pg_ctl -D "C:\Users\Austin\Desktop\posDb" -l logfile start
```
```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
```
CREATE TABLE users ("uid" uuid DEFAULT uuid_generate_v4 (), "name" varchar(80),"email"varchar(80), "password" varchar(80), "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamptz NULL DEFAULT CURRENT_TIMESTAMP);
```
```
DROP TABLE users;
SELECT * FROM users;
```
```
CREATE TABLE posts ("pid" uuid DEFAULT uuid_generate_v4 (), "owner" varchar(80),"email" varchar(80),"groups" varchar(80), "product" varchar(80), "detail" varchar(800),"price" varchar(80),"photo" varchar(580), "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamptz NULL DEFAULT CURRENT_TIMESTAMP);
```
```
DROP TABLE posts;
SELECT * FROM posts;
```