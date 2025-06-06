#!/bin/sh

echo "Running DB seed..."
node src/seed_data/seed.js
echo "DB seeded!"
