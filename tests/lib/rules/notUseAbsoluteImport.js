"use strict";

const rule = require("../../../lib/rules/notUseAbsoluteImport"),
    RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    }
});

const ruleTester = new RuleTester();
const errors = [{
    message: 'Use relative import inside the module.',
    type: 'ImportDeclaration'
}];

ruleTester.run("notUseAbsoluteImport", rule, {
    valid: [
        {
            code: "import { ITitle } from '@/components/OtherModule/type';",
            filename: "@/components/ModuleName/Title",
        },
        {
            code: "import { myFormat } from '@/constants/time';",
            filename: "@/components/ModuleName/utils",
        },
        {
            code: "import { myFormat } from './utils';",
            filename: "@/components/ModuleName/utils",
        },
        {
            code: "import { myFormat } from '../../type';",
            filename: "@/components/ModuleName/utils",
        }
    ],
    invalid: [
        {
            code: "import { ITitle } from '@/components/ModuleName/type';",
            filename: "@/components/ModuleName",
            errors,
        },
        {
            code: "import { ITitle } from '@/components/ModuleName/constant';",
            filename: "@/components/ModuleName/utils",
            errors,
        }
    ]
});