import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: [
        "1999年(平成12年)は良い年だった。", 
        {
            text: "1999年(平成12年)は良い年だった。",
        }
    ],
    invalid: [
        {
            text: "2016年(平成12年)は良い年だった。",
            errors: [
                {
                    message: "2016年 => 1999年 平成12年の西暦は1999年です。",
                    line: 1,
                    column: 1
                },
            ]
        },
    ]
});
