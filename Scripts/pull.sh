#!/bin/sh
# Created by Kanhu

# Ask the user for the branch name
read -p "Enter the branch name: " branch_name

# Check if the branch exists on the remote
if git ls-remote --exit-code --heads origin "$branch_name" > /dev/null 2>&1; then
    echo "Branch '$branch_name' found on remote. Pulling latest changes..."
    
    # Attempt to pull the branch
    if git pull origin "$branch_name"; then
        echo "Pull completed successfully for branch '$branch_name'."
    else
        echo "Error: Pull failed for branch '$branch_name'. Please check for conflicts or connectivity issues."
    fi
else
    echo "Error: Branch '$branch_name' does not exist on the remote."
fi
