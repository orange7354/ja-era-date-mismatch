import type { TextlintRuleModule } from "@textlint/types";

const PATTERN_AD_TO_ERA = /([0-9０-９]{1,4})年[（(](明治|大正|昭和|平成|令和)([0-9０-９]{1,2})年[）)]\s*/gi;
const PATTERN_ERA_TO_AD = /(明治|大正|昭和|平成|令和)([0-9０-９]{1,2})年[(（]([0-9０-９]{1,4})年[）)]\s*/gi;

const EraDetails = [
    { eraName: '令和', startYear: 2018, maxLength: 9999 },
    { eraName: '平成', startYear: 1988, maxLength: 31 },
    { eraName: '昭和', startYear: 1925, maxLength: 64 },
    { eraName: '大正', startYear: 1911, maxLength: 15 },
    { eraName: '明治', startYear: 1867, maxLength: 45 },
];

type EraYearInfo = {
    eraName: string,
    eraYear: string,
    adYear: string,
};

type ValidationResult = {
    errorMessage: string,
    isValid: boolean,
};

const validateEraAndAdYear = (eraYearInfo: EraYearInfo): ValidationResult => {
    const validationResult: ValidationResult = { errorMessage: '', isValid: true };

    const eraDetail = EraDetails.find(detail => detail.eraName === eraYearInfo.eraName);
    if (!eraDetail) return validationResult;

    const eraYear = Number(eraYearInfo.eraYear);
    const adYear = Number(eraYearInfo.adYear);
    const correctAdYear = eraDetail.startYear + eraYear - 1;

    if (correctAdYear !== adYear) {
        validationResult.isValid = false;
        validationResult.errorMessage = `${adYear}年 => ${correctAdYear}年 \n
                ${eraYearInfo.eraName}${eraYearInfo.eraYear}年の西暦は${correctAdYear}年です。`;
        return validationResult;
    }

    if (eraYear > eraDetail.maxLength) {
        validationResult.isValid = false;
        validationResult.errorMessage = `${eraYearInfo.eraName}の年数は${eraDetail.maxLength}年までです。"${eraYearInfo.eraName}${eraYearInfo.eraYear}年" は範囲外です。`;
        return validationResult;
    }

    return validationResult;
};


const textlintRule: TextlintRuleModule = (context) => {
    const { Syntax, RuleError, report, getSource } = context;
    return {
        async [Syntax.Str](node) {
            const text = getSource(node);

            //TODO fixableにしたい 
            let match;
            while ((match = PATTERN_AD_TO_ERA.exec(text))) {
                const index = match.index;

                const eraYearInfo: EraYearInfo = {
                    adYear: match[1],
                    eraName: match[2],
                    eraYear: match[3],
                };

                const validationResult = validateEraAndAdYear(eraYearInfo);
                if (validationResult.isValid) continue;

                report(node, new RuleError(validationResult.errorMessage, { index }));
            }


            let match2;
            while ((match2 = PATTERN_ERA_TO_AD.exec(text))) {
                const index = match2.index;

                const eraYearInfo: EraYearInfo = {
                    eraName: match2[1],
                    eraYear: match2[2],
                    adYear: match2[3],
                };

                const validationResult = validateEraAndAdYear(eraYearInfo);
                if (validationResult.isValid) continue;

                report(node, new RuleError(validationResult.errorMessage, { index }));
            }
        }
    };
};

export default textlintRule;
