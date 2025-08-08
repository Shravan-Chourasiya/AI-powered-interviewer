
export default function retRes(suc:boolean,mes:string,stat:number){
    return Response.json({
        success:suc,
        message:mes
    },{
        status:stat
    })
}