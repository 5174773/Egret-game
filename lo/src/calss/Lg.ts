class Lg {


     /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    public static createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}

class Const{
    public static SCENT_WIDTH:number = 0;
    public static SCENT_HEIGHT:number = 0;
    public static GamePoxY:number = 0;
    public static setSwfArr:Array<any> = ["s","t","a","t","i","c",".","e","g","r","e","t","-","l","a","b","s",".","o","r","g"];
}
   