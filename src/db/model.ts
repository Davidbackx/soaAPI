import {Match} from "../types/match";
import { RowDataPacket } from 'mysql2';

function mapToMatch(rows: RowDataPacket[]): Match[]{
    const result: Match[] = [];

    rows.forEach(
        ({
            Id,Division,MatchDate,HomeTeam,AwayTeam,FTHG,FTAG,FTR,HTHG,HTAG,HTR,Referee,HS,AS2,HST,AST,HF,AF,HC,AC,HY,AY,HR,AR
        }) => {
            const match: Match = { Id:Id,Division: Division, MatchDate: MatchDate, HomeTeam:HomeTeam, AwayTeam:AwayTeam, FTHG:FTHG,FTAG:FTAG,FTR:FTR,HTHG:HTHG,HTAG:HTAG,HTR:HTR,Referee:Referee,HS:HS,AS2:AS2,HST:HST,AST:AST,HF:HF,AF:AF,HC:HC,AC:AC,HY:HY,AY:AY,HR:HR,AR:AR};
            const existing = result.find((el) => el.Id === Id);
            if (!existing) {
                result.push(match);
            }
        }
    );
    return result;
};
export default mapToMatch;

