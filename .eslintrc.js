module.exports = {
    "env": {
        "node": true,
        "commonjs": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    // "parserOptions": {
    //     "ecmaVersion": 6,
    //     "sourceType": "module",
    //     "ecmaFeatures": {
    //       "modules": true
    //     }
    // },
    "parserOptions": {
        "ecmaVersion": 8,
        "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "jsx": true,
        },
        "sourceType": "module",
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
}
