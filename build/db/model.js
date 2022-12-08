"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapToMatch(rows) {
    var result = [];
    rows.forEach(function (_a) {
        var Id = _a.Id, Division = _a.Division, MatchDate = _a.MatchDate, HomeTeam = _a.HomeTeam, AwayTeam = _a.AwayTeam, FTHG = _a.FTHG, FTAG = _a.FTAG, FTR = _a.FTR, HTHG = _a.HTHG, HTAG = _a.HTAG, HTR = _a.HTR, Referee = _a.Referee, HS = _a.HS, AS2 = _a.AS2, HST = _a.HST, AST = _a.AST, HF = _a.HF, AF = _a.AF, HC = _a.HC, AC = _a.AC, HY = _a.HY, AY = _a.AY, HR = _a.HR, AR = _a.AR;
        var match = { Id: Id, Division: Division, MatchDate: MatchDate, HomeTeam: HomeTeam, AwayTeam: AwayTeam, FTHG: FTHG, FTAG: FTAG, FTR: FTR, HTHG: HTHG, HTAG: HTAG, HTR: HTR, Referee: Referee, HS: HS, AS2: AS2, HST: HST, AST: AST, HF: HF, AF: AF, HC: HC, AC: AC, HY: HY, AY: AY, HR: HR, AR: AR };
        var existing = result.find(function (el) { return el.Id === Id; });
        if (!existing) {
            result.push(match);
        }
    });
    return result;
}
;
exports.default = mapToMatch;
