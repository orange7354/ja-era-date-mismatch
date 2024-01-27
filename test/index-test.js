import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: [
        "2016年(平成12年)は良い年だった。", 
        {
            text: "It is bugs, but it should be ignored",
            options: {
                allows: ["it should be ignored"]
            }
        }
    ],
});
