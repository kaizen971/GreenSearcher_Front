# Path: create-new-feature.sh
# Description: create file structure for new feature
# Usage: create-new-feature.sh <feature-name>

# check for feature name
if [ -z "$1" ]; then
    echo "Usage: sh create-new-feature.sh <feature-name>"
    exit 1
fi

# create feature directory
mkdir -p app/features/$1/{components,containers,sagas}
# create feature files
touch app/features/$1/components/index.js
touch app/features/$1/containers/index.js
touch app/features/$1/sagas/index.js
touch app/features/$1/sagas/$1Sagas.js
# create feature reducer file
touch app/features/$1/reducers.js
# create feature action file
touch app/features/$1/actions.js
# create selectors file
touch app/features/$1/selectors.js
# create feature types file
touch app/features/$1/types.js

echo "Created feature $1"

