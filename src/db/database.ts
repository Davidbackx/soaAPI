import mysql, { RowDataPacket } from 'mysql2/promise';
import * as dotenv from 'dotenv';
import mapToMatch from "./model";
import { Match } from '../types/match';
dotenv.config();

class Database{
    connectionPool : mysql.Pool;

    constructor(){
        this.connectionPool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEME
        });
    }
    async handleQuery(query:string,type:string,params?:any[]){
        if (type == "select"){
            try{
                const [rows] = await this.connectionPool.query(query);
                return mapToMatch(<RowDataPacket[]>rows);
            }catch(error){
                console.log(error)
            }
        }else if (type == "selectID"){
            try{
                const [rows] = await this.connectionPool.execute(query,params);
                const matches = mapToMatch(<RowDataPacket[]>rows)
                if (matches.length > 0){
                    return matches[0]
                }else{
                    return undefined
                }
            }catch(error){
                console.log(error)
            }
        }else{
            try{
                const [rows] = await this.connectionPool.execute(query,params)
                return true
            }catch (error){
                console.log(error)
            }
        }
    }
    async getAll(){
        const query:string= "SELECT Id as Id,Division as Division,MatchDate as MatchDate,HomeTeam as HomeTeam,AwayTeam as AwayTeam,FTHG as FTHG,FTAG as FTAG,FTR as FTR,HTHG as HTHG,HTAG as HTAG,HTR as HTR,Referee as Referee,HS as HS,AS2 as AS2,HST as HST,AST as AST,HF as HF,AF as AF,HC as HC,AC as AC,HY as HY,AY as AY,HR as HR,AR as AR FROM heroku_5f140063eaf8871.premier_league";
        return this.handleQuery(query,"select")
    }
    async getById(id:Number){
        const query:string= `SELECT Id as Id,Division as Division,MatchDate as MatchDate,HomeTeam as HomeTeam,AwayTeam as AwayTeam,FTHG as FTHG,FTAG as FTAG,FTR as FTR,HTHG as HTHG,HTAG as HTAG,HTR as HTR,Referee as Referee,HS as HS,AS2 as AS2,HST as HST,AST as AST,HF as HF,AF as AF,HC as HC,AC as AC,HY as HY,AY as AY,HR as HR,AR as AR FROM heroku_5f140063eaf8871.premier_league where Id = ?`;
        const params = [id]
        return this.handleQuery(query,"selectID",params)
    }
    async insertQuery(match:Match){
        const query:string = `INSERT INTO heroku_5f140063eaf8871.premier_league (Division,MatchDate,HomeTeam,AwayTeam,FTHG,FTAG,FTR,HTHG,HTAG,HTR,Referee,HS,AS2,HST,AST,HF,AF,HC,AC,HY,AY,HR,AR) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const params = [match.Division,match.MatchDate,match.HomeTeam,match.AwayTeam,match.FTHG,match.FTAG,match.FTR,match.HTHG,match.HTAG,match.HTR,match.Referee,match.HS,match.AS2,match.HST,match.AST,match.HF,match.AF,match.HC,match.AC,match.HY,match.AY,match.HR,match.AR];
        return this.handleQuery(query,"insert",params);
    }
    async updateQuery(hometeam:string, id:number){
        const query:string = `UPDATE heroku_5f140063eaf8871.premier_league set HomeTeam = ? where Id = ?`
        const params = [hometeam, id];
        return this.handleQuery(query,"update",params);
    }
    async deleteQuery(id:number){
        const query:string = `DELETE FROM heroku_5f140063eaf8871.premier_league
         where Id = ?`
        const params = [id]
        return this.handleQuery(query,"delete",params)
    }
}



export { Database };