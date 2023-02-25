SELECT * FROM users;

INSERT INTO users (uid,fullname,password, email, likedSongs)
VALUES (101, 'roni shwarzman', '123', 'roni.ponik@gmail.com',
  ARRAY['{"id": "201", "title": "in-the-end", "author":"linkin-park"}']::json[]
);
