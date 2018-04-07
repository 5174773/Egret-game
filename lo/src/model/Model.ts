class Model {
    public status: number;
    public msg: string;
    public data: DataModel;

    constructor() {

    }
}

class DataModel {
    public roomStage: number;
    public roomId: number;
    public canPlay: number;
    public userId: number;

    constructor() {
    }
}