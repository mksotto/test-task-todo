import antfu from '@antfu/eslint-config';
import preferArrow from 'eslint-plugin-prefer-arrow';

export default antfu(
    {
        ignores: [
            '**/dist/**',
            '**/node_modules/**'
        ],
        react: true,
        formatters: true,
        stylistic: {
            quotes: 'single',
            indent: 4,
            semi: true
        },
        typescript: {
            overrides: {
                'ts/consistent-type-definitions': ['warn', 'type']
            }
        },
        jsonc: false
    },
    {
        plugins: { preferArrow },
        rules: {
            'antfu/top-level-function': ['off'],
            'style/comma-dangle': ['warn', 'never'],
            'node/prefer-global/process': ['off']
        }
    }
);
