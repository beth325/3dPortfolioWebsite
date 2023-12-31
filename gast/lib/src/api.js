"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSequenceProd = exports.isBranchingProd = exports.isOptionalProd = exports.getProductionDslName = exports.GAstVisitor = exports.serializeProduction = exports.serializeGrammar = exports.Alternative = exports.Alternation = exports.RepetitionWithSeparator = exports.RepetitionMandatoryWithSeparator = exports.RepetitionMandatory = exports.Repetition = exports.Option = exports.NonTerminal = exports.Terminal = exports.Rule = void 0;
var model_1 = require("./model");
Object.defineProperty(exports, "Rule", { enumerable: true, get: function () { return model_1.Rule; } });
Object.defineProperty(exports, "Terminal", { enumerable: true, get: function () { return model_1.Terminal; } });
Object.defineProperty(exports, "NonTerminal", { enumerable: true, get: function () { return model_1.NonTerminal; } });
Object.defineProperty(exports, "Option", { enumerable: true, get: function () { return model_1.Option; } });
Object.defineProperty(exports, "Repetition", { enumerable: true, get: function () { return model_1.Repetition; } });
Object.defineProperty(exports, "RepetitionMandatory", { enumerable: true, get: function () { return model_1.RepetitionMandatory; } });
Object.defineProperty(exports, "RepetitionMandatoryWithSeparator", { enumerable: true, get: function () { return model_1.RepetitionMandatoryWithSeparator; } });
Object.defineProperty(exports, "RepetitionWithSeparator", { enumerable: true, get: function () { return model_1.RepetitionWithSeparator; } });
Object.defineProperty(exports, "Alternation", { enumerable: true, get: function () { return model_1.Alternation; } });
Object.defineProperty(exports, "Alternative", { enumerable: true, get: function () { return model_1.Alternative; } });
Object.defineProperty(exports, "serializeGrammar", { enumerable: true, get: function () { return model_1.serializeGrammar; } });
Object.defineProperty(exports, "serializeProduction", { enumerable: true, get: function () { return model_1.serializeProduction; } });
var visitor_1 = require("./visitor");
Object.defineProperty(exports, "GAstVisitor", { enumerable: true, get: function () { return visitor_1.GAstVisitor; } });
var helpers_1 = require("./helpers");
Object.defineProperty(exports, "getProductionDslName", { enumerable: true, get: function () { return helpers_1.getProductionDslName; } });
Object.defineProperty(exports, "isOptionalProd", { enumerable: true, get: function () { return helpers_1.isOptionalProd; } });
Object.defineProperty(exports, "isBranchingProd", { enumerable: true, get: function () { return helpers_1.isBranchingProd; } });
Object.defineProperty(exports, "isSequenceProd", { enumerable: true, get: function () { return helpers_1.isSequenceProd; } });
//# sourceMappingURL=api.js.map