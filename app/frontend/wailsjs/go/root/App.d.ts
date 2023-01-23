// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {models} from '../models';

export function Calculate(arg1:models.CalculateRequest):Promise<number>;

export function CreateData(arg1:models.Data):Promise<Error>;

export function CreateNewField(arg1:models.Field,arg2:string):Promise<Error>;

export function CreateTable(arg1:models.Table):Promise<Error>;

export function Delete(arg1:string,arg2:string):Promise<Error>;

export function DeleteField(arg1:string,arg2:string,arg3:string):Promise<Error>;

export function DeleteTable(arg1:string,arg2:string):Promise<Error>;

export function GetAllData(arg1:models.Table):Promise<Array<any>>;

export function GetAllTables():Promise<Array<models.Table>>;

export function UpdateData(arg1:models.Data):Promise<Error>;
