#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi

for arg in "$@"; do
    dir="ex$arg"
    if [ -d "$dir" ]; then 
        echo "Directory $dir already exists"
    else
        mkdir -p "$dir" 
        echo "Created directory: $dir"
    fi
done