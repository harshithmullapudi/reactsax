# create lib build
rm -rf ./lib/
cp -R ./src/ ./lib/
BABEL_ENV=node yarn babel src --out-dir lib
rm -rf ./lib/docs ./lib/utils ./lib/build_utils

# create es build
rm -rf ./es/
cp -R ./src/ ./es/
BABEL_ENV=esm yarn babel src --out-dir es
rm -rf  ./es/docs ./es/utils ./es/build_utils
