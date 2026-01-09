module.exports = {
    root: true,
    extends: [
        'plugin:@wordpress/eslint-plugin/recommended'
    ],
    plugins: [
        'import'
    ],
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    globals: {
        wp: 'readonly',
        EssentialBlocksLocalize: 'readonly',
        window: 'readonly',
        document: 'readonly',
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: './webpack.config.js'
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        },
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'import/ignore': [
            'node_modules',
            '\\.(css|scss|sass|less|styl|stylus)$'
        ]
    },
    rules: {
        // Import validation rules
        'import/no-unresolved': ['error', {
            ignore: [
                // WordPress externals
                '^@wordpress/',
                // Essential Blocks aliases
                '^@essential-blocks/',
                // SVG imports
                '\\.svg$',
                // CSS/SCSS imports
                '\\.(css|scss|sass)$'
            ]
        }],
        'import/named': 'error',
        'import/default': 'error',
        'import/namespace': 'error',
        'import/no-absolute-path': 'error',
        'import/no-dynamic-require': 'warn',
        'import/no-webpack-loader-syntax': 'error',
        'import/no-self-import': 'error',
        'import/no-cycle': ['error', { maxDepth: 10 }],
        'import/no-useless-path-segments': 'error',
        'import/no-relative-parent-imports': 'off',
        
        // Ensure imports are used
        'import/no-unused-modules': ['error', {
            unusedExports: true,
            src: ['src/**/*.{js,jsx,ts,tsx}'],
            ignoreExports: [
                'src/**/index.js',
                'src/**/frontend.js',
                'src/**/save.js',
                'src/**/deprecated.js',
                'src/**/example.js'
            ]
        }],
        
        // WordPress specific
        '@wordpress/dependency-group': 'error',
        '@wordpress/no-unsafe-wp-apis': 'off',
        '@wordpress/i18n-text-domain': ['error', {
            allowedTextDomain: 'essential-blocks'
        }],
        
        // General code quality
        'no-unused-vars': ['error', {
            ignoreRestSiblings: true,
            argsIgnorePattern: '^_'
        }],
        'no-console': 'warn',
        'prefer-const': 'error'
    },
    overrides: [
        {
            files: ['**/*.test.js', '**/*.spec.js'],
            env: {
                jest: true
            }
        },
        {
            files: ['webpack.config.js', '.config/**/*.js'],
            env: {
                node: true
            },
            rules: {
                'import/no-unresolved': 'off'
            }
        }
    ]
};
