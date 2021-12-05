module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module",
        "project": './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "import/no-unresolved": "off",
        "import/extensions": "off" 
    }
};