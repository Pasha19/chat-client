module.exports = {
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:vue/recommended',
        'standard'
    ],
    plugins: [
        'vue'
    ],
    rules: {
        indent: ['warn', 4],
        'vue/html-indent': ['warn', 4]
    }
}
