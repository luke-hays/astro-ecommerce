#!/bin/bash

# Set up the testing environment
echo "TESTING=true" > .env

# Run the create-db file to set up a local test file
sqlite3 db/treecommerce-test.db < db/create-db.sql

# Content should also be created and structured such that we can test astro's content collections
