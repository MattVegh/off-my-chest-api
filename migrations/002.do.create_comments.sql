CREATE TABLE comments (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,\
    content TEXT NOT NULL,
    post_id INTEGER NOT NULL
)