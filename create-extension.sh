echo "Publish"

cd tasks/AndroidVersionExtract/
npm install
tsc

cd ../../

tfx extension create --manifest-globs vss-extension.json