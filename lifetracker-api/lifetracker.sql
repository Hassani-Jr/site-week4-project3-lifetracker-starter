\echo 'Delete and recreate'
\prompt 'Return for yes or control-C to quit' answer

DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

\i lifetracker-schema.sql


\echo 'Delete and recreate'
\prompt 'Return for yes or control-C to quit' answer


DROP DATABASE lifetracker_test;
CREATE DATABASE lifetracker_test;
\connect lifetracker_test;

\i lifetracker-schema.sql