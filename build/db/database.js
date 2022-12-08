"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var promise_1 = __importDefault(require("mysql2/promise"));
var dotenv = __importStar(require("dotenv"));
var model_1 = __importDefault(require("./model"));
dotenv.config();
var Database = /** @class */ (function () {
    function Database() {
        this.connectionPool = promise_1.default.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEME
        });
    }
    Database.prototype.handleQuery = function (query, type, params) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_1, rows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(type == "select")) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.connectionPool.query(query)];
                    case 2:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, (0, model_1.default)(rows)];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 8];
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.connectionPool.execute(query, params)];
                    case 6:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, true];
                    case 7:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = "SELECT Id as Id,Division as Division,MatchDate as MatchDate,HomeTeam as HomeTeam,AwayTeam as AwayTeam,FTHG as FTHG,FTAG as FTAG,FTR as FTR,HTHG as HTHG,HTAG as HTAG,HTR as HTR,Referee as Referee,HS as HS,AS2 as AS2,HST as HST,AST as AST,HF as HF,AF as AF,HC as HC,AC as AC,HY as HY,AY as AY,HR as HR,AR as AR FROM heroku_5f140063eaf8871.premier_league";
                return [2 /*return*/, this.handleQuery(query, "select")];
            });
        });
    };
    Database.prototype.insertQuery = function (match) {
        return __awaiter(this, void 0, void 0, function () {
            var query, params;
            return __generator(this, function (_a) {
                query = "INSERT INTO heroku_5f140063eaf8871.premier_league (Division,MatchDate,HomeTeam,AwayTeam,FTHG,FTAG,FTR,HTHG,HTAG,HTR,Referee,HS,AS2,HST,AST,HF,AF,HC,AC,HY,AY,HR,AR) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                params = [match.Division, match.MatchDate, match.HomeTeam, match.AwayTeam, match.FTHG, match.FTAG, match.FTR, match.HTHG, match.HTAG, match.HTR, match.Referee, match.HS, match.AS2, match.HST, match.AST, match.HF, match.AF, match.HC, match.AC, match.HY, match.AY, match.HR, match.AR];
                return [2 /*return*/, this.handleQuery(query, "insert", params)];
            });
        });
    };
    Database.prototype.updateQuery = function (hometeam, id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, params;
            return __generator(this, function (_a) {
                query = "UPDATE heroku_5f140063eaf8871.premier_league set HomeTeam = ? where Id = ?";
                params = [hometeam, id];
                return [2 /*return*/, this.handleQuery(query, "update", params)];
            });
        });
    };
    Database.prototype.deleteQuery = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, params;
            return __generator(this, function (_a) {
                query = "DELETE FROM heroku_5f140063eaf8871.premier_league\n         where Id = ?";
                params = [id];
                return [2 /*return*/, this.handleQuery(query, "delete", params)];
            });
        });
    };
    return Database;
}());
exports.Database = Database;
